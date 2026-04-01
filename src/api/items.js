import api from './axios';

export const getItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    const response = await api.post('/items', itemData);
    return response.data;
  } catch (error) {
    console.error('Ошибка создания товара:', error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error('Ошибка обновления товара:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка удаления товара:', error);
    throw error;
  }
};