import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";
import { Menu, X, ArrowRightLeft } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { mode, setMode, userType, setUserType, userName, setUserName } =
    context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mode");
    localStorage.removeItem("userType");
    setUserType(null);
    setUserName(null);
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const updateMode = async () => {
    const newMode = mode === "dark" ? "light" : "dark";
    localStorage.setItem("mode", newMode);
    setMode(newMode);
  };

  const toggleRoute = () => {
    setIsAdminRoute(!isAdminRoute);
    navigate(isAdminRoute ? "/" : "/admin");
  };

  return (
    <div
      className={`${mode} top-0 left-0 w-full bg-gray-100 border-gray-800 dark:bg-gray-800 shadow-md z-50 transition duration-500`}
    >
      <nav>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={process.env.PUBLIC_URL + "/dsaTracker.png"}
              className="h-8"
              alt="Website Logo"
            />
            <span className="self-center text-2xl font-mono font-semibold whitespace-nowrap text-gray-800 dark:text-white">
              A2Z-DSA-Tracker
            </span>
          </Link>
          {userType === "Guest" || userType === null ? (
            <Link
              to={"/"}
              className="hidden cursor-pointer md:block mx-2 self-center text-2xl font-mono font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-orange-500 dark:via-red-500 dark:to-yellow-500 hover:underline"
            >
              Guest Access
            </Link>
          ) : null}

          {userName && (
            <div className="hidden md:block mx-2 self-center text-2xl font-mono font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-orange-500 dark:via-red-500 dark:to-yellow-500">
              Welcome {userName}
            </div>
          )}

          <div className="hidden sm:flex items-center">
            {["Admin", "Super Admin"].includes(userType) && (
              <button
                onClick={toggleRoute}
                className="mx-2 transition-transform transform hover:scale-110 focus:outline-none"
              >
                <ArrowRightLeft className="text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-300" />
              </button>
            )}

            {!localStorage.getItem("token") ? (
              <div className="flex">
                <Link
                  className="bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold text-sm py-1.5 px-3 rounded mx-2"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold text-sm py-1.5 px-3 ml-2 rounded mr-4"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold text-sm py-1.5 px-3 rounded mx-2"
              >
                Logout
              </button>
            )}
            <div className="dark-mode-toggler ml-auto">
              <label
                htmlFor="darkModeToggle"
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`relative w-10 h-6 rounded-full shadow-inner bg-gray-300 dark:bg-orange-500`}
                >
                  <input
                    type="checkbox"
                    className="absolute w-6 h-6 rounded-full appearance-none cursor-pointer"
                    id="darkModeToggle"
                    checked={mode === "dark"}
                    onChange={updateMode}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ${
                      mode === "light"
                        ? "translate-x-0 bg-gray-200"
                        : "translate-x-4 bg-white"
                    }`}
                  ></div>
                </div>
                <div className="ml-2 text-white dark:text-gray-300">🌙</div>
              </label>
            </div>
          </div>
          <div className="flex w-[75px] justify-end sm:hidden">
            <div className="dark-mode-toggler mr-2">
              <label
                htmlFor="darkModeToggle"
                className="flex items-center cursor-pointer"
              >
                <div className="relative w-10 h-6 rounded-full shadow-inner bg-gray-300 dark:bg-orange-500">
                  <input
                    type="checkbox"
                    className="absolute w-6 h-6 rounded-full appearance-none cursor-pointer"
                    id="darkModeToggle"
                    checked={mode === "dark"}
                    onChange={updateMode}
                  />
                  <div className="dark:block hidden ml-1 text-white dark:text-gray-300 text-sm">
                    🌙
                  </div>
                  <div
                    className={`absolute left-1.5 top-1 w-4 h-4 rounded-full transition-transform duration-300 ${
                      mode === "light"
                        ? "translate-x-0 bg-gray-200"
                        : "translate-x-4 bg-white"
                    }`}
                  ></div>
                </div>
              </label>
            </div>
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <X className="dark:text-white " />
              ) : (
                <Menu className="dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full flex-col items-center w-full dark:text-white text-gray-800 font-semibold font-mono">
          {!localStorage.getItem("token") ? (
            <>
              <Link
                className="flex justify-center py-2 px-4 border-blue-400 dark:border-white border-b-2 hover:underline mx-2"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="flex justify-center py-2 px-4 hover:underline mx-2"
                to="/signup"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {["Admin", "Super Admin"].includes(userType) && (
                <button
                  className="flex justify-center py-2 px-4 hover:underline mx-2 border-blue-400 dark:border-white border-b-2"
                  onClick={toggleRoute}
                  to="/login"
                >
                  Switch to {isAdminRoute ? "User" : "Admin"}
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex justify-center py-2 px-4 rounded mx-2 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
      {userType === "Guest" && (
        <div className="overflow-hidden w-full bg-gray-100 dark:bg-gray-800 border-gray-800 border-t dark:border-white md:hidden">
          <div className="text-center whitespace-nowrap overflow-x-scroll">
            <Link
              to={"/login"}
              className="inline-block p-4 text-lg font-semibold text-gray-800 dark:text-white"
            >
              Login to access all features.
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
