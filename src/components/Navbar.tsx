import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // nice icons (install via: npm install lucide-react)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-blue-600 font-bold text-xl">
            North Path
          </Link>

          {/* Desktop menu */}
          <div className="hidden sm:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Hem
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Om oss
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Tjänster
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Kontakt
            </Link>
          </div>

          {/* Book a meeting button */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Boka möte
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Hem
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Om oss
            </Link>
            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Tjänster
            </Link>
            <Link
              to="/cases"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Kundcase
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Kontakt
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-3 bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Boka möte
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
