import React, { useState } from "react";
import { Link } from "react-router-dom";
import RoleCard from "./RoleCard";
import PaginatedRoleList from "./PaginatedRoleList";
import Spinner from "./Spinner";

function RolesMenu({ superAdmins, admins, users, fetchUsers, loadingUsers }) {
  const [userPage, setUserPage] = useState(0);
  const [adminPage, setAdminPage] = useState(0);
  const itemsPerPage = 4;

  return (
    <div className="w-full h-fit lg:w-1/4 p-6 bg-white border border-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-lg shadow-lg transition duration-500">
      <div className="mb-4 flex justify-center">
        <Link
          to="/roles"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition duration-300 hover:underline"
          title="View all Users"
        >
          User & Admin Roles
        </Link>
      </div>
      {loadingUsers ? (
        <Spinner/>
      ) : (
        <>
          <div className="space-y-4 p-3 pb-5 rounded-md bg-gray-100 dark:bg-gray-700 mt-5">
            <span className="text-xl mb-4 font-semibold text-gray-900 dark:text-gray-100 hover:underline hover:cursor-default">
              SuperAdmins ({superAdmins.length})
            </span>
            {superAdmins.map((superAdmin) => (
              <RoleCard
                key={superAdmin._id}
                role={superAdmin}
                fetchUsers={fetchUsers}
              />
            ))}
          </div>

          <PaginatedRoleList
            roles={admins}
            title="Admins"
            currentPage={adminPage}
            onPageChange={setAdminPage}
            itemsPerPage={itemsPerPage}
            fetchUsers={fetchUsers}
          />

          <PaginatedRoleList
            roles={users}
            title="Users"
            currentPage={userPage}
            onPageChange={setUserPage}
            itemsPerPage={itemsPerPage}
            fetchUsers={fetchUsers}
          />
        </>
      )}
    </div>
  );
}

export default RolesMenu;
