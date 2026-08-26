"use client";

import { text } from "./lib/localization";
import { projects } from "./projects/projects";
import { useSitePreferences } from "./site-preferences";

const skills = [
  [text("Cloud & Infrastructure", "Cloud & hạ tầng"), "AWS, Terraform, AWS SAM, CloudFormation"],
  [text("Containers & GitOps", "Containers & GitOps"), "Docker, Kubernetes, Argo CD"],
  [text("CI/CD & Security", "CI/CD & bảo mật"), "GitHub Actions, Trivy, Cosign, Kubernetes RBAC"],
  [text("Monitoring & Systems", "Giám sát & hệ thống"), "Prometheus, Grafana, Linux, Bash, Git"],
  [text("Programming", "Lập trình"), "Python, Go, JavaScript, TypeScript"],
] as const;

const operatingModel = [
  {
    code: "01 / PROVISION",
    title: text("Rebuildable infrastructure", "Hạ tầng có thể dựng lại"),
    description: text(
      "Describe environments in Terraform or SAM, keep dependencies explicit, and make change review possible before apply.",
      "Mô tả môi trường bằng Terraform hoặc SAM, làm rõ dependency và cho phép rà soát thay đổi trước khi apply.",
    ),
    evidence: "Terraform · AWS SAM · CloudFormation · ADR",
  },
  {
    code: "02 / DELIVER",
    title: text("Progressive, observable releases", "Phát hành tăng tiến, có quan sát"),
    description: text(
      "Move changes from Git through ordered sync waves and let service health decide whether a canary is promoted or rolled back.",
      "Đưa thay đổi từ Git qua các sync wave có thứ tự và để sức khỏe dịch vụ quyết định promote hay rollback canary.",
    ),
    evidence: "Argo CD · GitHub Actions · Argo Rollouts · 95% gate",
  },
  {
    code: "03 / OBSERVE",
    title: text("Signals before assumptions", "Tín hiệu trước phỏng đoán"),
    description: text(
      "Connect metrics, logs, traces and SLOs so deployment decisions and incident reviews have inspectable evidence.",
      "Kết nối metrics, logs, traces và SLO để quyết định triển khai và rà soát sự cố có bằng chứng kiểm tra được.",
    ),
    evidence: "OpenTelemetry · Prometheus · Grafana · Loki",
  },
  {
    code: "04 / SECURE",
    title: text("Guardrails in the delivery path", "Guardrail ngay trong đường triển khai"),
    description: text(
      "Validate manifests, scan and sign images, enforce admission policy, and keep secrets outside application configuration.",
      "Xác thực manifest, scan và ký image, thực thi admission policy và giữ secret ngoài cấu hình ứng dụng.",
    ),
    evidence: "Trivy · Cosign · Gatekeeper · External Secrets",
  },
] as const;

