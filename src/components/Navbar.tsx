
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="PeriTrack Logo" 
            className="h-10 w-auto" 
          />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-warm-gray hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/quiz" className="text-warm-gray hover:text-primary transition-colors">
            Take Assessment
          </Link>
          <Link to="/tryperitrack" className="text-warm-gray hover:text-primary font-medium transition-colors">
            Try PeriTrack
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
