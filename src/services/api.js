import axios from 'axios';

const API_URL = 'https://deepnetsoft-machine-test-952b.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchMenus = () => api.get('/menus');
export const fetchItemsByMenu = (menuId) => api.get(`/items/${menuId}`);

export const createMenu = (menuData) => api.post('/menus', menuData);
export const createItem = (itemData) => api.post('/items', itemData);

export const updateMenu = (id, menuData) => api.put(`/menus/${id}`, menuData);
export const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData);

export const deleteMenu = (id) => api.delete(`/menus/${id}`);
export const deleteItem = (id) => api.delete(`/items/${id}`);

export default api;