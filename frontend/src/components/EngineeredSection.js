import React, { useEffect, useRef, useState } from 'react';
import './EngineeredSection.css';

const EngineeredSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section className={`engineered-section ${isVisible ? 'engineered-section-visible' : ''}`} ref={sectionRef}>
      <div className="engineered-container">
        <div className="engineered-content">
          <div className="engineered-text">
            <h2 className="engineered-title">Engineered for Modern Professional Services</h2>
          </div>
          
          <div className="ripple-animation">
            <div className="n-logo">
              <img 
                src="/assests/logo/mark.png" 
                alt="Nexar Mark" 
                className="n-mark"
              />
            </div>
            
            {/* Ripple circles */}
            <div className="ripple-circle ripple-1"></div>
            <div className="ripple-circle ripple-2"></div>
            <div className="ripple-circle ripple-3"></div>
            <div className="ripple-circle ripple-4"></div>
            <div className="ripple-circle ripple-5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeredSection; 