import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css'
import { Package } from 'lucide-react';
import { motion , AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero.jsx'
import  Navbar  from '../components/Navbar.jsx';
import StatsSection from '../components/Stats.jsx';
import FilterSection from '../components/Filter.jsx';
import ProductCard from '../components/ProductCard.jsx'
import WishlistDrawer from '../components/WishlistDrawer.jsx'
import CartDrawer from '../components/CartDrawer.jsx'
import CartProvider from '../context/CartContext.jsx'
import { mockProducts } from '../context/CartContext.jsx';
import Footer from '../components/Footer.jsx'
import { productAPI, cartAPI, checkoutAPI } from './api/api';
import toast, { Toaster } from 'react-hot-toast';


// Main App Component with API Integration
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        sort: sortBy
      };
      const response = await productAPI.getAll(params);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Filter products by search query (client-side)
  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

   return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar
          onCartClick={() => setCartOpen(true)}
          onWishlistClick={() => setWishlistOpen(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Hero />
          <StatsSection />
          <FilterSection
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No products found. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </main>

        <Footer />

        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;