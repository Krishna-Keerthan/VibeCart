import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL || import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// PRODUCT API CALLS
// ============================================

export const productAPI = {
  // Get all products with optional filters
  getAll: (params = {}) => 
    api.get('/products', { params }),

  // Get single product
  getById: (id) => 
    api.get(`/products/${id}`),

  // Get products by category
  getByCategory: (category) => 
    api.get(`/products/category/${category}`),

  // Search products
  search: (query) => 
    api.get(`/products/search/${query}`),

  // Get featured products
  getFeatured: (limit = 6) => 
    api.get('/products/featured/list', { params: { limit } }),

  // Get all categories
  getCategories: () => 
    api.get('/products/categories/list'),
};

// ============================================
// CART API CALLS
// ============================================

export const cartAPI = {
  // Add item to cart
  addItem: (sessionId, productId, quantity = 1) => 
    api.post('/cart', { sessionId, productId, quantity }),

  // Get cart items
  getCart: (sessionId) => 
    api.get(`/cart/${sessionId}`),

  // Update cart item quantity
  updateItem: (itemId, quantity) => 
    api.put(`/cart/${itemId}`, { quantity }),

  // Remove item from cart
  removeItem: (itemId) => 
    api.delete(`/cart/${itemId}`),

  // Clear entire cart
  clearCart: (sessionId) => 
    api.delete(`/cart/session/${sessionId}`),
};

// ============================================
// CHECKOUT API CALLS
// ============================================

export const checkoutAPI = {
  // Process checkout
  processCheckout: (sessionId, customerInfo) => 
    api.post('/checkout', { sessionId, customerInfo }),

  // Get order history
  getOrderHistory: (sessionId) => 
    api.get(`/orders/${sessionId}`),

  // Get order by ID
  getOrderById: (orderId) => 
    api.get(`/orders/details/${orderId}`),
};

// ============================================
// HEALTH CHECK
// ============================================

export const healthCheck = () => 
  api.get('/health');

export default api;