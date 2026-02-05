import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMusic } from '../contexts/MusicContext';
import '../styles/music.css';

const MusicPlayer = ({ currentStep, onYesClicked }) => {
  const { registerPauseFunction, registerResumeFunction } = useMusic();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  
  const introAudioRef = useRef(null);
  const yesAudioRef = useRef(null);
  const sectionsAudioRef = useRef(null);
  const yesClickedRef = useRef(false);
  
  // Get the active audio ref based on current track
  const getActiveAudioRef = () => {
    if (currentTrack === 'intro') return introAudioRef;
    if (currentTrack === 'yes') return yesAudioRef;
    if (currentTrack === 'sections') return sectionsAudioRef;
    return null;
  };

  // Initialize audio elements
  useEffect(() => {
    const savedVolume = localStorage.getItem('musicVolume');
    const vol = savedVolume ? parseFloat(savedVolume) : 0.5;
    setVolume(vol);
    
    // Set volume for all audio elements
    [introAudioRef, yesAudioRef, sectionsAudioRef].forEach(ref => {
      if (ref.current) {
        ref.current.volume = vol;
      }
    });
  }, []);

  // Handle step changes and music transitions
  useEffect(() => {
    if (currentStep === 'intro') {
      // Play intro music immediately on page load (Main Agar Kahoon Instrumental)
      setCurrentTrack('intro');
      if (introAudioRef.current) {
        // Try to play immediately, catch autoplay restrictions
        introAudioRef.current.play().catch(err => {
          console.log('Intro music autoplay prevented, will play on interaction:', err);
          // Set up to play on first user interaction
          const handleFirstInteraction = () => {
            if (introAudioRef.current && currentStep === 'intro') {
              introAudioRef.current.play().catch(e => console.log('Play failed:', e));
              setIsPlaying(true);
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
          };
          document.addEventListener('click', handleFirstInteraction, { once: true });
          document.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
        setIsPlaying(true);
      }
    } else if (currentStep === 'question') {
      // Keep intro music playing when entering question page
      // Don't stop the music - let it continue playing
    } else if (currentStep === 'sections') {
      // Stop yes music if playing
      if (yesAudioRef.current) {
        yesAudioRef.current.pause();
        yesAudioRef.current.currentTime = 0;
      }
      yesClickedRef.current = false;
      
      // Play sections music (kisi roz tumse) on loop
      setCurrentTrack('sections');
      if (sectionsAudioRef.current) {
        sectionsAudioRef.current.play().catch(err => {
          console.log('Sections music play failed:', err);
        });
        setIsPlaying(true);
      }
    }
  }, [currentStep]);

  // Handle Yes button click - stop intro music and play celebration sound
  useEffect(() => {
    if (onYesClicked && !yesClickedRef.current) {
      yesClickedRef.current = true;
      
      // Stop intro music when yes is clicked
      if (introAudioRef.current) {
        introAudioRef.current.pause();
        introAudioRef.current.currentTime = 0;
      }
      
      // Stop sections music if playing
      if (sectionsAudioRef.current) {
        sectionsAudioRef.current.pause();
        sectionsAudioRef.current.currentTime = 0;
      }
      
      // Play yes celebration sound (srk yahoo)
      setCurrentTrack('yes');
      if (yesAudioRef.current) {
        yesAudioRef.current.play().catch(err => {
          console.log('Yes sound play failed:', err);
        });
      }
    }
  }, [onYesClicked]);

  // Mark user interaction for future use
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, []);

  // Fade in/out audio
  const fadeAudio = (audio, targetVolume, duration, callback) => {
    const startVolume = audio.volume;
    const startTime = Date.now();
    const volumeChange = targetVolume - startVolume;

    const fadeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      audio.volume = startVolume + (volumeChange * progress);
      
      if (progress >= 1) {
        clearInterval(fadeInterval);
        if (callback) callback();
      }
    }, 10);
  };

  // Handle play/pause
  const toggleMusic = () => {
    const activeRef = getActiveAudioRef();
    const activeAudio = activeRef?.current;
    
    if (!activeAudio || currentTrack === 'yes') return; // Don't toggle yes sound

    if (isPlaying) {
      // Fade out then pause
      fadeAudio(activeAudio, 0, 500, () => {
        if (activeAudio) {
          activeAudio.pause();
        }
      });
      setIsPlaying(false);
      localStorage.setItem('musicOn', 'false');
    } else {
      // Set volume to 0, play, then fade in
      const targetVolume = volume;
      activeAudio.volume = 0;
      activeAudio.play().then(() => {
        fadeAudio(activeAudio, targetVolume, 500);
        setIsPlaying(true);
        setHasUserInteracted(true);
        localStorage.setItem('musicOn', 'true');
      }).catch(err => {
        console.log('Play failed:', err);
      });
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // Update volume for all audio elements
    [introAudioRef, yesAudioRef, sectionsAudioRef].forEach(ref => {
      if (ref.current) {
        ref.current.volume = newVolume;
      }
    });
    localStorage.setItem('musicVolume', newVolume.toString());
  };

  // Handle volume button click
  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };

  // Update audio volume when volume state changes
  useEffect(() => {
    [introAudioRef, yesAudioRef, sectionsAudioRef].forEach(ref => {
      if (ref.current) {
        ref.current.volume = volume;
      }
    });
  }, [volume]);

  // Create pause/resume functions
  const pauseMusic = useCallback(() => {
    const activeRef = getActiveAudioRef();
    const activeAudio = activeRef?.current;
    
    if (activeAudio && isPlaying && currentTrack !== 'yes') {
      // Store current volume before muting
      if (!activeAudio.dataset.originalVolume) {
        activeAudio.dataset.originalVolume = activeAudio.volume.toString();
      }
      fadeAudio(activeAudio, 0, 300);
    }
  }, [isPlaying, currentTrack]);

  const resumeMusic = useCallback(() => {
    const activeRef = getActiveAudioRef();
    const activeAudio = activeRef?.current;
    
    if (activeAudio && isPlaying && currentTrack !== 'yes') {
      const originalVolume = parseFloat(activeAudio.dataset.originalVolume || volume.toString());
      fadeAudio(activeAudio, originalVolume, 300);
      activeAudio.dataset.originalVolume = '';
    }
  }, [isPlaying, currentTrack, volume]);

  // Register pause/resume functions with context
  useEffect(() => {
    registerPauseFunction(pauseMusic);
    registerResumeFunction(resumeMusic);
  }, [pauseMusic, resumeMusic, registerPauseFunction, registerResumeFunction]);

  // Handle audio ended events
  const handleIntroEnded = () => {
    if (introAudioRef.current && currentTrack === 'intro') {
      introAudioRef.current.currentTime = 0;
      introAudioRef.current.play().catch(err => {
        console.log('Intro loop play failed:', err);
      });
    }
  };

  const handleSectionsEnded = () => {
    if (sectionsAudioRef.current && currentTrack === 'sections') {
      sectionsAudioRef.current.currentTime = 0;
      sectionsAudioRef.current.play().catch(err => {
        console.log('Sections loop play failed:', err);
      });
    }
  };

  const handleYesEnded = () => {
    // Yes sound plays once, no loop needed
    setCurrentTrack(null);
    yesClickedRef.current = false;
  };

  return (
    <>
      {/* Intro music - Main Agar Kahoon Instrumental */}
      <audio
        ref={introAudioRef}
        src="/audio/Main Agar Kahoon Instrumental.mp3"
        loop
        onEnded={handleIntroEnded}
        preload="auto"
      />
      
      {/* Yes celebration sound - SRK Yahoo */}
      <audio
        ref={yesAudioRef}
        src="/audio/srk_yahoo_oso.mp3"
        onEnded={handleYesEnded}
        preload="auto"
      />
      
      {/* Sections music - Kisi Roz Tumse */}
      <audio
        ref={sectionsAudioRef}
        src="/audio/kisi_roz_tumse.mp3"
        loop
        onEnded={handleSectionsEnded}
        preload="auto"
      />
      
      <div className="music-player">
        <button
          className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          disabled={currentTrack === 'yes' || !currentTrack}
        >
          {isPlaying ? '🔊' : '🔈'}
        </button>
        <button
          className="volume-toggle-btn"
          onClick={toggleVolumeControl}
          aria-label="Volume control"
        >
          🔊
        </button>
        {showVolumeControl && (
          <div className="volume-control">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
            <span className="volume-value">{Math.round(volume * 100)}%</span>
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;

