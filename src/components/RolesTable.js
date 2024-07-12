import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FaSortDown,
  FaSortUp,
  FaSearch,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";
import EditUserModal from "./EditUserModal";
import ConfirmationModal from "./ConfirmationModal";
import AdminHeader from "./AdminHeader";
import Spinner from "./Spinner";

function RolesTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [superAdminCount, setSuperAdminCount] = useState(0);
  const { userType,setError } = useContext(QuestionsContext);
  const [showUsers, setShowUsers] = useState(true);
  const [showAdmins, setShowAdmins] = useState(true);
  const [showSuperAdmins, setShowSuperAdmins] = useState(true);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      let userCount = 0;
      let adminCount = 0;
      let superAdminCount = 0;

      const users = json.map((user) => {
        let prefix;
        let count;
        if (user.userType === "User") {
          prefix = "U-";
          count = ++userCount;
        } else if (user.userType === "Admin") {
          prefix = "A-";
          count = ++adminCount;
        } else if (user.userType === "Super Admin") {
          prefix = "S-";
          count = ++superAdminCount;
        }
        const serialId = `${prefix}${count.toString().padStart(3, "0")}`;
        return { ...user, serialId };
      });
      setIsLoading(false);
      setData(users);
    } catch (error) {
      setError(error.message || "Error fetching users:");
      setIsLoading(false);
      if(error.message==="Session Expired"){
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      }
    }
  }, [navigate,setError]);

  useEffect(() => {
    if (userType === "User") {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [fetchUsers, navigate, userType]);

  useEffect(() => {
    const users = data.filter((user) => user.userType === "User");
    const admins = data.filter((user) => user.userType === "Admin");
    const superAdmins = data.filter((user) => user.userType === "Super Admin");
    setUserCount(users.length);
    setAdminCount(admins.length);
    setSuperAdminCount(superAdmins.length);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      if (user.userType === "User" && !showUsers) return false;
      if (user.userType === "Admin" && !showAdmins) return false;
      if (user.userType === "Super Admin" && !showSuperAdmins) return false;

      return true;
    });
  }, [data, showUsers, showAdmins, showSuperAdmins]);

  const columns = useMemo(
    () => [
      {
        Header: "S.No.",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "ID",
        accessor: "serialId",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "userType",
        sortType: (rowA, rowB) => {
          const roleOrder = { "Super Admin": 1, Admin: 2, User: 3 };
          return (
            roleOrder[rowA.original.userType] -
            roleOrder[rowB.original.userType]
          );
        },
      },
      {
        Header: "Date Joined",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleDateString();
        },
        sortType: (rowA, rowB) => {
          return (
            new Date(rowA.original.createdAt) -
            new Date(rowB.original.createdAt)
          );
        },
      },
      ...(userType === "Super Admin"
        ? [
            {
              Header: "Actions",
              accessor: "actions",
              Cell: ({ row }) => (
                <div className="flex space-x-6">
                  <FaEdit
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    title="Edit Role"
                    onClick={() => {
                      setEditUser(true);
                      setSelectedUser(row.original);
                    }}
                  />
                  <FaTrash
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                    title="Delete"
                    onClick={() => {
                      setDeleteUser(true);
                      setSelectedUser(row.original);
                    }}
                  />
                </div>
              ),
            },
          ]
        : []),
    ],
    [userType]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: filteredData }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 transition duration-500">
      <AdminHeader
        userType={userType}
        text="User Info"
        fetchUsers={fetchUsers}
      />
      <div className="mt-8 space-y-2 py-4 pb-6 p-6 bg-white dark:bg-gray-800 dark:border-gray-500 border border-gray-300 rounded-lg shadow-lg transition duration-500">
        <div className="search-container flex flex-col items-center md:flex-row justify-between mb-4 relative">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 py-1.5 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-md transition duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Global Search"
              title="Search Bar"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            {globalFilter && (
              <button
                onClick={() => setGlobalFilter("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm5.707 13.707a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293z"
                  />
                </svg>
              </button>
            )}
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-wrap md:flex-nowrap items-center md:space-y-0">
              <div className="mr-2 md:mr-4">
                <input
                  type="checkbox"
                  checked={showUsers}
                  onChange={() => setShowUsers(!showUsers)}
                  className="mr-0.5 md:mr-2"
                />
                <span className="text-gray-800 dark:text-gray-100">
                  Users ({userCount})
                </span>
              </div>
              <div className="mr-2 md:mr-4">
                <input
                  type="checkbox"
                  checked={showAdmins}
                  onChange={() => setShowAdmins(!showAdmins)}
                  className="mr-0.5 md:mr-2"
                />
                <span className="text-gray-800 dark:text-gray-100">
                  Admins ({adminCount})
                </span>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={showSuperAdmins}
                  onChange={() => setShowSuperAdmins(!showSuperAdmins)}
                  className="mr-0.5 md:mr-2"
                />
                <span className="text-gray-800 dark:text-gray-100">
                  Super Admins ({superAdminCount})
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md transition duration-500"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-3 text-left text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 font-semibold text-sm tracking-wide border-b border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
                    >
                      <div className="flex items-center">
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown className="ml-2" />
                          ) : (
                            <FaSortUp className="ml-2" />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b border-gray-300 dark:border-gray-700 transition duration-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="p-3 text-gray-800 dark:text-gray-100 text-sm transition duration-300"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {editUser && (
        <EditUserModal
          fetchUsers={fetchUsers}
          user={selectedUser}
          onClose={() => {
            setEditUser(false);
            setSelectedUser(null);
          }}
        />
      )}
      {deleteUser && (
        <ConfirmationModal
          fetchUsers={fetchUsers}
          selectedUser={selectedUser}
          message={`Are you sure you want to delete ${selectedUser.firstName} (${selectedUser.userType}) ?`}
          onCancel={() => {
            setDeleteUser(false);
            setSelectedUser(false);
          }}
        />
      )}
    </div>
  );
}

export default RolesTable;
