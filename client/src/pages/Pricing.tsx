/**
 * SIRINX Pricing Page — Solar Carport Package Pricing
 * Size S / M / L + Custom tier
 * Highlights: EV readiness, government incentives, ROI, tax benefits
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Car, Zap, Sun, Shield, TrendingUp, Clock,
  CheckCircle2, ArrowRight, Building2, Factory,
  Hotel, GraduationCap, Phone, Calculator,
  Leaf, BatteryCharging, BadgePercent, Crown,
  ChevronDown, ChevronUp, Sparkles, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

/* ─── Package Data ─────────────────────────────────────────────── */
const packages = [
  {
    id: "size-s",
    name: "Size S",
    subtitle: "ธุรกิจขนาดเล็ก",
    capacity: "10 – 30 kWp",
    priceRange: "เริ่มต้น ~300,000 บาท",
    priceNote: "ราคาขึ้นอยู่กับพื้นที่และรูปแบบโครงสร้าง",
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
    accentColor: "text-emerald-500",
    bgAccent: "bg-emerald-500/10",
    popular: false,
    idealFor: ["ร้านค้า / ร้านอาหาร", "ออฟฟิศขนาดเล็ก", "คลินิก / สำนักงาน", "ที่จอดรถ 5-15 คัน"],
    specs: {
      panels: "20-60 แผง (Tier-1 Mono PERC)",
      area: "~60-180 ตร.ม.",
      parking: "5-15 คัน",
      evCharger: "1-2 จุดชาร์จ",
      savings: "5,000-15,000 บาท/เดือน",
      payback: "4-6 ปี",
      lifespan: "25+ ปี",
      warranty: "แผง 25 ปี / Inverter 10 ปี / โครงสร้าง 5 ปี",
    },
    includes: [
      "สำรวจหน้างาน + ออกแบบระบบ",
      "โครงสร้างเหล็กชุบกัลวาไนซ์",
      "แผง Tier-1 Mono PERC 550W+",
      "Inverter Sungrow / Huawei",
      "ระบบ Monitoring ผ่านแอป",
      "ติดตั้งโดยทีมวิศวกร",
      "ขออนุญาต กฟน./กฟภ.",
      "รับประกันผลงาน 1 ปี",
    ],
    evReady: "Pre-wired สำหรับ EV Charger 1-2 จุด",
  },
  {
    id: "size-m",
    name: "Size M",
    subtitle: "ธุรกิจขนาดกลาง",
    capacity: "30 – 100 kWp",
    priceRange: "เริ่มต้น ~840,000 บาท",
    priceNote: "ราคาลดลงตามขนาดระบบ (economy of scale)",
    color: "from-accent-primary/20 to-accent-primary/5",
    borderColor: "border-accent-primary/40 hover:border-accent-primary/70",
    accentColor: "text-accent-primary",
    bgAccent: "bg-accent-primary/10",
    popular: true,
    idealFor: ["โรงแรม / รีสอร์ท", "สถานศึกษา", "อาคารพาณิชย์", "ที่จอดรถ 15-50 คัน"],
    specs: {
      panels: "60-200 แผง (Tier-1 Mono PERC)",
      area: "~180-600 ตร.ม.",
      parking: "15-50 คัน",
      evCharger: "3-10 จุดชาร์จ",
      savings: "15,000-50,000 บาท/เดือน",
      payback: "3-5 ปี",
      lifespan: "25+ ปี",
      warranty: "แผง 25 ปี / Inverter 10 ปี / โครงสร้าง 5 ปี",
    },
    includes: [
      "ทุกอย่างใน Size S",
      "BESS Option (กักเก็บพลังงาน)",
      "AI Energy Monitoring Dashboard",
      "EV Charger 3-10 จุด (AC Type 2)",
      "รายงาน ROI รายเดือน",
      "O&M ดูแลรักษา 1 ปี",
      "ประสานงาน BOI / ลดหย่อนภาษี",
      "ใบรับรอง Carbon Credit",
    ],
    evReady: "ติดตั้ง EV Charger พร้อมใช้ 3-10 จุด รองรับ AC Type 2",
  },
  {
    id: "size-l",
    name: "Size L",
    subtitle: "ธุรกิจขนาดใหญ่",
    capacity: "100 – 500 kWp",
    priceRange: "เริ่มต้น ~2,500,000 บาท",
    priceNote: "ราคาต่อวัตต์ต่ำสุด ยิ่งใหญ่ยิ่งคุ้ม",
    color: "from-amber-500/20 to-amber-600/5",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    accentColor: "text-amber-500",
    bgAccent: "bg-amber-500/10",
    popular: false,
    idealFor: ["โรงงานอุตสาหกรรม", "ห้างสรรพสินค้า", "คลังสินค้า / โลจิสติกส์", "ที่จอดรถ 50-200+ คัน"],
    specs: {
      panels: "200-1,000 แผง (Tier-1 Bifacial)",
      area: "~600-3,000 ตร.ม.",
      parking: "50-200+ คัน",
      evCharger: "10-50 จุดชาร์จ",
      savings: "50,000-250,000 บาท/เดือน",
      payback: "3-5 ปี",
      lifespan: "25+ ปี",
      warranty: "แผง 25 ปี / Inverter 10 ปี / โครงสร้าง 10 ปี",
    },
    includes: [
      "ทุกอย่างใน Size M",
      "แผง Bifacial ประสิทธิภาพสูง",
      "BESS ระบบกักเก็บพลังงาน",
      "DC Fast Charger (CCS2) Option",
      "AI Predictive Maintenance",
      "O&M Contract 3-5 ปี",
      "ที่ปรึกษา ESG / Carbon Credit",
      "รายงานผลกระทบสิ่งแวดล้อม",
    ],
    evReady: "ติดตั้ง EV Charger ทั้ง AC/DC Fast Charge รองรับ 10-50 จุด",
  },
];

