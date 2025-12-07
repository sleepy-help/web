# Visual Art Director - Mission Briefing

> **Role:** Lead Visual Artist & Brand Steward
> **Mission:** Craft the visual language that helps the world sleep beautifully
> **Status:** Open for exceptional talent

---

## Welcome, Artist

You've been selected because you understand that **great design is invisible** - it simply feels right.

sleepy.help isn't just an app. It's a lullaby for the digital age. Your mission is to ensure every pixel, every color, every animation whispers: "You're safe. You can rest."

---

## Your Mission

### Primary Objective
**Create a visual system so calming and coherent that users feel peaceful just by opening the app.**

### Success Metrics
- Users describe the app as "beautiful" (qualitative feedback)
- Time spent on app increases (users want to stay)
- Install rate increases (visual appeal drives adoption)
- Brand recognition (people know sleepy.help by its aesthetic)

---

## The Brand You're Stewarding

### Brand Essence
**Calm • Scientific • Inclusive • Poetic**

**What We Are:**
- The gentle friend who reminds you to sleep
- The cosmos visualized in your pocket
- Science made beautiful
- Technology that respects humanity

**What We're Not:**
- Aggressive productivity app
- Gamified sleep tracker
- Medical device
- Corporate wellness tool

### Visual Metaphors
**Core Metaphor:** Earth's Rotation = Natural Sleep Rhythm

**Supporting Metaphors:**
- **Day/Night:** The eternal dance (our clock visualization)
- **Sunset:** Transition, warmth, preparation
- **Stars:** Navigation, guidance, wonder
- **Cycles:** Repetition, reliability, natural law

---

## Your Epics

### Epic 1: Icon & Branding System
**Status:** READY TO START
**Timeline:** 2 weeks
**Priority:** HIGH

**Current State:**
- We have a simple SVG icon (day/night globe split)
- No complete icon set (app icons at 192px, 512px needed)
- No brand guidelines document

**Your Mission:**

#### Task 1.1: App Icon Evolution
**Deliverable:** Production-ready app icons

**Requirements:**
- [ ] Design 192x192px app icon (PWA standard)
- [ ] Design 512x512px app icon (PWA standard)
- [ ] Design maskable icon variant (Safe zone: 80% circle)
- [ ] Design Apple Touch Icon (180x180px, no transparency)
- [ ] Design favicon.ico (32x32px, 16x16px sizes)
- [ ] Ensure legibility at all sizes
- [ ] Works in light and dark mode

**Design Considerations:**
- Current icon: Half blue (day), half dark (night), user marker dot
- Consider: 3D depth, gradient refinement, glow effects
- Test on actual home screens (iOS, Android, Desktop)
- Maintain recognizability even at 16px

**Tools:**
- Figma, Sketch, Illustrator (SVG export)
- ImageOptim (compression)
- realfavicongenerator.net (testing)

#### Task 1.2: Brand Guidelines
**Deliverable:** brand-guidelines.md document

**Sections to Cover:**
```markdown
# sleepy.help Brand Guidelines

## Logo Usage
- Primary logo
- Minimum sizes
- Clear space requirements
- Dos and don'ts

## Color System
- Primary palette (with hex codes)
- Secondary palette
- Semantic colors (success, warning, error)
- Accessibility compliance (contrast ratios)

## Typography
- Primary font stack
- Type scale
- Usage guidelines

## Iconography
- Icon style (outline vs filled)
- Icon grid system
- Custom icon set

## Illustration Style
- Aesthetic direction
- Color treatment
- Level of detail

## Voice & Tone
- Visual voice (calm, scientific, poetic)
- Emotional range
- Brand personality traits
```

#### Task 1.3: Social Media Assets
**Deliverable:** Social sharing graphics

**Assets Needed:**
- [ ] Open Graph image (1200x630px) - For Facebook/LinkedIn shares
- [ ] Twitter Card image (1200x675px)
- [ ] Instagram story template (1080x1920px)
- [ ] Product Hunt thumbnail (240x240px)

**Creative Direction:**
- Show the globe clock in context
- Include tagline: "find your rhythm, sleep deeply"
- Minimal text (visual should speak)
- Brand colors prominent

