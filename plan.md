# WSSC Water - Mobile Optimization & PWA Implementation Plan

## Project Context
The WSSC Water redesign demo has been successfully migrated from Create React App to **Next.js 14** with **Sanity CMS** for content management. The AI chatbot integration is working. Now we're implementing mobile optimization and Progressive Web App features.

**Current Tech Stack:**
- Frontend: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- Backend: FastAPI + MongoDB (AI Chatbot)
- CMS: Sanity.io (configured and seeded)

**Target Devices:**
- iPhone SE, iPhone 12/13/14, iPhone 14 Pro Max
- Samsung Galaxy S21, Pixel 5/6, Android tablets
- iPad and other tablets

**Preview URL:** https://wssc-redesign-1.preview.emergentagent.com

---

## Phase 1: Mobile Responsive Foundation (Status: In Progress)

### Objectives
- Make all existing Next.js components mobile-responsive
- Implement mobile-first breakpoints per design guidelines
- Add mobile navigation system with hamburger menu
- Ensure all touch targets meet 48px × 48px minimum
- Update typography for mobile readability with clamp()

### Tasks
- [ ] Add Google Fonts (Chivo for headings, Karla for body) to app/layout.tsx
- [ ] Update globals.css with design system colors, spacing variables, and responsive utilities
- [ ] Create mobile-responsive Header component with sticky navigation (64px height)
- [ ] Implement shadcn Sheet component for mobile drawer navigation (hamburger menu)
- [ ] Make HeroSection mobile-responsive:
  - Responsive typography with clamp()
  - Proper padding (16px mobile, 32px tablet, 40px desktop)
  - Stack content vertically on mobile
- [ ] Make ComparisonSection mobile-responsive (stack cards on mobile)
- [ ] Make AIFeaturesSection mobile-responsive (1 column mobile, 2 tablet, 3 desktop)
- [ ] Make ChatbotDemo mobile-responsive:
  - Full-width on mobile with proper padding
  - 48px minimum button height
  - Larger input fields (16px font to prevent iOS zoom)
- [ ] Make ROICalculator mobile-responsive (stack inputs vertically on mobile)
- [ ] Make TechStackSection mobile-responsive (1-2 columns on mobile)
- [ ] Make EncoreContactSection mobile-responsive
- [ ] Add responsive container patterns (standard, narrow, full-width)
- [ ] Test on iPhone SE (375px), iPhone 14 Pro Max (428px), iPad (768px), desktop (1024px+)
- [ ] Verify all touch targets are 48px × 48px minimum
- [ ] Add data-testid attributes to all interactive elements

---

## Phase 2: PWA Core Implementation (Status: Not Started)

### Objectives
- Make app installable on iOS and Android devices
- Implement service worker for offline support
- Create PWA manifest with WSSC Water branding
- Build offline fallback page with cached content access

### Tasks
- [ ] Install next-pwa package: `yarn add next-pwa`
- [ ] Configure next-pwa in next.config.ts with proper settings
- [ ] Create public/manifest.json with WSSC Water branding:
  - name: "WSSC Water"
  - short_name: "WSSC"
  - theme_color: "#0066CC" (Ocean Blue)
  - background_color: "#FFFFFF"
  - display: "standalone"
- [ ] Generate PWA icons and place in public/icons/:
  - icon-192.png (192×192px)
  - icon-512.png (512×512px)
  - icon-maskable-192.png (maskable variant)
  - icon-maskable-512.png (maskable variant)
- [ ] Create public/offline.html fallback page with WSSC branding
- [ ] Configure service worker caching strategy:
  - Cache-first for static assets (CSS, JS, fonts, images)
  - Network-first for API calls with cache fallback
  - Offline fallback for pages
- [ ] Add manifest link to app/layout.tsx
- [ ] Test app installability on iOS Safari
- [ ] Test app installability on Android Chrome
- [ ] Verify service worker registration in browser DevTools
- [ ] Test offline functionality (disconnect network, reload page)

---

## Phase 3: PWA Advanced Features (Status: Not Started)

