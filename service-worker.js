
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
