import React from "react";
import { FaIdCard, FaCreditCard } from "react-icons/fa";
import { userInsurance } from "./insuranceData";

const InsuranceStatus = ({ onViewPlans }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Insurance Status</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${userInsurance.active ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {userInsurance.active ? "Active" : "Pending"}
                </span>
            </div>

            {userInsurance ? (
                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Plan Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Plan Name:</span>
                                    <span className="font-medium">{userInsurance.planName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Member ID:</span>
                                    <span className="font-medium">{userInsurance.memberId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Start Date:</span>
                                    <span className="font-medium">{userInsurance.startDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Renewal Date:</span>
                                    <span className="font-medium">{userInsurance.renewalDate}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monthly Cost:</span>
                                    <span className="font-medium">K{userInsurance.monthlyCost}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Next Payment:</span>
                                    <span className="font-medium">{userInsurance.nextPaymentDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Coverage Remaining:</span>
                                    <span className="font-medium">K{userInsurance.remainingCoverage.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button className="bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                            <FaIdCard className="mr-2" /> View Insurance ID
                        </button>
                        <button className="bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition">
                            <FaCreditCard className="mr-2" /> Make a Payment
                        </button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Recent Claims</h3>
                        <p className="text-gray-600 text-center py-2">No recent claims to display.</p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">You don't have any active insurance plans.</p>
                    <button
                        onClick={onViewPlans}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        View Available Plans
                    </button>
                </div>
            )}
        </div>
    );
};

export default InsuranceStatus;