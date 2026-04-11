/*
 * Layout — SIRINX Solar Digital Agentic Company
 * Real brand data: Logo, Contact, Address, DBD Registered badge
 * CEO: Pitoon Yingyosruangrong
 */
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail, Moon, Sun, ArrowUpRight, Linkedin, Facebook, MapPin, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/photo_2026-03-24_06-45-58_293d121c.jpg";
const DBD_REGISTERED_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/DLpAL6PTE5qU_2bde4df9.png";
const THAILAND_TRUST_MARK_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/yOSTZisxsQLA_fba48286.jpg";
const DBD_VERIFIED_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/pxcfay2CDun0_9a6a41ea.jpg";

const navLinks = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  {
    href: "/solutions",
    label: "โซลูชัน",
    children: [
      { href: "/solutions#rooftop", label: "Rooftop Solar" },
      { href: "/solutions#floating", label: "Floating Solar" },
      { href: "/solutions#carport", label: "Solar Carport" },
      { href: "/solutions#bess", label: "BESS / ESS" },
      { href: "/solutions#ai-energy", label: "AI Energy Management" },
      { href: "/solutions#ai-om", label: "Physical AI O&M" },
      { href: "/solutions#financing", label: "Co-investment" },
    ],
  },
  { href: "/industries", label: "อุตสาหกรรม" },
  { href: "/investment", label: "การลงทุน" },
  { href: "/projects", label: "ผลงาน" },
  { href: "/strategy", label: "กลยุทธ์" },
  { href: "/blog", label: "บทความ" },
];

