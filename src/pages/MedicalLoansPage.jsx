import { useState } from "react";
import {
  FaWallet,
  FaHospital,
  FaFileInvoiceDollar,
  FaPhoneAlt,
  FaUser,
  FaCog,
  FaCheck,
  FaHistory,
  FaMoneyBillWave,
  FaFileContract,
} from "react-icons/fa";

// Mock data for demonstration
const mockLoanData = {
  currentLoan: {
    amount: 5000,
    remainingBalance: 3750,
    monthlyPayment: 250,
    interestRate: 3.5,
    term: 24,
    startDate: "2023-10-15",
    hospital: "Chipata General Hospital",
    reason: "Knee Surgery",
    status: "Active",
  },
  repaymentHistory: [
    { date: "2023-11-15", amount: 250, status: "Paid" },
    { date: "2023-12-15", amount: 250, status: "Paid" },
    { date: "2024-01-15", amount: 250, status: "Paid" },
    { date: "2024-02-15", amount: 250, status: "Paid" },
    { date: "2024-03-15", amount: 250, status: "Paid" },
  ],
};

const MedicalLoansPage = () => {
  const [activeTab, setActiveTab] = useState("status");
  const [formData, setFormData] = useState({
    hospital: "",
    amount: "",
    reason: "",
    term: "12",
  });
  const [eligibilityScore, setEligibilityScore] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoanApplication = (e) => {
    e.preventDefault();
    alert("Loan application submitted successfully!");
    setActiveTab("status");
  };

  const checkEligibility = () => {
    const score = Math.floor(Math.random() * 100);
    setEligibilityScore(score);
  };

  const makePayment = () => {
    alert("Payment processed successfully!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "apply":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Apply for a Medical Loan</h2>
            <form onSubmit={handleLoanApplication} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Hospital/Medical Facility</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hospital name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Estimated Bill Amount (K)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Reason for Treatment</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Briefly describe the medical reason"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Loan Term (months)</label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        );
      case "status":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Loan Status</h2>
            {mockLoanData.currentLoan ? (
              <div>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Loan Status:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {mockLoanData.currentLoan.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Loan Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Hospital:</p>
                        <p className="font-medium">{mockLoanData.currentLoan.hospital}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Reason:</p>
                        <p className="font-medium">{mockLoanData.currentLoan.reason}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Total Loan Amount:</span>
                      <span className="font-medium">K{mockLoanData.currentLoan.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Remaining Balance:</span>
                      <span className="font-medium">K{mockLoanData.currentLoan.remainingBalance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-medium">K{mockLoanData.currentLoan.monthlyPayment.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(1 - mockLoanData.currentLoan.remainingBalance / mockLoanData.currentLoan.amount) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span>0%</span>
                    <span>
                      Paid:{" "}
                      {(
                        (1 - mockLoanData.currentLoan.remainingBalance / mockLoanData.currentLoan.amount) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                    <span>100%</span>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={makePayment}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Make a Payment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You don't have any active loans.</p>
                <button
                  onClick={() => setActiveTab("apply")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Apply for a Loan
                </button>
              </div>
            )}
          </div>
        );
      case "eligibility":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Check Your Eligibility</h2>
            <p className="text-gray-600 mb-6">
              Find out if you're eligible for a medical loan before applying. This won't affect your credit score.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Estimated Loan Amount (K)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Preferred Loan Term</label>
                  <select
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={checkEligibility}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            </div>

            {eligibilityScore !== null && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Your Eligibility Result</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Eligibility Score:</span>
                    <span
                      className={`font-bold ${eligibilityScore >= 70 ? "text-green-600" : eligibilityScore >= 40 ? "text-yellow-600" : "text-red-600"}`}
                    >
                      {eligibilityScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className={`h-2.5 rounded-full ${eligibilityScore >= 70 ? "bg-green-600" : eligibilityScore >= 40 ? "bg-yellow-500" : "bg-red-600"}`}
                      style={{ width: `${eligibilityScore}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-4">
                    {eligibilityScore >= 70 ? (
                      <div className="text-green-600 font-medium">
                        <FaCheck className="inline mr-2" />
                        You are eligible for a loan! Apply now.
                      </div>
                    ) : eligibilityScore >= 40 ? (
                      <div className="text-yellow-600 font-medium">
                        You may be eligible with additional documentation.
                      </div>
                    ) : (
                      <div className="text-red-600 font-medium">Sorry, you're not eligible at this time.</div>
                    )}
                  </div>
                  {eligibilityScore >= 40 && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setActiveTab("apply")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Proceed to Application
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      case "history":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Repayment History</h2>
            {mockLoanData.repaymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockLoanData.repaymentHistory.map((payment, index) => (
                      <tr key={index}>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">K{payment.amount.toLocaleString()}</td>
                        <td className="py-4 px-4 text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No repayment history available.</p>
              </div>
            )}
          </div>
        );
      case "terms":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Loan Terms</h2>
            {mockLoanData.currentLoan ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Loan Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Principal Amount:</span>
                        <span className="font-medium">K{mockLoanData.currentLoan.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-medium">{mockLoanData.currentLoan.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Term Length:</span>
                        <span className="font-medium">{mockLoanData.currentLoan.term} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment:</span>
                        <span className="font-medium">K{mockLoanData.currentLoan.monthlyPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">
                          {new Date(mockLoanData.currentLoan.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Payment Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Due Date:</span>
                        <span className="font-medium">15th of each month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Late Fee:</span>
                        <span className="font-medium">K25 after 5 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Early Repayment:</span>
                        <span className="font-medium">No penalty</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Methods:</span>
                        <span className="font-medium">Bank transfer, Card</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Loan Agreement</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    By accepting this loan, you agree to the terms and conditions outlined in the loan agreement. Please
                    review the full agreement for complete details.
                  </p>
                  <div className="flex justify-center">
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <FaFileContract className="mr-2" /> View Full Loan Agreement
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No active loan terms to display.</p>
              </div>
            )}
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Medical Loans</h1>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "status" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("status")}
        >
          <FaMoneyBillWave className="mr-2" /> Loan Status
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "apply" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("apply")}
        >
          <FaFileInvoiceDollar className="mr-2" /> Apply for Loan
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "eligibility"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("eligibility")}
        >
          <FaCheck className="mr-2" /> Eligibility Check
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "history" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("history")}
        >
          <FaHistory className="mr-2" /> Repayment History
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "terms" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("terms")}
        >
          <FaFileContract className="mr-2" /> Loan Terms
        </button>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default MedicalLoansPage;