import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";


// Filter Component
const FilterSection = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) => {
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Books'];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="font-semibold">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-linear-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;



