import React, { useState, useEffect } from 'react';
import '../../styles/gallery.css';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Helper function to encode image paths with special characters
  const encodeImagePath = (filename) => {
    // Encode the filename but keep the path structure
    const parts = filename.split('/');
    const encodedParts = parts.map(part => encodeURIComponent(part));
    return encodedParts.join('/');
  };

  // Actual doodle images from the images folder
  const images = [
    { id: 1, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/Couple Drawings Simple.jpg`), alt: 'Couple Drawing', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p1.png`) },
    { id: 2, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/Cute Drawing.jpg`), alt: 'Cute Drawing', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p2.png`) },
    { id: 3, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/Cute Drawing (1).jpg`), alt: 'Cute Drawing 2', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p3.png`) },
    { id: 4, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/Love❤️.jpg`), alt: 'Love Drawing', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p4.png`) },
    { id: 5, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/Yes please ❤.jpg`), alt: 'Yes Please', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p5.png`) },
    { id: 6, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/☕︎.jpg`), alt: 'Coffee Drawing', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p6.png`) },
    { id: 7, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/☕︎ (1).jpg`), alt: 'Coffee Drawing 2', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p7.png`) },
    { id: 8, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download.jpg`), alt: 'Doodle 1', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p8.png`) },
    { id: 9, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (1).jpg`), alt: 'Doodle 2', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p9.jpg`) },
    { id: 10, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (2).jpg`), alt: 'Doodle 3', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p10.jpg`) },
    { id: 11, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (3).jpg`), alt: 'Doodle 4', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p11.jpg`) },
    { id: 12, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (4).jpg`), alt: 'Doodle 5', flipSrc: encodeImagePath(`${process.env.PUBLIC_URL}/images/p12.jpg`) },
    { id: 13, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (5).jpg`), alt: 'Doodle 6' },
    { id: 14, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (6).jpg`), alt: 'Doodle 7' },
    { id: 15, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (7).jpg`), alt: 'Doodle 8' },
    { id: 16, src: encodeImagePath(`${process.env.PUBLIC_URL}/images/download (8).jpg`), alt: 'Doodle 9' }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Reset flip state when image changes
      setIsFlipped(false);
      // Auto-flip if image has flipSrc
      if (selectedImage.flipSrc) {
        const flipTimer = setTimeout(() => {
          setIsFlipped(true);
        }, 800);
        return () => {
          clearTimeout(flipTimer);
          document.removeEventListener('keydown', handleKeyDown);
          document.body.style.overflow = 'unset';
        };
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
      setIsFlipped(false);
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="photo-gallery-section">
      <div className="gallery-container">
        <div className="gallery-title">
          <h1>Our Gallery</h1>
          <p className="gallery-subtitle">Memories from 4 beautiful years together</p>
        </div>

        <div className="gallery-grid">
          {images.map((image) => (
            <div
              key={image.id}
              className={`gallery-item ${image.flipSrc ? 'gallery-item-flip' : ''}`}
              onClick={() => openLightbox(image)}
            >
              {image.flipSrc ? (
                <div className="gallery-flip-card">
                  <div className="gallery-flip-card-inner">
                    <div className="gallery-flip-card-front">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="gallery-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="gallery-flip-card-back">
                      <img
                        src={image.flipSrc}
                        alt={`${image.alt} - Memory`}
                        className="gallery-image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="gallery-image"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-icon">🔍</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
          >
            ‹
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedImage.flipSrc ? (
              <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      className="lightbox-image"
                    />
                  </div>
                  <div className="flip-card-back">
                    <img
                      src={selectedImage.flipSrc}
                      alt={`${selectedImage.alt} - Memory`}
                      className="lightbox-image"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="lightbox-image"
              />
            )}
            <div className="lightbox-info">
              <span className="lightbox-counter">
                {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
              </span>
            </div>
          </div>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;