function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-overlay backdrop-blur-xl border-b border-border-subtle shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo — Real SIRINX brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src={LOGO_URL}
            alt="SIRINX Logo"
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover shadow-lg shadow-brand/20 ring-2 ring-brand/30"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl lg:text-2xl font-bold tracking-tight text-foreground leading-none">
              SIRINX
            </span>
            <span className="text-[9px] lg:text-[10px] tracking-[0.15em] text-text-muted uppercase leading-none mt-0.5">
              Solar Digital Agentic
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setDropdownOpen(link.href)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <Link
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                  location === link.href || (link.href !== "/" && location.startsWith(link.href))
                    ? "text-accent-primary"
                    : "text-text-secondary hover:text-foreground"
                }`}
              >
                {link.label}
                {link.children && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
              {link.children && dropdownOpen === link.href && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 mt-1 w-56 py-2 rounded-xl glass-card shadow-xl"
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-glow transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA + Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-accent-glow transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link
            href="/assessment"
            className="btn-accent-outline px-4 py-2 text-sm font-medium rounded-lg"
          >
            ประเมินโซลาร์
          </Link>
          <Link
            href="/contact"
            className="btn-accent px-4 py-2 text-sm font-medium rounded-lg"
          >
            ขอใบเสนอราคา
          </Link>
        </div>

        {/* Mobile: Theme toggle + Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-overlay backdrop-blur-xl border-t border-border-subtle"
          >
            <div className="container py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      location === link.href
                        ? "text-accent-primary bg-accent-glow"
                        : "text-text-secondary hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-text-muted hover:text-accent-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2 border-t border-border-subtle">
                <Link
                  href="/assessment"
                  className="block text-center btn-accent-outline px-4 py-3 text-sm font-medium rounded-lg"
                >
                  ประเมินโซลาร์
                </Link>
                <Link
                  href="/contact"
                  className="block text-center btn-accent px-4 py-3 text-sm font-medium rounded-lg"
                >
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const footerLinks = {
  โซลูชัน: [
    { href: "/solutions#rooftop", label: "Rooftop Solar" },
    { href: "/solutions#floating", label: "Floating Solar" },
    { href: "/solutions#carport", label: "Solar Carport" },
    { href: "/solutions#bess", label: "BESS / ESS" },
    { href: "/solutions#ai-energy", label: "AI Energy Management" },
  ],
  อุตสาหกรรม: [
    { href: "/industries#manufacturing", label: "โรงงาน" },
    { href: "/industries#agriculture", label: "เกษตรกรรม" },
    { href: "/industries#hospitality", label: "โรงแรม" },
    { href: "/industries#education", label: "สถานศึกษา" },
    { href: "/industries#commercial", label: "อาคารพาณิชย์" },
  ],
  บริษัท: [
    { href: "/about", label: "เกี่ยวกับเรา" },
    { href: "/projects", label: "ผลงาน" },
    { href: "/strategy", label: "กลยุทธ์ดิจิทัล" },
    { href: "/blog", label: "บทความ" },
    { href: "/partner", label: "พันธมิตร" },
    { href: "/investment", label: "การลงทุน" },
  ],
};

function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-border-subtle relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent-glow opacity-30 pointer-events-none" />

      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand — Real SIRINX info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <img
                src={LOGO_URL}
                alt="SIRINX Logo"
                className="w-10 h-10 rounded-full object-cover shadow-lg shadow-brand/20 ring-2 ring-brand/30"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-foreground leading-none">SIRINX</span>
                <span className="text-[9px] tracking-[0.15em] text-text-muted uppercase leading-none mt-0.5">
                  Solar Digital Agentic Company
                </span>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-5 max-w-sm">
              ปฏิวัติพลังงานอัจฉริยะ เพื่ออนาคตที่ยั่งยืน — ผู้นำด้านระบบพลังงานสะอาดและนวัตกรรมอัจฉริยะ
              ออกแบบ ติดตั้ง และบริหารระบบ Solar ครบวงจร ผสาน AI และ Digital Strategy
            </p>

            {/* Real Contact Info */}
            <div className="space-y-2.5 text-sm text-text-muted mb-6">
              <a href="tel:+66819723969" className="flex items-center gap-2.5 hover:text-accent-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> +66 81 972 3969
              </a>
              <a href="mailto:pitoon.sirinx@gmail.com" className="flex items-center gap-2.5 hover:text-accent-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" /> pitoon.sirinx@gmail.com
              </a>
              <a href="https://www.sirinx.co" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-accent-primary transition-colors">
                <Globe className="w-4 h-4 shrink-0" /> www.sirinx.co
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>600/99 Midtrapab Rd., Mueang Phitsanulok, Phitsanulok 65000, Thailand</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-border-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-border-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-accent-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certification Badges — DBD Registered, Thailand Trust Mark */}
        <div className="mt-12 pt-8 border-t border-border-subtle">
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-xs text-text-muted tracking-wider uppercase font-medium">Certified & Trusted</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* DBD Registered */}
              <a
                href="https://www.trustmarkthai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle hover:border-border-accent transition-all group"
                title="DBD Registered — กรมพัฒนาธุรกิจการค้า"
              >
                <img src={DBD_REGISTERED_URL} alt="DBD Registered" className="h-8 object-contain" />
              </a>
              {/* DBD Verified */}
              <a
                href="https://www.trustmarkthai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle hover:border-border-accent transition-all group"
                title="DBD Verified"
              >
                <img src={DBD_VERIFIED_URL} alt="DBD Verified" className="h-8 object-contain" />
              </a>
              {/* Thailand Trust Mark */}
              <a
                href="https://www.thailandtrustmark.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle hover:border-border-accent transition-all group"
                title="Thailand Trust Mark"
              >
                <img src={THAILAND_TRUST_MARK_URL} alt="Thailand Trust Mark" className="h-10 w-10 rounded-full object-cover" />
              </a>
              {/* ISO Badge (SVG inline) */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle" title="ISO 9001:2015 Quality Management">
                <div className="w-8 h-8 rounded-full border-2 border-accent-primary flex items-center justify-center">
                  <span className="text-[8px] font-bold text-accent-primary leading-none">ISO<br/>9001</span>
                </div>
                <span className="text-[10px] text-text-muted leading-tight">Quality<br/>Management</span>
              </div>
              {/* BOI Badge */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border-subtle" title="BOI Promoted — สำนักงานคณะกรรมการส่งเสริมการลงทุน">
                <div className="w-8 h-8 rounded-full border-2 border-accent-secondary flex items-center justify-center">
                  <span className="text-[8px] font-bold text-accent-secondary leading-none">BOI</span>
                </div>
                <span className="text-[10px] text-text-muted leading-tight">Investment<br/>Promoted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} SIRINX Co., Ltd. สงวนลิขสิทธิ์ — ปฏิวัติพลังงานอัจฉริยะ เพื่ออนาคตที่ยั่งยืน
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-accent-primary transition-colors">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-accent-primary transition-colors">เงื่อนไขการใช้งาน</a>
            <a href="#" className="hover:text-accent-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
