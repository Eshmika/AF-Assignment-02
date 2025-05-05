// src/pages/Favorites.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../services/favorites";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const handleRemoveFavorite = async (countryCode) => {
    try {
      await removeFromFavorites(countryCode);
      setFavorites(favorites.filter((fav) => fav.countryCode !== countryCode));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl text-gray-900 mb-6">
          Please log in to view your favorites
        </h2>
        <Link
          to="/login"
          className="inline-block mt-2 px-8 py-3 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 
                   transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1
                   border border-gray-800 hover:border-blue-700 relative group overflow-hidden"
        >
          <span className="relative z-10">Log In</span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-900 opacity-0 
                        group-hover:opacity-30 transition-opacity duration-300"></span>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center animate-fadeIn">
        <div className="bg-gray-900 p-10 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-xl text-white mb-6">
            You haven't added any countries to your favorites yet
          </h2>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md 
                     hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1
                     relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Explore Countries
            </span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 
                          group-hover:opacity-30 transition-opacity duration-300"></span>
          </Link>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <button
        onClick={handleGoBack}
        className="mb-8 px-6 py-2 bg-gray-900 shadow-md rounded flex items-center text-white hover:bg-gray-800 transition-colors relative group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
        <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 transition-all group-hover:w-full"></span>
      </button>
      
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Favorite Countries
        </h1>
        <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full ml-4">
          {favorites.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((favorite, index) => (
          <div
            key={favorite.countryCode}
            className="bg-gray-900 rounded-lg shadow-md border-2 border-gray-800 overflow-hidden h-full 
                     transition-all duration-300 hover:border-blue-700 hover:shadow-xl hover:shadow-blue-900/20
                     group relative animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={favorite.flagUrl}
                alt={`Flag of ${favorite.countryName}`}
                className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
            </div>
            
            <div className="p-5">
              <h2 className="text-xl font-bold mb-4 text-white relative">
                {favorite.countryName}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </h2>
              
              <div className="mt-6 flex flex-col space-y-2">
                <Link
                  to={`/country/${favorite.countryCode}`}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-md flex items-center justify-center
                          hover:bg-blue-600 hover:text-white transition-all duration-300 group-hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  View Details
                </Link>
                
                <button
                  onClick={() => handleRemoveFavorite(favorite.countryCode)}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-md flex items-center justify-center
                           hover:bg-red-600 hover:text-white transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 w-2 bg-red-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="relative z-10">Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
