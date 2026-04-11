import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sun, Waves, Car, Battery, Brain, Wrench, Handshake, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/hero-solutions-AG25WEja6TRJEEzvpx3wZU.webp";

const solutions = [
  {
    id: "rooftop", icon: Sun, title: "Rooftop Solar",
    problem: "ค่าไฟฟ้าเป็นต้นทุนหลักของธุรกิจ โดยเฉพาะโรงงานและอาคารขนาดใหญ่ที่ใช้ไฟในช่วงกลางวันสูง",
    solution: "ระบบโซลาร์บนหลังคาที่ออกแบบเฉพาะสำหรับแต่ละอาคาร ใช้แผงโซลาร์ประสิทธิภาพสูง พร้อมระบบ monitoring แบบ real-time",
    suitable: ["โรงงานที่มีหลังคาขนาดใหญ่", "อาคารพาณิชย์และสำนักงาน", "ห้างสรรพสินค้าและคลังสินค้า", "โรงแรมและรีสอร์ท"],
    benefits: ["ลดค่าไฟ 30-100% (รวม BESS)", "คืนทุนภายใน 3-5 ปี", "อายุการใช้งาน 25+ ปี", "เพิ่มมูลค่าอาคาร"],
  },
  {
    id: "floating", icon: Waves, title: "Floating Solar",
    problem: "ธุรกิจที่มีพื้นที่น้ำแต่ไม่มีหลังคาเพียงพอ หรือต้องการใช้พื้นที่ผิวน้ำให้เกิดประโยชน์",
    solution: "ระบบโซลาร์ลอยน้ำที่ออกแบบสำหรับอ่างเก็บน้ำ บ่อน้ำอุตสาหกรรม และแหล่งน้ำต่าง ๆ ช่วยลดการระเหยของน้ำและผลิตไฟฟ้าพร้อมกัน",
    suitable: ["อ่างเก็บน้ำชลประทาน", "บ่อน้ำในโรงงาน", "ฟาร์มเพาะเลี้ยงสัตว์น้ำ", "แหล่งน้ำสาธารณะ"],
    benefits: ["ใช้พื้นที่น้ำให้เกิดประโยชน์", "ลดการระเหยของน้ำ 30-50%", "ประสิทธิภาพสูงกว่า ground-mount", "ไม่เสียพื้นที่ดิน"],
  },
  {
    id: "carport", icon: Car, title: "Solar Carport",
    problem: "ที่จอดรถเป็นพื้นที่ว่างที่ไม่สร้างรายได้ และรถยนต์ร้อนจัดจากแดด",
    solution: "โครงสร้างหลังคาโซลาร์สำหรับที่จอดรถ ผลิตไฟฟ้าพร้อมให้ร่มเงา รองรับ EV Charging Station ในอนาคต",
    suitable: ["ห้างสรรพสินค้า", "อาคารสำนักงาน", "โรงงานที่มีลานจอดรถ", "สถานีบริการ"],
    benefits: ["เปลี่ยนที่จอดรถเป็นโรงไฟฟ้า", "ให้ร่มเงาแก่รถยนต์", "รองรับ EV Charging", "เพิ่มมูลค่าอสังหาริมทรัพย์"],
  },
  {
    id: "bess", icon: Battery, title: "BESS / ESS",
    problem: "ค่า demand charge สูง ไฟฟ้าดับบ่อย หรือต้องการใช้พลังงานโซลาร์ในช่วงกลางคืน",
    solution: "ระบบกักเก็บพลังงาน (Battery Energy Storage System) ที่ทำงานร่วมกับโซลาร์ ช่วยบริหารจัดการพลังงานอย่างชาญฉลาด",
    suitable: ["โรงงานที่มี demand charge สูง", "ธุรกิจที่ต้องการ backup power", "อาคารที่ต้องการ peak shaving", "พื้นที่ที่ไฟฟ้าไม่เสถียร"],
    benefits: ["ลดค่า demand charge", "สำรองไฟฟ้ายามฉุกเฉิน", "ใช้โซลาร์ได้ตลอด 24 ชม.", "เพิ่มความเสถียรของระบบ"],
  },
  {
    id: "ai-energy", icon: Brain, title: "AI Energy Management",
    problem: "ไม่สามารถมองเห็นการใช้พลังงานแบบ real-time ทำให้ไม่รู้ว่าจุดไหนสิ้นเปลืองและควรปรับปรุงอย่างไร",
    solution: "แพลตฟอร์ม AI ที่วิเคราะห์ข้อมูลพลังงานแบบ real-time แนะนำการปรับปรุง และควบคุมระบบอัตโนมัติเพื่อประสิทธิภาพสูงสุด",
    suitable: ["โรงงานที่ต้องการลดต้นทุนพลังงาน", "อาคารที่มีระบบพลังงานหลายชนิด", "ธุรกิจที่ต้องการ ESG reporting", "องค์กรที่มีหลายสาขา"],
    benefits: ["เห็นข้อมูลพลังงาน real-time", "AI แนะนำการประหยัด", "รายงาน ESG อัตโนมัติ", "ลดพลังงานสิ้นเปลืองเพิ่ม 10-20%"],
  },
  {
    id: "ai-om", icon: Wrench, title: "Physical AI O&M",
    problem: "ระบบโซลาร์เสื่อมประสิทธิภาพตามเวลา การตรวจสอบแบบเดิมช้าและมีค่าใช้จ่ายสูง",
    solution: "ระบบดูแลรักษาด้วย AI และ IoT sensors ตรวจจับปัญหาก่อนเกิดความเสียหาย วางแผนซ่อมบำรุงอัตโนมัติ",
    suitable: ["โครงการโซลาร์ทุกขนาด", "ระบบ BESS ที่ต้องการ monitoring", "โรงงานที่มีระบบพลังงานซับซ้อน", "ฟาร์มโซลาร์ขนาดใหญ่"],
    benefits: ["Predictive maintenance", "ลดเวลา downtime", "ยืดอายุอุปกรณ์", "ลดค่าซ่อมบำรุง 30%"],
  },
  {
    id: "financing", icon: Handshake, title: "Co-investment / Financing",
    problem: "ต้องการติดตั้งโซลาร์แต่ไม่ต้องการลงทุนเงินก้อนใหญ่ตั้งแต่วันแรก",
    solution: "รูปแบบการลงทุนร่วมที่ยืดหยุ่น ทั้งซื้อขาด ผ่อนชำระ PPA และ Co-investment ให้ธุรกิจเข้าถึงพลังงานสะอาดได้ง่ายขึ้น",
    suitable: ["SME ที่งบจำกัด", "ธุรกิจที่ต้องการ cash flow flexibility", "โครงการขนาดใหญ่", "องค์กรที่ต้องการ off-balance sheet"],
    benefits: ["ไม่ต้องลงทุนสูงตั้งแต่วันแรก", "รูปแบบยืดหยุ่น", "ลดค่าไฟตั้งแต่เดือนแรก", "ทีมที่ปรึกษาช่วยวิเคราะห์"],
  },
];

