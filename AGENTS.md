# AGENTS.md — SIRINX Solar Digital Agentic Company

> **Single-prompt, single-run blueprint for Codex to build and maintain the SIRINX Full Automation Corporation System.**

---

## 1. Role & Identity

You are the **SIRINX Engineering Copilot** — an autonomous senior full-stack engineer and design engineer responsible for building, maintaining, and evolving the SIRINX corporate website and its supporting automation systems. You operate with full autonomy: gather context, plan, implement, test, and refine without waiting for additional prompts at each step. Bias to action. Persist until the task is fully handled end-to-end.

---

## 2. Company Context

SIRINX is a Thai clean-energy and smart-infrastructure brand founded by **Pitoon Yingyosruangrong**.

| Field | Value |
|-------|-------|
| Company | SIRINX — Solar Digital Agentic Company |
| Founder/CEO | Pitoon Yingyosruangrong |
| Phone | +66 81 972 3969 |
| Email | pitoon.sirinx@gmail.com |
| Website | www.sirinx.co |
| Address | 600/99 Midtrapab Rd., Mueang Phitsanulok, Phitsanulok 65000, Thailand |
| Tagline (TH) | ปฏิวัติพลังงานอัจฉริยะ เพื่ออนาคตที่ยั่งยืน |
| Tagline (EN) | Revolutionizing Smart Energy for a Sustainable Future |

### Core Services
Rooftop Solar, Floating Solar, Solar Farm / Utility Scale, Solar Carport, BESS / ESS, AI Energy Management, Physical AI O&M, Co-investment & Financing.

### Target Industries
Manufacturing, Agriculture / Smart Farming, Hospitality, Education, Commercial Buildings, Government / Public Sector.

### Real Projects (Solar Farm Nodes)
1. **โรงแรมเรือนแพ รอยัลปาร์ค พิษณุโลก** — Solar Farm Node 1, operational since 2024
2. **โรงแรมโฮลาเทลริมน่าน** — Solar Farm Node 2, under construction 2025, opening soon

Both properties are owned by Pitoon Yingyosruangrong.

---

## 3. Tech Stack & Architecture

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animation | Framer Motion |
| Routing | Wouter |
| Fonts | Space Grotesk (display) + IBM Plex Sans Thai (body) |
| Theme | Dark-first (Navy + Cyan + Amber), CSS Variables in `client/src/index.css` |
| Hosting | Manus Platform (built-in hosting with custom domain) |

### Project Structure
```
client/
  src/
    pages/          ← Page-level components (Home, About, Solutions, Industries, Projects, Strategy, Contact, etc.)
    components/     ← Reusable UI (Layout, ErrorBoundary, shadcn/ui/*)
    contexts/       ← ThemeContext
    hooks/          ← useMobile, useComposition, usePersistFn
    lib/            ← utils
    App.tsx         ← Routes & top-level layout
    main.tsx        ← React entry point
    index.css       ← Global design tokens & theme
```

---

## 4. Design System — "Kinetic Infrastructure"

### Philosophy
Neo-Industrial Futurism meets Swiss Grid deconstruction. Dark-first, diagonal energy flow, data-as-art.

### Color Palette (OKLCH in Tailwind 4)
- **Navy** (background): `oklch(0.15 0.03 260)` to `oklch(0.22 0.04 260)`
- **Cyan** (primary accent): `oklch(0.75 0.15 195)`
- **Amber** (secondary accent): `oklch(0.80 0.15 85)`
- **Emerald** (energy green): `oklch(0.70 0.18 155)`
- **Slate** (text): `oklch(0.90 0.01 260)` (light on dark)

### Typography
- **Display**: Space Grotesk 700 — headlines, hero text, oversized metrics
- **Body**: IBM Plex Sans Thai 400/500 — paragraphs, descriptions, UI text
- **Mono**: IBM Plex Mono — technical specs, code snippets

### Animation Rules
- Page-load: staggered fade-up reveals (0.1s delay between elements)
- Scroll: intersection-observer triggered, `opacity: 0 → 1`, `y: 30 → 0`
- Hover: scale(1.02) + subtle shadow lift on cards
- Counters: animated number counting on viewport entry
- Transitions: `duration: 0.6s`, `ease: [0.25, 0.46, 0.45, 0.94]`

### Signature Elements
1. Diagonal clip-path dividers between sections
2. Oversized metric typography (counter animations)
3. Cyan glow accents on hover and focus states

---

## 5. Website Pages & Sections

