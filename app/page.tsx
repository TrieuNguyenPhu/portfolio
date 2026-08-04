"use client";

import { text } from "./lib/localization";
import { useSitePreferences } from "./site-preferences";

const skills = [
  [text("Cloud & Infrastructure", "Cloud & hạ tầng"), "AWS, Terraform, AWS SAM, CloudFormation"],
  [text("Containers & GitOps", "Containers & GitOps"), "Docker, Kubernetes, Argo CD"],
  [text("CI/CD & Security", "CI/CD & bảo mật"), "GitHub Actions, Trivy, Cosign, Kubernetes RBAC"],
  [text("Monitoring & Systems", "Giám sát & hệ thống"), "Prometheus, Grafana, Linux, Bash, Git"],
  [text("Programming", "Lập trình"), "Python, Go, JavaScript, TypeScript"],
] as const;

const copy = {
  en: {
    certification: "Certification",
    status: "Entry-level DevOps Engineer",
    hero: "I turn infrastructure into a repeatable delivery system.",
    lede: "Hands-on experience designing and automating cloud-native AWS infrastructure, CI/CD, and GitOps workflows with Terraform, Docker, Kubernetes, GitHub Actions, Argo CD, and Prometheus—backed by Python and Go.",
    explore: "Explore my work",
    focus: "Primary focus",
    cloud: "Cloud",
    orchestration: "Orchestration",
    infrastructure: "Infrastructure",
    delivery: "Delivery",
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
    xbrainDate: "Apr 2026 — Jul 2026",
    techhausDate: "Aug 2025 — Nov 2025",
  },
  vi: {
    certification: "Chứng chỉ",
    status: "Kỹ sư DevOps mới bắt đầu",
    hero: "Tôi biến hạ tầng thành một hệ thống triển khai có thể lặp lại.",
    lede: "Có kinh nghiệm thực hành thiết kế và tự động hóa hạ tầng AWS cloud-native, CI/CD và GitOps với Terraform, Docker, Kubernetes, GitHub Actions, Argo CD, Prometheus—cùng nền tảng Python và Go.",
    explore: "Xem dự án",
    focus: "Trọng tâm",
    cloud: "Đám mây",
    orchestration: "Điều phối",
    infrastructure: "Hạ tầng",
    delivery: "Triển khai",
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
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    techhausDate: "Tháng 8 2025 — Tháng 11 2025",
  },
} as const;

export default function Home() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
      <main>
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
          <p className="panel-label">{t.certification}</p>
          <div><strong>IELTS</strong><span>Overall Band 5.5</span><time>2024</time></div>
        </section>
        </div>

      </main>
  );
}
