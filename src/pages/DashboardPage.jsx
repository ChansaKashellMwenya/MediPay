import React, { useState } from 'react';
import { FaHome, FaWallet, FaHospital, FaFileInvoiceDollar, FaPhoneAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate(); // Initialize navigate

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    { name: "Wallet", icon: <FaWallet />, link: "/dashboard/wallet" },
    { name: "Medical Loans", icon: <FaFileInvoiceDollar />, link: "/dashboard/medical-loans" },
    { name: "Insurance", icon: <FaHospital />, link: "/dashboard/insurance" },
    { name: "Telemedicine & Marketplace", icon: <FaPhoneAlt />, link: "/dashboard/telemedicine" }, // Combined menu
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    navigate(item.link); // Navigate to the corresponding page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">MediPay</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg 
                ${activeMenu === item.name ? "bg-blue-800" : ""} // Active menu color
                hover:bg-blue-800`} // Hover color
              onClick={() => handleMenuClick(item)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-4 text-black text-center">{activeMenu}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-black text-center">Content for {activeMenu} will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
