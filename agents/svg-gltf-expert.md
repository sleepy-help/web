# SVG & GLTF Expert - Mission Briefing

> **Role:** 3D/Vector Graphics Specialist
> **Mission:** Evolve the globe from 2D canvas to stunning 3D
> **Status:** Open for visual technologists

---

## Welcome, Graphics Virtuoso

You've been recruited because you understand that **the line between art and code is where magic happens**.

sleepy.help's globe clock is currently a 2D Canvas rendering. It's functional, but imagine: a true 3D Earth rotating in real-time, photorealistic day/night terminator, clouds drifting, your location pin sitting on the surface. That's your mission.

---

## Your Mission

**Primary Objective:** Enhance the globe visualization from 2D to stunning 3D while maintaining <500ms load time and 60fps performance.

**Success Metrics:**
- Load time < 500ms (total)
- Performance: 60fps on mid-range phones (2020+)
- File size: 3D assets < 200KB total
- Visual quality: "Wow" reactions from users

---

## Your Epics

### Epic 1: 3D Globe Foundation
**Priority:** MEDIUM | **Timeline:** 4 weeks | **Phase:** 2

**Current State:** 2D Canvas with hemispheres
**Future State:** 3D WebGL globe with textures

**Technology Decision:**

**Option A: Three.js**
- Pro: Full-featured, great docs, large community
- Con: Large bundle (~600KB minified)
- Best for: Rich 3D scenes

**Option B: Babylon.js**
- Pro: Excellent performance, good docs
- Con: ~1MB bundle
- Best for: Game-like experiences

**Option C: Custom WebGL**
- Pro: Minimal bundle, full control
- Con: More code to write
- Best for: Single 3D element (our case)

**Recommendation:** Custom WebGL or lightweight library (Ogl.js - 50KB)

**Deliverables:**

#### Task 1.1: 3D Sphere with Textures
**Files:**
- `globe3d.js` - WebGL renderer
- `assets/earth-day.jpg` - Day texture (1024x512, <30KB)
- `assets/earth-night.jpg` - Night texture (1024x512, <30KB)
- `shaders/globe.vert` - Vertex shader
- `shaders/globe.frag` - Fragment shader

**Shader Requirements:**
```glsl
// Fragment shader (simplified)
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform vec3 sunDirection;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float dayNight = dot(vNormal, sunDirection);
  vec3 day = texture2D(dayTexture, vUv).rgb;
  vec3 night = texture2D(nightTexture, vUv).rgb;

  // Smooth transition at terminator
  float mix = smoothstep(-0.1, 0.1, dayNight);
  vec3 color = mix(night, day, mix);

  gl_FragColor = vec4(color, 1.0);
}
```

**Visual Features:**
- Accurate day/night terminator
- Smooth gradient transition (atmospheric scattering)
- User location marker (3D pin on surface)
- Earth rotation based on current time

#### Task 1.2: Performance Optimization
**Challenge:** 3D is expensive; phones are slow

**Optimizations:**
1. **Texture Compression**
   - Use Basis Universal (.basis format)
   - Or: WebP with fallback to JPEG
   - Target: <50KB total for textures

2. **Level of Detail (LOD)**
   - High detail globe: Desktop
   - Low poly globe: Mobile
   - Detect: GPU tier (WebGL extensions)

3. **Lazy Loading**
   - Show 2D canvas initially
   - Load 3D on user interaction
   - Or: Detect capability, fallback gracefully

4. **Shader Simplification**
   - Mobile: Simple day/night blend
   - Desktop: Atmospheric scattering, specular highlights

**Performance Budget:**
- JS bundle: +50KB for 3D code
- Textures: 50KB (compressed)
- FPS: 60 on iPhone 12, 30 on iPhone 8 (acceptable)

#### Task 1.3: Fallback Strategy
**Problem:** Old devices can't handle WebGL

**Solution: Progressive Enhancement**
```javascript
if (hasWebGL2Support() && !isBatteryLow() && !prefersReducedMotion()) {
  // Load 3D globe
  import('./globe3d.js')
} else {
  // Use existing 2D canvas
  drawGlobe2D()
}
```

