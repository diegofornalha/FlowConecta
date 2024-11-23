'use client';

import WorldIdWidget from "@/components/profile/world-id";
import MainProfileSection from "@/components/profile/main-profile";
import ReputationSection from "@/components/profile/reputation-level-section";
import LevelingSystem from "@/components/profile/leveling-system.jsx";
import { useState } from "react";
import ENSSelection from "@/components/profile/ens-section";
import Web3InterestsSection from "@/components/profile/interest-selection";

export default function Profile({ children }) {
    const levels = [
        { level: 1, requiredPoints: 0, head: 210, description: 'Novice: Just starting your journey' },
        { level: 2, requiredPoints: 100, head: 164, description: 'Apprentice: Building your skills' },
        { level: 3, requiredPoints: 250, head: 30, description: 'Adept: Mastering the basics' },
        { level: 4, requiredPoints: 500, head: 204, description: 'Expert: Honing advanced techniques' },
        { level: 5, requiredPoints: 1000, head: 199, description: 'Master: Achieving excellence' },
    ];

    const [currentLevel, setCurrentLevel] = useState(2);
    const [sharedData, setSharedData] = useState(""); // State to be shared
    const [WorldUserId, setWorldUserId] = useState(null);

    return (
        <div className="p-4 pt-16 bg-yellow-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Main Profile Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <MainProfileSection levels={levels} level={currentLevel} setSharedData={setSharedData} WorldUserId={WorldUserId} />
                </div>

                {/* Left Column: Authentication, ENS, Reputation, Interests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <WorldIdWidget setWorldUserId={setWorldUserId} />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <ENSSelection />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <ReputationSection />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <Web3InterestsSection sharedData={sharedData} />
                        </div>
                    </div>
                    
                    {/* Right Column: Leveling System */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <LevelingSystem levels={levels} />
                    </div>
                </div>
            </div>
        </div>
    );
}
