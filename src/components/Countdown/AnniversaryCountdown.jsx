import React, { useState, useEffect, useRef } from 'react';
import GiftAnimation from '../Gifts/GiftAnimation';
import '../../styles/countdown.css';

const AnniversaryCountdown = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target date: February 5, 2026 (5th anniversary)
      const countdownDate = new Date('2026-02-05T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = countdownDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimerDays(String(days).padStart(2, '0'));
        setTimerHours(String(hours).padStart(2, '0'));
        setTimerMinutes(String(minutes).padStart(2, '0'));
        setTimerSeconds(String(seconds).padStart(2, '0'));
      } else {
        // Countdown reached
        setTimerDays('00');
        setTimerHours('00');
        setTimerMinutes('00');
        setTimerSeconds('00');
        setIsComplete(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    intervalRef.current = setInterval(calculateTimeLeft, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (isComplete) {
    return <GiftAnimation />;
  }

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <div className="countdown-title">
          <h2>Countdown to Our 5th Anniversary</h2>
          <p>February 5, 2026</p>
        </div>
        <div className="countdown-timer">
          <div className="countdown-card">
            <div className="countdown-value">{timerDays}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-value">{timerHours}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-value">{timerMinutes}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-value">{timerSeconds}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnniversaryCountdown;

