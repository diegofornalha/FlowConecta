'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LevelingSystem from "@/components/profile/leveling-system";

import { usersList } from '@/providers/profile-provider';
import { eventsList } from '@/providers/event-providers';

import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {

    const [svgData, setSvgData] = useState(null);

    const { id } = useParams();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  const levels = [
    { level: 1, requiredPoints: 100, head: 210, description: 'Novice: Just starting your journey' },
    { level: 2, requiredPoints: 250, head: 164, description: 'Apprentice: Building your skills' },
    { level: 3, requiredPoints: 500, head: 30, description: 'Adept: Mastering the basics' },
    { level: 4, requiredPoints: 1000, head: 204, description: 'Expert: Honing advanced techniques' },
    { level: 5, requiredPoints: 2000, head: 199, description: 'Master: Achieving excellence' },
  ];

  useEffect(() => {
    if (id) {
      // Fetch user data
      const userData = usersList.find(u => u.userAddress === id);
      setUser(userData);

      // Fetch events data
      const eventsData = eventsList;
      setEvents(eventsData);


      
      if (userData)
        {
        const queryParams = new URLSearchParams({
            size: 140,
          head: levels[userData.nounsDAOLevel - 1].head
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
        }
    }
    
  }, [id]);

  if (!user) return <div>Loading...</div>;

  const exportUpcomingEvents = () => {
    const upcomingEvents = events.filter(event => 
      user.upcomingEventsRegistered.includes(event.id)
    );
    const eventData = JSON.stringify(upcomingEvents);
    // Implement sharing logic here (e.g., using Web Share API)
    if (navigator.share) {
      navigator.share({
        title: 'Upcoming Events',
        text: 'Check out my upcoming events!',
        url: `data:text/json;charset=utf-8,${encodeURIComponent(eventData)}`
      });
    } else {
      alert('Sharing is not supported on this browser');
    }
  };


  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-yellow-50 z-0 -mt-20  p-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-br mt-20 from-yellow-100 to-yellow-300 rounded-lg shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-800">{user.name}</h1>
          <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`relative mb-6 rounded-full overflow-hidden border-4 border-yellow-500 mx-10 shadow-xl w-32 h-32`}
            >
                
                    <div
                        dangerouslySetInnerHTML={{ __html: svgData }}
                        className="w-full h-full"
                    />
            </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-yellow-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">User Info</h2>
            <p className="text-yellow-700"><span className="font-semibold">ENS:</span> {user.ens}</p>
            <p className="text-yellow-700"><span className="font-semibold">World ID:</span> {user.worldID}</p>
            <p className="text-yellow-700"><span className="font-semibold">Address:</span> {user.userAddress}</p>
            <p className="text-yellow-700"><span className="font-semibold">Nouns DAO Level:</span> {user.nounsDAOLevel}</p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Event Stats</h2>
            <p className="text-yellow-700"><span className="font-semibold">Events Joined:</span> {user.eventsJoined.length}</p>
            <p className="text-yellow-700"><span className="font-semibold">Upcoming Events:</span> {user.upcomingEventsRegistered.length}</p>
            <button 
              onClick={exportUpcomingEvents}
              className="mt-4 flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
              Export Upcoming Events
            </button>
          </div>
        </div>
        <LevelingSystem levels={levels} />


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Joined Events</h2>
            <div className="space-y-4">
              {user.eventsJoined.map(eventId => {
                const event = events.find(e => e.id === eventId);
                return event ? (
                  <div key={event.id} className="bg-yellow-100 p-4 rounded-md shadow">
                    <h3 className="text-xl font-semibold text-yellow-800">{event.title}</h3>
                    <p className="text-yellow-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {event.date} - {event.time}
                    </p>
                    <p className="text-yellow-700">{event.location}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {user.upcomingEventsRegistered.map(eventId => {
                const event = events.find(e => e.id === eventId);
                return event ? (
                  <div key={event.id} className="bg-green-100 p-4 rounded-md shadow">
                    <h3 className="text-xl font-semibold text-green-800">{event.title}</h3>
                    <p className="text-green-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {event.date} - {event.time}
                    </p>
                    <p className="text-green-700">{event.location}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;