import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg p-4">
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-xl md:text-2xl font-bold">
              Countries of the World
            </Link>
            <p className="text-sm md:text-base">There are 195 countries in the world today</p>
          </div>          
          
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-blue-500 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            {isAuthenticated ? (
              <>
                <span className="font-bold text-xl md:text-2xl">Hi, {user.name}</span>
                <Link to="/favorites" className="hover:text-blue-500 text-lg md:text-2xl">
                  Favorites
                </Link>
                <button onClick={logout} className="hover:text-blue-500 text-lg md:text-2xl text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500 text-lg md:text-2xl">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-500 text-lg md:text-2xl">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
