"use client";

import { DashboardNav } from "@/components/dashboard/nav";
import { Settings, Bell, Shield, CreditCard, LogOut } from "lucide-react";

export default function ProfilePage() {
  const menuItems = [
    {
      title: "Account Settings",
      description: "Manage your account details and preferences",
      icon: Settings,
      onClick: () => console.log("Settings clicked")
    },
    {
      title: "Notifications",
      description: "Configure how you want to be notified",
      icon: Bell,
      onClick: () => console.log("Notifications clicked")
    },
    {
      title: "Privacy & Security",
      description: "Manage your security preferences",
      icon: Shield,
      onClick: () => console.log("Privacy clicked")
    },
    {
      title: "Payment Methods",
      description: "Add or remove payment methods",
      icon: CreditCard,
      onClick: () => console.log("Payment clicked")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="bg-card rounded-lg p-6 flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                SM
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg hover:bg-primary/90">
                <Settings className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Shawon Majid</h1>
              <p className="text-muted-foreground">shawon@example.com</p>
              <p className="text-sm text-muted-foreground mt-1">Member since December 2023</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-muted-foreground text-sm">Total Expenses</div>
              <div className="text-2xl font-bold mt-1">$2,459.50</div>
              <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-muted-foreground text-sm">Categories Used</div>
              <div className="text-2xl font-bold mt-1">8</div>
              <div className="text-xs text-muted-foreground mt-1">Most used: Food</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-muted-foreground text-sm">Expense Entries</div>
              <div className="text-2xl font-bold mt-1">45</div>
              <div className="text-xs text-muted-foreground mt-1">This month</div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-card hover:bg-accent rounded-lg p-4 border transition-colors flex items-center space-x-4"
              >
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <button className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg p-4 transition-colors flex items-center justify-center space-x-2">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </main>
    </div>
  );
}
