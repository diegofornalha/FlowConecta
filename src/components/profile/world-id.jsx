"use client";

import BlockchainHashDisplay from "@/components/general/blockchain-hash";
import { useState, useEffect, useCallback } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import Image from "next/image";



export default function Navbar() {
  const [worldId, setWorldId] = useState("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("worldId")) {
        setWorldId(localStorage.getItem("worldId"));
      }
    }
  }, []);

  const disconnectWorldcoin = () => {
    setWorldId("");
    localStorage.setItem("worldId", "");
  }

  const onSuccess = (result) => {
    // This is where you should perform frontend actions once a user has been verified
    if (typeof window !== "undefined") {
      setWorldId(result.nullifier_hash);
      localStorage.setItem("worldId", result.nullifier_hash);
    }
    // window.alert(
    // 	`Successfully verified with World ID!
    // Your nullifier hash is: ` + result.nullifier_hash
    // )
  };

  const verifyProof = async (proof) => {
    const response = await fetch("/api/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Worldcoin</h2>
      <div className="flex items-center mb-6">
        <Image
          alt="Worldcoin"
          className="mr-4"
          src="/worldcoin.png"
          width={40}
          height={40}
        />
        {worldId ? (
          <div>
            <p className="text-green-600 font-medium">Verified</p>
            <BlockchainHashDisplay hash={worldId} />
          </div>
        ) : (
          <p className="text-gray-500">Not connected</p>
        )}
      </div>
      {worldId ? (
        <button
          onClick={disconnectWorldcoin}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Disconnect
        </button>
      ) : (
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID}
          action={process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_ID}
          verification_level={VerificationLevel.Device}
          handleVerify={verifyProof}
          onSuccess={onSuccess}
        >
          {({ open }) => (
            <button
              onClick={open}
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
            >
              Connect
            </button>
          )}
        </IDKitWidget>
      )}
    </div>
  );
}
