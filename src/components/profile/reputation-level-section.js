import React from 'react';

const ReputationSmallSection = ({ level, points, badges }) => {
  return (
    <div className="bg-black-100 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl text-black font-bold mb-4">Reputation</h3>
      
      <div className="mb-4">
        <p className="text-lg text-black font-semibold">Level: {level}</p>
        <div className="w-full bg-black-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(points % 100)}%`}}></div>
        </div>
        <p className="text-sm text-black">{points} / 100 points to next level</p>
      </div>
      
      <div>
        <h4 className="text-lg text-black font-semibold mb-2">Badges</h4>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${badge.earned ? 'bg-yellow-400' : 'bg-black-300'}`}>
                {badge.icon}
              </div>
              <p className="text-sm">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReputationSection = () => {
  const userReputation = {
    level: 2,
    points: 50,
    badges: [
      { name: 'First Post', icon: '📝', earned: true },
      { name: 'Helpful', icon: '🤝', earned: true },
      { name: 'Expert', icon: '🏆', earned: false },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Reputation</h2>
      <p className="text-gray-700">Level: {userReputation.level}</p>
      <p className="text-gray-700">Points: {userReputation.points}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-black mb-2">Badges:</h3>
        <div className="flex gap-4">
          {userReputation.badges.map((badge) => (
            <div
              key={badge.name}
              className={`p-2 rounded-lg border ${
                badge.earned ? 'border-yellow-500 bg-yellow-100' : 'border-gray-300 bg-gray-100'
              }`}
            >
              <div className="text-2xl">{badge.icon}</div>
              <p className="text-sm font-medium text-black">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReputationSection;