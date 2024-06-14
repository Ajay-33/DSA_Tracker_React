import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const context=useContext(QuestionsContext);
  const {setUserType,setError}=context;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
  
    if (cpassword !== password) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.message || 'Network response was not ok');
      }
  
      if (json.success) {
        localStorage.setItem("token", json.token);
          if(json.user.userType==='Admin'||json.user.userType==='Super Admin'){
          localStorage.setItem("userType",json.user.userType);
          setUserType('Admin');
          navigate("/admin");
        }
        else{
          localStorage.setItem("userType",'User');
          setUserType('User');
          navigate("/");
        }
        setError("Account created Successfully");
      }
    } catch (error) {
      setError(error.message || "There was an error creating your account.Please try again")
    }
  }
  
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Create an account
        </h2>
        <form onSubmit={handleSubmission}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400  sm:text-sm"
              id="name"
              name="name"
              required
              minLength={3}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400  sm:text-sm"
              id="email"
              name="email"
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
              id="password"
              name="password"
              required
              minLength={6}
              onChange={onChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400  sm:text-sm"
              id="cpassword"
              name="cpassword"
              required
              minLength={5}
              onChange={onChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
