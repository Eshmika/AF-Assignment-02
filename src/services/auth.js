const AUTH_KEY = 'countries_auth';

export const login = (email, password) => {
  //any email with a password longer than 5 characters
  if (password.length > 5) {
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      user,
      token: 'mock-jwt-token',
      expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours
    }));
    return { success: true, user };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const register = (email, password) => { 
  if (password.length > 5) {
    const user = { email, name: email.split('@')[0] };
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      user,
      token: 'mock-jwt-token',
      expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours
    }));
    return { success: true, user };
  }
  return { success: false, message: 'Registration failed' };
};

export const getCurrentUser = () => {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  
  const { user, expiresAt } = JSON.parse(authData);
  if (new Date().getTime() > expiresAt) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
  
  return user;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
