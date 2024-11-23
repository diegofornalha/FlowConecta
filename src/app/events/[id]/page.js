'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { eventsList } from '@/providers/event-providers';
import {getEventById, stakeEvent, createEvent} from '../../api/eventandstaking/route'
import * as fcl from "@onflow/fcl";
import "../../../../cadence/config.js";
import { useEffect, useState } from 'react';


async function getWalletAddress() {
  try {
    const user = await fcl.authenticate();
    return user.addr;
  } catch (error) {
    console.error("Error fetching wallet address:", error);
  }
}
const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

export default function EventDetails() {

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    async function fetchWalletAddress() {
      const address = await getWalletAddress();
      setWalletAddress(address);
    }
    fetchWalletAddress();
  }, []);


  const { id } = useParams();
  const event = eventsList[parseInt(id)];

  if (!event) return <div>Event not found</div>;

  return (
    <div className="bg-yellow-50 p-8 z-0 -mt-20 pt-24 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-800 mb-6">{event.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full max-w-lg mx-auto lg:max-w-none">
            <Image
              src={event.image}
              alt={event.title}
              width={600}
              height={400}
              layout="responsive"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center text-yellow-700">
              <MapIcon />
              <span className="ml-2">{event.location}</span>
            </div>
            <div className="flex items-center text-yellow-700">
              <ClockIcon />
              <span className="ml-2">{event.date}, {event.time}</span>
            </div>
            <button className="w-full sm:w-auto bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition" onClick={() =>stakeEvent(event.id, walletAddress, 10.00)}>
              Stake & Register Now
            </button>
          </div>
        </div>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-4">Event Description</h2>
            <p className="text-yellow-700">{event.summary}</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-4">Why Join This Event?</h2>
            <ul className="list-disc list-inside text-yellow-700 space-y-2">
              {event.highlights?.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              )) || <p>No highlights available</p>}
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-4">Event Categories</h2>
            <div className="flex flex-wrap gap-2">
              {event.tags?.map((tag, i) => (
                <span key={i} className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center">
                  <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {tag}
                </span>
              )) || <p>No categories available</p>}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-4">Participants</h2>
            <div className="flex flex-wrap gap-4">
              {event.participants?.map((participant, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image
                    src={participant.avatar}
                    alt={participant.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-yellow-700 text-sm sm:text-base">{participant.name}</span>
                </div>
              )) || <p>No participants available</p>}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-4">Familiar Faces</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {event.familiarFaces?.map((face, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={face.avatar}
                    alt={face.name}
                    width={60}
                    height={60}
                    className="rounded-full mx-auto"
                  />
                  <span className="text-sm text-yellow-700 font-semibold">{face.name}</span>
                  <p className="text-xs text-yellow-600">{face.role}</p>
                </div>
              )) || <p>No familiar faces available</p>}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-4">Location</h2>
            <div className="aspect-w-16 aspect-h-9">
              {event.coordinates ? (
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${event.coordinates.lng}!3d${event.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1635739558241!5m2!1sen!2s`}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full rounded-lg shadow-lg"
                ></iframe>
              ) : (
                <p className="text-yellow-700">Location map is not available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
