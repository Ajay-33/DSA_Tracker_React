import React, { useContext, useState } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import Spinner from "./Spinner";

function AdminHeader({ userType, text, fetchUsers }) {
  const [addEmail, setAddEmail] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const context = useContext(QuestionsContext);
  const { setError} = context;
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);

  const handleAddEmailChange = (e) => {
    setAddEmail(e.target.value);
  };

  const handleDeleteEmailChange = (e) => {
    setDeleteEmail(e.target.value);
  };

  const handleAddAdmin = async () => {
    if (addEmail && addEmail.trim() !== "") {
      try {
        setIsLoadingAdd(true);
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/auth/adminEmails/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ email: addEmail }),
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        }
        fetchUsers();
        setAddEmail("");
        setError("Successfully added admin email");
        setIsLoadingAdd(false);
      } catch (error) {
        setError(error.message || "Error adding admin email");
        setIsLoadingAdd(false);
      }
    }
  };

  const handleDeleteAdmin = async () => {
    if (deleteEmail.trim() !== "") {
      try {
        setIsLoadingDel(true);
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/auth/adminEmails/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ email: deleteEmail }),
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        }
        fetchUsers();
        setDeleteEmail("");
        setError("Successfully deleted admin email");
        setIsLoadingDel(false);
      } catch (error) {
        setError(error.message || "Error removing admin email");
        setIsLoadingDel(false);
      }
    }
  };

  return (
    <>
      {userType === "Super Admin" && (
        <div className="w-full h-auto p-4 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 shadow-md rounded transition duration-300">
          <div className="flex items-center mb-2 lg:mb-0">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-0.5 px-1.5 md:py-1 md:px-2 rounded mr-2 transition duration-300"
              onClick={handleDeleteAdmin}
              title="Remove Admin"
            >
              Delete
            </button>
            <input
              type="email"
              placeholder="Admin Email"
              value={deleteEmail}
              onChange={handleDeleteEmailChange}
              className="border border-gray-300 rounded-md py-0.5 px-1.5 md:px-2 md:py-1 mr-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
            {isLoadingDel && <Spinner />}
          </div>

          <div className="text-lg text-gray-900 mb-2 md:mb-0 dark:text-white font-bold transition duration-300">
            {text}
          </div>

          <div className="flex items-center">
            {isLoadingAdd && <Spinner />}
            <input
              type="email"
              placeholder="Admin Email"
              value={addEmail}
              onChange={handleAddEmailChange}
              className="border border-gray-300 rounded-md py-0.5 px-1.5 md:px-2 md:py-1 mx-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-0.5 px-1.5 md:py-1 md:px-2 rounded mr-2 transition duration-300"
              onClick={handleAddAdmin}
              title="Add Admin"
            >
              Add
            </button>
          </div>
        </div>
      )}
      {userType === "Admin" && (
        <div className="w-full h-auto p-4 flex justify-around items-center bg-white dark:bg-gray-800 shadow-md rounded transition duration-300">
          <div className="text-lg text-gray-900 dark:text-white font-bold transition duration-300">
            {text}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminHeader;
