import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../images/img1.jpg"; // Same as Welcome & Register Page

const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Placeholder Authentication Logic
    if (phoneOrEmail === "test@example.com" && pin === "1234") {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Login to MediPay</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-semibold">Phone Number or Email</label>
            <input
              type="text"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Enter PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              maxLength={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-pin" className="text-blue-600 hover:text-blue-800 font-semibold">
            Forgot PIN?
          </Link>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
