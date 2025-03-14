import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../images/img1.jpg"; // Same as Welcome Page

const RegistrationPage = () => {
  const [fullName, setFullName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [dob, setDob] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin.length !== 4 || confirmPin.length !== 4) {
        alert("PIN must be exactly 4 digits!");
        return;
      }
      if (pin !== confirmPin) {
        alert("PINs do not match!");
        return;
      }
      alert("Registration complete!");
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Your MediPay Account
        </h1>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

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
              <label className="block font-semibold">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">National ID / Insurance Number</label>
              <input
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Set 4-Digit PIN</label>
              <input
                type="text"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (value.length <= 4) setPin(value); // Restrict to 4 digits
                }}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-center"
                maxLength={4}
                inputMode="numeric"
                pattern="\d{4}"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Confirm PIN</label>
              <input
                type="text"
                value={confirmPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (value.length <= 4) setConfirmPin(value); // Restrict to 4 digits
                }}
                className="w-full p-3 border-2 border-blue-500 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-center"
                maxLength={4}
                inputMode="numeric"
                pattern="\d{4}"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Finish Registration
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account? {" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Go to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
