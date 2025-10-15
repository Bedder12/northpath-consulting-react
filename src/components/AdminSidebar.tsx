import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Mail, LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "../supabaseClient";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const menu = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Ansökningar", path: "/admin/applications", icon: <Briefcase size={18} /> },
    { label: "Kontakter", path: "/admin/contacts", icon: <Mail size={18} /> },
  ];

  return (
    <aside className="bg-blue-950 text-gray-200 min-h-screen w-64 fixed left-0 top-0 py-8 flex flex-col justify-between">
      <div>
        <h2 className="text-center text-xl font-bold mb-10">Adminpanel</h2>
        <nav className="flex flex-col space-y-2 px-4">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                location.pathname === item.path
                  ? "bg-blue-800 text-white font-semibold"
                  : "hover:bg-blue-900 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm text-gray-400 hover:text-red-400 transition"
        >
          <LogOut size={16} /> Logga ut
        </button>
      </div>
    </aside>
  );
}
