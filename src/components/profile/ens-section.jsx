"use client";

import BlockchainHashDisplay from "@/components/general/blockchain-hash";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ethers } from "ethers";

export default function ENSSelection() {
  const [ensName, setEnsName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("ensName")) {
        setEnsName(localStorage.getItem("ensName"));
      }
      if (localStorage.getItem("address")) {
        setAddress(localStorage.getItem("address"));
      }
    }
  }, []);

  const disconnectENS = () => {
    setEnsName("");
    setAddress("");
    localStorage.removeItem("ensName");
    localStorage.removeItem("address");
  }

  const purchaseENS = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        // Here you would typically interact with the ENS contract on testnet
        // This is a placeholder for the actual ENS purchase logic
        const mockEnsName = `${address.substring(2, 8)}.test`;

        setEnsName(mockEnsName);
        setAddress(address);
        localStorage.setItem("ensName", mockEnsName);
        localStorage.setItem("address", address);
      } catch (error) {
        console.error("Error purchasing ENS:", error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <div className="mt-10 bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">ENS on Testnet</h2>
      <div className="flex items-center mb-6">
        <Image
          alt="ENS"
          className="mr-4"
          src="/ens-logo.png"
          width={40}
          height={40}
        />
        {ensName ? (
          <div>
            <p className="text-green-600 font-medium">Purchased</p>
            <BlockchainHashDisplay hash={address} />
            <p className="text-sm text-gray-600">{ensName}</p>
          </div>
        ) : (
          <p className="text-gray-500">Not purchased</p>
        )}
      </div>
      {ensName ? (
        <button
          onClick={disconnectENS}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={purchaseENS}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
        >
          Purchase ENS
        </button>
      )}
    </div>
  );
}