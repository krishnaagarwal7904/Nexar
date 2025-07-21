import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
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

  // Tooltip state
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  // Handle stat box hover
  const handleStatHover = (event, statInfo) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      text: statInfo.description,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleStatLeave = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  const statData = [
    { value: '1.2 K', label: 'Contacts', description: 'Total active contacts in your CRM' },
    { value: '$50K', label: 'Deals', description: 'Total value of active deals' },
    { value: '12', label: 'Tasks', description: 'Pending tasks requiring attention' }
  ];

  return (
    <section className={`hero ${isVisible ? 'hero-visible' : ''}`} ref={sectionRef}>
      <div className="hero-container">
        <div className="hero-content-grid">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-headline">
                Nexar CRM Platform
              </h1>
              <p className="hero-subheadline">
                A smarter CRM for Professional Service
              </p>
              <button className="hero-cta nexar-btn-primary">
                Get Started
              </button>
            </div>
            <div className="hero-graphic">
              <img 
                src="/assests/ChatGPT_Image_Jul_21__2025_at_08_24_52_PM-removebg-preview.png" 
                alt="Paper airplane flying" 
                className="paper-airplane-img"
              />
            </div>
          </div>
          
                    <div className="hero-illustration">
            <div className="dashboard-cloud"></div>
            <div className="dashboard-mockup">
              <div className="dashboard-header">
                <div className="window-controls">
                  <div className="control-dot"></div>
                  <div className="control-dot"></div>
                  <div className="control-dot"></div>
                </div>
              </div>
              
              <div className="dashboard-content">
                <div className="chart-box">
                  <div className="chart-graph">
                    <svg className="chart-wave chart-wave-1" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10" />
                      <path d="M0,12 Q10,7 20,12 T40,12 T60,12 T80,12 T100,12" />
                      <path d="M0,8 Q10,3 20,8 T40,8 T60,8 T80,8 T100,8" />
                    </svg>
                  </div>
                </div>
                
                <div className="stats-row">
                  {statData.map((stat, index) => (
                    <div 
                      key={index}
                      className={`stat-box ${stat.label.toLowerCase()}-stat`}
                      onMouseEnter={(e) => handleStatHover(e, stat)}
                      onMouseLeave={handleStatLeave}
                    >
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="chart-box">
                  <div className="chart-graph">
                    <svg className="chart-wave chart-wave-2" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,10 Q15,3 30,10 T50,10 T70,10 T85,10 T100,10" />
                      <path d="M0,12 Q15,5 30,12 T50,12 T70,12 T85,12 T100,12" />
                      <path d="M0,8 Q15,1 30,8 T50,8 T70,8 T85,8 T100,8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Character PNG - Moved to right */}
            <div className="character-container">
              <img 
                src="/assests/Humaaans_-_Sitting-removebg-preview.png" 
                alt="Person sitting and working" 
                className="character-svg"
              />
            </div>
            
          </div>
        </div>
        
        {/* Floating Blocks - Moved to hero container */}
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="floating-block floating-block-1"></div>
          <div className="floating-block floating-block-2"></div>
          <div className="floating-block floating-block-3"></div>
          <div className="floating-block floating-block-4"></div>
          <div className="floating-block floating-block-5"></div>
          <div className="floating-block floating-block-6"></div>
                </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div 
          className="tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          {tooltip.text}
        </div>
      )}
      
      {/* Transition Element */}
      <div className="hero-transition"></div>
    </section>
            );
          };

export default HeroSection; 