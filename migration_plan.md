# Next.js + Sanity CMS Migration Plan

## Project Overview
Migrating WSSC Water redesign proposal demo from Create React App to Next.js 14 (App Router) + Sanity CMS architecture.

**User Requirements:**
1. Everything in Sanity CMS (all content managed through CMS)
2. Backend: Keep FastAPI for AI chat, use Next.js API routes for Sanity queries
3. Database: Keep MongoDB setup for AI chat logs, Sanity is additive only
4. All features migrated to Next.js
5. Full rebuild with Sanity-first architecture
6. No emojis
7. Test and report

---

## Phase 1: Project Foundation & Setup (Status: NOT STARTED)

### 1.1 Initialize Next.js Project
- [ ] Create new `/app/nextjs` directory structure
- [ ] Initialize Next.js 14 with App Router (`npx create-next-app@latest`)
- [ ] Configure TypeScript/JavaScript based on preference
- [ ] Install core dependencies: `next-sanity`, `@sanity/client`, `@portabletext/react`, `@sanity/image-url`
- [ ] Configure Tailwind CSS
- [ ] Set up Shadcn/UI components

### 1.2 Initialize Sanity Studio
- [ ] Create Sanity project: `npm create sanity@latest`
- [ ] Choose project name and dataset (production)
- [ ] Set up Sanity Studio in `/app/nextjs/studio` directory
- [ ] Configure authentication and permissions
- [ ] Deploy Sanity Studio

### 1.3 Environment Configuration
- [ ] Create `.env.local` with Sanity credentials
- [ ] Set up environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `SANITY_API_READ_TOKEN`
  - `SANITY_REVALIDATE_SECRET`
  - `REACT_APP_BACKEND_URL` (for FastAPI communication)
- [ ] Configure Next.js for external images (Sanity CDN)
- [ ] Configure CORS in Sanity project

---

## Phase 2: Content Modeling & Schema Design (Status: NOT STARTED)

### 2.1 Design Sanity Schemas

**Content Types to Model:**

#### Hero Section Schema
- Title (string)
- Tagline (string)
- Subtitle (text)
- CTA Button (object with text + link)
- Video Background URL (url)
- Logo Image (image)

#### Tech Stack Schema
- Name (string)
- Description (text)
- Logo/Icon (image)
- Order (number)
- Category (string: backend/frontend/infrastructure)

#### ROI Calculator Schema
- Field Label (string)
- Default Value (number)
- Field Type (string)
- Calculation Formula (text)
- Results Display (array of objects)

#### FAQ Schema
- Question (string)
- Answer (portable text - rich text)
- Category (string)
- Order (number)

#### AI Features Schema
- Title (string)
- Description (portable text)
- Demo Example (text)
- Icon/Emoji Alternative (string)
- Order (number)

#### Admin Dashboard Schema
- Section Title (string)
- Screenshots (array of images with captions)
- Features List (array of strings)

#### Comparison/Pain Points Schema
- Section Title (string)
- Current Challenges (array of strings)
- Solutions (array of strings)

#### Chatbot Configuration Schema
- Welcome Message (text)
- Quick Questions (array of strings)
- System Instructions (text)
- Enable/Disable (boolean)

#### Encore Contact Schema
- Company Name (string)
- Contact Person (string)
- Email (string)
- Phone (string)
- Website URL (url)
- Logo (image)
- Description (text)

### 2.2 Implement Schemas
- [ ] Create schema files in `/app/nextjs/studio/schemas/`
- [ ] Define all content types
- [ ] Set up relationships between documents
- [ ] Configure validation rules
- [ ] Set up preview configurations

---

## Phase 3: Data Migration (Status: NOT STARTED)

### 3.1 Extract Existing Content
- [ ] Audit current App.js for all hardcoded content
- [ ] Extract hero section text, images, CTAs
- [ ] Extract tech stack items
- [ ] Extract FAQ content
- [ ] Extract AI features descriptions
- [ ] Extract comparison/pain points data
- [ ] Extract Encore contact information

### 3.2 Populate Sanity Studio
- [ ] Manually input hero section content
- [ ] Add all tech stack items
- [ ] Import FAQ items
- [ ] Add AI features
- [ ] Upload all images to Sanity
- [ ] Configure admin dashboard screenshots
- [ ] Add Encore contact section

---

## Phase 4: Next.js Implementation (Status: NOT STARTED)

### 4.1 Sanity Client Setup
- [ ] Create `/app/nextjs/src/lib/sanity/client.ts`
- [ ] Configure Sanity client for server-side fetching
- [ ] Create GROQ query helpers
- [ ] Set up image URL builder

### 4.2 Layout & Global Components
- [ ] Create root layout (`app/layout.tsx`)
- [ ] Implement global navigation (if needed)
- [ ] Set up global styles
- [ ] Configure fonts

### 4.3 Implement Sections as Next.js Components

**Convert existing sections:**
- [ ] Hero Section with video background
  - Fetch data from Sanity
  - Implement phone simulation (client component)
  - Integrate video background
- [ ] Pain Points / Comparison Section
  - Fetch from Sanity
  - Render comparison cards
- [ ] AI Features Section
  - Fetch from Sanity
  - Create feature card grid
- [ ] Chatbot Demo Section
  - Keep existing FastAPI integration
  - Fetch config from Sanity (quick questions, etc.)
  - Client component for interactivity
- [ ] ROI Calculator
  - Fetch fields/config from Sanity
  - Client component for calculations
- [ ] Admin Dashboard Showcase
  - Fetch screenshots from Sanity
  - Implement rotation/carousel
