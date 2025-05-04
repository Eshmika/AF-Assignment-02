import React,{ useEffect, useState } from "react";
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
    <div className="p-6 bg-gray-900">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">
        {country.name.common}
      </h2>
      <div className="w-full flex justify-center mb-8">
        <div>
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="object-fill rounded-lg shadow-md border-2 border-gray-900"
          />

          {isAuthenticated && (
            <button
              onClick={handleToggleFavorite}
              className={`mt-4 px-6 py-2 rounded-md flex items-center justify-center w-60 ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors`}
            >
              {isFavorite ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                    className="h-5 w-5 mr-2"
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
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Native Name:</td>
              <td className="py-3 text-xl">
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)[0].common
                  : country.name.common}
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Population:</td>
              <td className="py-3 text-xl">
                {country.population.toLocaleString()}
              </td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Region:</td>
              <td className="py-3 text-xl">{country.region}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Sub Region:</td>
              <td className="py-3 text-xl">{country.subregion || "N/A"}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Capital:</td>
              <td className="py-3 text-xl">{country.capital?.[0] || "N/A"}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Top Level Domain:</td>
              <td className="py-3 text-xl">{country.tld?.[0] || "N/A"}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Currencies:</td>
              <td className="py-3 text-xl">{getCurrencies()}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Languages:</td>
              <td className="py-3 text-xl">{getLanguages()}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-3 font-semibold text-xl">Border Countries:</td>
              <td className="py-3 text-xl">
                {borderCountries.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {borderCountries.map((border) => (
                      <Link
                        key={border.cca3}
                        to={`/country/${border.cca3}`}
                        className="px-4 py-1 bg-white dark:bg-gray-700 shadow-md rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        {border.name.common}
                      </Link>
                    ))}
                  </div>
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
