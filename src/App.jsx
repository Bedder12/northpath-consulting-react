import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./page/HomePage.jsx";
import About from "./page/About.jsx";
import Services from "./page/Services.jsx";
import Contact from "./page/Contact.jsx";
import WorkWithUs from "./page/WorkWithUs";
import ForCompanies from "./page/ForCompanies";


// 🔹 Admin Pages (endast en import per komponent)
import AdminLogin from "./page/AdminLogin.jsx";
import AdminDashboard from "./page/AdminDashboard.jsx";
import ApplicationsAdmin from "./page/ApplicationsAdmin.jsx";
import ContactsAdmin from "./page/ContactsAdmin.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-20">
        <Routes>
          {/* Vanliga sidor */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/for-companies" element={<ForCompanies />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
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
