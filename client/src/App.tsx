import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { Suspense, lazy, useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import { usePageViewTracking } from "@/hooks/useAnalytics";
import AntiCopy from "./components/AntiCopy";

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
const FloatingChatWidget = lazy(() => import("./components/FloatingChatWidget"));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-accent-primary/30 border-t-accent-primary animate-spin" />
      </div>
    </div>
  );
}

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
        <Route path="/about" component={About} />
        <Route path="/solar-carport" component={SolarCarport} />
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
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin/:rest*" component={NotFound} />
      <Route path="/admin" component={NotFound} />
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
