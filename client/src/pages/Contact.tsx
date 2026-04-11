import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const contactInfo = [
  { icon: Phone, label: "โทรศัพท์", value: "02-XXX-XXXX", sub: "จันทร์-ศุกร์ 9:00-18:00" },
  { icon: Mail, label: "อีเมล", value: "info@sirinx.co.th", sub: "ตอบกลับภายใน 24 ชม." },
  { icon: MapPin, label: "สำนักงาน", value: "กรุงเทพมหานคร", sub: "placeholder — ต้องใส่ที่อยู่จริง" },
  { icon: Clock, label: "เวลาทำการ", value: "จันทร์-ศุกร์", sub: "9:00 - 18:00 น." },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", interest: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("ส่งข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง");
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Contact Us</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              พูดคุยกับ<span className="text-gradient-accent">ทีมวิศวกร</span>
            </h1>
            <p className="text-lg text-text-secondary">
              พร้อมช่วยวิเคราะห์ความต้องการและออกแบบโซลูชันพลังงานที่เหมาะกับธุรกิจของคุณ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div key={info.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border-subtle bg-surface-elevated">
                  <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">{info.label}</div>
                    <div className="font-medium text-foreground">{info.value}</div>
                    <div className="text-xs text-text-muted">{info.sub}</div>
                  </div>
                </motion.div>
              ))}

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}
                className="p-5 rounded-xl glass-card">
                <h3 className="font-display font-semibold text-foreground mb-2">ต้องการประเมินเบื้องต้น?</h3>
                <p className="text-sm text-text-muted mb-3">ใช้เครื่องมือประเมินความคุ้มค่าของเราเพื่อดูผลลัพธ์เบื้องต้น</p>
                <Link href="/assessment" className="inline-flex items-center gap-1 text-sm font-medium text-accent-primary hover:underline">
                  ไปหน้าประเมิน <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="lg:col-span-3">
              <div className="p-6 lg:p-8 rounded-xl border border-border-subtle bg-surface-elevated">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">ส่งข้อมูลเพื่อรับคำปรึกษา</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ชื่อ-นามสกุล *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="ชื่อของคุณ" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">บริษัท</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="ชื่อบริษัท" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">อีเมล *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="email@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">เบอร์โทร</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="0XX-XXX-XXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">สนใจโซลูชัน</label>
                    <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground focus:outline-none focus:border-accent-primary">
                      <option value="">เลือกโซลูชันที่สนใจ</option>
                      <option value="rooftop">Rooftop Solar</option>
                      <option value="floating">Floating Solar</option>
                      <option value="carport">Solar Carport</option>
                      <option value="bess">BESS / ESS</option>
                      <option value="ai-energy">AI Energy Management</option>
                      <option value="ai-om">Physical AI O&M</option>
                      <option value="financing">Co-investment / Financing</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">ข้อความ</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary resize-none" placeholder="รายละเอียดเพิ่มเติม เช่น ขนาดพื้นที่ ค่าไฟต่อเดือน" />
                  </div>
                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
                    <Send className="w-4 h-4" /> ส่งข้อมูล
                  </button>
                  <p className="text-xs text-text-muted">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมงทำการ</p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
