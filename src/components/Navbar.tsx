import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "../supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-700 tracking-tight"
        >
          NorthPath
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Hem</Link>
          <Link to="/about" className="hover:text-blue-600">Om oss</Link>
          <Link to="/services" className="hover:text-blue-600">Tjänster</Link>
          <Link to="/upload-cv" className="hover:text-blue-600">Jobba med oss</Link>
          <Link to="/contact" className="hover:text-blue-600">Kontakt</Link>

          {isAdmin ? (
            <Link to="/admin/dashboard" className="text-blue-700 font-semibold">
              Adminpanel
            </Link>
          ) : (
            <Link to="/admin/login" className="hover:text-blue-600">
              Admin
            </Link>
          )}

          {session && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
            >
              <LogOut size={16} />
              Logga ut
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm animate-fade">
          <div className="px-6 py-5 flex flex-col gap-4 text-gray-700 text-lg font-medium">

            <Link to="/" onClick={() => setMenuOpen(false)}>Hem</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>Om oss</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Tjänster</Link>
            <Link to="/upload-cv" onClick={() => setMenuOpen(false)}>Jobba med oss</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>

            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-blue-700 font-semibold"
              >
                Adminpanel
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            {session && (
              <button
                onClick={handleLogout}
                className="text-left text-red-600 mt-3 flex items-center gap-2"
              >
                <LogOut size={18} /> Logga ut
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
