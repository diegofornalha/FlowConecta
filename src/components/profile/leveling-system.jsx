import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LevelCard = ({ level, currentPoints }) => {
  const [svgData, setSvgData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams({ head: level.head });
    fetch(`/api/profilepic?${queryParams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        setSvgData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching SVG:', error);
        setIsLoading(false);
      });
  }, [level.head]);

  // Calculate progress for the current level
  const progress = Math.min((currentPoints / level.requiredPoints) * 100, 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-black text-black shadow-md p-4 mb-4 flex flex-row md:flex-col items-center"
    >
      <motion.div
        className="w-1/2 md:w-full text-center mx-auto mb-0 md:mb-4 mr-4 md:mr-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isLoading ? (
          <div className="w-24 h-24 text-center mx-auto bg-black-200 rounded-full animate-pulse"></div>
        ) : (
          <div
            className="w-24 h-24 text-center mx-auto"
            dangerouslySetInnerHTML={{ __html: svgData }}
          />
        )}
      </motion.div>
      <div className="w-1/2 md:w-full text-left md:text-center">
        <motion.h2
          className="text-xl font-bold mb-1"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Level {level.level}
        </motion.h2>
        <p className="text-sm text-black-600 mb-2">{level.description}</p>
        <div className="relative pt-1">
          <motion.div
            className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-black-200"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
        <p className="text-sm text-black-600">
          {currentPoints} / {level.requiredPoints} points
        </p>
      </div>
    </motion.div>
  );
};

const LevelingSystem = ({ levels }) => {
  const [currentPoints, setCurrentPoints] = useState(50);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-black"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Leveling System
      </motion.h1>
      <div className="text-black mx-auto max-w-full md:max-w-md grid grid-cols-2 md:grid-cols-1 gap-4">
        <AnimatePresence>
          {levels.map((level) => (
            <LevelCard key={level.level} level={level} currentPoints={currentPoints} levels={levels} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LevelingSystem;
