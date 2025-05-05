import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountryByCode } from "../services/api";
import {
  addToFavorites,
  removeFromFavorites,
  checkFavorite,
} from "../services/favorites";
import { useAuth } from "../context/AuthContext";

const CountryDetail = ({ country }) => {
  const [borderCountries, setBorderCountries] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (country.borders && country.borders.length > 0) {
        try {
          const borderData = await Promise.all(
            country.borders.map((border) => getCountryByCode(border))
          );
          setBorderCountries(borderData);
        } catch (error) {
          console.error("Error fetching border countries:", error);
        }
      }
    };

    fetchBorderCountries();
  }, [country.borders]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated) return;

      try {
        const status = await checkFavorite(country.cca3);
        setIsFavorite(status);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [country.cca3, isAuthenticated]);

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(country.cca3);
      } else {
        await addToFavorites(country);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Helper function to get languages as string
  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  // Helper function to get currencies as string
  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(", ");
  };

  return (
    <div className="p-6 bg-gray-900 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6 text-white relative inline-block">
          {country.name.common}
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-700 ease-out origin-left group-hover:scale-x-100"></div>
        </h2>
      </div>
      <div className="w-full flex justify-center mb-8">
        <div>
          <div className="relative overflow-hidden rounded-lg group">
            {/* Flag image with loading state and hover effects */}
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className={`object-fill rounded-lg shadow-md border-2 border-gray-900 transition-all duration-700 
                        ${isImageLoaded ? "opacity-100" : "opacity-0"} 
                        group-hover:shadow-lg group-hover:shadow-blue-900/30`}
              onLoad={() => setIsImageLoaded(true)}
            />

            {/* Loading spinner */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleToggleFavorite}
              className={`mt-4 px-6 py-2 rounded-md flex items-center justify-center w-60 
                        shadow-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0
                        ${
                          isFavorite
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white relative overflow-hidden group`}
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 w-0 bg-white/20 skew-x-20 transition-all duration-700 group-hover:w-full"></span>

              {isFavorite ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 animate-pulse"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Remove from Favorites
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 transform transition-transform duration-300 group-hover:scale-125"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Favorites
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <tbody>
            {[
              {
                label: "Native Name",
                value: country.name.nativeName
                  ? Object.values(country.name.nativeName)[0].common
                  : country.name.common,
              },
              {
                label: "Population",
                value: country.population.toLocaleString(),
              },
              { label: "Region", value: country.region },
              { label: "Sub Region", value: country.subregion || "N/A" },
              { label: "Capital", value: country.capital?.[0] || "N/A" },
              { label: "Top Level Domain", value: country.tld?.[0] || "N/A" },
              { label: "Currencies", value: getCurrencies() },
              { label: "Languages", value: getLanguages() },
            ].map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200"
              >
                <td className="py-3 font-semibold text-xl">{item.label}:</td>
                <td className="py-3 text-xl">{item.value}</td>
              </tr>
            ))}
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Border Countries:</td>
              <td className="py-3 text-xl">
                {borderCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {borderCountries.map((border) => (
                      <Link
                        key={border.cca3}
                        to={`/country/${border.cca3}`}
                        className="flex items-center px-3 py-2 bg-gray-700 shadow-md rounded-lg text-sm text-gray-300 
                                  transition-all duration-300 hover:bg-gray-600 group 
                                  hover:shadow-blue-900/30 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="mr-2 w-6 h-4 overflow-hidden rounded relative">
                          <img 
                            src={border.flags.svg} 
                            alt={`Flag of ${border.name.common}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <span className="relative">
                          {border.name.common}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <span>No bordering countries</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryDetail;
