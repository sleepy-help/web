# UX/UI Designer - Mission Briefing

> **Role:** Lead User Experience Designer
> **Mission:** Design interactions that feel effortless, flows that feel natural
> **Status:** Open for thoughtful problem-solvers

---

## Welcome, Designer

You've been recruited because you understand that **the best interface is no interface** - but when we must have one, it should feel like it's reading your mind.

sleepy.help serves one purpose: help people sleep better. Every tap, every screen, every decision you design either moves toward that goal or away from it. Your mission is to ensure every interaction moves toward rest.

---

## Your Mission

### Primary Objective
**Design user experiences so intuitive that nobody needs a tutorial, so calming that using the app becomes part of their bedtime ritual.**

### Success Metrics
- Time to first value < 30 seconds (user gets bedtime recommendation immediately)
- Task completion rate > 95% (set wake time, get bedtime)
- User retention 7-day > 60%
- NPS (Net Promoter Score) > 50
- Zero "how do I..." support questions

---

## The Experience You're Crafting

### User Archetypes

**1. The Struggling Sleeper** (Primary)
- **Profile:** Works irregular hours, stressed, poor sleep habits
- **Needs:** Simple guidance, not judgment
- **Pain:** Overwhelming sleep advice, doesn't know where to start
- **Our Solution:** One input (wake time) → instant answer (bedtime)

**2. The Optimizer** (Secondary)
- **Profile:** Tracks everything, wants data, curious about sleep science
- **Needs:** Insights, trends, understanding "why"
- **Pain:** Generic advice doesn't account for their patterns
- **Our Solution:** Personal sleep dashboard, correlations, recommendations

**3. The Smart Home Enthusiast** (Future)
- **Profile:** Has Hue lights, smart speakers, loves automation
- **Needs:** Seamless integration, "set it and forget it"
- **Pain:** Managing sleep manually when home is smart
- **Our Solution:** Automated light dimming, smart wake-up

---

## Your Epics

### Epic 1: Onboarding Experience
**Status:** NEEDS DESIGN
**Timeline:** 2 weeks
**Priority:** CRITICAL

**Current State:** No onboarding - user lands on main screen
**Problem:** First-time users don't understand the globe or sleep calculator

**Your Mission:** Design onboarding that educates without annoying

#### Task 1.1: First-Time User Experience (FTUE)
**Deliverable:** 3-screen onboarding flow + skip option

**Screens to Design:**

**Screen 1: Welcome + Value Prop**
```
[Globe visualization]
"Sleep is natural"
"Your body follows Earth's rhythm. We'll help you find yours."
[Get Started] [Skip]
```

**Questions to Answer:**
- Should we animate the globe on this screen?
- How much text is too much?
- Should we ask for timezone immediately or wait?

**Screen 2: How It Works**
```
[Bedtime calculator visualization]
"Science-based bedtimes"
"We use 90-minute sleep cycles - your brain's natural rhythm."
[Continue] [Skip]
```

**Design Challenge:**
- Visualize sleep cycles simply
- Don't use medical jargon
- Make science feel accessible

**Screen 3: Permission Request (Optional)**
```
[Privacy illustration]
"Your data stays with you"
"Everything lives on your device. No tracking, no servers."
[Grant Location (Optional)] [I'll set it manually] [Skip]
```

**Ethical Considerations:**
- Location is helpful but not required
- Make "manual" path equally easy
- Don't dark pattern toward permission

**Flow Requirements:**
- [ ] Completable in < 60 seconds
- [ ] Skippable at any point (user can explore)
- [ ] Never shows again unless user resets
- [ ] Accessible (screen reader, keyboard nav)
- [ ] Works offline (static content)

#### Task 1.2: Progressive Disclosure
**Challenge:** Teach features without overwhelming

**Features to Introduce:**

1. **Wake Time Input** (Core - show immediately)
2. **Bedtime Calculation** (Core - automatic)
3. **Sleep Stats** (Core - visible but subtle)
4. **Location** (Optional - tooltip on first visit)
5. **PWA Install** (Optional - only after 2+ visits)
6. **Smart Lights** (Future - only when available)

