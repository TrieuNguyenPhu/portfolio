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
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.36 9.36 0 0 1 12 6.87c.85 0 1.7.12 2.5.34 1.9-1.34 2.74-1.06 2.74-1.06.55 1.43.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.57 5.08.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12 6.58 17.52 2 12 2Z" clipRule="evenodd" /></svg>
        </a>
      </nav>
    </header>
  );
}
