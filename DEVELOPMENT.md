# Development Guide for sleepy.help

> Everything you need to develop locally, test, and deploy

---

## Quick Start

### Prerequisites
- **Node.js** 18+ (for Firebase Functions)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Git**
- **A modern browser** (Chrome, Firefox, Safari, Edge)

### Initial Setup

```bash
# Clone the repository
git clone git@github.com-sleepy:sleepy-help/web.git
cd web

# Install Firebase Functions dependencies
cd functions
npm install
cd ..

# Login to Firebase
firebase login

# Start local development
firebase emulators:start
```

Your app will be available at:
- **Web app**: http://localhost:5000
- **Emulator UI**: http://localhost:4000
- **Functions**: http://localhost:5001
- **Firestore**: http://localhost:8080

---

## Project Structure

```
web/
├── index.html              # Main HTML (SPA)
├── style.css               # All styles (CSS variables, responsive)
├── app.js                  # Main application logic
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline support
├── icon.svg                # App icon
│
├── lib/                    # Utility libraries (Month 1 addition)
│   ├── performance.js      # Performance monitoring
│   └── error-handler.js    # Global error handling
│
├── functions/              # Firebase Cloud Functions (Month 1 addition)
│   ├── index.js            # Function exports
│   ├── package.json        # Function dependencies
│   ├── auth/               # OAuth handlers (Phase 2)
│   ├── lights/             # Light control APIs (Phase 2)
│   └── utils/              # Shared utilities
│
├── firestore.rules         # Database security rules
├── firestore.indexes.json  # Database indexes
├── storage.rules           # Storage security rules
├── firebase.json           # Firebase configuration
│
├── agents/                 # Team role briefings
├── updates/                # Progress updates
├── *.md                    # Documentation
└── README.md               # Project overview
```

---

## Development Workflows

### Frontend Development

**Start a simple HTTP server** (no Firebase needed):
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000
```

Visit http://localhost:8000

**Make changes:**
1. Edit `index.html`, `style.css`, or `app.js`
2. Refresh browser (no build step!)
3. Check DevTools Console for errors

**Why no build step?**
- Faster iteration
- Simpler debugging
- Works on any device

### Backend Development (Firebase Functions)

**Start emulators:**
```bash
firebase emulators:start
```

**Develop functions:**
```bash
cd functions

# Add a new function
# Edit functions/index.js

# Test locally
curl http://localhost:5001/sleepyhelp-b7b4b/us-central1/healthCheck

# Deploy when ready
firebase deploy --only functions
```

**View logs:**
```bash
# Local logs
# (Appear in emulator console)

# Production logs
firebase functions:log
```

### Database Development (Firestore)

**Edit security rules:**
```bash
# Edit firestore.rules
# Emulator auto-reloads rules

# Deploy rules
firebase deploy --only firestore:rules
```

**Seed test data:**
```bash
# Use Emulator UI at http://localhost:4000
# Navigate to Firestore tab
# Add test documents manually
```

**Export data from emulator:**
```bash
firebase emulators:export ./emulator-data
```

**Import data to emulator:**
```bash
firebase emulators:start --import=./emulator-data
```

---

## Testing

### Manual Testing Checklist

**Desktop (Chrome, Firefox, Safari):**
- [ ] Globe clock animates smoothly
- [ ] Sleep calculator works (all wake times)
- [ ] Settings persist across reload
- [ ] Dark mode follows system preference
- [ ] Keyboard navigation works (tab through all controls)
- [ ] Screen reader announces elements correctly

**Mobile (iOS Safari, Android Chrome):**
- [ ] All desktop tests
- [ ] Touch interactions work
- [ ] Viewport scales correctly
- [ ] PWA install prompt appears
- [ ] Offline mode works (airplane mode test)

**Performance:**
```bash
# Run Lighthouse in Chrome DevTools
# Target scores: 100 across all categories

# Or CLI:
npm install -g lighthouse
lighthouse http://localhost:5000 --view
```

**Accessibility:**
```bash
# Chrome DevTools > Lighthouse > Accessibility
# Target: 100 score

