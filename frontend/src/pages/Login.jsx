import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await apiClient.post("/api/users/login", {
        email,
        password,
      });
      const data = response.data;
      login(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleLogin}
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
