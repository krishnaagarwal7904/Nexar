import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img 
            src="/assests/logo/horizontal.png" 
            alt="NEXAR" 
            className="logo-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="logo-text">NEXAR</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          <a href="#home" className="nav-link" onClick={handleNavLinkClick}>
            Home
          </a>
          <a href="#features" className="nav-link" onClick={handleNavLinkClick}>
            Features
          </a>
          <a href="#pricing" className="nav-link" onClick={handleNavLinkClick}>
            Pricing
          </a>
          <a href="#about" className="nav-link" onClick={handleNavLinkClick}>
            About
          </a>
          <a href="#contact" className="nav-link" onClick={handleNavLinkClick}>
            Contact
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="navbar-actions">
          <button className="nav-btn-secondary">Sign In</button>
          <button className="nav-btn-primary">Get Started</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#home" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Home
          </a>
          <a href="#features" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Features
          </a>
          <a href="#pricing" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Pricing
          </a>
          <a href="#about" className="mobile-nav-link" onClick={handleNavLinkClick}>
            About
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={handleNavLinkClick}>
            Contact
          </a>
          <div className="mobile-menu-actions">
            <button className="mobile-nav-btn-secondary">Sign In</button>
            <button className="mobile-nav-btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 