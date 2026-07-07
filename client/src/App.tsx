import { Route, Switch } from "wouter";
import { Suspense, lazy, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import RouteSeo from "./components/RouteSeo";
import { usePageViewTracking, useTrackLINEClick } from "@/hooks/useAnalytics";
import AntiCopy from "./components/AntiCopy";
import AILiveAvatarMark from "./components/AILiveAvatarMark";
import FooterLineOA from "./components/FooterLineOA";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Solutions = lazy(() => import("./pages/Solutions"));
const HomeSolution = lazy(() => import("./pages/HomeSolution"));
const Industries = lazy(() => import("./pages/Industries"));
const InvestmentTaxHub = lazy(() => import("./pages/InvestmentTaxHub"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const SolarAssessment = lazy(() => import("./pages/SolarAssessment"));
const Partner = lazy(() => import("./pages/Partner"));
const Strategy = lazy(() => import("./pages/Strategy"));
const SolarCarport = lazy(() => import("./pages/SolarCarport"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminLeads = lazy(() => import("./pages/admin/Leads"));
const AdminBlogCMS = lazy(() => import("./pages/admin/BlogCMS"));
const AdminContactSubmissions = lazy(
  () => import("./pages/admin/ContactSubmissions")
);
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminAgentMonitor = lazy(() => import("./pages/admin/AgentMonitor"));
const FloatingChatWidget = lazy(
  () => import("./components/FloatingChatWidget")
);
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then(module => ({ default: module.Toaster }))
);

const LINE_OA_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_LINE_OA_URL) ||
  "https://lin.ee/WSAn5L4";

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-accent-primary/30 border-t-accent-primary animate-spin" />
      </div>
    </div>
  );
}

function LineOAQuickActionStyles() {
  return (
    <style>{`
      .sx-fab-stack {
        --sx-navy: #0a1628;
        --sx-navy-2: #122340;
        --sx-gold: #f2b134;
        --sx-gold-soft: #f2b13455;
        --sx-line: #06c755;
        --sx-line-dark: #05a648;
        --sx-ink: #eef1f6;
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 14px;
      }

      .sx-line-btn {
        --size: 56px;
        position: relative;
        display: flex;
        width: var(--size);
        height: var(--size);
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 0;
        background: var(--sx-line);
        color: #fff;
        box-shadow: 0 10px 26px #06c75555, 0 2px 6px #0006;
        transition:
          box-shadow 0.25s ease,
          transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
          background-color 0.25s ease;
      }

      .sx-line-btn:hover {
        transform: translateY(-3px) scale(1.05);
        background: var(--sx-line-dark);
        box-shadow: 0 14px 32px #06c75577, 0 3px 8px #0007;
      }

      .sx-line-btn:active {
        transform: translateY(0) scale(0.97);
      }

      .sx-line-btn:focus-visible {
        outline: 2px solid var(--sx-gold);
        outline-offset: 3px;
      }

      .sx-line-btn::before {
        content: "";
        position: absolute;
        inset: -6px;
        border-radius: inherit;
        border: 2px solid var(--sx-gold);
        opacity: 0;
        pointer-events: none;
        animation:
          sx-line-ray 2.6s ease-out 3,
          sx-line-ray-loop 4.5s ease-out 8s infinite;
      }

      .sx-line-btn svg {
        position: relative;
        z-index: 1;
        width: 28px;
        height: 28px;
      }

      .sx-label {
        position: absolute;
        top: 50%;
        right: calc(100% + 12px);
        transform: translateY(-50%) translateX(6px);
        z-index: 2;
        padding: 8px 14px 8px 16px;
        border-radius: 10px;
        border: 1px solid var(--sx-gold-soft);
        background: var(--sx-navy-2);
        color: var(--sx-ink);
        font-size: 13px;
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        clip-path: polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 50%);
        transition:
          opacity 0.2s ease,
          transform 0.2s ease;
      }

      .sx-line-btn:hover .sx-label,
      .sx-line-btn:focus-visible .sx-label {
        opacity: 1;
        transform: translateY(-50%) translateX(0);
      }

      @keyframes sx-line-ray {
        0% {
          opacity: 0.65;
          transform: scale(0.85);
        }
        100% {
          opacity: 0;
          transform: scale(1.6);
        }
      }

      @keyframes sx-line-ray-loop {
        0% {
          opacity: 0.5;
          transform: scale(0.9);
        }
        100% {
          opacity: 0;
          transform: scale(1.5);
        }
      }

      @media (min-width: 640px) {
        .sx-fab-stack {
          right: 24px;
          bottom: 24px;
        }
      }

      @media (max-width: 420px) {
        .sx-label {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .sx-line-btn,
        .sx-line-btn::before,
        .sx-label {
          animation: none;
          transition: none;
        }
      }
    `}</style>
  );
}

function DeferredFloatingChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const trackLINEClick = useTrackLINEClick();

  const handleLineOAClick = () => {
    trackLINEClick("floating_line_oa_quick_action");

    try {
      const analyticsWindow = window as typeof window & {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
      };
      analyticsWindow.gtag?.("event", "line_oa_click", {
        source: "floating_button",
      });
      analyticsWindow.dataLayer?.push({
        event: "line_oa_click",
        source: "floating_button",
      });
    } catch {
      // Analytics integrations are optional and must never block navigation.
    }
  };

  if (!shouldLoad) {
    return (
      <>
        <LineOAQuickActionStyles />
        <div className="sx-fab-stack">
          <a
            id="sxLineOA"
            className="sx-line-btn"
            href={LINE_OA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="เพิ่มเพื่อน LINE Official Account ของ SIRINX"
            title="เพิ่มเพื่อน LINE Official Account ของ SIRINX"
            onClick={handleLineOAClick}
          >
            <span className="sx-label">คุยกับเราทาง LINE</span>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 5.69 2 10.2c0 3.99 3.44 7.33 8.14 8.02.4.13.71.4.71.87 0 .27-.06.7-.09 1.09-.03.32-.16.9.65.49.8-.41 4.36-2.57 5.95-4.4C19.06 14.5 22 12.6 22 10.2 22 5.69 17.52 2 12 2z" />
            </svg>
          </a>
          <button
            type="button"
            aria-label="เปิดแชท SIRINX Solar Assistant"
            className="sirinx-live-avatar-trigger relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #06b6d4 0%, #0d9488 50%, #00C300 100%)",
            }}
            onClick={() => setShouldLoad(true)}
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-20 animate-ping" />
            <span className="sirinx-live-avatar-orbit sirinx-live-avatar-orbit-a" />
            <span className="sirinx-live-avatar-orbit sirinx-live-avatar-orbit-b" />
            <span className="sirinx-live-avatar-trail sirinx-live-avatar-trail-a" />
            <span className="sirinx-live-avatar-trail sirinx-live-avatar-trail-b" />
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400/30 to-green-400/30" />
            <span className="sirinx-live-avatar-core relative flex items-center justify-center">
              <AILiveAvatarMark className="h-14 w-14 drop-shadow-md" />
            </span>
            <span className="absolute -top-0.5 -right-0.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#00C300] text-[9px] font-bold text-white shadow-md">
              AI
            </span>
          </button>
        </div>
      </>
    );
  }

  return (
    <Suspense fallback={null}>
      <FloatingChatWidget initialOpen />
    </Suspense>
  );
}

