import api from './axios';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    console.error('Ошибка входа:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
};

export const checkAuth = () => {
  const token = localStorage.getItem('admin_token');
  const user = localStorage.getItem('admin_user');
  
  if (token && user) {
    try {
      const parsedUser = JSON.parse(user);
      return { isAuthenticated: true, user: parsedUser };
    } catch {
      return { isAuthenticated: false, user: null };
    }
  }
  
  return { isAuthenticated: false, user: null };
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
};