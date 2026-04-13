/**
 * SIRINX Projects / Portfolio — Second Pass Refinement
 * Premium proof-first storytelling: featured hero project, clean cards, curated gallery
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { trackSolutionVisit } from "@/components/HeroSlideshow";
import {
  ArrowRight, MapPin, Zap, Calendar, TrendingUp, Filter,
  X, ChevronLeft, ChevronRight, CheckCircle2, Car
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";

/* ── Featured project (hero) ── */
const featured = {
  title: "Solar Carport — โรงแรมเรือนแพ รอยัลปาร์ค",
  location: "พิษณุโลก",
  type: "Solar Carport + BESS",
  capacity: "Solar Carport",
  saving: "ลดค่าพลังงาน 30-100%",
  year: "2024",
  owner: "คุณ Pitoon Yingyosruangrong",
  desc: "Solar Carport ติดตั้งจริงที่โรงแรมเรือนแพ รอยัลปาร์ค พิษณุโลก พร้อมระบบ BESS กักเก็บพลังงาน โครงสร้างเหล็กมาตรฐานวิศวกรรม Cable Tray และระบบไฟฟ้าครบวงจร พร้อม AI Monitoring 24/7",
  image: `${CDN}/carport-wide-1_30e3af4c.jpeg`,
  highlights: ["ลดค่าพลังงาน 30-100%", "BESS กักเก็บพลังงาน", "AI Monitoring 24/7", "ติดตั้งเสร็จ 2024"],
};

/* ── Other projects ── */
const projects = [
  {
    title: "Solar Farm Node 2 — โรงแรมโฮลาเทลริมน่าน",
    location: "น่าน",
    type: "Rooftop Solar",
    capacity: "Solar Farm",
    saving: "กำลังก่อสร้าง",
    year: "2025",
    desc: "Solar Farm Node 2 ที่โรงแรมโฮลาเทลริมน่าน กำลังดำเนินการก่อสร้าง พร้อมปรับปรุงโรงแรมใหม่",
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
    desc: "Floating Solar บนอ่างเก็บน้ำ ผลิตไฟฟ้าสำหรับระบบสูบน้ำและ Cold Storage",
    image: `${CDN}/received_4197992190511860_34fd339e.jpeg`,
    tag: "floating",
  },
  {
    title: "Solar Carport — โรงแรมเรือนแพ รอยัลปาร์ค",
    location: "พิษณุโลก",
    type: "Solar Carport + BESS",
    capacity: "Solar Carport",
    saving: "ลดค่าไฟ 30-100%",
    year: "2024",
    desc: "Solar Carport ติดตั้งจริงที่โรงแรมเรือนแพ รอยัลปาร์ค พร้อมระบบ BESS กักเก็บพลังงาน และ Cable Tray มาตรฐานวิศวกรรม",
    image: `${CDN}/carport-structure-2_f0ab2f56.jpeg`,
    tag: "carport",
  },
  {
    title: "รีสอร์ทติดทะเล",
    location: "ภูเก็ต",
    type: "Rooftop + BESS",
    capacity: "500 kW",
    saving: "ลดค่าพลังงาน 42%",
    year: "2023",
    desc: "Rooftop Solar + BESS สำหรับรีสอร์ท สำรองไฟฟ้าสำหรับ critical systems",
    image: `${CDN}/received_1611595770045379_f7011547.jpeg`,
    tag: "bess",
  },
  {
    title: "คลังสินค้าและศูนย์กระจายสินค้า",
    location: "สมุทรปราการ",
    type: "Rooftop Solar",
    capacity: "3 MW",
    saving: "ลดค่าไฟ 55%",
    year: "2025",
    desc: "Rooftop Solar ขนาดใหญ่บนหลังคาคลังสินค้า 5 อาคาร พร้อม AI O&M",
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
    desc: "Solar + BESS สำหรับฟาร์ม จ่ายไฟให้ IoT, สูบน้ำ และห้องเย็นตลอด 24 ชม.",
    image: `${CDN}/received_806743748663527_0517d115.jpeg`,
    tag: "bess",
  },
];

const filterOptions = [
  { value: "all", label: "ทั้งหมด" },
  { value: "rooftop", label: "Rooftop Solar" },
  { value: "floating", label: "Floating Solar" },
  { value: "carport", label: "Solar Carport" },
  { value: "bess", label: "BESS / ESS" },
];

/* ── Curated gallery — real Solar Carport photos from Royal Park + marketing materials ── */
const galleryPhotos = [
  // Real installation photos — Solar Carport at Royal Park
  `${CDN}/carport-wide-1_30e3af4c.jpeg`,
  `${CDN}/carport-structure-1_c0c17293.jpeg`,
  `${CDN}/carport-structure-2_f0ab2f56.jpeg`,
  `${CDN}/carport-underside-1_51e3d09a.jpeg`,
  `${CDN}/carport-underside-2_e70e97e1.jpeg`,
  `${CDN}/carport-pillar-1_b7680b5f.jpeg`,
  `${CDN}/bess-cabinet-1_f027743f.jpeg`,
  `${CDN}/bess-cabinet-2_54c824b8.jpeg`,
  `${CDN}/install-team-1_91970553.jpeg`,
  `${CDN}/install-team-2_23aa9cdf.jpeg`,
  `${CDN}/carport-detail-1_34c7c42f.jpeg`,
  `${CDN}/cable-tray-detail_1ddf9610.jpeg`,
  `${CDN}/carport-structure-3_dc2bbd1c.jpeg`,
  `${CDN}/carport-structure-4_cc6ef3f6.jpeg`,
  `${CDN}/carport-underside-3_b58d5713.jpeg`,
  `${CDN}/carport-underside-4_297c327b.jpeg`,
  // Marketing materials
  `${CDN}/received_921587477351636_bde97caf.jpeg`,
  `${CDN}/received_803461432358813_ea7aeaa1.jpeg`,
  `${CDN}/received_1611595770045379_f7011547.jpeg`,
  `${CDN}/received_806743748663527_0517d115.jpeg`,
];

