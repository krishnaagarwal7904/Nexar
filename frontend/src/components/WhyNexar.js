import React, { useEffect, useRef, useState } from 'react';
import './WhyNexar.css';

const WhyNexar = () => {
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

  const features = [
    {
      icon: "/assests/Croods - Target.png",
      title: "Built specifically for service-based professionals",
      description: "Tailored workflows and features designed for consultants, agencies, and service providers."
    },
    {
      icon: "/assests/Croods - Lightning.png",
      title: "Automates your follow-ups, reminders & email sequences",
      description: "Never miss a follow-up with intelligent automation that keeps your pipeline moving."
    },
    {
      icon: "/assests/Croods - Puzzle.png",
      title: "Customisable pipelines for different services & workflows",
      description: "Create unique workflows for each service type with flexible pipeline customization."
    },
    {
      icon: "/assests/Croods - Ribbon.png",
      title: "Simple, elegant interface",
      description: "Clean design that gets out of your way so you can focus on what matters most."
    }
  ];

  return (
    <section className={`why-nexar ${isVisible ? 'why-nexar-visible' : ''}`} ref={sectionRef}>
      <div className="why-nexar-container">
        <div className="why-nexar-header">
          <h2 className="why-nexar-title">Why Nexar?</h2>
          <p className="why-nexar-subtitle">
            The CRM that understands service-based businesses
          </p>
        </div>

        <div className="features-list">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
                          <div className="feature-icon-wrapper">
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
            </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default WhyNexar; 