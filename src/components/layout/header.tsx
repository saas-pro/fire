
"use client";

import type { View } from "@/app/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Rocket, LogOut, UserCircle, Menu, Sun, Moon, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  theme: 'light' | 'dark' | null;
  setTheme: (theme: 'light' | 'dark') => void;
  isLoading: boolean;
}

const navItems: { id: View; label: string; loggedIn?: boolean }[] = [
  { id: "dashboard", label: "Dashboard", loggedIn: true },
  { id: "blog", label: "Blog" },
  { id: "mentors", label: "Mentors" },
  { id: "incubators", label: "Incubators" },
  { id: "pricing", label: "Pricing" },
  { id: "msmes", label: "MSMEs" },
  { id: "education", label: "Education" },
];

export default function Header({ activeView, setActiveView, isLoggedIn, onLogout, theme, setTheme, isLoading }: HeaderProps) {
  
  const toggleTheme = () => {
    if (theme) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const ThemeToggleButton = ({ className }: { className?: string }) => (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className={className} disabled={!theme}>
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return (
    <>
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveView("home")}
          >
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Nexus Platform</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems
              .filter((item) => !item.loggedIn || isLoggedIn)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    activeView === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => setActiveView('dashboard')}>
                  <UserCircle className="h-6 w-6" />
                  <span className="sr-only">Dashboard</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={onLogout}>
                  <LogOut className="h-6 w-6" />
                  <span className="sr-only">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setActiveView('login')}>
                  Login
                </Button>
                <Button onClick={() => setActiveView('signup')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Sign Up
                </Button>
              </>
            )}
            <ThemeToggleButton />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold text-primary">Nexus Platform</span>
                  </div>
                  <ThemeToggleButton />
                </div>
                <nav className="flex flex-col space-y-2">
                  {navItems
                    .filter((item) => !item.loggedIn || isLoggedIn)
                    .map((item) => (
                      <SheetClose key={item.id} asChild>
                        <Button
                          variant="ghost"
                          onClick={() => setActiveView(item.id)}
                          className={cn(
                            "justify-start text-lg",
                            activeView === item.id ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {item.label}
                        </Button>
                      </SheetClose>
                    ))}
                </nav>
                <div className="absolute bottom-6 left-6 right-6">
                  {isLoading ? (
                      <div className="flex justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                  ) : isLoggedIn ? (
                    <div className="flex items-center justify-between">
                         <SheetClose asChild>
                            <Button variant="ghost" size="icon" onClick={() => setActiveView('dashboard')}>
                              <UserCircle className="h-8 w-8" />
                              <span className="sr-only">Dashboard</span>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button variant="outline" onClick={onLogout}>
                                <LogOut className="mr-2 h-5 w-5" /> Logout
                            </Button>
                        </SheetClose>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                            <Button className="w-full" onClick={() => setActiveView('login')}>Login</Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button variant="secondary" className="w-full" onClick={() => setActiveView('signup')}>Sign Up</Button>
                        </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
