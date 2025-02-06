import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userRole = session?.user?.role || "eleve"; // ✅ Sécurisation du rôle

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav userRole={userRole} /> {/* ✅ Passe `userRole` en props */}
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
