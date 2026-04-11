import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Target, Eye, Cpu, Users, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/hero-about-3Trik9L6DrdCwCcjCt2KVz.webp";

const values = [
  { icon: Cpu, title: "Engineering-First", desc: "ทุกโซลูชันเริ่มจากวิศวกรรมที่แม่นยำ ไม่ใช่การขาย" },
  { icon: ShieldCheck, title: "ความน่าเชื่อถือ", desc: "โปร่งใส ตรงไปตรงมา ไม่สัญญาสิ่งที่ทำไม่ได้" },
  { icon: Target, title: "ผลลัพธ์ที่วัดได้", desc: "ทุกโครงการมี KPI ชัดเจน ติดตามผลได้ตลอดอายุระบบ" },
  { icon: Users, title: "พันธมิตรระยะยาว", desc: "ไม่ใช่แค่ขายและติดตั้ง แต่ดูแลตลอดอายุการใช้งาน 25+ ปี" },
];

const milestones = [
  { year: "2020", event: "ก่อตั้ง SIRINX ด้วยวิสัยทัศน์ Smart Energy Infrastructure" },
  { year: "2021", event: "ติดตั้งโครงการ Rooftop Solar แห่งแรก ขนาด 1 MW" },
  { year: "2022", event: "ขยายสู่ Floating Solar และ BESS เปิดตัว AI Monitoring" },
  { year: "2023", event: "ครบ 100 โครงการ กำลังผลิตรวม 30 MW" },
  { year: "2024", event: "เปิดตัว AI Energy Management Platform" },
  { year: "2025", event: "มุ่งสู่ Solar Digital Agentic Company" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="SIRINX Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>
        <div className="container relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">About Us</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              วิศวกรรมพลังงาน<br />
              <span className="text-gradient-accent">ที่ขับเคลื่อนด้วยข้อมูล</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              SIRINX ก่อตั้งขึ้นด้วยความเชื่อว่าพลังงานสะอาดต้องมาพร้อมกับความฉลาดทางดิจิทัล เราไม่ได้แค่ติดตั้งแผงโซลาร์ แต่สร้างโครงสร้างพื้นฐานพลังงานอัจฉริยะที่เติบโตไปกับธุรกิจของคุณ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-accent-primary" />
                <h2 className="font-display text-2xl font-bold text-foreground">วิสัยทัศน์</h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-lg">
                เป็นผู้นำด้าน Smart Energy Infrastructure ของประเทศไทย ที่ผสานพลังงานสะอาด เทคโนโลยี AI และระบบอัตโนมัติ เพื่อสร้างอนาคตพลังงานที่ยั่งยืนและคุ้มค่าสำหรับทุกธุรกิจ
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-accent-secondary" />
                <h2 className="font-display text-2xl font-bold text-foreground">พันธกิจ</h2>
              </div>
              <p className="text-text-secondary leading-relaxed text-lg">
                ออกแบบ ติดตั้ง และบริหารระบบพลังงานครบวงจรด้วยมาตรฐานวิศวกรรมระดับสูง พร้อมข้อมูลเชิงลึกที่ช่วยให้ธุรกิจตัดสินใจได้อย่างมั่นใจ ตั้งแต่วันแรกจนตลอดอายุการใช้งาน
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Core Values</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">หลักการที่เราไม่ประนีประนอม</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-6 rounded-xl border border-border-subtle hover:border-border-accent transition-colors bg-surface-elevated">
                <v.icon className="w-8 h-8 text-accent-primary mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Approach */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">End-to-End</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">ครบวงจรตั้งแต่ต้นจนจบ</h2>
            <p className="text-text-secondary">
              เราไม่ได้แค่ขายอุปกรณ์ แต่เป็นพันธมิตรด้านพลังงานที่ดูแลทุกขั้นตอน ตั้งแต่การวิเคราะห์ความคุ้มค่า ออกแบบระบบ ติดตั้ง ไปจนถึงการดูแลรักษาตลอดอายุการใช้งาน
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["วิเคราะห์", "ออกแบบ", "จัดหา", "ติดตั้ง", "ดูแล", "เพิ่มประสิทธิภาพ"].map((step, i) => (
              <motion.div key={step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="text-center p-4 rounded-xl bg-accent-glow border border-border-accent">
                <div className="font-display text-2xl font-bold text-accent-primary/30 mb-1">0{i + 1}</div>
                <div className="text-sm font-medium text-foreground">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-14">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Milestones</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">เส้นทางการเติบโต</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-primary/50 via-accent-primary/20 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className="hidden lg:block lg:w-1/2" />
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-accent-primary -translate-x-1.5 mt-2 ring-4 ring-background" />
                  <div className="ml-10 lg:ml-0 lg:w-1/2 p-5 rounded-xl border border-border-subtle bg-surface-elevated">
                    <span className="font-display font-bold text-accent-primary text-sm">{m.year}</span>
                    <p className="text-text-secondary mt-1">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-xs text-text-muted text-center">* placeholder — ต้องแทนที่ด้วยข้อมูลจริง</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">พร้อมเป็นพันธมิตรด้านพลังงาน?</h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              พูดคุยกับทีมวิศวกรของเราเพื่อหาโซลูชันที่เหมาะกับธุรกิจของคุณ
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
              ติดต่อเรา <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
