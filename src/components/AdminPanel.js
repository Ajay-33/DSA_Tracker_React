import React, { useContext, useEffect, useState, useCallback } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import { useNavigate } from "react-router-dom";
import CategoriesAccordion from "./CategoriesAccordion";
import RolesMenu from "./RolesMenu";
import AdminHeader from "./AdminHeader";

function AdminPanel() {
  const navigate = useNavigate();
  const host = "http://localhost:8080";
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [categories, setCategories] = useState([]);

  const context = useContext(QuestionsContext);
  const { userType, setError } = context;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }

      const usersData = json.filter((user) => user.userType === "User");
      const adminsData = json.filter((user) => user.userType === "Admin");
      const superAdminsData = json.filter(
        (user) => user.userType === "Super Admin"
      );
      setUsers(usersData);
      setAdmins(adminsData);
      setSuperAdmins(superAdminsData);
    } catch (error) {
      setError(error.message || "Error fetching users:");
    }
  }, [setError]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/category/show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      console.log(json);
      setCategories(json);
    } catch (error) {
      setError(error.message || "Error fetching categories:");
    }
  }, [setError]);

  useEffect(() => {
    if (userType === "User") {
      navigate("/");
    } else {
      fetchCategories();
      fetchUsers();
      console.log(userType);
    }
  }, [userType, navigate, fetchCategories, fetchUsers]);

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 transition duration-500">
      <AdminHeader
        userType={userType}
        text="Admin Panel"
        fetchUsers={fetchUsers}
      />
      <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
        <CategoriesAccordion
          categories={categories}
          fetchCategories={fetchCategories}
        />
        <RolesMenu
          users={users}
          admins={admins}
          superAdmins={superAdmins}
          fetchUsers={fetchUsers}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