---

### Epic 2: Illustration System
**Status:** READY TO START
**Timeline:** 3 weeks
**Priority:** MEDIUM

**Your Mission:** Create illustrations for empty states, onboarding, and educational content

#### Task 2.1: Empty State Illustrations
**Deliverable:** SVG illustrations for key moments

**Screens to Illustrate:**
1. **No Location Set**
   - Visual: Globe with question mark
   - Feeling: Curious, inviting
   - CTA: "Set your location to see yourself on Earth"

2. **No Health Data**
   - Visual: Phone with health icon
   - Feeling: Optional, non-pressuring
   - CTA: "Connect health tracking for personalized insights"

3. **First Time User** (Onboarding)
   - Visual: Rotating Earth with day/night
   - Feeling: Wonder, clarity
   - Message: "Your sleep follows Earth's rhythm"

**Style Guide:**
- Line art with subtle gradients
- Brand colors only (no random colors)
- Optimistic, never scary
- SVG format (scalable, small file size)
- Maximum 10KB per illustration

#### Task 2.2: Onboarding Flow Visuals
**Deliverable:** 3-screen onboarding sequence

**Screen 1: Welcome**
```
[Illustration: Globe with gentle glow]
Headline: "Sleep is natural"
Body: "Your body follows Earth's 24-hour rhythm.
       We'll help you find your perfect schedule."
```

**Screen 2: How It Works**
```
[Illustration: Clock face splitting into sleep cycles]
Headline: "Science-based bedtimes"
Body: "We calculate optimal bedtime using 90-minute
       sleep cycles - the natural REM rhythm."
```

**Screen 3: Privacy**
```
[Illustration: Phone with lock icon, data staying local]
Headline: "Your data, your device"
Body: "Everything stays on your phone.
       No tracking, no servers, no accounts."
```

