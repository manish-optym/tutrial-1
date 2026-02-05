import React, { useState, useRef, useEffect } from 'react';
import ParticleBackground from '../Intro/ParticleBackground';
import '../../styles/question.css';

const stepsData = [
  { text: "Soch lo 🤔", image: `${process.env.PUBLIC_URL}/assets/think.gif` },
  { text: "Ek baar aur soch lo 😢", image: `${process.env.PUBLIC_URL}/assets/sadface.gif` },
  { text: "Please maan jao 🥺", image: `${process.env.PUBLIC_URL}/assets/plz.gif` },
  { text: "Itna bhaav mat khao 😠", image: `${process.env.PUBLIC_URL}/assets/attitude.gif` },
  { text: "Sach me nahi? 😭", image: `${process.env.PUBLIC_URL}/assets/cry.gif` },
  { text: "Cute ho yaar tum 😍", image: `${process.env.PUBLIC_URL}/assets/cute.gif` },
  { text: "Last chance ❤️", image: `${process.env.PUBLIC_URL}/assets/loveme.gif` }
];

const AnniversaryQuestion = ({ onYesClick }) => {
  const [step, setStep] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("Will you continue this beautiful journey with me?");
  const [currentImage, setCurrentImage] = useState(`${process.env.PUBLIC_URL}/assets/loveme.gif`);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const noButtonRef = useRef(null);

  const messages = [
    "Every moment with you...",
    "Feels like a fairy tale ✨",
    "You're my forever spark 🌟",
  ];

  const handleNoClick = () => {
    if (step < stepsData.length) {
      setCurrentText(stepsData[step].text);
      setCurrentImage(stepsData[step].image);
      setStep(step + 1);
    } else {
      // After all steps, force accept
      handleYesClick();
    }
  };

  const handleYesClick = () => {
    setCurrentText("Mujhe pata tha tum maan jaogi ❤️");
    setCurrentImage(`${process.env.PUBLIC_URL}/assets/thanks.gif`);
    if (onYesClick) {
      onYesClick();
    }
  };

  const moveNoButton = () => {
    if (noButtonRef.current) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      const rotation = Math.random() * 360;
      setNoButtonPosition({ x, y, rotation });
    }
  };

  useEffect(() => {
    const noButton = noButtonRef.current;
    if (noButton) {
      noButton.addEventListener('mouseenter', moveNoButton);
      noButton.addEventListener('touchstart', moveNoButton);
      
      return () => {
        noButton.removeEventListener('mouseenter', moveNoButton);
        noButton.removeEventListener('touchstart', moveNoButton);
      };
    }
  }, []);

  useEffect(() => {
    // Show messages sequentially like Valentine's Day Surprise
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentMessageIndex === messages.length) {
      // Show final question after all messages
      const timer = setTimeout(() => {
        setShowFinalQuestion(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, messages.length]);

  return (
    <div className="anniversary-question">
      <ParticleBackground />
      <div className="message-container">
        {!showFinalQuestion ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                index === currentMessageIndex
                  ? 'active'
                  : index < currentMessageIndex
                  ? 'exit'
                  : ''
              }`}
            >
              {message}
            </div>
          ))
        ) : (
          <div className="final-question">
            <h2>Be Mine Forever?</h2>
            <div className="question-card">
              <div 
                className="question-image" 
                style={{ backgroundImage: `url(${currentImage})` }}
              />
              <div className="question-text">{currentText}</div>
              <div className="btn-group">
                <button className="valentine-btn yes-btn" onClick={handleYesClick}>
                  Yes, Always! 🌹
                </button>
                <button
                  ref={noButtonRef}
                  className="valentine-btn no-btn"
                  onClick={handleNoClick}
                  onMouseOver={moveNoButton}
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) rotate(${noButtonPosition.rotation || 0}deg)`,
                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
                  }}
                >
                  Still Thinking 💭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnniversaryQuestion;

