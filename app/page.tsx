"use client";

import { useEffect, useState } from "react";

type Language = "en" | "vi";
type Theme = "dark" | "light" | "system";
type Localized = Record<Language, string>;

const text = (en: string, vi: string): Localized => ({ en, vi });

const projects = [
  {
    slug: "seckube",
    title: "SecKube",
    type: text("Kubernetes GitOps and Security Platform", "Nền tảng GitOps và bảo mật Kubernetes"),
    date: text("June 2026", "Tháng 6, 2026"),
    summary: text(
      "Kubernetes GitOps platform with five ordered Argo CD sync waves, Argo Rollouts canary deployments, Prometheus-based release validation, and automated rollback.",
      "Nền tảng GitOps Kubernetes với năm sync wave Argo CD, canary deployment bằng Argo Rollouts, xác thực phát hành qua Prometheus và tự động rollback.",
    ),
    stack: ["Kubernetes", "Argo CD", "Argo Rollouts", "Prometheus", "Grafana", "OPA Gatekeeper", "Docker", "GitHub Actions", "Trivy", "Cosign"],
    href: "https://github.com/TrieuNguyenPhu/SecKube",
    visual: ["SOURCE", "BUILD", "SIGN", "SYNC", "VERIFY"],
    metric: text("5 sync waves", "5 nhịp đồng bộ"),
  },
  {
    slug: "shortenlink",
    title: "ShortenLink",
    type: text("Serverless URL Shortener on AWS", "Dịch vụ rút gọn URL serverless trên AWS"),
    date: text("May — July 2026", "Tháng 5 — Tháng 7, 2026"),
    summary: text(
      "Full-stack serverless platform with a statically exported Next.js frontend and Go/Gin API on AWS Lambda. It supports aliases, expiration, metadata, redirects, collision-safe DynamoDB writes, and automated delivery checks.",
      "Nền tảng serverless full-stack gồm frontend Next.js xuất tĩnh và API Go/Gin trên AWS Lambda; hỗ trợ alias, thời hạn, metadata, chuyển hướng, ghi DynamoDB chống trùng lặp và kiểm tra triển khai tự động.",
    ),
    stack: ["Next.js", "Go", "Gin", "AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "Route 53", "AWS SAM", "CloudFormation", "GitHub Actions"],
    href: "https://github.com/TrieuNguyenPhu/shorten-link",
    live: "https://npt-shortenlink.dev",
    visual: ["EDGE", "API", "LAMBDA", "DATA"],
    metric: text("Serverless stack", "Kiến trúc serverless"),
  },
];

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
    nav: { about: "About", experience: "Experience", projects: "Projects", education: "Education", certification: "Certification", contact: "Contact" },
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
    footerNote: "Cloud infrastructure, delivery automation, and reliable systems.",
    backToTop: "Back to top",
    xbrainDate: "Apr 2026 — Jul 2026",
    techhausDate: "Aug 2025 — Nov 2025",
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    role: "Kỹ sư DevOps",
    nav: { about: "Giới thiệu", experience: "Kinh nghiệm", projects: "Dự án", education: "Học vấn", certification: "Chứng chỉ", contact: "Liên hệ" },
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
    footerNote: "Hạ tầng đám mây, tự động hóa triển khai và hệ thống đáng tin cậy.",
    backToTop: "Về đầu trang",
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    techhausDate: "Tháng 8 2025 — Tháng 11 2025",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const [activeSection, setActiveSection] = useState("about");
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const t = copy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedLanguage === "en" || savedLanguage === "vi") setLanguage(savedLanguage);
    if (savedTheme === "dark" || savedTheme === "light" || savedTheme === "system") {
      setTheme(savedTheme);
    }
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    if (theme === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme, preferencesLoaded]);

  useEffect(() => {
    const sectionIds = ["about", "experience", "work", "education", "certification"];
    const updateActiveSection = () => {
      const next = sectionIds.reduce((current, id) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= window.innerHeight * 0.42 ? id : current;
      }, "about");
      setActiveSection(next);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12 },
    );

    elements.forEach((element) => {
      const { top, bottom } = element.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) element.classList.add("is-visible");
      observer.observe(element);
    });
    document.documentElement.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("is-visible"));
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label={`${t.name}, home`}>
          <span>{t.name}</span>
          <small>{t.role}</small>
        </a>
        <nav aria-label="Primary navigation">
          <a className={activeSection === "about" ? "is-active" : undefined} href="#about">{t.nav.about}</a>
          <a className={activeSection === "experience" ? "is-active" : undefined} href="#experience">{t.nav.experience}</a>
          <a className={activeSection === "work" ? "is-active" : undefined} href="#work">{t.nav.projects}</a>
          <a className={`nav-detail${activeSection === "education" ? " is-active" : ""}`} href="#education">{t.nav.education}</a>
          <a className={`nav-detail${activeSection === "certification" ? " is-active" : ""}`} href="#certification">{t.nav.certification}</a>
          <div className="language-switcher" role="group" aria-label={t.language}>
            <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={language === "vi"} onClick={() => setLanguage("vi")}>VI</button>
          </div>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? t.switchToLight : theme === "light" ? t.switchToSystem : t.switchToDark}
            title={`${t.theme}: ${theme === "dark" ? t.switchToLight : theme === "light" ? t.switchToSystem : t.switchToDark}`}
            onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")}
          >
            <span aria-hidden="true">{theme === "system" ? "◐" : theme === "dark" ? "☀" : "☾"}</span>
          </button>
          <a className="nav-cta" href="https://www.facebook.com/trieu.nguyenphu.0806" target="_blank" rel="noreferrer">{t.nav.contact}</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="status"><span aria-hidden="true" /> {t.status}</p>
            <h1>{t.hero}</h1>
            <p className="hero-lede">{t.lede}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">{t.explore}</a>
              <a className="button button--ghost" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub ↗</a>
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

        <div className="ticker" data-reveal aria-label="Areas of expertise">
          <span>AWS</span>
          <span>TERRAFORM</span>
          <span>DOCKER</span>
          <span>KUBERNETES</span>
          <span>CI/CD</span>
        </div>

        <section className="experience-section" id="experience">
          <header className="section-intro" data-reveal><span>{t.experienceLabel}</span><div><h2>{t.experienceHeading}</h2></div></header>
          <div className="experience-list">
            <article data-reveal>
              <p className="experience-date">{t.xbrainDate}</p>
              <div><h3>XBrain</h3><p>{t.xbrainRole}</p></div>
              <p>{t.xbrainText}</p>
            </article>
            <article data-reveal>
              <p className="experience-date">{t.techhausDate}</p>
              <div><h3>Techhaus Vietnam</h3><p>{t.techhausRole}</p></div>
              <p>{t.techhausText}</p>
            </article>
          </div>
        </section>

        <section className="projects-section" id="work">
          <header className="section-intro" data-reveal>
            <span>{t.projectsLabel}</span>
            <div><h2>{t.projectsHeading}</h2><p>{t.projectsText}</p></div>
          </header>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className={`project project--${project.slug}`} data-reveal key={project.slug}>
                <header><span>{project.date[language]}</span></header>
                <div className="project-visual" aria-label={`${project.title} architecture flow`}>
                  {project.visual.map((step, index) => (
                    <span key={step}><b>{step}</b>{index < project.visual.length - 1 ? <i aria-hidden="true">→</i> : null}</span>
                  ))}
                </div>
                <div className="project-body">
                  <p className="project-metric">{project.metric[language]}</p>
                  <h3>{project.title}</h3>
                  <p className="project-type">{project.type[language]}</p>
                  <p className="project-summary">{project.summary[language]}</p>
                </div>
                <ul className="tags" aria-label={`${project.title} technology stack`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <footer className="project-footer">
                  <a href={project.href} target="_blank" rel="noreferrer">{t.repository} <span>↗</span></a>
                  {project.live ? <a href={project.live} target="_blank" rel="noreferrer">{t.live} <span>↗</span></a> : null}
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <article className="skills-panel" data-reveal>
            <p className="panel-label">{t.toolkitLabel}</p>
            <h2>{t.toolkitHeading}</h2>
            <dl>{skills.map(([label, value]) => <div key={label.en}><dt>{label[language]}</dt><dd>{value}</dd></div>)}</dl>
          </article>
          <article className="education-panel" data-reveal id="education">
            <p className="panel-label">{t.educationLabel}</p>
            <div className="education-mark">UIT</div>
            <h2>{t.university}</h2>
            <p>2022—2026</p>
            <strong>{t.degree}</strong>
          </article>
        </section>

        <section className="certification-section" data-reveal id="certification">
          <p className="panel-label">{t.nav.certification}</p>
          <div><strong>IELTS</strong><span>Overall Band 5.5</span><time>2024</time></div>
        </section>

        <section className="contact-section" data-reveal>
          <p>{t.open}</p>
          <h2>{t.contactHeading}</h2>
          <div className="contact-links">
            <a href="mailto:nguyentrieu080604@gmail.com">nguyentrieu080604@gmail.com <span>↗</span></a>
            <a href="https://www.facebook.com/trieu.nguyenphu.0806" target="_blank" rel="noreferrer">Facebook <span>↗</span></a>
          </div>
          <nav className="contact-socials" aria-label="Social links">
            <a className="social-icon" href="https://www.facebook.com/trieu.nguyenphu.0806" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.75l.41-3H13.5V8.08c0-.87.24-1.46 1.5-1.46h1.78V3.94c-.31-.04-1.37-.13-2.61-.13-2.58 0-4.35 1.57-4.35 4.46V10H7v3h2.82v8h3.68Z" /></svg>
            </a>
            <a className="social-icon" href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.36V20h3.38v-5.7c0-1.5.29-2.96 2.15-2.96 1.84 0 1.87 1.72 1.87 3.05V20h3.68v-6.6Z" /></svg>
            </a>
            <a className="social-icon" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.36 9.36 0 0 1 12 6.87c.85 0 1.7.12 2.5.34 1.9-1.34 2.74-1.06 2.74-1.06.55 1.43.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.57 5.08.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12 6.58 17.52 2 12 2Z" clipRule="evenodd" /></svg>
            </a>
          </nav>
        </section>
      </main>

      {/*
      <footer className="site-footer" data-reveal>
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top">{t.name}</a>
            <p>{t.footerNote}</p>
          </div>
          <nav className="footer-socials" aria-label="Social links">
          <a className="social-icon" href="https://www.facebook.com/trieu.nguyenphu.0806" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.75l.41-3H13.5V8.08c0-.87.24-1.46 1.5-1.46h1.78V3.94c-.31-.04-1.37-.13-2.61-.13-2.58 0-4.35 1.57-4.35 4.46V10H7v3h2.82v8h3.68Z" /></svg>
          </a>
          <a className="social-icon" href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.36V20h3.38v-5.7c0-1.5.29-2.96 2.15-2.96 1.84 0 1.87 1.72 1.87 3.05V20h3.68v-6.6Z" /></svg>
          </a>
          <a className="social-icon" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.06A9.36 9.36 0 0 1 12 6.87c.85 0 1.7.12 2.5.34 1.9-1.34 2.74-1.06 2.74-1.06.55 1.43.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.57 5.08.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" clipRule="evenodd" /></svg>
          </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {t.name}</span>
          <a href="#top">{t.backToTop} ↑</a>
        </div>
      </footer>
      */}
    </>
  );
}
