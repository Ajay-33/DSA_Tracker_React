import React, { useContext } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";

function ConfirmationModal({
  message,
  selectedCategory,
  selectedUser,
  selectedQuestion,
  fetchCategories,
  onCancel,
  fetchUsers,
}) {
  const context = useContext(QuestionsContext);
  const { host, setError } = context;

  const onDeleteCategory = async () => {
    try {
      const response = await fetch(
        `${host}/api/v1/category/delete/${selectedCategory._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      onCancel();
      fetchCategories();
    } catch (error) {
      setError(error.message || "Error deleting Category");
      onCancel();
    }
  };

  const onDeleteQuestion = async () => {
    try {
      const response = await fetch(
        `${host}/api/v1/question/delete/${selectedQuestion._id}/${selectedCategory._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      onCancel();
      fetchCategories();
    } catch (error) {
      setError(error.message || "Error deleting Question");
      onCancel();
    }
  };

  const onDeleteUser = async () => {
    try {
      const response = await fetch(
        `${host}/api/v1/auth/users/delete/${selectedUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      onCancel();
      fetchUsers();
    } catch (error) {
      setError(error.message || "Error deleting Question");
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
          Confirm Deletion
        </h2>
        <p className="mb-2 text-center text-gray-700 dark:text-gray-300">
          {message}
        </p>
        <p className="mb-4 text-center text-red-600 dark:text-red-400">
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={
              selectedQuestion
                ? onDeleteQuestion
                : selectedUser
                ? onDeleteUser
                : onDeleteCategory
            }
            className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
