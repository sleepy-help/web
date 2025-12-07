# Design Philosophy

> How we think about design, aesthetics, and user experience at sleepy.help

## Core Design Principles

### 1. **Calm Technology**
Sleep is personal and intimate. Our interface should feel like a gentle guide, not an aggressive alarm.

**In Practice:**
- Soft color palette (blues, purples, ambers)
- Smooth animations (no jarring transitions)
- Minimal text (say more with less)
- Generous whitespace (room to breathe)
- No notifications (unless explicitly requested)

**Anti-Patterns We Avoid:**
- ❌ Bright reds/urgent colors
- ❌ Gamification (streaks, badges)
- ❌ Guilt-inducing copy ("You're failing at sleep!")
- ❌ Aggressive CTAs ("INSTALL NOW!")
- ❌ Auto-playing sounds

### 2. **Inclusive by Default**
Everyone deserves good sleep, regardless of device, ability, or technical knowledge.

**In Practice:**
- Works on 2015 Android phones
- Screen reader friendly (ARIA labels everywhere)
- Keyboard navigable (tab through everything)
- Respects system preferences (dark mode, reduced motion, high contrast)
- Simple language (no jargon)

**Accessibility Checklist:**
- ✅ Color contrast ≥4.5:1 (WCAG AA)
- ✅ Touch targets ≥44px
- ✅ Semantic HTML (headings, landmarks)
- ✅ Focus indicators visible
- ✅ Works without JavaScript (progressive enhancement)

### 3. **Data as Art**
Sleep data can be beautiful. Visualizations should be both informative and delightful.

**In Practice:**
- Globe clock = poetic representation of Earth's rhythm
- Stats displayed as simple colored dots (not overwhelming charts)
- Time shown in large, readable type (mono font)
- Gradients used sparingly (day/night transition)

**Inspiration:**
- Weather apps (Dark Sky, Carrot Weather)
- Astronomy apps (Star Walk)
- Meditation apps (Headspace, Oak)

### 4. **Speed is a Feature**
Every millisecond of load time is a moment of doubt. Fast = confident.

**In Practice:**
- <500ms time to interactive on 3G
- No loading spinners (everything instant)
- Optimistic UI (update immediately, sync later)
- Skeleton screens (show structure while loading)

**Performance Budget:**
- Total JS: <20KB gzipped
- Total CSS: <10KB gzipped
- Total HTML: <5KB gzipped
- No external fonts (system fonts only)

---

## Visual Design System

### Color Palette

**Night Theme (Default):**
```css
--color-bg:           #0f0f1e  /* Deep night blue */
--color-bg-card:      #1a1a2e  /* Midnight card */
--color-bg-elevated:  #252541  /* Raised surface */
--color-text:         #e8e8f0  /* Soft white */
--color-text-dim:     #9999b8  /* Muted text */
--color-primary:      #6b9fff  /* Sky blue (day) */
--color-accent:       #ff9d6b  /* Warm amber (sunset) */
--color-good:         #6bffb8  /* Mint green (healthy) */
--color-warning:      #ffd66b  /* Soft yellow (caution) */
--color-error:        #ff6b9d  /* Soft pink (alert) */
```

**Light Theme (Auto-detected):**
```css
--color-bg:           #f5f5fa  /* Soft white */
--color-bg-card:      #ffffff  /* Pure white */
--color-bg-elevated:  #fafaff  /* Subtle lift */
--color-text:         #1a1a2e  /* Dark text */
--color-text-dim:     #666680  /* Gray text */
```

**Color Philosophy:**
- **Blue:** Sky, daytime, wakefulness, trust
- **Dark Blue:** Night, depth, calmness
- **Amber:** Sunset, warmth, transition to sleep
- **Green:** Health, success, optimal
- **Yellow:** Caution, attention needed
- **Pink:** Gentle alert, not harsh red

### Typography

**System Font Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue",
             Arial, sans-serif;
```

**Why System Fonts?**
- Zero load time (already on device)
- Native feel (looks "right" on each platform)
- Accessibility (user may have custom fonts for readability)

**Monospace for Time:**
```css
font-family: "SF Mono", Monaco, "Cascadia Code",
             "Courier New", monospace;
