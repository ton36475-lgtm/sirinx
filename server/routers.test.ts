import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ==================== MOCK DB ====================

vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue({ id: 1 }),
  getLeads: vi.fn().mockResolvedValue([]),
  getLeadById: vi.fn().mockResolvedValue({ id: 1, name: "Test", status: "new" }),
  updateLead: vi.fn().mockResolvedValue({ success: true }),
  getLeadStats: vi.fn().mockResolvedValue({ total: 5, byStatus: { new: 3, contacted: 2 }, bySource: { contact: 5 } }),
  createBlogPost: vi.fn().mockResolvedValue({ id: 1 }),
  getBlogPosts: vi.fn().mockResolvedValue([]),
  getBlogPostBySlug: vi.fn().mockResolvedValue({ id: 1, slug: "test", title: "Test", published: true }),
  getBlogPostById: vi.fn().mockResolvedValue({ id: 1, slug: "test", title: "Test", published: false, publishedAt: null }),
  updateBlogPost: vi.fn().mockResolvedValue({ success: true }),
  deleteBlogPost: vi.fn().mockResolvedValue({ success: true }),
  createProject: vi.fn().mockResolvedValue({ id: 1 }),
  getProjects: vi.fn().mockResolvedValue([]),
  updateProject: vi.fn().mockResolvedValue({ success: true }),
  deleteProject: vi.fn().mockResolvedValue({ success: true }),
  createContactSubmission: vi.fn().mockResolvedValue({ id: 1 }),
  getContactSubmissions: vi.fn().mockResolvedValue([]),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ==================== HELPERS ====================

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      ip: "127.0.0.1",
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@sirinx.co",
    name: "Admin",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
      ip: "127.0.0.1",
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
      ip: "127.0.0.1",
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ==================== LEAD TESTS ====================

describe("lead.submit", () => {
  it("creates a lead from public context (no auth required)", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.lead.submit({
      source: "contact",
      name: "Test Lead",
      phone: "0812345678",
      interest: "Rooftop Solar",
    });
    expect(result).toEqual({ success: true, id: 1 });
  });

  it("validates name is required", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.lead.submit({ source: "contact", name: "" })
    ).rejects.toThrow();
  });

  it("accepts optional fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.lead.submit({
      source: "assessment",
      name: "Full Lead",
      company: "SIRINX",
      email: "test@sirinx.co",
      phone: "0812345678",
      interest: "BESS / ESS",
      budget: "15-50 ล้านบาท",
      timeline: "3-6 เดือน",
      monthlyBill: "500000",
      message: "ต้องการข้อมูลเพิ่มเติม",
    });
    expect(result.success).toBe(true);
  });
});

describe("lead.list (admin only)", () => {
  it("returns leads for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.lead.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.lead.list()).rejects.toThrow();
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.lead.list()).rejects.toThrow();
  });
});

describe("lead.update (admin only)", () => {
  it("updates lead status for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.lead.update({ id: 1, status: "contacted" });
    expect(result).toEqual({ success: true });
  });

  it("rejects regular user", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.lead.update({ id: 1, status: "contacted" })).rejects.toThrow();
  });
});

describe("lead.stats (admin only)", () => {
  it("returns stats for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.lead.stats();
    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("byStatus");
    expect(result).toHaveProperty("bySource");
  });

  it("rejects non-admin", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.lead.stats()).rejects.toThrow();
  });
});

// ==================== BLOG TESTS ====================

describe("blog.list (public)", () => {
  it("returns published blog posts", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("blog.getBySlug (public)", () => {
  it("returns a published post by slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.getBySlug({ slug: "test" });
    expect(result).toBeTruthy();
    expect(result?.slug).toBe("test");
  });
});

describe("blog.create (admin only)", () => {
  it("creates a blog post for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.blog.create({
      slug: "test-post",
      title: "Test Post",
      content: "Hello world",
      published: false,
    });
    expect(result).toEqual({ id: 1 });
  });

  it("validates slug format", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    await expect(
      caller.blog.create({ slug: "Invalid Slug!", title: "Test" })
    ).rejects.toThrow();
  });

  it("rejects non-admin", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.blog.create({ slug: "test", title: "Test" })
    ).rejects.toThrow();
  });
});

describe("blog.delete (admin only)", () => {
  it("deletes a blog post for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.blog.delete({ id: 1 });
    expect(result).toEqual({ success: true });
  });
});

// ==================== PROJECT TESTS ====================

describe("project.list (public)", () => {
  it("returns published projects", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.project.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("project.create (admin only)", () => {
  it("creates a project for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.project.create({
      title: "Solar Farm Node 1",
      location: "Phitsanulok",
      type: "Rooftop Solar",
      capacity: "100 kW",
    });
    expect(result).toEqual({ id: 1 });
  });

  it("rejects non-admin", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.project.create({ title: "Test" })
    ).rejects.toThrow();
  });
});

describe("project.delete (admin only)", () => {
  it("deletes a project for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.project.delete({ id: 1 });
    expect(result).toEqual({ success: true });
  });
});

// ==================== CONTACT TESTS ====================

describe("contact.list (admin only)", () => {
  it("returns contact submissions for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("rejects non-admin", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.contact.list()).rejects.toThrow();
  });
});
