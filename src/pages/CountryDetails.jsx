import React,{ useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import CountryDetail from '../components/CountryDetail';

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getCountryByCode(code);
        setCountry(data);
        setError(null);
      } catch (error) {        
        setError('Country not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button 
        onClick={handleGoBack}
        className="mb-8 px-6 py-2 bg-gray-900 shadow-md rounded flex items-center text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
        <div className="text-center py-10">
          <h2 className="text-2xl text-gray-900">{error || 'Country not found'}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={handleGoBack}
        className="mb-8 px-6 py-2 bg-gray-900 shadow-md rounded flex items-center text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <CountryDetail country={country} />
    </div>
  );
};

export default CountryDetails;