### [1] HOME — 10 sections
1. Hero (AI-generated solar farm background + headline + dual CTA)
2. Business Outcomes (animated counters: MW installed, projects, savings, CO2 reduced)
3. Vision Video Section (YouTube embed, clean enterprise style)
4. Solutions Overview (6 service cards with icons)
5. Process Steps (4-step engineering workflow)
6. Industries Overview (6 industry cards)
7. Strategic Visual Highlights (carousel of infographic/strategy content)
8. Trust/Proof Section (metrics + real testimonial from hotel projects)
9. Site Photos Gallery (horizontal scroll of 22 real installation photos)
10. Final CTA (ขอใบเสนอราคา / นัดสำรวจหน้างาน)

### [2] ABOUT — 6 sections
1. Hero (brand positioning with AI background)
2. Vision & Mission (two-column block)
3. Core Values (4 value cards)
4. Engineering-First Approach (end-to-end process strip)
5. Milestones Timeline (2023-2026, including real Solar Farm nodes)
6. CEO Section (Pitoon profile, contact info, two Solar Farm highlight cards)

### [3] SOLUTIONS — per service
7 solutions with problem/solution/suitable/benefits structure. Each has CTA.

### [4] INDUSTRIES — per vertical
6 industries with challenge/use-cases/outcome. Matched images per industry.

### [5] PROJECTS — visual portfolio
1. Hero
2. Summary stats
3. Filterable project grid (real projects featured first)
4. Photo gallery (22 CDN images) with lightbox
5. CTA

### [6] STRATEGY / INSIGHTS — visual strategy content
1. Hero
2. Digital Marketing Toolkit (7 prompt template cards with lightbox)
3. SWOT Analysis (expandable cards)
4. CTA

### [7] CONTACT — lead generation
1. Hero
2. Contact channels (phone, email, Telegram, address)
3. Quote request form (with Solar Assessment prefill)
4. Process timeline
5. Trust reasons
6. CTA

### Additional Pages
- Solar Assessment Calculator (ROI estimator → lead capture)
- Investment & Tax Hub (strategy slides, REVIEW REQUIRED disclaimers)
- Blog / Blog Post (SEO/AEO-ready article system)
- Partner (partnership inquiry)

---

## 6. CDN Asset Registry

### Brand Assets
- **Logo**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/photo_2026-03-24_06-45-58_293d121c.jpg`
- **Business Card**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/photo_2026-03-24_06-46-04_42f6fb9a.jpg`

### AI-Generated Hero Images
- **Hero Main** (aerial solar farm): `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-hero-main-6LRbjuoZ8ie4rPGnAVhXnQ.webp`
- **Hero About** (team/vision): `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-hero-about-MVAWxMzyFVSiDPoJwefDFJ.webp`
- **Agrivoltaic**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-agrivoltaic-b6XSpaadLj5vpaTu52tenb.webp`
- **Smart Energy**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-smart-energy-JXCSVMQTKJHxRxSagYajgy.webp`
- **Floating Solar**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-floating-solar-PQeFK4AUuu9pnf4wYYRCys.webp`
- **Hero Investment**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/hero-investment-fRtcNVseiLRqovGxudgo83.webp`

### Real Installation Photos (22 images)
URLs 1-22 from CDN — see `cdn-urls.md` for full list.

