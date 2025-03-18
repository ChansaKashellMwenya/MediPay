import { useState } from "react";
import {
  FaWallet,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaHistory,
  FaPiggyBank,
  FaFileExport,
  FaCreditCard,
  FaMobileAlt,
  FaQrcode,
  FaHandHoldingUsd,
  FaReceipt,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [balance, setBalance] = useState(1250.0);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "Wallet Top-up",
      amount: 100.0,
      method: "Mobile Money",
      status: "Completed",
      timestamp: "2023-10-01 10:30:00",
      date: "2023-10-01",
    },
    {
      id: 2,
      type: "Loan Repayment",
      amount: 50.0,
      method: "Bank Transfer",
      status: "Pending",
      timestamp: "2023-10-02 14:45:00",
      date: "2023-10-02",
    },
    {
      id: 3,
      type: "Insurance Premium",
      amount: 30.0,
      method: "Credit Card",
      status: "Completed",
      timestamp: "2023-10-03 09:15:00",
      date: "2023-10-03",
    },
    {
      id: 4,
      type: "Telemedicine Consultation",
      amount: 20.0,
      method: "Mobile Money",
      status: "Failed",
      timestamp: "2023-10-04 16:20:00",
      date: "2023-10-04",
    },
  ]);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("mobileMoney");
  const [sourceBank, setSourceBank] = useState("");
  const [account, setAccount] = useState("");
  const [transferNote, setTransferNote] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  // Patient Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [patientId, setPatientId] = useState("");

  // Payment Details
  const [billingAmount, setBillingAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentPurpose, setPaymentPurpose] = useState("");

  // Hospital/Clinic Details
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [department, setDepartment] = useState("");

  // Insurance Information
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [insuranceCoverage, setInsuranceCoverage] = useState("");

  // Additional Notes
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Mobile Money Specific Fields
  const [mobileWalletProvider, setMobileWalletProvider] = useState("");
  const [mobileMoneyFullName, setMobileMoneyFullName] = useState("");

  // Card Specific Fields
  const [cardholderName, setCardholderName] = useState("");
  const [connectedCards, setConnectedCards] = useState([]);

  // Sorting State
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  // Handle paying medical bills
  const handlePayBill = () => {
    if (amount > 0 && amount <= balance) {
      let paymentDetails = {};
      switch (paymentMethod) {
        case "mobileMoney":
          if (!mobileMoneyNumber || !mobileWalletProvider || !mobileMoneyFullName) {
            alert("Please fill in all mobile money details.");
            return;
          }
          paymentDetails = {
            method: "Mobile Money",
            provider: mobileWalletProvider,
            number: mobileMoneyNumber,
            fullName: mobileMoneyFullName,
          };
          break;
        case "card":
          if (!cardNumber || !cardExpiry || !cardCVC || !cardholderName) {
            alert("Please fill in all card details.");
            return;
          }
          paymentDetails = {
            method: "Debit/Credit Card",
            cardholderName: cardholderName,
            cardNumber: cardNumber,
            expiry: cardExpiry,
            cvc: cardCVC,
          };
          break;
        default:
          alert("Please select a valid payment method.");
          return;
      }

      const newTransaction = {
        id: transactions.length + 1,
        type: "payment",
        amount: parseFloat(amount),
        method: paymentDetails.method,
        status: "Pending", // Default status
        timestamp: new Date().toLocaleString(),
        date: new Date().toLocaleDateString(),
      };

      setTransactions([...transactions, newTransaction]);
      setBalance((prevBalance) => prevBalance - parseFloat(amount));
      setAmount("");
      setMobileMoneyNumber("");
      setMobileWalletProvider("");
      setMobileMoneyFullName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCVC("");
      setCardholderName("");
      alert("Payment successful!");
    } else {
      alert("Invalid amount or insufficient balance.");
    }
  };

  // Handle exporting transactions as PDF
  const handleExportTransactions = () => {
    const input = document.getElementById("transaction-history-table");
    if (!input) {
      alert("No transaction history found to export.");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("transactions.pdf");
    });
  };

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  // Add or connect a debit/credit card
  const handleAddCard = () => {
    if (!cardholderName || !cardNumber || !cardExpiry || !cardCVC) {
      alert("Please fill in all card details.");
      return;
    }

    const newCard = {
      cardholderName,
      cardNumber: cardNumber.slice(-4), // Store only last 4 digits
      expiry: cardExpiry,
    };

    setConnectedCards([newCard]); // Only one card is allowed, so replace the existing one
    setCardholderName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVC("");
    alert("Card added successfully!");
  };

  // Render the main wallet balance card
  const renderWalletBalanceCard = () => {
    const connectedCard = connectedCards[0]; // Only one card is allowed

    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
        <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
        <p className="text-gray-200 mt-2">Current wallet balance</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-200">Card Number</p>
            <p className="text-lg font-medium">
              {connectedCard ? `**** **** **** ${connectedCard.cardNumber}` : "**** **** **** 1234"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-200">Expiry</p>
            <p className="text-lg font-medium">
              {connectedCard ? connectedCard.expiry : "12/25"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
            {/* Wallet Balance Card */}
            {renderWalletBalanceCard()}

            {/* Connected Cards Section */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Connected Cards</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {connectedCards.length > 0 ? (
                  connectedCards.map((card, index) => (
                    <div key={index} className="border-b py-4">
                      <p className="text-lg font-semibold text-gray-800">{card.cardholderName}</p>
                      <p className="text-gray-600">**** **** **** {card.cardNumber}</p>
                      <p className="text-gray-600">Expires: {card.expiry}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No cards connected.</p>
                )}
                <button
                  onClick={() => setActiveTab("addCard")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 mt-4"
                >
                  Add New Card
                </button>
              </div>
            </div>
          </div>
        );
      case "pay":
        return (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pay Medical Bills</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              {/* Patient Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                    <input
                      type="text"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/DD/YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Patient ID</label>
                    <input
                      type="text"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter patient ID"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Billing Amount</label>
                    <input
                      type="number"
                      value={billingAmount}
                      onChange={(e) => setBillingAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter billing amount"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Invoice Number</label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter invoice number"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Payment Purpose</label>
                  <input
                    type="text"
                    value={paymentPurpose}
                    onChange={(e) => setPaymentPurpose(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter payment purpose"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h3>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Payment Type</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mobileMoney">Mobile Money</option>
                    <option value="card">Debit/Credit Card</option>
                    <option value="bankTransfer">Bank Transfer</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>

                {/* Mobile Money Fields */}
                {paymentMethod === "mobileMoney" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Mobile Wallet Provider</label>
                      <input
                        type="text"
                        value={mobileWalletProvider}
                        onChange={(e) => setMobileWalletProvider(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter mobile wallet provider (e.g., MTN Mobile Money)"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Mobile Money Number</label>
                      <input
                        type="text"
                        value={mobileMoneyNumber}
                        onChange={(e) => setMobileMoneyNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter mobile money number"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Full Name (as registered on mobile money)</label>
                      <input
                        type="text"
                        value={mobileMoneyFullName}
                        onChange={(e) => setMobileMoneyFullName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full name"
                      />
                    </div>
                  </>
                )}

                {/* Card Fields */}
                {paymentMethod === "card" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter cardholder name"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter 16-digit card number"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiration Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV Code</label>
                        <input
                          type="text"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter 3-digit CVV"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Bank Transfer Fields */}
                {paymentMethod === "bankTransfer" && (
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={sourceBank}
                      onChange={(e) => setSourceBank(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bank name"
                    />
                  </div>
                )}

                {/* Insurance Fields */}
                {paymentMethod === "insurance" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Insurance Provider</label>
                      <input
                        type="text"
                        value={insuranceProvider}
                        onChange={(e) => setInsuranceProvider(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter insurance provider"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Policy Number</label>
                      <input
                        type="text"
                        value={policyNumber}
                        onChange={(e) => setPolicyNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter policy number"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Insurance Coverage Percentage</label>
                      <input
                        type="number"
                        value={insuranceCoverage}
                        onChange={(e) => setInsuranceCoverage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter coverage percentage"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Hospital/Clinic Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hospital/Clinic Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Hospital/Clinic Name</label>
                    <input
                      type="text"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter hospital/clinic name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Doctor’s Name</label>
                    <input
                      type="text"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter doctor’s name"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Notes</h3>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any special instructions or remarks"
                  rows="4"
                ></textarea>
              </div>

              {/* Pay Bill Button */}
              <button
                onClick={handlePayBill}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
              >
                Pay Bill
              </button>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Sorting Controls */}
              <div className="flex justify-between text-sm items-center mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>

              {/* Transaction Table */}
              <div className="overflow-x-auto">
                <table id="transaction-history-table" className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="px-4 py-2 text-left text-gray-700">Transaction ID</th>
                      <th className="px-4 py-2 text-left text-gray-700">Type</th>
                      <th className="px-4 py-2 text-left text-gray-700">Amount</th>
                      <th className="px-4 py-2 text-left text-gray-700">Method</th>
                      <th className="px-4 py-2 text-left text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left text-gray-700">Timestamp</th>
                      <th className="px-4 py-2 text-left text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-gray-50 transition duration-300"
                      >
                        <td className="px-4 py-2 text-sm text-gray-800">{transaction.id}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{transaction.type}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">${transaction.amount.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{transaction.method}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">{transaction.timestamp}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{transaction.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleExportTransactions}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 mt-4"
              >
                <FaFileExport className="inline-block mr-2" /> Export as PDF
              </button>
            </div>
          </div>
        );
      case "addCard":
        return (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Card</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter cardholder name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 16-digit card number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Expiration Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">CVV Code</label>
                  <input
                    type="text"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter 3-digit CVV"
                  />
                </div>
              </div>
              <button
                onClick={handleAddCard}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
              >
                Add Card
              </button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Wallet</h1>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "overview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          <FaWallet className="mr-2" /> Balance Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "pay"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("pay")}
        >
          <FaHandHoldingUsd className="mr-2" /> Pay Medical Bills
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "history"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          <FaHistory className="mr-2" /> Transaction History
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "addCard"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("addCard")}
        >
          <FaCreditCard className="mr-2" /> Add Card
        </button>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default WalletPage;