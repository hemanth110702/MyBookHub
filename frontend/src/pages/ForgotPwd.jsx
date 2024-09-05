import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const ForgotPwd = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [status, setStatus] = useState("");
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
      await apiClient.post("/api/check-email/send-otp", { email });
      setOtpStatus("OTP sent to email.");
      setOtpTimer(300);
      setIsOtpButtonDisabled(true);
    } catch (error) {
      setOtpStatus("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await apiClient.post("/api/check-email/verify-otp", { email, otp });
      setIsEmailVerified(true);
      setOtpStatus("Email Verified");
    } catch (error) {
      console.log(error);
      setOtpStatus("Invalid OTP");
    }
  };

  const checkPassword = () => {
    if (password.length < 8) {
      setPwdErr("Must be at least 8 characters.");
    } else if (!/[0-9]/.test(password)) {
      setPwdErr("Must include 1 number.");
    } else if (!/[A-Z]/.test(password)) {
      setPwdErr("Must include 1 uppercase letter.");
    } else if (!/[a-z]/.test(password)) {
      setPwdErr("Must include 1 lowercase letter.");
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPwdErr("Must include 1 special character.");
    } else {
      setPwdErr("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwdErr) return;

    try {
      const response = await apiClient.post("/api/users/forgot-password", {
        email,
        password,
      });
      setStatus(response.data.message);
    } catch (error) {
      console.log(error);
      setStatus("Failed to update password");
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center border-8 w-3/5 gap-2"
      >
        <label htmlFor="mail">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            id="mail"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-2/4 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
          New Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPassword();
            }}
            id="pwd"
            className="bg-gray-400"
            required
            autoComplete="current-password"
            disabled={!isEmailVerified}
          />
          {pwdErr && password.length > 0 && (
            <p className="text-red-500">{pwdErr}</p>
          )}
        </label>
        <div className="w-1/5 flex justify-between">
          <button
            type="submit"
            className="bg-violet-400"
            disabled={!isEmailVerified || !!pwdErr}
          >
            Update Password
          </button>
          {status && <p>{status}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <button
          type="button"
          className="bg-blue-400"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPwd;
