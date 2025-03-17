// src/pages/WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/img1.jpg'; // Correct path to your image

const WelcomePage = () => {
  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left Section - Words */}
      <div className="flex flex-col justify-center items-start pl-16 pr-8 text-blue-800 space-y-8 w-1/2 font-medical"> {/* Added padding-left */}
        {/* App Title */}
        <h1 className="text-7xl font-bold">Welcome to MediPay</h1> {/* Increased size */}

        {/* Description */}
        <p className="text-xl">
          MediPay helps you manage healthcare expenses with ease. Save, pay bills, get insurance, and access medical loans—all in one platform.
        </p>

        {/* Get Started Button */}
        <Link to="/register">
          <button className="bg-sky-500 text-white px-6 py-3 rounded-lg shadow-lg text-xl font-semibold transition-all duration-300 hover:bg-sky-400 hover:shadow-2xl">
            Get Started
          </button>
        </Link>
      </div>

      {/* Right Section - Cards */}
      <div className="flex flex-col items-center justify-center w-1/2 p-8 space-y-6">
        <div className="flex w-full justify-between space-x-6">
          <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-6 rounded-lg shadow-lg w-64 text-center">
            <h2 className="text-2xl font-semibold">Health Savings Wallet</h2>
          </div>
          <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-6 rounded-lg shadow-lg w-64 text-center">
            <h2 className="text-2xl font-semibold">Cross Border Health Insurance</h2>
          </div>
        </div>
        <div className="flex w-full justify-between space-x-6">
          <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-6 rounded-lg shadow-lg w-64 text-center">
            <h2 className="text-2xl font-semibold">Instant Health Payments</h2>
          </div>
          <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-6 rounded-lg shadow-lg w-64 text-center">
            <h2 className="text-2xl font-semibold">Buy Now, Pay Later</h2>
          </div>
        </div>
        {/* Bottom Centered Card */}
        <div className="bg-[rgba(135,206,235,0.6)] text-blue-800 p-6 rounded-lg shadow-lg w-64 text-center">
          <h2 className="text-2xl font-semibold">Telemedicine and Health Marketplace</h2>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