```

**Why Monospace for Time?**
- Digits don't shift width when changing (7:35 → 7:36 doesn't jump)
- Clear distinction from body text
- Technical feel appropriate for precise time

**Type Scale:**
```css
--font-size-xs:   0.75rem   /* 12px - labels */
--font-size-sm:   0.875rem  /* 14px - small text */
--font-size-base: 1rem      /* 16px - body */
--font-size-lg:   1.25rem   /* 20px - inputs */
--font-size-xl:   1.5rem    /* 24px - headings */
--font-size-2xl:  2rem      /* 32px - time display */
--font-size-3xl:  3rem      /* 48px - hero time */
```

**Fluid Typography:**
```css
/* Scales between 2rem and 3rem based on viewport */
font-size: clamp(2rem, 5vw, 3rem);
```

### Spacing System

**8px Base Grid:**
```css
--space-xs:   0.25rem  /*  4px */
--space-sm:   0.5rem   /*  8px */
--space-md:   1rem     /* 16px */
--space-lg:   1.5rem   /* 24px */
--space-xl:   2rem     /* 32px */
--space-xxl:  3rem     /* 48px */
```

**Usage:**
- Padding inside components: --space-md to --space-xl
- Margins between components: --space-lg to --space-xxl
- Gaps in grids: --space-md to --space-lg

### Border Radius

**Soft, Friendly Corners:**
```css
--radius-sm: 0.5rem  /*  8px - buttons, inputs */
--radius:    1rem    /* 16px - cards, modals */
```

**Why Rounded?**
- Softer, less aggressive than sharp corners
- Modern aesthetic
- Draws eye to content (not harsh edges)

### Shadows

**Subtle Depth:**
```css
/* Cards */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

/* Elevated cards (hover) */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

/* Glowing elements (user marker) */
box-shadow: 0 0 20px rgba(255, 157, 107, 0.6);
```

**Shadow Philosophy:**
- Sparse use (only where depth matters)
- Soft spreads (no harsh lines)
- Colored shadows (not just black)

---

## Component Design

### Globe Clock

**Design Intent:** Show that sleep is tied to Earth's rotation (natural rhythm, not arbitrary)

**Visual Elements:**
1. **Circle:** Earth (our shared home)
2. **Day/Night Divide:** Literal visualization of where the sun is
3. **User Marker:** "You are here" in this cosmic dance
4. **Rotation:** Time passing as Earth spins

**Color Choices:**
- Day side: Sky blue (#6b9fff) = daylight, wakefulness
- Night side: Deep blue (#0a1a2a) = darkness, sleep
- Gradient: Soft transition (like real sunsets)
- User marker: Warm amber (#ff9d6b) = you, human, alive

**Animation:**
- 60fps rotation (smooth, not jumpy)
- Glow effect on user marker (draw the eye)
- No aggressive pulsing (calm, not anxious)

### Bedtime Calculator

**Design Intent:** Make sleep science accessible (not intimidating)

**Layout:**
```
┌─────────────────────────────────┐
│ Your Sleep Window               │
│                                 │
│ When do you need to wake up?    │
│ [07:00]                         │
│ We'll calculate optimal bedtime │
│                                 │
│ ╔═══════════════════════════╗   │
│ ║   Go to bed at            ║   │
│ ║      21:45                ║   │
│ ║                           ║   │
│ ║ 6 complete sleep cycles   ║   │
│ ║ (9 hours)                 ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│ [●] Quality  [●] Timing  [●]   │
│                     Duration    │
└─────────────────────────────────┘
```

**Hierarchy:**
1. **Input (wake time):** Primary action
2. **Recommendation (bedtime):** Largest text, most prominent
3. **Context (cycles, hours):** Supporting info
4. **Stats:** At-a-glance validation

**Copy Principles:**
- Ask questions ("When do you need to wake up?")
- Use "you" (personal, direct)
- Explain reasoning ("We'll calculate optimal bedtime")
- Celebrate success (green dots = "You're doing great!")

### Stats Dashboard

**Design Intent:** At-a-glance validation (are my sleep choices good?)

**Visual Language:**
```
Quality  Timing  Duration
  ●        ●        ●
