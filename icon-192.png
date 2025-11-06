# Random Number Generator PWA - GitHub Pages Deployment

## 📁 File Structure

Create these files in your GitHub repository:

```
your-repo-name/
├── index.html
├── manifest.json
├── service-worker.js
├── icon-192.png (optional)
├── icon-512.png (optional)
└── README.md
```

-----

## 📄 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Number Generator</title>
    <meta name="description" content="Modern random number generator PWA">
    <meta name="theme-color" content="#6366f1">
    <link rel="manifest" href="manifest.json">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' font-size='50' fill='white' text-anchor='middle' dy='.3em'%3ER%3C/text%3E%3C/svg%3E">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            min-height: 100vh;
            color: #f1f5f9;
            overflow-x: hidden;
            position: relative;
        }

        body::before {
            content: '';
            position: fixed;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
            pointer-events: none;
        }

        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 1;
        }

        header {
            text-align: center;
            margin-bottom: 3rem;
            animation: fadeInDown 0.8s ease;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            color: #94a3b8;
            font-size: 1rem;
        }

        .settings-panel {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 24px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: fadeInUp 0.8s ease 0.2s both;
        }

        .settings-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .settings-icon {
            width: 24px;
            height: 24px;
            color: #818cf8;
        }

        .settings-title {
            font-size: 1.25rem;
            font-weight: 600;
        }

        .settings-group {
            display: grid;
            gap: 1.5rem;
        }

        .setting-item {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        label {
            font-size: 0.95rem;
            color: #cbd5e1;
            font-weight: 500;
        }

        .input-group {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        input[type="number"] {
            flex: 1;
            background: rgba(15, 23, 42, 0.6);
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            padding: 0.875rem 1rem;
            color: #f1f5f9;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        input[type="number"]:focus {
            outline: none;
            border-color: #818cf8;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .numbers-display {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
            animation: fadeInUp 0.8s ease 0.4s both;
        }

        .number-box {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(99, 102, 241, 0.4);
            border-radius: 20px;
            padding: 2.5rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .number-box::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.4s;
        }

        .number-box:hover::before {
            opacity: 1;
        }

        .number-box.generating {
            animation: pulse 0.6s ease-in-out;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .number-label {
            font-size: 0.75rem;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
        }

        .number-value {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-variant-numeric: tabular-nums;
            min-height: 4rem;
            display: flex;
            align-items: center;
        }

        .number-value.empty {
            color: #475569;
            -webkit-text-fill-color: #475569;
        }

        .generate-btn {
            width: 100%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border: none;
            border-radius: 16px;
            padding: 1.25rem 2rem;
            color: white;
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
            position: relative;
            overflow: hidden;
            animation: fadeInUp 0.8s ease 0.6s both;
        }

        .generate-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .generate-btn:hover::before {
            width: 300px;
            height: 300px;
        }

        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 50px rgba(99, 102, 241, 0.5);
        }

        .generate-btn:active {
            transform: translateY(0);
        }

        .generate-btn span {
            position: relative;
            z-index: 1;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 640px) {
            .container {
                padding: 1rem;
            }

            h1 {
                font-size: 2rem;
            }

            .numbers-display {
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 1rem;
            }

            .number-box {
                padding: 2rem 1rem;
            }

            .number-value {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Random Number Generator</h1>
            <p class="subtitle">Generate random numbers with style</p>
        </header>

        <div class="settings-panel">
            <div class="settings-header">
                <svg class="settings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h2 class="settings-title">Settings</h2>
            </div>
            
            <div class="settings-group">
                <div class="setting-item">
                    <label for="count">How many numbers to generate?</label>
                    <div class="input-group">
                        <input type="number" id="count" min="1" max="10" value="3">
                    </div>
                </div>
                
                <div class="setting-item">
                    <label for="min">Minimum value</label>
                    <div class="input-group">
                        <input type="number" id="min" value="1">
                    </div>
                </div>
                
                <div class="setting-item">
                    <label for="max">Maximum value</label>
                    <div class="input-group">
                        <input type="number" id="max" value="100">
                    </div>
                </div>
            </div>
        </div>

        <div class="numbers-display" id="numbersDisplay"></div>

        <button class="generate-btn" id="generateBtn">
            <span>Generate Numbers</span>
        </button>
    </div>

    <script>
        const countInput = document.getElementById('count');
        const minInput = document.getElementById('min');
        const maxInput = document.getElementById('max');
        const numbersDisplay = document.getElementById('numbersDisplay');
        const generateBtn = document.getElementById('generateBtn');

        function createNumberBoxes(count) {
            numbersDisplay.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const box = document.createElement('div');
                box.className = 'number-box';
                box.innerHTML = `
                    <span class="number-label">Number ${i + 1}</span>
                    <div class="number-value empty">-</div>
                `;
                numbersDisplay.appendChild(box);
            }
        }

        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function animateNumber(element, targetNumber, duration = 600) {
            const start = 0;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (targetNumber - start) * easeOut);
                
                element.textContent = current;
                element.classList.remove('empty');
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }

        function generateNumbers() {
            const count = parseInt(countInput.value);
            const min = parseInt(minInput.value);
            const max = parseInt(maxInput.value);

            if (min >= max) {
                alert('Minimum value must be less than maximum value!');
                return;
            }

            const boxes = document.querySelectorAll('.number-box');
            boxes.forEach((box, index) => {
                box.classList.add('generating');
                setTimeout(() => {
                    box.classList.remove('generating');
                }, 600);

                const valueElement = box.querySelector('.number-value');
                const randomNum = generateRandomNumber(min, max);
                
                setTimeout(() => {
                    animateNumber(valueElement, randomNum);
                }, index * 100);
            });
        }

        countInput.addEventListener('change', () => {
            const count = Math.max(1, Math.min(10, parseInt(countInput.value) || 3));
            countInput.value = count;
            createNumberBoxes(count);
        });

        generateBtn.addEventListener('click', generateNumbers);

        // Initialize
        createNumberBoxes(parseInt(countInput.value));

        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker registration failed'));
            });
        }
    </script>
