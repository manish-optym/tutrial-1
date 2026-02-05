import React, { useEffect } from 'react';
import '../../styles/intro.css';

const ParticleBackground = () => {
  useEffect(() => {
    // Exact copy from Valentine's Day Surprise main.js lines 2-21
    // IMPORTANT: Append to document.body, not container, just like the original
    function createParticles() {
      const emojis = ['❤️', '🌎', '🌠', '💝', '🌟', '💞'];
      const container = document.body; // Use document.body like the original
      let lastTime = 0;

      function animate(timestamp) {
        if (!lastTime || timestamp - lastTime >= 500) { // Reduced frequency
          const particle = document.createElement('div');
          particle.className = 'love-particle';
          particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDuration = Math.random() * 3 + 3 + 's';
          container.appendChild(particle);
          setTimeout(() => particle.remove(), 6000);
          lastTime = timestamp;
        }
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    }

    // Initialize particles immediately (no need to wait for container since we use document.body)
    createParticles();

    return () => {
      // Cleanup: remove all particles when component unmounts
      const particles = document.querySelectorAll('.love-particle');
      particles.forEach(p => p.remove());
    };
  }, []); // Empty dependency array - only run once on mount

  // No need to render anything - particles are appended directly
  return null;
};

export default ParticleBackground;

