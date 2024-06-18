import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

function RoleCard({ role, fetchUsers }) {
  const [deleteUser, setDeleteUser] = useState(false);
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-600 p-3 rounded-lg shadow-md transition duration-500 hover:shadow-xl">
      <div className="relative group">
        <div className="text-gray-900 dark:text-gray-100">{role.name}</div>
      </div>
      <div className="flex space-x-2">
        <button
          className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500 transition duration-300"
          onClick={() => {
            setDeleteUser(true);
          }}
        >
          <FaTrash />
        </button>
      </div>
      {deleteUser && (
        <ConfirmationModal
          fetchUsers={fetchUsers}
          selectedUser={role}
          message={`Are you sure you want to delete ${role.name} (${role.userType}) ?`}
          onCancel={() => {
            setDeleteUser(false);
          }}
        />
      )}
    </div>
  );
}

export default RoleCard;
