# agent.md - AI Agent Onboarding Guide

> Welcome to sleepy.help! This document is your comprehensive guide to understanding and contributing to our sleep wellness platform.

## Mission Statement

**sleepy.help exists to democratize sleep science.**

We believe everyone deserves access to quality sleep guidance, regardless of their device, connectivity, or technical literacy. We're building a beautiful, accessible web application that helps people understand their circadian rhythms and optimize their sleep schedule using real science.

## Project Overview

### What We Built
sleepy.help is a Progressive Web App (PWA) that:
- Visualizes Earth's day/night cycle in real-time on an interactive globe
- Calculates optimal bedtime based on 90-minute sleep cycle science
- Provides instant feedback on sleep quality, timing, and duration
- Works offline, on any device, with zero dependencies

### Core Philosophy
1. **Accessibility First** - Works on flip phones to 4K displays, respects user preferences
2. **Privacy by Design** - All data stays on user's device, no tracking, no backend
3. **Science-Based** - Built on circadian rhythm research and sleep cycle science
4. **Beautiful Simplicity** - Zero friction, instant value, delightful UX

## Architecture Overview

### Tech Stack
```
Pure Web Technologies (No frameworks, no build step)
├── HTML5 - Semantic, accessible structure
├── CSS3 - Responsive, variable-based theming
├── Vanilla JavaScript - Globe rendering, sleep calculator
└── Web APIs - Canvas, Service Worker, Geolocation, localStorage
```

### Why No Frameworks?
- **Maximum Compatibility** - Works on browsers from 2015+
- **Minimal Footprint** - 40KB total (vs 200KB+ for React apps)
- **Instant Loading** - No bundle parsing, no hydration
- **Future-Proof** - No dependency rot, no breaking changes
- **Educational** - Code is readable by anyone learning web dev

### File Structure
```
/Users/saar/dev/sleepyhelp/web/
├── index.html          # Semantic HTML structure, ARIA labels
├── style.css           # CSS variables, responsive grid, accessibility
├── app.js              # Globe clock + sleep calculator engine
├── manifest.json       # PWA configuration
├── service-worker.js   # Offline caching strategy
├── icon.svg            # App icon (day/night globe)
├── firebase.json       # Hosting configuration
├── .firebaserc         # Firebase project reference
└── docs/
    ├── agent.md            # This file - AI agent guide
    ├── ARCHITECTURE.md     # Deep technical design docs
    ├── DESIGN.md          # UX/UI philosophy
    ├── ROADMAP.md         # Vision, phases, epics
    └── CONTRIBUTING.md    # How to contribute
```

## Key Components Deep Dive

### 1. Globe Clock (`app.js` lines 1-200)
**Location:** Canvas rendering logic in `drawGlobe()` function

**What It Does:**
- Renders Earth as a circle split into day (blue) and night (dark)
- Rotates the divide based on current time (noon = sun at top)
- Places user marker based on their timezone/location
- Animates at 60fps using `requestAnimationFrame`

**How It Works:**
```javascript
// Time to angle conversion
const timeDecimal = hours + minutes/60 + seconds/3600
const sunAngle = ((timeDecimal - 12) / 24) * Math.PI * 2

// Split circle into day/night hemispheres
// Day side: arc from -90° to 90°
// Night side: arc from 90° to -90°
// Apply rotation based on sunAngle
```

**Design Decisions:**
- Canvas over SVG for better animation performance
- Simplified 2D projection (not true 3D globe) for clarity
- Gradient at day/night boundary for visual softness

### 2. Sleep Calculator (`app.js` lines 201-350)
**Location:** `calculateBedtime()` function

**What It Does:**
- Takes desired wake time as input
- Calculates optimal bedtime for 5-6 complete sleep cycles
- Accounts for 15 minutes to fall asleep
- Provides real-time stats on sleep quality

**The Science:**
- Average sleep cycle: 90 minutes (light → deep → REM)
- Optimal cycles: 5-6 (7.5-9 hours total)
- Waking between cycles = refreshed; waking mid-cycle = groggy
- 15-min fall-asleep buffer based on sleep research averages

