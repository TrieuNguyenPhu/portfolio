"use client";

import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { SitePreferencesProvider } from "./site-preferences";
import ScrollReveal from "./scroll-reveal";

export default function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SitePreferencesProvider>
      <ScrollReveal />
      <SiteHeader />
      <div id="top">{children}</div>
      <SiteFooter />
    </SitePreferencesProvider>
  );
}