/* ─── Government Policy Highlights ─────────────────────────────── */
const govPolicies = [
  {
    icon: BadgePercent,
    title: "ลดหย่อนภาษี Solar Rooftop",
    desc: "บุคคลธรรมดาลดหย่อนสูงสุด 200,000 บาท / นิติบุคคลหักค่าใช้จ่าย 1.5 เท่า (พ.ร.ฎ. ฉบับที่ 804)",
    period: "มี.ค. 2569 - ธ.ค. 2571",
  },
  {
    icon: Car,
    title: "มาตรการ EV 3.5",
    desc: "รัฐอุดหนุนรถ EV สูงสุด 50,000 บาท/คัน + ลดภาษีสรรพสามิตเหลือ 2% เป้าหมาย 30% ZEV ภายในปี 2030",
    period: "2024 - 2027",
  },
  {
    icon: TrendingUp,
    title: "BOI สนับสนุนพลังงานสะอาด",
    desc: "สิทธิประโยชน์ BOI สำหรับธุรกิจที่ลงทุนพลังงานทดแทน + EV Charger (ประกาศ ป.8/2568)",
    period: "ดำเนินการต่อเนื่อง",
  },
  {
    icon: Leaf,
    title: "เป้าหมาย Carbon Neutrality",
    desc: "ประเทศไทยตั้งเป้า Carbon Neutrality ปี 2050 / Net Zero ปี 2065 — ธุรกิจที่เริ่มก่อนได้เปรียบ",
    period: "เป้าหมายระยะยาว",
  },
];

