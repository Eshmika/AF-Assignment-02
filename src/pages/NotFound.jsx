import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-900 mb-8">Page not found</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-500 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
