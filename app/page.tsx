"use client";

import { useState } from "react";
import SiteHeader, { type Language } from "./site-header";

type Localized = Record<Language, string>;

const text = (en: string, vi: string): Localized => ({ en, vi });

const skills = [
  [text("Cloud & Infrastructure", "Cloud & hạ tầng"), "AWS, Terraform, AWS SAM, CloudFormation"],
  [text("Containers & GitOps", "Containers & GitOps"), "Docker, Kubernetes, Argo CD"],
  [text("CI/CD & Security", "CI/CD & bảo mật"), "GitHub Actions, Trivy, Cosign, Kubernetes RBAC"],
  [text("Monitoring & Systems", "Giám sát & hệ thống"), "Prometheus, Grafana, Linux, Bash, Git"],
  [text("Programming", "Lập trình"), "Python, Go, JavaScript, TypeScript"],
] as const;

const copy = {
  en: {
    name: "Nguyen Phu Trieu",
    role: "DevOps Engineer",
    nav: { blog: "Blog", about: "About", experience: "Experience", projects: "Projects", education: "Education", certification: "Certification", contact: "Contact" },
    language: "Language",
    theme: "Theme",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    switchToSystem: "Use system theme",
    status: "Entry-level DevOps Engineer",
    hero: "I turn infrastructure into a repeatable delivery system.",
    lede: "Hands-on experience designing and automating cloud-native AWS infrastructure, CI/CD, and GitOps workflows with Terraform, Docker, Kubernetes, GitHub Actions, Argo CD, and Prometheus—backed by Python and Go.",
    explore: "Explore my work",
    focus: "Primary focus",
    cloud: "Cloud",
    orchestration: "Orchestration",
    infrastructure: "Infrastructure",
    delivery: "Delivery",
    projectsLabel: "Projects",
    projectsHeading: "Systems I built from the ground up.",
    projectsText: "Selected work across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
    repository: "View repository",
    live: "Live site",
    experienceLabel: "Experience",
    experienceHeading: "From backend code to cloud operations.",
    xbrainRole: "DevOps Engineer Trainee",
    xbrainText: "Applied DevOps governance across provisioning, configuration review, compliance validation, auditing, monitoring, and technical documentation. Reviewed Terraform designs and AWS dependencies, prepared implementation plans, and supported audit evidence validation.",
    techhausRole: "Backend Developer Trainee",
    techhausText: "Developed and tested Python/Django backend features, RESTful APIs, database interactions, validation, error handling, and application logic. Collaborated through Git branches, pull requests, code reviews, debugging, and technical discussions.",
    toolkitLabel: "Toolkit",
    toolkitHeading: "The tools behind the work.",
    educationLabel: "Education",
    university: "University of Information Technology",
    degree: "Bachelor of Software Engineering",
    open: "Open to DevOps opportunities",
    contactHeading: "Let’s build a better path to production.",
    backToTop: "Back to top",
    xbrainDate: "Apr 2026 — Jul 2026",
    techhausDate: "Aug 2025 — Nov 2025",
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    role: "Kỹ sư DevOps",
    nav: { blog: "Blog", about: "Giới thiệu", experience: "Kinh nghiệm", projects: "Dự án", education: "Học vấn", certification: "Chứng chỉ", contact: "Liên hệ" },
    language: "Ngôn ngữ",
    theme: "Chế độ màu",
    switchToLight: "Chuyển sang chế độ sáng",
    switchToDark: "Chuyển sang chế độ tối",
    switchToSystem: "Dùng chế độ của hệ thống",
    status: "Kỹ sư DevOps mới bắt đầu",
    hero: "Tôi biến hạ tầng thành một hệ thống triển khai có thể lặp lại.",
    lede: "Có kinh nghiệm thực hành thiết kế và tự động hóa hạ tầng AWS cloud-native, CI/CD và GitOps với Terraform, Docker, Kubernetes, GitHub Actions, Argo CD, Prometheus—cùng nền tảng Python và Go.",
    explore: "Xem dự án",
    focus: "Trọng tâm",
    cloud: "Đám mây",
    orchestration: "Điều phối",
    infrastructure: "Hạ tầng",
    delivery: "Triển khai",
    projectsLabel: "Dự án",
    projectsHeading: "Những hệ thống tôi xây dựng từ đầu.",
    projectsText: "Các dự án về Kubernetes, hạ tầng AWS, bảo mật, containers và tự động hóa triển khai.",
    repository: "Xem repository",
    live: "Trang web",
    experienceLabel: "Kinh nghiệm",
    experienceHeading: "Từ code backend đến vận hành cloud.",
    xbrainRole: "Thực tập sinh Kỹ sư DevOps",
    xbrainText: "Áp dụng thực hành quản trị DevOps trong provisioning, rà soát cấu hình, xác thực tuân thủ, auditing, monitoring và tài liệu kỹ thuật. Rà soát thiết kế Terraform và phụ thuộc AWS, lập kế hoạch triển khai, hỗ trợ xác thực bằng chứng audit.",
    techhausRole: "Thực tập sinh Backend Developer",
    techhausText: "Phát triển và kiểm thử tính năng backend Python/Django, RESTful API, tương tác cơ sở dữ liệu, validation, xử lý lỗi và application logic. Phối hợp qua Git branch, pull request, code review, debugging và trao đổi kỹ thuật.",
    toolkitLabel: "Công cụ",
    toolkitHeading: "Công cụ đằng sau từng dự án.",
    educationLabel: "Học vấn",
    university: "Đại học Công nghệ Thông tin",
    degree: "Cử nhân Kỹ thuật Phần mềm",
    open: "Sẵn sàng cho cơ hội DevOps",
    contactHeading: "Cùng xây dựng con đường tốt hơn đến production.",
    backToTop: "Về đầu trang",
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    techhausDate: "Tháng 8 2025 — Tháng 11 2025",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  return (
    <>
      <SiteHeader active="about" language={language} onLanguageChange={setLanguage} />

      <main id="top">
        <div id="about">
        <section className="hero">
          <div className="hero-copy">
            <p className="status"><span aria-hidden="true" /> {t.status}</p>
            <h1>{t.hero}</h1>
            <p className="hero-lede">{t.lede}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="/projects">{t.explore}</a>
              <a className="button button--ghost" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>

          <aside className="hero-console" aria-label="Core engineering focus">
            <div className="console-head"><span>SYSTEM PROFILE</span><span>2026</span></div>
            <p className="console-label">{t.focus}</p>
            <strong>DEVOPS</strong>
            <dl>
              <div><dt>{t.cloud}</dt><dd>AWS</dd></div>
              <div><dt>{t.orchestration}</dt><dd>Kubernetes</dd></div>
              <div><dt>{t.infrastructure}</dt><dd>Terraform</dd></div>
              <div><dt>{t.delivery}</dt><dd>GitHub Actions</dd></div>
            </dl>
          </aside>
        </section>

        <div className="ticker" aria-label="Areas of expertise">
          <span>AWS</span>
          <span>TERRAFORM</span>
          <span>DOCKER</span>
          <span>KUBERNETES</span>
          <span>CI/CD</span>
        </div>

        <section className="experience-section">
          <header className="section-intro"><span>{t.experienceLabel}</span><div><h2>{t.experienceHeading}</h2></div></header>
          <div className="experience-list">
            <article>
              <p className="experience-date">{t.xbrainDate}</p>
              <div><h3>XBrain</h3><p>{t.xbrainRole}</p></div>
              <p>{t.xbrainText}</p>
            </article>
            <article>
              <p className="experience-date">{t.techhausDate}</p>
              <div><h3>Techhaus Vietnam</h3><p>{t.techhausRole}</p></div>
              <p>{t.techhausText}</p>
            </article>
          </div>
        </section>

        <section className="profile-section">
          <article className="skills-panel">
            <p className="panel-label">{t.toolkitLabel}</p>
            <h2>{t.toolkitHeading}</h2>
            <dl>{skills.map(([label, value]) => <div key={label.en}><dt>{label[language]}</dt><dd>{value}</dd></div>)}</dl>
          </article>
          <article className="education-panel">
            <p className="panel-label">{t.educationLabel}</p>
            <div className="education-mark">UIT</div>
            <h2>{t.university}</h2>
            <p>2022—2026</p>
            <strong>{t.degree}</strong>
          </article>
        </section>

        <section className="certification-section">
          <p className="panel-label">{t.nav.certification}</p>
          <div><strong>IELTS</strong><span>Overall Band 5.5</span><time>2024</time></div>
        </section>
        </div>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-intro">
              <p>{t.open}</p>
              <h2>{t.contactHeading}</h2>
            </div>
            <div className="footer-actions">
              <div className="contact-links">
            <a href="mailto:nguyentrieu080604@gmail.com">nguyentrieu080604@gmail.com <span aria-hidden="true" /></a>
              </div>
              <nav className="contact-socials" aria-label="Social links">
            <a className="social-icon" href="https://www.facebook.com/trieu.nguyenphu.0806" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.75l.41-3H13.5V8.08c0-.87.24-1.46 1.5-1.46h1.78V3.94c-.31-.04-1.37-.13-2.61-.13-2.58 0-4.35 1.57-4.35 4.46V10H7v3h2.82v8h3.68Z" /></svg>
            </a>
            <a className="social-icon" href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.36V20h3.38v-5.7c0-1.5.29-2.96 2.15-2.96 1.84 0 1.87 1.72 1.87 3.05V20h3.68v-6.6Z" /></svg>
            </a>
              </nav>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 {t.name}</span>
            <a href="#top">{t.backToTop} ↑</a>
          </div>
        </footer>
      </main>

    </>
  );
}
