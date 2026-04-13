/**
 * Solar Carport — Flagship Product Page
 * Deep-dive: benefits, specs, integration, proof, financing, FAQ, CTA
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { trackSolutionVisit } from "@/components/HeroSlideshow";
import {
  Car, Sun, Battery, Brain, Plug, Shield, Clock, TrendingUp,
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Zap, BarChart3, Wrench, Leaf, Building2, Factory, Hotel, GraduationCap,
  X, ChevronLeft, ChevronRight, Camera
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";
// Real photos from Royal Park Solar Carport installation
const HERO_CARPARK = `${CDN}/carport-wide-1_30e3af4c.jpeg`;
const IMG_EV = `${CDN}/carport-structure-1_c0c17293.jpeg`;
const IMG_AI = `${CDN}/bess-cabinet-2_54c824b8.jpeg`;
const IMG_OM = `${CDN}/install-team-2_23aa9cdf.jpeg`;
const IMG_CARPORT_GALLERY = [
  `${CDN}/carport-wide-1_30e3af4c.jpeg`,
  `${CDN}/carport-structure-1_c0c17293.jpeg`,
  `${CDN}/carport-structure-2_f0ab2f56.jpeg`,
  `${CDN}/carport-underside-1_51e3d09a.jpeg`,
  `${CDN}/carport-underside-2_e70e97e1.jpeg`,
  `${CDN}/install-team-1_91970553.jpeg`,
  `${CDN}/bess-cabinet-1_f027743f.jpeg`,
  `${CDN}/bess-cabinet-2_54c824b8.jpeg`,
  `${CDN}/carport-pillar-1_b7680b5f.jpeg`,
  `${CDN}/carport-detail-1_34c7c42f.jpeg`,
  `${CDN}/cable-tray-detail_1ddf9610.jpeg`,
  `${CDN}/carport-structure-4_cc6ef3f6.jpeg`,
];

const benefits = [
  {
    icon: Sun,
    title: "ผลิตไฟฟ้าจากพื้นที่ว่าง",
    desc: "เปลี่ยนลานจอดรถที่ไม่สร้างรายได้ให้เป็นแหล่งผลิตไฟฟ้า ลดค่าไฟ 30-100% โดยไม่ต้องแตะหลังคาอาคาร",
  },
  {
    icon: Car,
    title: "ร่มเงาปกป้องรถยนต์",
    desc: "โครงสร้างหลังคาให้ร่มเงาจากแดดและฝน ลดอุณหภูมิภายในรถ ลดค่าซ่อมบำรุงสีรถจากรังสี UV",
  },
  {
    icon: Plug,
    title: "รองรับ EV Charging",
    desc: "ติดตั้ง EV Charging Station ได้ทันที ทั้ง AC Type 2 และ DC Fast Charger จ่ายไฟจาก Solar โดยตรง",
  },
  {
    icon: Battery,
    title: "BESS กักเก็บพลังงาน",
    desc: "เก็บไฟฟ้าส่วนเกินไว้ใช้ช่วง peak หรือยามไฟดับ ลดค่า demand charge ได้อีก 15-30%",
  },
  {
    icon: Brain,
    title: "AI Energy Management",
    desc: "ระบบ AI วิเคราะห์การใช้พลังงานแบบ real-time ปรับการจ่ายไฟอัตโนมัติเพื่อประสิทธิภาพสูงสุด",
  },
  {
    icon: Leaf,
    title: "ESG & Green Building",
    desc: "เพิ่มมูลค่าอสังหาริมทรัพย์ ตอบโจทย์ ESG, Green Building Certification และ Carbon Neutrality",
  },
];

const specs = [
  { label: "กำลังผลิต", value: "50-500+ kWp", note: "ขึ้นอยู่กับพื้นที่" },
  { label: "โครงสร้าง", value: "เหล็กกล้าชุบสังกะสี", note: "ทนทาน 25+ ปี" },
  { label: "แผงโซลาร์", value: "Tier-1 Mono PERC", note: "ประสิทธิภาพ 21%+" },
  { label: "Inverter", value: "String / Micro", note: "ตามขนาดโครงการ" },
  { label: "ความสูง", value: "3.0-4.5 เมตร", note: "รองรับรถตู้/SUV" },
  { label: "ระยะเวลาติดตั้ง", value: "45-90 วัน", note: "รวมขออนุญาต" },
];

const faqs = [
  {
    q: "Solar Carport ต่างจาก Rooftop Solar อย่างไร?",
    a: "Solar Carport ติดตั้งบนโครงสร้างหลังคาที่จอดรถ ไม่ต้องใช้พื้นที่หลังคาอาคาร เหมาะกับธุรกิจที่มีลานจอดรถขนาดใหญ่ นอกจากผลิตไฟฟ้าแล้ว ยังให้ร่มเงาปกป้องรถและรองรับ EV Charger ได้ทันที ในขณะที่ Rooftop Solar ต้องใช้หลังคาอาคารที่มีความแข็งแรงเพียงพอ",
  },
  {
    q: "ลานจอดรถต้องใหญ่แค่ไหนถึงจะคุ้มค่า?",
    a: "โดยทั่วไป ลานจอดรถ 50 คันขึ้นไป (ประมาณ 500 ตร.ม.) จะเริ่มคุ้มค่าทางเศรษฐกิจ แต่ SIRINX สามารถออกแบบระบบสำหรับพื้นที่ตั้งแต่ 30 คันขึ้นไปได้ ขึ้นอยู่กับค่าไฟปัจจุบันและรูปแบบการลงทุน",
  },
  {
    q: "คืนทุนกี่ปี? ผลตอบแทนเท่าไหร่?",
    a: "คืนทุนเฉลี่ย 3-5 ปี ขึ้นอยู่กับขนาดระบบ ค่าไฟปัจจุบัน และรูปแบบการลงทุน ระบบมีอายุการใช้งาน 25+ ปี หลังคืนทุนจะได้ไฟฟ้าฟรีตลอดอายุที่เหลือ ผลตอบแทนรวมอาจสูงถึง 300-500% ของเงินลงทุน",
  },
  {
    q: "ต้องขออนุญาตอะไรบ้าง?",
    a: "SIRINX ดูแลเรื่องการขออนุญาตทั้งหมด ตั้งแต่ใบอนุญาตก่อสร้าง (อ.1) การขออนุญาตผลิตไฟฟ้า (กกพ.) และการเชื่อมต่อกับระบบไฟฟ้า (MEA/PEA) ทั้งหมดรวมอยู่ในบริการของเรา",
  },
  {
    q: "มีรูปแบบการลงทุนอะไรบ้าง?",
    a: "SIRINX มี 3 รูปแบบหลัก: (1) ซื้อขาด — คืนทุนเร็ว ผลตอบแทนสูงสุด (2) ผ่อนชำระ — ค่างวดต่ำกว่าค่าไฟที่ประหยัดได้ (3) Co-investment 50:50 — แบ่งเบาภาระลงทุน ทุกรูปแบบสามารถใช้สิทธิหักค่าเสื่อม 150% ได้",
  },
  {
    q: "หลังติดตั้งแล้ว SIRINX ดูแลอย่างไร?",
    a: "SIRINX มีบริการ O&M ตลอด 25 ปี ด้วย AI Monitoring 24/7, Drone Inspection รายไตรมาส, ทีมช่างพร้อมออกซ่อมภายใน 24-48 ชม. และรายงานผลผลิตรายเดือน ลูกค้าไม่ต้องกังวลเรื่องการดูแลระบบ",
  },
];

export default function SolarCarport() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    trackSolutionVisit("solar-carport");
    const onScroll = () => setShowStickyCta(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div>
      {/* FAQ JSON-LD Schema for Google Rich Results */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_CARPARK} alt="Solar Carport by SIRINX" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-24 pb-12">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-accent-primary bg-accent-glow border border-border-accent rounded-full mb-5">
                <Car className="w-3.5 h-3.5" /> Flagship Solution
              </span>
            </motion.div>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.12] mb-5"
            >
              Solar Carport<br />
              <span className="text-gradient-accent">ผลิตไฟฟ้า ให้ร่มเงา รองรับ EV</span>
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-base sm:text-lg text-text-secondary leading-relaxed mb-7 max-w-xl"
            >
              เปลี่ยนลานจอดรถเป็นโรงไฟฟ้าพลังงานแสงอาทิตย์ ลดค่าไฟ 30-100% คืนทุน 3-5 ปี พร้อม AI Energy Management และ O&M ตลอด 25 ปี
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent rounded-lg">
                ขอใบเสนอราคา Solar Carport <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่าฟรี
              </Link>
            </motion.div>
            {/* Proof strip */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={4}
              className="flex flex-wrap gap-6"
            >
              {[
                { value: "30-100%", label: "ลดค่าไฟ" },
                { value: "3-5 ปี", label: "คืนทุน" },
                { value: "25+ ปี", label: "อายุระบบ" },
                { value: "24/7", label: "AI Monitor" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-display text-lg font-bold text-gradient-accent">{item.value}</div>
                  <div className="text-[10px] text-text-muted">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS GRID ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Benefits</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              ทำไมต้อง Solar Carport?
            </h2>
            <p className="text-text-secondary text-sm">
              ไม่ใช่แค่แผงโซลาร์บนที่จอดรถ — แต่เป็นโครงสร้างพื้นฐานที่สร้างมูลค่าหลายมิติ
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors"
              >
                <b.icon className="w-8 h-8 text-accent-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1.5 text-sm">{b.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTEGRATION VISUAL ===== */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Integration</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                ระบบครบวงจร<br />Solar + BESS + AI + EV
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                Solar Carport ไม่ได้ทำงานเดี่ยว — ทำงานร่วมกับ BESS กักเก็บพลังงาน, AI Energy Management วิเคราะห์การใช้ไฟแบบ real-time และ EV Charging Station ที่จ่ายไฟจาก Solar โดยตรง
              </p>
              <div className="space-y-3">
                {[
                  "Solar Carport ผลิตไฟฟ้าจากแสงอาทิตย์",
                  "BESS กักเก็บส่วนเกิน ใช้ช่วง peak",
                  "AI ปรับการจ่ายไฟอัตโนมัติ real-time",
                  "EV Charger จ่ายไฟจาก Solar โดยตรง",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-accent-primary">{i + 1}</span>
                    </div>
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <img
                src={IMG_AI}
                alt="AI Energy Management Dashboard"
                className="rounded-2xl w-full aspect-[16/10] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MID-PAGE CTA ===== */}
      <section className="py-10 lg:py-14 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="glass-card rounded-2xl p-7 lg:p-9 flex flex-col lg:flex-row items-center gap-6 lg:gap-10"
          >
            <div className="flex-1">
              <h3 className="font-display text-lg lg:text-xl font-bold text-foreground mb-2">
                พร้อมเปลี่ยนที่จอดรถเป็นโรงไฟฟ้า?
              </h3>
              <p className="text-text-secondary text-sm">
                นัดสำรวจหน้างานฟรี ไม่มีข้อผูกมัด — รับข้อเสนอ Solar Carport พร้อม ROI เฉพาะโครงการ
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-semibold btn-accent rounded-lg text-sm whitespace-nowrap shrink-0">
              นัดสำรวจหน้างานฟรี <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== SPECS TABLE ===== */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-10"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Specifications</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              สเปคระบบ Solar Carport
            </h2>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={1}
            className="rounded-xl border border-border-subtle overflow-hidden"
          >
            <div className="divide-y divide-border-subtle">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between p-4 bg-surface-elevated hover:bg-accent-glow/30 transition-colors">
                  <div className="font-medium text-foreground text-sm">{spec.label}</div>
                  <div className="text-right">
                    <div className="font-display font-semibold text-accent-primary text-sm">{spec.value}</div>
                    <div className="text-[10px] text-text-muted">{spec.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Industries</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Solar Carport เหมาะกับธุรกิจไหน?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Factory, title: "โรงงาน", desc: "ลานจอดรถพนักงาน 100+ คัน ลดต้นทุนพลังงานการผลิต", parking: "100-500+ คัน" },
              { icon: Hotel, title: "โรงแรม / รีสอร์ท", desc: "EV Charging สำหรับแขก Green Hotel Certification", parking: "50-200 คัน" },
              { icon: Building2, title: "อาคารพาณิชย์", desc: "เพิ่มมูลค่าอาคาร ลดค่าส่วนกลาง ตอบโจทย์ ESG", parking: "100-300+ คัน" },
              { icon: GraduationCap, title: "สถานศึกษา", desc: "ลดงบค่าไฟ สร้าง Living Lab พลังงานสะอาด", parking: "50-200 คัน" },
            ].map((ind, i) => (
              <motion.div
                key={ind.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors"
              >
                <ind.icon className="w-7 h-7 text-accent-secondary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-1 text-sm">{ind.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-2">{ind.desc}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent-primary">
                  <Car className="w-3 h-3" /> {ind.parking}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O&M VISUAL ===== */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="order-2 lg:order-1">
              <img
                src={IMG_OM}
                alt="SIRINX O&M Service"
                className="rounded-2xl w-full aspect-[16/10] object-cover"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="order-1 lg:order-2">
              <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">After-Sales</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                ดูแลตลอด 25 ปี<br />ไม่ใช่แค่ติดตั้งแล้วจบ
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                SIRINX มีบริการ O&M ครบวงจร ด้วย AI Monitoring, Drone Inspection และทีมวิศวกรที่พร้อมดูแลระบบตลอดอายุการใช้งาน
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BarChart3, label: "AI Monitoring", value: "24/7" },
                  { icon: Wrench, label: "ตอบสนอง", value: "24-48 ชม." },
                  { icon: Shield, label: "รับประกัน", value: "25 ปี" },
                  { icon: Zap, label: "Uptime", value: "99.5%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-surface-elevated">
                    <item.icon className="w-5 h-5 text-accent-primary shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-gradient-accent">{item.value}</div>
                      <div className="text-[10px] text-text-muted">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FINANCING ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container max-w-4xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-10"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Financing</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              รูปแบบการลงทุน Solar Carport
            </h2>
            <p className="text-text-secondary text-sm">ไม่ต้องจ่ายเต็มวันแรก — เลือกรูปแบบที่เหมาะกับธุรกิจของคุณ</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "ซื้อขาด",
                desc: "ลงทุนครั้งเดียว คืนทุนเร็ว ผลตอบแทนสูงสุดตลอดอายุ 25 ปี",
                highlight: "คืนทุน 3-5 ปี",
                features: ["ผลตอบแทนสูงสุด", "เป็นเจ้าของทันที", "หักค่าเสื่อม 150%"],
              },
              {
                title: "ผ่อนชำระ",
                desc: "ค่างวดต่ำกว่าค่าไฟที่ประหยัดได้ เริ่มประหยัดตั้งแต่เดือนแรก",
                highlight: "ค่างวด < ค่าไฟที่ลด",
                features: ["ไม่ต้องลงทุนสูง", "ประหยัดตั้งแต่วันแรก", "ผ่อน 3-7 ปี"],
              },
              {
                title: "Co-investment 50:50",
                desc: "SIRINX ร่วมลงทุน 50% แบ่งเบาภาระ แบ่งปันผลตอบแทน",
                highlight: "ลงทุนแค่ครึ่ง",
                features: ["แบ่งเบาภาระ", "ความเสี่ยงต่ำ", "SIRINX ร่วมดูแล"],
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors"
              >
                <h3 className="font-display font-semibold text-foreground mb-2">{plan.title}</h3>
                <div className="text-sm font-bold text-gradient-accent mb-2">{plan.highlight}</div>
                <p className="text-xs text-text-muted leading-relaxed mb-4">{plan.desc}</p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                      <CheckCircle2 className="w-3 h-3 text-accent-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/investment" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
              ศึกษาข้อมูลการลงทุนเพิ่มเติม <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== REAL PHOTO GALLERY ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" /> Real Installation
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              ภาพผลงานติดตั้งจริง
            </h2>
            <p className="text-text-secondary text-sm">
              Solar Carport ที่โรงแรมเรือนแพ รอยัลปาร์ค พิษณุโลก — ติดตั้งโดยทีมวิศวกร SIRINX
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {IMG_CARPORT_GALLERY.map((src, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i % 4}
                className="cursor-pointer group"
                onClick={() => setLightboxIdx(i)}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle hover:border-accent-primary/40 transition-all">
                  <img
                    src={src}
                    alt={`Solar Carport ติดตั้งจริง ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
              ดูผลงานทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-50"
            onClick={() => setLightboxIdx(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + IMG_CARPORT_GALLERY.length) % IMG_CARPORT_GALLERY.length); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % IMG_CARPORT_GALLERY.length); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={IMG_CARPORT_GALLERY[lightboxIdx]}
            alt={`Solar Carport ${lightboxIdx + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIdx + 1} / {IMG_CARPORT_GALLERY.length}
          </div>
        </div>
      )}

      {/* ===== FAQ ===== */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-10"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">FAQ</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              คำถามที่พบบ่อย
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

      {/* ===== STICKY MOBILE CTA ===== */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${
          showStickyCta ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border-subtle px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-display font-semibold text-foreground text-xs truncate">Solar Carport</div>
            <div className="text-[10px] text-text-muted">ลดค่าไฟ 30-100% คืนทุน 3-5 ปี</div>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2.5 font-display font-semibold btn-accent rounded-lg text-xs whitespace-nowrap shrink-0">
            ขอใบเสนอราคา <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
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
