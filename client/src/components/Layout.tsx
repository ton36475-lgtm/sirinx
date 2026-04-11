import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap, Phone, Mail, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

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
        {/* Logo — brand colors always (cyan gradient) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-brand to-brand-light flex items-center justify-center">
            <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <span className="font-display text-xl lg:text-2xl font-bold tracking-tight text-foreground">
            SIRINX
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
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
                  className="absolute top-full left-0 mt-1 w-56 py-2 rounded-lg glass-card shadow-xl"
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-accent-primary hover:bg-accent-glow transition-colors"
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
          {/* Theme toggle */}
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
    { href: "/blog", label: "บทความ" },
    { href: "/partner", label: "พันธมิตร" },
    { href: "/investment", label: "การลงทุน" },
  ],
};

function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-border-subtle">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand — logo always uses brand colors */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brand-light flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">SIRINX</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-sm">
              ผู้นำด้านพลังงานสะอาดและโครงสร้างพื้นฐานอัจฉริยะ ออกแบบ ติดตั้ง และบริหารระบบพลังงานครบวงจรสำหรับธุรกิจไทย
            </p>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <a href="tel:+6620001234" className="flex items-center gap-1.5 hover:text-accent-primary transition-colors">
                <Phone className="w-4 h-4" /> 02-000-1234
              </a>
              <a href="mailto:info@sirinx.co.th" className="flex items-center gap-1.5 hover:text-accent-primary transition-colors">
                <Mail className="w-4 h-4" /> info@sirinx.co.th
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
                      className="text-sm text-text-muted hover:text-accent-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} SIRINX Co., Ltd. สงวนลิขสิทธิ์
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-accent-primary transition-colors">นโยบายความเป็นส่วนตัว</a>
            <a href="#" className="hover:text-accent-primary transition-colors">เงื่อนไขการใช้งาน</a>
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
