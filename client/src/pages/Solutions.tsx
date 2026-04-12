/**
 * SIRINX Solutions — Second Pass Refinement
 * Solar Carport as first/featured solution, visual images, tighter layout
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Sun, Waves, Car, Battery, Brain, Wrench, Handshake,
  CheckCircle2, Zap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";
const HERO = `${CDN}/hero-solutions-AG25WEja6TRJEEzvpx3wZU.webp`;
const IMG_CARPARK = `${CDN}/solar-carpark-hero-HkuPbSXRuEJEzybRN8Xb7W.webp`;
const IMG_EV = `${CDN}/solar-carpark-ev-charging-niYjh6gCmDqQNQiCE6oq8M.webp`;
const IMG_AI = `${CDN}/solar-ai-dashboard-CDhHz7V3K98CLU6eGvW8PP.webp`;
const IMG_OM = `${CDN}/solar-om-maintenance-7BKbWXXHKbZ3Adwwdk9XvZ.webp`;

const solutions = [
  {
    id: "carport", icon: Car, title: "Solar Carport", featured: true,
    image: IMG_CARPARK,
    tagline: "Flagship Solution",
    problem: "ที่จอดรถเป็นพื้นที่ว่างที่ไม่สร้างรายได้ รถร้อนจัดจากแดด ไม่มี EV Charger",
    solution: "โครงสร้างหลังคาโซลาร์สำหรับที่จอดรถ ผลิตไฟฟ้า ให้ร่มเงา รองรับ EV Charging พร้อม BESS และ AI Energy Management",
    suitable: ["ห้างสรรพสินค้า / อาคารพาณิชย์", "โรงงานที่มีลานจอดรถ 50+ คัน", "โรงแรม / รีสอร์ท", "สถานศึกษา / หน่วยงานราชการ"],
    benefits: ["ลดค่าไฟ 30-100%", "คืนทุน 3-5 ปี", "รองรับ EV Charging", "เพิ่มมูลค่าอสังหาริมทรัพย์"],
    link: "/solar-carport",
  },
  {
    id: "rooftop", icon: Sun, title: "Rooftop Solar",
    image: null,
    problem: "ค่าไฟฟ้าเป็นต้นทุนหลักของธุรกิจ โดยเฉพาะโรงงานและอาคารขนาดใหญ่ที่ใช้ไฟในช่วงกลางวันสูง",
    solution: "ระบบโซลาร์บนหลังคาที่ออกแบบเฉพาะสำหรับแต่ละอาคาร ใช้แผง Tier-1 Mono PERC ประสิทธิภาพสูง พร้อม monitoring real-time",
    suitable: ["โรงงานที่มีหลังคาขนาดใหญ่", "อาคารพาณิชย์และสำนักงาน", "ห้างสรรพสินค้าและคลังสินค้า", "โรงแรมและรีสอร์ท"],
    benefits: ["ลดค่าไฟ 30-100% (รวม BESS)", "คืนทุนภายใน 3-5 ปี", "อายุการใช้งาน 25+ ปี", "เพิ่มมูลค่าอาคาร"],
  },
  {
    id: "floating", icon: Waves, title: "Floating Solar",
    image: null,
    problem: "ธุรกิจที่มีพื้นที่น้ำแต่ไม่มีหลังคาเพียงพอ หรือต้องการใช้พื้นที่ผิวน้ำให้เกิดประโยชน์",
    solution: "ระบบโซลาร์ลอยน้ำสำหรับอ่างเก็บน้ำ บ่อน้ำอุตสาหกรรม ช่วยลดการระเหยของน้ำและผลิตไฟฟ้าพร้อมกัน",
    suitable: ["อ่างเก็บน้ำชลประทาน", "บ่อน้ำในโรงงาน", "ฟาร์มเพาะเลี้ยงสัตว์น้ำ", "แหล่งน้ำสาธารณะ"],
    benefits: ["ใช้พื้นที่น้ำให้เกิดประโยชน์", "ลดการระเหยของน้ำ 30-50%", "ประสิทธิภาพสูงกว่า ground-mount", "ไม่เสียพื้นที่ดิน"],
  },
  {
    id: "bess", icon: Battery, title: "BESS / ESS",
    image: IMG_EV,
    problem: "ค่า demand charge สูง ไฟฟ้าดับบ่อย หรือต้องการใช้พลังงานโซลาร์ในช่วงกลางคืน",
    solution: "ระบบกักเก็บพลังงาน (Battery Energy Storage System) ทำงานร่วมกับโซลาร์ บริหารจัดการพลังงานอย่างชาญฉลาด",
    suitable: ["โรงงานที่มี demand charge สูง", "ธุรกิจที่ต้องการ backup power", "อาคารที่ต้องการ peak shaving", "พื้นที่ที่ไฟฟ้าไม่เสถียร"],
    benefits: ["ลดค่า demand charge 15-30%", "สำรองไฟฟ้ายามฉุกเฉิน", "ใช้โซลาร์ได้ตลอด 24 ชม.", "เพิ่มความเสถียรของระบบ"],
  },
  {
    id: "ai-energy", icon: Brain, title: "AI Energy Management",
    image: IMG_AI,
    problem: "ไม่สามารถมองเห็นการใช้พลังงานแบบ real-time ทำให้ไม่รู้ว่าจุดไหนสิ้นเปลืองและควรปรับปรุงอย่างไร",
    solution: "แพลตฟอร์ม AI วิเคราะห์ข้อมูลพลังงาน real-time แนะนำการปรับปรุง ควบคุมระบบอัตโนมัติเพื่อประสิทธิภาพสูงสุด",
    suitable: ["โรงงานที่ต้องการลดต้นทุนพลังงาน", "อาคารที่มีระบบพลังงานหลายชนิด", "ธุรกิจที่ต้องการ ESG reporting", "องค์กรที่มีหลายสาขา"],
    benefits: ["เห็นข้อมูลพลังงาน real-time", "AI แนะนำการประหยัด", "รายงาน ESG อัตโนมัติ", "ลดพลังงานสิ้นเปลืองเพิ่ม 10-20%"],
  },
  {
    id: "ai-om", icon: Wrench, title: "O&M ดูแลระบบ",
    image: IMG_OM,
    problem: "ระบบโซลาร์เสื่อมประสิทธิภาพตามเวลา การตรวจสอบแบบเดิมช้าและมีค่าใช้จ่ายสูง",
    solution: "ระบบดูแลรักษาด้วย AI + Drone Inspection + ทีมวิศวกร ตรวจจับปัญหาก่อนเกิดความเสียหาย ดูแลตลอด 25 ปี",
    suitable: ["โครงการโซลาร์ทุกขนาด", "ระบบ BESS ที่ต้องการ monitoring", "โรงงานที่มีระบบพลังงานซับซ้อน", "ฟาร์มโซลาร์ขนาดใหญ่"],
    benefits: ["Predictive maintenance", "ลดเวลา downtime", "ยืดอายุอุปกรณ์", "ลดค่าซ่อมบำรุง 30%"],
  },
  {
    id: "financing", icon: Handshake, title: "Co-investment / Financing",
    image: null,
    problem: "ต้องการติดตั้งโซลาร์แต่ไม่ต้องการลงทุนเงินก้อนใหญ่ตั้งแต่วันแรก",
    solution: "รูปแบบการลงทุนร่วมที่ยืดหยุ่น ทั้งซื้อขาด ผ่อนชำระ และ Co-investment ให้ธุรกิจเข้าถึงพลังงานสะอาดได้ง่ายขึ้น",
    suitable: ["SME ที่งบจำกัด", "ธุรกิจที่ต้องการ cash flow flexibility", "โครงการขนาดใหญ่", "องค์กรที่ต้องการ off-balance sheet"],
    benefits: ["ไม่ต้องลงทุนสูงตั้งแต่วันแรก", "รูปแบบยืดหยุ่น", "ลดค่าไฟตั้งแต่เดือนแรก", "ทีมที่ปรึกษาช่วยวิเคราะห์"],
  },
];

export default function Solutions() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="SIRINX Solutions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>
        <div className="container relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Solutions</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
              โซลูชันพลังงาน<span className="text-gradient-accent">ครบวงจร</span>
            </h1>
            <p className="text-text-secondary">
              ทุกโซลูชันออกแบบเพื่อผลลัพธ์ทางธุรกิจที่วัดได้ ตั้งแต่การผลิตไฟฟ้า กักเก็บพลังงาน ไปจนถึง AI Energy Management
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SOLUTION SECTIONS ===== */}
      {solutions.map((sol, idx) => (
        <section
          key={sol.id}
          id={sol.id}
          className={`py-16 lg:py-20 ${idx % 2 === 0 ? "bg-background" : "section-alt"} ${sol.featured ? "border-t-2 border-accent-primary/30" : ""}`}
        >
          <div className="container">
            {/* Featured badge */}
            {sol.featured && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-accent-primary bg-accent-glow border border-border-accent rounded-full">
                  <Zap className="w-3 h-3" /> {sol.tagline}
                </span>
              </motion.div>
            )}

            <div className={`grid ${sol.image ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_400px]"} gap-10 lg:gap-14 items-start`}>
              {/* Left: Content */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-lg ${sol.featured ? "bg-accent-primary/20" : "bg-accent-glow"} flex items-center justify-center`}>
                    <sol.icon className={`w-5 h-5 ${sol.featured ? "text-accent-primary" : "text-accent-primary"}`} />
                  </div>
                  <h2 className={`font-display ${sol.featured ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"} font-bold text-foreground`}>
                    {sol.title}
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-xs font-medium text-accent-secondary uppercase tracking-wider mb-1.5">ปัญหาที่ลูกค้าเจอ</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{sol.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-accent-primary uppercase tracking-wider mb-1.5">วิธีแก้ของ SIRINX</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{sol.solution}</p>
                  </div>
                </div>

                {/* Benefits inline */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {sol.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-xs text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-0.5" />
                      {b}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {sol.link ? (
                    <Link href={sol.link} className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold btn-accent rounded-lg text-sm">
                      ดูรายละเอียด {sol.title} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold btn-accent rounded-lg text-sm">
                      ขอคำปรึกษา {sol.title} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>

              {/* Right: Image or Suitable list */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                {sol.image && (
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="rounded-xl w-full aspect-[16/10] object-cover mb-5"
                  />
                )}
                <div className="p-5 rounded-xl border border-border-subtle bg-surface-elevated">
                  <h3 className="font-display font-semibold text-foreground text-sm mb-3">เหมาะกับใคร</h3>
                  <ul className="space-y-2">
                    {sol.suitable.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 lg:py-24 section-alt relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">ไม่แน่ใจว่าโซลูชันไหนเหมาะ?</h2>
            <p className="text-text-secondary text-sm mb-7 max-w-lg mx-auto">
              ทีมวิศวกรของเราพร้อมช่วยวิเคราะห์ความต้องการและแนะนำโซลูชันที่เหมาะสมที่สุดสำหรับธุรกิจของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent rounded-lg">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่าเบื้องต้น
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
