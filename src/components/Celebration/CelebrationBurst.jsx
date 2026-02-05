import React, { useEffect, useState } from 'react';
import '../../styles/celebration.css';

const CelebrationBurst = ({ onComplete }) => {
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Create heart burst
    const heartElements = [];
    for (let i = 0; i < 50; i++) {
      heartElements.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 0.5,
        emoji: ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]
      });
    }
    setHearts(heartElements);

    // Create confetti burst
    const confettiElements = [];
    for (let i = 0; i < 30; i++) {
      confettiElements.push({
        id: i,
        left: Math.random() * 100,
        hue: Math.random() * 360,
        delay: Math.random() * 0.3
      });
    }
    setConfetti(confettiElements);

    // Don't call onComplete here - let App.jsx handle the timing
    // The celebration will stay visible for at least 10 seconds
  }, []);

  return (
    <div className="celebration-burst">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-burst"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            animationDelay: `${heart.delay}s`
          }}
        >
          {heart.emoji}
        </div>
      ))}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            background: `hsl(${piece.hue}, 100%, 60%)`,
            animationDelay: `${piece.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default CelebrationBurst;

