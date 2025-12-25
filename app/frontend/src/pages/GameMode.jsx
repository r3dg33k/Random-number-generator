import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Plus, Trash2, Play, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberDisplay from '../components/NumberDisplay';
import SettingsMenu, { getSettings } from '../components/SettingsMenu';
import { playSound, triggerVibration } from '../utils/soundEffects';
import { requestWakeLock, releaseWakeLock, reacquireWakeLock } from '../utils/wakeLock';

const GameMode = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    requestWakeLock();
    document.addEventListener('visibilitychange', reacquireWakeLock);
    
    return () => {
      releaseWakeLock();
      document.removeEventListener('visibilitychange', reacquireWakeLock);
    };
  }, []);

  const addPlayer = () => {
    if (newPlayerName.trim() && !gameStarted) {
      setPlayers([...players, { name: newPlayerName.trim(), id: Date.now() }]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (id) => {
    if (!gameStarted) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
      setCurrentTurn(0);
      setCurrentNumber(null);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentTurn(0);
    setCurrentNumber(null);
    setPlayers([]);
  };

  const generateNumber = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    const settings = getSettings();
    
    playSound(settings.soundEnabled);
    triggerVibration(settings.vibrationEnabled);
    
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 6) + 1);
      counter++;
      
      if (counter >= 10) {
        clearInterval(interval);
        const finalNumber = Math.floor(Math.random() * 6) + 1;
        setCurrentNumber(finalNumber);
        setIsGenerating(false);
      }
    }, 100);
  };

  const nextTurn = () => {
    setCurrentTurn((currentTurn + 1) % players.length);
    setCurrentNumber(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      <SettingsMenu />
      
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8 max-w-4xl mx-auto w-full">
        {!gameStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
                Game Mode
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Add at least 2 players to start
              </p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={addPlayer} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <AnimatePresence>
                    {players.map((player, index) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">#{index + 1}</Badge>
                          <span className="font-medium">{player.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePlayer(player.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {players.length === 0 && (
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-8">
                    No players added yet
                  </p>
                )}

                {players.length > 0 && players.length < 2 && (
                  <p className="text-center text-sm text-amber-600 dark:text-amber-400">
                    Add at least one more player
                  </p>
                )}

                {players.length >= 2 && (
                  <Button
                    onClick={startGame}
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Play className="w-4 h-4" />
                    Start Game
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Current Turn
              </h2>
              <motion.div
                key={currentTurn}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-block"
              >
                <Badge className="px-6 py-2 text-2xl font-bold">
                  {players[currentTurn].name}
                </Badge>
              </motion.div>
            </div>

            <NumberDisplay number={currentNumber} isGenerating={isGenerating} />

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                onClick={generateNumber}
                disabled={isGenerating}
                className="px-8 py-6 text-lg gap-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : 'Generate Number'}
              </Button>
              
              {currentNumber && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={nextTurn}
                    className="px-8 py-6 text-lg rounded-2xl"
                  >
                    Next Turn
                  </Button>
                </motion.div>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={resetGame}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Game
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Players</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className={`p-3 rounded-lg text-center ${
                        index === currentTurn
                          ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      <div className="font-medium">{player.name}</div>
                      <div className="text-xs text-slate-500">Player {index + 1}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameMode;
