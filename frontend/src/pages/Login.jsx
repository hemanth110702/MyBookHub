import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form
        action="#"
        className="mx-auto border-8 flex flex-col items-center w-3/5 mt-2 gap-2"
      >
        <label htmlFor="Email" className="border-2">
          Email: <input type="email" id="Email" className="bg-gray-400" />
        </label>
        <label htmlFor="pwd" className="border-2">
          Password: <input type="password" id="pwd" className="bg-gray-400" />
        </label>
        <div className="w-1/5 flex justify-between">
          <button className="bg-pink-200">Login</button>
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
