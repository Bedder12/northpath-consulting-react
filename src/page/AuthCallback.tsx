import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function finishLogin() {

      // 1️⃣ Try reading session immediately
      let { data } = await supabase.auth.getSession();

      // 2️⃣ If session isn't available yet, retry until it exists
      let retries = 0;
      while (!data.session && retries < 20) {
        await new Promise(res => setTimeout(res, 150)); // wait 150ms
        ({ data } = await supabase.auth.getSession());
        retries++;
      }

      // 3️⃣ When session exists → navigate to dashboard
      if (data.session) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        // 4️⃣ Fallback if something failed
        navigate("/admin/login", { replace: true });
      }
    }

    finishLogin();
  }, []);

  return (
    <p className="text-center mt-10 text-gray-600">
      Verifierar inloggning...
    </p>
  );
}