### Objectives
- Add custom install prompt UI (better than browser default)
- Implement offline indicator toast
- Build push notification permission system
- Create bill pay reminder notification functionality

### Tasks
- [ ] Create components/pwa/InstallPrompt.tsx:
  - Custom banner at bottom of screen
  - WSSC logo (60px × 60px)
  - "Install WSSC Water App" title
  - "Install" and "Not Now" buttons
  - Show after 30 seconds of engagement or 2 page views
  - Don't show again for 7 days if dismissed
- [ ] Create components/pwa/OfflineIndicator.tsx:
  - Toast banner at top (below header)
  - "You're offline" message
  - wifi-off icon from lucide-react
  - Auto-hide when connection restored
- [ ] Create components/pwa/NotificationPermission.tsx:
  - Dialog/Modal component
  - Bell icon (48px, Ocean Blue)
  - Benefits list (bill reminders, service alerts, water quality updates)
  - "Enable Notifications" and "Maybe Later" buttons
  - Show after first bill payment or after 3 visits
- [ ] Add notification badge to header (bell icon with count)
- [ ] Implement push notification service:
  - Bill due date reminders (3 days before)
  - Service outage alerts
  - Water quality updates
- [ ] Implement background sync for offline actions
- [ ] Add service worker message handlers for notifications
- [ ] Test notifications on iOS Safari
- [ ] Test notifications on Android Chrome
- [ ] Test install prompt dismissal and re-show logic
- [ ] Test offline indicator visibility when network disconnects

---

## Phase 4: Testing & Polish (Status: Not Started)

### Objectives
- Comprehensive cross-device testing on all target devices
- Full accessibility audit with VoiceOver/TalkBack
- Performance optimization for Lighthouse 90+ mobile score
- WCAG 2.1 AA compliance verification

### Tasks
- [ ] Test on iPhone SE (375px width, smallest target)
- [ ] Test on iPhone 12/13/14 (390px width)
- [ ] Test on iPhone 14 Pro Max (428px width, largest phone)
- [ ] Test on Samsung Galaxy S21 (360px width)
- [ ] Test on iPad (768px width)
- [ ] Test on desktop (1024px+ width)
- [ ] Test with VoiceOver on iOS:
  - All sections properly announced
  - All buttons and links accessible
  - Form inputs properly labeled
- [ ] Test with TalkBack on Android
- [ ] Test keyboard navigation:
  - Tab order follows visual flow
  - All interactive elements reachable
  - Focus indicators visible (2px solid outline)
  - Escape key closes modals
- [ ] Verify all touch targets are 48px × 48px minimum
- [ ] Verify all interactive elements have data-testid attributes
- [ ] Run WebAIM contrast checker on all color combinations (4.5:1 minimum)
- [ ] Test with color blindness simulator (deuteranopia, protanopia)
- [ ] Test with screen zoom at 200%
- [ ] Run Lighthouse audit and optimize:
  - First Contentful Paint < 1.8s
  - Largest Contentful Paint < 2.5s
  - Mobile score 90+
  - Accessibility score 100
- [ ] Optimize images:
  - Convert to WebP format
  - Add lazy loading
  - Responsive images with srcset
- [ ] Test offline mode:
  - Disconnect network
  - Verify cached content loads
  - Verify offline page appears for uncached routes
  - Verify service worker handles failures gracefully
- [ ] Test install flow:
  - Install on iOS
  - Install on Android
  - Verify app appears on home screen
  - Verify splash screen
  - Test uninstall
- [ ] Test push notifications:
  - Request permission
  - Verify notifications appear
  - Test notification click behavior
  - Test notification badge updates
- [ ] Verify service worker caching:
  - Check Application tab in DevTools
  - Verify static assets cached
  - Verify API responses cached appropriately
- [ ] Cross-browser testing:
  - Safari (iOS and macOS)
  - Chrome (Android and desktop)
  - Firefox
  - Edge

---

## Completed Work (Previous Phases)

### ✅ Next.js Migration (COMPLETE)
- Migrated from Create React App to Next.js 14
- Configured Sanity CMS with user credentials
- Seeded Sanity with all content (hero, comparison, AI features, chatbot, ROI, tech stack, contact)
- Fixed chatbot integration (API proxy via Next.js rewrites)
- All sections rendering correctly from Sanity CMS
- Preview URL working: https://wssc-redesign-1.preview.emergentagent.com