**Algorithm:**
```javascript
// Example: Wake at 7:00 AM, 6 cycles
// Sleep time = 6 cycles × 90 min = 540 min = 9 hours
// Buffer = 15 min
// Total = 9h 15min before 7:00 AM = 9:45 PM bedtime

const sleepMinutes = cycles * 90
const totalMinutes = sleepMinutes + 15
// Subtract from wake time → bedtime
```

### 3. PWA Infrastructure
**Files:** `manifest.json`, `service-worker.js`

**Capabilities:**
- Install to home screen (looks like native app)
- Works offline after first visit
- Fast loading via aggressive caching
- Background sync ready (for future features)

**Caching Strategy:**
- Cache-first for app shell (HTML, CSS, JS)
- Network-first for dynamic data (future API calls)
- Stale-while-revalidate for icons/images

## State Management

### Current State (localStorage)
```javascript
state = {
  userLat: null,           // User's latitude
  userLon: null,           // User's longitude
  timezone: null,          // IANA timezone (e.g., "America/New_York")
  wakeTime: '07:00',       // Desired wake time
  bedtime: null,           // Calculated bedtime
  sleepCycles: 6,          // Number of sleep cycles
  sleepHours: 9            // Total sleep hours
}
```

**Persistence:** Saved to `localStorage` on every change
**Privacy:** Never leaves user's device

## Design Patterns & Conventions

### Code Style
- **IIFE Wrapper** - All app code in self-executing function to avoid globals
- **Pure Functions** - Sleep calculator has no side effects
- **Progressive Enhancement** - Works without JavaScript (shows static content)
- **Graceful Degradation** - Falls back if APIs unavailable

### Naming Conventions
- **Functions:** camelCase, descriptive (`calculateBedtime`, `drawGlobe`)
- **Constants:** UPPER_SNAKE_CASE (`SLEEP_CYCLE_MINUTES`)
- **DOM IDs:** kebab-case (`globe-clock`, `wake-time`)
- **CSS Classes:** kebab-case with BEM-inspired structure

