"use client";

import { useEffect, useState } from "react";

type Language = "en" | "vi";
type Localized = Record<Language, string>;

const text = (en: string, vi: string): Localized => ({ en, vi });

const projects = [
  {
    index: "01",
    slug: "seckube",
    title: "SecKube",
    type: text("Kubernetes GitOps & Security Platform", "Nền tảng GitOps & bảo mật Kubernetes"),
    date: text("July 2026", "Tháng 7, 2026"),
    summary: text(
      "A secure GitOps platform built around five ordered Argo CD sync waves, canary analysis, admission policies, signed images, and automatic rollback.",
      "Nền tảng GitOps bảo mật với năm nhịp đồng bộ Argo CD, phân tích canary, admission policies, image signing và tự động rollback.",
    ),
    stack: ["Kubernetes", "Argo CD", "Prometheus", "Gatekeeper", "Cosign"],
    href: "https://github.com/TrieuNguyenPhu/SecKube",
    visual: ["SOURCE", "BUILD", "SIGN", "SYNC", "VERIFY"],
    metric: text("5 sync waves", "5 nhịp đồng bộ"),
  },
  {
    index: "02",
    slug: "shortenlink",
    title: "ShortenLink",
    type: text("Serverless URL Shortener on AWS", "Trình rút gọn URL serverless trên AWS"),
    date: text("May — July 2026", "Tháng 5 — Tháng 7, 2026"),
    summary: text(
      "A Next.js and Go platform using Lambda, DynamoDB, CloudFront, Route 53, SAM, automated tests, vulnerability scans, and deployment smoke checks.",
      "Nền tảng Next.js và Go dùng Lambda, DynamoDB, CloudFront, Route 53, SAM, kiểm thử tự động, quét lỗ hổng và smoke test sau khi deploy.",
    ),
    stack: ["Next.js", "Go", "Lambda", "DynamoDB", "CloudFormation"],
    href: "https://github.com/TrieuNguyenPhu/shorten-link",
    live: "https://npt-shortenlink.dev",
    visual: ["EDGE", "API", "LAMBDA", "DATA"],
    metric: text("Serverless stack", "Kiến trúc serverless"),
  },
];

const skills = [
  [text("Cloud & IaC", "Cloud & IaC"), "AWS, Terraform, AWS SAM, CloudFormation"],
  [text("Containers", "Containers"), "Docker, Docker Compose, Kubernetes, Minikube"],
  [text("Delivery", "Triển khai"), "GitHub Actions, Argo CD, Argo Rollouts, GHCR"],
  [text("Security", "Bảo mật"), "Trivy, Cosign, OPA Gatekeeper, Kubernetes RBAC"],
  [text("Systems", "Hệ thống"), "Python, Go, Bash, Linux, Git, Nginx"],
] as const;

