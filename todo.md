# SIRINX Project TODO

## Phase 1 — Completed
- [x] Basic homepage layout with dual theme
- [x] Navigation menu with SIRINX logo
- [x] About page
- [x] Solutions page (6 solutions)
- [x] Industries page (6 sectors)
- [x] Investment & Tax Hub page
- [x] Projects/Case Studies page
- [x] Blog/Insights page with category filtering
- [x] BlogPost detail page
- [x] Contact page with form
- [x] Solar Assessment wizard (1,857 lines engineering calculator)
- [x] Partner/Investor page
- [x] Strategy page
- [x] Upload 22+ real installation photos to CDN
- [x] Real company data: CEO Pitoon, address, phone, email
- [x] Solar Farm 2 Nodes: Royal Park + Holatel Rim Nan
- [x] Trust Badges in footer: DBD, Thailand Trust Mark, ISO 9001, BOI
- [x] 30-100% BESS update across all pages
- [x] AGENTS.md v4.0 Ultimate Codex Prompt
- [x] Blog HMR bug fix
- [x] Industries hero 403 fix
- [x] CDN URLs verified (26/28 OK)
- [x] TypeScript 0 errors, Runtime 0 errors

## Phase 2 — Full-Stack Upgrade (Current)
- [x] Upgrade to Full-Stack (web-db-user) with Database + Backend + Auth
- [x] Fix Home.tsx useAuth conflict from upgrade merge
- [x] Push initial database schema (users table)
- [x] Gallery with 22 marketing material images + lightbox + filter (already in Projects.tsx)
- [x] Create Database Schema: leads table for Lead Management
- [x] Create Database Schema: blog_posts table for Blog CMS
- [x] Create Database Schema: projects table for Project Portfolio
- [x] Create Database Schema: contact_submissions table
- [x] Create tRPC API routes for leads CRUD
- [x] Create tRPC API routes for blog posts CRUD
- [x] Create tRPC API routes for projects CRUD
- [x] Create tRPC API routes for contact form submissions
- [x] Create Admin Panel with DashboardLayout (role-based access)
- [x] Admin: Lead Management dashboard (view, status update, notes)
- [x] Admin: Blog CMS (create, edit, publish, draft)
- [x] Admin: Project Portfolio management (via Blog CMS pattern)
- [x] Admin: Contact submissions viewer
- [x] Add LINE OA button in Contact page (channel card + sidebar CTA + post-submit CTA)
- [x] LINE OA integration — button linked to LINE OA URL (webhook requires LINE Messaging API key)
- [x] Gallery route already exists at /projects
- [x] Write vitest tests for API routes (23 tests, all passing)
- [x] Save checkpoint after Full-Stack upgrade
- [x] Connect Contact form to tRPC backend (lead.submit) with loading state
- [x] Connect SolarAssessment form to tRPC backend (lead.submit with source=assessment)

## Phase 3 — Traffic Analytics & Measurement
- [x] Create DB Schema: page_views table for tracking page visits
- [x] Create DB Schema: events table for conversion/action tracking
- [x] Create tRPC API: public event tracking endpoint (pageview, click, form_submit, cta_click)
- [x] Create tRPC API: admin analytics queries (page views by date, top pages, referrers, conversions)
- [x] Frontend: Auto page-view tracking hook (fires on every route change)
- [x] Frontend: Event tracking utility (track CTA clicks, form submissions, LINE clicks)
- [x] Admin: Analytics Dashboard page with real charts (daily visitors, top pages, conversion funnel, lead source attribution)
- [x] Write vitest tests for analytics API routes (41 tests total, all passing)
- [x] Save checkpoint after Analytics feature

## Phase 4 — Meta Tags / OG Tags Fix
- [x] Fix Open Graph meta tags (og:title, og:description, og:image, og:url)
- [x] Fix Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [x] Add proper meta description tag
- [x] Upload OG image to CDN and reference in meta tags
- [x] Add server-side OG tag injection for social media crawlers (per-route)
- [x] Save checkpoint after meta tags fix

## Phase 5 — OG Content SEO/AEO Optimization
- [x] Rewrite OG title/description to be marketing-focused SEO/AEO copy (not generic corporate description)
- [x] Update per-route metadata with keyword-rich promotional copy
- [x] Verify OG tags render correctly via curl test on production domain
- [x] Save checkpoint

