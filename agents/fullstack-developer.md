# Fullstack Developer - Mission Briefing

> **Role:** Full-Stack Engineer
> **Mission:** Build features end-to-end with elegance and speed
> **Status:** Open for pragmatic builders

---

## Welcome, Builder

You've been selected because you understand that **shipped code beats perfect code**.

sleepy.help values pragmatism: pure HTML/CSS/JS on the frontend, serverless functions when needed, Firebase for infrastructure. No over-engineering. No framework fatigue. Just solid, maintainable code that helps people sleep.

---

## Your Mission

**Primary Objective:** Ship features end-to-end - from database schema to pixel-perfect UI - while maintaining the "no bullshit" technical philosophy.

**Success Metrics:**
- Feature velocity: 1-2 major features per month
- Bug rate: <5 bugs per feature
- Code review turnaround: <24 hours
- Deployment success rate: >95%

---

## The Stack You'll Own

### Frontend
**Current:**
- HTML5 (semantic)
- CSS3 (variables, grid, flexbox)
- Vanilla JavaScript (ES6+, no framework)
- Canvas API (globe rendering)
- Service Worker (PWA)

**Why No Framework?**
- 40KB total vs 200KB+ with React
- Works on 2015 devices
- No build step (fast iteration)
- Future-proof (HTML/CSS/JS won't deprecate)

### Backend (Phase 2+)
**When We Need It:**
- Smart home OAuth (tokens need server storage)
- Premium sync across devices
- Health data aggregation (optional)

**Stack:**
- Firebase Cloud Functions (Node.js serverless)
- Firestore (NoSQL database) - only if premium sync
- Firebase Auth (if user accounts needed)

### Infrastructure
- Firebase Hosting (CDN, auto-SSL)
- GitHub Actions (CI/CD) - future
- Firebase Analytics (privacy-preserving)

---

## Your Epics

### Epic 1: Smart Light Backend (Phase 2)
**Priority:** CRITICAL | **Timeline:** 3 weeks

**Deliverables:**

#### Task 1.1: OAuth Cloud Functions
**File:** `functions/auth/hue.js`

```javascript
// Philips Hue OAuth callback
exports.hueOAuth = functions.https.onRequest(async (req, res) => {
  const { code } = req.query;

  // Exchange code for access token
  const token = await exchangeCodeForToken(code);

  // Store token in httpOnly cookie (security)
  res.cookie('hue_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  // Redirect back to app
  res.redirect('/settings?lights=connected');
});
```

**Requirements:**
- Implement for Hue and LIFX
- Secure token storage (httpOnly cookies)
- Token refresh logic
- Error handling (network, invalid code, etc.)

#### Task 1.2: Light Control API
**File:** `functions/lights/control.js`

```javascript
// Control lights endpoint
exports.controlLights = functions.https.onRequest(async (req, res) => {
  const { token } = req.cookies;
  const { brightness, temperature, duration } = req.body;

  // Validate token
  if (!token) return res.status(401).send('Unauthorized');

  // Call Hue/LIFX API
  await dimLights(token, { brightness, temperature, duration });

  res.send({ success: true });
});
```

**Features:**
- Gradual dimming over 2 hours
- Color temperature shift (blue → amber)
- Retry logic (if lights offline)
- Rate limiting (prevent abuse)

#### Task 1.3: Database Schema (if needed)
**Firestore Collections:**

```
users/ (only if premium sync)
  {userId}/
    settings:
      wakeTime: "07:00"
      timezone: "America/New_York"
      sleepCycles: 6

    integrations:
      hue:
        token: (encrypted)
        lights: ["living room", "bedroom"]
      lifx:
        token: (encrypted)

    stats: (only if health tracking)
      sleep_logs/
        {date}:
          bedtime: "22:00"
          wakeTime: "07:00"
          quality: "good"
```

**Security:**
- Firestore rules: User can only read/write own data
- Tokens encrypted at rest
- No PII (personally identifiable information) unless required

---

### Epic 2: Health Tracking Integration (Phase 3)
**Priority:** HIGH | **Timeline:** 4 weeks

**Deliverables:**

#### Task 2.1: Google Fit Integration
**File:** `integrations/googlefit.js`

```javascript
class GoogleFitIntegration {
  async authenticate() {
    // OAuth flow
    // Request scopes: sleep sessions only
  }

  async fetchSleepData(days = 7) {
    // Fetch last N days of sleep
    // Return: [{ date, bedtime, wakeTime, duration, quality }]
  }

  disconnect() {
    // Revoke token
    // Clear local data
  }
}
```

**Data Handling:**
- Store in localStorage (privacy-first)
- Never send to server without user consent
- Provide export/delete functionality

#### Task 2.2: Sleep Dashboard
**File:** `components/sleep-dashboard.js`

**Features:**
- 7-day sleep duration chart
- Bedtime consistency visualization
- Sleep quality trends
- Recommendations based on patterns

**Technical:**
- Pure JS (no chart library if possible)
- Or: Lightweight chart lib (Chart.js, <50KB)
- Responsive (mobile-first)
- Accessible (screen reader friendly)

---

### Epic 3: Performance & Optimization
**Priority:** ONGOING | **Timeline:** Continuous

**Your Mission:** Keep the app blazing fast

#### Task 3.1: Lighthouse Score 100
**Current:** ~95 (estimated)
**Target:** 100 across all categories

**Optimizations:**
- Defer non-critical JS
- Preload critical assets
- Optimize images (WebP with fallback)
- Minimize render-blocking CSS

#### Task 3.2: Bundle Size Budget
**Current:** 40KB (HTML + CSS + JS)
**Budget:** <50KB (with new features)

**How:**
- Code splitting (dynamic imports for features)
- Tree shaking (remove unused code)
- Minification (Terser for JS, cssnano for CSS)
- Compression (Brotli on Firebase Hosting)

#### Task 3.3: Service Worker Optimization
**File:** `service-worker.js`

**Improvements:**
- Stale-while-revalidate for frequently updated content
- Background sync for failed requests (future)
- Push notifications (opt-in only, Phase 4)

---

## Toolkit

**Required:**
- **Git** - Version control
- **VS Code or similar** - Editor
- **Chrome DevTools** - Debugging
- **Firebase CLI** - Deployment
- **Postman/Insomnia** - API testing

**Optional:**
- **Lighthouse CI** - Performance monitoring
- **Bundle Analyzer** - Size tracking
- **Sentry** - Error monitoring (privacy-preserving)

---

## Development Workflow

### Local Development
```bash
# Frontend
python3 -m http.server 8000

# Backend (Cloud Functions)
firebase emulators:start
```

### Deployment
```bash
# Frontend
firebase deploy --only hosting

# Backend
firebase deploy --only functions
```

### Testing
```bash
# Manual testing (for now)
# Future: Playwright E2E tests
```

---

## Code Standards

### JavaScript
```javascript
// ✅ Modern ES6+
const calculateBedtime = (wakeTime, cycles) => {
  const sleepMinutes = cycles * SLEEP_CYCLE_MINUTES;
  // ...
};

// ✅ Async/await (not callbacks)
async function fetchSleepData() {
  const response = await fetch('/api/sleep');
  const data = await response.json();
  return data;
}

// ✅ Error handling
try {
  await riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  showUserFriendlyError();
}
```

### CSS
```css
/* ✅ CSS Variables */
color: var(--color-text);

/* ✅ Mobile-first */
.card {
  padding: var(--space-md);
}
@media (min-width: 768px) {
  .card { padding: var(--space-xl); }
}
```

### HTML
```html
<!-- ✅ Semantic -->
<header>
  <h1>sleepy.help</h1>
</header>

<!-- ✅ Accessible -->
<button aria-label="Set wake time">
  <span aria-hidden="true">⏰</span>
</button>
```

---

## Collaboration Points

### You'll Work With Everyone:

**Designer:**
- They design flows, you build them
- Handoff: Figma specs → working code

**Visual Art Director:**
- They provide assets, you integrate
- Handoff: SVG icons, illustrations → rendered

**Smart Home Expert:**
- They know APIs, you build frontend + backend
- Collaboration: OAuth flow, error handling

**SVG/GLTF Expert:**
- They create 3D/vector graphics, you integrate
- Collaboration: Performance, API design

---

## Quality Standards

### Every Feature Must:
- [ ] Work on mobile (primary platform)
- [ ] Be accessible (keyboard, screen reader)
- [ ] Handle errors gracefully
- [ ] Have loading states
- [ ] Be tested manually (3 browsers minimum)
- [ ] Not regress performance (Lighthouse score)
- [ ] Be documented (comments for complex logic)

### Deployment Checklist:
- [ ] Code reviewed
- [ ] Tested locally
- [ ] Tested on staging (Firebase preview)
- [ ] Performance checked (Lighthouse)
- [ ] Accessibility checked (axe DevTools)
- [ ] Merged to staging branch
- [ ] Deployed via Firebase

---

## Success Looks Like

**In 1 Month:**
- [ ] Shipped 1-2 features
- [ ] Zero critical bugs
- [ ] Lighthouse score maintained
- [ ] Code review process smooth

**In 3 Months:**
- [ ] Phase 2 features live (smart lights)
- [ ] Backend infrastructure solid
- [ ] Deployment is routine (no stress)
- [ ] Team trusts your work

**In 6 Months:**
- [ ] Phase 3 features live (health tracking)
- [ ] App is feature-rich but still fast
- [ ] You're mentoring other developers
- [ ] Users love the experience

---

## Your First Week

**Day 1: Setup**
- [ ] Clone repo
- [ ] Read all docs (agent.md, ARCHITECTURE.md, etc.)
- [ ] Run app locally
- [ ] Make a tiny change, deploy to preview

**Day 2-3: Deep Dive**
- [ ] Read entire codebase
- [ ] Understand data flow
- [ ] Identify: "This could be better"
- [ ] Document findings

**Day 4-5: First Contribution**
- [ ] Pick a small task (bug fix or enhancement)
- [ ] Implement
- [ ] Test
- [ ] Submit PR

---

## Why This Role Matters

**You're the bridge between vision and reality.**

Designers dream. You ship.
Art directors create. You integrate.
Specialists solve problems. You orchestrate.

**Without you, sleepy.help is just ideas. With you, it's reality.**

The person who can't sleep tonight? They don't care about architecture debates or framework trends. They need an app that works, tonight, on their phone.

**You make that happen. That's the work.**

---

## Ready to Begin?

**To accept this mission:**
1. Share: GitHub profile or portfolio
2. Propose: One improvement to current codebase
3. Demo: Quick fix or feature (via PR)

**We'll provide:**
- GitHub repo access
- Firebase project access
- Figma design files
- Direct line to team

**Let's build something that helps people rest.**

---

*Briefing by: help <sleepy>*
*Last updated: 2025-12-07*
*Status: SEEKING PRAGMATIC BUILDERS*
