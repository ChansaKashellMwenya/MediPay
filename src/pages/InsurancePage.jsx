import React, { useState } from "react";
import InsuranceStatus from "./components/insurance/InsuranceStatus";
import InsurancePlans from "./components/insurance/InsurancePlans";
import PlanComparison from "./components/insurance/PlanComparison";
import EnrollmentProcess from "./components/insurance/EnrollmentProcess";
import { FaHeartbeat, FaBalanceScale, FaUserPlus, FaIdCard, FaInfoCircle } from "react-icons/fa";

const InsurancePage = () => {
  const [activeTab, setActiveTab] = useState("status");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCompareToggle = (planId) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter(id => id !== planId));
    } else {
      if (selectedPlans.length < 3) {
        setSelectedPlans([...selectedPlans, planId]);
      } else {
        alert("You can compare up to 3 plans at once");
      }
    }
  };

  const clearComparison = () => {
    setSelectedPlans([]);
  };

  const startEnrollment = (planId) => {
    setSelectedPlan(planId);
    setActiveTab("enroll");
  };

  const cancelEnrollment = () => {
    setSelectedPlan(null);
    setActiveTab("plans");
  };

  const completeEnrollment = () => {
    alert("Enrollment completed! Your insurance is now being processed.");
    setActiveTab("status");
    setSelectedPlan(null);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Insurance</h1>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "status" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => handleTabChange("status")}
        >
          <FaHeartbeat className="mr-2" /> Insurance Status
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "plans" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => handleTabChange("plans")}
        >
          <FaInfoCircle className="mr-2" /> View Plans
        </button>
        {selectedPlans.length > 0 && (
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === "compare" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => handleTabChange("compare")}
          >
            <FaBalanceScale className="mr-2" /> Compare Plans
          </button>
        )}
        {activeTab === "enroll" && (
          <button
            className={`px-4 py-2 font-medium text-sm flex items-center text-blue-600 border-b-2 border-blue-600`}
          >
            <FaUserPlus className="mr-2" /> Enrollment
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "status" && <InsuranceStatus onViewPlans={() => handleTabChange("plans")} />}

      {activeTab === "plans" && (
        <InsurancePlans
          selectedPlans={selectedPlans}
          onCompareToggle={handleCompareToggle}
          onStartEnrollment={startEnrollment}
          onViewComparison={() => handleTabChange("compare")}
          onClearComparison={clearComparison}
        />
      )}

      {activeTab === "compare" && (
        <PlanComparison
          selectedPlans={selectedPlans}
          onBackToPlans={() => handleTabChange("plans")}
          onStartEnrollment={startEnrollment}
        />
      )}

      {activeTab === "enroll" && (
        <EnrollmentProcess
          selectedPlanId={selectedPlan}
          onCancel={cancelEnrollment}
          onComplete={completeEnrollment}
        />
      )}
    </div>
  );
};

export default InsurancePage;