import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getMockSession } from "@/lib/mock-auth";
import { Calendar, LayoutDashboard, Plus, Ticket } from "lucide-react";
import { HeaderClient } from "./header-client";

export async function Header() {
  const user = await getMockSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/events"
              className="transition-colors hover:text-foreground text-muted-foreground"
            >
              Browse Events
            </Link>
            <Link
              href="/search"
              className="transition-colors hover:text-foreground text-muted-foreground"
            >
              Search
            </Link>
          </nav>
        </div>

        {/* User / Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {user.role === "ORGANIZER" && (
                <Link
                  href="/events/new"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create Event
                </Link>
              )}
              {user.role === "ATTENDEE" && (
                <Link
                  href="/tickets"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Ticket className="h-4 w-4" />
                  My Tickets
                </Link>
              )}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-semibold leading-tight">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground capitalize leading-none">
                    {user.role.toLowerCase()}
                  </span>
                </div>
                <HeaderClient action="logout" />
              </div>
            </>
          ) : (
            <Link
              href="/?mock_selector=open"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-8 px-4 text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {!user && (
            <Link
              href="/?mock_selector=open"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-8 px-3 text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          )}
          <HeaderClient action="menu" user={user} />
        </div>
      </div>
    </header>
  );
}
