# WSSC Water Mobile PWA Design Guidelines

## Project Overview
This is a comprehensive design system for the WSSC Water website redesign proposal, optimized for mobile devices and Progressive Web App (PWA) implementation. The design prioritizes accessibility (WCAG 2.1 AA compliance), government standards, and modern mobile-first user experience.

---

## GRADIENT RESTRICTION RULE

**CRITICAL: NEVER use dark/saturated gradient combos (e.g., purple/pink, blue-500 to purple-600) on any UI element.**

### Prohibited Gradients:
- Dark purple to pink
- Blue-500 to purple-600
- Purple-500 to pink-500
- Green-500 to blue-500
- Red to pink
- Any dark saturated color combinations

### Enforcement Rule:
**IF** gradient area exceeds 20% of viewport **OR** impacts readability  
**THEN** fallback to solid colors or simple, two-color light gradients.

### Allowed Gradient Usage:
- Hero/landing sections (background only, ensure text readability)
- Section backgrounds (not content blocks)
- Large CTA buttons with light/simple gradients only
- Decorative overlays and accent visuals
- Subtle 2-3 color light gradients for depth

---

## Color System

### Primary Color Palette (Water Utility Theme)

```json
{
  "primary_colors": {
    "ocean_blue": {
      "hex": "#0066CC",
      "usage": "Primary brand color, main CTAs, headers, active states",
      "contrast_ratio": "4.5:1 minimum with white text",
      "accessibility": "WCAG AA compliant"
    },
    "deep_ocean": {
      "hex": "#003366",
      "usage": "Dark headers, navigation, footer backgrounds",
      "contrast_ratio": "7:1 with white text",
      "accessibility": "WCAG AAA compliant"
    },
    "aqua_teal": {
      "hex": "#00A896",
      "usage": "Secondary actions, success states, highlights",
      "contrast_ratio": "4.5:1 with white text"
    },
    "light_aqua": {
      "hex": "#4FC3F7",
      "usage": "Backgrounds, subtle accents, hover states",
      "contrast_ratio": "Use with dark text only"
    }
  },
  "neutral_colors": {
    "ink_dark": {
      "hex": "#0B1B2B",
      "usage": "Primary text, headings"
    },
    "ink_muted": {
      "hex": "#3E4A59",
      "usage": "Secondary text, labels"
    },
    "border_gray": {
      "hex": "#DCE1E7",
      "usage": "Borders, dividers, subtle separators"
    },
    "background_light": {
      "hex": "#F8F9FA",
      "usage": "Page backgrounds, card backgrounds"
    },
    "white": {
      "hex": "#FFFFFF",
      "usage": "Card backgrounds, content areas, primary background"
    }
  },
  "semantic_colors": {
    "success": {
      "hex": "#1AAE6F",
      "usage": "Success messages, confirmations, positive indicators"
    },
    "warning": {
      "hex": "#D97706",
      "usage": "Warnings, alerts, important notices"
    },
    "error": {
      "hex": "#C0392B",
      "usage": "Error states, critical alerts, destructive actions"
    },
    "info": {
      "hex": "#0066CC",
      "usage": "Informational messages, tips, help text"
    }
  }
}
```

### Gradient Specifications (Limited Use)

```json
{
  "allowed_gradients": {
    "hero_gradient": {
      "type": "linear-gradient",
      "angle": "135deg",
      "colors": ["#E3F2FD", "#FFFFFF", "#E3F2FD"],
      "usage": "Hero section background only - light, subtle",
      "max_viewport_coverage": "20%"
    },
    "card_subtle": {
      "type": "linear-gradient",
      "angle": "180deg",
      "colors": ["#F8F9FA", "#FFFFFF"],
      "usage": "Card backgrounds for depth"
    },
    "button_primary": {
      "type": "linear-gradient",
      "angle": "135deg",
      "colors": ["#0066CC", "#0053A3"],
      "usage": "Primary CTA buttons only - subtle depth"
    }
  }
}
```

---

## Typography System

### Font Families

```json
{
  "font_families": {
    "headings": {
      "family": "Chivo",
      "weights": [500, 700],
      "fallback": "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "usage": "All headings (h1-h6), hero titles, section headers"
    },
    "body": {
      "family": "Karla",
      "weights": [400, 500, 600],
      "fallback": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Inter', sans-serif",
      "usage": "Body text, paragraphs, labels, buttons"
    }
  }
}
```

### Mobile-First Typography Scale

```json
{
  "typography_scale": {
    "h1_hero": {
      "mobile": "clamp(1.8rem, 5vw, 2.5rem)",
      "tablet": "clamp(2.5rem, 5vw, 3rem)",
      "desktop": "clamp(3rem, 5vw, 3.5rem)",
      "line_height": "1.2",
      "font_weight": "700",
      "letter_spacing": "-0.02em"
    },
    "h2_section": {
      "mobile": "clamp(1.5rem, 4vw, 2rem)",
      "tablet": "clamp(2rem, 4vw, 2.5rem)",
      "desktop": "clamp(2.5rem, 4vw, 3rem)",
      "line_height": "1.3",
      "font_weight": "700"
    },
    "h3_card": {
      "mobile": "1.25rem",
      "tablet": "1.4rem",
      "desktop": "1.5rem",
      "line_height": "1.4",
      "font_weight": "600"
    },
    "body_large": {
      "mobile": "1rem",
      "tablet": "1.05rem",
      "desktop": "1.1rem",
      "line_height": "1.7",
      "font_weight": "400"
    },
    "body_regular": {
      "mobile": "0.875rem",
      "tablet": "1rem",
      "desktop": "1rem",
      "line_height": "1.6",
      "font_weight": "400"
    },
    "body_small": {
      "mobile": "0.75rem",
      "tablet": "0.875rem",
      "desktop": "0.875rem",
      "line_height": "1.5",
      "font_weight": "400"
    },
    "button_text": {
      "mobile": "0.875rem",
      "tablet": "1rem",
      "desktop": "1rem",
      "line_height": "1",
      "font_weight": "600",
      "letter_spacing": "0.01em"
    }
  }
}
```

