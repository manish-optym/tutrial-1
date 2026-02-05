import React, { useState } from 'react';
import { useMusic } from '../../contexts/MusicContext';
import VideoPlayer from './VideoPlayer';
import '../../styles/gifts.css';

const GiftAnimation = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [gift1Clicked, setGift1Clicked] = useState(false);
  const [gift2Clicked, setGift2Clicked] = useState(false);
  const { pauseBackgroundMusic, resumeBackgroundMusic } = useMusic();

  const handleGiftClick = (giftNumber) => {
    // Pause background music immediately when gift is clicked
    pauseBackgroundMusic();
    
    if (giftNumber === 1) {
      setGift1Clicked(true);
      setSelectedVideo('/assets/v1.mp4');
    } else if (giftNumber === 2) {
      setGift2Clicked(true);
      setSelectedVideo('/assets/v2.mp4');
    }
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    // Resume background music when video closes
    resumeBackgroundMusic();
  };

  return (
    <>
      <div className="gifts-container">
        <div className="gifts-title">
          <h2>🎁 Special Gifts for You! 🎁</h2>
          <p>Click on a gift to unwrap your surprise</p>
        </div>
        <div className="gifts-wrapper">
          <div 
            className={`gift-box ${gift1Clicked ? 'opened' : ''}`}
            onClick={() => handleGiftClick(1)}
          >
            <div className="gift-ribbon gift-ribbon-1"></div>
            <div className="gift-ribbon gift-ribbon-2"></div>
            <div className="gift-bow">
              <div className="bow-center"></div>
              <div className="bow-loop bow-loop-left"></div>
              <div className="bow-loop bow-loop-right"></div>
            </div>
            <div className="gift-label">Gift 1</div>
            {gift1Clicked && <div className="gift-sparkle">✨</div>}
          </div>

          <div 
            className={`gift-box ${gift2Clicked ? 'opened' : ''}`}
            onClick={() => handleGiftClick(2)}
          >
            <div className="gift-ribbon gift-ribbon-1"></div>
            <div className="gift-ribbon gift-ribbon-2"></div>
            <div className="gift-bow">
              <div className="bow-center"></div>
              <div className="bow-loop bow-loop-left"></div>
              <div className="bow-loop bow-loop-right"></div>
            </div>
            <div className="gift-label">Gift 2</div>
            {gift2Clicked && <div className="gift-sparkle">✨</div>}
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayer 
          videoSrc={selectedVideo} 
          onClose={handleCloseVideo}
        />
      )}
    </>
  );
};

export default GiftAnimation;

