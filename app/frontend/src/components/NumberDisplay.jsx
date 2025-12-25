import React from 'react';
import { motion } from 'framer-motion';

const NumberDisplay = ({ numbers, isGenerating }) => {
  const displayNumbers = numbers || ['?', '?'];
  
  return (
    <div className=\"flex items-center justify-center gap-6\">
      {displayNumbers.map((number, index) => (
        <motion.div
          key={`${number}-${index}`}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: isGenerating ? [1, 1.2, 1] : 1, 
            rotate: 0, 
            opacity: 1 
          }}
          transition={{ 
            duration: 0.5, 
            ease: \"easeOut\",
            delay: index * 0.1,
            scale: {
              repeat: isGenerating ? Infinity : 0,
              duration: 0.8
            }
          }}
          className=\"w-40 h-40 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-2xl flex items-center justify-center border-4 border-slate-300 dark:border-slate-700\"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=\"text-7xl font-bold text-slate-900 dark:text-slate-100\"
          >
            {number}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default NumberDisplay;
