import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useRegisterStore } from "../store/useRegisterStore";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const {
    registrationFormData,
    setRegistrationFormData,
    register,
    registerFeedback,
    setRegisterFeedback,
    usernameFeedback,
    setUsernameFeedback,
  } = useRegisterStore();

  const login = useAuthStore((state) => state.login);

  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);

  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    } else {
      setIsOtpButtonDisabled(false);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  const handleSendOtp = async () => {
    try {
      await apiClient.post("/api/check-email/send-otp", {
        email: registrationFormData.email,
      });
      setOtpStatus("Otp sent to email.");
      setOtpTimer(300);
      setIsOtpButtonDisabled(true);
    } catch (error) {
      setOtpStatus("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await apiClient.post("/api/check-email/verify-otp", {
        email: registrationFormData.email,
        otp,
      });
      setIsEmailVerified(true);
      setOtpStatus("Email Verified");
    } catch (error) {
      console.log(error);
      setOtpStatus("Invalid Otp");
    }
  };

  const checkUsername = async (username) => {
    const minLength = 5;
    const maxLength = 15;
    const pattern = /^[a-zA-Z0-9_]{5,15}$/;

    if (username.length < minLength || username.length > maxLength) {
      setUsernameFeedback({
        available: false,
        feedback: "Username must be in 5-15 characters long.",
      });
    } else if (!pattern.test(username)) {
      setUsernameFeedback({
        available: false,
        feedback:
          "Username must only contain letters, numbers, and underscores.",
      });
    }

    try {
      const response = await apiClient.get(
        `/api/authors/check-username?username=${username}`
      );
      if (response.data.available) {
        setUsernameFeedback({
          available: true,
          feedback: response.data.message,
        });
      } else {
        setUsernameFeedback({
          available: false,
          feedback: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameFeedback({
        available: false,
        feedback:
          "An error occurred while checking the username. Try again later.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
    if (name == "username") checkUsername(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = registrationFormData;
    if (!username || !email || !password) {
      setRegisterFeedback({
        error: true,
        feedback: "all fields are mandatory",
      });
    } else if (!usernameFeedback.available) {
      setRegisterFeedback({
        error: true,
        feedback: "please choose a unique username",
      });
    } else {
      setRegisterFeedback({
        error: false,
        feedback: "",
      });

      try {
        const data = apiClient.post(
          "/api/users/register",
          registrationFormData
        );
        login(data);
        navigate("/");
      } catch (err) {
        console.log(err);
        setRegisterFeedback("Server Busy!!! Please try after some time.");
      }
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center border-8 w-3/5 gap-2"
      >
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={registrationFormData.username}
            id="username"
            onChange={handleChange}
            className={`mt-1 block w-2/4 px-3 py-2 border ${
              usernameFeedback.error && registrationFormData.username.length > 0
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            required
          />
          <p
            className={`text-sm mt-2 w-2/4 ${
              usernameFeedback.available ? "text-green-500" : "text-red-500"
            }`}
          >
            {usernameFeedback.feedback}
          </p>
        </label>
        <label htmlFor="mail">
          Email:
          <input
            type="email"
            name="email"
            value={registrationFormData.email}
            id="mail"
            onChange={handleChange}
            className={`mt-1 block w-2/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            required
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={isOtpButtonDisabled}
          >
            {isOtpButtonDisabled ? `Resend OTP in ${otpTimer}s` : "Send OTP"}
          </button>
        </label>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="button" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
          <p>{otpStatus}</p>
        </label>
        <label htmlFor="pwd">
          Password:
          <input
            type="password"
            name="password"
            value={registrationFormData.password}
            onChange={handleChange}
            id="pwd"
            className="bg-gray-400"
            required
            autoComplete="current-password"
          />
        </label>
        <div className="w-1/5 flex justify-between">
          <button
            type="submit"
            className="bg-violet-400"
            disabled={!isEmailVerified}
          >
            Register
          </button>
          {registerFeedback.error ? (
            <p className="text-red-500">{registerFeedback.feedback}</p>
          ) : (
            ""
          )}{" "}
          <br />
        </div>
        <button className="bg-blue-400" onClick={() => navigate("/login")}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
