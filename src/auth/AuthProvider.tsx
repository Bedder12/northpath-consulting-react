import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface AuthContextType {
  session: any;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const s = data.session;
      setSession(s);

      if (s?.user?.email) {
        const { data: allowed, error } = await supabase
          .from("allowed_admins")
          .select("email")
          .eq("email", s.user.email)
          .maybeSingle();

        setIsAdmin(!error && !!allowed);
      }

      setLoading(false);
    };

    load();

    // Small delay to avoid Chrome timing issues
    setTimeout(() => {}, 30);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session?.user?.email) {
          const { data: allowed, error } = await supabase
            .from("allowed_admins")
            .select("email")
            .eq("email", session.user.email)
            .maybeSingle();

          setIsAdmin(!error && !!allowed);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ session, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext)!;
}
