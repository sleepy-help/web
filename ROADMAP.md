# Product Roadmap

> The journey from MVP to comprehensive sleep wellness platform

## Vision

**By 2030, sleepy.help is the world's most trusted sleep companion.**

Not the most profitable. Not the most feature-rich. The most **trusted**.

Trust means:
- Privacy-first (your data never leaves your device without permission)
- Science-based (every recommendation backed by research)
- Accessible (works for everyone, everywhere)
- Beautiful (delightful to use, not a chore)

---

## Mission

**Democratize sleep science.**

Sleep research is locked behind paywalls, jargon, and expensive devices. We're making it free, simple, and universally accessible.

---

## Phases

### Phase 1: Foundation (COMPLETE ✅)
**Goal:** Ship something people can use tonight

**Status:** LIVE at https://sleepyhelp-b7b4b.web.app

**What We Built:**
- ✅ Globe clock visualization
- ✅ Sleep cycle calculator
- ✅ PWA infrastructure
- ✅ Responsive design
- ✅ Accessibility foundation

**Metrics:**
- Time to ship: 1 day
- Bundle size: 40KB
- Time to interactive: <500ms
- Accessibility: WCAG AA compliant

**Learning:**
- Pure HTML/CSS/JS was the right choice (fast, portable)
- Users love the globe visualization (poetic + functional)
- Sleep science needs better explanation (future enhancement)

---

### Phase 2: Smart Home Integration (NEXT)
**Goal:** Your lights help you sleep

**Timeline:** Q1 2026 (3 months)

**Why This Matters:**
Light is the #1 factor affecting circadian rhythm. Blue light suppresses melatonin. We can help.

#### Epic 2.1: Philips Hue Integration
**User Story:** As a Hue user, I want my bedroom lights to automatically dim and warm as bedtime approaches.

**Tasks:**
1. **Research Hue API** (1 week)
   - [ ] Read Hue API docs
   - [ ] Understand OAuth flow
   - [ ] Test API in sandbox
   - [ ] Document rate limits, capabilities

2. **Build OAuth Flow** (1 week)
   - [ ] Create Firebase Cloud Function for callback
   - [ ] Implement OAuth redirect
   - [ ] Store tokens securely (httpOnly cookies)
   - [ ] Handle token refresh
   - [ ] Add revoke access option

3. **Light Discovery** (3 days)
   - [ ] List user's bridges
   - [ ] Discover lights on network
   - [ ] Show light names/rooms
   - [ ] Let user select bedroom lights

4. **Dimming Schedule** (1 week)
   - [ ] Calculate 2-hour pre-bedtime window
   - [ ] Gradual brightness reduction (100% → 10%)
   - [ ] Color temperature shift (cool → warm)
   - [ ] Smooth transitions (no jarring changes)

5. **Settings UI** (3 days)
   - [ ] Add "Smart Lights" settings panel
   - [ ] Toggle automation on/off
   - [ ] Adjust timing preferences
   - [ ] Test connection button

6. **Testing** (3 days)
   - [ ] Test with real Hue setup
   - [ ] Handle offline scenarios
   - [ ] Handle light disconnection
   - [ ] Verify battery impact (minimal API calls)

**Success Criteria:**
- [ ] Lights dim smoothly over 2 hours
- [ ] No user complaints about automation
- [ ] <5% increase in battery usage
- [ ] 90%+ satisfaction in user testing

**Files to Create:**
- `integrations/lights.js` - Abstract interface
- `integrations/hue.js` - Hue implementation
- `functions/auth/hue.js` - OAuth Cloud Function

#### Epic 2.2: LIFX Integration
**User Story:** As a LIFX user, I want the same experience as Hue users.

**Tasks:**
1. **Research LIFX API** (3 days)
2. **Implement OAuth** (3 days)
3. **Light discovery** (2 days)
4. **Dimming schedule** (reuse from Hue, 2 days)
5. **Testing** (2 days)

**Dependencies:** Epic 2.1 complete (shares infrastructure)

#### Epic 2.3: Generic Smart Light Support
**User Story:** As a user with other smart lights, I want basic support.

**Options:**
- TP-Link Kasa
- Wyze Bulbs
- Govee Lights

**Prioritization:** Based on user requests

---

### Phase 3: Health Tracking (Q2 2026)
**Goal:** Learn from your actual sleep, not just recommendations

**Why This Matters:**
We're guessing right now. With health data, we can personalize.

