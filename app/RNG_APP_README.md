"# Random Number Generator PWA

A modern Progressive Web App (PWA) for generating random numbers between 1-6, featuring two modes: Normal Mode for quick generation and Game Mode for turn-based multiplayer sessions.

## Features

### 🎲 Two Modes
- **Normal Mode**: Simple, fast random number generation with a single tap
- **Game Mode**: Turn-based number generation for multiple players (minimum 2 required)

### 📱 PWA Capabilities
- **Installable**: Can be installed on mobile devices and desktop
- **Wake Lock**: Keeps screen awake while using the app on mobile platforms
- **Offline Support**: Works offline with service worker caching
- **Responsive**: Optimized for mobile and desktop screens

### ✨ User Experience
- **Smooth Animations**: Beautiful transitions and entrance animations using Framer Motion
- **Sound Effects**: Optional audio feedback on number generation
- **Vibration**: Haptic feedback support for mobile devices
- **Settings Menu**: Hidden menu (top-right) to toggle sound and vibration
- **Modern UI**: Clean, minimal design with excellent spacing and visual hierarchy

### 🎮 Game Mode Features
- Add/remove players dynamically
- Turn-based system with clear visual indicators
- Current player highlighting
- Player list with turn tracking
- Reset game option

## Tech Stack

### Frontend
- **React 19**: Latest React with modern hooks
- **React Router**: Client-side routing
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components

### APIs Used
- **Wake Lock API**: Keep screen awake
- **Vibration API**: Haptic feedback
- **Web Audio API**: Sound effects
- **Service Worker API**: PWA functionality

## Using the App

### Normal Mode
1. Click \"Start Normal Mode\" from home
2. Tap \"Generate Number\" to get a random number (1-6)
3. Number animates in with smooth transitions
4. Sound/vibration feedback (if enabled)

### Game Mode
1. Click \"Start Game Mode\" from home
2. Add player names (minimum 2 required)
3. Click \"Start Game\" to begin
4. Current player's turn is highlighted
5. Tap \"Generate Number\" for current player
6. Click \"Next Turn\" to move to next player
7. Use \"Reset Game\" to start over

### Settings
1. Look for the semi-transparent settings icon in top-right corner
2. Click to open settings panel
3. Toggle sound effects and vibration on/off
4. Settings are saved to localStorage

## Project Structure

```
/app/frontend/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── service-worker.js      # Service worker for offline support
├── src/
│   ├── components/
│   │   ├── NumberDisplay.jsx  # Animated number display
│   │   ├── SettingsMenu.jsx   # Settings panel
│   │   └── ui/                # shadcn UI components
│   ├── pages/
│   │   ├── Home.jsx           # Mode selection page
│   │   ├── NormalMode.jsx     # Single player mode
│   │   └── GameMode.jsx       # Multiplayer mode
│   ├── utils/
│   │   ├── wakeLock.js        # Wake Lock API utilities
│   │   └── soundEffects.js    # Sound and vibration utilities
│   ├── App.js                 # Main app with routing
│   └── index.css              # Global styles
```

## Browser Support

- **Wake Lock API**: Chrome 84+, Edge 84+, Safari 16.4+
- **Vibration API**: Chrome, Firefox, Edge (mobile browsers)
- **Service Workers**: All modern browsers
- **Framer Motion**: All modern browsers with JavaScript enabled

## Notes

- Wake Lock is automatically requested when entering Normal or Game mode
- Wake Lock is automatically released when leaving the page
- Settings are persisted in localStorage
- The app uses the Web Audio API for sound generation (no external audio files needed)
- Design follows modern/minimal aesthetic with excellent spacing and animations
- No dice-like visuals - clean number display instead
- Ready for deployment via GitHub Actions
"
