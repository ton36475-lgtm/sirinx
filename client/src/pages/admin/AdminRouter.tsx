import { Route, Switch } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLeads from "@/pages/admin/Leads";
import AdminQuotations from "@/pages/admin/Quotations";
import AdminBlogCMS from "@/pages/admin/BlogCMS";
import AdminContactSubmissions from "@/pages/admin/ContactSubmissions";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminAgentMonitor from "@/pages/admin/AgentMonitor";

export default function AdminRouter() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/quotations" component={AdminQuotations} />
        <Route path="/admin/blog" component={AdminBlogCMS} />
        <Route path="/admin/contacts" component={AdminContactSubmissions} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route path="/admin/agent-monitor" component={AdminAgentMonitor} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}
