"use client";

import { usePathname } from "next/navigation";
import { useSitePreferences } from "./site-preferences";

const copy = {
  en: {
    name: "Nguyen Phu Trieu",
    role: "DevOps Engineer",
    about: "About",
    projects: "Projects",
    language: "Language",
    theme: { dark: "Switch to dark theme", light: "Switch to light theme", system: "Use system theme" },
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    role: "Kỹ sư DevOps",
    about: "Giới thiệu",
    projects: "Dự án",
    language: "Ngôn ngữ",
    theme: { dark: "Chuyển sang giao diện tối", light: "Chuyển sang giao diện sáng", system: "Dùng giao diện hệ thống" },
  },
} as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const { preferences, setLanguage, cycleTheme } = useSitePreferences();
  const { language, theme, nextTheme } = preferences;
  const t = copy[language];
  const active = pathname.startsWith("/blog") ? "blog" : pathname.startsWith("/projects") ? "projects" : "about";

  return (
    <header className="nav-shell">
      <a className="brand" href="/" aria-label={`${t.name}, home`}>
        <span>{t.name}</span>
        <small>{t.role}</small>
      </a>
      <nav aria-label="Primary navigation">
        <a className={active === "blog" ? "is-active" : undefined} href="/blog">Blog</a>
        <a className={active === "about" ? "is-active" : undefined} href="/#about">{t.about}</a>
        <a className={active === "projects" ? "is-active" : undefined} href="/projects">{t.projects}</a>
        <div className="language-switcher" role="group" aria-label={t.language}>
          <button type="button" aria-pressed={language === "vi"} onClick={() => setLanguage("vi")}>VI</button>
          <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
        </div>
        <button className="theme-toggle" type="button" aria-label={t.theme[nextTheme]} title={t.theme[nextTheme]} onClick={cycleTheme}>
          {theme === "light" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></svg>
          ) : theme === "dark" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.5A8.5 8.5 0 0 1 8.5 3.8 8.5 8.5 0 1 0 20.2 15.5Z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></svg>
          )}
        </button>
        <a className="nav-cta nav-github" href="https://github.com/TrieuNguyenPhu/portfolio" target="_blank" rel="noreferrer" aria-label="Portfolio repository on GitHub" title="GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.4-1.7-1.4-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.4-5.6-6.1 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.6 1.3a12 12 0 0 1 6.5 0c2.5-1.7 3.6-1.3 3.6-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.7-2.9 5.8-5.6 6.1.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" /></svg>
        </a>
      </nav>
    </header>
  );
}
