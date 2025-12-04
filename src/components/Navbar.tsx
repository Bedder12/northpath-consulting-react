// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { session, isAdmin, logout } = useAuth();

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link 
            to="/" 
            className="text-blue-600 font-bold text-xl whitespace-nowrap">
            NorthPath Consulting
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex space-x-8 items-center">

            <Link to="/" className="nav-link">Hem</Link>
            <Link to="/about" className="nav-link">Om oss</Link>
            <Link to="/services" className="nav-link">Tjänster</Link>
            <Link to="/work-with-us" className="nav-link">Jobba med oss</Link>
            <Link to="/for-companies" className="nav-link">För företag</Link>

            {/* Admin link */}
            {isAdmin ? (
              <Link to="/admin/dashboard" className="text-blue-700 font-semibold">
                Adminpanel
              </Link>
            ) : (
              <Link to="/admin/login" className="nav-link">Admin</Link>
            )}

            {session && (
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-700 text-sm ml-4"
              >
                Logga ut
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU (SLIDE-DOWN) */}
      <div
        className={`sm:hidden bg-white shadow-lg transform transition-all duration-300 origin-top z-50
        ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-6 py-5 space-y-4 text-lg">

          <MobileItem to="/" setMenuOpen={setMenuOpen}>Hem</MobileItem>
          <MobileItem to="/about" setMenuOpen={setMenuOpen}>Om oss</MobileItem>
          <MobileItem to="/services" setMenuOpen={setMenuOpen}>Tjänster</MobileItem>
          <MobileItem to="/work-with-us" setMenuOpen={setMenuOpen}>Jobba med oss</MobileItem>
          <MobileItem to="/for-companies" setMenuOpen={setMenuOpen}>För företag</MobileItem>

          {/* Admin */}
          {isAdmin ? (
            <MobileItem
              to="/admin/dashboard"
              setMenuOpen={setMenuOpen}
              className="text-blue-700 font-semibold"
            >
              Adminpanel
            </MobileItem>
          ) : (
            <MobileItem
              to="/admin/login"
              setMenuOpen={setMenuOpen}
              className="text-gray-700"
            >
              Admin
            </MobileItem>
          )}

          {session && (
            <button
              onClick={logout}
              className="text-red-600 font-medium w-full text-left pt-2"
            >
              Logga ut
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ----- MOBILE MENU ITEM COMPONENT ----- */
function MobileItem({
  to,
  setMenuOpen,
  children,
  className = "",
}: {
  to: string;
  setMenuOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`block text-gray-700 hover:text-blue-600 text-lg font-medium ${className}`}
    >
      {children}
    </Link>
  );
}
