import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message-bubble ${msg.sender}`}>
          {msg.sender === 'user' && (
            <img src={`${process.env.PUBLIC_URL}/assets/user-avatar.png`} alt="User" className="user-avatar" />
		)}
          {msg.sender !== 'user' && (
            <img src={`${process.env.PUBLIC_URL}/assets/bot-avatar.png`} alt="Bot" className="bot-avatar" />
          )}
          <div className="message-text">{msg.text}</div>
        </div>
      ))}
      <div ref={endOfMessagesRef} /> {/* Invisible element at the end of the messages */}
        {isLoading && (
        <div className="message-bubble bot loading">
          <div className="loading-indicator">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
