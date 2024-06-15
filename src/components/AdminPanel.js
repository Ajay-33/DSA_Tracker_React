import React, { useContext, useEffect, useState, useCallback } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import { useNavigate } from "react-router-dom";
import CategoriesAccordion from "./CategoriesAccordion";
import RolesMenu from "./RolesMenu";

function AdminPanel() {
  const navigate = useNavigate();
  const host = "http://localhost:8080";
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [categories, setCategories] = useState([]);

  const context = useContext(QuestionsContext);
  const { userType } = context;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch responses");
      }
      const json = await response.json();
      const usersData = json.filter((user) => user.userType === "User");
      const adminsData = json.filter((user) => user.userType === "Admin");
      const superAdminsData = json.filter(
        (user) => user.userType === "Super Admin"
      );
      setUsers(usersData);
      setAdmins(adminsData);
      setSuperAdmins(superAdminsData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${host}/api/v1/category/show`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      console.log(json);
      setCategories(json);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    if (userType === "User") {
      navigate("/");
    } else {
      fetchCategories();
      fetchUsers();
    }
  }, [userType, navigate, fetchCategories, fetchUsers]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="w-full h-15 p-4 flex justify-between items-center bg-blue-600 dark:bg-blue-800 shadow-md rounded">
        <div className="w-1/4"></div>
        <div className="text-2xl text-white font-bold">Admin Panel</div>
        <div className="w-1/4"></div>
      </div>

      <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
        <CategoriesAccordion categories={categories} fetchCategories={fetchCategories} />
        <RolesMenu users={users} admins={admins} superAdmins={superAdmins} />
      </div>
    </div>
  );
}

export default AdminPanel;
