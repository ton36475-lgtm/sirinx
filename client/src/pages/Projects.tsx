/**
 * SIRINX Projects / Case Studies Page
 * Dual-theme: semantic CSS vars
 * Features: Real site photos, photo gallery, filter by type, detailed case studies
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Zap, Calendar, TrendingUp, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";

const projects = [
  {
    title: "Solar Farm Node 1 — โรงแรมเรือนแพ รอยัลปาร์ค",
    location: "พิษณุโลก",
    type: "Rooftop Solar",
    capacity: "Solar Farm",
    saving: "ลดค่าพลังงาน 30-50%",
    year: "2024",
    desc: "Solar Farm สำหรับโรงแรมเรือนแพ รอยัลปาร์ค พิษณุโลก ติดตั้งและเปิดใช้งานแล้ว ลดค่าพลังงานให้โรงแรมอย่างมีประสิทธิภาพ เจ้าของ: คุณ Pitoon Yingyosruangrong",
    image: `${CDN}/received_921587477351636_bde97caf.jpeg`,
    tag: "rooftop",
  },
  {
    title: "Solar Farm Node 2 — โรงแรมโฮลาเทลริมน่าน",
    location: "น่าน",
    type: "Rooftop Solar",
    capacity: "Solar Farm",
    saving: "กำลังก่อสร้าง",
    year: "2025",
    desc: "Solar Farm Node 2 ที่โรงแรมโฮลาเทลริมน่าน กำลังดำเนินการก่อสร้าง พร้อมปรับปรุงโรงแรมใหม่และเปิดให้บริการเร็วๆ นี้ เจ้าของ: คุณ Pitoon Yingyosruangrong",
    image: `${CDN}/received_803461432358813_ea7aeaa1.jpeg`,
    tag: "rooftop",
  },
  {
    title: "อ่างเก็บน้ำเพื่อการเกษตร",
    location: "นครราชสีมา",
    type: "Floating Solar",
    capacity: "2.5 MW",
    saving: "ลดการระเหยน้ำ 35%",
    year: "2024",
    desc: "ระบบ Floating Solar บนอ่างเก็บน้ำ ผลิตไฟฟ้าสำหรับระบบสูบน้ำและ Cold Storage พร้อมลดการระเหยของน้ำ",
    image: `${CDN}/received_4197992190511860_34fd339e.jpeg`,
    tag: "floating",
  },
  {
    title: "ห้างสรรพสินค้าขนาดใหญ่",
    location: "กรุงเทพฯ",
    type: "Rooftop + Carport",
    capacity: "800 kW",
    saving: "ลดค่าไฟ 38%",
    year: "2023",
    desc: "ติดตั้ง Rooftop Solar บนหลังคาห้าง + Solar Carport ที่ลานจอดรถ รองรับ EV Charging 10 จุด",
    image: `${CDN}/received_4197992190511860_34fd339e.jpeg`,
    tag: "carport",
  },
  {
    title: "รีสอร์ทติดทะเล",
    location: "ภูเก็ต",
    type: "Rooftop + BESS",
    capacity: "500 kW",
    saving: "ลดค่าพลังงาน 42%",
    year: "2023",
    desc: "ระบบ Rooftop Solar + BESS สำหรับรีสอร์ท ช่วยลดค่าไฟและสำรองไฟฟ้าสำหรับ critical systems",
    image: `${CDN}/received_1611595770045379_f7011547.jpeg`,
    tag: "bess",
  },
  {
    title: "มหาวิทยาลัยเทคโนโลยี",
    location: "เชียงใหม่",
    type: "Rooftop + AI Energy",
    capacity: "1.5 MW",
    saving: "ลดงบค่าไฟ 50%",
    year: "2024",
    desc: "ติดตั้ง Rooftop Solar บนอาคารเรียน 8 หลัง พร้อม Energy Dashboard สำหรับการเรียนรู้ของนักศึกษา",
    image: `${CDN}/received_1425755759570180_43093913.jpeg`,
    tag: "rooftop",
  },
  {
    title: "คลังสินค้าและศูนย์กระจายสินค้า",
    location: "สมุทรปราการ",
    type: "Rooftop Solar",
    capacity: "3 MW",
    saving: "ลดค่าไฟ 55%",
    year: "2025",
    desc: "โครงการ Rooftop Solar ขนาดใหญ่บนหลังคาคลังสินค้า 5 อาคาร พร้อมระบบ AI O&M",
    image: `${CDN}/received_934911282677303_24e134a8.jpeg`,
    tag: "rooftop",
  },
  {
    title: "ฟาร์มเกษตรอัจฉริยะ",
    location: "นครปฐม",
    type: "Solar + BESS",
    capacity: "350 kW",
    saving: "ลดค่าไฟ 60%",
    year: "2024",
    desc: "ระบบ Solar + BESS สำหรับฟาร์มเกษตรอัจฉริยะ จ่ายไฟให้ระบบ IoT, สูบน้ำ และห้องเย็นตลอด 24 ชม.",
    image: `${CDN}/received_806743748663527_0517d115.jpeg`,
    tag: "bess",
  },
  {
    title: "โรงงานอาหารแปรรูป",
    location: "ราชบุรี",
    type: "Rooftop Solar",
    capacity: "2 MW",
    saving: "ลดค่าไฟ 48%",
    year: "2025",
    desc: "ติดตั้ง Rooftop Solar บนหลังคาโรงงานอาหาร พร้อมระบบ monitoring แบบ real-time",
    image: `${CDN}/received_1355000406660682_193503d7.jpeg`,
    tag: "rooftop",
  },
];

const filterOptions = [
  { value: "all", label: "ทั้งหมด" },
  { value: "rooftop", label: "Rooftop Solar" },
  { value: "floating", label: "Floating Solar" },
  { value: "carport", label: "Solar Carport" },
  { value: "bess", label: "BESS / ESS" },
];

// Gallery photos (all 22 site photos)
const galleryPhotos = [
  `${CDN}/received_921587477351636_bde97caf.jpeg`,
  `${CDN}/received_803461432358813_ea7aeaa1.jpeg`,
  `${CDN}/received_4197992190511860_34fd339e.jpeg`,
  `${CDN}/received_1611595770045379_f7011547.jpeg`,
  `${CDN}/received_1425755759570180_43093913.jpeg`,
  `${CDN}/received_806743748663527_0517d115.jpeg`,
  `${CDN}/received_1355000406660682_193503d7.jpeg`,
  `${CDN}/received_921422724005854_9d4e7b3b.jpeg`,
  `${CDN}/received_934911282677303_24e134a8.jpeg`,
  `${CDN}/received_931207172874507_436de73d.jpeg`,
  `${CDN}/received_1641807426854946_4e56755a.jpeg`,
  `${CDN}/received_784072577836007_418cce3b.jpeg`,
  `${CDN}/received_1481648243610328_322b79d6.jpeg`,
  `${CDN}/received_1519762966471997_70b65200.jpeg`,
  `${CDN}/received_889284824092808_d3222487.jpeg`,
  `${CDN}/received_776657728601523_2c7a5eab.jpeg`,
  `${CDN}/received_1517672956530675_9eca2da0.jpeg`,
  `${CDN}/received_1755992235392100_6ee72ec7.jpeg`,
  `${CDN}/received_1274929817944565_5cb14480.jpeg`,
  `${CDN}/received_1472436094271800_f72cd94a.jpeg`,
  `${CDN}/received_1308771534448072_f086825c.jpeg`,
  `${CDN}/received_965021249379636_0a8114d3.jpeg`,
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.tag === filter);

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
              { value: "2", label: "Solar Farm Node" },
              { value: "6+", label: "ประเภทโซลูชัน" },
              { value: "24/7", label: "AI Monitoring" },
              { value: "25+ ปี", label: "อายุการใช้งาน" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="font-display text-2xl lg:text-3xl font-bold text-gradient-accent">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Projects Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <Filter className="w-4 h-4 text-text-muted mt-2" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  filter === opt.value
                    ? "border-accent-primary bg-accent-glow text-accent-primary font-medium"
                    : "border-border-subtle text-text-muted hover:text-foreground hover:border-border-accent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className="group rounded-xl border border-border-subtle bg-surface-elevated overflow-hidden hover:border-border-accent transition-colors"
                >
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
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-10">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Gallery</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">ภาพหน้างานจริง</h2>
            <p className="text-text-muted mt-2">คลิกที่ภาพเพื่อดูขนาดเต็ม</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {galleryPhotos.map((src, i) => (
              <motion.button
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 5}
                onClick={() => setLightboxIdx(i)}
                className="aspect-square rounded-lg overflow-hidden border border-border-subtle hover:border-border-accent transition-all hover:scale-[1.02]"
              >
                <img src={src} alt={`SIRINX project photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 text-white/80 hover:text-white z-10">
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + galleryPhotos.length) % galleryPhotos.length); }}
              className="absolute left-4 text-white/80 hover:text-white z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % galleryPhotos.length); }}
              className="absolute right-4 text-white/80 hover:text-white z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryPhotos[lightboxIdx]}
              alt={`SIRINX project photo ${lightboxIdx + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightboxIdx + 1} / {galleryPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">ต้องการผลลัพธ์แบบนี้สำหรับธุรกิจคุณ?</h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              พูดคุยกับทีมวิศวกรของเราเพื่อออกแบบโซลูชันเฉพาะสำหรับธุรกิจของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่า
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
