import { motion } from "framer-motion";
import { useState } from "react";
import { Handshake, TrendingUp, Building2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const partnerTypes = [
  {
    icon: TrendingUp, title: "นักลงทุน",
    desc: "ร่วมลงทุนในโครงการพลังงานสะอาดที่ให้ผลตอบแทนมั่นคง",
    benefits: ["ผลตอบแทน IRR 12-20%", "สัญญาระยะยาว 25 ปี", "รายงานผลตอบแทนรายเดือน", "ทีมบริหารโครงการมืออาชีพ"],
  },
  {
    icon: Building2, title: "พันธมิตรธุรกิจ",
    desc: "ร่วมเป็นพันธมิตรในการขยายตลาดพลังงานสะอาด",
    benefits: ["ส่วนแบ่งรายได้ที่ยุติธรรม", "การสนับสนุนทางเทคนิค", "การฝึกอบรมทีมงาน", "แบรนด์ร่วมและการตลาด"],
  },
  {
    icon: Handshake, title: "EPC Partner",
    desc: "ร่วมงานในฐานะผู้รับเหมาติดตั้งหรือซัพพลายเออร์",
    benefits: ["โครงการต่อเนื่อง", "มาตรฐานการทำงานชัดเจน", "การชำระเงินตรงเวลา", "โอกาสเติบโตร่วมกัน"],
  },
];

export default function Partner() {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", type: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("ส่งข้อมูลเรียบร้อยแล้ว ทีมพัฒนาธุรกิจจะติดต่อกลับภายใน 48 ชั่วโมง");
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Partners & Investors</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              เติบโตไปด้วยกัน<br /><span className="text-gradient-accent">ในตลาดพลังงานสะอาด</span>
            </h1>
            <p className="text-lg text-text-secondary">
              ร่วมเป็นส่วนหนึ่งของการเปลี่ยนผ่านพลังงานของประเทศไทย ไม่ว่าจะเป็นนักลงทุน พันธมิตรธุรกิจ หรือ EPC Partner
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-6">
            {partnerTypes.map((pt, i) => (
              <motion.div key={pt.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-6 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-colors">
                <pt.icon className="w-8 h-8 text-accent-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{pt.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{pt.desc}</p>
                <ul className="space-y-2">
                  {pt.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-text-muted">
                      <CheckCircle2 className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="p-6 lg:p-8 rounded-xl border border-border-subtle bg-surface-elevated">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">ส่งข้อมูลเพื่อพูดคุย</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ชื่อ-นามสกุล *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="ชื่อของคุณ" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">บริษัท/องค์กร *</label>
                      <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                    <label className="block text-sm font-medium text-foreground mb-1.5">ประเภทความร่วมมือ *</label>
                    <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground focus:outline-none focus:border-accent-primary">
                      <option value="">เลือกประเภท</option>
                      <option value="investor">นักลงทุน</option>
                      <option value="partner">พันธมิตรธุรกิจ</option>
                      <option value="epc">EPC Partner</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">ข้อความ</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary resize-none" placeholder="รายละเอียดเกี่ยวกับความร่วมมือที่สนใจ" />
                  </div>
                  <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg">
                    <Send className="w-4 h-4" /> ส่งข้อมูล
                  </button>
                  <p className="text-xs text-text-muted">ทีมพัฒนาธุรกิจจะติดต่อกลับภายใน 48 ชั่วโมงทำการ</p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
