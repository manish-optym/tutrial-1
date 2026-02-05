import React, { useState, useEffect, useRef } from 'react';
import '../../styles/story.css';

const OurStory = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const storyRef = useRef(null);

  const milestones = [
    {
      year: 2022,
      month: 'February',
      title: 'The Beginning',
      description: 'Our journey started on February 5th, 2022. That\'s the day we decided together 😊. Sarswati puja is a day we can never forget ❤️. It was the first time i held your hand. A day that changed everything. It was like all my prayer are answered.',
      image: '/images/p16.png',
      side: 'left'
    },
    {
      year: 2022,
      month: 'Spring',
      title: 'First Adventures',
      description: 'We explored new places together, creating memories that would last a lifetime. Digha and mandar mani was the first adventure of our life together. Who can forget the waves that washed both of us off🤣🤣 and then the Sofa. Every moment felt magical and full of possibilities.',
      image: '/assets/flow.gif',
      side: 'right'
    },
    {
      year: 2023,
      month: 'Throughout',
      title: 'Growing Together',
      description: 'Through ups and downs, we learned about each other and ourselves. Our bond grew stronger with each passing day, building a foundation of trust and love.',
      image: '/images/p6.png',
      side: 'left'
    },
    {
      year: 2024,
      month: 'All Year',
      title: 'Deeper Connection',
      description: 'We discovered new depths to our relationship. Shared dreams, supported each other\'s goals, and found joy in the simple moments together.',
      image: '/images/p15.png',
      side: 'right'
    },
    {
      year: 2025,
      month: 'Present',
      title: '4 Years Strong',
      description: 'Four years of laughter, love, and growth. Every day with you is a gift, and I\'m grateful for every moment we\'ve shared and all the ones to come.',
      image: '/images/p14.jpeg',
      side: 'left'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const items = storyRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section id="story" className="story-section" ref={storyRef}>
      <div className="story-container">
        <div className="story-title">
          <h1>Our Story</h1>
          <p className="story-subtitle">4 Years of Beautiful Memories Together</p>
        </div>

        <div className="timeline">
          <div className="timeline-line"></div>
          
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`timeline-item ${milestone.side} ${
                visibleItems.includes(index) ? 'visible' : ''
              }`}
              data-index={index}
            >
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                <div className="marker-year">{milestone.year}</div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="timeline-image-container">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="timeline-image"
                    />
                  </div>
                  <div className="timeline-text">
                    <div className="timeline-date">
                      {milestone.month} {milestone.year}
                    </div>
                    <h3 className="timeline-title">{milestone.title}</h3>
                    <p className="timeline-description">{milestone.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="story-footer">
          <p className="story-message">
            "The best thing to hold onto in life is each other." 💕
          </p>
          <p className="story-date">February 5, 2022 - Forever</p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

