import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import { usePageViewTracking } from "@/hooks/useAnalytics";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import InvestmentTaxHub from "./pages/InvestmentTaxHub";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import SolarAssessment from "./pages/SolarAssessment";
import Partner from "./pages/Partner";
import Strategy from "./pages/Strategy";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLeads from "./pages/admin/Leads";
import AdminBlogCMS from "./pages/admin/BlogCMS";
import AdminContactSubmissions from "./pages/admin/ContactSubmissions";
import AdminAnalytics from "./pages/admin/Analytics";
import FloatingChatWidget from "./components/FloatingChatWidget";

function PublicRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
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

function AdminRouter() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/blog" component={AdminBlogCMS} />
        <Route path="/admin/contacts" component={AdminContactSubmissions} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin routes use DashboardLayout */}
      <Route path="/admin/:rest*" component={AdminRouter} />
      <Route path="/admin" component={AdminRouter} />
      {/* Public routes use public Layout */}
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
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <PageViewTracker />
          <Router />
          <FloatingChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
