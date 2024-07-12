import React, { useContext, useState } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import Spinner from "./Spinner";

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
  const { setError } = context;
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteCategory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/category/delete/${selectedCategory._id}`,
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
      fetchCategories();
      setError(`Deleted Category ${selectedCategory.category_name}`);
      setIsLoading(false);
      onCancel();
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "Error deleting Category");
      onCancel();
    }
  };

  const onDeleteQuestion = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/question/delete/${selectedQuestion._id}/${selectedCategory._id}`,
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
      fetchCategories();
      setError(`Deleted Question ${selectedQuestion.question_name}`);
      setIsLoading(false);
      onCancel();
    } catch (error) {
      setError(error.message || "Error deleting Question");
      setIsLoading(false);
      onCancel();
    }
  };

  const onDeleteUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/auth/users/delete/${selectedUser._id}`,
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
      fetchUsers();
      setError(`Succesfully deleted User`);
      setIsLoading(false);
      onCancel();
    } catch (error) {
      setError(error.message || "Error deleting User");
      setIsLoading(false);
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 p-4">
      <div className="w-8 h-8">{isLoading && <Spinner />}</div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm mt-2 w-full">
        <h2 className="text-lg font-semibold mb-2 text-center text-gray-900 dark:text-gray-100">
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
            title="Cancel"
            className="w-1/2 px-2 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
            title="Delete"
            className="w-1/2 px-2 py-1 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
