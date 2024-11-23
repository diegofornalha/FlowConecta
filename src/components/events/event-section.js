'use client'
import { eventsList } from '@/providers/event-providers';
import React from 'react';

const events = eventsList;

export const EventSection = ({ filter }) => {
  
  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Filter events based on selected filter type
  let filteredEvents;
  if (filter === 'All') {
    filteredEvents = events;
  } else if (filter === 'random') {
    filteredEvents = shuffleArray([...events]).slice(0, 5); // Get 5 random events
  } else {
    filteredEvents = events.filter((event) => event.type === filter);
  }
  
  return (
    <div className="text-gray-800"> {/* Set default text color */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredEvents.map((event, index) => (
      <a
        key={index}
        onClick={() => { window.location.href = '/events/' + index; }}
        className="border border-brown-500 shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300"
        style={{ backgroundColor: 'transparent' }} // Make background transparent
      >
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4">
        <h2 className="text-gray-800 text-lg font-bold mb-2">{event.title}</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {event.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="border border-brown-500 text-brown-500 px-2 py-1 rounded-lg text-sm" // Transparent background for tags
          >
            {tag}
          </span>
          ))}
        </div>
        <p className="text-gray-600 mb-2">{event.organizer}</p>
        <p className="text-gray-600 mb-4">{event.date} | {event.time}</p>
        <p className="text-gray-700 mb-4">{event.summary}</p>
        <button className="border border-brown-500 text-brown-500 px-4 py-2 rounded hover:bg-brown-500 hover:text-white transition duration-300">
          Join Event
        </button>
        </div>
      </a>
      ))}
    </div>
    </div>
  );
  };
  