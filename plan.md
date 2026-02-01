# WSSC Water Proposal Demo – Build Plan (React SPA)

## Objectives
- Convert provided single-file HTML demo into a production-quality React SPA (frontend-only) that meets the RFP’s 9-section spec, brand, performance, and accessibility targets.
- Implement interactive chatbot (4 exact responses + typing indicator) and ROI calculator (animated count-up, default $405,000) with smooth 60fps animations.
- Add PWA Mockup section (CSS iPhone frame + “Add to Home Screen” overlay) missing from the provided HTML.
- Ship responsive UI (320px–4K), zero console errors, Lighthouse ≥95, load <2s.

## Phase 1: Core POC (Isolation)
- Decision: Not required for this Level (no backend, no external APIs, no auth). Proceed directly to Phase 2.
- Rationale: All interactions are deterministic UI behaviors in React; no third-party integration risks.

## Phase 2: Main App Development (Frontend-only)

### Architecture & Tech
- Stack: React (existing frontend template), plain CSS (App.css) for brand tokens/animations. No extra libs to keep bundle small and fast.
- Structure (components):
  - Hero, PainPoints, AIFeatures, ChatbotDemo, PWAMockup, TechStack, ROICalculator, FinalCTA, LegalFooter.
  - Utilities: animations (CSS keyframes), countUp helper (JS), smooth scroll.
- Accessibility: semantic landmarks, ARIA labels, keyboard focus outlines, min 4.5:1 contrast.
- Testability: data-testid on all interactive elements: quick question buttons, chat input/send, ROI inputs/outputs, PWA install mock button.

### Implementation Steps
1. Design Guidelines
   - Generate/finalize design tokens and micro-interactions with design_agent (colors #0066CC, #00A896; gradients; focus styles; hover lift; motion durations).
2. Project Setup
   - Keep frontend-only; no backend changes. Use React Router not required (single page with section anchors).
3. Global Styles (App.css)
   - Define CSS variables: brand colors, text, spacing; hero gradient + pulsing radial; shared card + hover lift; slide-in and typing keyframes; dark gradient for ROI.
4. Components
   - Hero: gradient background, pulsing overlay, CTA smooth-scroll to AI Features.
   - PainPoints: two cards (Current Challenges vs Our Solution) with red/green top borders.
   - AIFeatures: 6 feature cards, gradient icon tiles, hover lift.
   - ChatbotDemo: chat container, message bubbles (bot/user), typing dots, 4 quick-question buttons with EXACT responses, enter-to-send custom prompt, slide-in messages.
   - PWAMockup: CSS iPhone frame (notch, bezels), in-frame app screen, “Add to Home Screen” dialog overlay, benefits list; animate on scroll-into-view.
   - TechStack: 6 items (Next.js, Sanity, Vercel, Python APIs, Claude AI, PWA) with hover effects.
   - ROICalculator: 4 inputs with onInput handlers; formulas:
     - Call Savings = callVolume × 12 × 0.30 × costPerCall
     - Bill Savings = paperBills × 0.25 × billCost
     - Total = Call + Bill
     - Animated count-up on change (requestAnimationFrame).
   - FinalCTA: actions and key project details.
   - LegalFooter: EXACT disclaimer text per spec.
5. Behavior & Utilities
   - countUp(targetEl, from, to, 400ms–700ms, easing).
   - Smooth scroll for in-page anchor links.
   - IntersectionObserver to trigger PWAMockup entrance animations.
   - Input sanitization (non-negative; default fallbacks) for ROI.
6. Performance & Quality
   - No external dependencies; compress CSS where sensible; reuse gradients.
   - Add data-testid to interactive elements for testing_agent_v3.
   - Ensure zero console errors, responsive layout checks (320px, 768px, 1280px, 1920px).
7. Testing (end of Phase 2)
   - Use testing_agent_v3 to validate:
     - Quick-question buttons show exact responses with typing indicator.
     - Custom chat input sends and receives a generic demo response; Enter key works.
     - ROI inputs update animated outputs; default shows $405,000.
     - PWAMockup visible with iPhone frame and A2HS overlay; benefits list present.
     - Smooth scroll from Hero CTA; hover lift on feature/tech cards.
     - Accessibility basics: focusable buttons, visible focus ring, aria-labels on buttons.
     - No console errors.

### User Stories (Phase 2)
1. As a reviewer, I can click “Explore AI Features” to smooth-scroll to the AI Features section.
2. As a reviewer, I can click each of 4 quick-question buttons to see accurate, full responses with a typing indicator.
3. As a reviewer, I can type a custom question and press Enter to receive a demo response.
4. As a reviewer, I can adjust ROI inputs and see animated numbers update immediately, with defaults yielding $405,000.
5. As a reviewer, I can see a PWA iPhone mockup with an “Add to Home Screen” overlay and benefits list.
6. As a reviewer, I can hover over cards to see a lift effect.
7. As a keyboard user, I can tab through buttons and activate actions with Enter/Space, with visible focus outlines.
8. As a mobile user, the layout reflows cleanly at ~375px width.
9. As procurement, I can see the exact legal disclaimer with Encore Services LLC branding.
10. As a technical evaluator, I can open DevTools and find zero console errors.

## Implementation Steps (High-Level Checklist)
- Create React components and styles for all 9 sections.
- Wire chatbot logic with exact strings and message timing.
- Implement ROI formulas and count-up animation tied to inputs.
- Build PWAMockup visuals and scroll-into-view animation.
- Add data-testid attributes and accessibility labels.
- Run ESLint, fix warnings; verify no runtime errors.
- Execute testing_agent_v3 for end-to-end checks; address all issues.

## Next Actions
1. Run design_agent to lock visual guidelines (tokens, spacing, motion).
2. Implement frontend in one bulk write (App.js, App.css, components/*) using bulk_file_writer.
3. Tail frontend logs, run ESLint; fix any issues.
4. Call testing_agent_v3 with user stories as scenarios; fix all findings.
5. Share preview URL for final review.

## Success Criteria
- All 9 sections implemented, including PWA Mockup (CSS iPhone with A2HS overlay).
- Chatbot: 4 pre-programmed questions return EXACT responses; typing indicator; custom input works.
- ROI: live updates with animated count-up; defaults display $405,000 total savings.
- Performance: initial load <2s; Lighthouse ≥95; zero console errors.
- Accessibility: semantic landmarks, aria labels, focus outlines; contrast ≥4.5:1.
- Responsiveness: works from 320px to 4K without layout breakage.
- Testability: data-testid present for all interactive elements; testing_agent_v3 passes all scenarios.
