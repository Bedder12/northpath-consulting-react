import { useEffect } from "react";

// Extend ImportMeta to include 'env' for Vite
declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string;
    // add other env variables here if needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export function useVersionCheck() {
  useEffect(() => {
    const currentVersion = import.meta.env.VITE_APP_VERSION as string;

    // Poll every 30 seconds for a new version
    const interval = setInterval(() => {
      fetch("/", { cache: "no-cache" })
        .then((res) => res.text())
        .then((html) => {
          const match = html.match(/app-version" content="([^"]+)"/);
          const latestVersion = match ? match[1] : null;

          if (latestVersion && latestVersion !== currentVersion) {
            console.warn("New version detected, reloading…");
            window.location.reload();
          }
        })
        .catch(() => {});
    }, 30000);

    return () => clearInterval(interval);
  }, []);
}