---

## Mobile Responsive Breakpoints

```json
{
  "breakpoints": {
    "mobile_small": {
      "min_width": "320px",
      "max_width": "374px",
      "devices": ["iPhone SE", "small Android phones"],
      "container_padding": "16px"
    },
    "mobile_medium": {
      "min_width": "375px",
      "max_width": "428px",
      "devices": ["iPhone 12/13/14", "standard smartphones"],
      "container_padding": "20px"
    },
    "mobile_large": {
      "min_width": "429px",
      "max_width": "767px",
      "devices": ["iPhone 14 Pro Max", "large Android phones"],
      "container_padding": "24px"
    },
    "tablet": {
      "min_width": "768px",
      "max_width": "1023px",
      "devices": ["iPad", "Android tablets"],
      "container_padding": "32px"
    },
    "desktop": {
      "min_width": "1024px",
      "max_width": "1440px",
      "container_padding": "40px"
    },
    "desktop_large": {
      "min_width": "1441px",
      "container_padding": "48px",
      "max_container_width": "1400px"
    }
  }
}
```

### Responsive Implementation Pattern

```javascript
// Mobile-first media queries
// Base styles: 320px - 767px (mobile)
// Tablet: 768px+
// Desktop: 1024px+

// Example:
.container {
  padding: 16px; /* mobile default */
}

@media (min-width: 768px) {
  .container {
    padding: 32px; /* tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 40px; /* desktop */
  }
}
```

---

## Touch Interaction Patterns

### Touch Target Specifications

```json
{
  "touch_targets": {
    "minimum_size": {
      "mobile_phone": "48px × 48px",
      "tablet": "44px × 44px",
      "reasoning": "WCAG 2.1 AA compliance, motor impairment accessibility"
    },
    "recommended_size": {
      "primary_buttons": "48px height minimum, full-width or min 120px wide",
      "icon_buttons": "48px × 48px",
      "list_items": "56px height minimum",
      "form_inputs": "48px height minimum"
    },
    "spacing": {
      "mobile_phone": "8px minimum between targets",
      "tablet": "12px minimum between targets",
      "desktop": "16px minimum between targets"
    }
  }
}
```

### Touch Interaction States

```json
{
  "interaction_states": {
    "default": {
      "description": "Resting state",
      "visual": "Standard colors, no effects"
    },
    "hover": {
      "description": "Mouse hover (desktop/tablet)",
      "visual": "Subtle background color shift, slight scale (1.02)",
      "transition": "0.2s ease"
    },
    "active_touch": {
      "description": "Touch press state",
      "visual": "Scale down (0.97), darker background",
      "transition": "0.1s ease",
      "feedback": "Immediate visual response"
    },
    "focus": {
      "description": "Keyboard/screen reader focus",
      "visual": "2px solid outline in #0066CC, 2px offset",
      "requirement": "WCAG 2.1 AA mandatory"
    },
    "disabled": {
      "description": "Non-interactive state",
      "visual": "Opacity 0.5, cursor not-allowed",
      "color": "Grayed out"
    }
  }
}
```

---

## Button Design System

### Button Variants

```json
{
  "button_variants": {
    "primary": {
      "background": "#0066CC",
      "text_color": "#FFFFFF",
      "border": "none",
      "border_radius": "12px",
      "padding_mobile": "14px 24px",
      "padding_desktop": "16px 32px",
      "min_height": "48px",
      "font_weight": "600",
      "hover_state": "background: #0053A3, transform: translateY(-2px)",
      "active_state": "transform: scale(0.97)",
      "shadow": "0 4px 12px rgba(0, 102, 204, 0.2)",
      "usage": "Primary CTAs, submit buttons, main actions"
    },
    "secondary": {
      "background": "transparent",
      "text_color": "#0066CC",
      "border": "2px solid #0066CC",
      "border_radius": "12px",
      "padding_mobile": "14px 24px",
      "padding_desktop": "16px 32px",
      "min_height": "48px",
      "font_weight": "600",
      "hover_state": "background: rgba(0, 102, 204, 0.1)",
      "active_state": "transform: scale(0.97)",
      "usage": "Secondary actions, cancel buttons"
    },
    "ghost": {
      "background": "transparent",
      "text_color": "#0066CC",
      "border": "none",
      "border_radius": "8px",
      "padding_mobile": "12px 16px",
      "padding_desktop": "12px 20px",
      "min_height": "44px",
      "font_weight": "500",
      "hover_state": "background: rgba(0, 102, 204, 0.08)",
      "usage": "Tertiary actions, navigation links"
    },
    "icon_button": {
      "size": "48px × 48px",
      "background": "transparent",
      "border_radius": "50%",
      "hover_state": "background: rgba(0, 102, 204, 0.1)",
      "icon_size": "24px",
      "usage": "Menu toggles, close buttons, icon-only actions"
    }
  }
}
```

---

## Mobile Navigation Patterns

### Navigation Components

