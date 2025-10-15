import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* 🔹 Logo */}
          <Link to="/" className="flex items-center text-blue-600 font-bold text-lg sm:text-xl">
            NorthPath Consulting
          </Link>

          {/* 🔹 Desktop menu */}
          <div className="hidden sm:flex space-x-6 lg:space-x-8">
            {[
              ["Hem", "/"],
              ["Om oss", "/about"],
              ["Tjänster", "/services"],
              ["Kontakt", "/contact"],
            ].map(([label, link]) => (
              <Link
                key={link}
                to={link}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* 🔹 CTA button */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Boka möte
            </Link>
          </div>

          {/* 🔹 Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-4 space-y-3">
            {[
              ["Hem", "/"],
              ["Om oss", "/about"],
              ["Tjänster", "/services"],
              ["Jobba med oss", "/upload-cv"],
              ["Kontakt", "/contact"],
            ].map(([label, link]) => (
              <Link
                key={link}
                to={link}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block mt-4 bg-blue-600 text-white text-center px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Boka möte
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