export default function Projects() {
  useEffect(() => { trackSolutionVisit("solar-carport"); }, []);
  const [filter, setFilter] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <div>
      {/* ===== FEATURED PROJECT HERO ===== */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="mb-10">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Portfolio</span>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-3">
              ผลงาน<span className="text-gradient-accent">ที่พิสูจน์ได้</span>
            </h1>
            <p className="text-text-secondary max-w-xl">
              โครงการจริงที่ SIRINX ออกแบบ ติดตั้ง และดูแลรักษา — พร้อมผลลัพธ์ทางธุรกิจที่วัดได้
            </p>
          </motion.div>

          {/* Featured Card */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="rounded-2xl border border-border-accent overflow-hidden bg-surface-elevated"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-xs font-bold bg-accent-primary text-text-inverse rounded-lg">
                    Featured Project
                  </span>
                </div>
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                  <MapPin className="w-3 h-3" /> {featured.location}
                  <span className="mx-1">·</span>
                  <Calendar className="w-3 h-3" /> {featured.year}
                </div>
                <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                  {featured.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {featured.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {featured.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-accent-primary bg-accent-glow rounded-full border border-border-accent">
                      <CheckCircle2 className="w-3 h-3" /> {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="font-medium text-foreground">{featured.type}</span>
                  <span>·</span>
                  <span>{featured.capacity}</span>
                  <span>·</span>
                  <span className="text-accent-primary font-medium">{featured.saving}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="py-10 section-alt border-y border-border-subtle">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "2", label: "Solar Farm Node" },
              { value: "6+", label: "ประเภทโซลูชัน" },
              { value: "24/7", label: "AI Monitoring" },
              { value: "25+ ปี", label: "อายุการใช้งาน" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="font-display text-xl lg:text-2xl font-bold text-gradient-accent">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTER + PROJECTS GRID ===== */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Filter className="w-4 h-4 text-text-muted" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-3.5 py-1.5 text-xs rounded-lg border transition-colors ${
                  filter === opt.value
                    ? "border-accent-primary bg-accent-glow text-accent-primary font-medium"
                    : "border-border-subtle text-text-muted hover:text-foreground hover:border-border-accent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Grid — 2 columns on desktop for larger cards */}
          <div className="grid md:grid-cols-2 gap-5">
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
                  <div className="grid sm:grid-cols-[240px_1fr]">
                    <div className="relative h-48 sm:h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-accent-primary/90 text-text-inverse rounded-md">
                          {project.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col justify-center">
                      <h3 className="font-display font-semibold text-foreground text-sm mb-1.5 group-hover:text-accent-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-text-muted mb-3 leading-relaxed line-clamp-2">{project.desc}</p>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] text-text-muted">
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0" /> {project.location}</div>
                        <div className="flex items-center gap-1"><Zap className="w-3 h-3 shrink-0" /> {project.capacity}</div>
                        <div className="flex items-center gap-1"><TrendingUp className="w-3 h-3 shrink-0" /> {project.saving}</div>
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3 shrink-0" /> {project.year}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

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
                ต้องการ Solar Carport สำหรับธุรกิจของคุณ?
              </h3>
              <p className="text-text-secondary text-xs">
                ดูรายละเอียดเพิ่มเติมเกี่ยวกับ Solar Carport — โซลูชันที่ลูกค้าเลือกมากที่สุด
              </p>
            </div>
            <Link href="/solar-carport" className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold btn-accent rounded-lg text-sm whitespace-nowrap shrink-0">
              <Car className="w-4 h-4" /> ดู Solar Carport <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-8">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Gallery</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">ภาพหน้างานจริง</h2>
          </motion.div>
          {/* 3-column masonry-like grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryPhotos.map((src, i) => (
              <motion.button
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i % 4}
                onClick={() => setLightboxIdx(i)}
                className={`rounded-lg overflow-hidden border border-border-subtle hover:border-border-accent transition-all hover:scale-[1.02] ${
                  i % 3 === 0 ? "aspect-[4/3]" : "aspect-square"
                }`}
              >
                <img src={src} alt={`SIRINX project photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
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

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 lg:py-24 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-glow to-transparent" />
        <div className="container relative text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
              ต้องการผลลัพธ์แบบนี้สำหรับธุรกิจคุณ?
            </h2>
            <p className="text-text-secondary text-sm mb-7 max-w-lg mx-auto">
              นัดสำรวจหน้างานฟรี ไม่มีข้อผูกมัด — ทีมวิศวกรของเราพร้อมออกแบบโซลูชันเฉพาะสำหรับธุรกิจของคุณ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent rounded-lg">
                นัดสำรวจหน้างานฟรี <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/assessment" className="inline-flex items-center gap-2 px-6 py-3.5 font-display font-semibold btn-accent-outline rounded-lg">
                ประเมินความคุ้มค่า
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