```json
{
  "navigation_patterns": {
    "mobile_header": {
      "height": "64px",
      "background": "#FFFFFF",
      "border_bottom": "1px solid #DCE1E7",
      "padding": "0 16px",
      "layout": "flex, space-between, align-center",
      "elements": ["logo (120px width)", "hamburger menu (48px × 48px)"],
      "sticky": true,
      "z_index": "1000"
    },
    "hamburger_menu": {
      "type": "Drawer/Sheet component from shadcn",
      "animation": "slide-in from right",
      "width": "85vw (max 320px)",
      "background": "#FFFFFF",
      "overlay": "rgba(0, 0, 0, 0.5)",
      "close_button": "48px × 48px top-right",
      "menu_items": {
        "height": "56px minimum",
        "padding": "16px 20px",
        "font_size": "1rem",
        "active_state": "background: #F8F9FA, border-left: 4px solid #0066CC"
      }
    },
    "bottom_navigation": {
      "usage": "Optional for app-like experience",
      "height": "64px",
      "background": "#FFFFFF",
      "border_top": "1px solid #DCE1E7",
      "items": "3-5 items maximum",
      "item_size": "48px × 48px touch target",
      "icon_size": "24px",
      "label_size": "0.75rem",
      "active_color": "#0066CC",
      "inactive_color": "#3E4A59"
    },
    "breadcrumbs": {
      "display_mobile": "Collapse to current page only with back arrow",
      "display_tablet": "Show last 2 levels",
      "display_desktop": "Show full path",
      "separator": "chevron-right icon",
      "font_size": "0.875rem"
    }
  }
}
```

---

## Form Design Patterns

### Form Components

```json
{
  "form_patterns": {
    "input_fields": {
      "height": "48px minimum",
      "padding": "12px 16px",
      "border": "2px solid #DCE1E7",
      "border_radius": "8px",
      "font_size": "1rem (16px minimum to prevent zoom on iOS)",
      "background": "#FFFFFF",
      "focus_state": "border-color: #0066CC, outline: none",
      "error_state": "border-color: #C0392B",
      "disabled_state": "background: #F8F9FA, opacity: 0.6"
    },
    "labels": {
      "position": "Above input (mobile-friendly)",
      "font_size": "0.875rem",
      "font_weight": "500",
      "color": "#0B1B2B",
      "margin_bottom": "8px",
      "required_indicator": "Red asterisk (*) after label"
    },
    "helper_text": {
      "font_size": "0.75rem",
      "color": "#3E4A59",
      "margin_top": "4px"
    },
    "error_messages": {
      "font_size": "0.75rem",
      "color": "#C0392B",
      "icon": "alert-circle (lucide-react)",
      "margin_top": "4px",
      "display": "Inline below input"
    },
    "select_dropdowns": {
      "component": "shadcn Select component",
      "height": "48px",
      "chevron_icon": "24px",
      "mobile_behavior": "Native select on mobile for better UX"
    },
    "checkboxes_radios": {
      "size": "24px × 24px",
      "touch_target": "48px × 48px (padding around)",
      "label_spacing": "12px from checkbox",
      "label_clickable": true
    },
    "date_pickers": {
      "component": "shadcn Calendar component",
      "mobile_behavior": "Native date picker on mobile",
      "format": "MM/DD/YYYY (US standard)"
    }
  }
}
```

---

## Card & Content Patterns

### Card Components

```json
{
  "card_patterns": {
    "standard_card": {
      "background": "#FFFFFF",
      "border": "1px solid #DCE1E7",
      "border_radius": "12px",
      "padding_mobile": "16px",
      "padding_tablet": "20px",
      "padding_desktop": "24px",
      "shadow": "0 2px 10px rgba(0, 0, 0, 0.06)",
      "hover_state": "transform: translateY(-4px), shadow: 0 8px 20px rgba(0, 0, 0, 0.1)",
      "transition": "0.3s ease"
    },
    "feature_card": {
      "background": "linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)",
      "border": "2px solid #DCE1E7",
      "border_radius": "16px",
      "padding": "24px",
      "hover_state": "border-color: #0066CC",
      "icon_container": {
        "size": "60px × 60px",
        "background": "linear-gradient(135deg, #0066CC, #00A896)",
        "border_radius": "12px",
        "icon_size": "32px",
        "color": "#FFFFFF"
      }
    },
    "info_card": {
      "background": "#F8F9FA",
      "border_left": "4px solid #0066CC",
      "border_radius": "8px",
      "padding": "16px",
      "usage": "Informational content, tips, notices"
    }
  }
}
```

---

## PWA-Specific UI Components

### Install Prompt

```json
{
  "install_prompt": {
    "component_type": "Custom banner (not browser default)",
    "position": "Bottom of screen, fixed",
    "height": "auto (min 80px)",
    "background": "#FFFFFF",
    "border_top": "1px solid #DCE1E7",
    "shadow": "0 -4px 20px rgba(0, 0, 0, 0.1)",
    "padding": "16px",
    "layout": {
      "icon": "60px × 60px WSSC logo",
      "text": {
        "title": "Install WSSC Water App",
        "subtitle": "Access your account offline anytime",
        "font_size_title": "1rem",
        "font_size_subtitle": "0.875rem"
      },
      "buttons": {
        "install": {
          "text": "Install",
          "style": "primary button",
          "min_width": "100px"
        },
        "dismiss": {
          "text": "Not Now",
          "style": "ghost button"
        }
      }
    },
    "timing": "Show after 30 seconds of engagement or after 2 page views",
    "dismissal": "Don't show again for 7 days if dismissed",
    "animation": "slide-up from bottom, 0.3s ease"
  }
}
```

### Offline Indicator

```json
{
  "offline_indicator": {
    "component_type": "Toast/Banner",
    "position": "Top of screen, below header",
    "background": "#FFF3CD",
    "border": "1px solid #FFE69C",
    "color": "#856404",
    "padding": "12px 16px",
    "icon": "wifi-off (lucide-react), 20px",
    "text": "You're offline. Some features may be limited.",
    "dismissible": false,
    "auto_hide": "Hide when connection restored",
    "animation": "slide-down from top"
  },
  "offline_page": {
    "background": "#F8F9FA",
    "content": {
      "icon": "wifi-off, 64px, color: #3E4A59",
      "heading": "You're Offline",
      "message": "Check your internet connection and try again.",
      "cached_content_link": "View Cached Content",
      "retry_button": "Try Again"
    },
    "layout": "Centered, vertical stack, max-width: 400px"
  }
}
```

