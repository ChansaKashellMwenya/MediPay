import React from "react";
import { insurancePlans } from "./insuranceData";


// Step 1: Personal Information Component
export const PersonalInformationStep = ({ formData, onFormChange }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Step 1: Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={onFormChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={onFormChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">National ID Number</label>
                    <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={onFormChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onFormChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={onFormChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onFormChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

// Step 2: Payment Options Component
export const PaymentOptionsStep = ({
    planId,
    formData,
    onFormChange,
    paymentMethod,
    setPaymentMethod
}) => {
    const plan = insurancePlans.find(p => p.id === planId);

    if (!plan) return <div>Plan not found</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Step 2: Payment Options</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Selected Plan: {plan.name}</h3>
                <p className="text-gray-600 mb-4">Please choose your preferred payment frequency and method.</p>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Payment Frequency</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentFrequency"
                                value="monthly"
                                checked={formData.paymentFrequency === "monthly"}
                                onChange={onFormChange}
                                className="mr-2"
                            />
                            Monthly (K{plan.monthlyCost})
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentFrequency"
                                value="annual"
                                checked={formData.paymentFrequency === "annual"}
                                onChange={onFormChange}
                                className="mr-2"
                            />
                            Annual (K{plan.annualCost}) <span className="text-green-600 ml-2">Save 10%</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                            className={`border p-4 rounded-lg cursor-pointer ${paymentMethod === "mobile" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                            onClick={() => setPaymentMethod("mobile")}
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    checked={paymentMethod === "mobile"}
                                    onChange={() => { }}
                                />
                                <span>Mobile Money</span>
                            </div>
                        </div>
                        <div
                            className={`border p-4 rounded-lg cursor-pointer ${paymentMethod === "bank" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                            onClick={() => setPaymentMethod("bank")}
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    checked={paymentMethod === "bank"}
                                    onChange={() => { }}
                                />
                                <span>Bank Transfer</span>
                            </div>
                        </div>
                        <div
                            className={`border p-4 rounded-lg cursor-pointer ${paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                            onClick={() => setPaymentMethod("card")}
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    checked={paymentMethod === "card"}
                                    onChange={() => { }}
                                />
                                <span>Debit/Credit Card</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step 3: Review & Confirm Component
export const ReviewConfirmStep = ({ planId, formData, paymentMethod }) => {
    const plan = insurancePlans.find(p => p.id === planId);

    if (!plan) return <div>Plan not found</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Step 3: Review & Confirm</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-4 text-center">Insurance Plan Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <h4 className="font-medium mb-2">Plan Details</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Plan:</span>
                                <span className="font-medium">{plan.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Coverage Type:</span>
                                <span className="font-medium">{plan.coverageType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Coverage Limit:</span>
                                <span className="font-medium">K{plan.coverageLimit.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment:</span>
                                <span className="font-medium">{formData.paymentFrequency === "monthly" ? "Monthly" : "Annual"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="font-medium">K{formData.paymentFrequency === "monthly" ? plan.monthlyCost : plan.annualCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method:</span>
                                <span className="font-medium">{paymentMethod === "mobile" ? "Mobile Money" : paymentMethod === "bank" ? "Bank Transfer" : "Card"}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Personal Information</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium">{formData.fullName || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Date of Birth:</span>
                                <span className="font-medium">{formData.dob || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">ID Number:</span>
                                <span className="font-medium">{formData.idNumber || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{formData.phone || "Not provided"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">{formData.email || "Not provided"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4 mt-4">
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2"
                        />
                        <label htmlFor="terms" className="text-sm">
                            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                        By clicking "Complete Enrollment", you agree to proceed with this insurance plan and authorize payments as selected above.
                    </p>
                </div>
            </div>
        </div>
    );
};