export default function Solutions() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="SIRINX Solutions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>
        <div className="container relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Solutions</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              โซลูชันพลังงาน<span className="text-gradient-accent">ครบวงจร</span>
            </h1>
            <p className="text-lg text-text-secondary">
              ทุกโซลูชันออกแบบเพื่อผลลัพธ์ทางธุรกิจที่วัดได้ ตั้งแต่การผลิตไฟฟ้า กักเก็บพลังงาน ไปจนถึงการบริหารจัดการด้วย AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions List */}
      {solutions.map((sol, idx) => (
        <section key={sol.id} id={sol.id} className={`py-20 lg:py-24 ${idx % 2 === 0 ? "bg-background" : "section-alt"}`}>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
                    <sol.icon className="w-5 h-5 text-accent-primary" />
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{sol.title}</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-accent-secondary uppercase tracking-wider mb-2">ปัญหาที่ลูกค้าเจอ</h3>
                    <p className="text-text-secondary leading-relaxed">{sol.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-accent-primary uppercase tracking-wider mb-2">วิธีแก้ของ SIRINX</h3>
                    <p className="text-text-secondary leading-relaxed">{sol.solution}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold btn-accent rounded-lg">
                    ขอคำปรึกษา {sol.title} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-6">
                <div className="p-6 rounded-xl border border-border-subtle bg-surface-elevated">
                  <h3 className="font-display font-semibold text-foreground mb-4">เหมาะกับใคร</h3>
                  <ul className="space-y-2.5">
                    {sol.suitable.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-xl glass-card">
                  <h3 className="font-display font-semibold text-foreground mb-4">ประโยชน์ทางธุรกิจ</h3>
                  <ul className="space-y-2.5">
                    {sol.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 section-alt relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">ไม่แน่ใจว่าโซลูชันไหนเหมาะ?</h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              ทีมวิศวกรของเราพร้อมช่วยวิเคราะห์ความต้องการและแนะนำโซลูชันที่เหมาะสมที่สุดสำหรับธุรกิจของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่าเบื้องต้น
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
