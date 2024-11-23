import { useState, useEffect } from 'react';
import {createProfile} from '../../app/api/profilestorage/route.js'
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

const Web3InterestsSection = (sharedData) => {
  const [interests, setInterests] = useState({
    eventtypes: [],
    topics: [],
    companies: [],
    jobpositions: [],
  });

  const getAllInterests = () => {
    return [
      ...interests.eventtypes,
      ...interests.topics,
      ...interests.companies,
      ...interests.jobpositions,
    ];
  };

  const [isSaved, setIsSaved] = useState(false);

  const [walletAddress, setWalletAddress] = useState(null);


  useEffect(() => {
    const storedInterests = localStorage.getItem('web3Interests');
    if (storedInterests) {
      setInterests(JSON.parse(storedInterests));
    }
    async function fetchWalletAddress() {
      const address = await getWalletAddress();
      setWalletAddress(address);
    }
    fetchWalletAddress();
  }, []);

  const handleInterestChange = (category, item) => {
    setInterests((prev) => {
      const updatedCategory = prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];
      return { ...prev, [category]: updatedCategory };
    });

    // Reset the save state
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('web3Interests', JSON.stringify(interests));
    setIsSaved(true);

    setTimeout(() => setIsSaved(false), 3000); // Reset the saved state after 3 seconds
  };

  const InterestToggle = ({ category, items }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-black mb-2">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() =>
              handleInterestChange(category.toLowerCase().replace(' ', ''), item)
            }
            className={`px-3 py-1 rounded-full text-sm ${
              interests[category.toLowerCase().replace(' ', '')]?.includes(item)
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:opacity-80 transition-colors`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-bold mb-6">Interests</h2>
      <p className="mb-4 text-gray-600">Select your areas of interest in Web3:</p>
  
      <InterestToggle
        category="Event Types"
        items={['Hackathons', 'Conferences', 'Workshops', 'Meetups', 'Webinars']}
      />
  
      <InterestToggle
        category="Topics"
        items={[
          'Blockchain Technology',
          'Cryptocurrencies',
          'Decentralized Finance (DeFi)',
          'Non-Fungible Tokens (NFTs)',
          'Smart Contracts',
          'Decentralized Autonomous Organizations (DAOs)',
          'Metaverse',
        ]}
      />
  
      <InterestToggle
        category="Companies"
        items={[
          'Ethereum Foundation',
          'Consensys',
          'Chainlink',
          'OpenSea',
          'Uniswap',
          'Polygon',
          'Binance',
        ]}
      />
  
      <InterestToggle
        category="Job Positions"
        items={[
          'Blockchain Developer',
          'Smart Contract Engineer',
          'Cryptography Specialist',
          'Web3 Product Manager',
          'DeFi Analyst',
          'NFT Artist/Designer',
          'Tokenomics Expert',
          'Web3 Community Manager',
        ]}
      />
  
      <button
        className="mt-6 w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
        onClick={()=>createProfile(walletAddress,sharedData.sharedData, getAllInterests())}
      >
        Save
      </button>
  
      {isSaved && (
        <p className="mt-2 text-green-600 text-sm text-center">
          Your selections have been saved!
        </p>
      )}
  
      <p className="mt-6 text-sm text-gray-500">
        Your selections are automatically saved and will be remembered when you return.
      </p>
    </div>
  );  
};

export default Web3InterestsSection;