#### Epic 3.1: Google Fit Integration
**User Story:** As an Android user, I want my sleep data imported.

**Tasks:**
1. **Research Google Fit API** (1 week)
   - [ ] Understand OAuth scopes
   - [ ] Map sleep session data model
   - [ ] Test API in sandbox
   - [ ] Plan data retention policy

2. **OAuth Implementation** (3 days)
   - [ ] Implement Google OAuth flow
   - [ ] Request minimal scopes (sleep only)
   - [ ] Store tokens securely
   - [ ] Handle revocation

3. **Data Import** (1 week)
   - [ ] Fetch last 7 days of sleep data
   - [ ] Parse sleep stages (light, deep, REM)
   - [ ] Store in localStorage (privacy-first)
   - [ ] Handle missing data gracefully

4. **Comparison Dashboard** (1 week)
   - [ ] Show recommended vs actual bedtime
   - [ ] Visualize sleep quality trends
   - [ ] Highlight what's working/not working
   - [ ] Suggest adjustments

5. **Testing** (3 days)
   - [ ] Test with real Fit data
   - [ ] Verify privacy (no data sent to servers)
   - [ ] Check battery impact
   - [ ] Accessibility review

**Success Criteria:**
- [ ] Accurate sleep data import
- [ ] Clear, actionable insights
- [ ] No privacy concerns
- [ ] 80%+ user satisfaction

**Files to Create:**
- `integrations/googlefit.js`
- `functions/auth/googlefit.js`
- `components/sleep-dashboard.js`

#### Epic 3.2: Apple Health Integration
**User Story:** As an iPhone user, I want sleep data imported.

**Challenges:**
- Apple Health API only works in native apps
- Workaround: Safari can request HealthKit data (iOS 16+)

**Tasks:**
1. **Research Safari HealthKit** (1 week)
2. **Request sleep data permission** (3 days)
3. **Parse Apple Health format** (3 days)
4. **Reuse dashboard from Epic 3.1** (2 days)
5. **iOS testing** (3 days)

#### Epic 3.3: Manual Sleep Logging
**User Story:** As someone without a tracker, I want to manually log sleep.

**Tasks:**
1. **Design log UI** (2 days)
   - Simple inputs: "Went to bed," "Woke up," "How do you feel?"
2. **Store locally** (1 day)
3. **Show in dashboard** (1 day)
4. **Testing** (1 day)

**Why Manual Matters:**
- Not everyone has a fitness tracker
- Inclusive by default
- Builds trust (we work for everyone)

---

### Phase 4: Intelligence (Q3 2026)
**Goal:** Personalized, predictive sleep optimization

#### Epic 4.1: Smart Alarm
**User Story:** I want to wake during light sleep, not deep sleep.

