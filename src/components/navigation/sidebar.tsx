"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MockUser } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  LayoutDashboard,
  Users,
  Settings,
  Ticket,
  BarChart3,
  QrCode,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

interface SidebarProps {
  user: MockUser;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Group links by role
  const getLinks = () => {
    switch (user.role) {
      case "ADMIN":
        return [
          {
            title: "Admin Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Manage Users",
            href: "/dashboard/admin/users",
            icon: Users,
          },
          {
            title: "Global Settings",
            href: "/dashboard/admin/settings",
            icon: Settings,
          },
        ];
      case "ORGANIZER":
        return [
          {
            title: "Organizer Overview",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "My Events",
            href: "/dashboard/events",
            icon: Calendar,
          },
          {
            title: "Orders Verification",
            href: "/dashboard/orders",
            icon: Ticket,
          },
          {
            title: "Attendees List",
            href: "/dashboard/attendees",
            icon: Users,
          },
          {
            title: "QR Check-in Scanner",
            href: "/dashboard/check-in",
            icon: QrCode,
          },
          {
            title: "Analytics Reports",
            href: "/dashboard/analytics",
            icon: BarChart3,
          },
        ];
      case "ATTENDEE":
      default:
        return [
          {
            title: "Attendee Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "My Tickets",
            href: "/tickets",
            icon: Ticket,
          },
          {
            title: "Order History",
            href: "/dashboard/history",
            icon: FileSpreadsheet,
          },
        ];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Mobile Top Header for Sidebar Toggle */}
      <div className="flex md:hidden items-center justify-between px-4 h-12 border-b border-border bg-card text-foreground sticky top-14 z-40">
        <span className="text-xs font-semibold capitalize">
          {user.role.toLowerCase()} Area
        </span>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar navigation container */}
      <aside
        className={cn(
          "fixed top-14 bottom-0 left-0 z-30 flex flex-col border-r border-border bg-card text-card-foreground transition-all duration-300 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)]",
          isCollapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* User Card */}
        <div className={cn("p-4 border-b border-border flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate leading-tight">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate capitalize leading-none">{user.role.toLowerCase()}</span>
            </div>
          )}
        </div>

        {/* Links Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                title={link.title}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "")} />
                {!isCollapsed && <span className="truncate">{link.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Collapse Toggle */}
        <div className="hidden md:flex p-2 border-t border-border justify-end">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* Mobile background overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
