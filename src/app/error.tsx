"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background text-foreground">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-bold tracking-tight mb-2">
        Something went wrong!
      </h2>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        {error.message || "An unexpected system error occurred. Please try again."}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => { if (typeof window !== "undefined") window.location.href = "/"; }} variant="outline">
          Go Home
        </Button>
      </div>
    </div>
  );
}
