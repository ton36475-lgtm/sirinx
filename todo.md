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