const copy = {
  en: {
    certification: "Certification",
    status: "Entry-level DevOps Engineer",
    heroLead: "I turn infrastructure into a",
    heroAccent: "repeatable delivery system.",
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
    xbrainHighlights: [
      "Automated a Go/Kubernetes workload on EC2 behind a two-AZ AWS ALB with Terraform.",
      "Built GitOps canary delivery with a 95% Prometheus success gate and automatic rollback.",
      "Hardened Kubernetes with RBAC, Gatekeeper, External Secrets, Trivy and Cosign.",
    ],
    techhausRole: "Backend Developer Trainee",
    techhausText: "Developed and tested Python/Django backend features, RESTful APIs, database interactions, validation, error handling, and application logic. Collaborated through Git branches, pull requests, code reviews, debugging, and technical discussions.",
    techhausHighlights: [
      "Implemented REST endpoints and Django application logic from defined requirements.",
      "Validated database interactions, boundary cases and structured error handling.",
      "Worked through feature branches, pull requests, reviews and debugging sessions.",
    ],
    toolkitLabel: "Toolkit",
    toolkitHeading: "The tools behind the work.",
    educationLabel: "Education",
    university: "University of Information Technology",
    degree: "Bachelor of Software Engineering",
    xbrainDate: "Apr 2026 — Jul 2026",
    techhausDate: "Aug 2025 — Nov 2025",
    eyebrow: "CLOUD / DEVOPS ENGINEER · 2026",
    scroll: "Scroll to inspect",
    selectedLabel: "Selected systems",
    selectedHeading: "Built to survive the real world.",
    allProjects: "View all projects",
    viewRepo: "View repository",
    metricSystems: "selected systems",
    metricWaves: "ordered sync waves",
    metricServices: "domain services",
    metricGate: "canary success gate",
    methodLabel: "Operating model",
    methodHeading: "How I move a change into production.",
  },
  vi: {
    certification: "Chứng chỉ",
    status: "Kỹ sư DevOps mới bắt đầu",
    heroLead: "Tôi biến hạ tầng thành",
    heroAccent: "một hệ thống triển khai có thể lặp lại.",
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
    xbrainHighlights: [
      "Tự động hóa workload Go/Kubernetes trên EC2 sau AWS ALB hai AZ bằng Terraform.",
      "Xây GitOps canary delivery với ngưỡng Prometheus 95% và rollback tự động.",
      "Làm cứng Kubernetes bằng RBAC, Gatekeeper, External Secrets, Trivy và Cosign.",
    ],
    techhausRole: "Thực tập sinh Backend Developer",
    techhausText: "Phát triển và kiểm thử tính năng backend Python/Django, RESTful API, tương tác cơ sở dữ liệu, validation, xử lý lỗi và application logic. Phối hợp qua Git branch, pull request, code review, debugging và trao đổi kỹ thuật.",
    techhausHighlights: [
      "Hiện thực REST endpoint và logic Django từ yêu cầu đã xác định.",
      "Kiểm tra tương tác database, trường hợp biên và xử lý lỗi có cấu trúc.",
      "Làm việc qua feature branch, pull request, code review và debugging.",
    ],
    toolkitLabel: "Công cụ",
    toolkitHeading: "Công cụ đằng sau từng dự án.",
    educationLabel: "Học vấn",
    university: "Đại học Công nghệ Thông tin",
    degree: "Cử nhân Kỹ thuật Phần mềm",
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    techhausDate: "Tháng 8 2025 — Tháng 11 2025",
    eyebrow: "KỸ SƯ CLOUD / DEVOPS · 2026",
    scroll: "Cuộn để khám phá",
    selectedLabel: "Hệ thống tiêu biểu",
    selectedHeading: "Được xây để vận hành ngoài thực tế.",
    allProjects: "Xem tất cả dự án",
    viewRepo: "Xem repository",
    metricSystems: "hệ thống tiêu biểu",
    metricWaves: "sync wave có thứ tự",
    metricServices: "dịch vụ domain",
    metricGate: "ngưỡng canary thành công",
    methodLabel: "Mô hình vận hành",
    methodHeading: "Cách tôi đưa một thay đổi vào production.",
  },
} as const;

