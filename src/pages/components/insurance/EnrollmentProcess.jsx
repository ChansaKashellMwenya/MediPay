import React, { useState } from "react";
import {
    PersonalInformationStep,
    PaymentOptionsStep,
    ReviewConfirmStep
} from "./EnrollmentSteps";
import { insurancePlans } from "./insuranceData";

const EnrollmentProcess = ({ selectedPlanId, onCancel, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("mobile");
    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        idNumber: "",
        phone: "",
        address: "",
        email: "",
        paymentFrequency: "monthly",
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const selectedPlan = insurancePlans.find(p => p.id === selectedPlanId);

    if (!selectedPlan) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 mb-4">The selected plan was not found.</p>
                <button
                    onClick={onCancel}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Back to Plans
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Enroll in {selectedPlan.name}</h2>
                <div className="text-sm text-gray-500">
                    Step {currentStep} of 3
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
            </div>

            {/* Step Content */}
            <div className="mb-6">
                {currentStep === 1 && (
                    <PersonalInformationStep
                        formData={formData}
                        onFormChange={handleFormChange}
                    />
                )}

                {currentStep === 2 && (
                    <PaymentOptionsStep
                        planId={selectedPlanId}
                        formData={formData}
                        onFormChange={handleFormChange}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                )}

                {currentStep === 3 && (
                    <ReviewConfirmStep
                        planId={selectedPlanId}
                        formData={formData}
                        paymentMethod={paymentMethod}
                    />
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={currentStep === 1 ? onCancel : prevStep}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
                >
                    {currentStep === 1 ? "Cancel" : "Back"}
                </button>

                <button
                    onClick={currentStep === 3 ? onComplete : nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {currentStep === 3 ? "Complete Enrollment" : "Continue"}
                </button>
            </div>
        </div>
    );
};

export default EnrollmentProcess;