import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await apiClient.post("/api/users/login", { email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto border-8 flex flex-col items-center w-3/5 mt-2 gap-2"
      >
        <label htmlFor="Email" className="border-2">
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="Email"
            className="bg-gray-400"
            required
          />
        </label>
        <label htmlFor="pwd" className="border-2">
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="pwd"
            className="bg-gray-400"
            required
          />
          <p>Forgot password</p>
        </label>
        <div className="w-1/5 flex justify-between">
          <button type="submit" className="bg-pink-200">
            Login
          </button>
          <button
            className="bg-violet-300"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
