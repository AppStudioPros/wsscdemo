{
  "meta": {
    "project": "Encore Services LLC — WSSC Water Corporate Website Redesign Proposal Demo",
    "single_page_app": true,
    "sections_required": 9,
    "target": "Enterprise-grade demo for $300k–$400k RFP",
    "audience": ["WSSC Water executives", "IT leadership", "Customer service ops", "Procurement"],
    "success_actions": [
      "Demonstrate AI-powered customer support (chatbot UI + typing indicator)",
      "Show PWA capability via on-page iPhone frame + install prompt overlay",
      "Communicate modern stack (Next.js, Sanity, Vercel, Python, Claude AI, PWA)",
      "Interactive ROI calculator with count-up animation",
      "High Lighthouse score (95+), <2s initial load, zero console errors"
    ]
  },

  "brand": {
    "attributes": ["trustworthy", "efficient", "modern utility", "reliable", "customer-first"],
    "colors": {
      "primary_blue": "#0066CC",
      "secondary_teal": "#00A896",
      "dark_navy": "#1a2332",
      "light_offwhite": "#f8f9fa",
      "accent_teal": "#00B8A9",
      "supporting": {
        "success_green": "#1AAE6F",
        "warning_amber": "#D97706",
        "error_red": "#C0392B",
        "neutral_ink": "#22272B",
        "neutral_border": "#DCE1E7"
      }
    },
    "tone": "Calm, precise, water-themed with confident enterprise polish"
  },

  "typography": {
    "font_pairing": {
      "headings": "Chivo, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      "body": "Karla, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    },
    "webfont_loading": {
      "provider": "Google Fonts",
      "css": "@import url('https://fonts.googleapis.com/css2?family=Chivo:wght@500;700&family=Karla:wght@400;500&display=swap');",
      "performance": "Use font-display: swap; limit to above weights; preconnect to fonts.gstatic.com"
    },
    "scale": {
      "h1": "clamp(32px, 5vw, 64px)",
      "h2": {
        "mobile": "14px",
        "md": "18px"
      },
      "body": {
        "mobile": "14px",
        "base": "16px"
      },
      "small": "13px",
      "mono": "12px"
    },
    "weights": { "regular": 400, "medium": 500, "bold": 700 },
    "line_height": { "heading": 1.15, "body": 1.6 }
  },

  "color_system": {
    "semantic": {
      "bg": "#ffffff",
      "surface": "#ffffff",
      "surface_alt": "#F3F6F9",
      "ink": "#0B1B2B",
      "muted_ink": "#3E4A59",
      "ring": "#0066CC",
      "focus_outline": "#0066CC",
      "link": "#0066CC",
      "link_hover": "#0053A3",
      "success": "#1AAE6F",
      "warning": "#D97706",
      "error": "#C0392B",
      "border": "#DCE1E7"
    },
    "gradients": {
      "hero_band": "linear-gradient(90deg, #4DA3FF 0%, #2C7DD9 50%, #1a2332 100%)",
      "icon_teal": "linear-gradient(135deg, #00A896 0%, #00B8A9 100%)",
      "dark_panel": "linear-gradient(180deg, #1a2332 0%, #0f1420 100%)"
    },
    "restrictions": "Follow the GRADIENT RESTRICTION RULE below. For the hero, keep the gradient banded overlay to <=20% of viewport height; base layer uses solid #1a2332."
  },

  "css_tokens": {
    ":root": {
      "--color-primary": "#0066CC",
      "--color-secondary": "#00A896",
      "--color-accent": "#00B8A9",
      "--color-dark": "#1a2332",
      "--color-light": "#f8f9fa",
      "--color-ink": "#0B1B2B",
      "--color-muted-ink": "#3E4A59",
      "--color-border": "#DCE1E7",
      "--color-success": "#1AAE6F",
      "--color-warning": "#D97706",
      "--color-error": "#C0392B",
      "--focus-outline": "#0066CC",
      "--radius-sm": "6px",
      "--radius-md": "10px",
      "--radius-lg": "16px",
      "--shadow-1": "0 2px 10px rgba(0,0,0,0.06)",
      "--shadow-2": "0 10px 30px rgba(0,0,0,0.12)",
      "--container-max": "1200px",
      "--spacing-1": "8px",
      "--spacing-2": "12px",
      "--spacing-3": "16px",
      "--spacing-4": "24px",
      "--spacing-5": "32px",
      "--spacing-6": "48px",
      "--spacing-7": "64px"
    },
    "base_css": "html{scroll-behavior:smooth;} body{font-family: Karla, system-ui; color: var(--color-ink); background: #ffffff;} h1,h2,h3{font-family: Chivo, system-ui; line-height:1.15} img{max-width:100%; height:auto} a{color:var(--color-primary)} a:hover{color:#0053A3} :focus{outline:2px solid var(--focus-outline); outline-offset:2px}",
    "containers": {
      ".container": "width:100%; max-width:var(--container-max); margin:0 auto; padding:0 20px",
      ".section": "padding: var(--spacing-6) 0;"
    },
    "grid_system": {
      "mobile_first": true,
      "breakpoints_px": { "sm": 576, "md": 768, "lg": 1024, "xl": 1280 },
      "classes": {
        ".grid": "display:grid; grid-template-columns:1fr; gap:24px",
        ".grid-2@md": "@media(min-width:768px){.grid-2@md{grid-template-columns:1fr 1fr}}",
        ".grid-3@lg": "@media(min-width:1024px){.grid-3@lg{grid-template-columns:repeat(3,1fr)}}",
        ".grid-6@lg": "@media(min-width:1024px){.grid-6@lg{grid-template-columns:repeat(6, minmax(0,1fr))}}"
      }
    }
  },

  "navigation": {
    "ids": ["hero", "pain-points", "ai-features", "chatbot", "pwa", "tech-stack", "roi", "final-cta", "legal"],
    "header": {
      "style": "sticky top with solid white background and subtle bottom border",
      "links": [
        {"to": "#ai-features", "label": "AI Support", "data-testid": "nav-ai"},
        {"to": "#pwa", "label": "PWA", "data-testid": "nav-pwa"},
        {"to": "#roi", "label": "ROI", "data-testid": "nav-roi"}
      ]
    }
  },

  "sections": {
    "hero": {
      "background": "Solid #1a2332 base with a top band overlay (<=20vh) using gradient 'hero_band'",
      "radial_overlay": "Create a ::before pulsing radial circle (size ~18vw) centered behind heading with 8s infinite ease-in-out using transform: scale + opacity",
      "content": "Centered stack: small eyebrow, strong H1, subcopy, primary and secondary actions",
      "buttons": [
        {"label": "See AI Chat in Action", "variant": "primary", "data-testid": "hero-primary-cta-button"},
        {"label": "Download Proposal PDF", "variant": "ghost", "data-testid": "hero-secondary-cta-button"}
      ]
    },
    "pain_points": {
      "layout": "Two-column comparison with headline and 6 bullets per column",
      "style": "Left column red border-left (#C0392B), right column green border-left (#1AAE6F)",
      "testids": ["pain-current-list", "pain-solution-list"]
    },
    "ai_features": {
      "cards": 6,
      "icon_style": "48px circle with icon_teal gradient background",
      "hover": "lift via transform: translateY(-5px)",
      "content": ["24/7 Billing Q&A", "Outage & Service Alerts", "Intent-aware Routing", "Multilingual", "Knowledge Graph", "Secure Escalation"]
    },
    "chatbot": {
      "ui": "Chat panel with message bubbles (left/right), input, send button, and quick question chips",
      "animations": ["typing indicator with 3 dots (sequential bounce)", "message slide-in 0.3s ease"],
      "aria": "aria-live polite for incoming bot messages",
      "testids": ["chat-input", "chat-send-button", "chat-quick-question-billing", "typing-indicator"],
      "note": "Avoid purple; use primary blue and teals"
    },
    "pwa": {
      "mock": "CSS iPhone frame (rounded, notch), screenshot inset of app",
      "overlay": "Add to Home Screen prompt modal with steps (iOS/Android)",
      "testids": ["pwa-install-open", "pwa-install-confirm", "pwa-install-cancel"]
    },
    "tech_stack": {
      "items": ["Next.js", "Sanity", "Vercel", "Python", "Claude AI", "PWA"],
      "hover": "subtle scale(1.03) + shadow elevation",
      "testids": ["tech-item-nextjs", "tech-item-sanity", "tech-item-vercel", "tech-item-python", "tech-item-claude", "tech-item-pwa"]
    },
    "roi": {
      "background": "dark_panel",
      "card": "white surface with rounded corners and shadow",
      "inputs": [
        {"id": "monthly_calls", "label": "Monthly support calls", "type": "number", "data-testid": "roi-input-monthly-calls"},
        {"id": "cost_per_call", "label": "Cost per call ($)", "type": "number", "data-testid": "roi-input-cost-per-call"},
        {"id": "deflection_rate", "label": "AI deflection rate (%)", "type": "number", "data-testid": "roi-input-deflection"}
      ],
      "formula": "annual_savings = monthly_calls * cost_per_call * (deflection_rate/100) * 12",
      "animations": ["count-up on results", "hover lift on calculate button"],
      "testids": ["roi-result-annual-savings", "roi-calc-button"]
    },
    "final_cta": {
      "content": "Project summary, timeline highlights, contact",
      "buttons": [
        {"label": "Start Discovery Workshop", "variant": "primary", "data-testid": "final-cta-start-button"},
        {"label": "Email Proposal", "variant": "secondary", "data-testid": "final-cta-email-button"}
      ]
    },
    "legal": {
      "copy": "© Encore Services LLC — This demo and all visuals are part of a proposal to WSSC Water.",
      "contrast": "Ensure 4.5:1 minimum on dark navy background",
      "testids": ["legal-footer-disclaimer-text"]
    }
  },

  "components": {
    "reuse_from_repo": [
      {"name": "Button", "path": "./components/ui/button.jsx", "notes": "Prefer 'default' or 'secondary' variants; ensure data-testid on every usage"},
      {"name": "Card", "path": "./components/ui/card.jsx"},
      {"name": "Input", "path": "./components/ui/input.jsx"},
      {"name": "Label", "path": "./components/ui/label.jsx"},
      {"name": "Tabs", "path": "./components/ui/tabs.jsx"},
      {"name": "Tooltip", "path": "./components/ui/tooltip.jsx"},
      {"name": "Badge", "path": "./components/ui/badge.jsx"},
      {"name": "Progress", "path": "./components/ui/progress.jsx"},
      {"name": "Switch", "path": "./components/ui/switch.jsx"},
      {"name": "SonnerToasts", "path": "./components/ui/sonner.jsx"}
    ],
    "new_simple_components": [
      {
        "name": "SectionHeader",
        "file": "src/components/SectionHeader.js",
        "export": "named",
        "props": ["eyebrow", "title", "subtitle"],
        "testid": "section-header",
        "style": "centered, max-width 780px, margin auto"
      },
      {
        "name": "ChatBubble",
        "file": "src/components/ChatBubble.js",
        "export": "named",
        "props": ["from", "text"],
        "testid": "chat-bubble",
        "style": "rounded 12px, from='bot' left-aligned light bg; from='user' right-aligned primary bg with white text"
      },
      {
        "name": "IPhoneFrame",
        "file": "src/components/IPhoneFrame.js",
        "export": "named",
        "props": ["children"],
        "testid": "iphone-frame",
        "style": "pure CSS rounded rectangle with notch and inner shadow"
      }
    ]
  },

  "buttons": {
    "shape": "Professional / Corporate",
    "radius": "8px",
    "variants": {
      "primary": {
        "bg": "var(--color-primary)",
        "text": "#fff",
        "hover": "filter: brightness(0.95)",
        "focus": "outline:2px solid var(--focus-outline)",
        "data-testid": "*-button"
      },
      "secondary": {
        "bg": "var(--color-secondary)",
        "text": "#003033"
      },
      "ghost": {
        "bg": "transparent",
        "border": "1px solid var(--color-border)",
        "text": "var(--color-ink)"
      }
    },
    "sizes": { "sm": "34px 14px", "md": "40px 18px", "lg": "48px 22px" },
    "motion": "transform: translateY(-1px) on hover; active: translateY(0)"
  },

  "interactions_and_motion": {
    "principles": [
      "All animations 60fps; use transform/opacity only",
      "Respect prefers-reduced-motion: reduce to 0 or minimal"
    ],
    "keyframes_css": {
      "heroPulse": "@keyframes heroPulse {0%{transform:scale(0.95);opacity:.6} 50%{transform:scale(1);opacity:.85} 100%{transform:scale(0.95);opacity:.6}}",
      "typingDot": "@keyframes typingDot {0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)}}",
      "slideIn": "@keyframes slideIn {0%{transform:translateY(8px);opacity:0}100%{transform:translateY(0);opacity:1}}"
    },
    "classes": {
      ".hover-lift": "transition: transform 180ms ease; will-change: transform;",
      ".hover-lift:hover": "transform: translateY(-5px)",
      ".msg-enter": "animation: slideIn .3s ease both"
    }
  },

  "accessibility": {
    "semantics": ["Use header, main, section, footer"],
    "aria": [
      "aria-label on all icon-only buttons",
      "role='status' with aria-live='polite' on typing indicator",
      "aria-modal='true' for PWA prompt overlay"
    ],
    "keyboard": [
      "Tab order left-to-right, top-to-bottom",
      "Enter submits chat input",
      "Esc closes overlays"
    ],
    "contrast": "All text/background pairs >= 4.5:1"
  },

  "performance": {
    "goals": { "ttfb": "<200ms (dev server)", "first_paint": "<2s" },
    "practices": [
      "Limit webfonts to two families and required weights",
      "Compress and lazy-load non-critical images",
      "No blocking console logs in production",
      "Use requestAnimationFrame for count-up; cancel on unmount",
      "Minify CSS; avoid heavy shadows and blurs"
    ]
  },

  "code_snippets": {
    "hero_css": "#hero{position:relative;background:var(--color-dark);color:#fff;padding:96px 0} #hero::before{content:'';position:absolute;inset:0;height:20vh;max-height:20vh;background:linear-gradient(90deg,#4DA3FF 0%, #2C7DD9 50%, #1a2332 100%);} #hero .pulse{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none} #hero .pulse::after{content:'';width:18vw;height:18vw;max-width:320px;max-height:320px;border-radius:50%;background:radial-gradient(closest-side, rgba(77,163,255,.35), rgba(26,35,50,0));animation:heroPulse 8s ease-in-out infinite} .hero-actions{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}",
    "typing_indicator_html": "<div class=\"typing\" role=\"status\" aria-live=\"polite\" data-testid=\"typing-indicator\"><span class=\"dot\"></span><span class=\"dot\"></span><span class=\"dot\"></span></div>",
    "typing_indicator_css": ".typing{display:inline-flex;gap:6px;align-items:center} .typing .dot{width:6px;height:6px;border-radius:50%;background:var(--color-muted-ink);animation:typingDot 1.2s infinite} .typing .dot:nth-child(2){animation-delay:.15s} .typing .dot:nth-child(3){animation-delay:.3s}",
    "message_css": ".bubble{border-radius:12px;padding:10px 12px;max-width:72%;box-shadow:var(--shadow-1)} .bubble.bot{background:#F3F6F9;color:var(--color-ink)} .bubble.user{background:var(--color-primary);color:#fff;margin-left:auto}",
    "countup_js": "// ROI Count-up (React, .js)\nexport function animateCount({el, to, duration=900}){if(!el) return; const start=performance.now(); const from = 0; function step(t){const p=Math.min((t-start)/duration,1); const v=Math.round(from + (to-from)*(1- Math.pow(1-p,3))); el.textContent = v.toLocaleString(); if(p<1) requestAnimationFrame(step);} requestAnimationFrame(step);}"
  },

  "testid_convention": {
    "rule": "kebab-case describing role or purpose",
    "examples": [
      "hero-primary-cta-button",
      "pain-current-list",
      "ai-feature-card-1",
      "chat-input",
      "chat-send-button",
      "chat-quick-question-billing",
      "pwa-install-open",
      "roi-input-monthly-calls",
      "roi-result-annual-savings",
      "final-cta-start-button",
      "legal-footer-disclaimer-text"
    ],
    "requirement": "All interactive and key informational elements MUST include data-testid"
  },

  "image_urls": [
    {
      "url": "https://images.unsplash.com/photo-1673203060194-866692c88842?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "hero_background_accent",
      "description": "Close up water wave texture to subtly overlay at low opacity in hero"
    },
    {
      "url": "https://images.unsplash.com/photo-1760533534729-99400f7f4bd7?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "ai_features_illustration",
      "description": "Clean turquoise water caustics for cards background accents"
    },
    {
      "url": "https://images.unsplash.com/photo-1633791985199-172fd5c3e92d?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "pwa_mock_inset",
      "description": "Soft reflective water for the iPhone mock inset"
    },
    {
      "url": "https://images.unsplash.com/photo-1758532843609-43d98fa8c23f?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "section_divider_texture",
      "description": "Ripple texture as a wide divider band at 6–8% opacity"
    }
  ],

  "component_path": [
    "./components/ui/button.jsx",
    "./components/ui/card.jsx",
    "./components/ui/input.jsx",
    "./components/ui/label.jsx",
    "./components/ui/tabs.jsx",
    "./components/ui/tooltip.jsx",
    "./components/ui/badge.jsx",
    "./components/ui/progress.jsx",
    "./components/ui/switch.jsx",
    "./components/ui/sonner.jsx"
  ],

  "instructions_to_main_agent": [
    "Create sections with ids: hero, pain-points, ai-features, chatbot, pwa, tech-stack, roi, final-cta, legal.",
    "Use plain CSS classes defined in this guide; avoid Tailwind utilities in new code.",
    "Prefer shadcn/ui Button, Card, Input for accessible primitives; add data-testid on all interactive elements.",
    "Implement hero with solid dark navy base; add a top gradient band <=20vh and a pulsing radial ::after element.",
    "Pain Points: two cards side-by-side from md breakpoint; red/green left borders; bullet lists with clear contrast.",
    "AI Features: 6 cards in responsive grid; each has gradient icon disc (teal) and hover-lift class.",
    "Chatbot: message bubbles using .bubble classes; add typing indicator per snippet; animate new messages with .msg-enter.",
    "PWA: build IPhoneFrame.js with pure CSS; overlay a modal simulating 'Add to Home Screen' with clear iOS/Android steps.",
    "Tech Stack: 6 equal grid items with hover elevation; use badges for tags; data-testid for each item.",
    "ROI: white Card on dark gradient section; inputs for monthly_calls, cost_per_call, deflection_rate; compute annual_savings live; animate count-up on change; ensure keyboard and screen reader support.",
    "Final CTA: strong primary and secondary buttons; repeat contact details; ensure focus outline visible.",
    "Footer: dark navy, small text, high contrast, Encore Services LLC branding.",
    "Global: enable smooth scroll; never use transition: all; only transform/opacity; ensure prefers-reduced-motion is respected.",
    "Testing: verify every interactive element has data-testid; no console errors on interaction.",
    "Performance: keep images under ~150KB where possible; lazy-load non-critical imagery; limit fonts to specified weights."
  ]
}


<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
