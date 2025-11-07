import { useCart } from "../context/CartContext";
import { motion , AnimatePresence } from "framer-motion";
import { Heart , X ,  } from "lucide-react";

// Wishlist Drawer Component
const WishlistDrawer = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Wishlist
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Heart className="w-16 h-16 mb-4" />
                  <p>Your wishlist is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map(item => (
                    <motion.div
                      key={item._id}
                      layout
                      className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-purple-600 font-bold">${item.price}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(item);
                              toggleWishlist(item);
                            }}
                            className="text-xs px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="text-xs px-3 py-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;