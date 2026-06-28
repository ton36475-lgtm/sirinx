import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgePercent,
  Calculator,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  Phone,
  Plus,
  Printer,
  Trash2,
  UserRound,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import {
  addDays,
  calculateQuotation,
  formatThaiDate,
  formatThaiMoney,
  parseKwpValue,
  quotationPricingRules,
  reserveLocalQuotationNumber,
  type QuotationLineInput,
} from "@/lib/quotation";
import { toast } from "sonner";

type CustomerForm = {
  name: string;
  company: string;
  phone: string;
  email: string;
  lineId: string;
  address: string;
  note: string;
};

const packageMap: Record<string, string> = {
  start: "solar-carport-start",
  pro: "solar-carport-pro",
  enterprise: "solar-carport-enterprise",
  "home-solution": "home-solar-large",
  hybrid: "home-hybrid-bess",
};

function getInitialServiceId() {
  if (typeof window === "undefined") return "solar-carport-pro";
  const params = new URLSearchParams(window.location.search);
  const packageParam = params.get("package") ?? params.get("service");
  if (!packageParam) return "solar-carport-pro";
  return packageMap[packageParam] ?? packageParam;
}

function getInitialTargetKwp() {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return parseKwpValue(
    params.get("kwp") || params.get("capacity") || params.get("system")
  );
}

export default function Quote() {
  return <QuoteInner />;
}

function getInitialCustomerNote() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const parts: string[] = [];
  const system = params.get("system");
  const bill = params.get("bill");
  const type = params.get("type");
  if (system) parts.push(`ผลคำนวณเบื้องต้น: ${system}`);
  if (bill) parts.push(`ค่าไฟเฉลี่ย: ${Number(bill).toLocaleString()} บาท/เดือน`);
  if (type) parts.push(`ประเภทไซต์: ${type}`);
  return parts.join("\n");
}

function createQuoteNumber() {
  if (typeof window === "undefined") {
    return reserveLocalQuotationNumber(new Date());
  }
  return reserveLocalQuotationNumber(new Date(), window.localStorage);
}

function fieldClassName() {
  return "h-11 border-border-accent/60 bg-surface-elevated/70 text-foreground placeholder:text-text-muted";
}

function selectClassName() {
  return [
    "h-11 w-full rounded-md border border-border-accent/60 bg-surface-elevated/70 px-3 text-sm text-foreground shadow-xs outline-none",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  ].join(" ");
}

function QuoteInner() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [quoteNumber, setQuoteNumber] = useState(createQuoteNumber);
  const [issuedAt] = useState(() => new Date());
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    company: "",
    phone: "",
    email: "",
    lineId: "",
    address: "",
    note: getInitialCustomerNote(),
  });
  const initialTargetKwp = getInitialTargetKwp();
  const [lines, setLines] = useState<QuotationLineInput[]>([
    {
      serviceId: getInitialServiceId(),
      quantity: 1,
      discountPercent: 0,
      targetKwp: initialTargetKwp,
      panelModelId: quotationPricingRules.defaultPanelId,
    },
  ]);
  const [generated, setGenerated] = useState(false);
  const [savedQuote, setSavedQuote] = useState<{
    id: string | number;
    queued?: boolean;
    notificationSent?: boolean;
  } | null>(null);
  const [isDirty, setIsDirty] = useState(true);
  const createQuotation = trpc.quotation.create.useMutation();

  const validUntil = useMemo(
    () => addDays(issuedAt, quotationPricingRules.defaultValidityDays),
    [issuedAt]
  );
  const totals = useMemo(() => calculateQuotation(lines), [lines]);
  const selectedLines = totals.lines;

  const quoteJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SIRINX Solar Quotation System",
      provider: {
        "@type": "Organization",
        name: "SIRINX",
        url: "https://www.sirinx.co",
      },
      serviceType:
        "Solar Carport, Home Solar, Hybrid BESS, EV Charger and AI Energy Monitoring quotation",
      areaServed: {
        "@type": "Country",
        name: "Thailand",
      },
    }),
    []
  );

  function markDirty() {
    setIsDirty(true);
    setSavedQuote(null);
  }

  function updateCustomer(key: keyof CustomerForm, value: string) {
    setCustomer(current => ({ ...current, [key]: value }));
    markDirty();
  }

  function updateLine(index: number, patch: Partial<QuotationLineInput>) {
    setLines(current =>
      current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, ...patch } : line
      )
    );
    markDirty();
  }

  function addLine() {
    setLines(current => [
      ...current,
      {
        serviceId: "ai-energy-monitoring",
        quantity: 1,
        discountPercent: 0,
        panelModelId: quotationPricingRules.defaultPanelId,
      },
    ]);
    markDirty();
  }

  function removeLine(index: number) {
    setLines(current => {
      if (current.length === 1) return current;
      return current.filter((_, lineIndex) => lineIndex !== index);
    });
    markDirty();
  }

  function validateCustomerForRealQuote() {
    if (!customer.name.trim()) {
      toast.error("กรุณากรอกชื่อผู้ติดต่อก่อนออกใบเสนอราคาจริง");
      return false;
    }
    if (!customer.phone.trim() && !customer.email.trim() && !customer.lineId.trim()) {
      toast.error("กรุณากรอกเบอร์โทร อีเมล หรือ LINE อย่างน้อย 1 ช่องทาง");
      return false;
    }
    return true;
  }

  async function submitQuotation(sourceAction: "preview" | "print") {
    if (savedQuote && !isDirty) return true;
    if (!validateCustomerForRealQuote()) return false;

    try {
      const result = await createQuotation.mutateAsync({
        customer,
        lines,
        sourceAction,
        clientQuoteNumber: quoteNumber,
        issuedAt: issuedAt.toISOString(),
      });
      setQuoteNumber(result.quoteNumber);
      setSavedQuote({
        id: result.id,
        queued: "queued" in result,
        notificationSent: result.notificationSent,
      });
      setIsDirty(false);
      if ("queued" in result) {
        toast.warning(
          result.notificationSent
            ? "ฐานข้อมูลหลักยังไม่พร้อม ระบบบันทึกลงคิวสำรองและแจ้งทีมขายแล้ว"
            : "ฐานข้อมูลหลักยังไม่พร้อม ระบบบันทึกลงคิวสำรอง แต่ยังไม่ได้ส่งแจ้งเตือน"
        );
      } else if (result.notificationSent) {
        toast.success(`บันทึกใบเสนอราคา ${result.quoteNumber} และแจ้งทีมขายแล้ว`);
      } else {
        toast.warning(
          `บันทึกใบเสนอราคา ${result.quoteNumber} แล้ว แต่ notification service ยังไม่พร้อม`
        );
      }
      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "ไม่สามารถบันทึกใบเสนอราคาได้";
      toast.error(message);
      return false;
    }
  }

  async function handleGenerateQuote() {
    setGenerated(true);
    const saved = await submitQuotation("preview");
    if (!saved) return;
    window.setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function handlePrint() {
    setGenerated(true);
    const saved = await submitQuotation("print");
    if (!saved) return;
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <div className="bg-background">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(quoteJsonLd)}
        </script>
      </Helmet>

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.82_0.17_192_/_0.16),transparent_36%),linear-gradient(135deg,var(--background),var(--surface-secondary))]" />
        <div className="container relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-accent bg-accent-glow px-3 py-1.5 text-xs font-semibold text-accent-primary">
                <FileText className="h-3.5 w-3.5" />
                Lead → Calculate → Quotation PDF
              </div>
              <h1 className="mb-5 font-display text-3xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                สร้างใบเสนอราคา
                <span className="block text-gradient-accent">
                  Solar / BESS / AI Energy
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                กรอกข้อมูลลูกค้า เลือกแพ็กเกจ ระบบจะคำนวณยอดรวม VAT
                และสร้างใบเสนอราคาแบบพร้อมพิมพ์เป็น PDF ให้ทีมขายนำไปคุยงานต่อได้ทันที
              </p>
            </div>
            <div className="grid gap-3 rounded-2xl border border-border-accent bg-surface-elevated/70 p-5 shadow-xl shadow-cyan-500/5 lg:grid-cols-3">
              {[
                ["เลขใบเสนอราคา", quoteNumber],
                ["วันที่ออก", formatThaiDate(issuedAt)],
                ["หมดอายุ", formatThaiDate(validUntil)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-background/70 p-4">
                  <div className="text-xs text-text-muted">{label}</div>
                  <div className="mt-1 font-display text-sm font-semibold text-foreground">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="quote-screen-only pb-16 lg:pb-24">
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-5 lg:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-glow">
                  <UserRound className="h-5 w-5 text-accent-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    ข้อมูลลูกค้า
                  </h2>
                  <p className="text-sm text-text-muted">
                    เมื่อกดสร้างใบเสนอราคา ระบบจะบันทึกเข้า lead/quotation DB
                    และแจ้งทีมขายตาม integration ที่ตั้งค่าไว้
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-foreground">
                  ชื่อผู้ติดต่อ
                  <Input
                    value={customer.name}
                    onChange={event => updateCustomer("name", event.target.value)}
                    placeholder="เช่น คุณอำนาจ"
                    className={fieldClassName()}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-foreground">
                  บริษัท / โครงการ
                  <Input
                    value={customer.company}
                    onChange={event =>
                      updateCustomer("company", event.target.value)
                    }
                    placeholder="เช่น SIRINX Group"
                    className={fieldClassName()}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-foreground">
                  เบอร์โทร
                  <Input
                    value={customer.phone}
                    onChange={event => updateCustomer("phone", event.target.value)}
                    placeholder="08x-xxx-xxxx"
                    className={fieldClassName()}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-foreground">
                  อีเมล
                  <Input
                    value={customer.email}
                    onChange={event => updateCustomer("email", event.target.value)}
                    placeholder="name@example.com"
                    className={fieldClassName()}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-foreground">
                  LINE ID
                  <Input
                    value={customer.lineId}
                    onChange={event => updateCustomer("lineId", event.target.value)}
                    placeholder="@lineid"
                    className={fieldClassName()}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-foreground">
                  ที่อยู่ / พื้นที่ติดตั้ง
                  <Input
                    value={customer.address}
                    onChange={event =>
                      updateCustomer("address", event.target.value)
                    }
                    placeholder="จังหวัด / อำเภอ / ไซต์งาน"
                    className={fieldClassName()}
                  />
                </label>
              </div>
              <label className="mt-4 block space-y-2 text-sm font-medium text-foreground">
                หมายเหตุเพิ่มเติม
                <Textarea
                  value={customer.note}
                  onChange={event => updateCustomer("note", event.target.value)}
                  placeholder="เช่น ค่าไฟเฉลี่ย, จำนวน EV, ต้องการ backup, เวลาทำงานของไซต์"
                  className="min-h-24 border-border-accent/60 bg-surface-elevated/70 text-foreground placeholder:text-text-muted"
                />
              </label>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-elevated p-5 lg:p-6">
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-glow">
                    <Calculator className="h-5 w-5 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      รายการสินค้า / บริการ
                    </h2>
                    <p className="text-sm text-text-muted">
                      ราคาและสเปกแผง AIKO อยู่ใน shared/pricing-rules.json
                      เพื่อให้ frontend/backend ใช้สูตรเดียวกัน
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLine}
                  className="border-border-accent text-accent-primary"
                >
                  <Plus className="h-4 w-4" />
                  เพิ่มรายการ
                </Button>
              </div>

              <div className="space-y-4">
                {lines.map((line, index) => {
                  const service = quotationPricingRules.services.find(
                    item => item.id === line.serviceId
                  );
                  return (
                    <div
                      key={`${line.serviceId}-${index}`}
                      className="rounded-xl border border-border-subtle bg-background/45 p-4"
                    >
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_120px_170px_90px_120px_44px] lg:items-end">
                        <label className="space-y-2 text-sm font-medium text-foreground">
                          แพ็กเกจ / บริการ
                          <select
                            value={line.serviceId}
                            onChange={event =>
                              updateLine(index, {
                                serviceId: event.target.value,
                              })
                            }
                            className={selectClassName()}
                          >
                            {quotationPricingRules.services.map(item => (
                              <option key={item.id} value={item.id}>
                                {item.name} — {item.typicalCapacity}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="space-y-2 text-sm font-medium text-foreground">
                          ขนาด kWp
                          <Input
                            type="number"
                            min={0}
                            step={0.1}
                            value={line.targetKwp ?? ""}
                            onChange={event =>
                              updateLine(index, {
                                targetKwp:
                                  event.target.value === ""
                                    ? undefined
                                    : Number(event.target.value),
                              })
                            }
                            placeholder="เช่น 49.6"
                            className={fieldClassName()}
                          />
                        </label>
                        <label className="space-y-2 text-sm font-medium text-foreground">
                          แผง AIKO
                          <select
                            value={
                              line.panelModelId ??
                              quotationPricingRules.defaultPanelId
                            }
                            onChange={event =>
                              updateLine(index, {
                                panelModelId: event.target.value,
                              })
                            }
                            className={selectClassName()}
                          >
                            {quotationPricingRules.panelCatalog.map(panel => (
                              <option key={panel.id} value={panel.id}>
                                {panel.displayName}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="space-y-2 text-sm font-medium text-foreground">
                          จำนวน
                          <Input
                            type="number"
                            min={1}
                            value={line.quantity}
                            onChange={event =>
                              updateLine(index, {
                                quantity: Number(event.target.value),
                              })
                            }
                            className={fieldClassName()}
                          />
                        </label>
                        <label className="space-y-2 text-sm font-medium text-foreground">
                          ส่วนลด %
                          <Input
                            type="number"
                            min={0}
                            max={80}
                            value={line.discountPercent ?? 0}
                            onChange={event =>
                              updateLine(index, {
                                discountPercent: Number(event.target.value),
                              })
                            }
                            className={fieldClassName()}
                          />
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLine(index)}
                          disabled={lines.length === 1}
                          className="border-border-subtle text-text-muted hover:text-red-400"
                          aria-label="ลบรายการ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {service ? (
                        <div className="mt-3 rounded-lg bg-accent-glow/60 p-3 text-sm text-text-secondary">
                          <div className="font-medium text-foreground">
                            {service.description}
                          </div>
                          <div className="mt-1 text-xs text-text-muted">
                            เหมาะกับ: {service.recommendedFor}
                          </div>
                          {totals.lines[index]?.panelLayout ? (
                            <div className="mt-2 text-xs text-accent-primary">
                              {totals.lines[index].panel?.displayName} /{" "}
                              {totals.lines[index].panel?.watts}W /{" "}
                              {totals.lines[index].panelLayout?.panelCount} แผง
                              / กำลังติดตั้งจริง{" "}
                              {totals.lines[index].panelLayout?.actualKwp} kWp
                              / พื้นที่แผงประมาณ{" "}
                              {totals.lines[index].panelLayout?.moduleAreaM2} ตร.ม.
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={handleGenerateQuote}
                  disabled={createQuotation.isPending}
                  className="btn-accent h-11 font-display"
                >
                  {createQuotation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  ออกใบเสนอราคาจริง
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrint}
                  disabled={createQuotation.isPending}
                  className="h-11 border-border-accent text-accent-primary"
                >
                  <Printer className="h-4 w-4" />
                  ดาวน์โหลด PDF / Print
                </Button>
              </div>
              {savedQuote ? (
                <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-200">
                  {savedQuote.queued
                    ? "ฐานข้อมูลหลักยังไม่พร้อม ระบบเก็บข้อมูลไว้ในคิวสำรองแล้ว"
                    : `บันทึกเข้า quotation database แล้ว: ${quoteNumber}`}
                </div>
              ) : isDirty ? (
                <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
                  เอกสารด้านล่างเป็น preview สด ยังไม่ได้บันทึกเข้า database
                </div>
              ) : null}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border-accent bg-surface-elevated p-5 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-accent-primary">
              <Zap className="h-4 w-4" />
              สรุปยอดทันที
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatThaiMoney(totals.subtotal)}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-text-muted">Discount</span>
                <span className="font-semibold text-amber-400">
                  - {formatThaiMoney(totals.discount)}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-text-muted">VAT 7%</span>
                <span className="font-semibold text-foreground">
                  {formatThaiMoney(totals.vat)}
                </span>
              </div>
              <div className="border-t border-border-subtle pt-3">
                <div className="flex justify-between gap-3">
                  <span className="font-display text-base font-bold text-foreground">
                    ยอดสุทธิ
                  </span>
                  <span className="font-display text-xl font-bold text-accent-primary">
                    {formatThaiMoney(totals.grandTotal)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {selectedLines.slice(0, 3).map(line => (
                <div
                  key={`${line.service.id}-${line.panelLayout?.actualKwp ?? "fixed"}`}
                  className="flex items-start gap-2 text-xs text-text-secondary"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-primary" />
                  <span>
                    {line.service.name}:{" "}
                    {line.panelLayout
                      ? `${line.panelLayout.actualKwp} kWp / ${line.panelLayout.panelCount} แผง`
                      : line.service.typicalCapacity}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-text-muted">
              เอกสารนี้เป็น preliminary quotation จากข้อมูลเบื้องต้น
              ต้องยืนยันราคาจริงหลังสำรวจหน้างานและตรวจแบบระบบไฟเดิม
            </p>
          </aside>
        </div>
      </section>

      <section ref={previewRef} className="pb-20">
        <div className="container">
          {!generated ? (
            <div className="quote-screen-only mb-5 rounded-xl border border-border-subtle bg-surface-elevated p-4 text-sm text-text-muted">
              Preview ด้านล่างอัปเดตตามข้อมูลที่กรอก กด “สร้างใบเสนอราคา”
              เพื่อเลื่อนมาตรวจเอกสารก่อนสั่งพิมพ์ PDF
            </div>
          ) : null}
          <div className="quotation-print-surface overflow-hidden rounded-2xl border border-border-subtle bg-white text-slate-950 shadow-2xl shadow-cyan-950/10">
            <div className="grid gap-6 border-b border-slate-200 bg-slate-950 p-6 text-white lg:grid-cols-[1fr_auto] lg:p-8">
              <div>
                <div className="font-display text-3xl font-bold tracking-tight">
                  SIRINX
                </div>
                <div className="mt-1 text-sm uppercase tracking-[0.18em] text-cyan-200">
                  Solar Digital Agentic Company
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                  ใบเสนอราคาเบื้องต้นสำหรับ Solar Carport, Home Solar,
                  Hybrid BESS และ AI Energy Monitoring
                </p>
              </div>
              <div className="rounded-xl border border-cyan-300/30 bg-white/8 p-4 text-sm">
                <div className="text-cyan-200">Quotation No.</div>
                <div className="mt-1 font-display text-xl font-bold">
                  {quoteNumber}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-300">
                  <div>
                    <div>วันที่ออก</div>
                    <strong className="text-white">{formatThaiDate(issuedAt)}</strong>
                  </div>
                  <div>
                    <div>หมดอายุ</div>
                    <strong className="text-white">{formatThaiDate(validUntil)}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2 lg:p-8">
              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-cyan-700">
                  เสนอราคาให้
                </h2>
                <div className="mt-3 space-y-1 text-sm leading-6">
                  <div className="font-semibold">
                    {customer.name || "ชื่อลูกค้า / ผู้ติดต่อ"}
                  </div>
                  <div>{customer.company || "บริษัท / โครงการ"}</div>
                  <div>{customer.phone || "เบอร์โทร"}</div>
                  <div>{customer.email || "อีเมล"}</div>
                  <div>{customer.lineId || "LINE ID"}</div>
                  <div>{customer.address || "พื้นที่ติดตั้ง"}</div>
                </div>
              </div>
              <div>
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-cyan-700">
                  ผู้ออกเอกสาร
                </h2>
                <div className="mt-3 space-y-1 text-sm leading-6">
                  <div className="font-semibold">
                    {quotationPricingRules.salesContact.company}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    {quotationPricingRules.salesContact.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {quotationPricingRules.salesContact.email}
                  </div>
                  <div>{quotationPricingRules.salesContact.website}</div>
                  <div>{quotationPricingRules.salesContact.address}</div>
                </div>
              </div>
            </div>

            <div className="px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-100 text-left text-xs uppercase tracking-[0.12em] text-slate-600">
                      <th className="px-3 py-3">รายการ</th>
                      <th className="px-3 py-3 text-right">จำนวน</th>
                      <th className="px-3 py-3 text-right">ราคาต่อหน่วย</th>
                      <th className="px-3 py-3 text-right">ส่วนลด</th>
                      <th className="px-3 py-3 text-right">รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {totals.lines.map(line => (
                      <tr key={`${line.serviceId}-${line.service.name}`} className="border-b border-slate-200">
                        <td className="px-3 py-4 align-top">
                          <div className="font-semibold">{line.service.name}</div>
                          <div className="mt-1 text-xs leading-5 text-slate-600">
                            {line.service.description}
                          </div>
                          <div className="mt-1 text-xs text-cyan-700">
                            {line.panelLayout
                              ? `${line.panelLayout.actualKwp} kWp / ${line.panelLayout.panelCount} แผง ${line.panel?.displayName}`
                              : line.service.typicalCapacity}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-right align-top">
                          {line.quantity}
                        </td>
                        <td className="px-3 py-4 text-right align-top">
                          {formatThaiMoney(line.unitPrice)}
                        </td>
                        <td className="px-3 py-4 text-right align-top">
                          {formatThaiMoney(line.lineDiscount)}
                        </td>
                        <td className="px-3 py-4 text-right align-top font-semibold">
                          {formatThaiMoney(line.lineTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-slate-900">
                    <BadgePercent className="h-4 w-4 text-cyan-700" />
                    เงื่อนไขและหมายเหตุ
                  </div>
                  <ul className="space-y-2 text-xs leading-5 text-slate-600">
                    {quotationPricingRules.terms.map(term => (
                      <li key={term} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-700" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                  {customer.note ? (
                    <div className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-700">
                      <strong>หมายเหตุลูกค้า:</strong> {customer.note}
                    </div>
                  ) : null}
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <strong>{formatThaiMoney(totals.subtotal)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <strong>- {formatThaiMoney(totals.discount)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxable amount</span>
                      <strong>{formatThaiMoney(totals.taxableAmount)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT 7%</span>
                      <strong>{formatThaiMoney(totals.vat)}</strong>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <div className="flex justify-between gap-4">
                        <span className="font-display text-base font-bold">
                          Grand total
                        </span>
                        <strong className="font-display text-xl text-cyan-700">
                          {formatThaiMoney(totals.grandTotal)}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 border-t border-slate-200 py-6 text-sm lg:grid-cols-2">
                <div>
                  <div className="font-display font-bold">ขอบเขตงานถัดไป</div>
                  <ol className="mt-3 space-y-2 text-slate-600">
                    <li>1. ทีมงานรับข้อมูลและยืนยันประเภทโครงการ</li>
                    <li>2. นัดสำรวจหน้างาน / ตรวจข้อมูลบิลไฟและโหลด</li>
                    <li>3. ออกแบบระบบและส่งใบเสนอราคาฉบับยืนยันหลังสำรวจ</li>
                  </ol>
                </div>
                <div className="rounded-xl border border-dashed border-slate-300 p-4">
                  <div className="font-display font-bold">ผู้เสนอราคา</div>
                  <div className="mt-8 border-t border-slate-300 pt-3 text-slate-600">
                    SIRINX Sales Engineering Team
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
