// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { session, isAdmin, logout } = useAuth();

  // Disable scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link 
            to="/" 
            className="text-blue-600 font-bold text-xl whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
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
            className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ===== OVERLAY (UNDER NAVBAR) ===== */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 sm:hidden z-[90]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`
          fixed top-16 left-0 w-full bg-white shadow-lg sm:hidden z-[100]
          transform transition-all duration-300 origin-top
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <div className="px-6 py-5 space-y-4 text-lg">

          <MobileItem to="/" close={setMenuOpen}>Hem</MobileItem>
          <MobileItem to="/about" close={setMenuOpen}>Om oss</MobileItem>
          <MobileItem to="/services" close={setMenuOpen}>Tjänster</MobileItem>
          <MobileItem to="/work-with-us" close={setMenuOpen}>Jobba med oss</MobileItem>
          <MobileItem to="/for-companies" close={setMenuOpen}>För företag</MobileItem>

          {/* Admin */}
          {isAdmin ? (
            <MobileItem 
              to="/admin/dashboard"
              close={setMenuOpen}
              className="text-blue-700 font-semibold"
            >
              Adminpanel
            </MobileItem>
          ) : (
            <MobileItem 
              to="/admin/login"
              close={setMenuOpen}
              className="text-gray-700"
            >
              Admin
            </MobileItem>
          )}

          {session && (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
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
  close,
  children,
  className = "",
}: {
  to: string;
  close: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      onClick={() => close(false)}
      className={`block text-gray-700 hover:text-blue-600 text-lg font-medium ${className}`}
    >
      {children}
    </Link>
  );
}
