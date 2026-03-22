import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function SchoolHeader() {
  const { identity, clear } = useInternetIdentity();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuth = !!identity;

  const handleLogout = async () => {
    await clear();
    qc.clear();
    navigate({ to: "/" });
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-navy sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" data-ocid="nav.link">
          <img
            src="/assets/generated/school-logo-transparent.dim_400x400.png"
            alt="School Logo"
            className="w-10 h-10 rounded-full bg-white p-0.5"
          />
          <div className="hidden sm:block">
            <div className="font-display text-sm font-bold leading-tight">
              Ex-Servicemen Public H.S. School
            </div>
            <div className="text-xs text-accent">Thathri, Doda — J&K</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="hover:text-accent transition-colors"
            data-ocid="nav.link"
          >
            Home
          </Link>
          {isAuth && (
            <Link
              to="/dashboard"
              search={{ roll: "", cls: "10", sec: "A" }}
              className="hover:text-accent transition-colors"
              data-ocid="dashboard.link"
            >
              My Child's Profile
            </Link>
          )}
          <Link
            to="/admin"
            className="hover:text-accent transition-colors"
            data-ocid="admin.link"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isAuth ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              data-ocid="nav.logout_button"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-ocid="nav.primary_button"
              >
                <GraduationCap className="w-4 h-4 mr-1" /> Parent Login
              </Button>
            </Link>
          )}
          <button
            type="button"
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-sidebar-border px-4 py-3 flex flex-col gap-3 text-sm">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="hover:text-accent"
            data-ocid="nav.link"
          >
            Home
          </Link>
          {isAuth && (
            <Link
              to="/dashboard"
              search={{ roll: "", cls: "10", sec: "A" }}
              onClick={() => setMobileOpen(false)}
              className="hover:text-accent"
              data-ocid="dashboard.link"
            >
              My Child's Profile
            </Link>
          )}
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="hover:text-accent"
            data-ocid="admin.link"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}
