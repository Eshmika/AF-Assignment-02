import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg p-5">
      <div className="container mx-auto px-4 py-4 flex flex-col gap-3 text-center">
        <Link to="/" className="text-4xl font-bold">
          Countries of the World
        </Link>     
        <p>There are 195 countries in the world today</p>   
      </div>
    </header>
  );
};

export default Header;
