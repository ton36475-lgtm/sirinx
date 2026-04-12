/**
 * SIRINX Contact Page — Lead Capture & Qualification
 * Dual-theme: semantic CSS vars
 * Features: URL param prefill from Solar Calculator, lead qualification, success state,
 *           tRPC backend integration, LINE OA button
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearch } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight, Phone, Mail, MapPin, Clock, Send, CheckCircle2,
  Calculator, Shield, FileText, Users, Zap, MessageCircle, Loader2
} from "lucide-react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const LINE_OA_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_LINE_OA_URL) || "https://lin.ee/sirinx";

const contactChannels = [
  { icon: Phone, title: "โทรศัพท์", value: "+66 81 972 3969", sub: "คุณ Pitoon — CEO & Founder", action: "tel:+66819723969" },
  { icon: Mail, title: "อีเมล", value: "pitoon.sirinx@gmail.com", sub: "ตอบกลับภายใน 24 ชม.", action: "mailto:pitoon.sirinx@gmail.com" },
  { icon: MapPin, title: "สำนักงาน", value: "600/99 Midtrapab Rd.", sub: "Mueang Phitsanulok 65000", action: "https://maps.google.com/?q=600/99+Midtrapab+Rd+Phitsanulok" },
  { icon: Clock, title: "เว็บไซต์", value: "www.sirinx.co", sub: "ติดต่อได้ตลอด 24 ชม.", action: "https://www.sirinx.co" },
];

const interestOptions = [
  "Rooftop Solar", "Floating Solar", "Solar Carport", "BESS / ESS",
  "AI Energy Management", "O&M Service", "Co-investment / PPA", "ปรึกษาทั่วไป",
];

const budgetRanges = [
  "ยังไม่ได้กำหนด", "ต่ำกว่า 5 ล้านบาท", "5-15 ล้านบาท",
  "15-50 ล้านบาท", "50-100 ล้านบาท", "มากกว่า 100 ล้านบาท",
];

const timelineOptions = [
  "ภายใน 1 เดือน", "1-3 เดือน", "3-6 เดือน", "6-12 เดือน", "กำลังศึกษาข้อมูล",
];

export default function Contact() {
  const searchString = useSearch();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "",
    interest: "", budget: "", timeline: "",
    monthlyBill: "", roofArea: "", message: "",
  });

  const submitLead = trpc.lead.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("ส่งข้อมูลเรียบร้อย ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง");
    },
    onError: (err) => {
      toast.error(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    },
  });

  // Prefill from Solar Calculator URL params
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const system = params.get("system");
    const type = params.get("type");
    const bill = params.get("bill");
    const bess = params.get("bess");
    if (system || type || bill) {
      const parts: string[] = [];
      if (system) parts.push(`ขนาดระบบที่แนะนำ: ${system}`);
      if (type) parts.push(`ประเภทธุรกิจ: ${type}`);
      if (bill) parts.push(`ค่าไฟปัจจุบัน: ${Number(bill).toLocaleString()} บาท/เดือน`);
      if (bess) parts.push(`ระบบ BESS: ${bess}`);
      parts.push("\n(ข้อมูลจากเครื่องมือคำนวณ Solar Assessment)");
      setFormData(prev => ({
        ...prev,
        interest: system?.includes("BESS") ? "BESS / ESS" : "Rooftop Solar",
        monthlyBill: bill || "",
        message: parts.join("\n"),
      }));
    }
  }, [searchString]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      source: "contact",
      name: formData.name,
      company: formData.company || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      interest: formData.interest || undefined,
      budget: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      monthlyBill: formData.monthlyBill || undefined,
      message: formData.message || undefined,
    });
  };

  const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">ขอบคุณสำหรับข้อมูล</h2>
          <p className="text-text-secondary mb-6">
            ทีมวิศวกรของ SIRINX จะตรวจสอบข้อมูลและติดต่อกลับภายใน 24 ชั่วโมง
            หากต้องการความช่วยเหลือเร่งด่วน กรุณาโทร +66 81 972 3969
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 btn-accent rounded-lg text-sm font-display font-semibold">
              กลับหน้าหลัก
            </Link>
            <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 btn-accent-outline rounded-lg text-sm font-display font-semibold">
              คำนวณระบบโซลาร์
            </Link>
          </div>
          {/* LINE OA CTA after submit */}
          <div className="mt-6 p-4 rounded-xl border border-[#06C755]/30 bg-[#06C755]/10">
            <p className="text-sm text-text-secondary mb-3">ติดตามสถานะผ่าน LINE OA ได้เลย</p>
            <a
              href={LINE_OA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> เพิ่มเพื่อน LINE @SIRINX
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background text-foreground text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 transition-colors";

  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Contact Us</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              เริ่มต้น<span className="text-gradient-accent">ลดค่าพลังงาน</span>วันนี้
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              นัดสำรวจหน้างานฟรี ไม่มีข้อผูกมัด ทีมวิศวกรพร้อมออกแบบระบบที่เหมาะสมกับธุรกิจของคุณ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels + LINE OA */}
      <section className="pb-12 bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {contactChannels.map((ch, i) => (
              <motion.a key={ch.title} href={ch.action}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group p-5 rounded-xl border border-border-subtle bg-surface-elevated hover:border-border-accent transition-all">
                <ch.icon className="w-5 h-5 text-accent-primary mb-3" />
                <div className="font-display font-semibold text-foreground text-sm group-hover:text-accent-primary transition-colors">{ch.value}</div>
                <div className="text-xs text-text-muted mt-1">{ch.sub}</div>
              </motion.a>
            ))}
            {/* LINE OA Channel Card */}
            <motion.a
              href={LINE_OA_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}
              className="group p-5 rounded-xl border border-[#06C755]/30 bg-[#06C755]/10 hover:border-[#06C755]/60 hover:bg-[#06C755]/20 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-[#06C755] mb-3" />
              <div className="font-display font-semibold text-foreground text-sm group-hover:text-[#06C755] transition-colors">LINE @SIRINX</div>
              <div className="text-xs text-text-muted mt-1">แชทสดกับทีมงาน</div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="p-6 lg:p-8 rounded-2xl border border-border-subtle bg-surface-elevated">
                <h2 className="font-display text-xl font-bold text-foreground mb-1">แบบฟอร์มขอใบเสนอราคา</h2>
                <p className="text-sm text-text-muted mb-6">กรอกข้อมูลเบื้องต้น ทีมวิศวกรจะวิเคราะห์และติดต่อกลับภายใน 24 ชม.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ชื่อ-นามสกุล *</label>
                      <input type="text" required value={formData.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="ชื่อของคุณ" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">บริษัท / องค์กร</label>
                      <input type="text" value={formData.company} onChange={(e) => update("company", e.target.value)} className={inputCls} placeholder="ชื่อบริษัท" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">อีเมล</label>
                      <input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="email@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">เบอร์โทรศัพท์ *</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="08X-XXX-XXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">โซลูชันที่สนใจ *</label>
                    <select required value={formData.interest} onChange={(e) => update("interest", e.target.value)} className={inputCls}>
                      <option value="">เลือกโซลูชัน</option>
                      {interestOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">งบประมาณโดยประมาณ</label>
                      <select value={formData.budget} onChange={(e) => update("budget", e.target.value)} className={inputCls}>
                        <option value="">เลือกช่วงงบประมาณ</option>
                        {budgetRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ระยะเวลาที่ต้องการ</label>
                      <select value={formData.timeline} onChange={(e) => update("timeline", e.target.value)} className={inputCls}>
                        <option value="">เลือกระยะเวลา</option>
                        {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ค่าไฟฟ้าต่อเดือน (บาท)</label>
                      <input type="text" value={formData.monthlyBill} onChange={(e) => update("monthlyBill", e.target.value)} className={inputCls} placeholder="เช่น 300,000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">พื้นที่หลังคาโดยประมาณ (ตร.ม.)</label>
                      <input type="text" value={formData.roofArea} onChange={(e) => update("roofArea", e.target.value)} className={inputCls} placeholder="เช่น 5,000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">ข้อความเพิ่มเติม</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => update("message", e.target.value)}
                      className={`${inputCls} resize-none`} placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับโครงการ หรือคำถามที่ต้องการให้ทีมวิศวกรตอบ" />
                  </div>
                  <button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 btn-accent rounded-lg font-display font-semibold text-base disabled:opacity-60"
                  >
                    {submitLead.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> กำลังส่ง...</>
                    ) : (
                      <><Send className="w-4 h-4" /> ส่งข้อมูลขอใบเสนอราคา</>
                    )}
                  </button>
                  <p className="text-xs text-text-muted text-center">ข้อมูลของคุณจะถูกเก็บเป็นความลับ ใช้เพื่อการติดต่อกลับเท่านั้น</p>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* LINE OA prominent CTA */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.5}
                className="p-6 rounded-xl border border-[#06C755]/30 bg-[#06C755]/10">
                <MessageCircle className="w-6 h-6 text-[#06C755] mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-2">แชทกับเราผ่าน LINE</h3>
                <p className="text-sm text-text-secondary mb-4">สอบถามข้อมูลเบื้องต้น หรือนัดสำรวจหน้างานผ่าน LINE OA ได้ทันที ตอบกลับรวดเร็วภายใน 5 นาที</p>
                <a
                  href={LINE_OA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-lg text-sm font-semibold transition-colors w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" /> เพิ่มเพื่อน LINE @SIRINX
                </a>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
                className="p-6 rounded-xl border border-border-accent bg-accent-glow">
                <Calculator className="w-6 h-6 text-accent-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground mb-2">ยังไม่แน่ใจ?</h3>
                <p className="text-sm text-text-secondary mb-4">ใช้เครื่องมือคำนวณขั้นสูงของ SIRINX เพื่อประเมินขนาดระบบ ผลตอบแทน และระยะเวลาคืนทุนเบื้องต้น</p>
                <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:underline">
                  คำนวณระบบโซลาร์ <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
                className="p-6 rounded-xl border border-border-subtle bg-surface-elevated">
                <h3 className="font-display font-semibold text-foreground mb-4">ขั้นตอนหลังส่งแบบฟอร์ม</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "ทีมวิศวกรตรวจสอบข้อมูล", time: "ภายใน 24 ชม." },
                    { step: "2", title: "นัดสำรวจหน้างาน", time: "ภายใน 3-5 วัน" },
                    { step: "3", title: "ออกแบบระบบ + ประเมิน ROI", time: "ภายใน 7 วัน" },
                    { step: "4", title: "นำเสนอข้อเสนอ", time: "ภายใน 10 วัน" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-accent-glow text-accent-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{s.step}</span>
                      <div>
                        <div className="text-sm font-medium text-foreground">{s.title}</div>
                        <div className="text-xs text-text-muted">{s.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
                className="p-6 rounded-xl border border-border-subtle bg-surface-elevated">
                <h3 className="font-display font-semibold text-foreground mb-4">ทำไมเลือก SIRINX</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: "สำรวจหน้างานฟรี ไม่มีข้อผูกมัด" },
                    { icon: FileText, text: "ใบเสนอราคาโปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง" },
                    { icon: Users, text: "ทีมวิศวกรมืออาชีพ ประสบการณ์ 150+ โครงการ" },
                    { icon: Zap, text: "ดูแลระบบตลอดอายุ 25 ปี" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-accent-primary shrink-0" />
                      <span className="text-sm text-text-secondary">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">ต้องการข้อมูลเพิ่มเติม?</h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">ศึกษาข้อมูลเพิ่มเติมเกี่ยวกับโซลูชันและผลงานของเรา</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions" className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-accent-outline rounded-lg font-display font-semibold">
              ดูโซลูชันทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-accent-outline rounded-lg font-display font-semibold">
              ดูผลงาน <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
