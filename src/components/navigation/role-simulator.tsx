"use client";

import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Shield, Briefcase, User, LogOut, Info } from "lucide-react";

interface RoleSimulatorProps {
  currentRole: string | null;
  unauthorized?: boolean;
}

export function RoleSimulator({ currentRole, unauthorized }: RoleSimulatorProps) {
  const [selected, setSelected] = useState<string>(currentRole || "GUEST");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async (role: string) => {
    setLoading(true);
    setSelected(role);

    if (role === "GUEST") {
      await signOut({ redirect: true, callbackUrl: "/" });
      return;
    }

    // In a real application, you'd have a proper sign in form.
    // Since we are mocking with credentials, we sign in with standard testing credentials.
    await signIn("credentials", {
      email: `${role.toLowerCase()}@example.com`,
      password: "password123",
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="border border-border rounded-xl bg-card text-card-foreground p-6 shadow-sm max-w-lg mx-auto w-full space-y-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-sm">Interactive Dev Simulator</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Since this project is in the initial development phase, use this box to switch roles. Watch how the global header, layout sidebar, and authorized pathways adapt instantly.
          </p>
        </div>
      </div>

      {unauthorized && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-lg flex items-center gap-2">
          <span>⚠️ Access Denied: You must simulate a role (e.g. Organizer or Admin) to access the Dashboard.</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button
          variant={selected === "ATTENDEE" ? "default" : "outline"}
          onClick={() => handleRoleChange("ATTENDEE")}
          disabled={loading}
          className="flex items-center gap-2 justify-center h-10 text-xs font-semibold"
        >
          <User className="h-4 w-4" />
          Attendee
        </Button>

        <Button
          variant={selected === "ORGANIZER" ? "default" : "outline"}
          onClick={() => handleRoleChange("ORGANIZER")}
          disabled={loading}
          className="flex items-center gap-2 justify-center h-10 text-xs font-semibold"
        >
          <Briefcase className="h-4 w-4" />
          Organizer
        </Button>

        <Button
          variant={selected === "ADMIN" ? "default" : "outline"}
          onClick={() => handleRoleChange("ADMIN")}
          disabled={loading}
          className="flex items-center gap-2 justify-center h-10 text-xs font-semibold col-span-2 sm:col-span-1"
        >
          <Shield className="h-4 w-4" />
          Admin Platform
        </Button>

        <Button
          variant={selected === "GUEST" ? "secondary" : "outline"}
          onClick={() => handleRoleChange("GUEST")}
          disabled={loading}
          className="flex items-center gap-2 justify-center h-10 text-xs font-semibold col-span-2 sm:col-span-1"
        >
          <LogOut className="h-4 w-4" />
          Guest (Sign Out)
        </Button>
      </div>

      <div className="text-center pt-2">
        <p className="text-[10px] text-muted-foreground">
          Current simulated session: <span className="font-bold text-foreground uppercase">{selected}</span>
        </p>
      </div>
    </div>
  );
}
