import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../supabaseClient";
import type { Session } from "@supabase/supabase-js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [companyOpen, setCompanyOpen] = useState(false);
  const [candidateOpen, setCandidateOpen] = useState(false);

  // Load Supabase session
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
      }
    };

    loadSession();

    // Listen to auth changes
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
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="text-blue-600 font-bold text-xl">
            NorthPath Consulting
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex space-x-8 items-center">

            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Hem
            </Link>

            {/* DROPDOWN – Företag */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                För företag <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-3 z-50"
                  >
                    <Link to="/services" className="block px-4 py-2 hover:bg-gray-100">
                      Konsultuthyrning
                    </Link>

                    <Link to="/services" className="block px-4 py-2 hover:bg-gray-100">
                      Projekt & Specialiststöd
                    </Link>

                    <Link to="/services" className="block px-4 py-2 hover:bg-gray-100">
                      Rekrytering & Direktmatchning
                    </Link>

                    <Link
                      to="/case-studies"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Case Studies
                    </Link>

                    <Link
                      to="/clients"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Kundloggor
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DROPDOWN – Jobbsökande */}
            <div
              className="relative"
              onMouseEnter={() => setCandidateOpen(true)}
              onMouseLeave={() => setCandidateOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                Jobbsökande <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {candidateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-3 z-50"
                  >
                    <Link
                      to="/jobba-med-oss"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Jobba med oss
                    </Link>

                    <Link
                      to="/jobba-med-oss#competences"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Våra kompetensområden
                    </Link>

                    <button
                      onClick={() => setCandidateOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <Link to="/jobba-med-oss#benefits">Fördelar & Trygghet</Link>
                    </button>

                    <Link
                      to="/jobba-med-oss#process"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Så fungerar processen
                    </Link>

                    <Link
                      to="/jobba-med-oss#faq"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Vanliga frågor
                    </Link>

                    <button
                      className="block px-4 py-2 hover:bg-gray-100 text-left"
                      onClick={() => setShowCVModal(true)}
                    >
                      Skicka CV
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Kontakt
            </Link>

            {/* ADMIN */}
            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="text-blue-700 font-semibold"
              >
                Adminpanel
              </Link>
            ) : (
              <Link to="/admin/login" className="text-gray-700 hover:text-blue-600">
                Admin
              </Link>
            )}

            {/* LOGOUT */}
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
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-3">

          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Hem
          </Link>

          <div className="border-t pt-3">
            <p className="font-semibold text-gray-700">För företag</p>

            <Link to="/services" className="block py-2" onClick={() => setMenuOpen(false)}>
              Konsultuthyrning
            </Link>

            <Link to="/services" className="block py-2" onClick={() => setMenuOpen(false)}>
              Projekt & Specialiststöd
            </Link>

            <Link to="/services" className="block py-2" onClick={() => setMenuOpen(false)}>
              Rekrytering
            </Link>

            <Link to="/case-studies" className="block py-2" onClick={() => setMenuOpen(false)}>
              Case Studies
            </Link>

            <Link to="/clients" className="block py-2" onClick={() => setMenuOpen(false)}>
              Kundloggor
            </Link>
          </div>

          <div className="border-t pt-3">
            <p className="font-semibold text-gray-700">Jobbsökande</p>

            <Link to="/jobba-med-oss" className="block py-2" onClick={() => setMenuOpen(false)}>
              Jobba med oss
            </Link>

            <button
              onClick={() => { setShowCVModal(true); setMenuOpen(false); }}
              className="block py-2 text-left w-full"
            >
              Skicka CV
            </button>

            <Link to="/jobba-med-oss#competences" className="block py-2">Kompetensområden</Link>
            <Link to="/jobba-med-oss#benefits" className="block py-2">Fördelar</Link>
            <Link to="/jobba-med-oss#process" className="block py-2">Process</Link>
            <Link to="/jobba-med-oss#faq" className="block py-2">FAQ</Link>
          </div>

          <Link to="/contact" className="block">Kontakt</Link>

          {isAdmin ? (
            <Link to="/admin/dashboard" className="block">Adminpanel</Link>
          ) : (
            <Link to="/admin/login" className="block">Admin</Link>
          )}

          {session && (
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium mt-2"
            >
              Logga ut
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
