'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';
import { FaCheck } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { getProfile } from '../../app/api/profilestorage/route.js';
import * as fcl from "@onflow/fcl";
import "../../../cadence/config.js";

async function getWalletAddress() {
  try {
    const user = await fcl.authenticate();
    return user.addr;
  } catch (error) {
    console.error("Error fetching wallet address:", error);
  }
}

const formatAddress = (addr) => {
  return `${addr?.substring(0, 4)}...${addr?.substring(addr.length - 4)}`;
};

export default function Home({ levels, level, setSharedData }) {
  const [svgData, setSvgData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("worldId")) {
        setUser(localStorage.getItem("worldId"));
      }
    }
    async function fetchWalletAddress() {
      const address = await getWalletAddress();
      setWalletAddress(address);
      if (address) {
        const profileData = await getProfile(address);
        setProfile(profileData);
        setUsername(profileData.name);
      }
    }
    fetchWalletAddress();
  }, []);

  const [isLargeScreen, setIsLargeScreen] = useState(false);


  useEffect(() => {

      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
      };
      
      checkScreenSize();

      const queryParams = new URLSearchParams({
        size: window.innerWidth >= 768 ? 160 : 120,
        head: levels[level - 1].head
      // background: 'blue',
      // head: 'red',
    });
    
    fetch(`/api/profilepic?${queryParams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        setSvgData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching SVG:', error);
        setIsLoading(false);
      });
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
  }, [isLargeScreen]);

  return (
    <motion.div 
        className={`text-black bg-white rounded-lg shadow-md p-6 mx-auto ${isLargeScreen ? 'max-w-3xl' : 'max-w-md'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className={`${isLargeScreen ? 'flex' : 'block'} items-center mb-4`}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`relative mb-6 rounded-full overflow-hidden border-4 border-yellow-500 mx-10 shadow-xl ${isLargeScreen ? 'w-40 h-40' : 'w-32 h-32'} ${isLoading ? 'animate-pulse' : ''}`}
            >
                {isLoading ? (
                    <div className="w-full h-full bg-black-300 rounded-full" />
                ) : (
                    <div
                        dangerouslySetInnerHTML={{ __html: svgData }}
                        className="w-full h-full"
                    />
                )}
            </motion.div>

            <div>
                <input
                    type="text"
                    value={username || ""}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setSharedData(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <h2 className="text-2xl font-semibold flex items-center">
                    {user ? formatAddress(user) : "Not authenticated"}
                    {user && <FaCheck className="ml-2 text-green-500" />}
                </h2>
                <p className="text-black-600">Level 1</p>
            </div>
        <div className="relative mb-4"></div>
          
        </div>
        <div className={`${isLargeScreen ? 'flex justify-around' : 'grid grid-cols-3 gap-4'} mb-4`}>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-semibold text-black">12</p>
                <p className="text-sm text-black-600">Events Joined</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-semibold text-lg">980</p>
                <p className="text-sm text-black-600">Followers</p>
            </motion.div>
            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                <p className="font-semibold text-lg">8.9</p>
                <p className="text-sm text-black-600">Rating</p>
            </motion.div>
        </div>
    </motion.div>
);
}