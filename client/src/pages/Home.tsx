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

const solutions = [
  { icon: Sun, title: "Rooftop Solar", desc: "ลดค่าไฟ 30-70% ด้วยระบบโซลาร์บนหลังคาที่ออกแบบเฉพาะอาคาร", href: "/solutions#rooftop" },
  { icon: Waves, title: "Floating Solar", desc: "ใช้พื้นที่ผิวน้ำให้เกิดประโยชน์สูงสุด เหมาะกับอ่างเก็บน้ำและบ่อน้ำอุตสาหกรรม", href: "/solutions#floating" },
  { icon: Car, title: "Solar Carport", desc: "เปลี่ยนที่จอดรถเป็นโรงไฟฟ้า รองรับ EV Charging ในอนาคต", href: "/solutions#carport" },
  { icon: Battery, title: "BESS / ESS", desc: "กักเก็บพลังงานเพื่อใช้ในช่วง peak หรือยามไฟดับ ลดค่า demand charge", href: "/solutions#bess" },
  { icon: Brain, title: "AI Energy Management", desc: "ระบบ AI วิเคราะห์และเพิ่มประสิทธิภาพการใช้พลังงานแบบ real-time", href: "/solutions#ai-energy" },
  { icon: Wrench, title: "Physical AI O&M", desc: "ดูแลรักษาระบบด้วย predictive maintenance ลดความเสี่ยงเสียหาย", href: "/solutions#ai-om" },
];

const outcomes = [
  { value: "30-70%", label: "ลดค่าไฟฟ้า", icon: TrendingUp },
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
  { metric: "150+", label: "โครงการที่ติดตั้ง", note: "ทั่วประเทศไทย" },
  { metric: "50 MW+", label: "กำลังผลิตรวม", note: "Rooftop, Floating, Carport" },
  { metric: "200+", label: "ลูกค้าองค์กร", note: "ที่ไว้วางใจ SIRINX" },
  { metric: "98%", label: "ความพึงพอใจ", note: "จากแบบสำรวจลูกค้า" },
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
            <p className="text-lg lg:text-xl text-text-secondary italic leading-relaxed mb-6">
              "SIRINX ช่วยให้โรงงานของเราลดค่าไฟได้กว่า 40% ภายในปีแรก ระบบ monitoring ทำให้เราเห็นข้อมูลการใช้พลังงานแบบ real-time ซึ่งช่วยในการวางแผนการผลิตได้ดีขึ้นมาก"
            </p>
            <div>
              <div className="font-display font-semibold text-foreground">คุณสมชาย วิศวกรรม</div>
              <div className="text-sm text-text-muted">ผู้จัดการโรงงาน — บริษัท ตัวอย่าง จำกัด</div>
            </div>
            <div className="mt-4 text-xs text-text-muted">* placeholder — ต้องแทนที่ด้วยข้อมูลจริง</div>
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

      {/* ===== SITE PHOTOS ===== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-8">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Our Work</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">ผลงานติดตั้งจริง</h2>
          </motion.div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {[
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_921587477351636_bde97caf.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_803461432358813_ea7aeaa1.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_4197992190511860_34fd339e.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_1425755759570180_43093913.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_934911282677303_24e134a8.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_931207172874507_436de73d.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_1472436094271800_f72cd94a.jpeg",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/received_1308771534448072_f086825c.jpeg",
            ].map((src, i) => (
              <motion.img key={i} src={src} alt={`SIRINX project ${i + 1}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 4}
                className="w-48 h-36 lg:w-56 lg:h-40 object-cover rounded-xl border border-border-subtle flex-shrink-0 hover:scale-105 hover:border-border-accent transition-all" />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
              ดูผลงานทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
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
