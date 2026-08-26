"use client";

import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { SitePreferencesProvider } from "./site-preferences";
import ScrollReveal from "./scroll-reveal";

export default function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SitePreferencesProvider>
      <ScrollReveal />
      <div className="page-intro" aria-hidden="true"><span>NPT / SYSTEM ONLINE</span><i /></div>
      <div className="ambient" aria-hidden="true">
        <div className="ambient__grid" />
        <div className="ambient__glow ambient__glow--one" />
        <div className="ambient__glow ambient__glow--two" />
        <div className="ambient__noise" />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#top">Skip to content</a>
      <SiteHeader />
      <div id="top" tabIndex={-1}>{children}</div>
      <SiteFooter />
    </SitePreferencesProvider>
  );
}
