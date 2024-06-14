import React, { useContext, useEffect, useState, useCallback } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

function AdminPanel() {
  const navigate = useNavigate();
  const host = "http://localhost:8080";
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dropdowns, setDropdowns] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [userPage, setUserPage] = useState(0);
  const [adminPage, setAdminPage] = useState(0);
  const itemsPerPage = 4; // Number of items per page

  const context = useContext(QuestionsContext);
  const { userType } = context;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch responses");
      }
      const json = await response.json();
      const usersData = json.filter((user) => user.userType === "User");
      const adminsData = json.filter((user) => user.userType === "Admin");
      setUsers(usersData);
      setAdmins(adminsData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/category/show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setCategories(json);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    if (userType === "User") {
      navigate("/");
    } else {
      fetchCategories();
      fetchUsers();
    }
  }, [userType, navigate, fetchCategories, fetchUsers]);

  const toggleDropdown = useCallback((categoryId) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setUserPage(0);
    setAdminPage(0);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery)
  );

  const paginatedUsers = filteredUsers.slice(
    userPage * itemsPerPage,
    (userPage + 1) * itemsPerPage
  );

  const paginatedAdmins = filteredAdmins.slice(
    adminPage * itemsPerPage,
    (adminPage + 1) * itemsPerPage
  );

  const nextUserPage = () => {
    if ((userPage + 1) * itemsPerPage < filteredUsers.length) {
      setUserPage(userPage + 1);
    }
  };

  const prevUserPage = () => {
    if (userPage > 0) {
      setUserPage(userPage - 1);
    }
  };

  const nextAdminPage = () => {
    if ((adminPage + 1) * itemsPerPage < filteredAdmins.length) {
      setAdminPage(adminPage + 1);
    }
  };

  const prevAdminPage = () => {
    if (adminPage > 0) {
      setAdminPage(adminPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="w-full h-15 p-4 flex justify-between items-center bg-blue-600 dark:bg-blue-800 shadow-md rounded">
        <div className="w-1/4"></div>
        <div className="text-2xl text-white font-bold">Admin Panel</div>
        <div className="w-1/4"></div>
      </div>

      <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-3/4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Categories
          </h2>
          {categories.map((category) => (
            <div key={category._id} className="mb-4">
              <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md transition duration-500">
                <div className="flex items-center space-x-2">
                  <button onClick={() => toggleDropdown(category._id)}>
                    {dropdowns[category._id] ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {category.category_name}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
              {dropdowns[category._id] && (
                <div className="ml-6 mt-4 space-y-2 transition-all duration-500">
                  {category.questions.map((question) => (
                    <div
                      key={question._id}
                      className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-3 rounded-lg shadow-inner transition duration-500"
                    >
                      <div className="text-md text-gray-900 dark:text-gray-100">
                        {question.question_name}
                      </div>
                      <div className="flex space-x-4">
                        <button className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                          <FaEdit />
                        </button>
                        <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full h-fit lg:w-1/4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
          <div className="mb-4">
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-md">
              <FaSearch className="text-gray-500 dark:text-gray-300 mr-2" />
              <input
                type="text"
                placeholder="Search Users & Admins"
                className="w-full bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none"
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xl mb-4 font-semibold text-gray-900 dark:text-gray-100">
              Admins ({admins.length})
            </span>
            {paginatedAdmins.map((admin) => (
              <div
                key={admin._id}
                className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-md transition duration-500 hover:shadow-xl"
              >
                <div className="relative group">
                  <div className="text-gray-900 dark:text-gray-100 group-hover:underline hover:cursor-pointer">
                    {admin.name}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <span className="block">Email:</span>
                    <span className="block text-gray-300">{admin.email}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition duration-300">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 transition duration-300">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition duration-300"
                onClick={prevAdminPage}
                disabled={adminPage === 0}
              >
                <FaArrowLeft />
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition duration-300"
                onClick={nextAdminPage}
                disabled={
                  (adminPage + 1) * itemsPerPage >= filteredAdmins.length
                }
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="space-y-4 mt-5">
            <span className="text-xl mb-4 font-semibold text-gray-900 dark:text-gray-100">
              Users ({users.length})
            </span>
            {paginatedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-md transition duration-500 hover:shadow-xl"
              >
                <div className="relative group">
                  <div className="text-gray-900 dark:text-gray-100 group-hover:underline hover:cursor-pointer">
                    {user.name}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <span className="block">Email:</span>
                    <span className="block text-gray-300">{user.email}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition duration-300">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 transition duration-300">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition duration-300"
                onClick={prevUserPage}
                disabled={userPage === 0}
              >
                <FaArrowLeft />
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition duration-300"
                onClick={nextUserPage}
                disabled={(userPage + 1) * itemsPerPage >= filteredUsers.length}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