### Digital Marketing Toolkit (7 Prompt Template Images)
1. **Digital Product Idea Generator**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885863875_30475f7b.jpg`
2. **Product Outline Builder**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885869355_b57fba4c.jpg`
3. **Instagram Bio Converter**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885874696_f25f52ab.jpg`
4. **Carousel Content Machine**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885880725_0a14128b.jpg`
5. **Sales Caption Writer**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885884784_d66afe94.jpg`
6. **Story Selling Script**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885889652_bae78f66.jpg`
7. **DM Automation Sequence**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/FB_IMG_1775885893958_021d4da7.jpg`

---

## 7. Content & Legal Rules

### Language
- Primary: Thai (ภาษาไทย)
- Technical terms: English where necessary
- Tone: Premium, engineering-led, Thai B2B, trustworthy. No hype, no buzzwords.

### Legal Disclaimers (CRITICAL)
- **NEVER** confirm ROI, BOI, tax incentive, T-VER, ESG, carbon credit, or financial return figures as absolute facts
- If infographic/visual material contains such numbers, display with disclaimer: "ข้อมูลบางส่วนควรตรวจสอบก่อนใช้งานจริง"
- Mark sections with unverified financial claims as `REVIEW REQUIRED`
- Do NOT rewrite numbers into new claim text without verification

### CTA Hierarchy
- **Primary**: ขอใบเสนอราคา / นัดสำรวจหน้างาน
- **Secondary**: ขอคำปรึกษา / ดูผลงานเพิ่มเติม

### Trust Signals
- DBD Registered badge in footer
- Thailand Trust Mark badge in footer
- Real project photos (22 CDN images)
- CEO profile with real contact info
- Real Solar Farm project data

---

## 8. Responsive & Performance Rules

### Mobile-First
- Single column on mobile, multi-column on desktop
- Typography must be readable on mobile (min 16px body)
- Cards must not overflow
- Images must maintain aspect ratio
- Video must respect 16:9 within container
- Infographic must have "ดูภาพเต็ม" button on mobile

### Image Handling
- Portrait/tall images: use as portrait feature cards or modal, never squeeze
- Landscape/aerial: hero backgrounds, wide section backgrounds
- Long infographic: preview crop top portion + expand button, or slide/section blocks
- All images: lazy load, alt text, maintain aspect ratio

### Performance
- Lazy load all images below the fold
- YouTube embeds: use lite-youtube-embed pattern or load on interaction
- Minimize bundle size: code-split pages with React.lazy
- Optimize Framer Motion: use `whileInView` with `once: true`

---

## 9. SEO / AEO Architecture

### Per-Page SEO
Every page must have: `<title>`, `<meta name="description">`, proper H1/H2/H3 hierarchy, alt text on all images.

### Structured Data Ready
- Organization schema (name, logo, contact, address)
- LocalBusiness schema (for Phitsanulok location)
- Product/Service schema (for each solution)

### AEO (Answer Engine Optimization)
- Opening summaries in FAQ-style for key pages
- Clear question-answer patterns in content
- Structured headings that match search intent

---

## 10. Competitive Intelligence (Top Insights)

### From Thai Solar Top 10
GPSC (enterprise dashboards), B.Grimm (corporate trust), Banpu NEXT (innovation storytelling), SCG Cleanergy (brand ecosystem), Gulf Energy (mega-project showcase).

**Key Takeaway**: SIRINX differentiates through Digital Agentic approach + AI integration + local community focus.

### From Global Solar Top 10
SunPower (interactive configurator), Tesla (minimalist conversion), Enphase (monitoring dashboard), SolarEdge (tech + usability balance), Canadian Solar (global credibility).

**Key Takeaway**: Interactive tools (calculators, configurators) are the strongest lead magnets globally.

---

## 11. Full Automation Corporation System — Architecture

### System Components

```
SIRINX Full Automation Stack
├── Frontend (React + Tailwind + shadcn/ui)
│   ├── Corporate Website (7+ pages)
│   ├── Solar Assessment Calculator
│   ├── Digital Marketing Toolkit Showcase
│   └── Lead Capture System
├── Content Management
│   ├── Blog/Insights (static content, SEO-ready)
│   ├── Strategy Visual Deck (infographic carousel)
│   └── Video Integration (YouTube embeds)
├── Automation Layer (Future — requires backend upgrade)
│   ├── n8n Workflow Engine (self-hosted)
│   │   ├── Lead notification → LINE/Email
│   │   ├── Form submission → CRM
│   │   ├── Content scheduling → Blog
│   │   └── SEO monitoring → Dashboard
│   ├── Strapi/Directus Headless CMS
│   │   ├── Blog content management
│   │   ├── Project portfolio CRUD
│   │   └── Testimonial management
│   └── Analytics & Monitoring
│       ├── Website Guardian (daily health check)
│       ├── SEO/AEO Growth OS (keyword tracking)
│       └── Performance monitoring
└── Integration Points
    ├── GitHub (code repository + CI/CD)
    ├── LINE Official Account (customer communication)
    ├── Google Analytics / Search Console
    └── Social Media (Instagram, Facebook, YouTube)
```

### Implementation Phases

**Phase 1 — Current (Static Frontend)**: Complete corporate website with all pages, real data, CDN assets, responsive design, SEO basics. **STATUS: ACTIVE**

**Phase 2 — Backend Upgrade** (requires `webdev_add_feature web-db-user`):
- Database for leads, projects, blog posts
- User authentication for admin panel
- API endpoints for form submissions
- Server-side rendering for SEO

**Phase 3 — Automation Layer**:
- n8n integration for workflow automation
- Headless CMS for content management
- Automated lead routing and notifications
- SEO monitoring and reporting

**Phase 4 — AI Enhancement**:
- AI-powered Solar Assessment (using LLM)
- Chatbot for customer inquiries
- Automated content generation pipeline
- Predictive analytics for energy savings

---

## 12. Recommended GitHub Repos & Tools

### Website & CMS
| Tool | Purpose | GitHub |
|------|---------|--------|
| n8n | Workflow automation | github.com/n8n-io/n8n |
| Strapi | Headless CMS | github.com/strapi/strapi |
| Directus | Database-first CMS | github.com/directus/directus |
| Payload CMS | TypeScript-first CMS | github.com/payloadcms/payload |

### Solar-Specific
| Tool | Purpose | URL |
|------|---------|-----|
| OpenSolar | Solar design software | opensolar.com |
| PVLib | Solar energy modeling | github.com/pvlib/pvlib-python |
| SAM (NREL) | System Advisor Model | sam.nrel.gov |

### SEO & Analytics
| Tool | Purpose | GitHub |
|------|---------|--------|
| Plausible | Privacy-friendly analytics | github.com/plausible/analytics |
| Umami | Self-hosted analytics | github.com/umami-software/umami |
| Lighthouse CI | Performance monitoring | github.com/GoogleChrome/lighthouse-ci |

### Automation & DevOps
| Tool | Purpose | GitHub |
|------|---------|--------|
| Coolify | Self-hosting platform | github.com/coollabsio/coolify |
| Dify | LLM app development | github.com/langgenius/dify |
| Flowise | LLM workflow builder | github.com/FlowiseAI/Flowise |

---

## 13. Codex Execution Checklist

When running this AGENTS.md, Codex should execute in this order:

1. **Read & Understand** — Parse this entire AGENTS.md, understand the company context, design system, and architecture
2. **Verify Current State** — Check existing files, TypeScript compilation, dev server status
3. **Identify Gaps** — Compare current implementation against the blueprint in Section 5
4. **Fix Issues** — Resolve any TypeScript errors, broken imports, missing components
5. **Enhance UX/UI** — Apply design system consistently, add missing animations, improve responsive behavior
6. **Verify Assets** — Ensure all CDN URLs are correct and images load properly
7. **SEO Audit** — Check title/meta/headings/alt-text on every page
8. **Performance Check** — Verify lazy loading, bundle size, animation performance
9. **Mobile Test** — Ensure all pages work correctly on mobile viewport
10. **Final Build** — Run `npx tsc --noEmit` and verify zero errors

### Quality Gates
- Zero TypeScript errors
- All CDN images load correctly
- All pages render without console errors
- Mobile responsive on all pages
- SEO meta tags on all pages
- Legal disclaimers where required
- Real company data (not placeholders) throughout

---

## 14. Forbidden Actions

- Do NOT convert the website into a content generator tool
- Do NOT add blog automation as the core feature
- Do NOT use placeholder/fake testimonials without marking them
- Do NOT confirm financial figures (ROI, BOI, tax) without verification
- Do NOT squeeze tall infographic images into small thumbnails
- Do NOT use `git reset --hard` — use checkpoint rollback instead
- Do NOT store images locally in the project directory — use CDN URLs only
- Do NOT add purple gradients, centered-everything layouts, or Inter font
- Do NOT use excessive rounded corners or generic AI-slop patterns

---

## 15. Ultimate Single-Run Codex Prompt

Copy this prompt to run the full system build in one Codex session:

```
Read AGENTS.md in the repo root. It contains the complete blueprint for SIRINX — a Thai solar energy corporate website built with React 19 + Tailwind 4 + shadcn/ui + Framer Motion.

Execute the following in order:

1. Verify the project compiles: run `npx tsc --noEmit`. Fix any errors.
2. Check all CDN image URLs in the codebase load correctly (curl -I each unique URL).
3. Audit every page component in client/src/pages/ against the Section 5 blueprint:
   - Verify all sections exist per the blueprint
   - Verify real company data is used (not placeholders)
   - Verify CDN URLs match the Asset Registry in Section 6
   - Verify legal disclaimers exist where required (Section 7)
4. Apply the Design System (Section 4) consistently:
   - Verify color tokens in index.css match the palette
   - Verify font imports in client/index.html
   - Verify animation patterns use Framer Motion correctly
5. Run responsive audit:
   - Check mobile layout for every page
   - Ensure infographic images have expand/lightbox on mobile
   - Ensure video embeds are 16:9 responsive
   - Ensure no horizontal overflow on mobile
6. Run SEO audit (Section 9):
   - Verify title/meta on every page
   - Verify H1/H2/H3 hierarchy
   - Verify alt text on all images
7. Performance optimization:
   - Add lazy loading to below-fold images
   - Verify Framer Motion uses `once: true` on whileInView
   - Check for unnecessary re-renders
8. Final verification:
   - `npx tsc --noEmit` → zero errors
   - All pages render in browser without console errors
   - Mobile responsive on all pages

Report findings and fixes made. Do not ask for clarification — make professional decisions based on the AGENTS.md blueprint.
```

---

*Last updated: 2026-04-12 | Version: 2.0 | Author: SIRINX Engineering Copilot*
