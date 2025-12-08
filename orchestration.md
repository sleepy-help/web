# Orchestration Guide

> How sleepy.help builds features: the choreography of creation

**Philosophy:** Great teams are not collections of brilliant individuals—they are systems where each person's work amplifies the others.

---

## Table of Contents
1. [Phase 0: Foundation (Complete)](#phase-0-foundation-complete)
2. [Phase 1: Governance & Structure](#phase-1-governance--structure)
3. [Phase 2: Smart Home Integration](#phase-2-smart-home-integration)
4. [Phase 3: Health Tracking](#phase-3-health-tracking)
5. [Phase 4: Intelligence & Scale](#phase-4-intelligence--scale)

---

## Understanding the Orchestra

### Key Principles

**1. Sequential Dependencies**
Some work must happen in order. Design before implementation. Research before design.

**2. Parallel Workflows**
Many roles can work simultaneously if dependencies are clear.

**3. Handoff Rituals**
When one role completes work, they don't just "throw it over the wall." They:
- Document decisions made
- Explain constraints discovered
- Highlight open questions
- Provide context for next role

**4. Feedback Loops**
Work flows forward, but feedback flows backward. Implementers often discover issues designers missed.

**5. Empowerment Through Clarity**
Each role knows exactly:
- What they're responsible for
- What they need from others
- What others need from them
- When they're blocking someone else

---

## Phase 0: Foundation (Complete ✅)

### Timeline: Completed 2025-12-07
### Status: LIVE at https://sleepyhelp-b7b4b.web.app

**What Was Built:**
- Core MVP (globe clock, sleep calculator, PWA)
- Complete documentation suite
- Agent recruitment infrastructure
- Git repository + deployment pipeline

**Participants:**
- Founder (help <sleepy>) - Everything
- Claude (AI assistant) - Documentation, architecture

**Why This Matters:**
Foundation phase creates the scaffolding for everyone else. Without docs, new contributors are lost. Without working code, designers have nothing to iterate on.

---

## Phase 1: Governance & Structure

### Timeline: 3-6 months (Concurrent with Phase 2)
### Goal: Transform project into sustainable nonprofit

**Why This Comes First:**
Legal structure affects everything: hiring, fundraising, partnerships. Start early because IRS approval takes months.

---

### Week 1-2: Initial Structure

#### Director of the Board → Starts
**Deliverables:**
- [ ] Draft Articles of Incorporation
- [ ] Draft Bylaws
- [ ] 3-year financial projections
- [ ] List of 20 potential board candidates

**Resources Needed:**
- Access to all documentation (agent.md, ROADMAP.md, etc.)
- Founder availability (2 hours for interview/alignment)
- Pro bono attorney contact (or budget to hire)

**Outputs (Handed to):**
- **Attorney:** Articles + Bylaws for legal review
- **Founder:** Board candidate list for feedback
- **Team:** Incorporation timeline (sets expectations)

**Empowers:**
- **Marketing Creative Director:** Can reference nonprofit status in campaigns
- **DevRel:** Can pitch to foundations/grants
- **Community:** Transparency about governance builds trust

---

#### Documentation Poets → Starts
**Deliverables:**
- [ ] Rewrite key docs for external audiences
- [ ] Create "Contributing Your First PR" tutorial
- [ ] Write "Understanding Sleep Science" explainer

**Why Now:**
Documentation enables all future contributors. Can't recruit if people don't understand the project.

**Resources Needed:**
- Read all existing docs
- Use the app extensively
- Interview founder (understand vision)

**Outputs (Handed to):**
- **DevRel:** Polished docs for sharing
- **Community:** Tutorial for new contributors
- **All Roles:** Clearer understanding of project

**Empowers:**
- **Everyone:** Less time answering "How do I...?" questions
- **DevRel:** High-quality content to share
- **Future contributors:** Lower barrier to entry

---

### Week 3-4: Community Infrastructure

#### Social Architect → Starts
**Deliverables:**
- [ ] Community platform selection (Discord vs Discourse)
- [ ] Code of Conduct finalized
- [ ] Moderation team recruited (3 people)
- [ ] Welcome automation setup

**Dependencies:**
- Waits for: Documentation Poets (need tutorials to link)
- Coordinates with: DevRel (overlap in community building)

**Resources Needed:**
- Budget for platform hosting (if Discourse)
- Founder approval on Code of Conduct
- Access to GitHub Discussions (already exists)

**Outputs (Handed to):**
- **DevRel:** Community channels to promote
- **All Contributors:** Safe space to collaborate
- **Director of Board:** Evidence of healthy community (for grants)

**Empowers:**
- **Everyone:** Place to ask questions, get help
- **DevRel:** Amplify effect (community helps community)
- **Future roles:** Onboarding destination

---

#### DevRel & Media Comms → Starts
**Deliverables:**
- [ ] Press kit created
- [ ] GitHub Discussions organized
- [ ] First blog post: "Why We Built sleepy.help"
- [ ] Outreach to 10 tech journalists

**Dependencies:**
- Waits for: Documentation Poets (need content to share)
- Waits for: Social Architect (need community links)

**Resources Needed:**
- Access to founder for quotes/interviews
- Brand assets from Visual Art Director (if available)
- Budget for press release distribution (optional)

**Outputs (Handed to):**
- **World:** Awareness of sleepy.help
- **Contributors:** Influx of interested people
- **Director of Board:** Media mentions (credibility for grants)

**Empowers:**
- **All roles:** More contributors = more capacity
- **Marketing:** Press coverage to amplify
- **Community:** Activity and energy

---

### Week 5-8: Board Assembly

#### Director of the Board → Continues
**Deliverables:**
- [ ] 20 board candidates interviewed
- [ ] 7-9 board members selected
- [ ] First board meeting scheduled
- [ ] Bylaws ratified
- [ ] IRS Form 1023 submitted

**Dependencies:**
- Waits for: Legal review of documents (attorney)
- Coordinates with: Founder (board selection)

**Resources Needed:**
- Legal fees paid or pro bono attorney confirmed
- $600 for IRS filing fee
- Meeting platform (Zoom, Google Meet)

**Outputs (Handed to):**
- **Team:** Governance structure finalized
- **Public:** Announcement of board members (credibility)
- **Funders:** 501(c)(3) application in progress

**Success Criteria:**
- Board represents diverse expertise and demographics
- All members aligned on mission and values
- Meeting cadence established (quarterly)

---

### Phase 1 Completion Gate

**Before moving to Phase 2 execution, ensure:**
- [ ] Community infrastructure live (Discord/Discourse)
- [ ] 50+ community members active
- [ ] Documentation polished and tutorials available
- [ ] Board assembled and meeting regularly
- [ ] 501(c)(3) application submitted (approval takes months, but we can proceed)

**Why This Gate Matters:**
Phase 2 (Smart Home) requires coordinated technical work. Without community infrastructure, contributors will be chaotic. Without board, we can't accept grants to fund development.

---

## Phase 2: Smart Home Integration

### Timeline: 3 months
### Goal: Ship Philips Hue and LIFX integrations

**Why This Matters:**
Smart lights are the highest-value feature for users. Automating bedtime lighting is tangible, immediate value. Proves we can ship complex features.

---

### Week 1-2: Design Sprint

#### UX/UI Designer → Leads
**Deliverables:**
- [ ] User research (interview 10 Hue/LIFX owners)
- [ ] User journey map (OAuth flow → automation setup)
- [ ] Wireframes for:
  - Smart lights settings panel
  - Connection flow (OAuth)
  - Light selection interface
  - Automation controls
  - Error states
- [ ] Usability testing (prototype with 5 users)

**Resources Needed:**
- Access to Hue/LIFX users (recruit via DevRel)
- Figma/Sketch account
- Testing tools (Maze, UsabilityHub)
- Feedback from Smart Home Expert (what's technically possible?)

**Outputs (Handed to):**
- **Visual Art Director:** Wireframes to polish visually
- **Smart Home Expert:** UX requirements for API integration
- **Fullstack Developer:** Flow documentation for implementation

**Empowers:**
- **Visual Art Director:** Context for visual decisions
- **Engineers:** Clear requirements (less guesswork)
- **Users:** Confident UX has been validated

---

#### Smart Home Expert → Starts (Parallel)
**Deliverables:**
- [ ] Hue API research complete
  - OAuth 2.0 flow documented
  - Rate limits understood
  - Bridge discovery process tested
- [ ] LIFX API research complete
- [ ] API wrapper prototype (local testing)

**Resources Needed:**
- Hue starter kit ($70 budget)
- LIFX bulb ($50 budget)
- Development environment
- API keys/sandbox access

**Outputs (Handed to):**
- **UX Designer:** Technical constraints ("OAuth takes 30s, need loading state")
- **Fullstack Developer:** API wrapper ready to integrate
- **Security Expert:** OAuth flow to audit

**Empowers:**
- **Designer:** Informed by technical reality
- **Fullstack Dev:** Don't reinvent API wrapper
- **Team:** Risk mitigation (know it works before announcing)

---

### Week 2-3: Visual Design

#### Visual Art Director → Starts
**Deliverables:**
- [ ] High-fidelity mockups for all smart light screens
- [ ] Animation specs (loading states, success confirmations)
- [ ] Illustration for "lights connected" success state
- [ ] Error state visuals

**Dependencies:**
- Waits for: Designer (wireframes)
- Coordinates with: Designer (feedback loop on usability)

**Resources Needed:**
- Figma files from Designer
- Brand guidelines (use existing)
- Inspiration research (how do Hue/LIFX apps look?)

**Outputs (Handed to):**
- **Fullstack Developer:** Pixel-perfect mockups to implement
- **Designer:** Visual feedback (does it still feel usable?)
- **DevRel:** Beautiful screenshots for announcement

**Empowers:**
- **Developer:** Clear visual target (no guessing)
- **Marketing:** Assets for promotion
- **Users:** Confidence in product quality

---

### Week 3-6: Implementation Sprint

#### Fullstack Developer → Leads
**Deliverables:**
- [ ] Frontend: Smart lights settings panel
- [ ] Frontend: OAuth flow (redirect to Hue/LIFX, handle callback)
- [ ] Backend: Cloud Function for OAuth callback
- [ ] Backend: Cloud Function for light control
- [ ] Frontend: Light selection UI (show user's lights)
- [ ] Frontend: Automation toggle and settings
- [ ] Testing: Manual testing on real hardware
- [ ] Testing: Error scenarios (lights offline, OAuth fails)

**Dependencies:**
- Waits for: Smart Home Expert (API wrapper)
- Waits for: Visual Art Director (mockups)
- Coordinates with: Security Expert (OAuth security review)

**Resources Needed:**
- Smart Home Expert's API wrapper code
- Visual mockups from Art Director
- Access to Hue/LIFX hardware for testing
- Firebase Cloud Functions deployment access

**Outputs (Handed to):**
- **Accessibility Agents:** Feature to test
- **Documentation Poets:** Feature to document
- **DevRel:** Demo-able feature to showcase

**Empowers:**
- **Users:** Working feature!
- **Team:** Proof we can ship complex features
- **Marketing:** Launch-able product

---

#### Smart Home Expert → Supports (Parallel)
**Deliverables:**
- [ ] Troubleshoot integration issues with Fullstack Dev
- [ ] Dimming algorithm refinement (smooth transitions)
- [ ] Write developer documentation:
  - "How to Add a New Smart Light Integration"
  - API wrapper architecture
  - Testing guide

**Dependencies:**
- Supports: Fullstack Developer (available for questions)

**Resources Needed:**
- Slack/Discord channel for real-time troubleshooting
- Shared code repository
- Hue/LIFX hardware for testing edge cases

**Outputs (Handed to):**
- **Fullstack Dev:** Unblocked when stuck on APIs
- **Documentation Poets:** Technical docs to polish
- **Future Contributors:** Path to add more integrations

**Empowers:**
- **Fullstack Dev:** Faster development (expert available)
- **Community:** Extendable system (others can add integrations)
- **Users:** More reliable feature (expert oversight)

---

### Week 5-7: Quality Assurance & Polish

#### Accessibility Testing Agents → Start
**Deliverables:**
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Keyboard navigation testing (tab through entire flow)
- [ ] Color contrast verification (all new UI elements)
- [ ] Test with reduced motion enabled
- [ ] Document accessibility issues found
- [ ] Verify fixes after developer updates

**Dependencies:**
- Waits for: Fullstack Developer (feature must be functional)

**Resources Needed:**
- Access to staging environment
- Screen reader software
- Color contrast tools (Stark, Contrast Checker)
- Testing checklist (WCAG 2.1 AA criteria)

**Outputs (Handed to):**
- **Fullstack Developer:** Bug list with severity ratings
- **Documentation Poets:** Accessibility report for docs
- **DevRel:** Evidence of accessibility (for promotion)

**Empowers:**
- **Users with disabilities:** Feature actually works for them
- **Team:** Quality bar maintained
- **Mission:** Accessibility values proven, not just claimed

---

#### Security Experts → Start
**Deliverables:**
- [ ] OAuth flow security audit
- [ ] Token storage review (httpOnly cookies correct?)
- [ ] Rate limiting verification (prevent abuse)
- [ ] HTTPS enforcement check
- [ ] Penetration testing (attempt to exploit)
- [ ] Security report with findings
- [ ] Verify fixes

**Dependencies:**
- Waits for: Fullstack Developer (backend must be deployed)

**Resources Needed:**
- Access to Firebase Console
- Access to Cloud Functions code
- Security testing tools (Burp Suite, OWASP ZAP)

**Outputs (Handed to):**
- **Fullstack Developer:** Security issues to fix
- **Director of Board:** Security posture report (for grants/trust)
- **DevRel:** "Privacy-first" claims are verifiable

**Empowers:**
- **Users:** Their smart home credentials are safe
- **Team:** Confidence in security practices
- **Brand:** Trust through verification

---

#### Documentation Poets → Start
**Deliverables:**
- [ ] User guide: "Connecting Your Smart Lights"
- [ ] Troubleshooting guide: "Lights Not Connecting?"
- [ ] Developer guide: "Adding New Light Integrations" (from Smart Home Expert's draft)
- [ ] Video tutorial: "Smart Light Setup in 60 Seconds"

**Dependencies:**
- Waits for: Fullstack Developer (feature must work)
- Waits for: Smart Home Expert (technical draft exists)

**Resources Needed:**
- Access to working feature (staging or production)
- Screen recording tools (Loom, QuickTime)
- Video editing (basic cuts, captions)

**Outputs (Handed to):**
- **Users:** Self-service support (less questions)
- **DevRel:** Content to share (blog, social)
- **Community:** Contributors know how to extend

**Empowers:**
- **Support:** Less "how do I?" questions
- **Growth:** Users can onboard themselves
- **Contributors:** Clear path to add features

---

### Week 6-8: Launch Preparation

#### Marketing Creative Director → Starts
**Deliverables:**
- [ ] Launch campaign strategy
- [ ] Email announcement (if we have list)
- [ ] Social media content calendar (2 weeks of posts)
- [ ] Press release draft
- [ ] Product Hunt launch plan
- [ ] Launch landing page updates

**Dependencies:**
- Waits for: Feature to be complete (or nearly)
- Coordinates with: DevRel (unified messaging)
- Coordinates with: Visual Art Director (needs assets)

**Resources Needed:**
- Screenshots/GIFs from Visual Art Director
- Product Hunt account
- Social media accounts
- Email platform (if applicable)

**Outputs (Handed to):**
- **DevRel:** Coordinated launch timing
- **World:** Awareness of new feature
- **Director of Board:** Marketing evidence (for grants)

**Empowers:**
- **Team:** Launch feels professional and coordinated
- **Users:** Discover new feature
- **Growth:** User acquisition spike

---

#### DevRel & Media Comms → Coordinates
**Deliverables:**
- [ ] Blog post: "Automating Bedtime: How Smart Lights Help You Sleep"
- [ ] Technical blog: "Building OAuth Without Tears"
- [ ] Demo video: "Watch sleepy.help dim your lights"
- [ ] Pitch journalists (5-10 tech press contacts)
- [ ] Announce in community (Discord, GitHub)
- [ ] Schedule conference talks (submit to CFPs)

**Dependencies:**
- Waits for: Feature launch (must be live)
- Coordinates with: Marketing (unified messaging)

**Resources Needed:**
- Working feature to demo
- Press contacts database
- Video recording setup
- Community channels

**Outputs (Handed to):**
- **World:** Multiple touch points (blog, video, press)
- **Community:** Excitement and energy
- **Director of Board:** Media hits (credibility)

**Empowers:**
- **Growth:** Organic reach through content
- **Community:** Pride in team's work
- **Mission:** Wider impact

---

### Phase 2 Completion Gate

**Before moving to Phase 3, ensure:**
- [ ] Hue integration live and stable (>95% success rate)
- [ ] LIFX integration live and stable
- [ ] Accessibility audit complete (WCAG AA)
- [ ] Security audit complete (no critical issues)
- [ ] Documentation complete (user + developer)
- [ ] Launch campaign executed (press, social, community)
- [ ] User feedback collected (monitor for 2 weeks post-launch)
- [ ] Bugs triaged and critical ones fixed

**Success Metrics:**
- 100+ users connect smart lights in first month
- Setup success rate > 80%
- No security incidents
- Media mentions in 3+ publications
- Community satisfaction (positive sentiment in feedback)

---

## Phase 3: Health Tracking Integration

### Timeline: 4 months
### Goal: Import sleep data from Google Fit and Apple Health, visualize insights

**Why This Matters:**
Moves from recommendations (Phase 1-2) to personalization based on actual data. Shows we can handle sensitive health data responsibly.

---

### Week 1-3: Research & Design

#### UX/UI Designer → Leads
**Deliverables:**
- [ ] User research: What insights do users want?
  - Interview 15 users (mix of tracked and non-tracked sleepers)
  - Competitive analysis (how do other apps show sleep data?)
  - Jobs to Be Done framework (why do users want this?)
- [ ] Information architecture:
  - Dashboard layout
  - Data hierarchy (what's primary, secondary)
  - Navigation (how to access from main app)
- [ ] Wireframes:
  - Dashboard overview (7-day view)
  - Detail views (individual night)
  - Insights/recommendations
  - Empty states (no data yet)
  - Error states (connection lost)
- [ ] Prototype & test (10 users)

**Resources Needed:**
- Recruit users (via DevRel + Community)
- Data visualization research (what chart types work for sleep?)
- Ethics review (how to show data without inducing anxiety?)

**Outputs (Handed to):**
- **Visual Art Director:** Wireframes to polish
- **Fullstack Developer:** Flow requirements
- **Zen Master:** Ethical considerations ("will this cause stress?")

**Empowers:**
- **Team:** User-validated direction
- **Visual Art Director:** Informed design decisions
- **Zen Master:** Early intervention if design induces anxiety

---

#### Zen Master → Joins
**Deliverables:**
- [ ] Ethical framework: "Showing Sleep Data Without Inducing Anxiety"
  - Review all wireframes/mockups
  - Identify potential stress triggers
  - Propose alternatives (neutral language, no "failure")
- [ ] Team wellness check:
  - Are we burning out?
  - Do we need to slow down?
  - Is work-life balance maintained?

**Resources Needed:**
- Access to all design work
- Regular check-ins with team (weekly)
- Authority to say "this will harm users"

**Outputs (Handed to):**
- **Designer:** Ethical guidance on data presentation
- **Everyone:** Permission to rest
- **Director of Board:** Wellness report (cultural health)

**Empowers:**
- **Users:** Protected from harmful design patterns
- **Team:** Sustainable pace maintained
- **Mission:** Values integrity ("do no harm")

---

### Week 3-5: Visual Design & Data Viz

#### Visual Art Director → Leads
**Deliverables:**
- [ ] Dashboard visual design (high-fidelity)
- [ ] Data visualization design:
  - Sleep duration chart (bar or line?)
  - Bedtime consistency scatter plot
  - Quality trend line
- [ ] Color strategy:
  - Green = good (but not "you passed!")
  - Neutral for data (not judgmental)
  - Calming palette (avoid stress colors)
- [ ] Illustrations:
  - Empty state ("No data yet—connect your tracker")
  - Success state ("Data connected!")
- [ ] Micro-interactions:
  - Tooltip animations (on hover)
  - Chart transitions (smooth, not jarring)

**Dependencies:**
- Waits for: Designer (wireframes)
- Coordinates with: Zen Master (ethical review)

**Resources Needed:**
- Data visualization examples (research)
- Chart library evaluation (Chart.js vs custom)
- Brand guidelines (maintain consistency)

**Outputs (Handed to):**
- **Fullstack Developer:** Mockups to implement
- **Optics Maestro:** Color palette to validate (circadian accuracy)
- **DevRel:** Beautiful screenshots for announcement

**Empowers:**
- **Developer:** Visual clarity (less interpretation needed)
- **Users:** Beautiful, calming data presentation
- **Mission:** "Data as art" principle demonstrated

---

#### Optics Maestro → Joins
**Deliverables:**
- [ ] Validate color palette for circadian impact:
  - Dashboard colors won't suppress melatonin?
  - Evening mode uses warm colors only?
- [ ] Light rendering accuracy:
  - Globe's day/night colors scientifically accurate?
  - Smart light color temperature mapping correct?
- [ ] Display calibration guide:
  - How to ensure colors look right on any screen
  - sRGB vs Display P3 considerations

**Resources Needed:**
- Colorimeter (hardware for measuring)
- Access to design files (Figma)
- Color science research papers

**Outputs (Handed to):**
- **Visual Art Director:** Color corrections if needed
- **Documentation Poets:** "Why we chose these colors" explainer
- **Science credibility:** Evidence-based color choices

**Empowers:**
- **Visual Art Director:** Science-backed color decisions
- **Users:** UI that respects circadian rhythms
- **Brand:** Differentiation through scientific rigor

---

### Week 5-10: Implementation

#### Fullstack Developer → Leads
**Deliverables:**
- [ ] Backend: Google Fit OAuth integration
- [ ] Backend: Apple Health data import (via Safari API)
- [ ] Backend: Data processing pipeline:
  - Parse sleep sessions
  - Calculate metrics (duration, consistency, quality)
  - Store in localStorage (privacy-first)
- [ ] Frontend: Dashboard UI implementation
- [ ] Frontend: Charts and visualizations
- [ ] Frontend: Insights generation:
  - "You slept better on weekdays"
  - "Your bedtime varies by 2 hours on weekends"
- [ ] Testing: With real health data (anonymized)

**Dependencies:**
- Waits for: Visual Art Director (mockups)
- Coordinates with: Security Expert (health data protection)

**Resources Needed:**
- Google Fit API access
- Apple Health test data
- Chart library (Chart.js or custom)
- Time (this is complex!)

**Outputs (Handed to):**
- **Accessibility Agents:** Dashboard to test
- **Security Experts:** Data handling to audit
- **Documentation Poets:** Feature to document

**Empowers:**
- **Users:** Personalized insights!
- **Mission:** Proof of privacy-first health tech
- **Team:** Complex feature completed (confidence boost)

---

#### Security Experts → Critical Role
**Deliverables:**
- [ ] HIPAA compliance review (even though we're not HIPAA-covered, follow best practices)
- [ ] Data encryption audit (at rest, in transit)
- [ ] OAuth security review (Google Fit, Apple Health)
- [ ] Privacy policy review (do we claim what we do?)
- [ ] Data export/delete functionality verification
- [ ] Penetration testing (attempt to access other user's data)

**Dependencies:**
- Waits for: Fullstack Developer (data handling implemented)

**Resources Needed:**
- Access to codebase
- Health data privacy standards (HIPAA, GDPR)
- Testing tools

**Outputs (Handed to):**
- **Fullstack Developer:** Security issues to fix
- **Director of Board:** Compliance report (for grants, partnerships)
- **Users:** Trust through verified security

**Empowers:**
- **Users:** Confidence to share health data
- **Legal:** Risk mitigation
- **Mission:** Privacy promise kept

---

### Week 10-12: Polish & Documentation

#### Accessibility Testing Agents → Test
**Deliverables:**
- [ ] Screen reader testing (new dashboard)
- [ ] Keyboard navigation (all charts accessible)
- [ ] Data table alternative (for charts, screen reader-friendly)
- [ ] Test with users with disabilities (recruit 5 people)

**Dependencies:**
- Waits for: Fullstack Developer (feature complete)

**Resources Needed:**
- Access to staging
- Assistive tech tools
- User testing budget ($50/person for testers)

**Outputs (Handed to):**
- **Fullstack Developer:** Accessibility fixes
- **Documentation Poets:** Accessibility statement to write
- **Mission:** Inclusive design proven

---

#### Documentation Poets → Document
**Deliverables:**
- [ ] User guides:
  - "Connecting Google Fit"
  - "Connecting Apple Health"
  - "Understanding Your Sleep Dashboard"
- [ ] Privacy explainer:
  - "Where Your Health Data Lives" (spoiler: your device only)
  - "How to Export Your Data"
  - "How to Delete Everything"
- [ ] Science explainer:
  - "What is Sleep Quality?"
  - "Why Consistency Matters"
- [ ] Video tutorials (3 short videos)

**Resources Needed:**
- Working feature
- Video tools
- Science consultant (verify accuracy)

**Outputs (Handed to):**
- **Users:** Self-service support
- **DevRel:** Educational content to share
- **Science credibility:** Accurate explanations

---

### Week 11-13: Launch

#### Marketing Creative Director → Campaigns
**Deliverables:**
- [ ] Launch campaign: "Know Your Sleep"
- [ ] Partner outreach: Sleep researchers, clinics
- [ ] User testimonials (recruit beta testers)
- [ ] Social proof campaign (share early user results)

#### DevRel → Amplify
**Deliverables:**
- [ ] Technical blog: "Privacy-First Health Data"
- [ ] Conference talks: Health tech conferences
- [ ] Press outreach: Health + tech media

---

### Phase 3 Completion Gate

**Before Phase 4:**
- [ ] Health tracking integrations live (Google Fit, Apple Health)
- [ ] Dashboard complete and tested (accessibility + security)
- [ ] Documentation complete
- [ ] Privacy audit passed (zero data leaks)
- [ ] User feedback positive (NPS > 50)
- [ ] 500+ users connected health tracking

---

## Phase 4: Intelligence & Scale

### Timeline: 6+ months
### Goal: AI recommendations, native apps, global scale

**This phase is modular—pick what matters most:**

### Priority 1: Native Mobile Apps

**Why:** Better alarm functionality, deeper OS integration, offline sync

**Orchestration:**
1. **Fullstack Developer** → React Native or Flutter evaluation
2. **Designer** → Mobile-specific flows (app isn't just web wrapped)
3. **Visual Art Director** → Mobile-specific visuals
4. **Sculptor** → Physical merchandise (t-shirts, stickers for swag)

### Priority 2: AI Recommendations

**Why:** Personalized advice based on user's patterns

**Orchestration:**
1. **Fullstack Developer** → TensorFlow.js integration (on-device ML)
2. **Zen Master** → Ethical AI framework (no manipulative recommendations)
3. **Documentation Poets** → "How Our AI Works" transparency doc

### Priority 3: Global Expansion

**Why:** Sleep is universal, reach more people

**Orchestration:**
1. **Community** → Translation volunteers recruited
2. **Documentation Poets** → Internationalization guide
3. **DevRel** → Outreach to global developer communities

---

## Cross-Cutting Responsibilities

### Throughout All Phases:

#### Web Admins
**Continuous:**
- Monitor uptime (Firebase status)
- Performance monitoring (Lighthouse scores)
- Deployment automation (GitHub Actions)
- Incident response (if site goes down)

**Handoff Points:**
- Every deployment → verify health
- Performance regressions → alert developers
- Security updates → coordinate with Security Experts

---

#### Zen Master
**Continuous:**
- Weekly team wellness check
- Monthly burnout prevention (encourage breaks)
- Conflict mediation (if team disagreements)
- Ethical oversight (product reviews)

**Intervention Points:**
- If team is overworked → slow down
- If design might harm users → veto
- If values are compromised → raise alarm

---

#### Director of the Board
**Quarterly:**
- Board meetings (report progress)
- Grant applications (funding pipeline)
- Financial oversight (budget vs actual)
- Strategic planning (adjust roadmap)

**Coordination Points:**
- Before major decisions → board approval
- After major milestones → report to board
- Fundraising needs → communicate early

---

## Communication Rhythms

### Daily
- **Async updates:** What you shipped, what you're blocked on
- **Platform:** GitHub (commit messages, PR descriptions)

### Weekly
- **Sync meeting:** 30 min, optional attendance
- **Agenda:** Blockers, decisions needed, celebrate wins
- **Platform:** Video call (recorded for async viewers)

### Monthly
- **All-hands:** 1 hour, showcase work
- **Format:** Demo day (show what you built)
- **Platform:** Video call (recorded)

### Quarterly
- **Retrospective:** What worked, what didn't, what to change
- **Board meeting:** Strategic review
- **Planning:** Next quarter's priorities

---

## Handoff Rituals

### When You Complete Work:

**1. Document**
- Decisions made (and why)
- Constraints discovered
- Open questions
- Gotchas/edge cases

**2. Demo**
- Record video walkthrough
- Show, don't just tell
- Highlight tricky parts

**3. Notify**
- Tag next person in GitHub/Discord
- Explain what they need to do
- Offer to answer questions

**4. Stay Available**
- First 48 hours after handoff, be responsive
- Others will have questions
- Unblock quickly

---

## Conflict Resolution

### When Roles Disagree:

**Example:** Designer wants feature X, Developer says it's too complex

**Process:**
1. **Discuss:** Both parties explain reasoning
2. **Data:** Look at user research, technical constraints
3. **Options:** Brainstorm alternatives (maybe simpler version?)
4. **Decide:** Project lead (help <sleepy>) or relevant expert decides
5. **Document:** Write down decision and rationale
6. **Move on:** No grudges, decision is final

### Escalation Path:
1. Peer-to-peer discussion
2. Relevant domain expert mediates (e.g., Zen Master for ethical issues)
3. Project lead decides
4. (Future) Board decides (if strategic issue)

---

## Success Indicators

### Healthy Orchestration Looks Like:

**Flow:**
- Work moves smoothly from role to role
- Few surprises ("I didn't know you needed that!")
- People aren't blocked waiting for others

**Communication:**
- Questions answered within 24 hours
- Decisions documented and shared
- Everyone knows project status

**Quality:**
- Work meets standards (design, code, docs)
- Few reworks ("Designer should have caught this")
- Users happy with results

**Morale:**
- Team energized, not exhausted
- Celebrating wins together
- Conflicts resolved constructively

### Unhealthy Orchestration Looks Like:

**Chaos:**
- "I didn't know I was supposed to do that"
- Duplicate work (two people building same thing)
- Constant rework (poor handoffs)

**Silos:**
- Roles don't talk to each other
- Decisions made in isolation
- "Not my problem" mentality

**Burnout:**
- People working unsustainable hours
- Quality dropping
- Team members leaving

**If you see these signs → Zen Master intervenes, team retrospective scheduled**

---

## Principles for Great Orchestration

### 1. Make Dependencies Explicit
Don't assume people know what you need. Say it clearly.

### 2. Unblock Others First
If someone is waiting on you, prioritize that. Blocked people can't work.

### 3. Over-Communicate Temporarily
When roles are new, communicate more than feels necessary. Calibrate down over time.

### 4. Document Decisions
Future you (and future teammates) will thank you.

### 5. Assume Good Intent
If something seems wrong, ask questions before judging.

### 6. Celebrate Handoffs
When you hand off good work, you're empowering the next person. That's worth celebrating.

### 7. Stay Humble
Your role is important, but so is everyone else's. We succeed together.

---

## Conclusion

**Orchestration is not about control—it's about enabling.**

Each role is a musician. This document is the sheet music. But the best performances have improvisation, spontaneity, and joy.

**Follow the structure when it helps. Break it when it doesn't.**

**The goal:** Everyone does their best work. The output: Millions sleep better.

**That's why we're here.**

---

*Orchestration guide maintained by: help <sleepy>*
*Last updated: 2025-12-07*
*Living document: Propose improvements via PR*