/* ─── Solar Carport Advantages ─────────────────────────────────── */
const advantages = [
  {
    icon: Car,
    title: "รองรับ EV ที่เพิ่มขึ้น",
    desc: "จำนวนรถ EV ในไทยเพิ่มขึ้นกว่า 300% ในปี 2024-2025 จากมาตรการ EV 3.5 ของรัฐ Solar Carport พร้อม EV Charger ตอบโจทย์ทั้งวันนี้และอนาคต",
  },
  {
    icon: Sun,
    title: "ผลิตไฟฟ้า + ให้ร่มเงา",
    desc: "ใช้พื้นที่จอดรถที่มีอยู่แล้วให้เกิดประโยชน์สูงสุด ไม่ต้องใช้พื้นที่เพิ่ม ผลิตไฟฟ้าได้ตลอดทั้งวัน พร้อมปกป้องรถจากแดดและฝน",
  },
  {
    icon: TrendingUp,
    title: "เพิ่มมูลค่าอสังหาริมทรัพย์",
    desc: "อาคารที่มี Solar Carport + EV Charger มีมูลค่าเพิ่มขึ้น 5-15% ดึงดูดผู้เช่าและลูกค้าที่ใส่ใจสิ่งแวดล้อม",
  },
  {
    icon: BadgePercent,
    title: "สิทธิประโยชน์ทางภาษี",
    desc: "ลดหย่อนภาษีสูงสุด 200,000 บาท (บุคคล) หรือหักค่าใช้จ่าย 1.5 เท่า (นิติบุคคล) + สิทธิ BOI สำหรับพลังงานสะอาด",
  },
  {
    icon: Leaf,
    title: "Carbon Credit & ESG",
    desc: "สร้างรายได้เพิ่มจาก Carbon Credit ตอบโจทย์ ESG สำหรับบริษัทจดทะเบียน และพันธมิตรทางธุรกิจที่ต้องการ supply chain สีเขียว",
  },
  {
    icon: BatteryCharging,
    title: "รายได้จาก EV Charging",
    desc: "เปิดให้บริการชาร์จ EV สร้างรายได้เพิ่มเติมจากพลังงานที่ผลิตเอง ต้นทุนค่าไฟต่ำกว่าซื้อจากการไฟฟ้า",
  },
];

/* ─── FAQ ─────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Solar Carport ต่างจาก Solar Rooftop อย่างไร?",
    a: "Solar Carport ติดตั้งบนโครงสร้างที่จอดรถ ไม่ต้องใช้พื้นที่หลังคาอาคาร เหมาะกับธุรกิจที่มีพื้นที่จอดรถมาก นอกจากผลิตไฟฟ้าแล้วยังให้ร่มเงาและรองรับ EV Charger ได้ทันที ส่วน Solar Rooftop ติดตั้งบนหลังคาอาคารที่มีอยู่แล้ว ต้นทุนต่ำกว่าเพราะไม่ต้องสร้างโครงสร้างใหม่",
  },
  {
    q: "ราคาที่แสดงเป็นราคาสุดท้ายหรือไม่?",
    a: "ราคาที่แสดงเป็นราคาเริ่มต้นโดยประมาณ ราคาจริงขึ้นอยู่กับหลายปัจจัย เช่น พื้นที่ติดตั้ง รูปแบบโครงสร้าง ชนิดแผง ระบบ Inverter และอุปกรณ์เสริม ทีมงานจะสำรวจหน้างานและจัดทำใบเสนอราคาที่แม่นยำให้ฟรี",
  },
  {
    q: "คืนทุนภายในกี่ปี?",
    a: "โดยเฉลี่ย Solar Carport คืนทุนภายใน 3-6 ปี ขึ้นอยู่กับขนาดระบบ ค่าไฟปัจจุบัน และชั่วโมงแสงแดดในพื้นที่ ระบบมีอายุใช้งาน 25+ ปี หมายความว่าหลังคืนทุนแล้วจะได้ไฟฟ้าฟรีอีก 19-22 ปี",
  },
  {
    q: "รองรับ EV Charger ได้กี่จุด?",
    a: "ขึ้นอยู่กับขนาดระบบ — Size S รองรับ 1-2 จุด, Size M รองรับ 3-10 จุด, Size L รองรับ 10-50 จุด ทั้ง AC Type 2 และ DC Fast Charge (CCS2) สามารถเพิ่มจุดชาร์จในภายหลังได้",
  },
  {
    q: "ต้องขออนุญาตหน่วยงานใดบ้าง?",
    a: "ทีมงาน SIRINX ดำเนินการขออนุญาตให้ทั้งหมด ได้แก่ ขออนุญาตเชื่อมต่อ กฟน./กฟภ., ขออนุญาตก่อสร้าง (กรณีโครงสร้างใหม่), และจดทะเบียนผู้ผลิตไฟฟ้า (กรณี Net Metering)",
  },
  {
    q: "มีบริการดูแลหลังติดตั้งไหม?",
    a: "มีครับ ทุกแพ็คเกจรวมบริการ O&M (Operation & Maintenance) ตั้งแต่ 1-5 ปีตามขนาดระบบ รวมถึง AI Monitoring ตรวจสอบประสิทธิภาพ 24/7 และ Predictive Maintenance ป้องกันปัญหาก่อนเกิด",
  },
  {
    q: "ขนาดใหญ่กว่า 500 kWp ทำได้ไหม?",
    a: "ได้ครับ สำหรับโครงการขนาดใหญ่กว่า 500 kWp เราจะจัดทีมวิศวกรเข้าสำรวจหน้างานและออกแบบระบบเฉพาะทาง กรุณาติดต่อทีมงานโดยตรงเพื่อประเมินความต้องการ",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ─── Component ────────────────────────────────────────────────── */
