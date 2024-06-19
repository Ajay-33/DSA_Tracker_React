import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RoleCard from "./RoleCard";

function PaginatedRoleList({
  roles,
  title,
  currentPage,
  onPageChange,
  itemsPerPage,
  fetchUsers,
}) {
  const paginatedRoles = roles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < roles.length) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="space-y-4 mt-5 p-3 rounded-md bg-gray-100 dark:bg-gray-700">
      <span className="text-xl mb-4 font-semibold text-gray-900 dark:text-gray-100 hover:underline hover:cursor-default">
        {title} ({roles.length})
      </span>
      {paginatedRoles.map((role) => (
        <RoleCard key={role._id} role={role} fetchUsers={fetchUsers} />
      ))}
      <div className="flex justify-between items-center">
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition duration-300"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <FaArrowLeft />
        </button>
        <div className="text-gray-500 dark:text-gray-300">
          Page {currentPage + 1}
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 transition duration-300"
          onClick={nextPage}
          disabled={(currentPage + 1) * itemsPerPage >= roles.length}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default PaginatedRoleList;
