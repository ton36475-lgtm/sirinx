/**
 * SIRINX Home Page — Dual Theme
 * Light: White + Orange | Dark: Navy + Cyan + Amber
 * All colors use semantic CSS variables for automatic theme switching
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Sun, Waves, Car, Battery, Brain, Wrench, TrendingUp,
  Factory, Wheat, Hotel, GraduationCap, Building2, Landmark,
  ArrowRight, CheckCircle2, Zap, Shield, BarChart3, Clock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/hero-main-bCzCTCeaup46mVvtEbpjnr.webp";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/photo_2026-03-24_06-45-58_293d121c.jpg";

const solutions = [
  { icon: Sun, title: "Rooftop Solar", desc: "ลดค่าไฟ 30-100% ด้วยระบบโซลาร์+แบตเตอรี่ (BESS) ที่ออกแบบเฉพาะอาคาร", href: "/solutions#rooftop" },
  { icon: Waves, title: "Floating Solar", desc: "ใช้พื้นที่ผิวน้ำให้เกิดประโยชน์สูงสุด เหมาะกับอ่างเก็บน้ำและบ่อน้ำอุตสาหกรรม", href: "/solutions#floating" },
  { icon: Car, title: "Solar Carport", desc: "เปลี่ยนที่จอดรถเป็นโรงไฟฟ้า รองรับ EV Charging ในอนาคต", href: "/solutions#carport" },
  { icon: Battery, title: "BESS / ESS", desc: "กักเก็บพลังงานเพื่อใช้ในช่วง peak หรือยามไฟดับ ลดค่า demand charge", href: "/solutions#bess" },
  { icon: Brain, title: "AI Energy Management", desc: "ระบบ AI วิเคราะห์และเพิ่มประสิทธิภาพการใช้พลังงานแบบ real-time", href: "/solutions#ai-energy" },
  { icon: Wrench, title: "Physical AI O&M", desc: "ดูแลรักษาระบบด้วย predictive maintenance ลดความเสี่ยงเสียหาย", href: "/solutions#ai-om" },
];

const outcomes = [
  { value: "30-100%", label: "ลดค่าไฟฟ้า", icon: TrendingUp },
  { value: "3-5 ปี", label: "คืนทุนเฉลี่ย", icon: Clock },
  { value: "25+ ปี", label: "อายุการใช้งาน", icon: Shield },
  { value: "99.5%", label: "System Uptime", icon: BarChart3 },
];

const industries = [
  { icon: Factory, title: "โรงงาน", desc: "ลดต้นทุนพลังงานการผลิต เพิ่มขีดความสามารถในการแข่งขัน", href: "/industries#manufacturing" },
  { icon: Wheat, title: "เกษตรกรรม", desc: "Floating Solar + Smart Farming ใช้พื้นที่น้ำให้เกิดประโยชน์คู่", href: "/industries#agriculture" },
  { icon: Hotel, title: "โรงแรม", desc: "ลดค่าพลังงาน เสริมภาพลักษณ์ Green Hotel ดึงดูดนักท่องเที่ยว", href: "/industries#hospitality" },
  { icon: GraduationCap, title: "สถานศึกษา", desc: "ลดงบค่าไฟ สร้าง Living Lab ด้านพลังงานสะอาดให้นักเรียน", href: "/industries#education" },
  { icon: Building2, title: "อาคารพาณิชย์", desc: "เพิ่มมูลค่าอาคาร ลดค่าใช้จ่ายส่วนกลาง ตอบโจทย์ ESG", href: "/industries#commercial" },
  { icon: Landmark, title: "ภาครัฐ", desc: "ลดงบประมาณค่าพลังงาน สนับสนุนเป้าหมาย Carbon Neutrality", href: "/industries#government" },
];

const proofItems = [
  { metric: "2", label: "Solar Farm Node", note: "เรือนแพ Royal Park & โฮลาเทลริมน่าน" },
  { metric: "30-100%", label: "ลดค่าไฟฟ้า", note: "Solar + BESS สำหรับธุรกิจโรงแรม" },
  { metric: "25+ ปี", label: "อายุการใช้งาน", note: "Tier-1 Solar Panel" },
  { metric: "24/7", label: "AI Monitoring", note: "ระบบตรวจสอบแบบ Real-time" },
];

const processSteps = [
  { step: "01", title: "สำรวจหน้างาน", desc: "วิเคราะห์พื้นที่ ค่าไฟ และความต้องการพลังงาน" },
  { step: "02", title: "ออกแบบระบบ", desc: "ออกแบบเฉพาะทาง พร้อมประเมิน ROI" },
  { step: "03", title: "ติดตั้ง", desc: "ทีมวิศวกรมืออาชีพ ติดตั้งตามมาตรฐาน" },
  { step: "04", title: "ดูแลตลอดอายุ", desc: "Monitoring + O&M ด้วย AI ตลอด 25 ปี" },
];

export default function Home() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="SIRINX Solar Infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-accent-primary bg-accent-glow border border-border-accent rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" /> Solar Digital Agentic Company
              </span>
            </motion.div>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6"
            >
              พลังงานสะอาด<br />
              <span className="text-gradient-accent">โครงสร้างพื้นฐานอัจฉริยะ</span><br />
              เพื่อธุรกิจไทย
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl"
            >
              ออกแบบ ติดตั้ง และบริหารระบบพลังงานครบวงจร ตั้งแต่ Solar และ BESS ไปจนถึง AI Energy Management ช่วยธุรกิจลดต้นทุน เพิ่มประสิทธิภาพ และสร้างมูลค่าระยะยาว
            </motion.p>
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent rounded-lg">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่า
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BUSINESS OUTCOMES ===== */}
      <section className="py-16 lg:py-20 section-alt relative">
        <div className="divider-accent absolute top-0 left-0 right-0" />
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {outcomes.map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="text-center"
              >
                <item.icon className="w-6 h-6 text-accent-primary mx-auto mb-3" />
                <div className="font-display text-3xl lg:text-4xl font-bold text-gradient-accent mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-text-muted">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS OVERVIEW ===== */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Solutions</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              โซลูชันพลังงานครบวงจร
            </h2>
            <p className="text-text-secondary leading-relaxed">
              ตั้งแต่การผลิตไฟฟ้า การกักเก็บพลังงาน ไปจนถึงการบริหารจัดการด้วย AI ทุกระบบทำงานร่วมกันเพื่อผลลัพธ์ทางธุรกิจที่วัดได้
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link
                  href={sol.href}
                  className="group block p-6 rounded-xl glass-card hover:border-accent-primary/40 transition-all duration-300 h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center mb-4 group-hover:bg-accent-primary/20 transition-colors">
                    <sol.icon className="w-5 h-5 text-accent-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-accent-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">{sol.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ดูรายละเอียด <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
              ดูโซลูชันทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Process</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              กระบวนการทำงานที่ชัดเจน
            </h2>
            <p className="text-text-secondary">
              จากการสำรวจสู่การติดตั้งและดูแลระบบ ทุกขั้นตอนมีมาตรฐานและความโปร่งใส
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="relative p-6 rounded-xl border border-border-subtle hover:border-border-accent transition-colors bg-surface-elevated"
              >
                <span className="font-display text-5xl font-bold text-accent-primary/15 absolute top-4 right-4">
                  {step.step}
                </span>
                <div className="relative">
                  <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Industries</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              โซลูชันเฉพาะทางสำหรับทุกอุตสาหกรรม
            </h2>
            <p className="text-text-secondary">
              เราเข้าใจความต้องการเฉพาะของแต่ละธุรกิจ และออกแบบระบบพลังงานที่ตอบโจทย์จริง
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link
                  href={ind.href}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-border-subtle hover:border-border-accent hover:bg-accent-glow transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center shrink-0">
                    <ind.icon className="w-5 h-5 text-accent-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-accent-primary transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">{ind.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROOF / TRUST ===== */}
      <section className="py-20 lg:py-28 section-alt relative">
        <div className="divider-accent absolute top-0 left-0 right-0" />
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Track Record</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              ผลงานที่พิสูจน์ความไว้วางใจ
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {proofItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="text-center p-6 rounded-xl border border-border-subtle bg-surface-elevated"
              >
                <div className="font-display text-3xl lg:text-4xl font-bold text-gradient-accent mb-2">
                  {item.metric}
                </div>
                <div className="font-medium text-foreground text-sm mb-1">{item.label}</div>
                <div className="text-xs text-text-muted">{item.note}</div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="max-w-3xl mx-auto glass-card rounded-2xl p-8 lg:p-10 text-center"
          >
            <div className="flex justify-center mb-6">
              <img src={LOGO_URL} alt="SIRINX" className="w-16 h-16 rounded-full ring-2 ring-brand/30" />
            </div>
            <p className="text-lg lg:text-xl text-text-secondary italic leading-relaxed mb-6">
              "เราเชื่อว่าพลังงานสะอาดไม่ใช่แค่เทรนด์ แต่เป็นโครงสร้างพื้นฐานของอนาคต SIRINX ผสาน Solar Infrastructure เข้ากับ AI และ Digital Strategy เพื่อสร้างมูลค่าที่ยั่งยืนให้ธุรกิจไทย"
            </p>
            <div>
              <div className="font-display font-semibold text-foreground">Pitoon Yingyosruangrong</div>
              <div className="text-sm text-text-muted">CEO & Founder — SIRINX Co., Ltd.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== INVESTMENT TEASER ===== */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Investment</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                ลงทุนพลังงานสะอาด<br />ผลตอบแทนที่วัดได้
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                SIRINX มีรูปแบบการลงทุนที่ยืดหยุ่น ทั้งซื้อขาด ผ่อนชำระ และ Co-investment ช่วยให้ธุรกิจเข้าถึงพลังงานสะอาดได้โดยไม่ต้องลงทุนสูงตั้งแต่วันแรก
              </p>
              <ul className="space-y-3 mb-8">
                {["รูปแบบการลงทุนที่ยืดหยุ่น", "ประเมิน ROI ก่อนตัดสินใจ", "สิทธิประโยชน์ทางภาษีที่เป็นไปได้", "ทีมที่ปรึกษาพร้อมช่วยวิเคราะห์"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0" />
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
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/hero-investment-fRtcNVseiLRqovGxudgo83.webp"
                alt="Solar Investment"
                className="rounded-2xl w-full"
              />
              <div className="absolute inset-0 rounded-2xl border border-border-accent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== REAL PROJECTS ===== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Our Projects</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">โครงการติดตั้งจริง</h2>
            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">Solar Farm Node ที่ดำเนินการโดย SIRINX พร้อมระบบ BESS และ AI Energy Management</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Project 1: เรือนแพ Royal Park */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="group relative rounded-2xl overflow-hidden border border-border-subtle hover:border-border-accent transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-hero-main-6LRbjuoZ8ie4rPGnAVhXnQ.webp"
                  alt="Solar Farm Node 1 — เรือนแพ Royal Park พิษณุโลก"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-accent-primary text-text-inverse rounded-md">Node 1</span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-green-600 text-white rounded-md">ดำเนินการแล้ว</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-lg font-bold text-white">โรงแรมเรือนแพ รอยัลปาร์ค</h3>
                  <p className="text-sm text-white/80">พิษณุโลก — Solar Rooftop + BESS + AI EMS</p>
                </div>
              </div>
              <div className="p-4 bg-surface-elevated">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><div className="text-sm font-bold text-gradient-accent">Solar + BESS</div><div className="text-[10px] text-text-muted">ระบบครบวงจร</div></div>
                  <div><div className="text-sm font-bold text-gradient-accent">30-100%</div><div className="text-[10px] text-text-muted">ลดค่าไฟฟ้า</div></div>
                  <div><div className="text-sm font-bold text-gradient-accent">AI EMS</div><div className="text-[10px] text-text-muted">บริหารพลังงาน</div></div>
                </div>
              </div>
            </motion.div>
            {/* Project 2: โฮลาเทลริมน่าน */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="group relative rounded-2xl overflow-hidden border border-border-subtle hover:border-border-accent transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-smart-energy-JXCSVMQTKJHxRxSagYajgy.webp"
                  alt="Solar Farm Node 2 — โฮลาเทลริมน่าน"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-accent-primary text-text-inverse rounded-md">Node 2</span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-amber-500 text-white rounded-md">กำลังก่อสร้าง</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-lg font-bold text-white">โรงแรมโฮลาเทลริมน่าน</h3>
                  <p className="text-sm text-white/80">กำลังปรับปรุงใหม่ — Solar + BESS + Smart Hotel System</p>
                </div>
              </div>
              <div className="p-4 bg-surface-elevated">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><div className="text-sm font-bold text-gradient-accent">Smart Hotel</div><div className="text-[10px] text-text-muted">ระบบอัจฉริยะ</div></div>
                  <div><div className="text-sm font-bold text-gradient-accent">Net Zero</div><div className="text-[10px] text-text-muted">เป้าหมาย</div></div>
                  <div><div className="text-sm font-bold text-gradient-accent">2026</div><div className="text-[10px] text-text-muted">เปิดให้บริการ</div></div>
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

      {/* ===== MARKETING MATERIALS CAROUSEL ===== */}
      <section className="py-12 lg:py-16 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-6">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-2 block">Resources</span>
            <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground">สื่อการตลาดและข้อมูลบริการ</h2>
          </motion.div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {[
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_921587477351636_bde97caf.jpeg", label: "คู่มือลงทุน ROI" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_803461432358813_ea7aeaa1.jpeg", label: "Co-Investment 50:50" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_4197992190511860_34fd339e.jpeg", label: "Smart Farming" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_1355000406660682_193503d7.jpeg", label: "50:50 Investment" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_806743748663527_0517d115.jpeg", label: "150% Tax Shield" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_934911282677303_24e134a8.jpeg", label: "บริการของเรา (TH)" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_931207172874507_436de73d.jpeg", label: "Our Services (EN)" },
              { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_1611595770045379_f7011547.jpeg", label: "Master Plan 2026" },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 4}
                className="flex-shrink-0 w-44 lg:w-52 group">
                <div className="relative rounded-xl overflow-hidden border border-border-subtle hover:border-border-accent transition-all">
                  <img src={item.src} alt={item.label}
                    className="w-full h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs text-text-muted text-center mt-2 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 lg:py-28 section-alt relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="divider-accent absolute top-0 left-0 right-0" />
        <div className="container relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
              พร้อมเริ่มต้นลดค่าพลังงาน?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              นัดสำรวจหน้างานฟรี ไม่มีข้อผูกมัด รับข้อเสนอที่ออกแบบเฉพาะสำหรับธุรกิจของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg text-lg">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold btn-accent-outline rounded-lg text-lg">
                ประเมินความคุ้มค่าเบื้องต้น
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