- [ ] Tech Stack Section
  - Fetch from Sanity
  - Render tech cards
- [ ] Encore Contact Section
  - Fetch from Sanity
  - Render contact card

### 4.4 Phone Simulation
- [ ] Extract phone simulation logic to separate client component
- [ ] Maintain all animations and states
- [ ] Fetch any configurable text from Sanity

### 4.5 Chatbot Integration
- [ ] Create client component for chat interface
- [ ] Maintain connection to FastAPI backend (`/api/chat`)
- [ ] Fetch quick questions from Sanity
- [ ] Maintain all existing chat functionality

---

## Phase 5: API Routes & Backend Integration (Status: NOT STARTED)

### 5.1 Next.js API Routes for Sanity
- [ ] Create `/app/nextjs/src/app/api/sanity/[...params]/route.ts` for dynamic Sanity queries (optional)
- [ ] Implement revalidation webhook endpoint (`/api/revalidate`)

### 5.2 FastAPI Backend Connection
- [ ] Ensure Next.js can call FastAPI backend for AI chat
- [ ] Configure CORS on FastAPI to accept Next.js origin
- [ ] Test all backend endpoints from Next.js
- [ ] Maintain MongoDB integration for chat logs

### 5.3 Revalidation Setup
- [ ] Configure Sanity webhooks to trigger Next.js revalidation
- [ ] Implement path-based or tag-based revalidation
- [ ] Test webhook connectivity

---

## Phase 6: Styling & Design (Status: NOT STARTED)

### 6.1 Design System
- [ ] Port existing CSS to Tailwind utilities
- [ ] Maintain WSSC brand colors
- [ ] Implement Shadcn components where appropriate
- [ ] Ensure all animations are preserved

### 6.2 Responsive Design
- [ ] Test all sections on mobile, tablet, desktop
- [ ] Ensure phone simulation scales properly
- [ ] Optimize images for different viewports

### 6.3 Performance Optimization
- [ ] Implement proper image optimization with Next.js Image component
- [ ] Use Sanity image CDN with proper sizing
- [ ] Implement lazy loading where appropriate
- [ ] Optimize video background loading

---

## Phase 7: Testing (Status: NOT STARTED)

### 7.1 Unit Testing
- [ ] Test Sanity client utilities
- [ ] Test GROQ queries
- [ ] Test data transformation functions

### 7.2 Component Testing
- [ ] Test all Server Components render correctly
- [ ] Test Client Components interactivity
- [ ] Test phone simulation animations
- [ ] Test chatbot functionality

### 7.3 Integration Testing
- [ ] Test FastAPI chat integration
- [ ] Test Sanity data fetching
- [ ] Test revalidation webhooks
- [ ] Test image loading and optimization

### 7.4 End-to-End Testing
- [ ] Test complete user journey
- [ ] Test all CTAs and links
- [ ] Test form submissions (if any)
- [ ] Test error states

---

## Phase 8: Deployment (Status: NOT STARTED)

### 8.1 Sanity Studio Deployment
- [ ] Deploy Sanity Studio (hosted by Sanity)
- [ ] Configure production dataset
- [ ] Set up user permissions

### 8.2 Next.js Deployment (Vercel)
- [ ] Connect GitHub/Git repository to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Set up production domain
- [ ] Configure build settings
- [ ] Deploy to production

### 8.3 FastAPI Backend
- [ ] Ensure FastAPI backend remains accessible
- [ ] Update CORS settings for new Next.js domain
- [ ] Test backend endpoints from production

### 8.4 Post-Deployment
- [ ] Configure Sanity webhooks with production URL
- [ ] Test revalidation in production
- [ ] Monitor performance
- [ ] Test all features in production environment

---

## Phase 9: Documentation & Handoff (Status: NOT STARTED)

### 9.1 Technical Documentation
- [ ] Document Sanity schema structure
- [ ] Document API endpoints
- [ ] Document environment variables
- [ ] Create deployment guide
- [ ] Document content management workflow

### 9.2 Content Editor Guide
- [ ] Create guide for editing content in Sanity Studio
- [ ] Document how to add new content types
- [ ] Explain content publishing workflow
- [ ] Document image upload best practices

---

## Success Criteria

- [ ] All existing features functional in Next.js
- [ ] All content manageable through Sanity CMS
- [ ] FastAPI AI chat integration working
- [ ] MongoDB chat logs persisting correctly
- [ ] Phone simulation animations working perfectly
- [ ] Vercel deployment successful
- [ ] Webhooks triggering revalidation correctly
- [ ] Performance metrics meeting standards (Lighthouse score > 90)
- [ ] All tests passing
- [ ] Documentation complete

---

## Technical Stack Summary

**Frontend:**
- Next.js 14 (App Router)
- React Server Components
- Tailwind CSS
- Shadcn/UI Components

**CMS:**
- Sanity CMS (all content)
- Sanity Studio (content management)

**Backend:**
- FastAPI (AI chat endpoint)
- Next.js API Routes (Sanity queries, revalidation)

**Database:**
- MongoDB (AI chat logs, existing)
- Sanity Content Lake (CMS content)

**Deployment:**
- Vercel (Next.js frontend)
- Existing FastAPI hosting (unchanged)
- Sanity Cloud (Studio hosting)

---

## Next Steps

1. Get user confirmation on this plan
2. Begin Phase 1: Project Foundation & Setup
3. Proceed incrementally through each phase
4. Test thoroughly after each phase
5. Deploy when all phases complete
