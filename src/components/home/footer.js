// components/Footer.js
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="-mt-24 bg-yellow-100 py-6">
      <div className="max-w-7xl mx-auto px-4 flex justify-around items-center flex-wrap">
        <motion.div
          className="flex justify-around items-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}>
          {[
            "cursor",
            "hover",
            "cursor",
            "hover",
            "cursor",
            "hover",
            "cursor",
          ].map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="px-6">
              <Image
                src={`/${logo}.png`}
                alt={logo}
                width={50}
                height={30}
                className="m-4"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