### Push Notification UI

```json
{
  "notification_permission_prompt": {
    "component_type": "Dialog/Modal",
    "background": "#FFFFFF",
    "border_radius": "16px",
    "padding": "24px",
    "max_width": "400px",
    "content": {
      "icon": "bell (lucide-react), 48px, color: #0066CC",
      "heading": "Stay Updated",
      "message": "Get notified about bill due dates, service alerts, and important updates.",
      "benefits": [
        "Bill payment reminders",
        "Service outage alerts",
        "Water quality updates"
      ]
    },
    "buttons": {
      "allow": {
        "text": "Enable Notifications",
        "style": "primary button"
      },
      "deny": {
        "text": "Maybe Later",
        "style": "secondary button"
      }
    },
    "timing": "Show after user completes first bill payment or after 3 visits"
  },
  "notification_badge": {
    "position": "Top-right of bell icon in header",
    "size": "20px × 20px",
    "background": "#C0392B",
    "color": "#FFFFFF",
    "font_size": "0.75rem",
    "font_weight": "700",
    "border_radius": "50%",
    "max_count": "9+ for counts over 9"
  }
}
```

### Loading States

```json
{
  "loading_patterns": {
    "skeleton_screen": {
      "usage": "Initial page load, content loading",
      "background": "#F8F9FA",
      "shimmer_color": "linear-gradient(90deg, #F8F9FA 0%, #E9ECEF 50%, #F8F9FA 100%)",
      "animation": "shimmer 1.5s infinite",
      "elements": [
        "Header bar: 100% width × 64px",
        "Content blocks: match actual content dimensions",
        "Card placeholders: 100% width × 120px"
      ]
    },
    "spinner": {
      "size": "40px",
      "color": "#0066CC",
      "stroke_width": "4px",
      "animation": "spin 0.8s linear infinite",
      "usage": "Button loading states, inline loading"
    },
    "progress_bar": {
      "height": "4px",
      "background": "#E9ECEF",
      "fill_color": "#0066CC",
      "border_radius": "2px",
      "position": "Top of screen, fixed",
      "usage": "Page transitions, file uploads"
    }
  }
}
```

---

## Spacing System

```json
{
  "spacing_scale": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "base": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px"
  },
  "component_spacing": {
    "section_padding_mobile": "48px 16px",
    "section_padding_tablet": "64px 32px",
    "section_padding_desktop": "80px 40px",
    "card_gap_mobile": "16px",
    "card_gap_tablet": "24px",
    "card_gap_desktop": "32px",
    "element_margin_bottom": "16px (mobile), 24px (desktop)"
  }
}
```

---

## Accessibility Requirements (WCAG 2.1 AA)

### Critical Accessibility Features

```json
{
  "accessibility_requirements": {
    "color_contrast": {
      "text_normal": "4.5:1 minimum",
      "text_large": "3:1 minimum (18pt+ or 14pt+ bold)",
      "ui_components": "3:1 minimum",
      "testing_tool": "WebAIM Contrast Checker"
    },
    "focus_indicators": {
      "style": "2px solid #0066CC",
      "offset": "2px",
      "visibility": "Always visible on keyboard focus",
      "never_remove": "outline: none only if custom focus style provided"
    },
    "touch_targets": {
      "minimum_size": "48px × 48px",
      "spacing": "8px minimum between targets",
      "exception": "Inline text links"
    },
    "text_sizing": {
      "minimum_font_size": "16px for body text (prevents iOS zoom)",
      "zoom_support": "Support up to 200% zoom without breaking layout",
      "relative_units": "Use rem/em for scalability"
    },
    "keyboard_navigation": {
      "tab_order": "Logical, follows visual flow",
      "skip_links": "Provide 'Skip to main content' link",
      "focus_trap": "Modal dialogs trap focus until closed",
      "escape_key": "Close modals/menus with Escape key"
    },
    "screen_reader_support": {
      "semantic_html": "Use proper heading hierarchy (h1-h6)",
      "aria_labels": "Provide for icon buttons and complex widgets",
      "alt_text": "Descriptive alt text for all images",
      "live_regions": "Use aria-live for dynamic content updates",
      "form_labels": "All inputs must have associated labels"
    },
    "motion_preferences": {
      "media_query": "@media (prefers-reduced-motion: reduce)",
      "behavior": "Disable animations, use instant transitions",
      "exceptions": "Essential animations only (loading indicators)"
    }
  }
}
```

### Data-TestID Convention

```json
{
  "testing_attributes": {
    "convention": "kebab-case, descriptive, role-based",
    "examples": {
      "buttons": "data-testid='login-submit-button'",
      "forms": "data-testid='bill-payment-form'",
      "inputs": "data-testid='account-number-input'",
      "navigation": "data-testid='main-navigation-menu'",
      "cards": "data-testid='service-request-card'",
      "modals": "data-testid='confirm-payment-dialog'"
    },
    "requirement": "All interactive and key informational elements MUST include data-testid"
  }
}
```

---

## Component Library Usage

### Shadcn/UI Components

