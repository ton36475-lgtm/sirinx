import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { Suspense, lazy, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import RouteSeo from "./components/RouteSeo";
import { usePageViewTracking } from "@/hooks/useAnalytics";
import AntiCopy from "./components/AntiCopy";
import type { AeoPageId } from "@/lib/aeoContent";

const NotFound = lazy(() => import("@/pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Solutions = lazy(() => import("./pages/Solutions"));
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
const AeoPage = lazy(() => import("./pages/AeoPage"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const FloatingChatWidget = lazy(() => import("./components/FloatingChatWidget"));

const INTERNAL_ROUTES_BUILD_ENABLED =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_INTERNAL_ROUTES === "true";

const adminModules = INTERNAL_ROUTES_BUILD_ENABLED
  ? {
      DashboardLayout: lazy(() => import("./components/DashboardLayout")),
      AdminDashboard: lazy(() => import("./pages/admin/Dashboard")),
      AdminLeads: lazy(() => import("./pages/admin/Leads")),
      AdminBlogCMS: lazy(() => import("./pages/admin/BlogCMS")),
      AdminContactSubmissions: lazy(() => import("./pages/admin/ContactSubmissions")),
      AdminAnalytics: lazy(() => import("./pages/admin/Analytics")),
      AdminAgentMonitor: lazy(() => import("./pages/admin/AgentMonitor")),
    }
  : null;

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-accent-primary/30 border-t-accent-primary animate-spin" />
      </div>
    </div>
  );
}

function createAeoRoute(pageId: AeoPageId) {
  return function AeoRoute() {
    return <AeoPage pageId={pageId} />;
  };
}

const WhatIsSirinxPage = createAeoRoute("what-is-sirinx");
const SirinxGodAiPage = createAeoRoute("sirinx-god-ai");
const AiLoadControlPage = createAeoRoute("ai-load-control");
const DynamicRoiPage = createAeoRoute("dynamic-roi");
const PredictiveMaintenancePage = createAeoRoute("predictive-maintenance");
const SirinxComparisonPage = createAeoRoute("sirinx-vs-normal-solar-monitoring");
const FaqPage = createAeoRoute("faq");
const GlossaryPage = createAeoRoute("glossary");

function DeferredFloatingChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const reveal = () => setShouldLoad(true);
    const timeout = window.setTimeout(reveal, 1800);
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart"];

    for (const event of events) {
      window.addEventListener(event, reveal, { once: true, passive: true });
    }

    return () => {
      window.clearTimeout(timeout);
      for (const event of events) {
        window.removeEventListener(event, reveal);
      }
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <FloatingChatWidget />
    </Suspense>
  );
}

function PublicRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/what-is-sirinx" component={WhatIsSirinxPage} />
        <Route path="/sirinx-god-ai" component={SirinxGodAiPage} />
        <Route path="/about" component={About} />
        <Route path="/solar-carport" component={SolarCarport} />
        <Route path="/features/ai-load-control" component={AiLoadControlPage} />
        <Route path="/features/dynamic-roi" component={DynamicRoiPage} />
        <Route path="/features/predictive-maintenance" component={PredictiveMaintenancePage} />
        <Route path="/compare/sirinx-vs-normal-solar-monitoring" component={SirinxComparisonPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/glossary" component={GlossaryPage} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/solutions" component={Solutions} />
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
  if (!adminModules) return <NotFound />;

  const {
    DashboardLayout,
    AdminDashboard,
    AdminLeads,
    AdminBlogCMS,
    AdminContactSubmissions,
    AdminAnalytics,
    AdminAgentMonitor,
  } = adminModules;

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
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return true;
  if (hostname === "dev.sirinx.co") return true;
  if (/^10\./.test(hostname) || /^192\.168\./.test(hostname)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)) return true;

  return false;
}

function Router() {
  const internalRoutesEnabled = INTERNAL_ROUTES_BUILD_ENABLED ? isInternalHost() : false;

  return (
    <Switch>
      {internalRoutesEnabled ? <Route path="/admin/:rest*" component={AdminRouter} /> : null}
      {internalRoutesEnabled ? <Route path="/admin" component={AdminRouter} /> : null}
      {!internalRoutesEnabled ? <Route path="/admin/:rest*" component={NotFound} /> : null}
      {!internalRoutesEnabled ? <Route path="/admin" component={NotFound} /> : null}
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
          <TooltipProvider>
            <Toaster />
            <RouteSeo />
            <PageViewTracker />
            <AntiCopy enabled={import.meta.env.PROD} />
            <Suspense fallback={<RouteFallback />}>
              <Router />
            </Suspense>
            <DeferredFloatingChatWidget />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
