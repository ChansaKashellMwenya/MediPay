import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../images/img1.jpg"; 

const ForgotPinPage = () => {
  const [step, setStep] = useState(1);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      alert("OTP sent to your email/phone");
      setStep(2);
    } else if (step === 2) {
      if (otp === "1234") {
        setStep(3);
      } else {
        alert("Incorrect OTP. Try again.");
      }
    } else if (step === 3) {
      alert("PIN reset successful!");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Your PIN</h1>
        
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Enter Email or Phone</label>
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Enter New PIN</label>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
              Reset PIN
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Remembered your PIN? {" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Go back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPinPage;
