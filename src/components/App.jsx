import React, { useState } from 'react';
import { MusicProvider } from '../contexts/MusicContext';
import IntroSequence from './Intro/IntroSequence';
import AnniversaryQuestion from './Question/AnniversaryQuestion';
import CelebrationBurst from './Celebration/CelebrationBurst';
import AnniversaryCountdown from './Countdown/AnniversaryCountdown';
import PhotoGallery from './Gallery/PhotoGallery';
import OurStory from './Story/OurStory';
import SunflowerGarden from './Sunflowers/SunflowerGarden';
import MusicPlayer from './MusicPlayer';
import '../styles/main.css';

function App() {
  const [currentStep, setCurrentStep] = useState('intro'); // intro -> question -> celebration -> sections
  const [showCelebration, setShowCelebration] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);

  const handleIntroComplete = () => {
    setCurrentStep('question');
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setShowCelebration(true);
    // Keep currentStep as 'question' so music continues playing
    // The celebration is just an overlay on top
    
    // Wait at least 10 seconds before moving to next page
    // This ensures the yes music plays for at least 10 seconds
    setTimeout(() => {
      handleCelebrationComplete();
    }, 10000);
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    setCurrentStep('sections');
    // Small delay before showing sections for smooth transition
    setTimeout(() => {
      setShowSections(true);
    }, 300);
  };

  return (
    <MusicProvider>
      <div className="app">
        <MusicPlayer currentStep={currentStep} onYesClicked={yesClicked} />
      
      {/* Intro Sequence */}
      {currentStep === 'intro' && (
        <div className={`step-container ${currentStep === 'intro' ? 'active' : 'hidden'}`}>
          <IntroSequence onComplete={handleIntroComplete} />
        </div>
      )}

      {/* Question Section */}
      {currentStep === 'question' && (
        <div className={`step-container ${currentStep === 'question' ? 'active' : 'hidden'}`}>
          <AnniversaryQuestion onYesClick={handleYesClick} />
        </div>
      )}

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="celebration-overlay">
          <CelebrationBurst onComplete={handleCelebrationComplete} />
        </div>
      )}

      {/* Main Sections - Revealed after celebration */}
      {showSections && (
        <div className={`main-sections ${showSections ? 'revealed' : ''}`}>
          <AnniversaryCountdown />
          <PhotoGallery />
          <OurStory />
          <SunflowerGarden />
        </div>
      )}
      </div>
    </MusicProvider>
  );
}

export default App;

