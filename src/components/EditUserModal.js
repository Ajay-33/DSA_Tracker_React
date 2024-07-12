import React, { useState, useEffect, useContext } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import Spinner from "./Spinner";

function EditUserModal({ user, onClose, fetchUsers }) {
  const context = useContext(QuestionsContext);
  const { setError } = context;
  const [role, setRole] = useState("");
  const[isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    if (user) {
      setRole(user.userType);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/auth/users/update/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            userType: role,
          }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setError(
        `Updated role of ${user.firstName} ${user.lastName} to ${user.userType}`
      );
      setIsLoading(false)
      fetchUsers();
      onClose();
    } catch (error) {
      setError(error.message || "Failed to update role");
      setIsLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 p-4 sm:p-8">
    <div className="w-8 h-8">{isLoading && <Spinner />}</div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          Edit Role
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1.5 ">
              ID
            </label>
            <input
              type="text"
              value={user._id}
              readOnly
              className=" rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={user.firstName}
              readOnly
              className="rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={user.lastName}
              readOnly
              className="rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1.5">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              title="Close"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              title="Update Role"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