### Accessibility Standards
- Semantic HTML5 tags (`<main>`, `<section>`, `<header>`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader announcements via `aria-live`
- Respects `prefers-reduced-motion`
- Respects `prefers-color-scheme`
- Respects `prefers-contrast`

## Roadmap Context

### Phase 1 (COMPLETE ✅)
**Goal:** Ship minimal viable sleep helper
- Globe clock visualization
- Sleep calculator
- PWA basics
- Deployed to Firebase

### Phase 2 (NEXT - Smart Lights Integration)
**Epic:** Connect to smart home devices
**Tasks:**
1. Research Philips Hue API, LIFX API
2. Design OAuth flow for device authorization
3. Build settings panel for light selection
4. Implement gradual dimming schedule (2 hours before bedtime)
5. Add warm color temperature shift (blue → amber)
6. Store light preferences in localStorage

**Files to Create:**
- `integrations/lights.js` - Smart light API wrapper
- `integrations/hue.js` - Philips Hue specific
- `integrations/lifx.js` - LIFX specific

### Phase 3 (FUTURE - Health Integration)
**Epic:** Connect to fitness trackers
**Tasks:**
1. Google Fit API integration
2. Apple Health data (via Safari)
3. Sleep tracking import
4. Historical stats dashboard
5. Trend visualization (7-day, 30-day)

### Phase 4 (VISION - Smart Features)
**Epic:** AI-powered sleep optimization
**Tasks:**
1. Smart alarm (wake during light sleep phase)
2. Sleep quality predictions
3. Personalized recommendations
4. Integration marketplace

## How to Contribute

### Adding a Feature
1. **Read** `ARCHITECTURE.md` for technical patterns
2. **Read** `DESIGN.md` for UX principles
3. **Check** `ROADMAP.md` for planned work
4. **Write** code following existing patterns
5. **Test** on multiple devices/browsers
6. **Document** changes in relevant .md files
7. **Commit** with descriptive messages
8. **Push** to staging branch

### Code Review Criteria
- ✅ Works on old browsers (check caniuse.com)
- ✅ Accessible (test with screen reader)
- ✅ Fast (no janky animations, no blocking operations)
- ✅ Private (no data leaves device without explicit consent)
- ✅ Beautiful (matches design system)
- ✅ Documented (complex logic has comments)

### Testing Checklist
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Chrome Android
- [ ] Safari iOS
- [ ] Slow 3G network simulation
- [ ] Screen reader (VoiceOver or NVDA)
- [ ] Keyboard navigation only
- [ ] High contrast mode
- [ ] Reduced motion mode

## Common Tasks

### Add a New UI Component
1. Add HTML structure to `index.html` with semantic tags
2. Style in `style.css` using CSS variables
3. Add interactivity in `app.js` within IIFE
4. Update Service Worker cache if needed
5. Test accessibility

### Modify Sleep Algorithm
1. Update constants at top of `app.js` (e.g., `SLEEP_CYCLE_MINUTES`)
2. Modify `calculateBedtime()` function
3. Update `updateSleepStats()` if quality criteria change
4. Document science reasoning in comments
5. Test edge cases (midnight crossing, etc.)

### Add New Integration
1. Create `integrations/[name].js`
2. Export clean API: `connect()`, `disconnect()`, `control()`
3. Handle errors gracefully (offline, auth failure, etc.)
4. Store credentials securely (never in localStorage)
5. Add UI in settings panel
6. Update `ROADMAP.md` with integration status

## Debugging Guide

### Globe Not Rendering
- Check canvas context: `console.log(ctx)`
- Verify canvas size: `console.log(canvas.width, canvas.height)`
- Check `resizeCanvas()` was called
- Ensure `animate()` loop is running

### Sleep Calculations Wrong
- Log inputs: `console.log(wakeTime, sleepCycles)`
- Verify time parsing: `console.log(wakeHour, wakeMin)`
- Check midnight boundary crossings
- Validate cycle math: `sleepMinutes = cycles * 90`

### PWA Not Installing
- Verify HTTPS (required for PWA)
- Check `manifest.json` validity (use validator)
- Ensure Service Worker registered: `navigator.serviceWorker.ready`
- Check Chrome DevTools → Application → Manifest

### Offline Not Working
- Verify Service Worker active: DevTools → Application → Service Workers
- Check cache contains files: DevTools → Application → Cache Storage
- Ensure `fetch` event listener registered
- Test: DevTools → Network → Offline checkbox

## Questions to Ask

When working on sleepy.help, consider:

1. **Does this help someone sleep better?** (Core mission test)
2. **Will this work on a 2015 Android phone?** (Accessibility test)
3. **Does this respect user privacy?** (Privacy test)
4. **Is this the simplest solution?** (Complexity test)
5. **Would I show this to my grandmother?** (Clarity test)

## Resources

### Sleep Science
- [National Sleep Foundation - Sleep Cycles](https://www.sleepfoundation.org/)
- [Circadian Rhythm Research](https://pubmed.ncbi.nlm.nih.gov/)
- Why 90 minutes? REM cycle duration in healthy adults

### Web Standards
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev - PWA Guide](https://web.dev/progressive-web-apps/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Design Inspiration
- Minimalist health apps (Headspace, Calm)
- Data visualization (Observable, D3)
- Accessible interfaces (GOV.UK, A11y Project)

## Git Workflow

### Branches
- `main` - Production-ready code (not created yet)
- `staging` - Current development (active)
- `feature/*` - New features (create as needed)

### Commit Messages
Keep it human and meaningful:
- ✅ "sweet dreams" (poetic, captures the mission)
- ✅ "add smart light dimming schedule"
- ✅ "fix midnight boundary in sleep calculator"
- ❌ "fix bug" (too vague)
- ❌ "WIP" (finish the work first)

### Deployment
```bash
# Stage changes
git add .

# Commit with meaningful message
git commit -m "your message here"

# Push to staging
git push origin staging

# Deploy to Firebase
firebase deploy
```

## Support & Communication

### File Issues
Questions, bugs, ideas? Open issues in GitHub:
- Bug reports: Include browser, steps to reproduce
- Feature requests: Explain the sleep problem it solves
- Questions: We love teaching! Ask anything

### Philosophy
We're building in public. Every decision is documented. Every feature tells a story. This isn't just code—it's a mission to help the world sleep better.

---

**Welcome to the team. Let's help everyone sleep deeply.** 🌙

*Last updated: 2025-12-07*
*Maintained by: help <sleepy>*
