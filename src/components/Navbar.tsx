
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="PeriTrack Logo" 
            className="h-16 w-auto" 
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
