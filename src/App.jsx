import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedAdminRoute from "./auth/ProtectedAdminRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./page/HomePage";
import About from "./page/About";
import Services from "./page/Services";
import Contact from "./page/Contact";
import WorkWithUs from "./page/WorkWithUs";
import ForCompanies from "./page/ForCompanies";

// Admin pages
import AdminLogin from "./page/AdminLogin";
import AdminDashboard from "./page/AdminDashboard";
import ApplicationsAdmin from "./page/ApplicationsAdmin";
import ContactsAdmin from "./page/ContactsAdmin";

// NEW – Required for magic link redirect
import AuthCallback from "./page/AuthCallback";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Navbar is always visible */}
        <Navbar />

        {/* Main container for all pages */}
        <main className="pt-20 px-4 max-w-[1400px] mx-auto">
          <Routes>

            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/for-companies" element={<ForCompanies />} />

            {/* Magic link callback route */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Admin login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected admin pages */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/applications"
              element={
                <ProtectedAdminRoute>
                  <ApplicationsAdmin />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/contacts"
              element={
                <ProtectedAdminRoute>
                  <ContactsAdmin />
                </ProtectedAdminRoute>
              }
            />

          </Routes>
        </main>

        {/* Footer always visible */}
        <Footer />

      </BrowserRouter>
    </AuthProvider>
  );
}
