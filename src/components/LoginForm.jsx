import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {      
      const result = await login(email, password);      

      if (result && result.success) {        
        setEmail("");
        setPassword("");
        navigate("/", { replace: true });
      } else {        
        setError(result && result.message ? result.message : "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800 relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <span className="inline-block w-1.5 h-8 bg-blue-500 mr-3 rounded-full transform transition-all duration-300 group-hover:scale-y-125"></span>
          Login
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label htmlFor="email" className="block text-white text-sm mb-2 transition-all duration-300 group-focus-within:text-blue-400">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          </div>

          <div className="relative group">
            <label htmlFor="password" className="block text-white text-sm mb-2 transition-all duration-300 group-focus-within:text-blue-400">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:-translate-y-1 active:translate-y-0 group"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center">
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
