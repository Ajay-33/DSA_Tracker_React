import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function RoleCard({ role, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-600 p-3 rounded-lg shadow-md transition duration-500 hover:shadow-xl">
      <div className="relative group">
        <div className="text-gray-900 dark:text-gray-100">
          {role.name}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition duration-300"
          onClick={() => onEdit(role)}
        >
          <FaEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 transition duration-300"
          onClick={() => onDelete(role)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default RoleCard;
