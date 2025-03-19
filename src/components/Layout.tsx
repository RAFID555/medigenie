
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, FileText, Bell, ShoppingBag, Menu, X, Settings, LogOut, Activity, Info, PhoneCall, Ambulance, PawPrint } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import DarkModeToggle from "./DarkModeToggle";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "সফলভাবে লগ আউট হয়েছে",
        description: "আপনি সফলভাবে লগ আউট করেছেন।",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "লগ আউট ব্যর্থ হয়েছে",
        description: "দুঃখিত, একটি ত্রুটি ঘটেছে।",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    {
      label: "হোম",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      label: "জরুরী সাহায্য",
      icon: <PhoneCall className="h-5 w-5" />,
      href: "/emergency",
      className: "bg-red-600 text-white hover:bg-red-700"
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
      label: "হেলথ ট্র্যাকার",
      icon: <Activity className="h-5 w-5" />,
      href: "/health-tracker",
    },
    {
      label: "পেট কেয়ার",
      icon: <PawPrint className="h-5 w-5" />,
      href: "/pet-care",
    },
    {
      label: "সেটিংস",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
    {
      label: "আমাদের সম্পর্কে",
      icon: <Info className="h-5 w-5" />,
      href: "/about-us",
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-lg"
          >
            <span className="bg-primary rounded-md p-1 text-primary-foreground">মেডি</span>
            <span>জিনি</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <DarkModeToggle />
            <button
              className="block md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {isMenuOpen && (
          <div 
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
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
                  item.className,
                  location.pathname === item.href
                    ? item.className || "bg-primary text-primary-foreground"
                    : item.className || "hover:bg-muted"
                )}
              >
                {item.icon}
                <span className="bangla">{item.label}</span>
              </Link>
            ))}
            
            {user && (
              <Button 
                variant="ghost" 
                className="mt-auto justify-start gap-3 text-sm font-medium"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <span className="bangla">লগ আউট</span>
              </Button>
            )}
          </nav>
        </aside>
        
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
