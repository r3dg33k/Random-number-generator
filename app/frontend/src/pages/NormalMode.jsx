import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import NumberDisplay from '../components/NumberDisplay';
import SettingsMenu, { getSettings } from '../components/SettingsMenu';
import { playSound, triggerVibration } from '../utils/soundEffects';
import { requestWakeLock, releaseWakeLock, reacquireWakeLock } from '../utils/wakeLock';

const NormalMode = () => {
  const navigate = useNavigate();
  const [currentNumbers, setCurrentNumbers] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    requestWakeLock();
    
    document.addEventListener('visibilitychange', reacquireWakeLock);
    
    return () => {
      releaseWakeLock();
      document.removeEventListener('visibilitychange', reacquireWakeLock);
    };
  }, []);

  const generateNumbers = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    const settings = getSettings();
    
    playSound(settings.soundEnabled);
    triggerVibration(settings.vibrationEnabled);
    
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentNumbers([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
      counter++;
      
      if (counter >= 10) {
        clearInterval(interval);
        const finalNumbers = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ];
        setCurrentNumbers(finalNumbers);
        setIsGenerating(false);
      }
    }, 100);
  };

  return (
    <div className=\"min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col\">
      <SettingsMenu />
      
      <div className=\"p-4\">
        <Button
          variant=\"ghost\"
          onClick={() => navigate('/')}
          className=\"gap-2\"
        >
          <ArrowLeft className=\"w-4 h-4\" />
          Back
        </Button>
      </div>

      <div className=\"flex-1 flex flex-col items-center justify-center p-4 space-y-12\">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className=\"text-center space-y-2\"
        >
          <h1 className=\"text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100\">
            Normal Mode
          </h1>
          <p className=\"text-slate-600 dark:text-slate-400\">
            Tap the button to generate random numbers
          </p>
        </motion.div>

        <NumberDisplay numbers={currentNumbers} isGenerating={isGenerating} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size=\"lg\"
            onClick={generateNumbers}
            disabled={isGenerating}
            className=\"px-12 py-6 text-lg gap-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300\"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Numbers'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NormalMode;