---

## Design Guidelines Reference

**File:** `/app/design_guidelines.md`

**Key Design Tokens:**
- **Primary Colors:**
  - Ocean Blue: #0066CC (primary brand, CTAs, headers)
  - Deep Ocean: #003366 (dark headers, navigation, footer)
  - Aqua Teal: #00A896 (secondary actions, success states)
  - Light Aqua: #4FC3F7 (backgrounds, subtle accents)
- **Fonts:**
  - Headings: Chivo (weights: 500, 700)
  - Body: Karla (weights: 400, 500, 600)
- **Breakpoints:**
  - Mobile Small: 320px-374px (16px padding)
  - Mobile Medium: 375px-428px (20px padding)
  - Mobile Large: 429px-767px (24px padding)
  - Tablet: 768px-1023px (32px padding)
  - Desktop: 1024px-1440px (40px padding)
  - Desktop Large: 1441px+ (48px padding, max 1400px container)
- **Touch Targets:** 48px × 48px minimum (WCAG 2.1 AA)
- **Spacing Scale:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
- **Gradient Rules:**
  - Maximum 20% viewport coverage
  - Light colors only (no dark purple/pink/blue combos)
  - Allowed: hero sections, large CTAs, section backgrounds
  - Prohibited: text backgrounds, small UI elements

---

## Success Criteria

### Phase 1 Success
- ✅ All components responsive on mobile (320px), tablet (768px), desktop (1024px+)
- ✅ Mobile navigation with hamburger menu functional
- ✅ All touch targets 48px × 48px minimum
- ✅ Typography scales properly with clamp()
- ✅ No horizontal scroll on any device
- ✅ Testing agent passes all mobile responsiveness tests

### Phase 2 Success
- ✅ App installable on iOS Safari and Android Chrome
- ✅ Service worker registered and active
- ✅ Offline page appears when network disconnected
- ✅ Static assets cached and loading offline
- ✅ manifest.json properly configured
- ✅ PWA icons displayed correctly

### Phase 3 Success
- ✅ Custom install prompt appears and functions correctly
- ✅ Offline indicator shows/hides based on network status
- ✅ Push notification permission flow working
- ✅ Notifications delivered on iOS and Android
- ✅ Background sync functional for offline actions
- ✅ Notification badge updates correctly

### Phase 4 Success
- ✅ Lighthouse mobile score 90+
- ✅ Lighthouse accessibility score 100
- ✅ WCAG 2.1 AA compliance verified
- ✅ VoiceOver/TalkBack testing passed
- ✅ All target devices tested and working
- ✅ Performance targets met (FCP < 1.8s, LCP < 2.5s)
- ✅ Zero console errors
- ✅ Service worker caching optimized

---

## Technical Notes

### Service Worker Caching Strategy
```javascript
// Static assets (CSS, JS, fonts, images)
- Strategy: Cache-first
- Reason: These rarely change, fast loading from cache

// API calls (/api/chat, /api/stats)
- Strategy: Network-first with cache fallback
- Reason: Get fresh data when online, use cache when offline

// Pages (HTML)
- Strategy: Network-first with offline fallback
- Reason: Show latest content when online, graceful degradation when offline
```

### Next.js PWA Configuration
The next-pwa package will be configured in `next.config.ts` with:
- Service worker generation enabled
- Proper cache strategies
- Offline fallback routes
- Static file exclusions (development files)

### Supervisor Configuration Note
The Next.js app is currently run manually via `nohup`. The supervisor config at `/etc/supervisor/conf.d/supervisord.conf` should eventually be updated to manage the Next.js process, but this is deferred as non-blocking technical debt.

---

## Current Status
- **Phase 1:** In Progress (starting now)
- **Phase 2:** Not Started
- **Phase 3:** Not Started  
- **Phase 4:** Not Started

**Next Immediate Action:** Begin Phase 1 implementation - mobile responsive foundation.
