import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Factory, Wheat, Hotel, GraduationCap, Building2, Landmark, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/hero-industries-bBuKhDYLTbHYwqCxiKqhbj.webp";

const industries = [
  {
    id: "manufacturing", icon: Factory, title: "โรงงานอุตสาหกรรม",
    challenge: "ค่าไฟฟ้าคิดเป็น 15-30% ของต้นทุนการผลิต การแข่งขันด้านราคาทำให้ต้องลดต้นทุนทุกทาง",
    useCases: [
      "Rooftop Solar บนหลังคาโรงงาน ลดค่าไฟช่วงกลางวัน 30-70%",
      "BESS สำหรับ peak shaving ลดค่า demand charge",
      "AI Energy Management ปรับการใช้พลังงานตามกำลังการผลิต",
      "Predictive O&M ลดเวลาหยุดเครื่องจักร",
    ],
    outcome: "ลดต้นทุนพลังงาน 30-50% คืนทุน 3-5 ปี",
  },
  {
    id: "agriculture", icon: Wheat, title: "เกษตรกรรม",
    challenge: "พื้นที่เกษตรกรรมมีแหล่งน้ำจำนวนมากที่ยังไม่ได้ใช้ประโยชน์เต็มที่ ค่าสูบน้ำและค่าไฟฟ้าสูง",
    useCases: [
      "Floating Solar บนอ่างเก็บน้ำ ผลิตไฟฟ้า + ลดการระเหย",
      "Solar Pump สำหรับระบบชลประทาน",
      "AI ควบคุมระบบน้ำอัตโนมัติ",
      "ระบบพลังงานสำหรับ Cold Storage",
    ],
    outcome: "ลดค่าพลังงาน 40-60% ลดการระเหยน้ำ 30%",
  },
  {
    id: "hospitality", icon: Hotel, title: "โรงแรมและรีสอร์ท",
    challenge: "ค่าไฟฟ้าสูงจากระบบ HVAC ที่ทำงานตลอด 24 ชม. ลูกค้ายุคใหม่ต้องการ Green Hotel",
    useCases: [
      "Rooftop Solar + Solar Carport สำหรับที่จอดรถ",
      "BESS สำรองไฟฟ้าสำหรับ critical systems",
      "AI ปรับ HVAC ตามจำนวนผู้เข้าพัก",
      "EV Charging Station สำหรับแขกผู้เข้าพัก",
    ],
    outcome: "ลดค่าพลังงาน 25-40% เสริมภาพลักษณ์ Green Hotel",
  },
  {
    id: "education", icon: GraduationCap, title: "สถานศึกษา",
    challenge: "งบประมาณค่าไฟฟ้าสูง อาคารเรียนใช้ไฟมากในช่วงกลางวัน ต้องการเป็น Living Lab ด้านพลังงาน",
    useCases: [
      "Rooftop Solar บนอาคารเรียนและหอพัก",
      "Solar Carport สำหรับลานจอดรถ",
      "Energy Dashboard สำหรับการเรียนรู้",
      "ระบบ monitoring เชื่อมต่อหลักสูตร STEM",
    ],
    outcome: "ลดงบค่าไฟ 30-50% สร้าง Living Lab ด้านพลังงาน",
  },
  {
    id: "commercial", icon: Building2, title: "อาคารพาณิชย์",
    challenge: "ค่าส่วนกลางสูง ต้องการเพิ่มมูลค่าอาคาร ตอบโจทย์ ESG และ Green Building Certification",
    useCases: [
      "Rooftop Solar ลดค่าส่วนกลาง",
      "Solar Carport + EV Charging สำหรับผู้เช่า",
      "AI Energy Management สำหรับ BMS",
      "ESG Reporting อัตโนมัติ",
    ],
    outcome: "ลดค่าส่วนกลาง 20-35% เพิ่มมูลค่าอาคาร",
  },
  {
    id: "government", icon: Landmark, title: "ภาครัฐ",
    challenge: "งบประมาณค่าพลังงานจำกัด ต้องสนับสนุนเป้าหมาย Carbon Neutrality ของประเทศ",
    useCases: [
      "Rooftop Solar สำหรับอาคารราชการ",
      "Floating Solar บนอ่างเก็บน้ำชลประทาน",
      "ระบบ monitoring รายงานผลต่อหน่วยงานกำกับ",
      "PPA Model ไม่ต้องใช้งบลงทุนตั้งแต่วันแรก",
    ],
    outcome: "ลดงบค่าพลังงาน 30-50% สนับสนุน Carbon Neutrality",
  },
];

export default function Industries() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="SIRINX Industries" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>
        <div className="container relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Industries</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              โซลูชันเฉพาะทาง<br /><span className="text-gradient-accent">สำหรับทุกอุตสาหกรรม</span>
            </h1>
            <p className="text-lg text-text-secondary">
              เราเข้าใจความท้าทายเฉพาะของแต่ละอุตสาหกรรม และออกแบบระบบพลังงานที่ตอบโจทย์ธุรกิจจริง
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries */}
      {industries.map((ind, idx) => (
        <section key={ind.id} id={ind.id} className={`py-20 lg:py-24 ${idx % 2 === 0 ? "bg-background" : "section-alt"}`}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="grid lg:grid-cols-5 gap-10">
                {/* Left: Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center">
                      <ind.icon className="w-5 h-5 text-accent-primary" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{ind.title}</h2>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-accent-secondary uppercase tracking-wider mb-2">ความท้าทาย</h3>
                    <p className="text-text-secondary leading-relaxed">{ind.challenge}</p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-accent-primary uppercase tracking-wider mb-3">Use Cases</h3>
                    <ul className="space-y-2.5">
                      {ind.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Right: Outcome card */}
                <div className="lg:col-span-2 flex items-start">
                  <div className="w-full p-6 rounded-xl glass-card">
                    <h3 className="font-display font-semibold text-foreground mb-3">ผลลัพธ์ที่คาดหวัง</h3>
                    <p className="text-lg font-medium text-gradient-accent">{ind.outcome}</p>
                    <div className="mt-6">
                      <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
                        ขอคำปรึกษาเฉพาะทาง <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">ไม่เห็นอุตสาหกรรมของคุณ?</h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              เราพร้อมออกแบบโซลูชันเฉพาะสำหรับทุกประเภทธุรกิจ ติดต่อเราเพื่อพูดคุยเกี่ยวกับความต้องการเฉพาะของคุณ
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
              ติดต่อทีมวิศวกร <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
