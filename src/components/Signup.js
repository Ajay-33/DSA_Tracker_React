import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import QuestionsContext from "../context/questions/QuestionsContext";
import Spinner from "./Spinner";

function Signup() {
  const [credentials, setCredentials] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    otp: "", // New field for OTP
  });

  const navigate = useNavigate();
  const context = useContext(QuestionsContext);
  const { setUserType, setError } = context;
  const [isLoading, setIsLoading] = useState(false);

  const [otpSending, setOtpSending] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer;
    if (!canResendOtp && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (!canResendOtp && remainingTime === 0) {
      setCanResendOtp(true);
      setRemainingTime(60);
    }
    return () => clearInterval(timer);
  }, [canResendOtp, remainingTime]);

  const sendOTP = async () => {
    const { email } = credentials;
    try {
      setOtpSending(true);
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/otp/signup`,
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
      setCanResendOtp(false);
    } catch (error) {
      setError(
        error.message || "There was an error sending the OTP. Please try again"
      );
      setIsLoading(false);
    } finally {
      setOtpSending(false);
      setIsLoading(false);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password, cpassword, otp } = credentials;

    if (cpassword !== password) {
      setError("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: fname,
            lname: lname,
            otpToken: localStorage.getItem("otpToken"),
            email,
            password,
            otp,
          }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Network response was not ok");
      }

      if (json.success) {
        localStorage.removeItem("otpToken");
        setIsLoading(false);
        localStorage.setItem("userName", json.user.firstName);
        localStorage.setItem("token", json.token);
        if (
          json.user.userType === "Admin" ||
          json.user.userType === "Super Admin"
        ) {
          localStorage.setItem("userType", json.user.userType);
          setUserType(json.user.userType);
          navigate("/admin");
        } else {
          localStorage.setItem("userType", "User");
          setUserType("User");
          navigate("/");
        }
        setError("Account created Successfully");
      }
    } catch (error) {
      setError(
        error.message ||
          "There was an error creating your account.Please try again"
      );
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center  lg:justify-start lg:mt-20 2xl:mt-44 min-h-screen px-4 w-screen md:w-full lg:w-2/3 xl:w-1/2 mx-auto">
      <div className="w-8 h-8">{isLoading && <Spinner />}</div>
      <div className="w-full max-w-md mt-2 p-8 bg-white dark:bg-gray-800 rounded-lg mb-16 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-7">
          Create an account
        </h2>
        <form onSubmit={handleSubmission} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="fname"
                name="fname"
                required
                minLength={3}
                onChange={onChange}
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="lname"
                name="lname"
                required
                minLength={1}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="email"
              name="email"
              required
              onChange={onChange}
            />
          </div>
          <>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Verification Code <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="otp"
                  name="otp"
                  required
                  onChange={onChange}
                />
                <button
                  type="button"
                  title="Email Verification Code"
                  className={`ml-2 px-2 py-2 mt-1 rounded-md ${
                    canResendOtp
                      ? "bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                      : "bg-gray-500"
                  } w-1/3 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline`}
                  onClick={canResendOtp ? sendOTP : null}
                  disabled={!canResendOtp || otpSending}
                  style={{ minWidth: "fit-content" }}
                >
                  {otpSending
                    ? "Sending..."
                    : canResendOtp
                    ? "Send Code"
                    : `Resend in ${remainingTime}s`}
                </button>
              </div>
            </div>
          </>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="password"
              name="password"
              required
              minLength={8}
              onChange={onChange}
            />
          </div>
          <div>
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="cpassword"
              name="cpassword"
              required
              minLength={5}
              onChange={onChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              title="Signup"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            title="Login"
            className="text-blue-500 dark:text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
