// Create factory functions for icons instead of using JSX directly
import React from "react";
import {
    FaHospital,
    FaUserMd,
    FaTablets,
    FaAmbulance,
    FaPlusCircle
} from "react-icons/fa";

// Helper function to create icon elements
const createIcon = (Icon) => ({ type: Icon });

// Instead of storing JSX directly, store icon component references
export const insurancePlans = [
    {
        id: 1,
        name: "Basic Health Plan",
        coverageType: "Individual",
        monthlyCost: 120,
        annualCost: 1320,
        coverageLimit: 10000,
        benefitsInfo: [
            { icon: createIcon(FaHospital), title: "Hospital Coverage", description: "Basic hospital care" },
            { icon: createIcon(FaUserMd), title: "Doctor Visits", description: "3 per month" },
            { icon: createIcon(FaTablets), title: "Medication", description: "Generic medications only" },
        ],
        rating: 4.1,
        popularity: "Most Popular",
    },
    {
        id: 2,
        name: "Family Health Plan",
        coverageType: "Family",
        monthlyCost: 250,
        annualCost: 2750,
        coverageLimit: 25000,
        benefitsInfo: [
            { icon: createIcon(FaHospital), title: "Hospital Coverage", description: "Full hospital care" },
            { icon: createIcon(FaUserMd), title: "Doctor Visits", description: "Unlimited" },
            { icon: createIcon(FaTablets), title: "Medication", description: "Generic & brand name" },
            { icon: createIcon(FaAmbulance), title: "Emergency Transport", description: "Included" },
        ],
        rating: 4.7,
    },
    {
        id: 3,
        name: "Premium Health Plan",
        coverageType: "Individual",
        monthlyCost: 350,
        annualCost: 3850,
        coverageLimit: 50000,
        benefitsInfo: [
            { icon: createIcon(FaHospital), title: "Hospital Coverage", description: "Premium hospital care" },
            { icon: createIcon(FaUserMd), title: "Doctor Visits", description: "Unlimited specialists" },
            { icon: createIcon(FaTablets), title: "Medication", description: "All medications covered" },
            { icon: createIcon(FaAmbulance), title: "Emergency Transport", description: "Priority service" },
            { icon: createIcon(FaPlusCircle), title: "Wellness Programs", description: "Full access" },
        ],
        rating: 4.9,
    }
];

// Mock user insurance data
export const userInsurance = {
    active: true,
    planName: "Basic Health Plan",
    memberId: "MHP-2387654",
    startDate: "2023-11-01",
    renewalDate: "2024-11-01",
    monthlyCost: 120,
    nextPaymentDate: "2024-04-01",
    remainingCoverage: 9200,
};