```json
{
  "shadcn_components": {
    "navigation": {
      "Sheet": "/app/frontend/src/components/ui/sheet.jsx - Mobile drawer menu",
      "NavigationMenu": "/app/frontend/src/components/ui/navigation-menu.jsx - Desktop nav",
      "Breadcrumb": "/app/frontend/src/components/ui/breadcrumb.jsx"
    },
    "forms": {
      "Input": "/app/frontend/src/components/ui/input.jsx",
      "Label": "/app/frontend/src/components/ui/label.jsx",
      "Select": "/app/frontend/src/components/ui/select.jsx",
      "Checkbox": "/app/frontend/src/components/ui/checkbox.jsx",
      "RadioGroup": "/app/frontend/src/components/ui/radio-group.jsx",
      "Calendar": "/app/frontend/src/components/ui/calendar.jsx - Use for date pickers",
      "Form": "/app/frontend/src/components/ui/form.jsx - Form validation wrapper"
    },
    "feedback": {
      "Toast": "/app/frontend/src/components/ui/toast.jsx",
      "Sonner": "/app/frontend/src/components/ui/sonner.jsx - Use for toast notifications",
      "Alert": "/app/frontend/src/components/ui/alert.jsx",
      "AlertDialog": "/app/frontend/src/components/ui/alert-dialog.jsx"
    },
    "overlays": {
      "Dialog": "/app/frontend/src/components/ui/dialog.jsx - Modals",
      "Sheet": "/app/frontend/src/components/ui/sheet.jsx - Drawers",
      "Popover": "/app/frontend/src/components/ui/popover.jsx",
      "Tooltip": "/app/frontend/src/components/ui/tooltip.jsx"
    },
    "data_display": {
      "Card": "/app/frontend/src/components/ui/card.jsx",
      "Table": "/app/frontend/src/components/ui/table.jsx",
      "Badge": "/app/frontend/src/components/ui/badge.jsx",
      "Separator": "/app/frontend/src/components/ui/separator.jsx",
      "Skeleton": "/app/frontend/src/components/ui/skeleton.jsx - Loading states"
    },
    "interactive": {
      "Button": "/app/frontend/src/components/ui/button.jsx",
      "Accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "Tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "Collapsible": "/app/frontend/src/components/ui/collapsible.jsx",
      "Slider": "/app/frontend/src/components/ui/slider.jsx",
      "Switch": "/app/frontend/src/components/ui/switch.jsx"
    }
  }
}
```

---

## Layout Patterns

### Grid Systems

```json
{
  "grid_patterns": {
    "mobile_grid": {
      "columns": "1 column (full width)",
      "gap": "16px",
      "padding": "16px"
    },
    "tablet_grid": {
      "columns": "2 columns",
      "gap": "24px",
      "padding": "32px"
    },
    "desktop_grid": {
      "columns": "3-4 columns (context dependent)",
      "gap": "32px",
      "padding": "40px",
      "max_width": "1400px"
    },
    "feature_grid": {
      "mobile": "1 column",
      "tablet": "2 columns",
      "desktop": "3 columns",
      "usage": "Feature cards, service cards, benefit lists"
    },
    "dashboard_grid": {
      "mobile": "1 column",
      "tablet": "2 columns (sidebar + main)",
      "desktop": "12-column grid system",
      "usage": "Account dashboard, admin panels"
    }
  }
}
```

### Container Patterns

```json
{
  "container_patterns": {
    "full_width": {
      "width": "100%",
      "max_width": "none",
      "usage": "Hero sections, full-bleed images"
    },
    "standard_container": {
      "width": "100%",
      "max_width": "1400px",
      "margin": "0 auto",
      "padding_mobile": "0 16px",
      "padding_tablet": "0 32px",
      "padding_desktop": "0 40px"
    },
    "narrow_container": {
      "width": "100%",
      "max_width": "800px",
      "margin": "0 auto",
      "usage": "Forms, article content, centered content"
    }
  }
}
```

---

## Animation & Motion

### Animation Principles

```json
{
  "animation_principles": {
    "duration": {
      "instant": "0.1s - Micro-interactions",
      "fast": "0.2s - Hover states, button presses",
      "normal": "0.3s - Transitions, fades",
      "slow": "0.5s - Page transitions, modals"
    },
    "easing": {
      "ease_out": "cubic-bezier(0.25, 0.46, 0.45, 0.94) - Entering elements",
      "ease_in": "cubic-bezier(0.55, 0.055, 0.675, 0.19) - Exiting elements",
      "ease_in_out": "cubic-bezier(0.645, 0.045, 0.355, 1) - Smooth transitions"
    },
    "micro_interactions": {
      "button_press": "transform: scale(0.97), duration: 0.1s",
      "button_hover": "transform: translateY(-2px), duration: 0.2s",
      "card_hover": "transform: translateY(-4px), shadow increase, duration: 0.3s",
      "input_focus": "border-color transition, duration: 0.2s"
    },
    "page_transitions": {
      "fade_in": "opacity 0 to 1, duration: 0.3s",
      "slide_up": "translateY(20px) to 0, opacity 0 to 1, duration: 0.4s",
      "slide_in_right": "translateX(100%) to 0, duration: 0.3s"
    },
    "reduced_motion": {
      "media_query": "@media (prefers-reduced-motion: reduce)",
      "behavior": "Disable all animations except essential loading indicators",
      "implementation": "Set animation-duration: 0.01ms, transition-duration: 0.01ms"
    }
  }
}
```

---

## Image Guidelines

### Image Specifications

```json
{
  "image_requirements": {
    "hero_images": {
      "format": "WebP with JPEG fallback",
      "dimensions_mobile": "750px × 1000px",
      "dimensions_desktop": "1920px × 1080px",
      "optimization": "Compress to <200KB",
      "lazy_loading": true,
      "alt_text": "Descriptive, conveys meaning"
    },
    "card_images": {
      "format": "WebP with JPEG fallback",
      "dimensions": "600px × 400px (3:2 aspect ratio)",
      "optimization": "Compress to <100KB",
      "lazy_loading": true
    },
    "icons": {
      "format": "SVG preferred, or icon font (lucide-react)",
      "size": "24px standard, 32px for feature icons",
      "color": "Inherit from parent or use CSS variables"
    },
    "logos": {
      "format": "SVG for scalability",
      "fallback": "PNG at 2x resolution",
      "dimensions": "Maintain aspect ratio, max-width: 200px"
    },
    "pwa_icons": {
      "sizes_required": ["192px × 192px", "512px × 512px"],
      "format": "PNG",
      "background": "Solid color or transparent",
      "maskable": "Provide maskable icon variant for Android"
    }
  }
}
```

