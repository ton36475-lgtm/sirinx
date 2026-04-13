/**
 * SIRINX Home Page — Solar Carpark Flagship
 * Second Pass: Carpark-first hero, proof strip, mid-page CTAs, FAQ/AEO
 */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Car, Sun, Battery, Brain, Wrench, Waves,
  ArrowRight, CheckCircle2, Zap, Shield, BarChart3, Clock,
  TrendingUp, ChevronDown, ChevronUp,
  Factory, Hotel, Building2, GraduationCap,
  BatteryCharging, Cpu, Plug
} from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";

const HERO_CARPARK = `${CDN}/solar-carpark-hero-HkuPbSXRuEJEzybRN8Xb7W.webp`;
const IMG_EV = `${CDN}/solar-carpark-ev-charging-niYjh6gCmDqQNQiCE6oq8M.webp`;
const IMG_OM = `${CDN}/solar-om-maintenance-7BKbWXXHKbZ3Adwwdk9XvZ.webp`;
const IMG_AI = `${CDN}/solar-ai-dashboard-CDhHz7V3K98CLU6eGvW8PP.webp`;
const IMG_INVESTMENT = `${CDN}/hero-investment-fRtcNVseiLRqovGxudgo83.webp`;
const LOGO_URL = `${CDN}/photo_2026-03-24_06-45-58_293d121c.jpg`;
const IMG_NODE1 = `${CDN}/sirinx-hero-main-6LRbjuoZ8ie4rPGnAVhXnQ.webp`;
const IMG_NODE2 = `${CDN}/sirinx-smart-energy-JXCSVMQTKJHxRxSagYajgy.webp`;

