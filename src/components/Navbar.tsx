import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "../supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load session + check if admin
  useEffect(() => {
    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.email) {
        const { data: allowed } = await supabase
          .from("allowed_admins")
          .select("*")
          .eq("email", session.user.email)
          .single();

        setIsAdmin(!!allowed);
      } else {
        setIsAdmin(false);
      }
    };

    loadSession();

    // Listen for changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="text-blue-600 font-bold text-xl">
            NorthPath Consulting
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Hem</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">Om oss</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600">Tjänster</Link>

            {/* Jobba med oss */}
            <Link to="/work-with-us" className="text-gray-700 hover:text-blue-600">
              Jobba med oss
            </Link>

            {/* För företag */}
            <Link to="/for-companies" className="text-gray-700 hover:text-blue-600">
              För företag
            </Link>

            {/* Admin */}
            {isAdmin ? (
              <Link to="/admin/dashboard" className="text-blue-700 font-semibold">
                Adminpanel
              </Link>
            ) : (
              <Link to="/admin/login" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
            )}

            {/* Logout button */}
            {session && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm ml-4"
              >
                Logga ut
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-4 space-y-2">

            <Link to="/" onClick={() => setMenuOpen(false)} className="block">
              Hem
            </Link>

            <Link to="/about" onClick={() => setMenuOpen(false)} className="block">
              Om oss
            </Link>

            <Link to="/services" onClick={() => setMenuOpen(false)} className="block">
              Tjänster
            </Link>

            <Link to="/work-with-us" onClick={() => setMenuOpen(false)} className="block">
              Jobba med oss
            </Link>

            <Link to="/for-companies" onClick={() => setMenuOpen(false)} className="block">
              För företag
            </Link>

            {/* Admin link */}
            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-blue-700 font-semibold"
              >
                Adminpanel
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                Admin
              </Link>
            )}

            {/* Logout */}
            {session && (
              <button
                onClick={handleLogout}
                className="block text-left text-red-600 font-medium mt-3"
              >
                Logga ut
              </button>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
