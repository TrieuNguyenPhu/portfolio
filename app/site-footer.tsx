"use client";

import Link from "next/link";
import GitHubIcon from "./github-icon";
import BrandLogo from "./brand-logo";
import { useSitePreferences } from "./site-preferences";
import UiIcon from "./ui-icon";

const copy = {
  en: {
    name: "Nguyen Phu Trieu",
    backToTop: "Back to top",
    kicker: "DEVOPS ENGINEER · HO CHI MINH CITY",
    contact: "GET IN TOUCH",
    socials: "Social links",
    navigation: "Footer navigation",
    projects: "Projects",
    about: "About",
    blog: "Blog",
    status: "AVAILABLE FOR DEVOPS OPPORTUNITIES",
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    backToTop: "Về đầu trang",
    kicker: "KỸ SƯ DEVOPS · TP. HỒ CHÍ MINH",
    contact: "LIÊN HỆ",
    socials: "Liên kết mạng xã hội",
    navigation: "Điều hướng cuối trang",
    projects: "Dự án",
    about: "Giới thiệu",
    blog: "Blog",
    status: "SẴN SÀNG CHO CƠ HỘI DEVOPS",
  },
} as const;

export default function SiteFooter() {
  const { preferences } = useSitePreferences();
  const t = copy[preferences.language];

  return (
    <footer className="site-footer">
      <div className="footer-content" data-reveal>
        <div className="footer-signature">
          <BrandLogo className="footer-logo" />
          <div><strong>{t.name}</strong><span>{t.kicker}</span></div>
        </div>
        <nav className="footer-nav" aria-label={t.navigation}>
          <Link href="/projects">{t.projects}</Link>
          <Link href="/about">{t.about}</Link>
          <Link href="/blog">{t.blog}</Link>
        </nav>
        <a className="footer-mail" href="mailto:nguyentrieu080604@gmail.com">
          <span><UiIcon name="mail" />{t.contact}</span><strong>nguyentrieu080604@gmail.com</strong><UiIcon name="arrow" />
        </a>
        <nav className="contact-socials" aria-label={t.socials}>
          <a className="social-icon" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <GitHubIcon />
          </a>
          <a className="social-icon" href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.36V20h3.38v-5.7c0-1.5.29-2.96 2.15-2.96 1.84 0 1.87 1.72 1.87 3.05V20h3.68v-6.6Z" /></svg>
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {t.name} · HO CHI MINH CITY, VN</span>
        <span className="footer-signal"><i /> {t.status}</span>
        <a href="#top">{t.backToTop}</a>
      </div>
    </footer>
  );
}