const copy = {
  en: {
    name: "Nguyen Phu Trieu",
    role: "DevOps Engineer",
    nav: { projects: "Projects", experience: "Experience", contact: "Contact" },
    language: "Language",
    status: "Entry-level DevOps Engineer",
    hero: "I turn infrastructure into a repeatable delivery system.",
    lede: "AWS, Kubernetes, Terraform, GitOps, CI/CD, observability, and cloud security—supported by a backend foundation in Python and Go.",
    explore: "Explore my work",
    focus: "Primary focus",
    cloud: "Cloud",
    orchestration: "Orchestration",
    infrastructure: "Infrastructure",
    delivery: "Delivery",
    projectsLabel: "01 / Personal projects",
    projectsHeading: "Systems I built from the ground up.",
    projectsText: "Selected work across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
    repository: "View repository",
    live: "Live site",
    experienceLabel: "02 / Experience",
    experienceHeading: "From backend code to cloud operations.",
    xbrainRole: "DevOps Engineer Trainee",
    xbrainText: "Infrastructure planning, Terraform design review, AWS dependency analysis, compliance evidence, audit backlogs, and Git-based change workflows.",
    techhausRole: "Backend Developer Trainee",
    techhausText: "Python and Django backend work covering REST APIs, databases, validation, error handling, pull requests, code reviews, and debugging.",
    toolkitLabel: "03 / Toolkit",
    toolkitHeading: "The tools behind the work.",
    educationLabel: "04 / Education",
    university: "University of Information Technology",
    degree: "Bachelor of Engineering",
    major: "Software Engineering",
    open: "Open to DevOps opportunities",
    contactHeading: "Let’s build a better path to production.",
    phone: "Phone",
  },
  vi: {
    name: "Nguyễn Phú Triệu",
    role: "Kỹ sư DevOps",
    nav: { projects: "Dự án", experience: "Kinh nghiệm", contact: "Liên hệ" },
    language: "Ngôn ngữ",
    status: "Kỹ sư DevOps mới bắt đầu",
    hero: "Tôi biến hạ tầng thành một hệ thống triển khai có thể lặp lại.",
    lede: "AWS, Kubernetes, Terraform, GitOps, CI/CD, quan sát hệ thống và bảo mật đám mây—cùng nền tảng backend bằng Python và Go.",
    explore: "Xem dự án",
    focus: "Trọng tâm",
    cloud: "Đám mây",
    orchestration: "Điều phối",
    infrastructure: "Hạ tầng",
    delivery: "Triển khai",
    projectsLabel: "01 / Dự án cá nhân",
    projectsHeading: "Những hệ thống tôi xây dựng từ đầu.",
    projectsText: "Các dự án về Kubernetes, hạ tầng AWS, bảo mật, containers và tự động hóa triển khai.",
    repository: "Xem repository",
    live: "Trang web",
    experienceLabel: "02 / Kinh nghiệm",
    experienceHeading: "Từ code backend đến vận hành cloud.",
    xbrainRole: "Thực tập sinh Kỹ sư DevOps",
    xbrainText: "Lập kế hoạch hạ tầng, đánh giá thiết kế Terraform, phân tích phụ thuộc AWS, bằng chứng tuân thủ, audit backlog và quy trình thay đổi dựa trên Git.",
    techhausRole: "Thực tập sinh Backend Developer",
    techhausText: "Phát triển backend bằng Python và Django: REST API, cơ sở dữ liệu, validation, xử lý lỗi, pull request, code review và debugging.",
    toolkitLabel: "03 / Công cụ",
    toolkitHeading: "Công cụ đằng sau từng dự án.",
    educationLabel: "04 / Học vấn",
    university: "Đại học Công nghệ Thông tin",
    degree: "Cử nhân Kỹ thuật",
    major: "Kỹ thuật Phần mềm",
    open: "Sẵn sàng cho cơ hội DevOps",
    contactHeading: "Cùng xây dựng con đường tốt hơn đến production.",
    phone: "Điện thoại",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "vi") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  return (
    <>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label={`${t.name}, home`}>
          <span>{t.name}</span>
          <small>{t.role}</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">{t.nav.projects}</a>
          <a href="#experience">{t.nav.experience}</a>
          <div className="language-switcher" role="group" aria-label={t.language}>
            <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={language === "vi"} onClick={() => setLanguage("vi")}>VI</button>
          </div>
          <a className="nav-cta" href="mailto:nguyentrieu080604@gmail.com">{t.nav.contact}</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
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
            <strong>DEV<br />OPS</strong>
            <dl>
              <div><dt>{t.cloud}</dt><dd>AWS</dd></div>
              <div><dt>{t.orchestration}</dt><dd>Kubernetes</dd></div>
              <div><dt>{t.infrastructure}</dt><dd>Terraform</dd></div>
              <div><dt>{t.delivery}</dt><dd>GitHub Actions</dd></div>
            </dl>
          </aside>
        </section>

        <div className="ticker" aria-label="Areas of expertise">
          <span>AWS</span><i />
          <span>KUBERNETES</span><i />
          <span>TERRAFORM</span><i />
          <span>GITOPS</span><i />
          <span>CI/CD</span><i />
          <span>LINUX</span>
        </div>

        <section className="projects-section" id="work">
          <header className="section-intro">
            <span>{t.projectsLabel}</span>
            <div><h2>{t.projectsHeading}</h2><p>{t.projectsText}</p></div>
          </header>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className={`project project--${project.slug}`} key={project.slug}>
                <header><span>{project.index}</span><span>{project.date[language]}</span></header>
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

        <section className="experience-section" id="experience">
          <header className="section-intro"><span>{t.experienceLabel}</span><div><h2>{t.experienceHeading}</h2></div></header>
          <div className="experience-list">
            <article>
              <p className="experience-date">04 / 2026 — 07 / 2026</p>
              <div><h3>XBrain</h3><p>{t.xbrainRole}</p></div>
              <p>{t.xbrainText}</p>
            </article>
            <article>
              <p className="experience-date">08 / 2025 — 11 / 2025</p>
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
            <p>VNU-HCM · 2022—2026</p>
            <strong>{t.degree}<br />{t.major}</strong>
            <div className="certification"><span>IELTS</span><strong>Overall Band 5.5 · 2024</strong></div>
          </article>
        </section>

        <section className="contact-section">
          <p>{t.open}</p>
          <h2>{t.contactHeading}</h2>
          <a href="mailto:nguyentrieu080604@gmail.com">nguyentrieu080604@gmail.com <span>↗</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 Nguyen Phu Trieu</span>
        <nav aria-label="Social links">
          <a href="tel:+84858976459">{t.phone}</a>
          <a href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </>
  );
}