export default function Pricing() {
  const [expandedPkg, setExpandedPkg] = useState<string | null>("size-m");

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* ===== HERO ===== */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow via-background to-background" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 border-accent-primary/40 text-accent-primary">
              <Calculator className="w-3.5 h-3.5 mr-1.5" /> แพ็คเกจราคา Solar Carport
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              เลือกขนาดที่เหมาะกับธุรกิจ{" "}
              <span className="text-gradient-accent">คุ้มค่าทุกการลงทุน</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6 max-w-2xl">
              Solar Carport โดย SIRINX — ผลิตไฟฟ้า ให้ร่มเงา รองรับ EV Charger
              พร้อมสิทธิประโยชน์ทางภาษีจากมาตรการรัฐ เลือกแพ็คเกจที่ตอบโจทย์ หรือให้ทีมงานออกแบบเฉพาะทาง
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact?interest=solar-carport">
                <Button size="lg" className="btn-accent font-display">
                  ขอใบเสนอราคาฟรี <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/assessment">
                <Button size="lg" variant="outline" className="border-border-accent font-display">
                  <Calculator className="w-4 h-4 mr-1" /> ประเมินความคุ้มค่า
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY SOLAR CARPORT NOW — Government Policy ===== */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">
              Government Support
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              ทำไมต้องลงทุน Solar Carport <span className="text-gradient-accent">ตอนนี้</span>
            </h2>
            <p className="text-text-secondary">
              มาตรการรัฐสนับสนุนทั้งพลังงานสะอาดและรถยนต์ไฟฟ้า — ธุรกิจที่เริ่มก่อนได้เปรียบทั้งต้นทุนและภาพลักษณ์
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {govPolicies.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center mb-3">
                  <policy.icon className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-2">{policy.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-2">{policy.desc}</p>
                <span className="inline-block text-[10px] font-medium text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded-full">
                  {policy.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PACKAGE CARDS ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">
              Packages
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              แพ็คเกจ Solar Carport <span className="text-gradient-accent">3 ขนาด</span>
            </h2>
            <p className="text-text-secondary">
              เลือกขนาดที่เหมาะกับพื้นที่และงบประมาณ — ราคาเริ่มต้นโดยประมาณ ทีมงานจะสำรวจและเสนอราคาจริงให้ฟรี
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className={`relative rounded-2xl border-2 ${pkg.borderColor} bg-gradient-to-b ${pkg.color} p-6 lg:p-8 transition-all duration-300 ${
                  pkg.popular ? "lg:scale-105 lg:-my-2 shadow-lg" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent-primary text-white font-display shadow-md">
                      <Sparkles className="w-3 h-3 mr-1" /> แนะนำ
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-display text-2xl font-bold ${pkg.accentColor}`}>{pkg.name}</span>
                    <span className="text-sm text-text-muted">— {pkg.subtitle}</span>
                  </div>
                  <div className="font-display text-lg font-semibold text-foreground mb-1">
                    {pkg.capacity}
                  </div>
                  <div className={`text-xl font-bold ${pkg.accentColor} mb-1`}>{pkg.priceRange}</div>
                  <p className="text-xs text-text-muted">{pkg.priceNote}</p>
                </div>

                {/* Ideal For */}
                <div className="mb-5">
                  <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">เหมาะสำหรับ</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.idealFor.map((item) => (
                      <span key={item} className={`text-xs px-2 py-1 rounded-md ${pkg.bgAccent} ${pkg.accentColor}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Specs */}
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">ที่จอดรถ</span>
                    <span className="font-medium text-foreground">{pkg.specs.parking}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">EV Charger</span>
                    <span className="font-medium text-foreground">{pkg.specs.evCharger}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">ประหยัดค่าไฟ</span>
                    <span className={`font-semibold ${pkg.accentColor}`}>{pkg.specs.savings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">คืนทุน</span>
                    <span className="font-semibold text-foreground">{pkg.specs.payback}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">อายุใช้งาน</span>
                    <span className="font-medium text-foreground">{pkg.specs.lifespan}</span>
                  </div>
                </div>

                {/* EV Ready Badge */}
                <div className={`p-3 rounded-lg ${pkg.bgAccent} mb-5`}>
                  <div className="flex items-start gap-2">
                    <Car className={`w-4 h-4 mt-0.5 ${pkg.accentColor} shrink-0`} />
                    <div>
                      <span className={`text-xs font-semibold ${pkg.accentColor}`}>EV Ready</span>
                      <p className="text-xs text-text-muted mt-0.5">{pkg.evReady}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable Includes */}
                <button
                  onClick={() => setExpandedPkg(expandedPkg === pkg.id ? null : pkg.id)}
                  className="flex items-center gap-1 text-xs font-medium text-text-secondary hover:text-foreground transition-colors mb-3"
                >
                  {expandedPkg === pkg.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {expandedPkg === pkg.id ? "ซ่อนรายละเอียด" : "ดูรายละเอียดทั้งหมด"}
                </button>
                {expandedPkg === pkg.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-1.5 mb-5"
                  >
                    {pkg.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 ${pkg.accentColor} shrink-0`} />
                        <span className="text-text-secondary">{item}</span>
                      </div>
                    ))}
                    <div className="pt-2 text-xs text-text-muted">
                      <strong>การรับประกัน:</strong> {pkg.specs.warranty}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <Link href={`/contact?interest=solar-carport&package=${pkg.id}`}>
                  <Button
                    className={`w-full font-display ${pkg.popular ? "btn-accent" : ""}`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    ขอใบเสนอราคา {pkg.name} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Custom / Enterprise */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="rounded-2xl border-2 border-dashed border-border-accent p-6 lg:p-8 text-center bg-accent-glow"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-accent-primary" />
              <h3 className="font-display text-xl font-bold text-foreground">
                Custom — โครงการขนาดใหญ่ (500+ kWp)
              </h3>
            </div>
            <p className="text-text-secondary max-w-2xl mx-auto mb-4">
              สำหรับโครงการขนาดใหญ่ที่ต้องการออกแบบเฉพาะทาง กรุณาประเมินขนาดกำลังที่ต้องการใช้
              แล้วส่งข้อมูลให้ทีมงานเข้าประเมินหน้างาน — ฟรีไม่มีค่าใช้จ่าย
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-border-subtle text-text-secondary">
                <Factory className="w-3 h-3 inline mr-1" /> โรงงานขนาดใหญ่
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-border-subtle text-text-secondary">
                <Building2 className="w-3 h-3 inline mr-1" /> นิคมอุตสาหกรรม
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-border-subtle text-text-secondary">
                <Users className="w-3 h-3 inline mr-1" /> หน่วยงานราชการ
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-surface-elevated border border-border-subtle text-text-secondary">
                <Hotel className="w-3 h-3 inline mr-1" /> โครงการอสังหาฯ
              </span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact?interest=solar-carport&package=custom">
                <Button size="lg" className="btn-accent font-display">
                  <Phone className="w-4 h-4 mr-1" /> ติดต่อทีมงานโดยตรง
                </Button>
              </Link>
              <Link href="/assessment">
                <Button size="lg" variant="outline" className="border-border-accent font-display">
                  <Calculator className="w-4 h-4 mr-1" /> ประเมินขนาดระบบ
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ADVANTAGES — Why Solar Carport ===== */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">
              Advantages
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              ข้อดีของ Solar Carport <span className="text-gradient-accent">ที่ไม่ควรมองข้าม</span>
            </h2>
            <p className="text-text-secondary">
              ไม่ใช่แค่ลดค่าไฟ — Solar Carport คือการลงทุนที่สร้างมูลค่าหลายทาง ทั้งรายได้ ภาพลักษณ์ และความพร้อมรับอนาคต
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center mb-3">
                  <adv.icon className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{adv.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              เปรียบเทียบแพ็คเกจ
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-3 px-4 font-display font-semibold text-text-secondary">รายการ</th>
                  <th className="text-center py-3 px-4 font-display font-semibold text-emerald-500">Size S</th>
                  <th className="text-center py-3 px-4 font-display font-semibold text-accent-primary">
                    Size M <Badge className="ml-1 bg-accent-primary/20 text-accent-primary text-[10px]">แนะนำ</Badge>
                  </th>
                  <th className="text-center py-3 px-4 font-display font-semibold text-amber-500">Size L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {[
                  { label: "กำลังผลิต", s: "10-30 kWp", m: "30-100 kWp", l: "100-500 kWp" },
                  { label: "ที่จอดรถ", s: "5-15 คัน", m: "15-50 คัน", l: "50-200+ คัน" },
                  { label: "EV Charger", s: "1-2 จุด", m: "3-10 จุด", l: "10-50 จุด" },
                  { label: "ประหยัดค่าไฟ/เดือน", s: "5K-15K", m: "15K-50K", l: "50K-250K" },
                  { label: "คืนทุน", s: "4-6 ปี", m: "3-5 ปี", l: "3-5 ปี" },
                  { label: "BESS (แบตเตอรี่)", s: "—", m: "Option", l: "รวม" },
                  { label: "AI Monitoring", s: "แอป", m: "Dashboard", l: "Predictive AI" },
                  { label: "DC Fast Charge", s: "—", m: "—", l: "Option" },
                  { label: "O&M Contract", s: "1 ปี", m: "1 ปี", l: "3-5 ปี" },
                  { label: "Carbon Credit", s: "—", m: "ใบรับรอง", l: "ที่ปรึกษา ESG" },
                  { label: "ราคาเริ่มต้น", s: "~300K", m: "~840K", l: "~2.5M" },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-accent-glow transition-colors">
                    <td className="py-2.5 px-4 font-medium text-foreground">{row.label}</td>
                    <td className="py-2.5 px-4 text-center text-text-secondary">{row.s}</td>
                    <td className="py-2.5 px-4 text-center text-text-secondary font-medium">{row.m}</td>
                    <td className="py-2.5 px-4 text-center text-text-secondary">{row.l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted text-center mt-4">
            * ราคาเป็นราคาประมาณการ ราคาจริงขึ้นอยู่กับการสำรวจหน้างาน ติดต่อทีมงานเพื่อรับใบเสนอราคาที่แม่นยำ
          </p>
        </div>
      </section>

      {/* ===== SOLAR CARPORT vs TRADITIONAL PARKING ===== */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">
              Comparison
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Solar Carport vs <span className="text-gradient-accent">ที่จอดรถแบบเดิม</span>
            </h2>
            <p className="text-text-secondary">
              เปรียบเทียบข้อแตกต่างระหว่างที่จอดรถทั่วไปกับ Solar Carport ที่สร้างรายได้และมูลค่าเพิ่มให้ธุรกิจ
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-3 px-4 font-display font-semibold text-text-secondary">รายการ</th>
                  <th className="text-center py-3 px-4 font-display font-semibold text-text-muted">ที่จอดรถแบบเดิม</th>
                  <th className="text-center py-3 px-4 font-display font-semibold text-accent-primary">Solar Carport</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {[
                  { label: "รายได้จากพื้นที่", old: "ไม่มี — เป็นต้นทุนอย่างเดียว", carport: "ผลิตไฟฟ้าลดค่าไฟ 30-100%", highlight: true },
                  { label: "ร่มเงา / ป้องกันแดด-ฝน", old: "ไม่มีหลังคา รถโดนแดดและฝนโดยตรง", carport: "หลังคาแผงโซลาร์ปกป้องครบวงจร", highlight: false },
                  { label: "รองรับ EV Charger", old: "ต้องลงทุนเพิ่มเติม ไม่มีไฟฟ้าสำรอง", carport: "Pre-wired พร้อมใช้งาน ไฟฟ้าจากแสงอาทิตย์", highlight: true },
                  { label: "มูลค่าอสังหาริมทรัพย์", old: "ไม่เพิ่มมูลค่า", carport: "เพิ่มมูลค่า 5-15% ดึงดูดผู้เช่า Green", highlight: false },
                  { label: "สิทธิทางภาษี (BOI / ลดหย่อน)", old: "ไม่มีสิทธิลดหย่อน", carport: "ลดหย่อนภาษี 200% + BOI + ค่าเสื่อมเร่ง", highlight: true },
                  { label: "Carbon Credit / ESG", old: "ไม่ได้", carport: "ได้ Carbon Credit + ตอบโจทย์ ESG", highlight: false },
                  { label: "ค่าดูแลระยะยาว", old: "ต้นทุนซ่อมบำรุงตลอดอายุการใช้งาน", carport: "O&M + AI Monitoring ตลอด 25 ปี", highlight: false },
                  { label: "รายได้จาก EV Charging", old: "ไม่มี", carport: "เปิดให้บริการชาร์จ EV สร้างรายได้เพิ่ม", highlight: true },
                ].map((row) => (
                  <tr key={row.label} className={`hover:bg-accent-glow transition-colors ${row.highlight ? "bg-accent-primary/5" : ""}`}>
                    <td className="py-2.5 px-4 font-medium text-foreground">{row.label}</td>
                    <td className="py-2.5 px-4 text-center text-text-muted">{row.old}</td>
                    <td className="py-2.5 px-4 text-center text-accent-primary font-medium">{row.carport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container max-w-3xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              คำถามที่พบบ่อย
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border-subtle rounded-xl px-5 bg-surface-elevated"
              >
                <AccordionTrigger className="font-display font-semibold text-foreground text-left text-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-text-secondary leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container text-center max-w-2xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
          >
            <Zap className="w-10 h-10 text-accent-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              พร้อมเริ่มต้นลดค่าไฟ?
            </h2>
            <p className="text-text-secondary mb-6">
              ทีมงาน SIRINX พร้อมสำรวจหน้างานและจัดทำใบเสนอราคาให้ฟรี — ไม่มีค่าใช้จ่าย ไม่มีข้อผูกมัด
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact?interest=solar-carport">
                <Button size="lg" className="btn-accent font-display">
                  นัดสำรวจหน้างานฟรี <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/solar-carport">
                <Button size="lg" variant="outline" className="border-border-accent font-display">
                  ดูรายละเอียด Solar Carport
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
