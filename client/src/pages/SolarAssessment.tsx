import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Zap, Calculator, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const steps = ["ประเภทธุรกิจ", "ข้อมูลพลังงาน", "พื้นที่ติดตั้ง", "ผลประเมิน"];

export default function SolarAssessment() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    businessType: "", monthlyBill: "", roofArea: "", roofType: "", location: "", interest: "",
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const monthlyBillNum = parseFloat(data.monthlyBill) || 0;
  const estimatedSaving = Math.round(monthlyBillNum * 0.4);
  const estimatedCapacity = Math.round(monthlyBillNum / 5000 * 100) / 100;
  const estimatedInvestment = Math.round(estimatedCapacity * 25);
  const paybackYears = estimatedInvestment > 0 ? Math.round(estimatedInvestment / (estimatedSaving * 12 / 1000) * 10) / 10 : 0;

  return (
    <div>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">Solar Assessment</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              ประเมินความคุ้มค่า<br /><span className="text-gradient-accent">เบื้องต้น</span>
            </h1>
            <p className="text-lg text-text-secondary">
              กรอกข้อมูลเบื้องต้นเพื่อดูการประเมินความคุ้มค่าของระบบโซลาร์สำหรับธุรกิจของคุณ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Assessment Form */}
      <section className="py-16 lg:py-24 section-alt">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-10">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${i <= step ? "bg-accent-primary text-text-inverse" : "bg-surface-elevated text-text-muted border border-border-subtle"}`}>
                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs hidden sm:block ${i <= step ? "text-foreground" : "text-text-muted"}`}>{s}</span>
                  {i < steps.length - 1 && <div className={`w-8 lg:w-16 h-px ${i < step ? "bg-accent-primary" : "bg-border-subtle"}`} />}
                </div>
              ))}
            </div>

            <div className="p-6 lg:p-8 rounded-xl border border-border-subtle bg-surface-elevated">
              {/* Step 0: Business Type */}
              {step === 0 && (
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">ประเภทธุรกิจของคุณ</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["โรงงานอุตสาหกรรม", "อาคารพาณิชย์/สำนักงาน", "ห้างสรรพสินค้า/คลังสินค้า", "โรงแรม/รีสอร์ท", "สถานศึกษา", "เกษตรกรรม", "ภาครัฐ", "อื่น ๆ"].map((type) => (
                      <button key={type} onClick={() => setData({ ...data, businessType: type })}
                        className={`p-4 rounded-lg border text-left text-sm transition-colors ${data.businessType === type ? "border-accent-primary bg-accent-glow text-foreground" : "border-border-subtle text-text-secondary hover:border-border-accent"}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Energy Data */}
              {step === 1 && (
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">ข้อมูลการใช้พลังงาน</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ค่าไฟฟ้าเฉลี่ยต่อเดือน (บาท) *</label>
                      <input type="number" value={data.monthlyBill} onChange={(e) => setData({ ...data, monthlyBill: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="เช่น 500000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">สนใจโซลูชัน</label>
                      <select value={data.interest} onChange={(e) => setData({ ...data, interest: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground focus:outline-none focus:border-accent-primary">
                        <option value="">เลือกโซลูชัน</option>
                        <option value="rooftop">Rooftop Solar</option>
                        <option value="floating">Floating Solar</option>
                        <option value="carport">Solar Carport</option>
                        <option value="bess">BESS / ESS</option>
                        <option value="combined">ผสมผสาน</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Installation Area */}
              {step === 2 && (
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">ข้อมูลพื้นที่ติดตั้ง</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">พื้นที่หลังคาโดยประมาณ (ตร.ม.)</label>
                      <input type="number" value={data.roofArea} onChange={(e) => setData({ ...data, roofArea: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="เช่น 5000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">ประเภทหลังคา</label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {["เมทัลชีท", "คอนกรีต", "กระเบื้อง", "ไม่แน่ใจ"].map((type) => (
                          <button key={type} onClick={() => setData({ ...data, roofType: type })}
                            className={`p-3 rounded-lg border text-sm transition-colors ${data.roofType === type ? "border-accent-primary bg-accent-glow text-foreground" : "border-border-subtle text-text-secondary hover:border-border-accent"}`}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">จังหวัด</label>
                      <input type="text" value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border-subtle bg-background text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent-primary" placeholder="เช่น ชลบุรี" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Results */}
              {step === 3 && (
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-6 h-6 text-accent-primary" />
                    <h2 className="font-display text-xl font-bold text-foreground">ผลประเมินเบื้องต้น</h2>
                  </div>
                  {monthlyBillNum > 0 ? (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg bg-accent-glow">
                          <div className="text-sm text-text-muted mb-1">ขนาดระบบโดยประมาณ</div>
                          <div className="font-display text-2xl font-bold text-foreground">{estimatedCapacity} MW</div>
                        </div>
                        <div className="p-4 rounded-lg bg-accent-glow">
                          <div className="text-sm text-text-muted mb-1">ประหยัดค่าไฟต่อเดือน</div>
                          <div className="font-display text-2xl font-bold text-accent-primary">~{estimatedSaving.toLocaleString()} บาท</div>
                        </div>
                        <div className="p-4 rounded-lg bg-accent-glow">
                          <div className="text-sm text-text-muted mb-1">เงินลงทุนโดยประมาณ</div>
                          <div className="font-display text-2xl font-bold text-foreground">~{estimatedInvestment} ล้านบาท</div>
                        </div>
                        <div className="p-4 rounded-lg bg-accent-glow">
                          <div className="text-sm text-text-muted mb-1">คืนทุนโดยประมาณ</div>
                          <div className="font-display text-2xl font-bold text-accent-primary">~{paybackYears} ปี</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20 mb-6">
                        <AlertTriangle className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                        <p className="text-xs text-text-muted">
                          ผลประเมินนี้เป็นการคำนวณเบื้องต้นเท่านั้น ผลลัพธ์จริงขึ้นอยู่กับหลายปัจจัย เช่น ทำเลที่ตั้ง สภาพหลังคา และรูปแบบการใช้ไฟฟ้า กรุณาติดต่อทีมวิศวกรเพื่อรับการประเมินที่แม่นยำ
                        </p>
                      </div>
                      <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-display font-semibold btn-accent rounded-lg"
                        onClick={() => toast.info("Feature coming soon — ระบบจะส่งข้อมูลประเมินไปยังทีมวิศวกรอัตโนมัติ")}>
                        <Zap className="w-4 h-4" /> ขอรับการประเมินจากวิศวกร
                      </Link>
                    </>
                  ) : (
                    <p className="text-text-muted">กรุณากรอกค่าไฟฟ้าเฉลี่ยต่อเดือนในขั้นตอนก่อนหน้า</p>
                  )}
                </motion.div>
              )}

              {/* Navigation */}
              {step < 3 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-border-subtle">
                  <button onClick={prevStep} disabled={step === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:text-foreground disabled:opacity-30 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> ก่อนหน้า
                  </button>
                  <button onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-2 font-display font-semibold btn-accent rounded-lg text-sm">
                    ถัดไป <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
