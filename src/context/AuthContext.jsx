import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi, checkAuth } from '../api/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = checkAuth();
    setIsAuthenticated(authData.isAuthenticated);
    setUser(authData.user);
    setLoading(false);
  }, []);

  const register = async (username, password) => {
    const result = await registerApi(username, password);
    setUser({ id: result.accountId, name: result.username, username: result.username });
    setIsAuthenticated(true);
    return result;
  };

  const login = async (username, password) => {
    const result = await loginApi(username, password);
    setUser({ id: result.accountId, name: result.username, username: result.username });
    setIsAuthenticated(true);
    return result;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}