import { ShoppingCart } from "lucide-react";
// Footer Component
export default function Footer  ()  {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-16 py-8 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold gradient-text">VibeCart</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your one-stop shop for amazing products at great prices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-purple-600">All Products</a></li>
              <li><a href="#" className="hover:text-purple-600">Electronics</a></li>
              <li><a href="#" className="hover:text-purple-600">Fashion</a></li>
              <li><a href="#" className="hover:text-purple-600">Home & Living</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-purple-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-purple-600">Shipping Info</a></li>
              <li><a href="#" className="hover:text-purple-600">Returns</a></li>
              <li><a href="#" className="hover:text-purple-600">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-600">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 VibeCart. All rights reserved. Made with ❤️ for amazing shoppers.</p>
        </div>
      </div>
    </footer>
  );
};
