import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion , AnimatePresence } from "framer-motion";
import { User , Mail , MapPin , Check , X } from "lucide-react";

// Checkout Modal Component
const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartTotal, clearCart, sessionId } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = `VC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setOrderConfirmed(false);
    setFormData({ name: '', email: '', address: '', phone: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {!orderConfirmed ? (
            <>
              <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item._id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t dark:border-gray-800">
                    <span>Total:</span>
                    <span className="text-purple-600">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Delivery Address
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
                      rows="3"
                      placeholder="123 Main St, City, State, ZIP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-linear-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg text-lg"
                  >
                    Place Order - ${cartTotal.toFixed(2)}
                  </motion.button>
                </form>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for your purchase, {formData.name}!
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                    <span className="font-mono font-semibold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                    <span className="font-semibold text-purple-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className="font-semibold text-green-500">Processing</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                A confirmation email has been sent to {formData.email}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="px-8 py-3 bg-linear-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;