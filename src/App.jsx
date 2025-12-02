import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./page/HomePage.jsx";
import About from "./page/About.jsx";
import Services from "./page/Services.jsx";
import Contact from "./page/Contact.jsx";
import WorkWithUs from "./page/WorkWithUs.jsx";
import ForCompanies from "./page/ForCompanies.jsx";

import { useVersionCheck } from "./hooks/useVersionCheck";

// Admin Pages
import AdminLogin from "./page/AdminLogin.jsx";
import AdminDashboard from "./page/AdminDashboard.jsx";
import ApplicationsAdmin from "./page/ApplicationsAdmin.jsx";
import ContactsAdmin from "./page/ContactsAdmin.jsx";

// 🔥 AUTH CALLBACK PAGE (måste finnas för Supabase login)
function AuthCallback() {
  return (
    <div className="text-center py-20 text-gray-600">
      Verifierar inloggning...
    </div>
  );
}

export default function App() {
  useVersionCheck();

  // ============================================
  // 🔥 SUPABASE AUTH FIX — MAGIC LINK, SESSION, TOKEN REFRESH
  // ============================================
  useEffect(() => {
    console.log("🔄 Initial auth loading...");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {

      console.log("📡 Auth event:", event);
      console.log("👤 Session:", session);

      if (event === "SIGNED_IN") {
        console.log("✅ User logged in:", session?.user?.email);
      }

      if (event === "INITIAL_SESSION") {
        console.log("🔑 Initial session loaded");
      }

      if (event === "TOKEN_REFRESHED") {
        console.log("♻️ Token refreshed");
      }

      if (event === "SIGNED_OUT") {
        console.log("🚪 User logged out");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* GLOBAL RESPONSIVE WRAPPER */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <Routes>

          {/* PUBLIC PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/for-companies" element={<ForCompanies />} />
          <Route path="/contact" element={<Contact />} />

          {/* REQUIRED AUTH CALLBACK */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<ApplicationsAdmin />} />
          <Route path="/admin/contacts" element={<ContactsAdmin />} />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
