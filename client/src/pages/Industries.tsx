/**
 * SIRINX Industries — Second Pass Refinement
 * Solar Carport callout per industry, tighter layout, mid-page CTA
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Factory, Wheat, Hotel, GraduationCap, Building2, Landmark,
  CheckCircle2, Car
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";
const HERO = `${CDN}/sirinx-agrivoltaic-b6XSpaadLj5vpaTu52tenb.webp`;

const industries = [
  {
    id: "manufacturing", icon: Factory, title: "โรงงานอุตสาหกรรม",
    challenge: "ค่าไฟฟ้าคิดเป็น 15-30% ของต้นทุนการผลิต การแข่งขันด้านราคาทำให้ต้องลดต้นทุนทุกทาง",
    useCases: [
      "Rooftop Solar บนหลังคาโรงงาน ลดค่าไฟช่วงกลางวัน",
      "Solar Carport สำหรับลานจอดรถพนักงาน 100+ คัน",
      "BESS สำหรับ peak shaving ลดค่า demand charge",
      "AI Energy Management ปรับการใช้พลังงานตามกำลังการผลิต",
    ],
    outcome: "ลดต้นทุนพลังงาน 30-50%",
    carportNote: "ลานจอดรถพนักงานขนาดใหญ่ = โอกาสผลิตไฟฟ้าที่ยังไม่ได้ใช้",
  },
  {
    id: "agriculture", icon: Wheat, title: "เกษตรกรรม",
    challenge: "พื้นที่เกษตรกรรมมีแหล่งน้ำจำนวนมากที่ยังไม่ได้ใช้ประโยชน์เต็มที่ ค่าสูบน้ำและค่าไฟฟ้าสูง",
    useCases: [
      "Floating Solar บนอ่างเก็บน้ำ ผลิตไฟฟ้า + ลดการระเหย",
      "Solar Pump สำหรับระบบชลประทาน",
      "ระบบพลังงานสำหรับ Cold Storage",
      "AI ควบคุมระบบน้ำอัตโนมัติ",
    ],
    outcome: "ลดค่าพลังงาน 40-60%",
    carportNote: null,
  },
  {
    id: "hospitality", icon: Hotel, title: "โรงแรมและรีสอร์ท",
    challenge: "ค่าไฟฟ้าสูงจากระบบ HVAC ที่ทำงานตลอด 24 ชม. ลูกค้ายุคใหม่ต้องการ Green Hotel",
    useCases: [
      "Solar Carport + EV Charging สำหรับแขกผู้เข้าพัก",
      "Rooftop Solar ลดค่าไฟช่วงกลางวัน",
      "BESS สำรองไฟฟ้าสำหรับ critical systems",
      "AI ปรับ HVAC ตามจำนวนผู้เข้าพัก",
    ],
    outcome: "ลดค่าพลังงาน 25-40%",
    carportNote: "Solar Carport + EV Charger = จุดขาย Green Hotel ที่ดึงดูดนักท่องเที่ยว",
  },
  {
    id: "education", icon: GraduationCap, title: "สถานศึกษา",
    challenge: "งบประมาณค่าไฟฟ้าสูง อาคารเรียนใช้ไฟมากในช่วงกลางวัน ต้องการเป็น Living Lab ด้านพลังงาน",
    useCases: [
      "Solar Carport สำหรับลานจอดรถอาจารย์/นักศึกษา",
      "Rooftop Solar บนอาคารเรียนและหอพัก",
      "Energy Dashboard สำหรับการเรียนรู้",
      "ระบบ monitoring เชื่อมต่อหลักสูตร STEM",
    ],
    outcome: "ลดงบค่าไฟ 30-50%",
    carportNote: "ลานจอดรถมหาวิทยาลัย = พื้นที่ผลิตไฟฟ้าขนาดใหญ่ + Living Lab",
  },
  {
    id: "commercial", icon: Building2, title: "อาคารพาณิชย์",
    challenge: "ค่าส่วนกลางสูง ต้องการเพิ่มมูลค่าอาคาร ตอบโจทย์ ESG และ Green Building Certification",
    useCases: [
      "Solar Carport + EV Charging สำหรับผู้เช่า/ลูกค้า",
      "Rooftop Solar ลดค่าส่วนกลาง",
      "AI Energy Management สำหรับ BMS",
      "ESG Reporting อัตโนมัติ",
    ],
    outcome: "ลดค่าส่วนกลาง 20-35%",
    carportNote: "Solar Carport เพิ่มมูลค่าอาคาร + ดึงดูดผู้เช่าที่ใส่ใจ ESG",
  },
  {
    id: "government", icon: Landmark, title: "ภาครัฐ",
    challenge: "งบประมาณค่าพลังงานจำกัด ต้องสนับสนุนเป้าหมาย Carbon Neutrality ของประเทศ",
    useCases: [
      "Solar Carport สำหรับลานจอดรถหน่วยงาน",
      "Rooftop Solar สำหรับอาคารราชการ",
      "Floating Solar บนอ่างเก็บน้ำชลประทาน",
      "PPA Model ไม่ต้องใช้งบลงทุนตั้งแต่วันแรก",
    ],
    outcome: "ลดงบค่าพลังงาน 30-50%",
    carportNote: "ลานจอดรถราชการ = โอกาสผลิตไฟฟ้าโดยไม่ต้องใช้งบลงทุน (PPA)",
  },
];

export default function Industries() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="SIRINX Industries" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>
        <div className="container relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Industries</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
              โซลูชันเฉพาะทาง<br /><span className="text-gradient-accent">สำหรับทุกอุตสาหกรรม</span>
            </h1>
            <p className="text-text-secondary">
              เราเข้าใจความท้าทายเฉพาะของแต่ละอุตสาหกรรม และออกแบบระบบพลังงานที่ตอบโจทย์ธุรกิจจริง
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== INDUSTRY SECTIONS ===== */}
      {industries.map((ind, idx) => (
        <section key={ind.id} id={ind.id} className={`py-14 lg:py-20 ${idx % 2 === 0 ? "bg-background" : "section-alt"}`}>
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Left: Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-accent-glow flex items-center justify-center">
                      <ind.icon className="w-5 h-5 text-accent-primary" />
                    </div>
                    <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground">{ind.title}</h2>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-xs font-medium text-accent-secondary uppercase tracking-wider mb-1.5">ความท้าทาย</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{ind.challenge}</p>
                  </div>
                  <div className="mb-5">
                    <h3 className="text-xs font-medium text-accent-primary uppercase tracking-wider mb-2">Use Cases</h3>
                    <ul className="space-y-2">
                      {ind.useCases.map((uc) => (
                        <li key={uc} className="flex items-start gap-2 text-xs text-text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-primary shrink-0 mt-0.5" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Solar Carport callout */}
                  {ind.carportNote && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-glow border border-border-accent">
                      <Car className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-medium text-accent-primary">Solar Carport:</span>
                        <span className="text-xs text-text-secondary ml-1">{ind.carportNote}</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Right: Outcome card */}
                <div className="lg:col-span-2 flex items-start">
                  <div className="w-full p-5 rounded-xl glass-card">
                    <h3 className="font-display font-semibold text-foreground text-sm mb-2">ผลลัพธ์ที่คาดหวัง</h3>
                    <p className="text-base font-medium text-gradient-accent mb-4">{ind.outcome}</p>
                    <div className="space-y-2">
                      <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-medium text-accent-primary hover:underline">
                        ขอคำปรึกษาเฉพาะทาง <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <br />
                      <Link href="/solar-carport" className="inline-flex items-center gap-2 text-xs font-medium text-text-muted hover:text-accent-primary">
                        <Car className="w-3.5 h-3.5" /> ดู Solar Carport
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ===== MID-PAGE CTA ===== */}
      <section className="py-10 bg-background">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={0}
            className="glass-card rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-5"
          >
            <div className="flex-1">
              <h3 className="font-display text-base lg:text-lg font-bold text-foreground mb-1">
                Solar Carport เหมาะกับทุกอุตสาหกรรม
              </h3>
              <p className="text-text-secondary text-xs">
                ไม่ว่าธุรกิจไหน ถ้ามีลานจอดรถ ก็เปลี่ยนเป็นโรงไฟฟ้าได้
              </p>
            </div>
            <Link href="/solar-carport" className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold btn-accent rounded-lg text-sm whitespace-nowrap shrink-0">
              <Car className="w-4 h-4" /> ดู Solar Carport <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 lg:py-24 section-alt relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">ไม่เห็นอุตสาหกรรมของคุณ?</h2>
            <p className="text-text-secondary text-sm mb-7 max-w-lg mx-auto">
              เราพร้อมออกแบบโซลูชันเฉพาะสำหรับทุกประเภทธุรกิจ ติดต่อเราเพื่อพูดคุยเกี่ยวกับความต้องการเฉพาะของคุณ
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent rounded-lg">
              ติดต่อทีมวิศวกร <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
