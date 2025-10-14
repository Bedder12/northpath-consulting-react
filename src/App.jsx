import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./page/HomePage.tsx";
import About from "./page/About.tsx";
import Services from "./page/Services.tsx";  // ✅ Add this import


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/services" element={<Services />} /> 
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
