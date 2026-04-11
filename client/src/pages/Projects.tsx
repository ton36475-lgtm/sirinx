import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Zap, Calendar, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const projects = [
  {
    title: "โรงงานผลิตชิ้นส่วนยานยนต์",
    location: "ชลบุรี",
    type: "Rooftop Solar",
    capacity: "1.2 MW",
    saving: "ลดค่าไฟ 45%",
    year: "2024",
    desc: "ติดตั้ง Rooftop Solar บนหลังคาโรงงาน 3 อาคาร พร้อมระบบ AI Monitoring ช่วยลดค่าไฟฟ้าช่วงกลางวันได้อย่างมีนัยสำคัญ",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
  },
  {
    title: "อ่างเก็บน้ำเพื่อการเกษตร",
    location: "นครราชสีมา",
    type: "Floating Solar",
    capacity: "2.5 MW",
    saving: "ลดการระเหยน้ำ 35%",
    year: "2024",
    desc: "ระบบ Floating Solar บนอ่างเก็บน้ำ ผลิตไฟฟ้าสำหรับระบบสูบน้ำและ Cold Storage พร้อมลดการระเหยของน้ำ",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop",
  },
  {
    title: "ห้างสรรพสินค้าขนาดใหญ่",
    location: "กรุงเทพฯ",
    type: "Rooftop + Carport",
    capacity: "800 kW",
    saving: "ลดค่าไฟ 38%",
    year: "2023",
    desc: "ติดตั้ง Rooftop Solar บนหลังคาห้าง + Solar Carport ที่ลานจอดรถ รองรับ EV Charging 10 จุด",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=400&fit=crop",
  },
  {
    title: "รีสอร์ทติดทะเล",
    location: "ภูเก็ต",
    type: "Rooftop + BESS",
    capacity: "500 kW",
    saving: "ลดค่าพลังงาน 42%",
    year: "2023",
    desc: "ระบบ Rooftop Solar + BESS สำหรับรีสอร์ท ช่วยลดค่าไฟและสำรองไฟฟ้าสำหรับ critical systems",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop",
  },
  {
    title: "มหาวิทยาลัยเทคโนโลยี",
    location: "เชียงใหม่",
    type: "Rooftop + AI Energy",
    capacity: "1.5 MW",
    saving: "ลดงบค่าไฟ 50%",
    year: "2024",
    desc: "ติดตั้ง Rooftop Solar บนอาคารเรียน 8 หลัง พร้อม Energy Dashboard สำหรับการเรียนรู้ของนักศึกษา",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
  },
  {
    title: "คลังสินค้าและศูนย์กระจายสินค้า",
    location: "สมุทรปราการ",
    type: "Rooftop Solar",
    capacity: "3 MW",
    saving: "ลดค่าไฟ 55%",
    year: "2025",
    desc: "โครงการ Rooftop Solar ขนาดใหญ่บนหลังคาคลังสินค้า 5 อาคาร พร้อมระบบ AI O&M",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
];

export default function Projects() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Projects</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              ผลงาน<span className="text-gradient-accent">ที่พิสูจน์ได้</span>
            </h1>
            <p className="text-lg text-text-secondary">
              ตัวอย่างโครงการที่ SIRINX ออกแบบ ติดตั้ง และดูแลรักษา พร้อมผลลัพธ์ทางธุรกิจที่วัดได้จริง
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-12 section-alt border-y border-border-subtle">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "150+", label: "โครงการ" },
              { value: "50 MW+", label: "กำลังผลิตรวม" },
              { value: "6", label: "ประเภทโซลูชัน" },
              { value: "30+", label: "จังหวัดทั่วไทย" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="font-display text-2xl lg:text-3xl font-bold text-gradient-accent">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group rounded-xl border border-border-subtle bg-surface-elevated overflow-hidden hover:border-border-accent transition-colors">
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-medium bg-accent-primary text-text-inverse rounded-md">{project.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-accent-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-text-muted mb-3 leading-relaxed">{project.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-text-muted">
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</div>
                    <div className="flex items-center gap-1"><Zap className="w-3 h-3" /> {project.capacity}</div>
                    <div className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {project.saving}</div>
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.year}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-xs text-text-muted text-center">* placeholder — ต้องแทนที่ด้วยข้อมูลโครงการจริง</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 section-alt relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">ต้องการผลลัพธ์แบบนี้สำหรับธุรกิจคุณ?</h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              พูดคุยกับทีมวิศวกรของเราเพื่อออกแบบโซลูชันเฉพาะสำหรับธุรกิจของคุณ
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
              นัดสำรวจหน้างานฟรี <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
