import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const {
    registrationFormData,
    setRegistrationFormData,
    register,
    usernameFeedback,
    setUsernameFeedback,
  } = useAuthStore();
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");

  const checkUsername = async (username) => {
    if (!/^[a-zA-Z0-9_]{5,15}$/.test(username)) {
      setUsernameFeedback({
        available: false,
        feedback:
          "Username must be 5-15 characters long and can contain letters, numbers, and underscores.",
      });
      return;
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
      setFeedback("An error occurred while checking the username.");
      setFeedbackClass("text-red-500");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value });
    if(name == "username")checkUsername(value);
  };

  const handleRegister = async () => {};

  return (
    <div className="flex justify-center mt-8">
      <form
        action={handleRegister}
        className="flex flex-col items-center border-8 w-3/5 gap-2"
      >
        <label htmlFor="name">
          Full Name :
          <input
            type="text"
            name="fullName"
            value={registrationFormData.fullName}
            id="name"
            onChange={handleChange}
            className="bg-gray-400"
            required
          />
        </label>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={registrationFormData.username}
            id="username"
            onChange={handleChange}
            className="bg-gray-400"
            required
          />
          <p
            className={`text-sm mt-2 ${
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
            className="bg-gray-400"
            required
          />
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
          <button type="submit" className="bg-violet-400">
            Register
          </button>
          <button className="bg-blue-400" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
