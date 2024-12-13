import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";

export function DashboardNav() {
  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center gap-8 text-sm">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="Expense AI Logo" 
              width={32} 
              height={32} 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold">Expense AI</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="text-md transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link 
            href="/dashboard/analytics" 
            className="text-md transition-colors hover:text-primary"
          >
            Analytics
          </Link>
          <Link 
            href="/dashboard/profile" 
            className="text-md transition-colors hover:text-primary"
          >
            Profile
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <button className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
