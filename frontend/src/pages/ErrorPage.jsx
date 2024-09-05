import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate("/");

  return (
    <div>
      <p>
        you need to login to view this website{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </p>
      <p>
        Don't have an account?
        <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
};

export default ErrorPage;