---

## PWA Implementation Requirements

### Manifest.json Configuration

```json
{
  "manifest_requirements": {
    "name": "WSSC Water",
    "short_name": "WSSC",
    "description": "Manage your WSSC Water account, pay bills, and access services",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait-primary",
    "theme_color": "#0066CC",
    "background_color": "#FFFFFF",
    "icons": [
      {
        "src": "/icons/icon-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/icons/icon-512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/icons/icon-maskable-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/icons/icon-maskable-512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
    "categories": ["utilities", "finance"],
    "screenshots": [
      {
        "src": "/screenshots/mobile-1.png",
        "sizes": "750x1334",
        "type": "image/png",
        "form_factor": "narrow"
      }
    ]
  }
}
```

### Service Worker Strategy

```json
{
  "service_worker_strategy": {
    "caching_strategy": {
      "static_assets": "Cache-first (CSS, JS, fonts, images)",
      "api_calls": "Network-first with cache fallback",
      "pages": "Network-first with offline fallback page"
    },
    "offline_fallback": {
      "page": "/offline.html",
      "content": "Branded offline page with cached content access",
      "features": [
        "View cached bills",
        "Access account information",
        "View service history",
        "Contact information"
      ]
    },
    "background_sync": {
      "usage": "Queue bill payments when offline, sync when online",
      "notification": "Show success notification after sync"
    },
    "push_notifications": {
      "triggers": [
        "Bill due in 3 days",
        "Payment confirmation",
        "Service outage alerts",
        "Water quality updates"
      ],
      "frequency": "Max 1 per day unless critical",
      "opt_in": "User must explicitly enable"
    }
  }
}
```

---

## Performance Optimization

### Performance Targets

```json
{
  "performance_targets": {
    "first_contentful_paint": "<1.8s",
    "largest_contentful_paint": "<2.5s",
    "time_to_interactive": "<3.8s",
    "cumulative_layout_shift": "<0.1",
    "first_input_delay": "<100ms",
    "mobile_page_speed": "90+ on Lighthouse",
    "desktop_page_speed": "95+ on Lighthouse"
  },
  "optimization_techniques": {
    "code_splitting": "Lazy load routes and components",
    "image_optimization": "WebP format, lazy loading, responsive images",
    "font_loading": "font-display: swap, preload critical fonts",
    "css_optimization": "Critical CSS inline, defer non-critical",
    "javascript": "Minify, tree-shake, defer non-critical scripts",
    "caching": "Service worker caching, browser caching headers"
  }
}
```

---

## Instructions to Main Agent

### Implementation Priority

1. **Mobile-First Development**
   - Start with mobile layouts (320px-767px)
   - Use mobile-first media queries
   - Test on real devices (iPhone SE, iPhone 12/13/14, Samsung Galaxy S21)
   - Ensure all touch targets are minimum 48px × 48px

2. **Accessibility First**
   - Implement proper semantic HTML structure
   - Add ARIA labels to all interactive elements
   - Ensure 4.5:1 color contrast minimum
   - Test with screen readers (VoiceOver, TalkBack)
   - Provide keyboard navigation for all features
   - Add data-testid to all interactive elements

3. **PWA Implementation**
   - Create manifest.json with all required fields
   - Implement service worker with offline support
   - Create offline fallback page
   - Add install prompt UI component
   - Implement push notification permission flow
   - Test installability on iOS and Android

4. **Component Usage**
   - Use shadcn/ui components as primary UI library
   - Import from /app/frontend/src/components/ui/
   - Customize with Tailwind CSS classes
   - Follow naming conventions (named exports for components)

5. **Responsive Breakpoints**
   - Mobile: 320px - 767px (base styles)
   - Tablet: 768px - 1023px
   - Desktop: 1024px+
   - Use clamp() for fluid typography
   - Test at all breakpoints

6. **Color Implementation**
   - Use CSS variables from App.css
   - Never use dark gradients (purple/pink, blue-purple)
   - Limit gradients to <20% viewport coverage
   - Ensure WCAG AA contrast ratios
   - Test with color blindness simulators

7. **Typography**
   - Use Chivo for headings (already imported)
   - Use Karla for body text (already imported)
   - Minimum 16px font size for inputs (prevents iOS zoom)
   - Use clamp() for responsive sizing
   - Maintain 1.6-1.7 line-height for readability

8. **Forms**
   - Use shadcn Form components with validation
   - Labels above inputs (mobile-friendly)
   - 48px minimum input height
   - Clear error messages with icons
   - Native date/select pickers on mobile

9. **Navigation**
   - Hamburger menu for mobile (shadcn Sheet component)
   - Sticky header (64px height)
   - Bottom navigation optional for app-like feel
   - Breadcrumbs collapse on mobile

10. **Loading & Feedback**
    - Use Skeleton components for initial loads
    - Sonner for toast notifications
    - Progress bars for page transitions
    - Clear loading states on buttons
    - Offline indicator when no connection

11. **Testing Requirements**
    - Test on iPhone SE (smallest screen)
    - Test on iPhone 14 Pro Max (largest phone)
    - Test on iPad (tablet)
    - Test with VoiceOver/TalkBack
    - Test keyboard navigation
    - Test offline functionality
    - Lighthouse audit (90+ mobile score)

