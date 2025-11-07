import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion , AnimatePresence } from "framer-motion";
import { Heart , Star , Check } from "lucide-react";
// Product Card Component
export default function ProductCard  ({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden product-card"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
        >
          <Heart
            className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </motion.button>
        <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ${product.price}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.stock} in stock
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-4 py-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50"
          >
            <Check className="w-5 h-5" />
            <span>Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};