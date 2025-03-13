
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, FileText, Bell, ShoppingBag, Menu, X, Settings } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      label: "হোম",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      label: "প্রেসক্রিপশন",
      icon: <FileText className="h-5 w-5" />,
      href: "/prescriptions",
    },
    {
      label: "রিমাইন্ডার",
      icon: <Bell className="h-5 w-5" />,
      href: "/reminders",
    },
    {
      label: "ঔষধ অর্ডার",
      icon: <ShoppingBag className="h-5 w-5" />,
      href: "/order",
    },
    {
      label: "সেটিংস",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-lg"
          >
            <span className="bg-primary rounded-md p-1 text-primary-foreground">মেড</span>
            <span>সিম্পলিফাই</span>
          </Link>
          <button
            className="block md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Mobile navigation overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)] border-r bg-background transition-transform duration-300 md:translate-x-0 md:sticky",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {item.icon}
                <span className="bangla">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-0 md:p-6">
          <div className={cn(
            "animate-fade-in",
            mounted ? "opacity-100" : "opacity-0"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
