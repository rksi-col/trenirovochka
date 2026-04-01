import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth, login as loginApi, logout as logoutApi } from '../api/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { isAuthenticated, user } = checkAuth();
    setIsAuthenticated(isAuthenticated);
    setUser(user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user } = await loginApi(email, password);
    setUser(user);
    setIsAuthenticated(true);
    return user;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}