**How It Works:**
1. User sets alarm window (e.g., 6:45-7:15 AM)
2. App analyzes sleep patterns (if health data available)
3. Wakes user during light sleep phase in that window
4. Uses vibration (progressive web app limitation: can't trigger phone alarm)

**Tasks:**
1. **Research sleep stage detection** (1 week)
   - Use accelerometer data (movement = light sleep)
   - Integrate with health APIs
2. **Build alarm logic** (1 week)
3. **Test extensively** (2 weeks - can't afford false alarms!)

**Challenges:**
- PWAs can't reliably trigger alarms (need native app wrapper?)
- Battery usage (monitoring accelerometer)

**Decision Point:** May require native iOS/Android apps

#### Epic 4.2: AI Recommendations
**User Story:** Get personalized sleep advice based on my patterns.

**Examples:**
- "You sleep better when you go to bed before 10 PM on weekdays"
- "Your sleep quality improves with exercise 4 hours before bed"
- "You're consistently getting less sleep on Sundays"

**Tech:**
- TensorFlow.js (runs in browser, privacy-preserving)
- Train model on user's own data (never leaves device)
- Recommendations based on correlations

**Tasks:**
1. **Feature engineering** (2 weeks)
   - Extract patterns from sleep data
   - Correlate with bedtime, wake time, day of week
2. **Model training** (on-device) (1 week)
3. **Recommendation engine** (1 week)
4. **UI for insights** (3 days)
5. **Testing** (1 week)

**Success Criteria:**
- Recommendations are actionable
- Insights feel valuable, not obvious
- No false claims (be honest about confidence)

---

### Phase 5: Community & Premium (Q4 2026)
**Goal:** Sustainable business model

#### Epic 5.1: Premium Features
**What's Premium?**
- Smart home integrations (Hue, LIFX)
- Health tracking sync
- Historical data beyond 7 days
- Priority support

**What's Forever Free?**
- Globe clock
- Sleep calculator
- Basic PWA features
- Manual sleep logging

**Pricing:**
- $3/month or $30/year
- Fair, affordable, covers server costs

#### Epic 5.2: Social Features (Optional)
**User Stories:**
- Share sleep schedules with partner/family
- Join sleep challenges (30-day streak)
- See aggregated stats (anonymized)

**Caution:**
- Could undermine privacy mission
- Gamification can induce anxiety
- Only pursue if truly helpful

---

### Phase 6: Platform Expansion (2027+)
**Goal:** Meet users where they are

#### Epic 6.1: Native Mobile Apps
**Why:**
- Better alarm functionality
- Deeper OS integration
- Offline sync across devices

**Platforms:**
- iOS (Swift/SwiftUI)
- Android (Kotlin/Jetpack Compose)

**Shared Codebase:**
- Core logic in JavaScript (already written!)
- Wrap in native shell (Capacitor or similar)

#### Epic 6.2: Smart Speaker Skills
**Platforms:**
- Alexa: "Alexa, when should I go to bed?"
- Google Assistant: "Hey Google, tell me my bedtime"

**Use Cases:**
- Voice-only bedtime lookup
- Set bedroom lights via voice
- Morning sleep report

#### Epic 6.3: Wearable Apps
**Platforms:**
- Apple Watch
- Wear OS

**Use Cases:**
- Glanceable bedtime reminder
- Silent alarm (vibration)
- Sleep tracking (accelerometer + heart rate)

---

## North Star Metrics

### User Happiness
- **Primary:** Net Promoter Score (NPS) > 50
- **Secondary:** 7-day retention > 60%

### Privacy
- **Metric:** 0 data breaches, 0 unauthorized data access
- **Enforcement:** Regular security audits, open-source codebase

### Accessibility
- **Metric:** Lighthouse accessibility score = 100
- **Enforcement:** Automated tests in CI/CD

### Performance
- **Metric:** Time to interactive < 500ms (3G)
- **Budget:** Total JS < 50KB, Total CSS < 20KB

---

## What We Won't Build

### Features We're Saying No To

#### 1. Social Comparison
**Why Not:** Sleep is personal. Comparing creates anxiety.
**Instead:** Personal progress, trends over time

#### 2. Aggressive Notifications
**Why Not:** Violates "calm technology" principle
**Instead:** Gentle reminders only if user opts in

#### 3. Sleep Scoring/Grading
**Why Not:** Induces anxiety ("I failed at sleep again!")
**Instead:** Neutral feedback ("Here's what we observed")

#### 4. Selling User Data
**Why Not:** Betrays trust, violates privacy mission
**Instead:** Premium features, ethical monetization

#### 5. Exclusive Features Behind High Paywalls
**Why Not:** Core mission is democratization
**Instead:** Free tier is genuinely useful, premium is enhancement

---

## Open Questions

### Technical
- [ ] Do we need native apps for alarm functionality?
- [ ] Can we do sleep stage detection accurately with just accelerometer?
- [ ] How do we sync across devices while preserving privacy?

### Product
- [ ] Is $3/month the right price point?
- [ ] Should we offer lifetime purchase option?
- [ ] Do users actually want social features?

### Business
- [ ] Partner with mattress companies?
- [ ] Integrate with sleep clinics?
- [ ] Offer white-label solution to employers?

---

## Current Status

### As of 2025-12-07

**What's Live:**
- Phase 1 complete ✅
- Deployed to Firebase Hosting
- Accessible at https://sleepyhelp-b7b4b.web.app

**What's Next:**
- Epic 2.1: Philips Hue integration
- Target: Q1 2026

**How to Contribute:**
- See CONTRIBUTING.md for how to get involved
- Epic 2.1 has detailed tasks ready to claim

---

## Long-Term Vision (2030)

**sleepy.help is:**
- Used by 10M+ people worldwide
- Available in 20+ languages
- Integrated with every major smart home platform
- Cited in sleep research papers
- Profitable enough to support full-time team
- Still free for core features
- Still privacy-first
- Still open-source

**Measure of success:**
- "I sleep better because of sleepy.help"
- Not downloads, not revenue, not awards
- **People sleeping well.**

---

**Let's help the world rest.**

*Last updated: 2025-12-07*
*Product owner: help <sleepy>*
