"use client";

import GitHubIcon from "./github-icon";
import BrandLogo from "./brand-logo";
import { useSitePreferences } from "./site-preferences";
import UiIcon from "./ui-icon";

const copy = {
  en: {
    name: "Nguyen Phu Trieu",
    backToTop: "Back to top",
    kicker: "START A CONVERSATION",
    heading: "Let’s build something reliable.",
    contact: "GET IN TOUCH",
    status: "SYSTEMS OPERATIONAL",
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    backToTop: "Về đầu trang",
    kicker: "BẮT ĐẦU TRÒ CHUYỆN",
    heading: "Cùng xây một hệ thống đáng tin cậy.",
    contact: "LIÊN HỆ",
    status: "HỆ THỐNG ỔN ĐỊNH",
  },
} as const;

export default function SiteFooter() {
  const { preferences } = useSitePreferences();
  const t = copy[preferences.language];

  return (
    <footer className="site-footer">
      <div className="footer-content" data-reveal>
        <BrandLogo className="footer-logo" />
        <div className="footer-kicker">{t.kicker}</div>
        <h2>{t.heading}</h2>
        <a className="footer-mail" href="mailto:nguyentrieu080604@gmail.com">
          <span><UiIcon name="mail" />{t.contact}</span><strong>nguyentrieu080604@gmail.com</strong><i aria-hidden="true"><UiIcon name="arrow" /></i>
        </a>
        <nav className="contact-socials" aria-label="Social links">
          <a className="social-icon" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <GitHubIcon />
          </a>
          <a className="social-icon" href="https://www.facebook.com/trieu.nguyenphu.0806" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.75l.41-3H13.5V8.08c0-.87.24-1.46 1.5-1.46h1.78V3.94c-.31-.04-1.37-.13-2.61-.13-2.58 0-4.35 1.57-4.35 4.46V10H7v3h2.82v8h3.68Z" /></svg>
          </a>
          <a className="social-icon" href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
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