export default function Home() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
      <main>
        <div id="about">
        <section className="hero">
          <div className="hero-copy" data-reveal>
            <div className="hero-eyebrow"><span>{t.eyebrow}</span><span>BASED IN VIETNAM</span></div>
            <h1>{t.heroLead} <span>{t.heroAccent}</span></h1>
            <p className="hero-lede">{t.lede}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="/projects">{t.explore}</a>
              <a className="button button--ghost" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className="hero-scroll"><i /><span>{t.scroll}</span></div>
          </div>

          <div className="hero-console-stack" data-reveal data-reveal-delay="1" aria-hidden="true">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <div className="orbit-core"><span>01</span><strong>SHIP</strong><small>CONTINUOUSLY</small></div>
            <span className="topology-node topology-node--aws">AWS<small>cloud</small></span>
            <span className="topology-node topology-node--k8s">K8S<small>runtime</small></span>
            <span className="topology-node topology-node--tf">TF<small>provision</small></span>
            <span className="topology-node topology-node--git">GIT<small>source</small></span>
            <aside className="hero-console" aria-label="Core engineering focus">
              <div className="console-head"><span>DEPLOYMENT PROFILE</span><span>2026</span></div>
              <p className="console-label">{t.status}</p>
              <strong>DEVOPS</strong>
              <dl>
                <div><dt>{t.cloud}</dt><dd>AWS</dd></div>
                <div><dt>{t.orchestration}</dt><dd>Kubernetes</dd></div>
                <div><dt>{t.infrastructure}</dt><dd>Terraform</dd></div>
                <div><dt>{t.delivery}</dt><dd>GitHub Actions</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <div className="ticker" aria-label="Areas of expertise. Focus or hover to pause." data-reveal tabIndex={0}>
          <div><span>AWS</span><span>TERRAFORM</span><span>DOCKER</span><span>KUBERNETES</span><span>CI/CD</span><span>GITOPS</span><span>PROMETHEUS</span><span>ARGO CD</span></div>
          <div aria-hidden="true"><span>AWS</span><span>TERRAFORM</span><span>DOCKER</span><span>KUBERNETES</span><span>CI/CD</span><span>GITOPS</span><span>PROMETHEUS</span><span>ARGO CD</span></div>
        </div>

        <section className="proof-strip" aria-label="Portfolio evidence" data-reveal>
          <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>{t.metricSystems}</span></div>
          <div><strong>05</strong><span>{t.metricWaves}</span></div>
          <div><strong>07</strong><span>{t.metricServices}</span></div>
          <div><strong>95%</strong><span>{t.metricGate}</span></div>
        </section>

        <section className="experience-section">
          <header className="section-intro" data-reveal><span>{t.experienceLabel}</span><div><h2>{t.experienceHeading}</h2></div></header>
          <div className="experience-list">
            <article data-reveal>
              <p className="experience-date">{t.xbrainDate}</p>
              <div className="experience-role"><h3>XBrain</h3><p>{t.xbrainRole}</p></div>
              <div className="experience-detail"><p>{t.xbrainText}</p><ul>{t.xbrainHighlights.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </article>
            <article data-reveal data-reveal-delay="1">
              <p className="experience-date">{t.techhausDate}</p>
              <div className="experience-role"><h3>Techhaus Vietnam</h3><p>{t.techhausRole}</p></div>
              <div className="experience-detail"><p>{t.techhausText}</p><ul>{t.techhausHighlights.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </article>
          </div>
        </section>

        <section className="operations-section">
          <header className="section-intro" data-reveal><span>{t.methodLabel}</span><div><h2>{t.methodHeading}</h2></div></header>
          <div className="operations-flow">
            {operatingModel.map((item, index) => (
              <article key={item.code} data-reveal data-reveal-delay={String(index % 3)}>
                <span>{item.code}</span>
                <div className="operation-node" aria-hidden="true"><i /></div>
                <h3>{item.title[language]}</h3>
                <p>{item.description[language]}</p>
                <code>{item.evidence}</code>
              </article>
            ))}
          </div>
        </section>

        <section className="selected-section">
          <header className="section-intro" data-reveal><span>{t.selectedLabel}</span><div><h2>{t.selectedHeading}</h2></div></header>
          <div className="selected-projects">
            {projects.slice(0, 3).map((project, index) => (
              <a href={project.href} target="_blank" rel="noreferrer" className="selected-project" key={project.slug} data-reveal data-reveal-delay={String(index)}>
                <span className="selected-index">0{index + 1}</span>
                <div><p>{project.type[language]}</p><h3>{project.title}</h3></div>
                <ul>{project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
                <span className="selected-arrow" aria-label={t.viewRepo}>↗</span>
              </a>
            ))}
          </div>
          <a className="text-link" href="/projects">{t.allProjects}<span>→</span></a>
        </section>

        <section className="profile-section">
          <article className="skills-panel" data-reveal>
            <h2>{t.toolkitLabel}</h2>
            <p className="panel-summary">{t.toolkitHeading}</p>
            <dl>{skills.map(([label, value]) => <div key={label.en}><dt>{label[language]}</dt><dd>{value}</dd></div>)}</dl>
          </article>
          <article className="education-panel" data-reveal data-reveal-delay="1">
            <h2>{t.educationLabel}</h2>
            <div className="education-mark">UIT</div>
            <h3>{t.university}</h3>
            <p>2022—2026</p>
            <strong>{t.degree}</strong>
          </article>
        </section>

        <section className="certification-section" data-reveal>
          <h2>{t.certification}</h2>
          <div><strong>IELTS</strong><span>Overall Band 5.5</span><time>2024</time></div>
        </section>
        </div>

      </main>
  );
}
