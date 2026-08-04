"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "./lib/localization";
import { SitePreferences } from "./lib/site-preferences";

const languageKey = "portfolio-language";
const themeKey = "portfolio-theme";

type SitePreferencesContextValue = {
  preferences: SitePreferences;
  setLanguage: (language: Language) => void;
  cycleTheme: () => void;
};

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

export function SitePreferencesProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [preferences, setPreferences] = useState(() => new SitePreferences());

  const apply = (next: SitePreferences) => {
    document.documentElement.lang = next.language;
    if (next.theme === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = next.theme;
  };

  useEffect(() => {
    const restored = SitePreferences.restore(
      window.localStorage.getItem(languageKey),
      window.localStorage.getItem(themeKey),
    );
    apply(restored);
    setPreferences(restored);
  }, []);

  const update = (next: SitePreferences) => {
    window.localStorage.setItem(languageKey, next.language);
    window.localStorage.setItem(themeKey, next.theme);
    apply(next);
    setPreferences(next);
  };

  return (
    <SitePreferencesContext.Provider
      value={{
        preferences,
        setLanguage: (language) => update(preferences.withLanguage(language)),
        cycleTheme: () => update(preferences.withNextTheme()),
      }}
    >
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const value = useContext(SitePreferencesContext);
  if (!value) throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  return value;
}
