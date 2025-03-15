import { useState } from "react";
import { FaWallet, FaHospital, FaFileInvoiceDollar, FaPhoneAlt, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState("Profile");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Wallet", icon: <FaWallet /> },
    { name: "Insurance", icon: <FaHospital /> },
    { name: "Medical Loans", icon: <FaFileInvoiceDollar /> },
    { name: "Telemedicine", icon: <FaPhoneAlt /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  const handleMenuClick = (itemName) => {
    setActiveMenu(itemName);
    if (itemName === "Dashboard") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${itemName.toLowerCase().replace(/ /g, '-')}`);
    }
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
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg ${
                activeMenu === item.name ? "bg-blue-700" : ""
              }`}
              onClick={() => handleMenuClick(item.name)}
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

export default ProfilePage;