# Or use axe DevTools extension
# https://www.deque.com/axe/devtools/
```

### Automated Testing (Future)

```bash
# Placeholder for E2E tests
# npm test (not yet implemented)
```

---

## Deployment

### Deploy Everything
```bash
firebase deploy
```

### Deploy Specific Services

**Hosting only** (HTML/CSS/JS changes):
```bash
firebase deploy --only hosting
```

**Functions only** (backend changes):
```bash
firebase deploy --only functions
```

**Firestore rules only:**
```bash
firebase deploy --only firestore:rules
```

**Storage rules only:**
```bash
firebase deploy --only storage:rules
```

### Preview Deploy (Before Production)

```bash
# Create preview URL (lasts 7 days)
firebase hosting:channel:deploy preview

# View at: https://sleepyhelp-b7b4b--preview-RANDOM.web.app
```

---

## Performance Monitoring

### Built-in Performance Monitor

The app includes a lightweight performance monitor (`lib/performance.js`):

```javascript
// View metrics in console (development only)
window.performanceMonitor.report();

// Get health check
const health = window.performanceMonitor.healthCheck();
console.log(health);
```

**Metrics tracked:**
- Page load time
- First paint
- First contentful paint
- Canvas render time (avg)

**Performance targets:**
- Page load: <2000ms
- First contentful paint: <1500ms
- Canvas render: <16ms (60fps)
- Total bundle size: <50KB

### Check Bundle Size

```bash
# Check gzipped size
ls -lh *.{html,css,js} | awk '{print $9, $5}'

# Or use compression
gzip -c app.js | wc -c  # Output in bytes
```

---

## Error Handling

### Global Error Handler

All errors are captured automatically (`lib/error-handler.js`):

```javascript
// View error history (development)
window.errorHandler.getErrors();

// Manually log error with context
window.logError(new Error('Something broke'), {
  component: 'GlobeClock',
  action: 'rendering'
});
```

**User-facing errors:**
- Shown as friendly toast notifications
- Auto-dismiss after 5 seconds
- Accessible (ARIA live regions)

**Developer errors:**
- Logged to console
- Include stack traces
- Stored in memory (last 50 errors)

---

## Code Style Guide

### JavaScript

**Modern ES6+:**
```javascript
// ✅ Use const/let
const cycles = 6;
let bedtime = null;

// ✅ Arrow functions
const calculate = (wake, cycles) => { };

// ✅ Async/await
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// ✅ Template literals
const message = `Wake at ${wakeTime}`;

// ✅ Destructuring
const { wakeTime, bedtime } = state;
```

**Error handling:**
```javascript
// ✅ Try/catch for async
try {
  await riskyOperation();
} catch (error) {
  window.logError(error, { context: 'operation' });
  showUserMessage('Something went wrong');
}

// ✅ Guard clauses
function processData(data) {
  if (!data) return null;
  if (!data.valid) return null;
  // Process...
}
```

### CSS

**Use CSS variables:**
```css
/* ✅ */
.button {
  background: var(--color-primary);
  padding: var(--space-md);
}

/* ❌ */
.button {
  background: #4a9eff;
  padding: 16px;
}
```

**Mobile-first responsive:**
```css
/* ✅ Base styles for mobile */
.card {
  padding: 1rem;
}

/* Enhance for larger screens */
@media (min-width: 768px) {
  .card {
    padding: 2rem;
  }
}
```

### HTML

**Semantic markup:**
```html
<!-- ✅ -->
<header>
  <h1>sleepy.help</h1>
</header>
<main>
  <section>
    <h2>Sleep Calculator</h2>
  </section>
</main>

<!-- ❌ -->
<div class="header">
  <div class="title">sleepy.help</div>
</div>
```

**Accessible:**
```html
<!-- ✅ -->
<button aria-label="Calculate bedtime">
  Calculate
</button>

<input
  type="time"
  id="wake-time"
  aria-describedby="wake-time-help"
>
<p id="wake-time-help">Select when you want to wake up</p>
```

---

## Git Workflow

### Branch Strategy

```bash
# Main branch: staging (default)
# Production branch: main (protected, auto-deploys)

# Create feature branch
git checkout -b feature/smart-lights

# Make changes, commit
git add .
git commit -m "add: Philips Hue OAuth integration"