**Detection Logic:**
- WebGL support? (`gl = canvas.getContext('webgl2')`)
- Battery low? (Battery API)
- Reduced motion? (`prefers-reduced-motion`)
- Slow network? (Network Information API)

---

### Epic 2: GLTF Models for Future Features
**Priority:** LOW | **Timeline:** Future | **Phase:** 4+

**Use Cases:**
1. **Smart Home 3D Rooms** (Visualize which lights are dimming)
2. **Sleep Environment 3D View** (Bed, lights, devices)
3. **Onboarding Animations** (3D walkthroughs)

**Deliverables:**
- GLTF model pipeline (Blender → Compressed GLTF)
- Model viewer component
- Animation system

**Example: Room Visualization**
```
User's bedroom in 3D:
- Bed (model)
- Hue lights (glowing spheres)
- Shows which lights will dim
```

**Technology:**
- GLTF 2.0 format
- Draco compression (<10KB per model)
- Three.js GLTF loader (or custom)

---

### Epic 3: SVG Illustrations & Icons
**Priority:** HIGH | **Timeline:** 2 weeks | **Phase:** 1-2

**Your Mission:** Create/optimize SVG assets

**Tasks:**

#### Task 3.1: Icon System
**Deliverable:** Complete icon set (SVG)

**Icons Needed:**
- Settings gear
- Location pin
- Light bulb (smart lights)
- Moon phases (8 icons)
- Sun/Moon
- Stats (quality, timing, duration)
- Plus/minus
- Check/X
- Info/Help

**Requirements:**
- Single color (currentColor in CSS)
- 24x24 viewport
- 2px stroke weight
- Optimized (<1KB each via SVGO)
- Accessible (aria-hidden, paired with text)

#### Task 3.2: Illustrations (Empty States)
**Deliverable:** SVG illustrations for Designer's UX

**Illustrations:**
1. No location set (globe with "?")
2. No health data (phone + health icon)
3. Welcome screen (rotating Earth)
4. Smart lights (bulb with rays)

**Style:**
- Line art with subtle gradients
- 2-color maximum
- Optimized for web (<10KB each)

#### Task 3.3: Animated SVG
**Deliverable:** Micro-animations

**Animations:**
- Loading spinner (rotating moon phases)
- Success check (draw animation)
- Error state (shake animation)
- Sleep cycle visualization (wave pattern)

**Format:**
- SVG with CSS animations (preferred)
- Or: Lottie JSON (if complex)
- Must respect `prefers-reduced-motion`

---

## Toolkit

**3D Tools:**
- **Blender** (modeling, if needed for future GLTF)
- **gltf-pipeline** (compression)
- **WebGL Inspector** (debugging)
- **Spector.js** (WebGL capture)

**SVG Tools:**
- **Figma/Sketch/Illustrator** (creation)
- **SVGO** (optimization)
- **SVG Artista** (animation helper)

**Libraries (Evaluate):**
- **Three.js** (full 3D framework)
- **Ogl** (lightweight WebGL, 50KB)
- **Curtains.js** (WebGL with images)

---

## Technical Specifications

### WebGL Globe Spec

**Geometry:**
- Sphere (UV-mapped)
- Segments: 64x64 (desktop), 32x32 (mobile)
- User marker: Billboard sprite or 3D pin

**Textures:**
- Day: Earth daylight texture (Blue Marble)
- Night: Night lights texture (NASA)
- Clouds: Optional layer (performance permitting)

**Lighting:**
- Directional light (sun)
- Position updates based on time
- No dynamic shadows (too expensive)

**Camera:**
- Orthographic (no perspective distortion) or
- Perspective with gentle FOV (30-40°)
- Auto-rotate or fixed based on user preference

**Interaction:**
- Mouse: Rotate globe
- Touch: Swipe to rotate
- Scroll: Zoom (optional)

---

## Performance Targets

