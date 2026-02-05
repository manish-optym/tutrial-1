import React, { createContext, useContext, useRef } from 'react';

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const pauseMusicRef = useRef(null);
  const resumeMusicRef = useRef(null);
  const savedVolumeRef = useRef(null);

  const pauseBackgroundMusic = () => {
    if (pauseMusicRef.current) {
      pauseMusicRef.current();
    }
  };

  const resumeBackgroundMusic = () => {
    if (resumeMusicRef.current) {
      resumeMusicRef.current();
    }
  };

  const registerPauseFunction = (pauseFn) => {
    pauseMusicRef.current = pauseFn;
  };

  const registerResumeFunction = (resumeFn) => {
    resumeMusicRef.current = resumeFn;
  };

  return (
    <MusicContext.Provider
      value={{
        pauseBackgroundMusic,
        resumeBackgroundMusic,
        registerPauseFunction,
        registerResumeFunction,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }
  return context;
};

