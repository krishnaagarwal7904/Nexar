import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const chartRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Animate graph lines using requestAnimationFrame
  useEffect(() => {
    let animationId;
    let phase = 0;

    const animateGraphs = () => {
      chartRefs.current.forEach((chartRef, index) => {
        if (chartRef) {
          const offset = index * 0.5; // Stagger animation
          const wavePhase = (phase + offset) % (2 * Math.PI);
          
          // Create wave pattern using clip-path
          const points = [];
          for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * 100;
            const y = 100 - (Math.sin(wavePhase + i * 0.5) * 30 + 50);
            points.push(`${x}% ${y}%`);
          }
          
          chartRef.style.clipPath = `polygon(0 100%, ${points.join(', ')}, 100% 100%)`;
        }
      });
      
      phase += 0.02;
      animationId = requestAnimationFrame(animateGraphs);
    };

    animateGraphs();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

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
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              Monitor Everything Effortlessly
            </h1>
            <p className="hero-subheadline">
              From deals to engagement, get real-time metrics in one place.
            </p>
          </div>
          <div className="hero-graphic">
            <div className="rocket-graphic"></div>
          </div>
        </div>
        
        <div className="hero-illustration">
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
                <div 
                  className="chart-graph" 
                  ref={el => chartRefs.current[0] = el}
                ></div>
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
                <div 
                  className="chart-graph" 
                  ref={el => chartRefs.current[1] = el}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="character-illustration">
            <div className="character">
              <div className="character-body"></div>
              <div className="character-laptop"></div>
            </div>
          </div>
          
          <div className="background-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
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
    </section>
  );
};

export default HeroSection; 