12. **Animation Guidelines**
    - Use 0.2s-0.3s for most transitions
    - Implement prefers-reduced-motion
    - Subtle hover effects (translateY(-2px))
    - Scale down on press (0.97)
    - Smooth page transitions

### Critical Don'ts

- ❌ DO NOT use dark gradients (purple/pink, blue-purple, etc.)
- ❌ DO NOT use gradients on more than 20% of viewport
- ❌ DO NOT use emoji icons (use lucide-react or FontAwesome)
- ❌ DO NOT center-align app container globally
- ❌ DO NOT use `transition: all` (breaks transforms)
- ❌ DO NOT use font-size below 16px for inputs
- ❌ DO NOT remove focus outlines without custom replacement
- ❌ DO NOT use color alone to convey information
- ❌ DO NOT create touch targets smaller than 48px × 48px
- ❌ DO NOT forget data-testid attributes

### File Structure

```
/app/frontend/src/
├── components/
│   ├── ui/ (shadcn components - use these)
│   ├── layout/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── MobileNav.js
│   │   └── BottomNav.js (optional)
│   ├── pwa/
│   │   ├── InstallPrompt.js
│   │   ├── OfflineIndicator.js
│   │   └── NotificationPermission.js
│   └── features/
│       ├── BillPayment.js
│       ├── ServiceRequest.js
│       └── AccountDashboard.js
├── App.css (existing - contains design tokens)
├── index.css (existing - Tailwind base)
└── App.js (main component)

/public/
├── manifest.json (create)
├── service-worker.js (create)
├── offline.html (create)
└── icons/ (create)
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-192.png
    └── icon-maskable-512.png
```

---

## Common Mistakes to Avoid

### ❌ Don't:
- Mix multiple gradient directions in same section
- Use gradients on small UI elements
- Skip responsive font sizing
- Ignore glassmorphism effects for secondary buttons
- Forget hover and focus states
- Use dark purple, dark blue, dark pink, dark red, dark orange in any gradient
- Create buttons smaller than 48px height
- Use color-only indicators (add icons/text)
- Forget alt text on images
- Skip keyboard navigation testing

### ✅ Do:
- Keep gradients for hero sections and major CTAs only (light colors)
- Use solid colors for content and reading areas
- Maintain consistent spacing using the spacing system
- Test on mobile devices with touch interactions
- Include accessibility features (focus states, contrast)
- Use the pill/capsule button style for primary actions
- Add data-testid to all interactive elements
- Test with screen readers
- Implement offline functionality
- Optimize images (WebP format)

---

## Design Personality & Brand Attributes

### Brand Characteristics
- **Professional**: Government utility, trustworthy, reliable
- **Modern**: Contemporary design, not outdated
- **Accessible**: Inclusive, easy to use for all ages and abilities
- **Efficient**: Quick task completion, minimal friction
- **Transparent**: Clear information, no hidden fees
- **Community-Focused**: Serving the public good

### Visual Tone
- Clean and uncluttered
- Calm and reassuring (water theme)
- Authoritative but approachable
- Technology-forward but not intimidating
- Consistent and predictable

---

## Additional Libraries & Tools

### Recommended Additions

```json
{
  "additional_libraries": {
    "icons": {
      "library": "lucide-react (already installed)",
      "usage": "All icons throughout the app",
      "size": "24px standard, 32px for features"
    },
    "animations": {
      "library": "Framer Motion (optional)",
      "installation": "npm install framer-motion",
      "usage": "Page transitions, complex animations"
    },
    "charts": {
      "library": "Recharts (if needed for usage charts)",
      "installation": "npm install recharts",
      "usage": "Water usage graphs, billing history"
    },
    "date_handling": {
      "library": "date-fns",
      "installation": "npm install date-fns",
      "usage": "Date formatting, calculations"
    },
    "form_validation": {
      "library": "React Hook Form + Zod (recommended with shadcn)",
      "installation": "npm install react-hook-form zod @hookform/resolvers",
      "usage": "Form validation, error handling"
    }
  }
}
```

---

## Testing Checklist

### Pre-Launch Testing

- [ ] Test on iPhone SE (375px width)
- [ ] Test on iPhone 12/13/14 (390px width)
- [ ] Test on iPhone 14 Pro Max (428px width)
- [ ] Test on Samsung Galaxy S21 (360px width)
- [ ] Test on iPad (768px width)
- [ ] Test on desktop (1024px+ width)
- [ ] Test with VoiceOver (iOS)
- [ ] Test with TalkBack (Android)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test with screen zoom at 200%
- [ ] Test offline functionality
- [ ] Test install prompt on iOS and Android
- [ ] Test push notifications
- [ ] Run Lighthouse audit (target 90+ mobile)
- [ ] Test color contrast with WebAIM tool
- [ ] Test with color blindness simulator
- [ ] Verify all touch targets are 48px minimum
- [ ] Verify all interactive elements have data-testid
- [ ] Test form validation and error states
- [ ] Test loading states and skeleton screens
- [ ] Verify service worker caching

---

## Summary

This design system provides a comprehensive, mobile-first, accessible foundation for the WSSC Water website redesign. It prioritizes:

1. **Mobile optimization** with proper touch targets and responsive patterns
2. **PWA functionality** with offline support and installability
3. **Accessibility compliance** meeting WCAG 2.1 AA standards
4. **Government standards** with professional, trustworthy design
5. **Performance** with optimized assets and efficient loading
6. **User experience** with clear navigation and intuitive interactions

All components use the existing shadcn/ui library, maintain the water utility brand identity with blue color themes, and ensure a seamless experience across all devices and connection states.

---

# GENERAL UI UX DESIGN GUIDELINES (APPEND TO ALL PROJECTS)

## Universal Design Principles

