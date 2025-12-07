# sleepy.help

> find your rhythm, sleep deeply

A beautiful, accessible Progressive Web App (PWA) that helps you optimize your sleep schedule using circadian science.

**🌐 Live:** https://sleepyhelp-b7b4b.web.app

## Documentation

**New here? Start with these:**

- **[agent.md](./agent.md)** - Complete onboarding guide (AI agents & humans welcome!)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep technical design & decisions
- **[DESIGN.md](./DESIGN.md)** - Design philosophy & UX principles
- **[ROADMAP.md](./ROADMAP.md)** - Vision, phases, and future plans
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute to the project

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

**Privacy Principles:**
- ✅ No user accounts or authentication
- ✅ No data sent to servers
- ✅ No cookies or tracking pixels
- ✅ No third-party analytics
- ✅ Everything stored locally (localStorage)

## Contributing

We welcome contributions! Whether you're:
- 💻 A developer wanting to add features
- 🎨 A designer improving the UI/UX
- 📝 A technical writer enhancing docs
- 🧪 A tester finding bugs
- 🔬 A sleep researcher validating our science

**See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.**

### Quick Contribution Guide

1. Fork the repo
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit (`git commit -m "add amazing feature"`)
6. Push (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Community

**Questions? Ideas? Found a bug?**
- 🐛 [Report bugs](https://github.com/sleepy-help/web/issues)
- 💡 [Suggest features](https://github.com/sleepy-help/web/issues)
- 💬 [Ask questions](https://github.com/sleepy-help/web/discussions)

## Project Status

**Current Phase:** Phase 1 Complete ✅
**Next Up:** Smart Home Integration (Philips Hue, LIFX)
**See:** [ROADMAP.md](./ROADMAP.md) for detailed plans

## License

MIT - See LICENSE file for details

---

**Made with care for your sleep** 🌙

*Project maintained by help <sleepy>*
*Contributors welcome - see [CONTRIBUTING.md](./CONTRIBUTING.md)*
