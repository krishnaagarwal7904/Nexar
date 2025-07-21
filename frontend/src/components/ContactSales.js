import React, { useEffect, useRef, useState } from 'react';
import './ContactSales.css';

const ContactSales = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    jobTitle: '',
    phone: '',
    companyName: '',
    companySize: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.companySize) {
      newErrors.companySize = 'Company size is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        workEmail: '',
        jobTitle: '',
        phone: '',
        companyName: '',
        companySize: '',
        comments: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  const companySizeOptions = [
    { value: '', label: 'Select company size' },
    { value: '1', label: '1' },
    { value: '2-10', label: '2-10' },
    { value: '11-49', label: '11-49' },
    { value: '50+', label: '50+' }
  ];

  return (
    <section className={`contact-sales ${isVisible ? 'contact-sales-visible' : ''}`} ref={sectionRef}>
      <div className="contact-sales-container">
        <div className="contact-sales-header">
          <h2 className="contact-sales-title">Contact Sales</h2>
          <p className="contact-sales-subtitle">
            Ready to transform your business? Let's discuss how Nexar can help you grow.
          </p>
        </div>

        <div className="contact-sales-content">
          <div className="contact-sales-form-wrapper">
            <form className="contact-sales-form nexar-card" onSubmit={handleSubmit}>
              {submitSuccess && (
                <div className="success-message nexar-success">
                  <h3>Thank you!</h3>
                  <p>We've received your request and will contact you within 24 hours.</p>
                </div>
              )}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`nexar-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error-message nexar-error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`nexar-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error-message nexar-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="workEmail" className="form-label">
                  Work Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  className={`nexar-input ${errors.workEmail ? 'error' : ''}`}
                  placeholder="Enter your work email"
                />
                {errors.workEmail && <span className="error-message nexar-error">{errors.workEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="jobTitle" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="nexar-input"
                  placeholder="Enter your job title (optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`nexar-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className="error-message nexar-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="companyName" className="form-label">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`nexar-input ${errors.companyName ? 'error' : ''}`}
                  placeholder="Enter your company name"
                />
                {errors.companyName && <span className="error-message nexar-error">{errors.companyName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="companySize" className="form-label">
                  Company Size <span className="required">*</span>
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className={`nexar-input ${errors.companySize ? 'error' : ''}`}
                >
                  {companySizeOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.companySize && <span className="error-message nexar-error">{errors.companySize}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="comments" className="form-label">
                  Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  className="nexar-input"
                  placeholder="Tell us about your business needs (optional)"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className={`nexar-btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Contact Sales'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSales; 