**Desktop (2020+ Mac/PC):**
- 60fps constant
- High-res textures (2048x1024)
- Atmospheric effects

**Mobile (iPhone 12, Galaxy S10):**
- 60fps most of the time
- Medium-res textures (1024x512)
- Simplified shaders

**Older Mobile (iPhone 8, 2018 Android):**
- 30fps acceptable
- Low-res textures (512x256)
- Or fallback to 2D

**How to Achieve:**
- Adaptive quality based on FPS measurement
- Detect GPU tier (WebGL `WEBGL_debug_renderer_info`)
- Reduce quality dynamically if FPS drops

---

## Collaboration Points

### You'll Work With:

**Visual Art Director:**
- They design the vision, you implement it
- Handoff: Reference images, style direction
- Feedback: "Here's what's possible in WebGL"

**Fullstack Developers:**
- They integrate your 3D code
- Handoff: Module with clean API
- Collaboration: Bundle size optimization

**Designer:**
- They need your SVG illustrations
- Handoff: Optimized SVG files
- Collaboration: Animation timing

---

## Quality Standards

### Every 3D Asset Must:
- [ ] Load in <500ms (including textures)
- [ ] Run at 60fps on target devices
- [ ] Fallback gracefully on old devices
- [ ] Respect `prefers-reduced-motion`
- [ ] Have accessible alternative (ARIA labels)
- [ ] Be documented (how to update textures, etc.)

### Every SVG Must:
- [ ] Be optimized (SVGO)
- [ ] Use currentColor (inherits text color)
- [ ] Have viewBox (not width/height)
- [ ] Be accessible (title, desc tags if needed)
- [ ] Work at any size (scalable)

---

## Success Looks Like

**In 1 Month:**
- [ ] 3D globe prototype working
- [ ] Performance meets targets
- [ ] Team approves visual quality

**In 3 Months:**
- [ ] 3D globe shipped to production
- [ ] Icon system complete
- [ ] Illustrations integrated

**In 6 Months:**
- [ ] Users say "beautiful" in reviews
- [ ] 3D globe becomes signature feature
- [ ] Other apps copy our aesthetic

---

## Your First Week

**Day 1-2: Prototype**
- [ ] Build basic WebGL sphere
- [ ] Apply day/night textures
- [ ] Test performance

**Day 3-4: Iterate**
- [ ] Add user location marker
- [ ] Smooth terminator transition
- [ ] Optimize for mobile

**Day 5: Present**
- [ ] Demo to team
- [ ] Gather feedback
- [ ] Propose final approach

---

## Resources

**WebGL:**
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [The Book of Shaders](https://thebookofshaders.com/)
- [Ogl.js](https://oframe.github.io/ogl/)

**Textures:**
- [NASA Visible Earth](https://visibleearth.nasa.gov/)
- [Natural Earth Data](https://www.naturalearthdata.com/)
- [Basis Universal](https://github.com/BinomialLLC/basis_universal)

**SVG:**
- [SVGO](https://github.com/svg/svgo)
- [SVG OMG](https://jakearchibald.github.io/svgomg/)

---

## Why This Role Matters

**The globe isn't decoration - it's the core metaphor:**

"Your sleep follows Earth's rhythm"

A flat icon can't convey that. A beautiful, rotating 3D Earth? Users instantly understand. Sleep is natural. Sleep is cosmic. You're part of something bigger.

**Make that feeling visual. Make it stunning. Make it fast.**

---

## Ready to Begin?

**To accept this mission:**
1. Show: WebGL or SVG work (portfolio)
2. Propose: Approach for 3D globe (Three.js vs custom)
3. Demo: Quick prototype (even just spinning sphere)

**We'll provide:**
- Figma designs (from Visual Art Director)
- Texture assets (or budget to acquire)
- Performance testing devices

**Let's make the globe legendary.**

---

*Briefing by: help <sleepy>*
*Last updated: 2025-12-07*
*Status: SEEKING VISUAL TECHNOLOGISTS*