**Design Principles:**
- Progressive disclosure (don't overwhelm)
- Skippable (show "Skip" on every screen)
- Delightful but fast (don't block user from app)

#### Task 2.3: Educational Micro-Animations
**Deliverable:** Animated SVG/Lottie files

**Animations Needed:**

1. **Sleep Cycle Explanation** (15 seconds)
   - Show: Light sleep → Deep sleep → REM → Repeat
   - Visual: Wave pattern or circular cycle
   - Use: In-app education tooltip

2. **Circadian Rhythm** (20 seconds)
   - Show: Sun rising, energy peak, sun setting, melatonin rise
   - Visual: Sun moving across arc, body responding
   - Use: "Why bedtime matters" explainer

3. **Light Impact** (10 seconds)
   - Show: Blue light suppressing melatonin, warm light allowing it
   - Visual: Light bulb changing color, brain responding
   - Use: Smart light feature intro

**Technical Requirements:**
- Lottie JSON format (bodymovin plugin for After Effects)
- Or animated SVG (SMIL or CSS)
- < 50KB per animation
- Respects prefers-reduced-motion
- Loops infinitely or has clear end state

---

### Epic 3: UI Enhancement & Polish
**Status:** READY TO START
**Timeline:** Ongoing
**Priority:** MEDIUM-HIGH

**Your Mission:** Elevate the existing UI from functional to delightful

#### Task 3.1: Globe Clock Refinement
**Current State:** Functional but basic Canvas rendering

**Visual Improvements:**
1. **Depth & Dimension**
   - Add subtle shadow beneath globe (grounding)
   - Consider: Fresnel rim light at edge
   - Gradient on sphere surface (not flat)

2. **Day/Night Transition**
   - Current: Hard gradient
   - Proposal: Atmospheric scattering effect
   - Reference: How sunsets actually look from space

3. **User Marker Enhancement**
   - Current: Simple dot with glow
   - Proposal: Pulsing animation (heartbeat pace)
   - Consider: Trailing arc showing timezone

4. **Star Field** (Optional)
   - Add subtle stars on night side
   - Parallax effect on scroll/interaction
   - Should be subtle, not distracting

**Deliverable:**
- Design mockups in Figma/Sketch
- Work with SVG/GLTF expert for implementation
- Document visual specifications

#### Task 3.2: Color Palette Expansion
**Current Palette:** Basic night theme + light theme

**Your Mission:** Create mood-based variants

**Proposed Palettes:**

1. **Evening (Default)** ✅ Already exists
   - Deep blues, ambers
   - For: General use

2. **Dawn**
   - Soft pinks, golds, lavenders
   - For: Morning wake-up mode
   - When: User sets "morning person" preference

3. **Midnight**
   - True blacks, deep purples
   - For: OLED optimization, late night use
   - When: System time is between 11 PM - 5 AM

4. **Seasonal Variants** (Future)
   - Summer: Warmer tones
   - Winter: Cooler tones
   - Auto-detect based on hemisphere + calendar

**Deliverable:**
- CSS variables for each palette
- Switching logic specification
- A/B testing plan

#### Task 3.3: Micro-Interactions
**Your Mission:** Add delightful details

**Interactions to Design:**

1. **Bedtime Recommendation Reveal**
   - Current: Instant update
   - Proposal: Fade in with subtle scale
   - Feeling: "Here's your answer" (confident)

2. **Stats Indicator State Change**
   - Current: Color changes instantly
   - Proposal: Gentle pulse when improving
   - Feeling: Celebration without distraction

3. **Location Button**
   - Current: Standard button
   - Proposal: Ripple effect on click, loading state
   - Feeling: "We're searching for you"

4. **Install Prompt**
   - Current: Simple button
   - Proposal: Slide up from bottom, gentle bounce
   - Feeling: Invitation, not interruption

**Deliverable:**
- Animated prototypes (Figma, Principle, or similar)
- Timing specifications (duration, easing)
- Code-ready specs for developers

---

## Your Toolkit

### Design Tools
**Required:**
- **Figma or Sketch** - Primary design tool
- **Illustrator or Affinity Designer** - Vector work
- **ImageOptim** - Asset compression
- **SVGOMG** - SVG optimization

**Recommended:**
- **After Effects + Bodymovin** - Lottie animations
- **Principle or ProtoPie** - Interaction prototyping
- **Stark** - Accessibility checking
- **ColorOracle** - Color blindness simulation

### Technical Skills You'll Use
- SVG optimization and hand-editing
- CSS variables and theming
- Understanding of Canvas API (for globe collaboration)
- Responsive design principles
- Accessibility (WCAG 2.1 AA standards)

### Resources You Have
- **[DESIGN.md](../DESIGN.md)** - Current design system
- **[agent.md](../agent.md)** - Project overview
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - Technical constraints
- **Live App:** https://sleepyhelp-b7b4b.web.app

---

## Collaboration Points

### You'll Work Closely With:

**Designer (UX/UI):**
- They own user flows, you own visual execution
- Collaborate on: Onboarding, empty states, feature launches
- Handoff: Figma files, asset exports

**SVG/GLTF Expert:**
- They implement your vision in code
- Collaborate on: Globe enhancements, animations
- Handoff: Specifications, reference designs

**Fullstack Developers:**
- They integrate your assets
- Collaborate on: Performance optimization, implementation feasibility
- Handoff: Optimized assets, CSS specifications

---

## Design Principles (Your North Star)

### 1. Calm Over Flashy
- Animations should soothe, not excite
- Colors should comfort, not stimulate
- Every element asks: "Does this help sleep?"

### 2. Accessible Over Trendy
- Design for everyone: young, old, visually impaired, colorblind
- Trendy aesthetics fade; accessibility is timeless
- When in conflict, accessibility wins

### 3. Poetic Over Literal
- A globe is more interesting than a clock icon
- Metaphor engages the imagination
- Science doesn't have to look medical

### 4. Simple Over Complex
- Remove until you can't remove anymore
- One focal point per screen
- Complexity hides in implementation, not interface

---

## Quality Standards

### Every Design Must:
- [ ] Have 4.5:1 contrast ratio (WCAG AA)
- [ ] Work in light and dark mode
- [ ] Scale to mobile and desktop
- [ ] Respect reduced motion preference
- [ ] Be tested with color blindness sim
- [ ] Have < 100KB total file size (per feature)
- [ ] Load in < 200ms

### Approval Process
1. **Concept:** Share sketches/explorations with team
2. **Design:** Present high-fidelity mockups
3. **Feedback:** Iterate based on input
4. **Implementation:** Work with devs on execution
5. **Testing:** Validate with real users
6. **Ship:** Deploy and monitor reception

---

## Inspiration & References

### Apps We Admire (Visually)
- **Headspace** - Friendly, approachable illustration
- **Dark Sky** - Data as art
- **Things 3** - Clarity and polish
- **Calm** - Soothing aesthetics
- **Monument Valley** - Poetic visuals

### Visual Styles to Study
- **Isometric illustration** (for spatial concepts)
- **Line art with gradients** (modern, clean)
- **Atmospheric effects** (depth without complexity)
- **Neumorphism** (subtle 3D, not overdone)

### Color Theory
- **Circadian lighting research** - How color affects sleep
- **Blue light impact** - Why we avoid blue at night
- **Warm color psychology** - Creating calm

---

## Success Looks Like

**In 3 Months:**
- [ ] Complete icon set across all platforms
- [ ] Brand guidelines published
- [ ] Onboarding illustrations live
- [ ] Globe visuals enhanced
- [ ] Users comment on visual appeal

**In 6 Months:**
- [ ] Recognized visual identity (people know the look)
- [ ] Press features highlight design
- [ ] Design system referenced by others
- [ ] Animation library complete
- [ ] Awards submissions (Awwwards, Webby, etc.)

**In 1 Year:**
- [ ] sleepy.help becomes a design case study
- [ ] Visual system extends to native apps
- [ ] Merchandising opportunities (the brand is strong)
- [ ] Other sleep apps copy our aesthetic (we lead)

---

## Your First Week

### Day 1: Absorb
- [ ] Read all documentation (agent.md, DESIGN.md, ARCHITECTURE.md)
- [ ] Use the app for a full day
- [ ] Study current visual assets
- [ ] Note what works, what doesn't

### Day 2-3: Audit & Analyze
- [ ] Create visual audit document
- [ ] Identify gaps (missing assets, inconsistencies)
- [ ] Research competitive landscape
- [ ] Gather inspiration (mood board)

### Day 4-5: Propose
- [ ] Draft brand guidelines outline
- [ ] Sketch icon concepts (3-5 directions)
- [ ] Present to team for feedback
- [ ] Align on vision

### Week 2+: Execute
- [ ] Begin Epic 1 (Icon & Branding)
- [ ] Weekly check-ins with team
- [ ] Iterate based on feedback
- [ ] Ship first assets

---

## Questions You Might Have

**Q: Do I have creative freedom?**
A: Yes, within brand principles. Experiment boldly, but ship thoughtfully.

**Q: What if my idea conflicts with technical constraints?**
A: Collaborate with devs. Sometimes constraints spark better ideas. Sometimes we change the constraints.

**Q: How do I handle feedback I disagree with?**
A: Advocate for your vision with rationale. If overruled, execute excellently anyway. Every decision is a learning opportunity.

**Q: Can I propose new epics?**
A: Absolutely! If you see visual opportunities we've missed, pitch them.

**Q: What's the approval chain?**
A: Project lead (help <sleepy>) has final say, but we value consensus. Great work sells itself.

---

## Why This Role Matters

**sleepy.help is asking people to trust us with something intimate: their sleep.**

Visual design is the first trust signal. If we look professional, scientific, and caring, users will give us a chance. If we look amateur or aggressive, they'll bounce.

You're not "just" making things pretty. You're:
- Building trust through visual excellence
- Communicating complex science simply
- Creating emotional safety (this app cares about me)
- Setting the standard for sleep wellness apps

**Your work will help millions sleep better. That's meaningful.**

---

## Ready to Begin?

**To accept this mission:**
1. Reply with your portfolio
2. Share your thoughts on the current visual direction
3. Propose one quick win (something you'd improve immediately)

**We'll provide:**
- Figma workspace access
- GitHub repository access
- Firebase console access (for deployments)
- Direct line to project lead

**Let's make sleep beautiful.**

---

*Mission briefing prepared by: help <sleepy>*
*Last updated: 2025-12-07*
*Status: SEEKING EXCEPTIONAL TALENT*
