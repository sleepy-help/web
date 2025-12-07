# sleepy.help

> find your rhythm, sleep deeply

A beautiful, accessible Progressive Web App (PWA) that helps you optimize your sleep schedule using circadian science.

## Features

- **Globe Clock**: Visualizes day/night cycles on Earth in real-time
- **Smart Bedtime Calculator**: Calculates optimal bedtime based on sleep cycles (90-min intervals)
- **Location Aware**: Shows your position in Earth's rotation
- **Sleep Stats**: Track sleep quality, timing, and duration
- **PWA Support**: Install to home screen, works offline
- **Fully Accessible**: Works on any device, respects user preferences

## Quick Start

```bash
# Serve locally (choose one):

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server)
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Tech Stack

- **Pure HTML/CSS/JS** - No frameworks, maximum compatibility
- **Canvas API** - For globe visualization
- **Service Worker** - Offline support
- **LocalStorage** - Persistent preferences
- **Geolocation API** - Optional location detection

## How It Works

### Sleep Science
- Uses 90-minute sleep cycles (average REM cycle duration)
- Recommends 5-6 cycles (7.5-9 hours) for optimal rest
- Accounts for 15 minutes to fall asleep
- Visual feedback on sleep quality metrics

### Architecture
```
index.html          # Semantic HTML structure
├── style.css       # Accessible, responsive design
├── app.js          # Globe rendering + sleep calculator
├── manifest.json   # PWA configuration
└── service-worker.js   # Offline caching
```

## Roadmap

### Phase 1 (MVP) ✅
- Globe clock visualization
- Sleep calculator
- PWA basics

### Phase 2 (Next)
- Smart light integration (Hue, LIFX)
- Enhanced offline support
- Improved location services

### Phase 3
- Google Fit integration
- Sleep tracking dashboard
- Historical stats & trends

### Phase 4
- Smart alarm (wake during light sleep)
- Integration marketplace
- Premium features

## Privacy

All data stays on your device. No tracking, no analytics, no backend.

## License

MIT

---

Made with care for your sleep 🌙
