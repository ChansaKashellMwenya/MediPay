import React from "react";
import { FaBalanceScale } from "react-icons/fa";
import InsurancePlanCard from "./InsurancePlanCard";
import { insurancePlans } from "./insuranceData";

const InsurancePlans = ({
    selectedPlans,
    onCompareToggle,
    onStartEnrollment,
    onViewComparison,
    onClearComparison
}) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Available Insurance Plans</h2>
                {selectedPlans.length > 0 && (
                    <div className="flex space-x-2">
                        <button
                            onClick={onViewComparison}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex items-center"
                        >
                            <FaBalanceScale className="mr-2" /> Compare ({selectedPlans.length})
                        </button>
                        <button
                            onClick={onClearComparison}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
                        >
                            Clear
                        </button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insurancePlans.map((plan) => (
                    <InsurancePlanCard
                        key={plan.id}
                        plan={plan}
                        isSelected={selectedPlans.includes(plan.id)}
                        onCompareToggle={onCompareToggle}
                        onStartEnrollment={onStartEnrollment}
                    />
                ))}
            </div>
        </div>
    );
};

export default InsurancePlans;