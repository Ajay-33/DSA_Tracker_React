import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FaSortDown, FaSortUp, FaSearch } from "react-icons/fa";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";

function RolesTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [superAdminCount, setSuperAdminCount] = useState(0);
  const { host, userType } = useContext(QuestionsContext);
  const [showUsers, setShowUsers] = useState(true);
  const [showAdmins, setShowAdmins] = useState(true);
  const [showSuperAdmins, setShowSuperAdmins] = useState(true);
  
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/auth/users`, {
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
      setData(json);
    } catch (error) {
      console.error(error.message || "Error fetching users:");
    }
  }, [host]);

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
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
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
    ],
    []
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
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="w-full h-15 p-4 flex justify-between items-center bg-blue-600 dark:bg-blue-800 shadow-md rounded">
        <div className="w-1/4"></div>
        <div className="text-2xl text-white font-bold">User Info</div>
        <div className="w-1/4 flex justify-end"></div>
      </div>
      <div className="container mt-8 space-y-2 py-4 pb-6 min-h-screen p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
        <div className="search-container flex items-center justify-between mb-4 relative">
          <div className="relative w-1/3">
            <input
              type="text"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 p-1 py-2.5 w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-md transition duration-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Global Search"
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

          <div className="flex items-center space-x-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={showUsers}
                onChange={() => setShowUsers(!showUsers)}
                className="mr-2"
              />
              Users({userCount})
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={showAdmins}
                onChange={() => setShowAdmins(!showAdmins)}
                className="mr-2"
              />
              Admins({adminCount})
            </label>
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={showSuperAdmins}
                onChange={() => setShowSuperAdmins(!showSuperAdmins)}
                className="mr-2"
              />
              Super Admins({superAdminCount})
            </label>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table
            {...getTableProps()}
            className="w-full bg-white shadow-md rounded"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="py-3 px-6 bg-blue-600 dark:bg-blue-800 text-left text-sm font-semibold text-white uppercase cursor-pointer"
                    >
                      <div className="flex items-center">
                        <span>{column.render("Header")}</span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown className="ml-1 text-gray-400" />
                          ) : (
                            <FaSortUp className="ml-1 text-gray-400" />
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
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`${
                      rowIndex % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-200"
                        : "bg-white dark:bg-gray-300"
                    } transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-stone-300`}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="py-4 px-6 border-b border-zinc-300 dark:border-gray-500 whitespace-nowrap"
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
    </div>
  );
}

export default RolesTable;
