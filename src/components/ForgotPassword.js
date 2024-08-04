import React, { useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import { Link, useNavigate } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";

function ForgotPassword() {
  const context = useContext(QuestionsContext);
  const { setError } = context;
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setIsTimerRunning(false);
            clearInterval(interval);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const sendVerificationCode = async () => {
    if (!email) {
      setError("Please Enter Valid Email");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/otp/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Network response was not ok");
      }
      localStorage.setItem("otpToken", json.otpToken);
      setError(json.message);
      setIsLoading(false);
      setIsTimerRunning(true);
      setSendOTP(true);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const verifyCodeAndChangePassword = async () => {
    if (!email) {
      setError("Please Enter Valid Email");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword: newPassword,
            otp: verificationCode,
            otpToken: localStorage.getItem("otpToken"),
          }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Network response was not ok");
      }
      localStorage.removeItem("otpToken");
      setError(json.message);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-20 px-4 py-10 lg:py-20 w-full lg:w-2/3 xl:w-1/2 mx-auto">
      <div className="w-8 h-8 mb-2">{isLoading && <Spinner />}</div>
      <div className="w-full max-w-screen-md p-7 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Forgot Password
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email address <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="abcxyz@gmail.com"
              className="mt-1 block w-full lg:w-3/4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              required
            />
            <button
              className={`ml-2 px-3 py-2 mt-1 rounded-md text-white font-bold focus:shadow-outline ${
                isTimerRunning
                  ? "bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600"
              }`}
              onClick={isTimerRunning ? null : sendVerificationCode}
              disabled={isTimerRunning || isLoading}
            >
              {isLoading
                ? "Sending..."
                : isTimerRunning
                ? `Resend in ${timer}s`
                : "Send Code"}
            </button>
          </div>
        </div>
        {sendOTP && (
          <>
            <div className="mb-4">
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Verification Code"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                id="verificationCode"
                name="verificationCode"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="New Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                name="newPassword"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </div>
            <button
              className="mt-1 block w-full px-3 py-2 bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold rounded-md focus:shadow-outline"
              onClick={verifyCodeAndChangePassword}
              disabled={!verificationCode || isLoading}
            >
              Change Password
            </button>
          </>
        )}
        <p className="text-center text-sm text-gray-600 mt-2">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-500 dark:text-orange-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
