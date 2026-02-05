import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from './ParticleBackground';
import '../../styles/intro.css';

const IntroSequence = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messageIndexRef = useRef(0);
  const introSequenceRef = useRef(null);
  
  const messages = [
    "4 years ago, on February 5th, 2022...",
    "Our journey began ✨",
    "Every moment with you feels like forever 💕",
    "Through ups and downs, we've grown together 🌱",
    "Will you continue this beautiful journey with me?"
  ];

  useEffect(() => {
    // Exact logic from Valentine's Day Surprise
    const showNextMessage = () => {
      requestAnimationFrame(() => {
        if (messageIndexRef.current < messages.length) {
          // Show current message
          setCurrentMessage(messageIndexRef.current);
          messageIndexRef.current++;
          
          // Schedule next message after 3 seconds
          if (messageIndexRef.current < messages.length) {
            setTimeout(showNextMessage, 2000);
          } else {
            // All messages shown, wait 2 seconds then complete
            setTimeout(() => {
              if (onComplete) {
                onComplete();
              }
            }, 2000);
          }
        }
      });
    };

    // Start after 1 second (exactly like original)
    const startTimer = setTimeout(showNextMessage, 1000);
    
    return () => clearTimeout(startTimer);
  }, [messages.length, onComplete]);

  return (
    <div className="intro-sequence" ref={introSequenceRef}>
      <ParticleBackground />
      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              index === currentMessage
                ? 'active'
                : index < currentMessage
                ? 'exit'
                : ''
            }`}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroSequence;

