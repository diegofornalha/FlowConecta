'use client';
import { useState, useRef, useEffect } from 'react';

const ChatSidebar = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages([...messages, { role: 'user', content: inputMessage }]);
    setInputMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.output }]);
      console.log("testing");	
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-yellow-50 z-50 shadow-lg flex flex-col chat-sidebar">
      <div className="p-4 border-b border-yellow-200">
        <h2 className="text-lg font-semibold text-black">Chat</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-yellow-500' 
                : 'bg-brown-300'
            }`}>
              <p className="text-[1rem] text-black">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-yellow-200">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow bg-transparent rounded-l px-2 py-1 focus:outline-none text-black placeholder-white"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-r hover:bg-yellow-600 transition-colors">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSidebar;