import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  FileText,
  Loader2,
  Mail,
  Phone,
  ReceiptText,
  RefreshCw,
  Zap,
} from "lucide-react";

type QuotationRow = {
  id: number;
  leadId: number | null;
  quoteNumber: string;
  status: string;
  sourceAction: string | null;
  customerName: string;
  customerCompany: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  customerLineId: string | null;
  customerAddress: string | null;
  customerNote: string | null;
  lineItems: string;
  totals: string;
  systemDesign: string | null;
  primaryPanelModel: string | null;
  primaryPanelWatts: number | null;
  subtotal: number;
  discount: number;
  vat: number;
  grandTotal: number;
  issuedAt: string | Date;
  validUntil: string | Date | null;
  createdAt: string | Date;
};

type ParsedQuotationLine = {
  service?: {
    name?: string;
    category?: string;
    description?: string;
  };
  quantity?: number;
  unitPrice?: number;
  lineTotal?: number;
  discountAmount?: number;
  panel?: {
    displayName?: string;
    watts?: number;
  };
  panelLayout?: {
    requestedKwp?: number;
    actualKwp?: number;
    panelCount?: number;
    moduleAreaM2?: number;
    totalWeightKg?: number;
  };
};

type ParsedTotals = {
  subtotal?: number;
  discount?: number;
  vat?: number;
  grandTotal?: number;
  lines?: ParsedQuotationLine[];
};

const statusLabels: Record<string, string> = {
  draft: "ร่าง",
  issued: "ออกใบเสนอราคาแล้ว",
  sent: "ส่งแล้ว",
  accepted: "ยืนยันแล้ว",
  expired: "หมดอายุ",
};

const statusClasses: Record<string, string> = {
  draft: "border-slate-500/30 bg-slate-500/15 text-slate-300",
  issued: "border-cyan-500/30 bg-cyan-500/15 text-cyan-300",
  sent: "border-blue-500/30 bg-blue-500/15 text-blue-300",
  accepted: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  expired: "border-red-500/30 bg-red-500/15 text-red-300",
};

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function formatMoney(value: number | null | undefined) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPrimaryLine(row: QuotationRow) {
  const totals = parseJson<ParsedTotals>(row.totals, {});
  return totals.lines?.find(line => line.panelLayout) ?? totals.lines?.[0] ?? null;
}

export default function AdminQuotations() {
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const {
    data: quotations,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = trpc.quotation.list.useQuery({ limit: 100 });

  const selectedQuote = useMemo(
    () => quotations?.find(item => item.id === selectedQuoteId) as QuotationRow | undefined,
    [quotations, selectedQuoteId]
  );
  const selectedTotals = parseJson<ParsedTotals>(selectedQuote?.totals, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Quotations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            ใบเสนอราคาที่ลูกค้าออกจากหน้าเว็บ พร้อมข้อมูล lead และขนาดระบบจริง
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          รีเฟรช
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ReceiptText className="h-4 w-4 text-primary" />
            รายการใบเสนอราคา
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              กำลังโหลด...
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p>ยังอ่าน quotation database ไม่ได้</p>
              <p className="mt-1 text-xs">{error.message}</p>
            </div>
          ) : !quotations || quotations.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p>ยังไม่มีใบเสนอราคา</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {(quotations as QuotationRow[]).map(row => {
                const primaryLine = getPrimaryLine(row);
                const layout = primaryLine?.panelLayout;
                return (
                  <button
                    key={row.id}
                    type="button"
                    className="block w-full p-4 text-left transition-colors hover:bg-muted/30"
                    onClick={() => setSelectedQuoteId(row.id)}
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-foreground">
                            {row.quoteNumber}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${statusClasses[row.status] ?? ""}`}
                          >
                            {statusLabels[row.status] ?? row.status}
                          </Badge>
                          {row.leadId ? (
                            <Badge variant="outline" className="text-[10px]">
                              Lead #{row.leadId}
                            </Badge>
                          ) : null}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                          {row.customerName}
                          {row.customerCompany ? ` / ${row.customerCompany}` : ""}
                        </div>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          {row.customerPhone ? (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {row.customerPhone}
                            </span>
                          ) : null}
                          {row.customerEmail ? (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {row.customerEmail}
                            </span>
                          ) : null}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(row.createdAt)}
                          </span>
                        </div>
                        {layout ? (
                          <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                            <Badge variant="outline">
                              {layout.actualKwp} kWp
                            </Badge>
                            <Badge variant="outline">
                              {layout.panelCount} แผง
                            </Badge>
                            {row.primaryPanelModel ? (
                              <Badge variant="outline">
                                {row.primaryPanelModel}
                              </Badge>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      <div className="text-left lg:text-right">
                        <div className="font-display text-lg font-bold text-primary">
                          {formatMoney(row.grandTotal)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          VAT {formatMoney(row.vat)}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedQuote}
        onOpenChange={open => {
          if (!open) setSelectedQuoteId(null);
        }}
      >
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {selectedQuote?.quoteNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedQuote ? (
            <div className="space-y-5">
              <div className="grid gap-3 rounded-lg bg-muted/30 p-4 text-sm sm:grid-cols-2">
                <div>
                  <div className="text-xs text-muted-foreground">ลูกค้า</div>
                  <div className="font-medium">{selectedQuote.customerName}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">บริษัท</div>
                  <div className="font-medium">
                    {selectedQuote.customerCompany || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">โทร</div>
                  <div className="font-medium">
                    {selectedQuote.customerPhone || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">อีเมล</div>
                  <div className="font-medium">
                    {selectedQuote.customerEmail || "-"}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border">
                <div className="border-b border-border px-4 py-3 text-sm font-semibold">
                  รายการและขนาดระบบ
                </div>
                <div className="divide-y divide-border">
                  {(selectedTotals.lines ?? []).map((line, index) => (
                    <div key={`${line.service?.name ?? "item"}-${index}`} className="p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="font-medium">
                            {line.service?.name ?? `รายการ ${index + 1}`}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {line.service?.description ?? "-"}
                          </div>
                          {line.panelLayout ? (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <Badge variant="outline">
                                {line.panelLayout.actualKwp} kWp
                              </Badge>
                              <Badge variant="outline">
                                {line.panelLayout.panelCount} แผง
                              </Badge>
                              {line.panel?.displayName ? (
                                <Badge variant="outline">
                                  {line.panel.displayName}
                                </Badge>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {formatMoney(line.lineTotal)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 rounded-lg bg-muted/30 p-4 text-sm sm:grid-cols-4">
                <div>
                  <div className="text-xs text-muted-foreground">Subtotal</div>
                  <div className="font-semibold">
                    {formatMoney(selectedQuote.subtotal)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Discount</div>
                  <div className="font-semibold">
                    {formatMoney(selectedQuote.discount)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">VAT</div>
                  <div className="font-semibold">{formatMoney(selectedQuote.vat)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Grand Total</div>
                  <div className="font-display text-lg font-bold text-primary">
                    {formatMoney(selectedQuote.grandTotal)}
                  </div>
                </div>
              </div>

              {selectedQuote.customerNote ? (
                <div>
                  <div className="mb-1 text-xs text-muted-foreground">
                    หมายเหตุลูกค้า
                  </div>
                  <div className="rounded-lg bg-muted/30 p-3 text-sm">
                    {selectedQuote.customerNote}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
