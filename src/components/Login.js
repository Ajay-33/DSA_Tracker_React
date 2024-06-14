import React, { useContext,useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";
function Login() {
  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { setUserType,setError } = context;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      if (response.ok && json.success) {
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

      }
    } catch (error) {
      setError(error.message || "An error occurred during login. Please try again");
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center mt-16 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg ">
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Have an Account ?
        </h2>
        <form onSubmit={handleSubmission}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
              value={credentials.password}
              onChange={onChange}
              id="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
