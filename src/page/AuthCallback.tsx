import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      let session = null;

      // Retry up to 30 times (≈ 4.5s)
      for (let i = 0; i < 30; i++) {
        const { data } = await supabase.auth.getSession();
        session = data.session;

        if (session) break;

        await new Promise((res) => setTimeout(res, 150));
      }

      if (session) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        alert("Kunde inte logga in. Försök igen.");
        navigate("/admin/login", { replace: true });
      }
    }

    verify();
  }, []);

  return (
    <p className="text-center mt-10 text-gray-600">
      Verifierar inloggning...
    </p>
  );
}
