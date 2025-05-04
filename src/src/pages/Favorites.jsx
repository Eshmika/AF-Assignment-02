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
        <h2 className="text-xl text-gray-900">
          Please log in to view your favorites
        </h2>
        <Link
          to="/login"
          className="inline-block mt-5 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-500 transition-colors"
        >
          Log In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl text-gray-900">
          You haven't added any countries to your favorites yet
        </h2>
        <Link
          to="/"
          className="inline-block mt-5 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-500 transition-colors"
        >
          Explore Countries
        </Link>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-8 px-6 py-2 bg-gray-900 shadow-md rounded flex items-center text-white hover:bg-gray-600 transition-colors"
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
      </button>
      <h1 className="text-2xl font-bold text-gray-900 my-5">
        Your Favorite Countries
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((favorite) => (
          <div
            key={favorite.countryCode}
            className="bg-gray-900 rounded-lg shadow-md border-2 border-gray-900 overflow-hidden h-full hover:transform hover:scale-105 transition-transform duration-300 hover:bg-gray-900 hover:shadow-gray-900 hover:shadow-lg"
          >
            <img
              src={favorite.flagUrl}
              alt={`Flag of ${favorite.countryName}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-white">
                {favorite.countryName}
              </h2>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/country/${favorite.countryCode}`}
                  className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(favorite.countryCode)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
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
