import React, { useEffect, useRef, useState } from 'react';
import './WhoIsItFor.css';

const WhoIsItFor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const professionals = [
    {
      title: "Mortgage Brokers",
      image: process.env.PUBLIC_URL + "assests/pic1.png",
      description: "Streamline loan applications and client management with specialized workflows."
    },
    {
      title: "Buyer's Agents",
      image: process.env.PUBLIC_URL + "assests/pic2.png", 
      description: "Track property searches and client preferences with dedicated tools."
    },
    {
      title: "Recruitment Consultants",
      image: process.env.PUBLIC_URL + "assests/pic3.png",
      description: "Manage candidate pipelines and client relationships efficiently."
    },
    {
      title: "Conveyancers",
      image: process.env.PUBLIC_URL + "assests/pic4.png",
      description: "Organize property transactions with specialized legal workflows."
    },
    {
      title: "Financial Advisers",
      image: process.env.PUBLIC_URL + "assests/pic5.png",
      description: "Track client portfolios and financial planning processes."
    },
    {
      title: "Business Brokers",
      image: process.env.PUBLIC_URL + "assests/pic6.png",
      description: "Manage business sales and client relationships with ease."
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // Auto-rotate cards every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % professionals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [professionals.length]);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const nextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % professionals.length);
  };

  const prevCard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + professionals.length) % professionals.length);
  };

  return (
    <section className={`who-is-it-for ${isVisible ? 'who-is-it-for-visible' : ''}`} ref={sectionRef}>
      <div className="who-is-it-for-container">
        <div className="who-is-it-for-header">
          <h2 className="who-is-it-for-title">Who is it for?</h2>
          <p className="who-is-it-for-subtitle">
            Nexar is purpose-built for the unique workflows of professional service providers like:
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-wrapper">
            {professionals.map((professional, index) => (
              <div
                key={index}
                className={`professional-card ${index === activeIndex ? 'active' : ''} ${index === (activeIndex - 1 + professionals.length) % professionals.length ? 'prev' : ''} ${index === (activeIndex + 1) % professionals.length ? 'next' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="professional-image">
                  <img src={professional.image} alt={professional.title} />
                </div>
                <div className="professional-content">
                  <h3 className="professional-title">{professional.title}</h3>
                  <p className="professional-description">{professional.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="carousel-dots">
            {professionals.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="carousel-arrow carousel-prev" onClick={prevCard}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="carousel-arrow carousel-next" onClick={nextCard}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor; 