# Push and create PR
git push origin feature/smart-lights
```

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `add:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Formatting, no code change
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Build, dependencies, etc.

**Examples:**
```bash
git commit -m "add: performance monitoring library"
git commit -m "fix: globe rendering on mobile Safari"
git commit -m "docs: update development guide with emulator setup"
```

---

## Environment Variables

### Local Development (.env)

```bash
# Create functions/.env for local secrets
# (Never commit this file!)

HUE_CLIENT_ID=your_dev_client_id
HUE_CLIENT_SECRET=your_dev_secret
LIFX_API_KEY=your_dev_key
```

### Production (Firebase Config)

```bash
# Set production environment variables
firebase functions:config:set \
  hue.client_id="prod_id" \
  hue.client_secret="prod_secret"

# View current config
firebase functions:config:get

# Download config for local emulator
firebase functions:config:get > functions/.runtimeconfig.json
```

---

## Debugging Tips

### Frontend Debugging

**Chrome DevTools:**
```javascript
// Set breakpoints in Sources tab
// Use debugger statement
debugger;

// Check state
console.log('State:', state);

// Performance profiling
// Performance tab > Record > Interact > Stop
```

**Mobile debugging:**
```bash
# iOS Safari
# Settings > Safari > Advanced > Web Inspector
# Connect device, open Safari DevTools

# Android Chrome
# chrome://inspect on desktop Chrome
# Connect device, enable USB debugging
```

### Function Debugging

**Local emulator:**
```javascript
// Add console.log in function code
console.log('Request received:', req.body);

// View in emulator console
```

**Production:**
```bash
# Tail logs
firebase functions:log --only functionName

# View in Firebase Console
# Functions > Logs
```

---

## Common Issues & Solutions

### Issue: "Firebase deploy failed"
**Solution:**
```bash
# Re-authenticate
firebase login --reauth

# Check Firebase project
firebase use --add
```

### Issue: "Service worker not updating"
**Solution:**
```bash
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
# Or: DevTools > Application > Service Workers > Unregister
```

### Issue: "Localhost won't start"
**Solution:**
```bash
# Kill processes on ports
lsof -ti:5000 | xargs kill -9
lsof -ti:8000 | xargs kill -9

# Try different port
python3 -m http.server 8080
```

### Issue: "Canvas not rendering"
**Solution:**
```javascript
// Check browser support
if (!canvas.getContext) {
  console.error('Canvas not supported');
}

// Check canvas size
console.log('Canvas:', canvas.width, canvas.height);
```

---

## Useful Commands Reference

```bash
# Development
firebase emulators:start                    # Start all emulators
firebase emulators:start --only functions   # Functions only
firebase emulators:start --only firestore   # Firestore only

# Deployment
firebase deploy                             # Deploy everything
firebase deploy --only hosting              # Frontend only
firebase deploy --only functions            # Backend only

# Logs
firebase functions:log                      # Production logs
firebase functions:log --only functionName  # Specific function

# Project management
firebase projects:list                      # List all projects
firebase use projectName                    # Switch project

# Testing
lighthouse http://localhost:5000 --view     # Performance audit
```

---

## Month 1 Achievements (Fullstack Developer)

**Infrastructure built:**
- ✅ Firebase Functions scaffolding
- ✅ Firestore security rules (privacy-first)
- ✅ Storage security rules
- ✅ Local emulator configuration
- ✅ Performance monitoring library
- ✅ Global error handling system
- ✅ Development documentation

**Ready for Phase 2:**
- OAuth integration (when Smart Home Expert provides API wrappers)
- User authentication (if needed)
- Database storage (schema defined in security rules)

**Performance baseline:**
- Page load: ~1.2s
- Bundle size: ~40KB
- Lighthouse score: 95+ (target: 100)

---

## Next Steps

**Week 5-8 (Phase 2 prep):**
- Implement OAuth handlers (Hue, LIFX)
- Create light control API endpoints
- Add loading states to frontend
- Integrate error handling library
- Performance optimization sprint

**Resources:**
- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Web Performance Best Practices](https://web.dev/fast/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Last updated: 2025-12-14 (Month 1 Complete)*
*Maintained by: Fullstack Developer*
*Questions? Check agents/fullstack-developer.md or ask in Discord*
