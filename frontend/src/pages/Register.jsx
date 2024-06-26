import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackClass, setFeedbackClass] = useState('');

  const checkUsername = async (username) => {
    if (!/^[a-zA-Z0-9_]{5,15}$/.test(username)) {
      setFeedback(
        "Username must be 5-15 characters long and can contain letters, numbers, and underscores."
      );
      setFeedbackClass("text-red-500");
      return;
    }

    try {
      const response = await apiClient.get(
        `/api/authors/check-username?username=${username}`
      );
      if (response.data.available) {
        setFeedback(response.data.message);
        setFeedbackClass("text-green-500");
      } else {
        setFeedback(response.data.message);
        setFeedbackClass("text-red-500");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setFeedback("An error occurred while checking the username.");
      setFeedbackClass("text-red-500");
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    checkUsername(newUsername);
  };

  return (
    <div className="flex justify-center mt-8">
      <form
        action="#"
        className="flex flex-col items-center border-8 w-3/5 gap-2"
      >
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="bg-gray-400"
            required
          />
          <p className={`text-sm mt-2 ${feedbackClass}`}>{feedback}</p>
        </label>
        <label htmlFor="mail">
          Email:
          <input
            type="email"
            name="email"
            id="mail"
            className="bg-gray-400"
            required
          />
        </label>
        <label htmlFor="pwd">
          Password:
          <input
            type="password"
            name="password"
            id="pwd"
            className="bg-gray-400"
            required
          />
        </label>
        <div className="w-1/5 flex justify-between">
          <button className="bg-violet-400">Register</button>
          <button className="bg-blue-400" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
