import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedAdminRoute from "./auth/ProtectedAdminRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./page/HomePage";
import About from "./page/About";
import Services from "./page/Services";
import Contact from "./page/Contact";
import WorkWithUs from "./page/WorkWithUs";
import ForCompanies from "./page/ForCompanies";

import AdminLogin from "./page/AdminLogin";
import AdminDashboard from "./page/AdminDashboard";
import ApplicationsAdmin from "./page/ApplicationsAdmin";
import ContactsAdmin from "./page/ContactsAdmin";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Navbar />

        <main className="pt-20 px-4 max-w-[1400px] mx-auto">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/for-companies" element={<ForCompanies />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

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

        <Footer />

      </BrowserRouter>
    </AuthProvider>
  );
}
