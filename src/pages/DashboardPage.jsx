import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaWallet,
  FaHospital,
  FaFileInvoiceDollar,
  FaPhoneAlt,
  FaUser,
  FaCog,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaSortAmountDown,
} from 'react-icons/fa';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, link: '/dashboard' },
    { name: 'Wallet', icon: <FaWallet />, link: '/dashboard/wallet' },
    { name: 'Medical Loans', icon: <FaFileInvoiceDollar />, link: '/dashboard/medical-loans' },
    { name: 'Insurance', icon: <FaHospital />, link: '/dashboard/insurance' },
    { name: 'Telemedicine', icon: <FaPhoneAlt />, link: '/dashboard/telemedicine' },
    { name: 'Profile', icon: <FaUser />, link: '/dashboard/profile' },
    { name: 'Settings', icon: <FaCog />, link: '/dashboard/settings' },
  ];

  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your loan repayment is due in 3 days.' },
    { id: 2, text: 'New insurance plan available.' },
  ]);
  const [theme, setTheme] = useState('light');
  const [transactions, setTransactions] = useState([
    {
      transactionID: 1,
      type: 'Wallet Top-up',
      amount: 100.0,
      method: 'Mobile Money',
      status: 'Completed',
      timestamp: '2023-10-01 10:30:00',
      date: '2023-10-01',
    },
    {
      transactionID: 2,
      type: 'Loan Repayment',
      amount: 50.0,
      method: 'Bank Transfer',
      status: 'Pending',
      timestamp: '2023-10-02 14:45:00',
      date: '2023-10-02',
    },
    {
      transactionID: 3,
      type: 'Insurance Premium',
      amount: 30.0,
      method: 'Credit Card',
      status: 'Completed',
      timestamp: '2023-10-03 09:15:00',
      date: '2023-10-03',
    },
    {
      transactionID: 4,
      type: 'Telemedicine Consultation',
      amount: 20.0,
      method: 'Mobile Money',
      status: 'Failed',
      timestamp: '2023-10-04 16:20:00',
      date: '2023-10-04',
    },
  ]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenu = menuItems.find((item) => currentPath === item.link || currentPath.startsWith(item.link + '/')) || menuItems[0];
    setActiveMenu(currentMenu.name);
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    navigate(item.link);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredTransactions = sortedTransactions.filter((transaction) =>
    transaction.type.toLowerCase().includes(filter.toLowerCase())
  );

  const isDashboardPage = location.pathname === '/dashboard';

  // Mock data for cards
  const userFunds = 2500.0;
  const medicalLoanStatus = 'Active (Due in 5 days)';
  const insuranceStatus = 'Enrolled (Expires in 6 months)';

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900'}`}>
      {/* Sidebar (unchanged) */}
      <div className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-900'} text-white p-4`}>
        <h2 className="text-2xl font-bold mb-6">MediPay</h2>
        <div className="flex items-center gap-3 mb-6">
          <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-400">john.doe@example.com</p>
          </div>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg
                ${activeMenu === item.name ? (theme === 'dark' ? 'bg-gray-700' : 'bg-blue-800') : ''}
                hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-800'}`}
              onClick={() => handleMenuClick(item)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
        <button
          className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-blue-800 mt-4"
          onClick={() => navigate('/logout')}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
                }`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 relative"
              onClick={() => setNotifications([])}
            >
              <FaBell className="text-gray-400" />
              {notifications.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute top-0 right-0">
                  {notifications.length}
                </span>
              )}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
              onClick={handleThemeChange}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {isDashboardPage && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {activeMenu}
            </h1>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Wallet Card */}
              <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center text-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 mb-4">
                  <FaWallet className="text-2xl text-white" />
                </div>
                <p className="text-lg font-semibold mb-2">Wallet</p>
                <p className="text-2xl font-bold mb-4">${userFunds.toFixed(2)}</p>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-600 transition-all duration-300"
                  onClick={() => navigate('/dashboard/wallet')}
                >
                  Add Funds
                </button>
              </div>

              {/* Medical Loan Card */}
              <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center text-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 mb-4">
                  <FaFileInvoiceDollar className="text-2xl text-white" />
                </div>
                <p className="text-lg font-semibold mb-2">Medical Loan Status</p>
                <p className="text-sm font-bold mb-4">{medicalLoanStatus}</p>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-600 transition-all duration-300"
                  onClick={() => navigate('/dashboard/medical-loans')}
                >
                  Repay Loan
                </button>
              </div>

              {/* Insurance Card */}
              <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center text-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 mb-4">
                  <FaHospital className="text-2xl text-white" />
                </div>
                <p className="text-lg font-semibold mb-2">Insurance Status</p>
                <p className="text-sm font-bold mb-4">{insuranceStatus}</p>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-600 transition-all duration-300"
                  onClick={() => navigate('/dashboard/insurance')}
                >
                  Enroll
                </button>
              </div>

              {/* Telemedicine Card */}
              <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center text-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 mb-4">
                  <FaPhoneAlt className="text-2xl text-white" />
                </div>
                <p className="text-lg font-semibold mb-2">Telemedicine</p>
                <p className="text-sm font-bold mb-4">Consult a Doctor</p>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-600  transition-all duration-300"
                  onClick={() => navigate('/dashboard/telemedicine')}
                >
                  Consult Now
                </button>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className={`p-8 rounded-xl shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-600 transition-all duration-300"
                  onClick={() => navigate('/dashboard/wallet')}
                >
                  View All Transactions
                </button>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  className="flex items-center gap-2 text-black px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  onClick={() => handleSort('date')}
                >
                  <FaSortAmountDown /> Sort by Date
                </button>
                <button
                  className="flex items-center gap-2 text-black px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  onClick={() => handleSort('amount')}
                >
                  <FaSortAmountDown /> Sort by Amount
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-semibold">Transaction ID</th>
                    <th className="text-left py-3 text-sm font-semibold">Type</th>
                    <th className="text-left py-3 text-sm font-semibold">Amount</th>
                    <th className="text-left py-3 text-sm font-semibold">Method</th>
                    <th className="text-left py-3 text-sm font-semibold">Status</th>
                    <th className="text-left py-3 text-sm font-semibold">Timestamp</th>
                    <th className="text-left py-3 text-sm font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.transactionID} className="border-b hover:bg-gray-100/10 transition-all duration-300">
                      <td className="py-3 text-sm">{transaction.transactionID}</td>
                      <td className="py-3 text-sm">{transaction.type}</td>
                      <td className="py-3 text-sm">${transaction.amount.toFixed(2)}</td>
                      <td className="py-3 text-sm">{transaction.method}</td>
                      <td className="py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm">{transaction.timestamp}</td>
                      <td className="py-3 text-sm">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;