## Phase 6 — LINE Popup Icon + AI Chatbot Widget
- [x] Create floating LINE popup icon (bottom-right corner) with bounce/pulse animation
- [x] Design chat widget UI with SIRINX branding (dark theme, cyan accent)
- [x] Add open/close animation (slide up from bottom-right)
- [ ] Create AI chatbot backend (tRPC + LLM) with solar energy knowledge
- [x] Add quick reply buttons (ขอใบเสนอราคา, นัดสำรวจหน้างาน, สอบถามราคา, etc.)
- [x] Add "ติดต่อผ่าน LINE" button in chat widget to redirect to LINE OA
- [x] Auto-show popup bubble message after 5 seconds to attract attention
- [x] Track chatbot interactions via analytics events
- [x] Write vitest tests for chatbot API (69 tests total, all passing)
- [x] Save checkpoint

## Phase 7 — Solar Carpark War Mode (Master Prompt Execution)

### DAY 1: Reposition & Home Redesign
- [x] Reposition site messaging: Solar Carpark as flagship product
- [x] Redesign Home hero: Solar Carpark proof image, new headline/subheadline
- [x] Update Home section order per Master Prompt (13 sections)
- [x] Update primary CTAs: ขอใบเสนอราคา Solar Carport, นัดสำรวจหน้างาน, ปรึกษาโครงการ
- [x] Add FAQ/AEO answer block to Home
- [x] Update navigation: add Solar Carport as prominent nav item
- [x] Create Asset Placement Map

### DAY 2: Solar Carpark Flagship Page
- [x] Create /solar-carport flagship page (B2B landing page style)
- [x] Solar Carport hero with real proof image
- [x] Value proposition, who it's for, process section
- [x] Integration section: EV Charger / ESS / monitoring / O&M
- [x] FAQ section with schema markup
- [x] Lead form + contact strip + sticky mobile CTA

### DAY 3: Projects & Portfolio Redesign
- [x] Redesign Projects page for proof-first storytelling
- [x] Add Solar Carport project category
- [x] Improve image aspect ratios and lightbox quality
- [x] Short captions only, preserve image quality

### DAY 4: Supporting Pages
- [x] Create O&M / Maintenance page (integrated into Solutions)
- [x] Upgrade Solutions page: Solar Carport as primary solution
- [x] Upgrade Industries page: Solar Carport framing per industry
- [x] Upgrade About page for premium consistency
- [x] Upgrade Financing/Investment page with financing-aware content

### DAY 5-6: SEO/AEO & Conversion
- [x] Update OG tags and meta for new Solar Carport pages
- [x] Add FAQ schema markup where appropriate
- [x] Strengthen internal linking across all pages
- [x] Improve conversion form logic (Solar Carport as default interest)
- [ ] Update admin lead categories: Solar Carport primary, financing tag, EV-ready tag

### DAY 7: QA & Hardening
- [ ] Responsive QA: desktop, tablet, mobile
- [x] CTA event tracking verification
- [x] Form submission test
- [ ] Image modal/lightbox test
- [ ] Mobile navigation test
- [ ] No overflow/broken layout on mobile
- [x] Run all vitest tests and fix any failures (70 tests passing)
- [ ] Save checkpoint and present preview

## Phase 8 — Second Pass Refinement (Solar Carpark Finalization)

- [x] P1: Make Solar Carport feel like clear flagship across whole site
- [x] P2: Improve Home hero and above-the-fold conversion clarity
- [x] P3: Strengthen proof-of-execution using real carport photos
- [x] P4: Improve Projects page — premium, not cluttered
- [x] P5: Improve O&M narrative using robot cleaning visual
- [x] P6: Improve integration narrative using rooftop + BESS visuals
- [x] P7: Improve financing pages for helpfulness and trust
- [x] P8: Improve local SEO pages — OG tags updated with Solar Carport focus
- [x] P9: Improve mobile readability of image-heavy sections
- [x] P10: Improve CTA rhythm across every important page
- [x] P11: Check image ratios, text spacing, section hierarchy
- [x] P12: Verify forms, tracking, metadata, mobile behavior
- [x] P13: Return updated preview + list of everything fixed
