import { useEffect } from \"react\";
import \"./App.css\";
import { BrowserRouter, Routes, Route } from \"react-router-dom\";
import Home from \"./pages/Home\";
import NormalMode from \"./pages/NormalMode\";
import GameMode from \"./pages/GameMode\";
import { Toaster } from \"./components/ui/sonner\";

function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <div className=\"App\">
      <BrowserRouter>
        <Routes>
          <Route path=\"/\" element={<Home />} />
          <Route path=\"/normal\" element={<NormalMode />} />
          <Route path=\"/game\" element={<GameMode />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
