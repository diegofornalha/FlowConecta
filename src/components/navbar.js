"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { useLogout, usePrivy } from "@privy-io/react-auth";
import { useAccount, useEnsName } from "wagmi";
import Image from "next/image";
import * as fcl from "@onflow/fcl";

async function getWalletAddress() {
  try {
    const user = await fcl.authenticate();
    return user.addr;
  } catch (error) {
    console.error("Error fetching wallet address:", error);
  }
}

const Navbar = () => {
  const { ready, authenticated, login, user } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const { logout } = useLogout();
  const { address } = useAccount();
  const { data: name } = useEnsName({ address });
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    async function fetchWalletAddress() {
      const address = await getWalletAddress();
      setWalletAddress(address);
    }
    fetchWalletAddress();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const formatAddress = (address) => {
    const AddressRegex = /^0x[\dA-Fa-f]{40}$/;
    if (!address) return address;
    if (address.match(AddressRegex) === null) return address;
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  return (
    <nav className="relative z-50 bg-transparent text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="flex-shrink-0">
              <Image className="h-8 w-8" width={150} height={60} src="/butterlogo.png" alt="Logo" />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/events" className="px-3 py-2 rounded-md text-sm font-medium">
              Events
            </Link>
            <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
            {ready && authenticated ? (
              <button
                className="px-3 py-2 rounded-md text-sm font-medium bg-black text-white"
                onClick={logout}
              >
                {name + formatAddress(user?.wallet?.address)}
              </button>
            ) : (
              <button
                className="px-3 py-2 rounded-md text-sm font-medium bg-yellow-500 text-white"
                disabled={disableLogin}
                onClick={login}
              >
                Connect Privy
              </button>
            )}
            <button
                className="px-3 py-2 rounded-md text-sm font-medium bg-green-500 text-white"
                disabled={disableLogin}
                onClick={getWalletAddress}
              >
                {walletAddress? walletAddress:"Connect Flow"}
              </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/events" className="block px-3 py-2 rounded-md text-base font-medium">
              Events
            </Link>
            <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium">
              Profile
            </Link>
            {ready && authenticated ? (
              <button
                className="block px-3 py-2 rounded-md text-base font-medium bg-black text-white"
                onClick={logout}
              >
                {name + formatAddress(user.wallet.address)}
              </button>
            ) : (
              <button
                className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-500 text-white"
                disabled={disableLogin}
                onClick={login}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
