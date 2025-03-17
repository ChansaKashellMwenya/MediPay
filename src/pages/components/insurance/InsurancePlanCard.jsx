import React from "react";
import { FaBalanceScale, FaStar } from "react-icons/fa";

const InsurancePlanCard = ({ plan, isSelected, onCompareToggle, onStartEnrollment }) => {
    // Create a function to render the icon component
    const renderIcon = (iconData) => {
        const IconComponent = iconData.type;
        return <IconComponent />;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-blue-600 text-white p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.popularity && (
                        <span className="bg-yellow-400 text-blue-900 px-2 py-1 rounded text-xs font-bold">
                            {plan.popularity}
                        </span>
                    )}
                </div>
                <p className="text-blue-100">{plan.coverageType}</p>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-gray-600 text-sm">Monthly</p>
                        <p className="text-2xl font-bold">K{plan.monthlyCost}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600 text-sm">Coverage up to</p>
                        <p className="text-xl font-semibold">K{plan.coverageLimit.toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    {plan.benefitsInfo.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                            <div className="text-blue-600 mt-1 mr-2">
                                {renderIcon(benefit.icon)}
                            </div>
                            <div>
                                <p className="font-medium">{benefit.title}</p>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center mb-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(plan.rating) ? "" : "text-gray-300"} />
                    ))}
                    <span className="ml-2 text-gray-600">{plan.rating}/5</span>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onStartEnrollment(plan.id)}
                        className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Enroll Now
                    </button>
                    <button
                        onClick={() => onCompareToggle(plan.id)}
                        className={`px-3 py-2 rounded border ${isSelected
                                ? "bg-blue-100 border-blue-500 text-blue-600"
                                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <FaBalanceScale />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InsurancePlanCard;