/* ── FAQ Data ── */
const faqs = [
  {
    q: "Solar Carport คืออะไร ต่างจาก Rooftop Solar อย่างไร?",
    a: "Solar Carport คือโครงสร้างหลังคาที่จอดรถที่ติดตั้งแผงโซลาร์เซลล์ด้านบน ผลิตไฟฟ้าได้เหมือน Rooftop Solar แต่ไม่ต้องใช้พื้นที่หลังคาอาคาร เหมาะกับธุรกิจที่มีลานจอดรถขนาดใหญ่ เช่น โรงงาน ห้างสรรพสินค้า โรงแรม สถานศึกษา และอาคารสำนักงาน นอกจากผลิตไฟฟ้าแล้ว ยังให้ร่มเงาปกป้องรถจากแดดและฝน และรองรับ EV Charger ได้ทันที",
  },
  {
    q: "ติดตั้ง Solar Carport ใช้เวลานานเท่าไหร่?",
    a: "โดยทั่วไปใช้เวลา 45-90 วัน ขึ้นอยู่กับขนาดโครงการ ตั้งแต่การสำรวจหน้างาน ออกแบบโครงสร้าง ขออนุญาต จนถึงติดตั้งและทดสอบระบบ SIRINX มีทีมวิศวกรมืออาชีพดูแลทุกขั้นตอน",
  },
  {
    q: "Solar Carport คุ้มค่าไหม คืนทุนกี่ปี?",
    a: "คืนทุนเฉลี่ย 3-5 ปี ขึ้นอยู่กับขนาดระบบ ค่าไฟปัจจุบัน และรูปแบบการลงทุน (ซื้อขาด ผ่อนชำระ หรือ Co-investment) ระบบมีอายุการใช้งาน 25+ ปี หลังคืนทุนจะได้ไฟฟ้าฟรีตลอดอายุที่เหลือ สามารถขอประเมิน ROI เฉพาะโครงการได้ฟรี",
  },
  {
    q: "รองรับ EV Charger ได้เลยไหม?",
    a: "ได้ครับ โครงสร้าง Solar Carport ของ SIRINX ออกแบบให้รองรับการติดตั้ง EV Charging Station ได้ทันที ทั้ง AC Type 2 และ DC Fast Charger ระบบไฟฟ้าจาก Solar + BESS สามารถจ่ายไฟให้ EV Charger โดยตรง ลดต้นทุนค่าชาร์จ",
  },
  {
    q: "SIRINX ดูแลหลังติดตั้งอย่างไร?",
    a: "SIRINX มีบริการ O&M (Operation & Maintenance) ตลอดอายุระบบ 25 ปี ด้วยระบบ AI Monitoring ตรวจสอบประสิทธิภาพแบบ real-time ทีมช่างพร้อมออกซ่อมบำรุงภายใน 24-48 ชม. และรายงานผลการผลิตไฟฟ้ารายเดือน",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      {/* ══════════════════════════════════════════════
          1. HERO — Multi-Product Slideshow with Personalization
      ══════════════════════════════════════════════ */}
      <HeroSlideshow />

      {/* ══════════════════════════════════════════════
          2. SOCIAL PROOF STRIP — Above the fold metrics
      ══════════════════════════════════════════════ */}
      <section className="py-10 lg:py-12 section-alt relative">
        <div className="divider-accent absolute top-0 left-0 right-0" />
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: "30-100%", label: "ลดค่าไฟฟ้า", icon: TrendingUp },
              { value: "3-5 ปี", label: "คืนทุนเฉลี่ย", icon: Clock },
              { value: "25+ ปี", label: "อายุการใช้งาน", icon: Shield },
              { value: "99.5%", label: "System Uptime", icon: BarChart3 },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="text-center"
              >
                <item.icon className="w-5 h-5 text-accent-primary mx-auto mb-2" />
                <div className="font-display text-2xl lg:text-3xl font-bold text-gradient-accent mb-0.5">
                  {item.value}
                </div>
                <div className="text-xs text-text-muted">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. SOLAR CARPORT SPOTLIGHT — Why it's the flagship
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Flagship Product</span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-4">
                ทำไม Solar Carport<br />ถึงเป็นทางเลือกที่ดีที่สุด?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                ธุรกิจที่มีลานจอดรถ 50+ คัน สามารถเปลี่ยนพื้นที่ว่างเปล่าให้เป็นแหล่งผลิตไฟฟ้า ลดค่าพลังงาน เพิ่มมูลค่าอสังหาริมทรัพย์ และเตรียมพร้อมสำหรับ EV ในคราวเดียว
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "ผลิตไฟฟ้าจากพื้นที่ที่ไม่ได้ใช้ — ไม่ต้องแตะหลังคาอาคาร",
                  "ให้ร่มเงาปกป้องรถจากแดดและฝน — ลดค่าซ่อมบำรุง",
                  "รองรับ EV Charging Station — พร้อมสำหรับอนาคต",
                  "เพิ่มมูลค่าอสังหาริมทรัพย์ — ตอบโจทย์ ESG & Green Building",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/solar-carport" className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold btn-accent rounded-lg text-sm">
                ดูรายละเอียด Solar Carport <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="relative">
              <img
                src={IMG_EV}
                alt="Solar Carport พร้อม EV Charging Station"
                className="rounded-2xl w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 rounded-2xl border border-border-accent" />
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -right-2 lg:-right-6 bg-surface-elevated border border-border-accent rounded-xl p-4 shadow-lg">
                <div className="font-display text-xl font-bold text-gradient-accent">3-5 ปี</div>
                <div className="text-xs text-text-muted">คืนทุนเฉลี่ย</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. INTEGRATION ECOSYSTEM — Carport + BESS + AI + EV
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Integration</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              ระบบนิเวศพลังงานครบวงจร
            </h2>
            <p className="text-text-secondary text-sm">
              Solar Carport ทำงานร่วมกับ BESS, AI Energy Management และ EV Charging เป็นระบบเดียว
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Car, title: "Solar Carport", desc: "ผลิตไฟฟ้าจากลานจอดรถ ให้ร่มเงาและพลังงาน", color: "text-accent-primary" },
              { icon: BatteryCharging, title: "BESS / ESS", desc: "กักเก็บพลังงานส่วนเกิน ใช้ในช่วง peak ลด demand charge", color: "text-accent-secondary" },
              { icon: Cpu, title: "AI Energy Management", desc: "วิเคราะห์และเพิ่มประสิทธิภาพแบบ real-time ด้วย AI", color: "text-accent-primary" },
              { icon: Plug, title: "EV Charging", desc: "สถานีชาร์จ EV จ่ายไฟจาก Solar โดยตรง ลดต้นทุน", color: "text-accent-secondary" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors"
              >
                <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. MID-PAGE CTA — Solar Carport specific
      ══════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
          >
            <div className="flex-1">
              <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">
                มีลานจอดรถ 50+ คัน?
              </h3>
              <p className="text-text-secondary text-sm">
                ให้ SIRINX ประเมินศักยภาพพื้นที่ของคุณฟรี — รับข้อเสนอ Solar Carport พร้อม ROI เฉพาะโครงการ
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-semibold btn-accent rounded-lg text-sm whitespace-nowrap">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-semibold btn-accent-outline rounded-lg text-sm whitespace-nowrap">
                ประเมินออนไลน์
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. ALL SOLUTIONS — Solar Carport first
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="max-w-2xl mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Solutions</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              โซลูชันพลังงานครบวงจร
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Solar Carport เป็นหัวใจของระบบ ทำงานร่วมกับ Rooftop Solar, Floating Solar, BESS และ AI Energy Management
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Car, title: "Solar Carport", desc: "เปลี่ยนที่จอดรถเป็นโรงไฟฟ้า รองรับ EV Charging", href: "/solar-carport", featured: true },
              { icon: Sun, title: "Rooftop Solar", desc: "ลดค่าไฟ 30-100% ด้วยระบบโซลาร์บนหลังคา", href: "/solutions#rooftop", featured: false },
              { icon: Waves, title: "Floating Solar", desc: "ใช้พื้นที่ผิวน้ำให้เกิดประโยชน์สูงสุด", href: "/solutions#floating", featured: false },
              { icon: Battery, title: "BESS / ESS", desc: "กักเก็บพลังงาน ลดค่า demand charge", href: "/solutions#bess", featured: false },
              { icon: Brain, title: "AI Energy Management", desc: "วิเคราะห์และเพิ่มประสิทธิภาพแบบ real-time", href: "/solutions#ai-energy", featured: false },
              { icon: Wrench, title: "O&M ดูแลระบบ", desc: "Predictive maintenance ตลอด 25 ปี", href: "/solutions#ai-om", featured: false },
            ].map((sol, i) => (
              <motion.div
                key={sol.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link
                  href={sol.href}
                  className={`group block p-5 rounded-xl transition-all duration-300 h-full ${
                    sol.featured
                      ? "glass-card border-accent-primary/40 ring-1 ring-accent-primary/20"
                      : "glass-card hover:border-accent-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      sol.featured ? "bg-accent-primary/20" : "bg-accent-glow"
                    }`}>
                      <sol.icon className={`w-4.5 h-4.5 ${sol.featured ? "text-accent-primary" : "text-accent-primary"}`} />
                    </div>
                    {sol.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-medium text-accent-primary bg-accent-glow rounded-full">Flagship</span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm group-hover:text-accent-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">{sol.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. PROCESS — How we work
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Process</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              จากสำรวจสู่ติดตั้ง ใน 4 ขั้นตอน
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", title: "สำรวจหน้างาน", desc: "วิเคราะห์พื้นที่ ค่าไฟ ความต้องการพลังงาน และประเมิน ROI เบื้องต้น" },
              { step: "02", title: "ออกแบบระบบ", desc: "ออกแบบเฉพาะทาง เลือกอุปกรณ์ Tier-1 พร้อมแผนการเงิน" },
              { step: "03", title: "ติดตั้ง", desc: "ทีมวิศวกรมืออาชีพ ติดตั้งตามมาตรฐาน 45-90 วัน" },
              { step: "04", title: "ดูแลตลอด 25 ปี", desc: "AI Monitoring + O&M ดูแลระบบตลอดอายุการใช้งาน" },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="relative p-5 rounded-xl border border-border-subtle hover:border-border-accent transition-colors bg-surface-elevated"
              >
                <span className="font-display text-4xl font-bold text-accent-primary/10 absolute top-3 right-4">
                  {step.step}
                </span>
                <div className="relative">
                  <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm">{step.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. INDUSTRIES — Who benefits from Solar Carport
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="max-w-2xl mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Industries</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Solar Carport เหมาะกับธุรกิจไหน?
            </h2>
            <p className="text-text-secondary text-sm">
              ทุกธุรกิจที่มีลานจอดรถ สามารถเปลี่ยนพื้นที่ว่างเปล่าเป็นแหล่งรายได้
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Factory, title: "โรงงาน", desc: "ลานจอดรถพนักงาน + ลดต้นทุนพลังงานการผลิต" },
              { icon: Hotel, title: "โรงแรม / รีสอร์ท", desc: "EV Charging สำหรับแขก + Green Hotel Certification" },
              { icon: Building2, title: "อาคารพาณิชย์", desc: "เพิ่มมูลค่าอาคาร + ลดค่าส่วนกลาง + ESG" },
              { icon: GraduationCap, title: "สถานศึกษา", desc: "ลดงบค่าไฟ + Living Lab พลังงานสะอาด" },
            ].map((ind, i) => (
              <motion.div
                key={ind.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link
                  href="/industries"
                  className="group block p-5 rounded-xl border border-border-subtle hover:border-border-accent hover:bg-accent-glow/50 transition-all h-full"
                >
                  <ind.icon className="w-7 h-7 text-accent-secondary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1 text-sm group-hover:text-accent-primary transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">{ind.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
              ดูอุตสาหกรรมทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. REAL PROJECTS — Proof of execution
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Track Record</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">โครงการที่ดำเนินการจริง</h2>
            <p className="text-text-secondary mt-2 max-w-xl mx-auto text-sm">Solar Farm Node โดย SIRINX — ติดตั้งจริง ดูแลจริง วัดผลได้</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Node 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="group rounded-2xl overflow-hidden border border-border-subtle hover:border-border-accent transition-all">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={IMG_NODE1}
                  alt="Solar Farm Node 1 — เรือนแพ Royal Park พิษณุโลก"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-accent-primary text-text-inverse rounded-md">Node 1</span>
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-green-600 text-white rounded-md">ดำเนินการแล้ว</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-base font-bold text-white">โรงแรมเรือนแพ รอยัลปาร์ค</h3>
                  <p className="text-xs text-white/80">พิษณุโลก — Solar + BESS + AI EMS</p>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div><div className="text-xs font-bold text-gradient-accent">Solar + BESS</div><div className="text-[9px] text-text-muted">ระบบครบวงจร</div></div>
                  <div><div className="text-xs font-bold text-gradient-accent">30-100%</div><div className="text-[9px] text-text-muted">ลดค่าไฟฟ้า</div></div>
                  <div><div className="text-xs font-bold text-gradient-accent">AI EMS</div><div className="text-[9px] text-text-muted">บริหารพลังงาน</div></div>
                </div>
              </div>
            </motion.div>
            {/* Node 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="group rounded-2xl overflow-hidden border border-border-subtle hover:border-border-accent transition-all">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={IMG_NODE2}
                  alt="Solar Farm Node 2 — โฮลาเทลริมน่าน"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-accent-primary text-text-inverse rounded-md">Node 2</span>
                  <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-500 text-white rounded-md">กำลังก่อสร้าง</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-base font-bold text-white">โรงแรมโฮลาเทลริมน่าน</h3>
                  <p className="text-xs text-white/80">น่าน — Solar + BESS + Smart Hotel System</p>
                </div>
              </div>
              <div className="p-3 bg-surface-elevated">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div><div className="text-xs font-bold text-gradient-accent">Smart Hotel</div><div className="text-[9px] text-text-muted">ระบบอัจฉริยะ</div></div>
                  <div><div className="text-xs font-bold text-gradient-accent">Net Zero</div><div className="text-[9px] text-text-muted">เป้าหมาย</div></div>
                  <div><div className="text-xs font-bold text-gradient-accent">2026</div><div className="text-[9px] text-text-muted">เปิดให้บริการ</div></div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
              ดูโครงการทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10. O&M + AI MONITORING — Visual proof
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="order-2 lg:order-1">
              <img
                src={IMG_OM}
                alt="SIRINX O&M — AI Monitoring และ Drone Inspection"
                className="rounded-2xl w-full aspect-[16/10] object-cover"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="order-1 lg:order-2">
              <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">O&M Service</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                ดูแลระบบตลอด 25 ปี<br />ด้วย AI และทีมวิศวกร
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                SIRINX ไม่ใช่แค่ติดตั้งแล้วจบ — เราดูแลระบบตลอดอายุการใช้งานด้วย AI Monitoring, Drone Inspection และทีมช่างที่พร้อมออกซ่อมบำรุงภายใน 24-48 ชม.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "AI Monitoring", value: "24/7" },
                  { label: "ตอบสนอง", value: "24-48 ชม." },
                  { label: "Drone Inspection", value: "รายไตรมาส" },
                  { label: "รายงานผลผลิต", value: "รายเดือน" },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg border border-border-subtle bg-surface-elevated">
                    <div className="text-sm font-bold text-gradient-accent">{item.value}</div>
                    <div className="text-[10px] text-text-muted">{item.label}</div>
                  </div>
                ))}
              </div>
              <Link href="/solutions#ai-om" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
                ดูบริการ O&M ทั้งหมด <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          11. INVESTMENT TEASER — Financing options
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Financing</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                ลงทุน Solar Carport<br />ไม่ต้องจ่ายเต็มวันแรก
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                SIRINX มีรูปแบบการลงทุนที่ยืดหยุ่น — ซื้อขาด ผ่อนชำระ หรือ Co-investment 50:50 ช่วยให้ธุรกิจเข้าถึง Solar Carport ได้ทันที
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "ซื้อขาด — คืนทุนเร็ว ผลตอบแทนสูงสุด",
                  "ผ่อนชำระ — ค่างวดต่ำกว่าค่าไฟที่ประหยัดได้",
                  "Co-investment 50:50 — แบ่งเบาภาระลงทุน",
                  "สิทธิประโยชน์ทางภาษี — หักค่าเสื่อม 150%",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/investment" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
                ศึกษาข้อมูลการลงทุน <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="relative">
              <img
                src={IMG_INVESTMENT}
                alt="Solar Carport Investment — ROI Analysis"
                className="rounded-2xl w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 rounded-2xl border border-border-accent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          12. CEO TESTIMONIAL — Trust
      ══════════════════════════════════════════════ */}
      <section className="py-12 lg:py-16 section-alt relative">
        <div className="divider-accent absolute top-0 left-0 right-0" />
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="max-w-3xl mx-auto glass-card rounded-2xl p-8 lg:p-10 text-center"
          >
            <div className="flex justify-center mb-5">
              <img src={LOGO_URL} alt="SIRINX" className="w-14 h-14 rounded-full ring-2 ring-brand/30" />
            </div>
            <p className="text-base lg:text-lg text-text-secondary italic leading-relaxed mb-5">
              "Solar Carport ไม่ใช่แค่แผงโซลาร์บนที่จอดรถ — มันคือโครงสร้างพื้นฐานที่ผลิตไฟฟ้า ให้ร่มเงา รองรับ EV และเพิ่มมูลค่าอสังหาริมทรัพย์ในคราวเดียว SIRINX ผสาน Solar Infrastructure เข้ากับ AI เพื่อสร้างมูลค่าที่ยั่งยืนให้ธุรกิจไทย"
            </p>
            <div>
              <div className="font-display font-semibold text-foreground text-sm">Pitoon Yingyosruangrong</div>
              <div className="text-xs text-text-muted">CEO & Founder — SIRINX Co., Ltd.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          13. FAQ / AEO — Solar Carport specific
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-10"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">FAQ</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              คำถามที่พบบ่อยเกี่ยวกับ Solar Carport
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="rounded-xl border border-border-subtle bg-surface-elevated overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
                >
                  <span className="font-display font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-accent-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 lg:px-5 pb-4 lg:pb-5">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          14. FINAL CTA — Solar Carport specific
      ══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 section-alt relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="divider-accent absolute top-0 left-0 right-0" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-3">
              พร้อมเปลี่ยนที่จอดรถเป็นโรงไฟฟ้า?
            </h2>
            <p className="text-sm lg:text-base text-text-secondary mb-7 max-w-lg mx-auto">
              นัดสำรวจหน้างานฟรี ไม่มีข้อผูกมัด รับข้อเสนอ Solar Carport ที่ออกแบบเฉพาะสำหรับธุรกิจของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display font-semibold btn-accent rounded-lg">
                ขอใบเสนอราคา Solar Carport <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่าฟรี
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
