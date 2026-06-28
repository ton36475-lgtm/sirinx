import pricingRulesJson from "./pricing-rules.json";

export type PanelSpec = {
  id: string;
  brand: string;
  model: string;
  displayName: string;
  watts: number;
  efficiencyPercent: number;
  moduleType: string;
  dimensionsMm: string;
  areaM2: number;
  weightKg: number;
  sourceUrl: string;
};

export type PricingService = {
  id: string;
  name: string;
  category: string;
  description: string;
  unit: string;
  basePrice: number;
  pricePerKwp?: number;
  minimumPrice?: number;
  typicalCapacity: string;
  recommendedFor: string;
  inclusions: string[];
};

export type PricingRules = {
  brand: string;
  currency: string;
  vat: number;
  defaultValidityDays: number;
  quotePrefix: string;
  defaultPanelId: string;
  salesContact: {
    company: string;
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  panelCatalog: PanelSpec[];
  services: PricingService[];
  terms: string[];
};

export type QuotationLineInput = {
  serviceId: string;
  quantity: number;
  discountPercent?: number;
  customUnitPrice?: number;
  targetKwp?: number;
  panelModelId?: string;
};

export type PanelLayout = {
  panelCount: number;
  requestedKwp: number;
  actualKwp: number;
  moduleAreaM2: number;
  totalWeightKg: number;
};

export type QuotationLine = QuotationLineInput & {
  service: PricingService;
  panel: PanelSpec | null;
  panelLayout: PanelLayout | null;
  unitPrice: number;
  lineSubtotal: number;
  lineDiscount: number;
  lineTotal: number;
};

export type QuotationTotals = {
  lines: QuotationLine[];
  subtotal: number;
  discount: number;
  taxableAmount: number;
  vat: number;
  grandTotal: number;
};

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export const quotationPricingRules = pricingRulesJson as PricingRules;

export function getQuotationService(serviceId: string) {
  return quotationPricingRules.services.find(service => service.id === serviceId);
}

export function getPanelSpec(panelModelId?: string) {
  const panelId = panelModelId || quotationPricingRules.defaultPanelId;
  return (
    quotationPricingRules.panelCatalog.find(panel => panel.id === panelId) ||
    quotationPricingRules.panelCatalog[0] ||
    null
  );
}

export function normalizeQuoteQuantity(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.round(value));
}

export function normalizeDiscountPercent(value: number | undefined) {
  if (!Number.isFinite(value ?? 0)) return 0;
  return Math.min(Math.max(value ?? 0, 0), 80);
}

export function normalizeTargetKwp(value: number | undefined) {
  if (!Number.isFinite(value ?? 0)) return undefined;
  const normalized = Math.round(Math.max(value ?? 0, 0) * 100) / 100;
  return normalized > 0 ? normalized : undefined;
}

export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundEngineering(value: number, digits = 2) {
  const multiplier = 10 ** digits;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

export function calculatePanelLayout(
  targetKwp: number | undefined,
  panel: PanelSpec | null
): PanelLayout | null {
  const requestedKwp = normalizeTargetKwp(targetKwp);
  if (!requestedKwp || !panel) return null;

  const panelCount = Math.ceil((requestedKwp * 1000) / panel.watts);
  const actualKwp = roundEngineering((panelCount * panel.watts) / 1000, 2);

  return {
    panelCount,
    requestedKwp,
    actualKwp,
    moduleAreaM2: roundEngineering(panelCount * panel.areaM2, 1),
    totalWeightKg: roundEngineering(panelCount * panel.weightKg, 1),
  };
}

export function calculateServiceUnitPrice(
  service: PricingService,
  targetKwp?: number,
  customUnitPrice?: number
) {
  if (Number.isFinite(customUnitPrice) && customUnitPrice !== undefined) {
    return Math.max(0, customUnitPrice);
  }

  const normalizedKwp = normalizeTargetKwp(targetKwp);
  if (normalizedKwp && service.pricePerKwp) {
    return Math.max(
      service.minimumPrice ?? 0,
      roundMoney(normalizedKwp * service.pricePerKwp)
    );
  }

  return service.basePrice;
}

export function calculateQuotation(
  lineInputs: QuotationLineInput[],
  vatRate = quotationPricingRules.vat
): QuotationTotals {
  const lines: QuotationLine[] = [];

  for (const input of lineInputs) {
    const service = getQuotationService(input.serviceId);
    if (!service) continue;

    const quantity = normalizeQuoteQuantity(input.quantity);
    const discountPercent = normalizeDiscountPercent(input.discountPercent);
    const targetKwp = normalizeTargetKwp(input.targetKwp);
    const panel = targetKwp ? getPanelSpec(input.panelModelId) : null;
    const panelLayout = calculatePanelLayout(targetKwp, panel);
    const unitPrice = calculateServiceUnitPrice(
      service,
      targetKwp,
      input.customUnitPrice
    );
    const lineSubtotal = roundMoney(unitPrice * quantity);
    const lineDiscount = roundMoney(lineSubtotal * (discountPercent / 100));
    const lineTotal = roundMoney(lineSubtotal - lineDiscount);

    lines.push({
      ...input,
      service,
      quantity,
      discountPercent,
      targetKwp,
      panelModelId: panel?.id ?? input.panelModelId,
      panel,
      panelLayout,
      unitPrice,
      lineSubtotal,
      lineDiscount,
      lineTotal,
    });
  }

  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.lineSubtotal, 0));
  const discount = roundMoney(lines.reduce((sum, line) => sum + line.lineDiscount, 0));
  const taxableAmount = roundMoney(Math.max(0, subtotal - discount));
  const vat = roundMoney(taxableAmount * vatRate);
  const grandTotal = roundMoney(taxableAmount + vat);

  return {
    lines,
    subtotal,
    discount,
    taxableAmount,
    vat,
    grandTotal,
  };
}

function pad(value: number, length: number) {
  return String(value).padStart(length, "0");
}

export function formatQuoteDateKey(date: Date) {
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1, 2);
  const dd = pad(date.getDate(), 2);
  return `${yyyy}${mm}${dd}`;
}

export function generateQuotationNumber(date: Date, sequence: number) {
  return `${quotationPricingRules.quotePrefix}-${formatQuoteDateKey(date)}-${pad(sequence, 4)}`;
}

export function reserveLocalQuotationNumber(
  date = new Date(),
  storage?: StorageLike
) {
  const dateKey = formatQuoteDateKey(date);
  const storageKey = `sirinx:quote-counter:${dateKey}`;
  const current = storage ? Number(storage.getItem(storageKey) ?? "0") : 0;
  const next = Number.isFinite(current) ? current + 1 : 1;
  storage?.setItem(storageKey, String(next));
  return generateQuotationNumber(date, next);
}

export function parseKwpValue(value: string | null | undefined) {
  if (!value) return undefined;
  const normalized = value.replace(/,/g, "");
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  return normalizeTargetKwp(Number(match[1]));
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function formatThaiDate(date: Date) {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatThaiMoney(value: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: quotationPricingRules.currency,
    maximumFractionDigits: 0,
  }).format(value);
}
