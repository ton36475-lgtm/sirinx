import { useTrackLINEClick } from "@/hooks/useAnalytics";

const LINE_OA_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_LINE_OA_URL) ||
  "https://lin.ee/sirinx";
const LINE_OA_QR_URL = "/assets/line/sirinx-line-oa-qr.svg";

export default function FooterLineOA() {
  const trackLINEClick = useTrackLINEClick();

  const handleClick = () => {
    trackLINEClick("footer_line_oa_qr");

    try {
      const analyticsWindow = window as typeof window & {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
      };
      analyticsWindow.gtag?.("event", "line_oa_click", {
        source: "footer_qr",
      });
      analyticsWindow.dataLayer?.push({
        event: "line_oa_click",
        source: "footer_qr",
      });
    } catch {
      // Optional analytics must never block navigation.
    }
  };

  return (
    <section
      aria-labelledby="footer-line-oa-title"
      className="mt-6 max-w-sm rounded-2xl border border-[#06C755]/30 bg-[#06C755]/10 p-4"
    >
      <div className="flex items-start gap-4">
        <a
          href={LINE_OA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="shrink-0 rounded-xl bg-white p-2 shadow-lg shadow-black/10 ring-1 ring-[#06C755]/20 transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          aria-label="สแกนหรือกดเพื่อเพิ่มเพื่อน LINE Official Account ของ SIRINX"
          title="เพิ่มเพื่อน LINE Official Account ของ SIRINX"
        >
          <img
            src={LINE_OA_QR_URL}
            alt="QR Code เพิ่มเพื่อน LINE Official Account ของ SIRINX"
            width={104}
            height={104}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 rounded-lg object-contain"
          />
        </a>
        <div className="min-w-0 flex-1">
          <p
            id="footer-line-oa-title"
            className="font-display text-sm font-semibold text-foreground"
          >
            LINE Official Account
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            สแกน QR หรือกดเพิ่มเพื่อน เพื่อปรึกษา Solar Carport, BESS และ AI
            Energy กับทีม SIRINX
          </p>
          <a
            href={LINE_OA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#06C755] px-3 py-2 text-xs font-bold text-white shadow-lg shadow-[#06C755]/20 transition hover:bg-[#05A648] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:ring-offset-2 focus:ring-offset-background"
          >
            เพิ่มเพื่อน LINE OA
          </a>
          <p className="mt-2 text-[11px] text-text-muted">LINE ID: @sirinx</p>
        </div>
      </div>
    </section>
  );
}
