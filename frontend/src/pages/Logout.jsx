import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div>username</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Logout;
