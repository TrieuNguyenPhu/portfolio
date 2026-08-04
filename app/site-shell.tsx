"use client";

import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { SitePreferencesProvider } from "./site-preferences";

export default function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SitePreferencesProvider>
      <SiteHeader />
      <div id="top">{children}</div>
      <SiteFooter />
    </SitePreferencesProvider>
  );
}
