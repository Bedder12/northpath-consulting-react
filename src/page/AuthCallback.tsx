import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function finishLogin() {
      // Give Supabase time to finish parsing the magic link
      await supabase.auth.getSession();

      // Redirect AFTER session is initialized
      navigate("/admin/dashboard", { replace: true });
    }

    finishLogin();
  }, []);

  return (
    <p className="text-center mt-10 text-gray-600">
      Verifierar inloggning...
    </p>
  );
}
