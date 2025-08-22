import React, { useState } from 'react';

// Import all components
import Navbar from './Navbar';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import PricingPage from './PricingPage';
import FAQPage from './FAQPage';
import ContactPage from './ContactPage';

const FrontPage = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'pricing':
        return <PricingPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default FrontPage;