### Transition Rules
- **NEVER** apply universal transitions like `transition: all`
- This breaks transforms and causes performance issues
- **ALWAYS** specify transitions for specific properties:
  ```css
  /* ✅ Good */
  transition: background-color 0.2s ease, transform 0.2s ease;
  
  /* ❌ Bad */
  transition: all 0.3s ease;
  ```
- Apply transitions only to interactive elements (buttons, inputs, cards)
- Exclude transforms from general transition rules

### Text Alignment
- **NEVER** center-align the app container globally
- Do not add `.App { text-align: center; }` in CSS files
- This disrupts natural reading flow and accessibility
- Center-align specific elements only when needed (headings, hero content)
- Default to left-aligned text for body content

### Icon Usage
- **NEVER** use emoji characters for icons (🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇)
- **ALWAYS** use proper icon libraries:
  - **lucide-react** (already installed) - Primary choice
  - **FontAwesome CDN** - Alternative option
- Icons should be semantic and accessible with proper aria-labels

### Gradient Restrictions (CRITICAL)

#### Prohibited Gradients
- **NEVER** use dark/saturated gradient combinations:
  - Purple to pink
  - Blue-500 to purple-600
  - Purple-500 to pink-500
  - Green-500 to blue-500
  - Red to pink
  - Any dark saturated color combos

#### Gradient Coverage Limits
- **NEVER** let gradients cover more than 20% of viewport
- **NEVER** apply gradients to text-heavy content or reading areas
- **NEVER** use gradients on small UI elements (<100px width)
- **NEVER** stack multiple gradient layers in same viewport

#### Enforcement Rule
**IF** gradient area exceeds 20% of viewport **OR** affects readability  
**THEN** use solid colors instead

#### Allowed Gradient Usage
- Section backgrounds (not content backgrounds)
- Hero section header content (dark to light to dark)
- Decorative overlays and accent elements only
- Hero sections with 2-3 mild colors
- Gradients can be horizontal, vertical, or diagonal

#### Special Case: AI Applications
- **DO NOT** use purple color for AI chat or voice applications
- Use alternative colors: light green, ocean blue, peach orange, etc.

### Interaction & Animation

#### Micro-Animations
- Every interaction needs micro-animations
- Include: hover states, transitions, parallax effects, entrance animations
- Static designs feel dead and unengaging
- Use subtle, purposeful animations (0.2s-0.3s duration)

#### Spacing Philosophy
- Use 2-3x more spacing than feels comfortable initially
- Cramped designs look cheap and unprofessional
- Generous whitespace improves readability and focus
- Follow the spacing scale consistently

#### Polish Details
- Add subtle grain textures or noise overlays
- Implement custom cursors for interactive elements
- Style selection states (::selection pseudo-element)
- Create thoughtful loading animations
- These details separate good from extraordinary design

### Color & Theme Strategy

#### Dynamic Color Selection
- **Before generating UI**, infer visual style from problem statement
- Set global design tokens immediately (primary, secondary, background, foreground, ring, state colors)
- **DO NOT** rely on library defaults
- **DO NOT** default to dark backgrounds without context

#### Color Inference Examples
- Playful/energetic → colorful scheme
- Monochrome/minimal → black-white/neutral scheme
- Professional/corporate → blue/gray scheme
- Creative/artistic → vibrant, varied palette

#### Background Color Rules
- Analyze problem statement first
- Choose background color based on context and audience
- Light backgrounds for readability and accessibility (default for most cases)
- Dark backgrounds only when appropriate for brand/context

### Component Strategy

#### Component Reuse
- **Prioritize** using pre-existing components from `src/components/ui`
- Create new components that match existing style and conventions
- Examine existing components before creating new ones
- Maintain consistency across the application

#### Component Library Priority
- **Primary**: Shadcn/UI components for consistency and accessibility
- Import path: `./components/[component-name]`
- **DO NOT** use basic HTML components (dropdown, calendar, toast)
- **ALWAYS** use `/app/frontend/src/components/ui/` components

#### Export Conventions
- **Components**: Use named exports (`export const ComponentName = ...`)
- **Pages**: Use default exports (`export default function PageName() {...}`)

#### Toast Notifications
- Use `sonner` for all toast notifications
- Sonner component location: `/app/src/components/ui/sonner.jsx`

### Visual Enhancement

#### Texture & Depth
- Use 2-4 color gradients (light colors only)
- Add subtle textures/noise overlays
- Implement CSS-based noise to avoid flat visuals
- Create depth without heavy shadows

#### Design Quality Standards
- Result should feel human-made, not AI-generated
- Visually appealing and conversion-focused
- Good contrast ratios (WCAG AA minimum)
- Balanced font sizes and hierarchy
- Proper use of gradients (limited, light)
- Sufficient whitespace
- Thoughtful motion and hierarchy
- Avoid overuse of any single element

### Calendar Components
- **ALWAYS** use shadcn calendar component
- Never create custom calendar from scratch
- Import from `/app/frontend/src/components/ui/calendar.jsx`

### Accessibility (WCAG 2.1 AA Minimum)

#### Color Contrast
- Text: 4.5:1 minimum (normal), 3:1 minimum (large 18pt+)
- UI components: 3:1 minimum
- Never rely on color alone to convey information

#### Focus Indicators
- Always visible on keyboard focus
- 2px solid outline with 2px offset
- Never remove without custom replacement
- Test with keyboard navigation

#### Touch Targets
- Minimum 48px × 48px on mobile
- Minimum 44px × 44px on tablet
- 8px minimum spacing between targets
- Larger targets for primary actions

#### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy (h1-h6)
- ARIA labels for icon buttons
- Alt text for all images
- Form labels for all inputs

#### Testing Requirements
- All interactive elements need `data-testid` attributes
- Use kebab-case convention
- Describe element role, not appearance
- Example: `data-testid="login-form-submit-button"`

---

**END OF DESIGN GUIDELINES**