</body>
</html>
```

-----

## 📄 manifest.json

```json
{
  "name": "Random Number Generator",
  "short_name": "RNG",
  "description": "Modern random number generator PWA",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#6366f1",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect width='192' height='192' fill='%236366f1' rx='48'/%3E%3Ctext x='96' y='96' font-size='100' fill='white' text-anchor='middle' dy='.35em' font-family='Arial, sans-serif' font-weight='bold'%3ER%3C/text%3E%3C/svg%3E",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' fill='%236366f1' rx='128'/%3E%3Ctext x='256' y='256' font-size='280' fill='white' text-anchor='middle' dy='.35em' font-family='Arial, sans-serif' font-weight='bold'%3ER%3C/text%3E%3C/svg%3E",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
```

-----

## 📄 service-worker.js

```javascript
const CACHE_NAME = 'random-number-generator-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install event - cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

-----

## 📄 README.md

```markdown
# 🎲 Random Number Generator PWA

A modern, beautiful random number generator built as a Progressive Web App.

## ✨ Features

- 🎨 Modern 2025 design with glassmorphism
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and lightweight
- 🔢 Generate 1-10 random numbers at once
- 🎯 Customizable min/max range
- 🌟 Smooth animations
- 📦 Works offline (PWA)
- 🚀 Installable on mobile devices

## 🚀 Live Demo

Visit: `https://your-username.github.io/your-repo-name/`

## 📦 Installation

### For Users
1. Visit the live demo link
2. Click the "Install" button in your browser
3. Enjoy the app offline!

### For Developers
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Your app will be live at `https://your-username.github.io/your-repo-name/`

## 🛠️ Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
```

1. Open `index.html` in your browser or use a local server:
   
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

## 📝 Usage

1. Set how many numbers you want to generate (1-10)
1. Set the minimum and maximum values
1. Click “Generate Numbers”
1. Watch the numbers animate in!

## 🤝 Contributing

Pull requests are welcome! Feel free to contribute.

## 📄 License

MIT License - feel free to use this project however you’d like!

## 🙏 Acknowledgments

Built with ❤️ using vanilla HTML, CSS, and JavaScript.

```
---

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository
1. Go to GitHub.com and create a new repository
2. Name it something like `random-number-generator` or `rng-pwa`
3. Make it public
4. Don't initialize with README (we'll add our own)

### Step 2: Upload Files
You can either:

**Option A: Upload via GitHub Web Interface**
1. Click "uploading an existing file"
2. Create each file by clicking "Add file" → "Create new file"
3. Copy and paste the content for each file
4. Commit the changes

**Option B: Use Git Command Line**
```bash
# Clone your empty repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# Create all the files (copy content from above)
# Then commit and push
git add .
git commit -m "Initial commit: Random Number Generator PWA"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
1. Click “Pages” in the left sidebar
1. Under “Source”, select “main” branch
1. Click “Save”
1. Wait 1-2 minutes for deployment

### Step 4: Access Your Site

Your site will be live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

-----

## 🎉 That’s It!

Your Random Number Generator PWA is now live and can be:

- Accessed from any browser
- Installed on mobile devices
- Shared with anyone via the URL
- Used offline after first visit

Enjoy! 🚀
