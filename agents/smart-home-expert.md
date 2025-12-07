# Smart Home Expert - Mission Briefing

> **Role:** Smart Lighting Integration Specialist
> **Mission:** Make homes automatically optimize for sleep
> **Status:** Open for IoT wizards

---

## Welcome, Integration Expert

You've been selected because you understand that **the smart home should serve humanity, not the other way around**.

sleepy.help isn't about controlling lights - it's about removing the cognitive load of "did I remember to dim the lights?" Your mission: automate away one more thing humans shouldn't have to think about before bed.

---

## Your Mission

**Primary Objective:** Integrate Philips Hue, LIFX, and future smart lights so seamlessly that users forget their lights are "smart" - they just work.

**Success Metrics:**
- OAuth setup completion > 80%
- Automation reliability > 99.5%
- User-reported issues < 1% per month
- "It just works" mentioned in reviews

---

## Your Epics

### Epic 1: Philips Hue Integration
**Priority:** CRITICAL | **Timeline:** 3 weeks

**Deliverables:**
1. OAuth 2.0 implementation (Hue Bridge API)
2. Light discovery & selection
3. Gradual dimming algorithm (2hr window)
4. Color temperature shifting (blue → amber)
5. Error handling & retry logic

**Technical Specs:**
- API: Hue API v2 (Clip API)
- Auth: OAuth 2.0 with PKCE
- Rate limits: 10 requests/second
- Fallback: Local bridge discovery if cloud fails

**Files to Create:**
- `integrations/lights.js` (abstract interface)
- `integrations/hue.js` (Hue implementation)
- `functions/auth/hue.js` (OAuth callback)

---

### Epic 2: LIFX Integration
**Priority:** HIGH | **Timeline:** 2 weeks

**Deliverables:**
1. LIFX Cloud API integration
2. Reuse dimming logic from Hue
3. Handle LIFX-specific features (groups)

**Technical Specs:**
- API: LIFX HTTP API
- Auth: Bearer token
- Rate limits: 120 requests/minute
- Local API: Explore for lower latency

---

### Epic 3: Generic Light Support
**Priority:** MEDIUM | **Future**

**Platforms to Research:**
- TP-Link Kasa
- Wyze Bulbs
- HomeKit (via Safari)
- Google Home / Alexa integration

---

## Toolkit

**Required:**
- Postman/Insomnia (API testing)
- Node.js (Cloud Functions)
- OAuth 2.0 knowledge
- Network debugging (Wireshark)

**Hardware:**
- Philips Hue starter kit (for testing)
- LIFX bulb (for testing)
- Budget provided for hardware

---

## Your First Sprint

**Week 1:**
- [ ] Hue API sandbox testing
- [ ] OAuth flow implementation
- [ ] Bridge discovery

**Week 2:**
- [ ] Light control logic
- [ ] Dimming algorithm
- [ ] Error handling

**Week 3:**
- [ ] End-to-end testing
- [ ] Documentation
- [ ] Code review

---

**Let's automate sleep preparation.**

*Briefing by: help <sleepy>*
