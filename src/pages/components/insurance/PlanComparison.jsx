import React from "react";
import { insurancePlans } from "./insuranceData";

const PlanComparison = ({ selectedPlans, onBackToPlans, onStartEnrollment }) => {
    if (selectedPlans.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Select plans to compare from the plans page.</p>
                <button
                    onClick={onBackToPlans}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    View Plans
                </button>
            </div>
        );
    }

    const plansToCompare = insurancePlans.filter(plan => selectedPlans.includes(plan.id));

    const comparisonCategories = [
        { id: "type", name: "Coverage Type", key: "coverageType" },
        { id: "monthly", name: "Monthly Cost", key: "monthlyCost", prefix: "K" },
        { id: "annual", name: "Annual Cost", key: "annualCost", prefix: "K" },
        { id: "limit", name: "Coverage Limit", key: "coverageLimit", prefix: "K", format: true },
        {
            id: "hospital",
            name: "Hospital Coverage",
            getValue: (plan) => {
                const benefit = plan.benefitsInfo.find(b => b.title === "Hospital Coverage");
                return benefit ? benefit.description : "Not specified";
            }
        },
        {
            id: "doctor",
            name: "Doctor Visits",
            getValue: (plan) => {
                const benefit = plan.benefitsInfo.find(b => b.title === "Doctor Visits");
                return benefit ? benefit.description : "Not specified";
            }
        },
        {
            id: "medication",
            name: "Medication Coverage",
            getValue: (plan) => {
                const benefit = plan.benefitsInfo.find(b => b.title === "Medication");
                return benefit ? benefit.description : "Not specified";
            }
        },
        {
            id: "emergency",
            name: "Emergency Transport",
            getValue: (plan) => {
                const benefit = plan.benefitsInfo.find(b => b.title === "Emergency Transport");
                return benefit ? benefit.description : "Not included";
            }
        },
        {
            id: "wellness",
            name: "Wellness Programs",
            getValue: (plan) => {
                const benefit = plan.benefitsInfo.find(b => b.title === "Wellness Programs");
                return benefit ? benefit.description : "Not included";
            }
        }
    ];

    const getCellValue = (plan, category) => {
        if (category.getValue) {
            return category.getValue(plan);
        }

        const value = plan[category.key];
        if (category.format && typeof value === 'number') {
            return `${category.prefix || ''}${value.toLocaleString()}`;
        }
        return `${category.prefix || ''}${value}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Plan Comparison</h2>
                <button
                    onClick={onBackToPlans}
                    className="text-blue-600 hover:underline flex items-center"
                >
                    &larr; Back to Plans
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 px-4 text-left text-gray-600 font-medium">Feature</th>
                            {plansToCompare.map(plan => (
                                <th key={plan.id} className="py-3 px-4 text-left">
                                    <div>{plan.name}</div>
                                    <div className="mt-2">
                                        <button
                                            onClick={() => onStartEnrollment(plan.id)}
                                            className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                                        >
                                            Enroll
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonCategories.map((category, index) => (
                            <tr key={category.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="py-3 px-4 font-medium border-t">{category.name}</td>
                                {plansToCompare.map(plan => (
                                    <td key={`${plan.id}-${category.id}`} className="py-3 px-4 border-t">
                                        {getCellValue(plan, category)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlanComparison;