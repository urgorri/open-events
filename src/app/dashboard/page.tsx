import { getMockSession } from "@/lib/mock-auth";
import { BarChart3, Calendar, DollarSign, Activity, Ticket } from "lucide-react";

export default async function DashboardPage() {
  const user = await getMockSession();

  if (!user) {
    return null; // layout will redirect
  }

  return (
    <div className="space-y-6">
      {/* Welcome Heading */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-sm text-muted-foreground">
            Here is what is happening with your {user.role.toLowerCase()} account today.
          </p>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
          {user.role.toLowerCase()} Session
        </div>
      </div>

      {/* Analytics Widget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-border rounded-xl bg-card text-card-foreground p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Sales</span>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold">$24,500</span>
            <span className="text-[10px] text-muted-foreground mt-1">+12% from last week</span>
          </div>
        </div>

        <div className="border border-border rounded-xl bg-card text-card-foreground p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tickets Sold</span>
            <Ticket className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold">342 / 500</span>
            <span className="text-[10px] text-muted-foreground mt-1">68.4% capacity reached</span>
          </div>
        </div>

        <div className="border border-border rounded-xl bg-card text-card-foreground p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Checked In</span>
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold">124</span>
            <span className="text-[10px] text-muted-foreground mt-1">36.2% attendee entry rate</span>
          </div>
        </div>

        <div className="border border-border rounded-xl bg-card text-card-foreground p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Events</span>
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold">3</span>
            <span className="text-[10px] text-muted-foreground mt-1">2 upcoming, 1 draft</span>
          </div>
        </div>
      </div>

      {/* Detailed Section Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Activity */}
        <div className="border border-border rounded-xl bg-card p-6 lg:col-span-2 space-y-4">
          <h2 className="font-bold text-sm tracking-tight flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Recent Activity Log
          </h2>
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 border-l-2 border-primary pl-4 py-1">
              <div className="flex flex-col">
                <p className="text-xs font-semibold">Mercado Pago order approved manually</p>
                <span className="text-[10px] text-muted-foreground">Order #3a7f-d1 - $4,500 - 2m ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-l-2 border-border pl-4 py-1">
              <div className="flex flex-col">
                <p className="text-xs font-semibold">New ticket generated</p>
                <span className="text-[10px] text-muted-foreground">Ticket #hash-889a - 15m ago</span>
              </div>
            </div>
            <div className="flex items-start gap-3 border-l-2 border-border pl-4 py-1">
              <div className="flex flex-col">
                <p className="text-xs font-semibold">Draft event updated: &quot;JS Tech Summit&quot;</p>
                <span className="text-[10px] text-muted-foreground">Organizer session - 1h ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="border border-border rounded-xl bg-card p-6 space-y-4">
          <h2 className="font-bold text-sm tracking-tight flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            System Insights
          </h2>
          <ul className="space-y-3 text-xs text-muted-foreground leading-relaxed pt-2">
            <li className="flex gap-2 items-start">
              <span className="text-primary font-bold">•</span>
              <span>Your gate controllers should use the mobile drawer viewport to operate entry QR-scanners.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-primary font-bold">•</span>
              <span>All payment identifiers are compiled using UUIDv4 values to protect against sequence leakage.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-primary font-bold">•</span>
              <span>Use the homepage role switcher to swap simulated contexts and explore additional features.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
