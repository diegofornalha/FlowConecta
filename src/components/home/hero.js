// components/Hero.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Correct import for Next.js routing
import { motion } from 'framer-motion';
import {getEventById, stakeEvent, createEvent} from '../../app/api/eventandstaking/route.js'
import {createProfile, getProfile, addFollowers} from '../../app/api/profilestorage/route.js'
import { usePrivy } from '@privy-io/react-auth';

const Hero = () => {
  const { user } = usePrivy();

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center z-10"
        >
            <motion.h1 
                className="text-7xl font-bold text-brown-800 mb-6"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                BUTTER
            </motion.h1>
            <p className="text-xl text-brown-800 mb-10">&quot;Butterizing your event experience&quot;</p>
            <div className="relative inline-block">
                <motion.button 
                    className="bg-brown-800 text-yellow-50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-brown-700 transition-colors duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    
                    // onClick={() => stakeEvent("2", "0x8c368d8f37d2e717", 10.00)}
                    // onClick={() => getEventById("2")}
                    // onClick={() => createProfile("0x8c368d8f37d2e717","testing", ["test", "idk"], false)}
                    // onClick={() => getProfile("0x8c368d8f37d2e717")}
                    // onClick={() => addFollowers("0x8c368d8f37d2e717")}
                    // onClick={() => createEvent("event name", 10.00, "0x8c368d8f37d2e717")}
                    onClick={() => window.location.href = '/events'}
                >
                    Butter Me Up!
                </motion.button>
                <motion.div 
                    initial={{ rotate: -12 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -top-6 -right-[2rem] transform"
                >
                    <Image 
                        src="https://nouns.center/traits/glasses/glasses-square-yellow-orange-multi.png"
                        alt="Glasses"
                        width={80}
                        height={40}
                    />
                </motion.div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