```

**Three Colors, Three States:**
- 🟢 Green: Optimal (keep doing this!)
- 🟡 Yellow: Okay (could improve)
- 🔴 Pink: Needs attention (but gently)

**Why Dots?**
- Minimal visual weight
- Color does the talking
- No anxiety-inducing numbers ("You failed 3/10!")
- Scannable in <1 second

---

## Interaction Design

### Inputs

**Time Picker:**
```html
<input type="time" value="07:00">
```

**Why Native?**
- Accessible by default
- Follows platform conventions
- No custom widget to maintain
- Works perfectly on mobile

**Styling:**
```css
padding: var(--space-md);
font-size: 1.25rem;
font-family: var(--font-mono);
background: var(--color-bg-elevated);
border: 2px solid transparent;
border-radius: var(--radius-sm);
transition: border-color 0.3s ease;

&:focus {
  border-color: var(--color-primary);
  outline: none;
}
```

**Focus State:**
- Visible border (not just outline)
- Brand color (blue)
- Smooth transition (not jarring)

### Buttons

**Primary Button (Install):**
```css
background: var(--color-primary);
color: var(--color-bg);
padding: var(--space-md) var(--space-xl);
font-weight: 600;
border-radius: var(--radius-sm);
transition: all 0.3s ease;

&:hover {
  background: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 159, 255, 0.3);
}
```

**Secondary Button (Set Location):**
```css
background: var(--color-bg-elevated);
color: var(--color-text);

&:hover {
  background: var(--color-primary);
  color: var(--color-bg);
}
```

**Button Philosophy:**
- Clear hierarchy (primary vs secondary)
- Generous padding (easy to tap)
- Hover feedback (confirm button is interactive)
- No uppercase (friendlier, less aggressive)

### Animations

**Transition Timing:**
```css
--transition: 0.3s ease;
```

**Respecting Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  --transition: 0s;
  * {
    animation-duration: 0.01ms !important;
  }
}
```

**Animation Principles:**
- Use for feedback (button hover, focus states)
- Use for orientation (modal appearing)
- Don't use gratuitously (no spinning logos)
- Respect user preferences (reduced motion)

---

## Responsive Design

### Breakpoints

```css
/* Mobile first - base styles for phone */
@media (min-width: 768px) {
  /* Tablet and up */
  main {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  /* Desktop */
  /* (Currently not needed - design scales naturally) */
}
```

