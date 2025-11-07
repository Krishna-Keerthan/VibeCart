import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Sun, Moon, X, Plus, Minus, Trash2, Package, Check, Menu, Filter, Star, TrendingUp, Clock, MapPin, Mail, User } from 'lucide-react';
import { cartAPI } from '../src/api/api';
import {toast} from 'react-hot-toast'

// Cart Context with API Integration
const CartContext = createContext();

export default function CartProvider ({ children })  {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('sessionId');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', id);
    }
    return id;
  });

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart(sessionId);
      setCart(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, [sessionId]);

  // Add to cart (API)
  const addToCart = async (product) => {
    try {
      await cartAPI.addItem(sessionId, product._id, 1);
      await fetchCart();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    }
  };

  // Remove from cart (API)
  const removeFromCart = async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    }
  };

  // Update quantity (API)
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await cartAPI.updateItem(itemId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error(error.response?.data?.error || 'Failed to update quantity');
    }
  };

  // Clear cart (API)
  const clearCart = async () => {
    try {
      await cartAPI.clearCart(sessionId);
      await fetchCart();
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  // Wishlist operations (localStorage)
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        toast.success('Removed from wishlist');
        return prev.filter(item => item._id !== product._id);
      }
      toast.success('Added to wishlist');
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
  <CartContext.Provider
    value={{
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      cartTotal,
      cartCount,
      fetchCart,
    }}
  >
    {children}
  </CartContext.Provider>
);

};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// Mock Products Data
const mockProducts = [
  {
    _id: '1',
    name: 'MacBook Pro 14"',
    description: 'Supercharged by M3 Pro chip with stunning Liquid Retina XDR display',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.8,
    reviews: 342,
    stock: 25
  },
  {
    _id: '2',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation with premium sound quality',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop',
    category: 'Electronics',
    brand: 'Sony',
    rating: 4.9,
    reviews: 1205,
    stock: 50
  },
  {
    _id: '3',
    name: 'iPhone 15 Pro',
    description: 'Titanium design with A17 Pro chip and advanced camera system',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&h=500&fit=crop',
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.7,
    reviews: 892,
    stock: 40
  },
  {
    _id: '4',
    name: 'Nike Air Max 270',
    description: 'Featuring Nike\'s biggest heel Air unit for super-soft ride',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Fashion',
    brand: 'Nike',
    rating: 4.6,
    reviews: 567,
    stock: 100
  },
  {
    _id: '5',
    name: 'Apple Watch Series 9',
    description: 'Powerful health features with biggest, brightest Always-On display',
    price: 429.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop',
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.8,
    reviews: 743,
    stock: 60
  },
  {
    _id: '6',
    name: 'Herschel Backpack',
    description: 'Classic design with modern functionality and laptop sleeve',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Fashion',
    brand: 'Herschel',
    rating: 4.5,
    reviews: 423,
    stock: 75
  },
  {
    _id: '7',
    name: 'Nespresso Vertuo',
    description: 'Premium coffee maker with one-touch brewing technology',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
    category: 'Home & Living',
    brand: 'Nespresso',
    rating: 4.4,
    reviews: 289,
    stock: 45
  },
  {
    _id: '8',
    name: 'Philips Hue Starter Kit',
    description: 'Smart lighting with 16 million colors and voice control',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    category: 'Home & Living',
    brand: 'Philips',
    rating: 4.7,
    reviews: 512,
    stock: 80
  },
  {
    _id: '9',
    name: 'Atomic Habits',
    description: 'Transform your habits and reach your goals with tiny changes',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
    category: 'Books',
    brand: 'Avery',
    rating: 4.9,
    reviews: 18456,
    stock: 150
  },
  {
    _id: '10',
    name: 'iPad Air 11"',
    description: 'Serious performance with M2 chip and Apple Pencil Pro support',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.7,
    reviews: 634,
    stock: 35
  }
];

export {mockProducts};