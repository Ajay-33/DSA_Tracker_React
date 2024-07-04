import React, { useContext, useEffect, useState, useCallback } from "react";
import QuestionsContext from "../context/questions/QuestionsContext";
import { useNavigate } from "react-router-dom";
import CategoriesAccordion from "./CategoriesAccordion";
import RolesMenu from "./RolesMenu";
import AdminHeader from "./AdminHeader";

function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const context = useContext(QuestionsContext);
  const { userType, setError } = context;

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/auth/users`, {
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
      setLoadingUsers(false);
    } catch (error) {
      setError(error.message || "Error fetching users:");
      setLoadingUsers(false);
      if(error.message==="Session Expired"){
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      }
    }
  }, [setError,navigate]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/v1/category/show`, {
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
      setCategories(json);
      setLoadingCategories(false);
    } catch (error) {
      setError(error.message || "Error fetching categories:");
      setLoadingCategories(false);
      if(error.message==="Session Expired"){
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      }
    }
  }, [setError,navigate]);

  useEffect(() => {
    if (userType === "User") {
      navigate("/");
    } else {
      fetchCategories();
      fetchUsers();
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
            loadingCategories={loadingCategories}
          />
          <RolesMenu
            users={users}
            admins={admins}
            superAdmins={superAdmins}
            fetchUsers={fetchUsers}
            loadingUsers={loadingUsers}
          />
      </div>
    </div>
  );
}

export default AdminPanel;