**Why Mobile First?**
- Forces constraints (can't be lazy with space)
- Easier to add than remove
- Better performance (less to override)

### Layout Strategy

**Grid for Structure:**
```css
main {
  display: grid;
  gap: var(--space-xl);
  grid-template-columns: 1fr; /* Mobile: single column */
}

@media (min-width: 768px) {
  main {
    grid-template-columns: 1fr 1fr; /* Tablet: two columns */
  }

  .clock-container {
    grid-column: 1 / -1; /* Globe spans full width */
  }
}
```

**Flexbox for Components:**
```css
.bedtime-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}
```

### Touch Targets

**Minimum Size: 44px × 44px** (Apple HIG recommendation)

```css
button {
  min-height: 44px;
  padding: var(--space-sm) var(--space-lg);
}

input[type="time"] {
  min-height: 44px;
}
```

**Spacing Between Targets:**
- Minimum 8px gap between interactive elements
- Prevents mis-taps

---

## Copywriting Guidelines

### Voice & Tone

**Voice (Personality):**
- Calm but not boring
- Helpful but not preachy
- Scientific but not jargony
- Friendly but not childish

**Tone (Emotional Color):**
- **Onboarding:** Welcoming, excited
- **Normal use:** Neutral, supportive
- **Success:** Warm, encouraging
- **Error:** Helpful, never blaming

### Examples

**Good:**
- ✅ "When do you need to wake up?"
- ✅ "We'll calculate the optimal bedtime"
- ✅ "This gives you 6 complete sleep cycles"
- ✅ "Go to bed at 21:45"

**Bad:**
- ❌ "Enter your wake time" (robotic)
- ❌ "You should sleep 9 hours" (preachy)
- ❌ "Your sleep is suboptimal" (clinical)
- ❌ "WAKE UP AT 7:00 AM!" (aggressive)

### Microcopy

**Input Helpers:**
```html
<label>When do you need to wake up?</label>
<input type="time">
<small>We'll calculate the optimal bedtime</small>
```

**Empty States:**
```html
<span id="location-text">Unknown</span>
<button>📍 Set Location</button>
```

**Error Messages (Future):**
- ❌ "Invalid time format"
- ✅ "Please enter a time like 7:00 AM"

---

## Dark Mode Strategy

**Approach:** Automatic based on system preference

```css
:root {
  /* Night theme by default */
  --color-bg: #0f0f1e;
}

@media (prefers-color-scheme: light) {
  :root {
    /* Switch to light theme */
    --color-bg: #f5f5fa;
  }
}
```

**Why Automatic?**
- Respects user choice (they set it in OS)
- No toggle to maintain
- Works immediately
- Never wrong

**Future Enhancement:**
- Manual override (toggle in settings)
- Remember preference in localStorage
- But default should still respect system

---

## Accessibility Deep Dive

### Screen Reader Experience

**Semantic HTML:**
```html
<header role="banner">
  <h1>sleepy.help</h1>
</header>

<main role="main">
  <section aria-label="Day and night globe visualization">
    <canvas aria-label="Interactive globe showing your position">
    </canvas>
  </section>
</main>
```

**Live Regions:**
```html
<div aria-live="polite">
  <span id="bedtime-value">21:45</span>
</div>
```

When bedtime updates, screen reader announces: "Go to bed at 21:45"

### Keyboard Navigation

**Tab Order:**
1. Wake time input
2. Location button
3. Install button (if visible)

**Focus Styles:**
```css
input:focus,
button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

**Why Not `outline: none`?**
- Removes critical accessibility feature
- Users who can't use mouse rely on visible focus
- Design should embrace focus states, not hide them

### Color Contrast

**Testing:**
- Background to text: 7:1 (AAA level)
- Interactive elements: 4.5:1 minimum (AA level)
- Stats dots: Tested with color blindness simulator

**Tools:**
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- Stark (Figma plugin)

---

## Design Iteration Process

### 1. Observe
- Watch real users interact
- Note where they hesitate
- Identify confusion points

### 2. Question
- Why did they struggle here?
- What were they expecting?
- How can we make it obvious?

### 3. Prototype
- Make smallest change possible
- A/B test if unclear
- Document reasoning

### 4. Validate
- Does it actually help?
- New problems introduced?
- Accessibility maintained?

### 5. Document
- Update this file
- Share learning with team
- Build design system

---

## Future Design Considerations

### Smart Light Controls

**Visual Language:**
- Light bulb icon (universally recognized)
- Dimmer slider (familiar interaction)
- Color temperature gradient (blue → amber)

**Interaction:**
```
[💡] Bedroom Lights
    [————————◉———] Brightness: 40%
    [————◉——————] Warmth: Amber
```

### Sleep Dashboard

**Data Visualization:**
- 7-day sparkline (trend at a glance)
- No overwhelming charts
- Focus on: "better or worse than last week?"

**Comparison:**
```
Last week:  6h 30m  ●●○○○  (Fair)
This week:  8h 45m  ●●●●●  (Excellent!)
```

### Onboarding Flow

**First Visit:**
1. Show globe clock (immediate delight)
2. Prompt for wake time (one input, instant value)
3. Celebrate bedtime recommendation
4. Offer location (optional, explain why)
5. Suggest install (PWA prompt)

**No Multi-Step Forms:**
- No "Welcome! Click Next → Next → Next → Done"
- Immediate value, progressive disclosure

---

## Design Philosophy Summary

**We believe:**
- Sleep is natural, interfaces should be too
- Beauty and accessibility are not in conflict
- Speed is a feature, not a metric
- Calm technology serves users, doesn't demand attention
- Everyone deserves good sleep tools

**We design for:**
- The person reading this on a 5-year-old phone
- The teenager who needs more sleep
- The shift worker with irregular hours
- The parent juggling work and family
- The senior learning to use technology

**We don't design for:**
- Engagement metrics
- Venture capitalists
- Awards ceremonies
- Our own egos

---

**Good design helps people sleep. Everything else is decoration.**

*Last updated: 2025-12-07*
*Design lead: help <sleepy>*
