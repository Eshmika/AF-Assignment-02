import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountryByCode } from "../services/api";

const CountryDetail = ({ country }) => {
  const [borderCountries, setBorderCountries] = useState([]);

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
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="object-fill rounded-lg shadow-md border-2 border-gray-900"
        />
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryDetail;
