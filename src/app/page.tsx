import { auth } from "@/lib/auth";
import { RoleSimulator } from "@/components/navigation/role-simulator";
import { Calendar, Ticket, CreditCard, CheckSquare, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const user = session?.user as { name?: string | null; email?: string | null; role?: string } | undefined;
  const resolvedParams = await searchParams;
  const unauthorized = resolvedParams.unauthorized === "true";

  return (
    <main className="flex-1 py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold border border-primary/10">
            <Sparkles className="h-3.5 w-3.5" />
            Phase 2: Beautiful Application Shell Implemented
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            The Open-Source <span className="text-primary">Event & Ticketing</span> Starter Kit.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Build beautiful public event websites, secure QR-ticketing, dynamic capacities, and flexible merchant payments. Decoupled, modular, and extremely forkable.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-primary text-primary-foreground font-semibold text-sm h-11 px-6 inline-flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <a
                href="#simulator"
                className="rounded-lg bg-primary text-primary-foreground font-semibold text-sm h-11 px-6 inline-flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                Simulate Role & Start
              </a>
            )}
            <Link
              href="/events"
              className="rounded-lg border border-border bg-card text-card-foreground font-semibold text-sm h-11 px-6 inline-flex items-center justify-center hover:bg-muted transition-colors"
            >
              Browse Events
            </Link>
          </div>
        </div>

        {/* Development Simulator Box */}
        <section id="simulator" className="py-8 scroll-mt-20">
          <div className="text-center space-y-3 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Role Simulator</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Test how the global navigation, layout menus, and routes adjust dynamically.
            </p>
          </div>
          <RoleSimulator currentRole={user?.role ?? null} unauthorized={unauthorized} />
        </section>

        {/* Features Grid Teaser */}
        <section className="space-y-8 pt-4">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Features Under Construction</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Our decoupled architecture makes it extremely straightforward to support every core event functionality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="border border-border rounded-xl p-5 bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">Event Creator (Phase 4)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Step-by-step form with venue, dynamic ticket pricing tiers, rich descriptive notes, and custom categories.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5 bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">Decoupled Payments (Phase 7)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Manual Mercado Pago links with secure file receipts validation, transforming to Stripe webhooks easily.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5 bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <Ticket className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">QR Tickets (Phase 8)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cryptographically secure validation hashes rendered as high-fidelity QR codes and beautiful printable PDFs.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5 bg-card space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm">Mobile Check-in (Phase 10)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dedicated responsive viewports for entry scanners to check ticket validities and check in guests instantly.
              </p>
            </div>

          </div>
        </section>

        {/* Getting Started Guide */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 max-w-3xl mx-auto space-y-4">
          <h3 className="font-bold text-lg">Quick Start local development</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Run these commands in your sandbox or command line terminal to seed mock parameters and boot the local server:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-[11px] font-mono leading-relaxed text-foreground">
{`# 1. Install packages
npm install

# 2. Setup the Prisma database
npx prisma generate
npx prisma db push

# 3. Boot Next.js server
npm run dev`}
          </pre>
        </section>

      </div>
    </main>
  );
}
