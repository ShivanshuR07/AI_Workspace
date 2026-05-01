import { Outlet, Link, useLocation } from "react-router";
import { Bell, Menu, User, LayoutDashboard, FileText, Video, Mail, CheckSquare, History, Settings } from "lucide-react";
import { useState } from "react";
import { AICommandBar } from "./AICommandBar";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/documents", label: "Documents", icon: FileText },
  { path: "/meetings", label: "Meetings", icon: Video },
  { path: "/email", label: "Email Assistant", icon: Mail },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/history", label: "History", icon: History },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[240px] border-r border-sidebar-border bg-sidebar transition-transform md:static md:translate-x-0 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[72px] flex items-center px-6 border-b border-sidebar-border">
          <h2 className="text-sidebar-foreground">AI Workspace</h2>
        </div>
        <nav className="flex-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsNavOpen(false)}
                className={`flex items-center gap-3 px-4 h-10 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      {isNavOpen ? <button aria-label="Close navigation" className="fixed inset-0 z-20 bg-black/30 md:hidden" onClick={() => setIsNavOpen(false)} /> : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="min-h-[72px] border-b border-border px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setIsNavOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <AICommandBar />
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-lg hover:bg-accent flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User className="w-5 h-5" />
            </button>
          </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
