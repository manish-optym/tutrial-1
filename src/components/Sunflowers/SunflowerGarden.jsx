import React, { useEffect, useRef, useState } from 'react';
import '../../styles/sunflowers.css';

const SunflowerGarden = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const numOfFlowers = 4;
    
    const growGarden = () => {
      function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
      }

      let positions = [];

      function getNum() {
        let pos = getRandomArbitrary(0, 100);
        for (let x = 0; x < positions.length; x++) {
          if (pos > positions[x] - 3 && pos < positions[x] + 3) {
            return false;
          }
        }
        positions.push(pos);
      }

      while (positions.length < numOfFlowers) {
        getNum();
      }

      let more = setInterval(function () {
        let flwr = document.createElement('div');
        let dim = getRandomArbitrary(30, 80);
        let leftPos = positions[0];
        positions.shift();

        flwr.classList.add('sunflwr');
        flwr.innerHTML = `<div class="sunflwr__leaf--left"></div>
                          <div class="sunflwr__leaf--right"></div>
                          <div class="sunflwr__stem"></div>
                          <div class="sunflwr__center"></div>
                          <div class="sunflwr__pedal--1"></div>
                          <div class="sunflwr__pedal--2"></div>
                          <div class="sunflwr__pedal--3"></div>
                          <div class="sunflwr__pedal--4"></div>
                          <div class="sunflwr__pedal--5"></div>
                          <div class="sunflwr__pedal--6"></div>
                          <div class="sunflwr__pedal--7"></div>
                          <div class="sunflwr__pedal--8"></div>
                          <div class="sunflwr__pedal--9"></div>
                          <div class="sunflwr__pedal--10"></div>
                          <div class="sunflwr__pedal--11"></div>
                          <div class="sunflwr__pedal--12"></div>`;
        flwr.style.left = `${leftPos}vw`;
        flwr.style.height = `${dim}vmin`;
        flwr.style.width = `${dim}vmin`;
        flwr.style.zIndex = 100 - dim;
        flwr.style.filter = `saturate(${getRandomArbitrary(70, 100)}%) brightness(${getRandomArbitrary(80, 150)}%)`;
        container.querySelector('.garden-area').appendChild(flwr);
      }, 150);

      setTimeout(function () {
        window.clearInterval(more);
      }, numOfFlowers * 150);
    };

    const handleClick = () => {
      growGarden();
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, []);

  const [hasFlowers, setHasFlowers] = useState(false);

  // Check if there are any flowers in the garden area
  useEffect(() => {
    const checkFlowers = () => {
      const gardenArea = containerRef.current?.querySelector('.garden-area');
      if (gardenArea) {
        const flowers = gardenArea.querySelectorAll('.sunflwr');
        setHasFlowers(flowers.length > 0);
      }
    };

    const interval = setInterval(checkFlowers, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sunflowers" className="sunflower-garden-section" ref={containerRef}>
      <div className="garden-container">
        <div className="garden-title">
          <h1>Sunflower Garden</h1>
          <p className="garden-subtitle">Click anywhere to plant sunflowers 🌻</p>
          <p className="garden-hint">Each click grows beautiful sunflowers in our garden</p>
        </div>
        <div className="garden-area">
          {!hasFlowers && (
            <div className="garden-empty-state">
              <div className="empty-heart">💛</div>
              <p>Start planting by clicking anywhere!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SunflowerGarden;
