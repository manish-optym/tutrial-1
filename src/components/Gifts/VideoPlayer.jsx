import React, { useRef, useEffect } from 'react';
import '../../styles/gifts.css';

const VideoPlayer = ({ videoSrc, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [videoSrc]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  return (
    <div className="video-player-overlay" onClick={handleBackdropClick}>
      <div className="video-player-container">
        <button className="video-close-btn" onClick={handleClose}>
          ×
        </button>
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          className="video-player"
          autoPlay
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;

