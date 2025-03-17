import React, { useState, useEffect } from 'react';
import { FaHome, FaWallet, FaHospital, FaFileInvoiceDollar, FaPhoneAlt, FaUser, FaCog } from 'react-icons/fa';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/dashboard" },
    { name: "Wallet", icon: <FaWallet />, link: "/dashboard/wallet" },
    { name: "Medical Loans", icon: <FaFileInvoiceDollar />, link: "/dashboard/medical-loans" },
    { name: "Insurance", icon: <FaHospital />, link: "/dashboard/insurance" },
    { name: "Telemedicine", icon: <FaPhoneAlt />, link: "/dashboard/telemedicine" },
    { name: "Profile", icon: <FaUser />, link: "/dashboard/profile" },
    { name: "Settings", icon: <FaCog />, link: "/dashboard/settings" },
  ];


  const [activeMenu, setActiveMenu] = useState("Dashboard");


  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenu = menuItems.find(item => currentPath === item.link || currentPath.startsWith(item.link + '/')) || menuItems[0];
    setActiveMenu(currentMenu.name);
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    navigate(item.link);
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
                ${activeMenu === item.name ? "bg-blue-800" : ""}
                hover:bg-blue-800`}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        {/* This is where nested routes will be rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;