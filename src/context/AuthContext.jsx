import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout, register as authRegister } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    setUser(user);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const result = authLogin(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = (email, password) => {
    const result = authRegister(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
