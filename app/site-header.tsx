"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import GitHubIcon from "./github-icon";
import BrandLogo from "./brand-logo";
import { useSitePreferences } from "./site-preferences";

const copy = {
  en: {
    name: "Nguyen Phu Trieu",
    role: "Software Engineer",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    language: "Language",
    navigation: "Primary navigation",
    theme: { dark: "Switch to dark theme", light: "Switch to light theme", system: "Use system theme" },
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    role: "Kỹ sư Phần mềm",
    about: "Giới thiệu",
    projects: "Dự án",
    blog: "Blog",
    language: "Ngôn ngữ",
    navigation: "Điều hướng chính",
    theme: { dark: "Chuyển sang giao diện tối", light: "Chuyển sang giao diện sáng", system: "Dùng giao diện hệ thống" },
  },
} as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const { preferences, setLanguage, cycleTheme } = useSitePreferences();
  const { language, theme, nextTheme } = preferences;
  const t = copy[language];
  const active = pathname.startsWith("/about") ? "about" : pathname.startsWith("/blog") ? "blog" : pathname.startsWith("/projects") ? "projects" : undefined;

  return (
    <header className="nav-shell">
      <Link className="brand" href="/" aria-label={`${t.name}, home`}>
        <span className="brand-mark"><BrandLogo /></span>
        <span className="brand-copy"><strong>{t.name}</strong><small>{t.role}</small></span>
      </Link>
      <nav className="primary-nav" aria-label={t.navigation}>
        <Link className={active === "about" ? "is-active" : undefined} aria-current={active === "about" ? "page" : undefined} href="/about">{t.about}</Link>
        <Link className={active === "blog" ? "is-active" : undefined} aria-current={active === "blog" ? "page" : undefined} href="/blog">{t.blog}</Link>
        <Link className={active === "projects" ? "is-active" : undefined} aria-current={active === "projects" ? "page" : undefined} href="/projects">{t.projects}</Link>
      </nav>
      <div className="nav-tools">
        <div className="language-switcher" role="group" aria-label={t.language}>
          <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
          <button type="button" aria-pressed={language === "vi"} onClick={() => setLanguage("vi")}>VI</button>
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
        <a className="nav-github" href="https://github.com/TrieuNguyenPhu/portfolio" target="_blank" rel="noopener noreferrer" aria-label="Portfolio repository on GitHub" title="GitHub">
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
}
