import { motion } from "framer-motion";
import { Package , User , MapPin , TrendingUp } from "lucide-react";

// Stats Component
export default function StatsSection  ()  {
  const stats = [
    { label: 'Products', value: '10K+', icon: Package },
    { label: 'Happy Customers', value: '50K+', icon: User },
    { label: 'Countries', value: '25+', icon: MapPin },
    { label: 'Daily Orders', value: '1K+', icon: TrendingUp }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 text-center"
        >
          <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold text-purple-600 mb-1">{stat.value}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};