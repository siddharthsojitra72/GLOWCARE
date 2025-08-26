import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

const EmailSignUp = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the email to your backend or email service
    console.log('Email submitted:', email);
    
    // Show success message
    setSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-700 mb-6">Sign up to receive updates on new products, special offers, and skincare tips.</p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Your email address"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
                aria-label="Subscribe"
              >
                <FaArrowRightLong className="text-xl" />
              </button>
            </div>
            
            {submitted && (
              <p className="mt-2 text-green-600 text-sm">Thank you for subscribing!</p>
            )}
            
            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSignUp;