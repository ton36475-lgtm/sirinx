import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import * as db from "./db";

// ==================== LEAD ROUTER ====================

const leadRouter = router({
  /** Public: Submit a new lead (from Contact form, Assessment, Partner page) */
  submit: publicProcedure
    .input(
      z.object({
        source: z.enum(["contact", "assessment", "partner", "line"]).default("contact"),
        name: z.string().min(1, "กรุณากรอกชื่อ"),
        company: z.string().optional(),
        email: z.string().email("อีเมลไม่ถูกต้อง").optional().or(z.literal("")),
        phone: z.string().optional(),
        industry: z.string().optional(),
        interest: z.string().optional(),
        budget: z.string().optional(),
        timeline: z.string().optional(),
        systemSize: z.string().optional(),
        systemType: z.string().optional(),
        monthlyBill: z.string().optional(),
        bessInterest: z.string().optional(),
        message: z.string().optional(),
        lineUserId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Create lead
      const result = await db.createLead(input);

      // Also create contact submission for audit trail
      await db.createContactSubmission({
        leadId: result.id,
        formData: JSON.stringify(input),
        sourcePage: input.source,
        ipAddress: ctx.req.ip || ctx.req.headers["x-forwarded-for"]?.toString() || null,
      });

      // Notify owner about new lead
      try {
        await notifyOwner({
          title: `Lead ใหม่จาก ${input.source}: ${input.name}`,
          content: `ชื่อ: ${input.name}\nบริษัท: ${input.company || "-"}\nโทร: ${input.phone || "-"}\nอีเมล: ${input.email || "-"}\nความสนใจ: ${input.interest || "-"}\nงบประมาณ: ${input.budget || "-"}\nข้อความ: ${input.message || "-"}`,
        });
      } catch (e) {
        console.warn("[Lead] Failed to notify owner:", e);
      }

      return { success: true, id: result.id };
    }),

  /** Admin: List all leads with optional filters */
  list: adminProcedure
    .input(
      z.object({
        status: z.string().optional(),
        source: z.string().optional(),
        limit: z.number().min(1).max(200).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getLeads(input);
    }),

  /** Admin: Get single lead by ID */
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.getLeadById(input.id);
    }),

  /** Admin: Update lead status/notes */
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]).optional(),
        adminNotes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.updateLead(id, data);
    }),

  /** Admin: Get lead statistics */
  stats: adminProcedure.query(async () => {
    return db.getLeadStats();
  }),
});

// ==================== BLOG ROUTER ====================

const blogRouter = router({
  /** Public: List published blog posts */
  list: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getBlogPosts({ published: true, ...input });
    }),

  /** Public: Get single published blog post by slug */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db.getBlogPostBySlug(input.slug);
      if (!post || !post.published) return null;
      return post;
    }),

  /** Admin: List all blog posts (including drafts) */
  adminList: adminProcedure
    .input(
      z.object({
        published: z.boolean().optional(),
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getBlogPosts(input);
    }),

  /** Admin: Get single blog post by ID (including drafts) */
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.getBlogPostById(input.id);
    }),

  /** Admin: Create new blog post */
  create: adminProcedure
    .input(
      z.object({
        slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug ต้องเป็นตัวพิมพ์เล็ก ตัวเลข และ - เท่านั้น"),
        title: z.string().min(1, "กรุณากรอกหัวข้อ"),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().default(false),
        readTime: z.number().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return db.createBlogPost({
        ...input,
        authorId: ctx.user.id,
        author: ctx.user.name || "SIRINX Team",
        publishedAt: input.published ? new Date() : null,
      });
    }),

  /** Admin: Update blog post */
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        slug: z.string().optional(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().optional(),
        readTime: z.number().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      // Set publishedAt when first published
      if (data.published === true) {
        const existing = await db.getBlogPostById(id);
        if (existing && !existing.publishedAt) {
          (data as any).publishedAt = new Date();
        }
      }
      return db.updateBlogPost(id, data);
    }),

  /** Admin: Delete blog post */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return db.deleteBlogPost(input.id);
    }),
});

// ==================== PROJECT ROUTER ====================

const projectRouter = router({
  /** Public: List published projects */
  list: publicProcedure
    .input(
      z.object({
        tag: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getProjects({ published: true, tag: input?.tag });
    }),

  /** Admin: List all projects */
  adminList: adminProcedure.query(async () => {
    return db.getProjects();
  }),

  /** Admin: Create project */
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        location: z.string().optional(),
        type: z.string().optional(),
        capacity: z.string().optional(),
        saving: z.string().optional(),
        year: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        galleryImages: z.string().optional(),
        tag: z.string().optional(),
        sortOrder: z.number().optional(),
        published: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      return db.createProject(input);
    }),

  /** Admin: Update project */
  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        location: z.string().optional(),
        type: z.string().optional(),
        capacity: z.string().optional(),
        saving: z.string().optional(),
        year: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        galleryImages: z.string().optional(),
        tag: z.string().optional(),
        sortOrder: z.number().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.updateProject(id, data);
    }),

  /** Admin: Delete project */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return db.deleteProject(input.id);
    }),
});

// ==================== ANALYTICS ROUTER ====================

const analyticsRouter = router({
  /** Public: Record a page view (called automatically by frontend tracking) */
  trackPageView: publicProcedure
    .input(
      z.object({
        path: z.string().min(1),
        referrer: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        visitorId: z.string().optional(),
        sessionId: z.string().optional(),
        deviceType: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userAgent = ctx.req.headers["user-agent"] || null;
      return db.recordPageView({
        ...input,
        userAgent,
        referrer: input.referrer || null,
      });
    }),

  /** Public: Record an event (CTA click, form submit, LINE click, etc.) */
  trackEvent: publicProcedure
    .input(
      z.object({
        category: z.string().min(1),
        action: z.string().min(1),
        label: z.string().optional(),
        value: z.number().optional(),
        pagePath: z.string().optional(),
        visitorId: z.string().optional(),
        sessionId: z.string().optional(),
        metadata: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return db.recordEvent(input);
    }),

  /** Admin: Get page view analytics */
  pageViews: adminProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).default(30),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getPageViewAnalytics({ days: input?.days });
    }),

  /** Admin: Get event analytics */
  events: adminProcedure
    .input(
      z.object({
        days: z.number().min(1).max(365).default(30),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getEventAnalytics({ days: input?.days });
    }),
});

// ==================== CONTACT ROUTER ==

const contactRouter = router({
  /** Admin: List contact submissions */
  list: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(200).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      return db.getContactSubmissions(input);
    }),
});

// ==================== APP ROUTER ====================

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  lead: leadRouter,
  blog: blogRouter,
  project: projectRouter,
  contact: contactRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
