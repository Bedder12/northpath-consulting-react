import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface AuthContextType {
  session: any;
  isAdmin: boolean | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkAdmin(userEmail: string) {
    const { data, error } = await supabase
      .from("allowed_admins")
      .select("email")
      .eq("email", userEmail)
      .maybeSingle();

    if (error) {
      console.warn("Admin check error:", error);
      setIsAdmin(false);
      return;
    }

    setIsAdmin(!!data);
  }

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession();
      const s = data.session;

      setSession(s);

      if (s?.user?.email) {
        await checkAdmin(s.user.email);
      }

      setLoading(false);
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);

        if (session?.user?.email) {
          await checkAdmin(session.user.email);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
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
