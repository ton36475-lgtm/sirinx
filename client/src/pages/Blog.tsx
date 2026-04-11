import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const categories = ["ทั้งหมด", "Solar Technology", "Energy Management", "Investment", "Industry Insights", "ESG & Sustainability"];

const posts = [
  {
    slug: "rooftop-solar-roi-2025",
    title: "Rooftop Solar ROI ปี 2025: คุ้มค่าแค่ไหนสำหรับโรงงานไทย?",
    excerpt: "วิเคราะห์ผลตอบแทนการลงทุน Rooftop Solar สำหรับโรงงานในประเทศไทย พร้อมปัจจัยที่ส่งผลต่อ ROI และแนวโน้มราคาแผงโซลาร์",
    category: "Investment",
    date: "10 เม.ย. 2025",
    readTime: "8 นาที",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    slug: "ai-energy-management-guide",
    title: "AI Energy Management คืออะไร? ทำไมธุรกิจยุคใหม่ต้องมี",
    excerpt: "ทำความรู้จักกับระบบบริหารจัดการพลังงานด้วย AI ที่ช่วยลดค่าไฟ เพิ่มประสิทธิภาพ และสร้างข้อมูลเชิงลึกสำหรับธุรกิจ",
    category: "Energy Management",
    date: "5 เม.ย. 2025",
    readTime: "6 นาที",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    slug: "floating-solar-thailand",
    title: "Floating Solar ในประเทศไทย: โอกาสและความท้าทาย",
    excerpt: "สำรวจศักยภาพของ Floating Solar ในประเทศไทย ตั้งแต่อ่างเก็บน้ำชลประทานไปจนถึงบ่อน้ำอุตสาหกรรม",
    category: "Solar Technology",
    date: "28 มี.ค. 2025",
    readTime: "7 นาที",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop",
  },
  {
    slug: "solar-tax-benefits-thailand",
    title: "สิทธิประโยชน์ทางภาษีจากการลงทุนโซลาร์ ปี 2025",
    excerpt: "สรุปสิทธิประโยชน์ทางภาษีที่เป็นไปได้จากการลงทุนพลังงานแสงอาทิตย์ ตั้งแต่ค่าเสื่อมราคาเร่งไปจนถึง BOI",
    category: "Investment",
    date: "20 มี.ค. 2025",
    readTime: "5 นาที",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    slug: "bess-peak-shaving",
    title: "BESS กับ Peak Shaving: ลดค่า Demand Charge อย่างไร",
    excerpt: "เข้าใจหลักการ Peak Shaving ด้วย Battery Energy Storage System และวิธีคำนวณความคุ้มค่าสำหรับโรงงาน",
    category: "Solar Technology",
    date: "15 มี.ค. 2025",
    readTime: "6 นาที",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
  },
  {
    slug: "esg-solar-reporting",
    title: "ESG Reporting กับพลังงานโซลาร์: สิ่งที่ธุรกิจต้องรู้",
    excerpt: "แนวทางการรายงาน ESG สำหรับธุรกิจที่ใช้พลังงานโซลาร์ ตั้งแต่การคำนวณ Carbon Footprint ไปจนถึง Scope 2 Emissions",
    category: "ESG & Sustainability",
    date: "8 มี.ค. 2025",
    readTime: "7 นาที",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop",
  },
];

const featured = posts.filter((p) => p.featured);
const regular = posts.filter((p) => !p.featured);

export default function Blog() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Blog & Insights</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              บทความ<span className="text-gradient-accent">และข้อมูลเชิงลึก</span>
            </h1>
            <p className="text-lg text-text-secondary">
              ความรู้ด้านพลังงานสะอาด เทคโนโลยี และกลยุทธ์ทางธุรกิจ จากทีมวิศวกรและที่ปรึกษาของ SIRINX
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 border-y border-border-subtle bg-surface-elevated">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {categories.map((cat) => (
              <button key={cat} className="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap border border-border-subtle text-text-secondary hover:text-accent-primary hover:border-border-accent hover:bg-accent-glow transition-colors first:bg-accent-glow first:text-accent-primary first:border-border-accent">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <h2 className="font-display text-xl font-bold text-foreground mb-8">บทความแนะนำ</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {featured.map((post, i) => (
              <motion.div key={post.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link href={`/blog/${post.slug}`} className="group block rounded-xl border border-border-subtle bg-surface-elevated overflow-hidden hover:border-border-accent transition-colors">
                  <div className="relative h-56 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-xs font-medium bg-accent-primary text-text-inverse rounded-md">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-text-muted mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 lg:py-20 section-alt">
        <div className="container">
          <h2 className="font-display text-xl font-bold text-foreground mb-8">บทความทั้งหมด</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((post, i) => (
              <motion.div key={post.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link href={`/blog/${post.slug}`} className="group block rounded-xl border border-border-subtle bg-surface-elevated overflow-hidden hover:border-border-accent transition-colors h-full">
                  <div className="relative h-44 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-3 h-3 text-accent-secondary" />
                      <span className="text-xs text-accent-secondary">{post.category}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-accent-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-text-muted mb-3 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-xs text-text-muted text-center">* placeholder — ต้องแทนที่ด้วยบทความจริงจากทีม content</p>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">รับข้อมูลเชิงลึกด้านพลังงาน</h2>
            <p className="text-text-secondary mb-6">สมัครรับจดหมายข่าวเพื่อรับบทความ ข้อมูลอุตสาหกรรม และข่าวสารจาก SIRINX</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="อีเมลของคุณ" className="flex-1 px-4 py-3 rounded-lg border border-border-subtle bg-surface-elevated text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" />
              <button className="px-6 py-3 font-display font-semibold btn-accent rounded-lg whitespace-nowrap">
                สมัครรับข่าว
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
