import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="bg-gray-900 rounded-lg shadow-md border-2 border-gray-900 overflow-hidden h-full hover:transform hover:scale-105 transition-transform duration-300 hover:bg-gray-900 hover:shadow-gray-900 hover:shadow-lg">
        <img 
          src={country.flags.svg} 
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 text-white">
            {country.name.common}
          </h2>
          <div className="text-sm text-white">
            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>            
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
