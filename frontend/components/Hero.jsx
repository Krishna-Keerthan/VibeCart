import { motion } from "framer-motion";
import { TrendingUp , Package , Clock } from "lucide-react";
// Hero Section
export default function HeroSection () {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 text-white overflow-hidden relative"
    >
      <div className="relative z-10">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Welcome to VibeCart
        </motion.h1>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl mb-6 text-purple-100"
        >
          Discover amazing products at unbeatable prices
        </motion.p>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <TrendingUp className="w-5 h-5" />
            <span>Trending Products</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Package className="w-5 h-5" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Clock className="w-5 h-5" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    </motion.div>
  );
};