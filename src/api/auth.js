import api from './axios';

export const register = async (username, password) => {
  try {
    const response = await api.post('/auth/register', { username, password });
    const { token, accountId, username: userName } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('accountId', accountId);
    localStorage.setItem('username', userName);
    
    return { token, accountId, username: userName };
  } catch (error) {
    if (error.response?.data?.error === 'ALREADY_EXISTS') {
      throw new Error('Пользователь с таким именем уже существует');
    }
    throw new Error('Ошибка регистрации');
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const { token, accountId, username: userName } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('accountId', accountId);
    localStorage.setItem('username', userName);
    
    return { token, accountId, username: userName };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Пользователь не найден');
    }
    throw new Error('Ошибка входа');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('accountId');
  localStorage.removeItem('username');
};

export const checkAuth = () => {
  const token = localStorage.getItem('token');
  const accountId = localStorage.getItem('accountId');
  const username = localStorage.getItem('username');
  
  if (token && accountId) {
    return { 
      isAuthenticated: true, 
      user: { id: accountId, name: username, username } 
    };
  }
  
  return { isAuthenticated: false, user: null };
};

export const getCurrentUser = () => {
  const accountId = localStorage.getItem('accountId');
  const username = localStorage.getItem('username');
  return accountId ? { id: accountId, username } : null;
};