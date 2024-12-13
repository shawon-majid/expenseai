"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, User } from "lucide-react";

export function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart2
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User
    }
  ];

  return (
    <nav className="border-b bg-card">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-8">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Expense AI
          </h1>
        </Link>
        <div className="flex items-center space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
