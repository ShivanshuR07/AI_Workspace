import { Outlet, Link, useLocation } from "react-router";
import { Search, Bell, User, LayoutDashboard, FileText, Video, Mail, CheckSquare, History, Settings } from "lucide-react";

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

  return (
    <div className="flex h-screen w-[1440px] bg-background mx-auto">
      {/* Sidebar */}
      <aside className="w-[240px] bg-sidebar border-r border-sidebar-border flex flex-col">
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

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[72px] border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-lg hover:bg-accent flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
