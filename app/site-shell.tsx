"use client";

import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { SitePreferencesProvider } from "./site-preferences";
import ScrollReveal from "./scroll-reveal";

export default function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SitePreferencesProvider>
      <ScrollReveal />
      <div className="ambient" aria-hidden="true">
        <div className="ambient__grid" />
        <div className="ambient__glow ambient__glow--one" />
        <div className="ambient__glow ambient__glow--two" />
        <div className="ambient__noise" />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1}>{children}</div>
      <SiteFooter />
    </SitePreferencesProvider>
  );
}
