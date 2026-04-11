import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const postData: Record<string, { title: string; category: string; date: string; readTime: string; image: string; content: string }> = {
  "rooftop-solar-roi-2025": {
    title: "Rooftop Solar ROI ปี 2025: คุ้มค่าแค่ไหนสำหรับโรงงานไทย?",
    category: "Investment",
    date: "10 เมษายน 2025",
    readTime: "8 นาที",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop",
    content: `การลงทุน Rooftop Solar สำหรับโรงงานในประเทศไทยยังคงเป็นหนึ่งในการลงทุนที่ให้ผลตอบแทนสูงที่สุดในปี 2025 ด้วยราคาแผงโซลาร์ที่ลดลงอย่างต่อเนื่อง ประกอบกับค่าไฟฟ้าที่มีแนวโน้มสูงขึ้น ทำให้ ROI ของ Rooftop Solar น่าสนใจมากยิ่งขึ้น\n\n## ปัจจัยที่ส่งผลต่อ ROI\n\nผลตอบแทนจากการลงทุน Rooftop Solar ขึ้นอยู่กับหลายปัจจัย ได้แก่ ขนาดของระบบ ปริมาณการใช้ไฟฟ้าในช่วงกลางวัน อัตราค่าไฟฟ้าปัจจุบัน ทิศทางและมุมเอียงของหลังคา รวมถึงสภาพอากาศในพื้นที่\n\n## ตัวอย่างการคำนวณ\n\nสำหรับโรงงานขนาดกลางที่ติดตั้งระบบ 500 kW บนหลังคา เงินลงทุนโดยประมาณอยู่ที่ 12-15 ล้านบาท สามารถประหยัดค่าไฟได้ประมาณ 3-4 ล้านบาทต่อปี คืนทุนภายใน 3-5 ปี และมีผลตอบแทนตลอดอายุการใช้งาน 25 ปี ประมาณ 60-80 ล้านบาท\n\n## แนวโน้มปี 2025\n\nราคาแผงโซลาร์ลดลงประมาณ 10-15% เมื่อเทียบกับปี 2024 ในขณะที่ค่าไฟฟ้ามีแนวโน้มปรับขึ้น ทำให้ payback period สั้นลง นอกจากนี้ เทคโนโลยี AI Monitoring ช่วยเพิ่มประสิทธิภาพการผลิตไฟฟ้าได้อีก 5-10%\n\n*บทความนี้เป็น placeholder — ต้องแทนที่ด้วยเนื้อหาจริง*`,
  },
  "ai-energy-management-guide": {
    title: "AI Energy Management คืออะไร? ทำไมธุรกิจยุคใหม่ต้องมี",
    category: "Energy Management",
    date: "5 เมษายน 2025",
    readTime: "6 นาที",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    content: `AI Energy Management คือระบบบริหารจัดการพลังงานที่ใช้ปัญญาประดิษฐ์ในการวิเคราะห์ ทำนาย และปรับปรุงการใช้พลังงานแบบอัตโนมัติ ช่วยให้ธุรกิจลดต้นทุนพลังงาน เพิ่มประสิทธิภาพ และสร้างข้อมูลเชิงลึกสำหรับการตัดสินใจ\n\n## ทำไมต้อง AI?\n\nระบบพลังงานแบบเดิมทำงานตามกฎที่ตั้งไว้ล่วงหน้า ไม่สามารถปรับตัวตามสถานการณ์ที่เปลี่ยนแปลง AI สามารถเรียนรู้รูปแบบการใช้พลังงาน ทำนายความต้องการ และปรับการทำงานของระบบแบบ real-time\n\n## ประโยชน์หลัก\n\nAI Energy Management ช่วยลดพลังงานสิ้นเปลืองเพิ่มเติม 10-20% จากระบบโซลาร์เพียงอย่างเดียว ช่วยทำ ESG Reporting อัตโนมัติ และให้ข้อมูลเชิงลึกสำหรับการวางแผนธุรกิจ\n\n*บทความนี้เป็น placeholder — ต้องแทนที่ด้วยเนื้อหาจริง*`,
  },
};

const defaultPost = {
  title: "บทความกำลังจัดทำ",
  category: "General",
  date: "2025",
  readTime: "5 นาที",
  image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop",
  content: "เนื้อหาบทความนี้กำลังอยู่ระหว่างการจัดทำ กรุณากลับมาอ่านในภายหลัง\n\n*placeholder — ต้องแทนที่ด้วยเนื้อหาจริง*",
};

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = postData[params.slug || ""] || defaultPost;

  return (
    <div>
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> กลับไปหน้าบทความ
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1 text-xs text-accent-secondary"><Tag className="w-3 h-3" /> {post.category}</span>
              <span className="flex items-center gap-1 text-xs text-text-muted"><Clock className="w-3 h-3" /> {post.readTime}</span>
              <span className="text-xs text-text-muted">{post.date}</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">{post.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <img src={post.image} alt={post.title} className="w-full rounded-xl mb-10" />
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n\n").map((para, i) => {
                if (para.startsWith("## ")) {
                  return <h2 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-4">{para.replace("## ", "")}</h2>;
                }
                if (para.startsWith("*") && para.endsWith("*")) {
                  return <p key={i} className="text-sm text-text-muted italic mt-6">{para.replace(/\*/g, "")}</p>;
                }
                return <p key={i} className="text-text-secondary leading-relaxed mb-4">{para}</p>;
              })}
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border-subtle flex items-center justify-between">
              <Link href="/blog" className="text-sm text-accent-primary hover:underline flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> บทความอื่น ๆ
              </Link>
              <button className="flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors">
                <Share2 className="w-4 h-4" /> แชร์บทความ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
