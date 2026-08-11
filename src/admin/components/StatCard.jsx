import { motion } from "framer-motion";

function StatCard({ title, value, style }) {
  const textColorClass = value === "0" || value === 0 
    ? "text-gray-500" 
    : "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl border hover:-translate-y-1 transition-all duration-300 shadow-lg relative overflow-hidden group"
      style={style}
    >
      <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
      
      <p className="text-gray-400 font-medium text-sm uppercase tracking-wider">
        {title}
      </p>
      <p className={`text-5xl font-extrabold mt-2 ${textColorClass}`}>
        {value}
      </p>
    </motion.div>
  );
}

export default StatCard;