"use client";
import { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import ChatSidebar from "./chat-sidebar";

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isChatOpen && !event.target.closest('.chat-sidebar')) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <>
      <div
        className="fixed bottom-4 z-50 right-4 bg-gradient-to-r from-yellow-500 to-brown-800 text-white p-6 rounded-full cursor-pointer hover:from-yellow-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
        onClick={() => setIsChatOpen(true)}
      >
        <FaComments size={24} className="animate-pulse" />
      </div>
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsChatOpen(false)} />
      )}
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ChatIcon;