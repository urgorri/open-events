import { redirect } from "next/navigation";
import { getMockSession } from "@/lib/mock-auth";
import { Sidebar } from "@/components/navigation/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMockSession();

  // If no mock session exists, redirect to home page with instructions
  if (!user) {
    redirect("/?mock_selector=open&unauthorized=true");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">
      {/* Dashboard Sidebar */}
      <Sidebar user={user} />

      {/* Main Panel Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background overflow-x-hidden">
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
