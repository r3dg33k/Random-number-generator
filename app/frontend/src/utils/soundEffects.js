export const playSound = (enabled) => {
  if (!enabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (err) {
    console.log('Audio not supported:', err);
  }
};

export const triggerVibration = (enabled) => {
  if (!enabled) return;
  
  try {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  } catch (err) {
    console.log('Vibration not supported:', err);
  }
};