function FooterLineOAPortal() {
  const [footerTarget, setFooterTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const resolveTarget = () => {
      const target = document.querySelector("footer .lg\\:col-span-2");
      setFooterTarget(target instanceof HTMLElement ? target : null);
    };

    resolveTarget();

    const observer = new MutationObserver(resolveTarget);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!footerTarget) return null;

  return createPortal(<FooterLineOA />, footerTarget);
}

function DeferredToaster() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const reveal = () => setShouldLoad(true);
    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];

    for (const event of events) {
      window.addEventListener(event, reveal, { once: true, passive: true });
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, reveal);
      }
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
    </Suspense>
  );
}

function PublicRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/solar-carport/:province" component={SolarCarport} />
        <Route path="/solar-carport" component={SolarCarport} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/home-solution" component={HomeSolution} />
        <Route path="/industries" component={Industries} />
        <Route path="/investment" component={InvestmentTaxHub} />
        <Route path="/projects" component={Projects} />
        <Route path="/strategy" component={Strategy} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route path="/assessment" component={SolarAssessment} />
        <Route path="/partner" component={Partner} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AdminRouter() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/blog" component={AdminBlogCMS} />
        <Route path="/admin/contacts" component={AdminContactSubmissions} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route path="/admin/agent-monitor" component={AdminAgentMonitor} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function isInternalHost() {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname.toLowerCase();
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  )
    return true;
  if (hostname === "dev.sirinx.co") return true;
  if (/^10\./.test(hostname) || /^192\.168\./.test(hostname)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) return true;

  return false;
}

function Router() {
  const internalRoutesEnabled = isInternalHost();

  return (
    <Switch>
      {internalRoutesEnabled ? (
        <Route path="/admin/:rest*" component={AdminRouter} />
      ) : null}
      {internalRoutesEnabled ? (
        <Route path="/admin" component={AdminRouter} />
      ) : null}
      {!internalRoutesEnabled ? (
        <Route path="/admin/:rest*" component={NotFound} />
      ) : null}
      {!internalRoutesEnabled ? (
        <Route path="/admin" component={NotFound} />
      ) : null}
      <Route component={PublicRouter} />
    </Switch>
  );
}

function PageViewTracker() {
  usePageViewTracking();
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark" switchable>
          <DeferredToaster />
          <RouteSeo />
          <PageViewTracker />
          <AntiCopy enabled={import.meta.env.PROD} />
          <Suspense fallback={<RouteFallback />}>
            <Router />
          </Suspense>
          <FooterLineOAPortal />
          <DeferredFloatingChatWidget />
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
