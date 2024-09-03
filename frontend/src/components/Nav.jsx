import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Logout from "../pages/Logout";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="bg-green-500 flex justify-between">
      <div>
        <div className="bg-blue-800 inline">MyBookHub</div>
        <div className="text-xl font-bold">NavBar</div>
      </div>
      {user ? (
        <Logout />
      ) : (
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Nav;
