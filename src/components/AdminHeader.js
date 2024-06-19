import React, { useContext, useState } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";

function AdminHeader({ userType, text, fetchUsers }) {
  const [addEmail, setAddEmail] = useState("");
  const [deleteEmail, setDeleteEmail] = useState("");
  const context = useContext(QuestionsContext);
  const { setError, host } = context;

  const handleAddEmailChange = (e) => {
    setAddEmail(e.target.value);
  };

  const handleDeleteEmailChange = (e) => {
    setDeleteEmail(e.target.value);
  };

  const handleAddAdmin = async () => {
    if (addEmail && addEmail.trim() !== "") {
      try {
        const response = await fetch(`${host}/api/v1/auth/adminEmails/add`, {
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
      } catch (error) {
        setError(error.message || "Error adding admin email");
      }
    }
  };

  const handleDeleteAdmin = async () => {
    if (deleteEmail.trim() !== "") {
      try {
        const response = await fetch(`${host}/api/v1/auth/adminEmails/delete`, {
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
      } catch (error) {
        setError(error.message || "Error removing admin email");
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
          </div>
  
          <div className="text-lg text-gray-900 mb-2 md:mb-0 dark:text-white font-bold transition duration-300">
            {text}
          </div>
  
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Admin Email"
              value={addEmail}
              onChange={handleAddEmailChange}
              className="border border-gray-300 rounded-md py-0.5 px-1.5 md:px-2 md:py-1 mr-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-0.5 px-1.5 md:py-1 md:px-2 rounded mr-2 transition duration-300"
              onClick={handleAddAdmin}
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