**Your Approach:**
- Prioritize ruthlessly (what's essential NOW?)
- Use tooltips/coach marks sparingly
- Let interface speak for itself
- Document decision rationale

#### Task 1.3: Empty States
**Deliverable:** Designs for zero-data scenarios

**States to Design:**

1. **No Wake Time Set Yet**
   - Show: Empty bedtime with invitation
   - CTA: "Set your wake time to see your bedtime"
   - Feeling: Curious, not demanding

2. **No Location Set**
   - Show: Globe without marker
   - CTA: "Add your location to see yourself on Earth"
   - Feeling: Optional, bonus feature

3. **No Health Data** (Phase 3)
   - Show: Dashboard with placeholder
   - CTA: "Connect health tracking for insights"
   - Feeling: Premium feature, not required

**Principles:**
- Empty states are opportunities, not dead ends
- Show what's possible, not what's missing
- Never guilt-trip ("You haven't set...")

---

### Epic 2: Smart Light Integration UX
**Status:** NEEDS DESIGN
**Timeline:** 3 weeks
**Priority:** HIGH (Phase 2)

**Context:** Users with Philips Hue or LIFX want automated sleep lighting

**Your Mission:** Design setup flow + controls that feel magical

#### Task 2.1: Discovery & Setup Flow
**Deliverable:** End-to-end flow from "What's this?" to "Lights automated"

**Flow Steps:**

**Step 1: Feature Introduction**
- Where: Settings panel (new section)
- Trigger: User taps "Smart Lights"
- Show: "Dim your lights automatically before bedtime"
- CTA: "Connect Philips Hue" or "Connect LIFX"

**Step 2: Authorization**
- OAuth flow (handled by backend)
- Your job: Design loading states, error states
- Challenge: OAuth is technical - make it friendly

**Step 3: Light Selection**
- Show: List of user's lights/rooms
- Let user: Select bedroom lights
- Consider: Some users have 20+ lights (how to handle?)

**Step 4: Customization**
- When to start dimming? (Default: 2 hours before bedtime)
- How bright at bedtime? (Default: 10%)
- Color temperature? (Default: Warm amber)
- Show preview: "Lights will dim gradually from 7:45 PM to 9:45 PM"

**Step 5: Confirmation**
- Test button: "Try it now"
- Enable toggle: On by default
- Settings: Easy to adjust later

**Design Challenges:**
- OAuth redirect feels jarring (how to smooth?)
- Technical errors must be human-friendly
- Setup should feel effortless (aim for < 2 minutes)

#### Task 2.2: Control Panel
**Deliverable:** Dashboard for managing smart lights

**Must Include:**
- [ ] On/Off toggle (master switch)
- [ ] Connected lights indicator
- [ ] Schedule preview (timeline visualization)
- [ ] Edit settings button
- [ ] Disconnect option (with confirmation)

**Interaction Details:**
- Toggle should have loading state (API call takes ~1s)
- Schedule should be visual (not just text)
- Consider: Animation showing lights dimming over time
- Mobile-first (most users will be on phone before bed)

#### Task 2.3: Error States & Edge Cases
**Deliverable:** Designs for when things go wrong

**Scenarios to Design:**

1. **Lights Offline**
   - Message: "Can't reach your lights. They might be offline."
   - Actions: [Retry] [Adjust Settings]

2. **OAuth Failed**
   - Message: "Couldn't connect to Philips Hue. Try again?"
   - Actions: [Retry] [Contact Support]

3. **Bedtime Changed Mid-Automation**
   - Behavior: Lights should adjust schedule automatically
   - Confirmation: "Lights will now dim at [new time]"

4. **Lights Already Dim**
   - Behavior: Don't dim further (respect manual control)
   - Feedback: Subtle note "Lights already dimmed manually"

**Philosophy:**
- Errors should never feel like failures
- Always provide next step
- Blame the system, not the user

---

### Epic 3: Sleep Dashboard (Phase 3)
**Status:** RESEARCH & DESIGN
**Timeline:** 4 weeks
**Priority:** MEDIUM

**Context:** When users connect health tracking (Google Fit, Apple Health), show insights

**Your Mission:** Visualize sleep data without inducing anxiety

#### Task 3.1: Dashboard Layout
**Deliverable:** Information architecture + wireframes

**Data to Display:**
- Actual sleep duration vs. recommended
- Sleep quality trends (7-day, 30-day)
- Bedtime consistency
- Wake time consistency
- Patterns (weekday vs weekend)

**Design Principles:**
- **Neutral language:** "Observed" not "Failed"
- **Trends over scores:** Lines, not grades
- **Actionable insights:** "Go to bed 30 min earlier" not "Poor sleep"
- **Celebrate progress:** Highlight improvements

**Layout Considerations:**
- Mobile-first (portrait orientation)
- Scannable in < 5 seconds
- One insight above the fold
- Detailed data below (progressive disclosure)

#### Task 3.2: Data Visualization
**Deliverable:** Chart/graph designs

**Visualization Options:**

1. **Sleep Duration:** Horizontal bar chart
   - X-axis: Hours (0-12)
   - Y-axis: Last 7 days
   - Overlay: Target range (7.5-9 hours)
   - Color: Green when in range, yellow when close, pink when off

2. **Bedtime Consistency:** Scatter plot or timeline
   - Show: Actual bedtime each night
   - Overlay: Recommended bedtime
   - Insight: "Most consistent on Tuesdays" or "Weekends are 2 hours later"

3. **Sleep Quality:** Trend line (sparkline)
   - Simplified visual (no numbers)
   - Direction matters more than precision
   - Green = improving, flat = stable, pink = declining

**Avoid:**
- Sleep "scores" (creates anxiety)
- Red colors (too alarming)
- Overwhelming detail (no need for REM % unless user asks)

#### Task 3.3: Insights & Recommendations
**Deliverable:** Smart insights UX

**Types of Insights:**

**Pattern Recognition:**
- "You sleep better when you go to bed before 10 PM"
- "Your weekday sleep is 1.5 hours less than weekends"
- "You're most consistent on Tuesday and Thursday"

**Recommendations:**
- "Try going to bed 30 minutes earlier"
- "Your sleep quality improves with consistent bedtime"
- "Consider adjusting your wake time to 7:30 AM"

**Design Challenge:**
- Insights must be accurate (no false patterns)
- Tone must be helpful, not preachy
- User can dismiss/hide insights

**Where to Show:**
- Dashboard top (1 primary insight)
- Detail view (multiple insights)
- Notification (optional, opt-in only)

---

## Your Toolkit

### Design Tools
**Required:**
- **Figma or Sketch** - Primary design tool
- **FigJam or Miro** - User flows, brainstorming
- **Optimal Workshop or similar** - Card sorting, tree testing

**Recommended:**
- **Principle or ProtoPie** - Interaction prototyping
- **Loom** - Design walkthroughs
- **UsabilityHub** - Quick user testing

### Research Methods You'll Use
- **User interviews** - Understand sleep struggles
- **Usability testing** - Validate designs
- **Analytics review** - Find drop-off points
- **A/B testing** - Compare solutions
- **Heuristic evaluation** - Expert review

### Resources You Have
- **[DESIGN.md](../DESIGN.md)** - Design system & principles
- **[agent.md](../agent.md)** - Project context
- **[ROADMAP.md](../ROADMAP.md)** - Feature pipeline
- **Live App:** https://sleepyhelp-b7b4b.web.app

---

## Collaboration Points

### You'll Work Closely With:

**Visual Art Director:**
- You define flows, they define aesthetics
- Collaborate on: Onboarding, empty states, dashboard
- Handoff: Wireframes → they add visual polish

**Fullstack Developers:**
- You design, they build
- Collaborate on: Feasibility, API constraints, performance
- Handoff: Figma files with detailed specs (spacing, states, interactions)

**Smart Home Expert:**
- They know Hue/LIFX APIs, you design UX
- Collaborate on: What's possible vs. what's usable
- Handoff: User flows, error handling requirements

---

## Design Principles (Your North Star)

### 1. Invisible Interface
- Best UX is when user doesn't think about the app
- Remove friction at every step
- Default behaviors should be smart

### 2. Respect User Agency
- Never force (suggest, don't require)
- Make "no" as easy as "yes"
- User can undo/change anything

### 3. Calm Technology
- Don't demand attention
- Fit into life, don't disrupt
- Notifications are opt-in, not default

### 4. Progressive Complexity
- Simple by default
- Advanced features hidden but discoverable
- Power users can find depth

---

## Quality Standards

### Every Design Must:
- [ ] Have user flow diagram
- [ ] Account for error states
- [ ] Consider loading states
- [ ] Work on mobile (primary platform)
- [ ] Be testable (prototype or clickable mockup)
- [ ] Have accessibility annotations
- [ ] Document design decisions

### Approval Process
1. **Sketch:** Share rough concepts with team
2. **Wireframe:** Present structure and flow
3. **Prototype:** Build interactive mockup
4. **Test:** Run usability tests (5 users minimum)
5. **Refine:** Iterate based on feedback
6. **Handoff:** Deliver to Visual Art Director & Developers

---

## User Research Approach

### Questions We Need Answered

**About Onboarding:**
- Do users understand the globe visualization?
- Is the sleep science explanation clear?
- How long does onboarding feel? (Should be < 1 min)

**About Smart Lights:**
- Do users trust automated light control?
- Is 2 hours before bedtime the right default?
- What errors worry users most?

**About Dashboard:**
- Does sleep data induce anxiety or empower?
- What insights are most valuable?
- How often do users check their stats?

### Research Methods

**Guerrilla Testing:**
- Show prototypes to friends/family
- Ask: "What would you do here?"
- Watch where they hesitate

**Remote Testing:**
- UsabilityHub, UserTesting.com
- Task-based scenarios
- Record and analyze

**Analytics:**
- Firebase Analytics (privacy-preserving)
- Track: Drop-off points, feature usage, errors
- Never track: Personal sleep data, location

---

## Success Looks Like

**In 1 Month:**
- [ ] Onboarding designed and tested
- [ ] Smart lights flow validated with users
- [ ] Empty states refined
- [ ] Developers have specs to build from

**In 3 Months:**
- [ ] Onboarding live (>80% completion rate)
- [ ] Smart lights feature shipped (>50% setup success rate)
- [ ] User feedback is positive ("so easy to use")
- [ ] Support tickets about confusion are rare

**In 6 Months:**
- [ ] Dashboard designed and tested
- [ ] Patterns identified from real user data
- [ ] Insights engine provides value
- [ ] NPS > 50 (people recommend sleepy.help)

---

## Your First Week

### Day 1: Immersion
- [ ] Read all documentation
- [ ] Use the app yourself for one full sleep cycle
- [ ] Note every moment of confusion or delight
- [ ] Write down 3 improvements

### Day 2-3: User Research
- [ ] Interview 5 people about their sleep struggles
- [ ] Ask: "What do you wish existed?"
- [ ] Document pain points
- [ ] Prioritize based on frequency + severity

### Day 4-5: Sketching
- [ ] Sketch 3 different onboarding approaches
- [ ] Wireframe smart lights flow
- [ ] Present to team
- [ ] Gather feedback

### Week 2+: Building
- [ ] High-fidelity mockups
- [ ] Interactive prototypes
- [ ] Usability testing
- [ ] Iteration based on findings

---

## Questions You Might Have

**Q: How much user testing is enough?**
A: 5 users find 85% of issues (Nielsen). Test early, test often. Even informal feedback is valuable.

**Q: What if users want features that conflict with our mission?**
A: Example: "Gamify sleep with streaks!" → This creates anxiety, conflicts with "calm technology." Politely decline, explain rationale.

**Q: How do I balance simplicity with power user needs?**
A: Progressive disclosure. Default is simple. Advanced settings are one tap away but not in your face.

**Q: Can I propose new features?**
A: Yes! If user research reveals needs we haven't considered, advocate. Back it with data.

---

## Why This Role Matters

**Most sleep apps fail because they're either:**
1. **Too simple:** Just a bedtime alarm (not useful enough)
2. **Too complex:** Medical-grade tracking (overwhelming)
3. **Too judgmental:** Sleep scores that create anxiety (counterproductive)

**Your job is the tightrope walk:**
- Simple enough for anyone
- Powerful enough for enthusiasts
- Supportive, never judgmental

**If you succeed, sleepy.help becomes the app people use every single night.**

That's daily impact. That's meaningful work.

---

## Ready to Begin?

**To accept this mission:**
1. Share your portfolio (case studies preferred)
2. Tell us: What's one sleep app that frustrates you, and why?
3. Propose: One quick UX win for sleepy.help (based on using the app)

**We'll provide:**
- Figma workspace with design system
- Access to analytics (anonymous, privacy-preserving)
- User research budget (for testing tools)
- Direct line to project lead and developers

**Let's make sleep effortless.**

---

*Mission briefing prepared by: help <sleepy>*
*Last updated: 2025-12-07*
*Status: SEEKING THOUGHTFUL PROBLEM-SOLVERS*
