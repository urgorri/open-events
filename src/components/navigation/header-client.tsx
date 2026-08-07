"use client";

import React, { useState } from "react";
import { setMockRole } from "@/lib/mock-auth-actions";
import { LogOut, Menu, X, LayoutDashboard, Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderClientProps {
  action: "logout" | "menu";
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export function HeaderClient({ action, user }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await setMockRole("GUEST");
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  if (action === "logout") {
    return (
      <Button
        variant="ghost"
        size="icon-xs"
        title="Sign Out"
        onClick={handleLogout}
        className="text-muted-foreground hover:text-destructive transition-colors"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    );
  }

  // Hamburger Menu for Mobile
  return (
    <>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        className="text-foreground"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-50 bg-background/98 p-6 flex flex-col justify-between border-t border-border md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Navigation
            </p>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/events"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Browse Events
              </Link>
              <Link
                href="/search"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Search Events
              </Link>

              {user && (
                <>
                  <div className="h-px bg-border my-2" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    User Actions ({user.role})
                  </p>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  {user.role === "ORGANIZER" && (
                    <Link
                      href="/events/new"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      Create Event
                    </Link>
                  )}
                  {user.role === "ATTENDEE" && (
                    <Link
                      href="/tickets"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      <Ticket className="h-5 w-5" />
                      My Tickets
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>

          {user && (
            <div className="border-t border-border pt-4 flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{user.name}</span>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              <Button
                variant="destructive"
                className="w-full flex items-center justify-center gap-2 h-9"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
