"use client";

import Link from "next/link";
import { DeliveryMap, ProjectArchitecture } from "./architecture-visual";
import { posts } from "./blog/posts";
import { text } from "./lib/localization";
import { projects } from "./projects/projects";
import { useSitePreferences } from "./site-preferences";
import UiIcon, { type IconName } from "./ui-icon";

const skills = [
  [text("Cloud & Infrastructure", "Cloud & hạ tầng"), "AWS, Terraform, AWS SAM, CloudFormation"],
  [text("Containers & GitOps", "Containers & GitOps"), "Docker, Kubernetes, Argo CD"],
  [text("CI/CD & Security", "CI/CD & bảo mật"), "GitHub Actions, Trivy, Cosign, Kubernetes RBAC"],
  [text("Observability & Systems", "Quan sát & hệ thống"), "Prometheus, Grafana, Linux, Bash, Git"],
  [text("Programming", "Lập trình"), "Python, Go, JavaScript, TypeScript"],
] as const;

const operatingModel = [
  {
    code: "PROVISION",
    icon: "cloud" as IconName,
    title: text("Rebuildable by design", "Có thể dựng lại ngay từ thiết kế"),
    description: text(
      "Describe environments as code, expose dependencies, and make every infrastructure change reviewable before it reaches a runtime.",
      "Mô tả môi trường bằng code, làm rõ dependency và biến mọi thay đổi hạ tầng thành thứ có thể rà soát trước khi vào runtime.",
    ),
    evidence: "Terraform · AWS SAM · CloudFormation · ADR",
  },
  {
    code: "DELIVER",
    icon: "workflow" as IconName,
    title: text("Release with a way back", "Phát hành luôn có đường lui"),
    description: text(
      "Move changes through ordered delivery stages, promote from health signals, and keep rollback paths visible instead of relying on operator memory.",
      "Đưa thay đổi qua các giai đoạn có thứ tự, promote theo tín hiệu sức khỏe và giữ đường rollback rõ ràng thay vì phụ thuộc trí nhớ người vận hành.",
    ),
    evidence: "Argo CD · GitHub Actions · Argo Rollouts · health gates",
  },
  {
    code: "OBSERVE",
    icon: "database" as IconName,
    title: text("Evidence before assumptions", "Bằng chứng trước phỏng đoán"),
    description: text(
      "Connect metrics, logs and deployment context so incidents can be explained, release decisions can be inspected, and learning survives the handoff.",
      "Kết nối metrics, logs và ngữ cảnh triển khai để giải thích sự cố, kiểm tra quyết định phát hành và giữ lại tri thức sau bàn giao.",
    ),
    evidence: "OpenTelemetry · Prometheus · Grafana · Loki",
  },
  {
    code: "SECURE",
    icon: "shield" as IconName,
    title: text("Trust belongs in the path", "Niềm tin phải nằm trong luồng triển khai"),
    description: text(
      "Scan and sign artifacts, enforce policy at admission, and separate secrets from application configuration so safety is a default path.",
      "Scan và ký artifact, thực thi policy tại admission, tách secret khỏi cấu hình ứng dụng để an toàn trở thành đường mặc định.",
    ),
    evidence: "Trivy · Cosign · Gatekeeper · External Secrets",
  },
] as const;

const copy = {
  en: {
    eyebrow: "CLOUD / DEVOPS ENGINEER · HO CHI MINH CITY",
    heroLead: "I engineer change into",
    heroAccent: "reliable production.",
    lede: "I design cloud infrastructure, delivery pipelines, and observable runtimes that make change repeatable, inspectable, and safe to reverse—using AWS, Terraform, Kubernetes, GitOps, Python, and Go.",
    explore: "Explore case studies",
    status: "Available for DevOps and Cloud opportunities",
    currentLabel: "CURRENT DIRECTION",
    currentTitle: "Cloud-native delivery with evidence built into every change.",
    currentText: "My portfolio connects application engineering with infrastructure, security, and operations. The goal is not a longer tool list—it is a system another engineer can understand, rebuild, and operate.",
    focus: "FOCUS",
    practice: "PRACTICE",
    proof: "PROOF",
    focusValue: "Reliable delivery",
    practiceValue: "Infrastructure as code",
    proofValue: "Public technical repositories",
    selectedLabel: "SELECTED CASE STUDIES",
    selectedHeading: "Systems explained through architecture and decisions.",
    selectedIntro: "Each project shows the delivery path, the constraints I protected, and the engineering choices that make the system reproducible.",
    architecture: "Architecture",
    decisions: "Engineering evidence",
    repository: "Inspect repository",
    allProjects: "Open the complete project archive",
    methodLabel: "ENGINEERING PRINCIPLES",
    methodHeading: "How I think about operating software.",
    experienceLabel: "EXPERIENCE",
    experienceHeading: "Application context, infrastructure discipline.",
    xbrainRole: "DevOps Engineer Trainee",
    xbrainDate: "Apr 2026 — Jul 2026",
    xbrainText: "Applied DevOps governance across provisioning, configuration review, compliance validation, auditing, monitoring, and technical documentation. Reviewed Terraform designs and AWS dependencies, prepared implementation plans, and supported audit evidence validation.",
    xbrainHighlights: [
      "Automated a Go and Kubernetes workload on EC2 behind a two-AZ AWS Application Load Balancer with Terraform.",
      "Built GitOps canary delivery with Prometheus validation and automatic rollback.",
      "Hardened Kubernetes boundaries with RBAC, Gatekeeper, External Secrets, Trivy, and Cosign.",
    ],
    techhausRole: "Backend Developer Trainee",
    techhausDate: "Aug 2025 — Nov 2025",
    techhausText: "Developed and tested Python and Django backend features, REST APIs, database interactions, validation, error handling, and application logic. Collaborated through Git branches, pull requests, reviews, debugging, and technical discussions.",
    techhausHighlights: [
      "Implemented REST endpoints and Django application logic from defined requirements.",
      "Validated database interactions, boundary cases, and structured error handling.",
      "Worked through feature branches, pull requests, code reviews, and debugging sessions.",
    ],
    writingLabel: "FIELD NOTES",
    writingHeading: "Writing turns project work into reusable knowledge.",
    writingText: "I document the reasoning behind delivery systems, not only the final configuration. That makes trade-offs visible and gives future work a better starting point.",
    readArticle: "Read the field note",
    toolkitLabel: "TECHNICAL RANGE",
    toolkitHeading: "Tools chosen around the system, not the other way around.",
    educationLabel: "EDUCATION",
    university: "University of Information Technology",
    degree: "Bachelor of Software Engineering",
    certification: "CERTIFICATION",
  },
  vi: {
    eyebrow: "KỸ SƯ CLOUD / DEVOPS · TP. HỒ CHÍ MINH",
    heroLead: "Tôi biến thay đổi thành",
    heroAccent: "production đáng tin cậy.",
    lede: "Tôi thiết kế hạ tầng cloud, pipeline triển khai và runtime có khả năng quan sát để mọi thay đổi đều có thể lặp lại, kiểm tra và quay lui an toàn—với AWS, Terraform, Kubernetes, GitOps, Python và Go.",
    explore: "Khám phá case study",
    status: "Sẵn sàng cho cơ hội DevOps và Cloud",
    currentLabel: "ĐỊNH HƯỚNG HIỆN TẠI",
    currentTitle: "Cloud-native delivery với bằng chứng nằm trong mọi thay đổi.",
    currentText: "Portfolio của tôi kết nối application engineering với hạ tầng, bảo mật và vận hành. Mục tiêu không phải danh sách công cụ dài hơn, mà là một hệ thống kỹ sư khác có thể hiểu, dựng lại và vận hành.",
    focus: "TRỌNG TÂM",
    practice: "THỰC HÀNH",
    proof: "BẰNG CHỨNG",
    focusValue: "Triển khai đáng tin cậy",
    practiceValue: "Hạ tầng dưới dạng code",
    proofValue: "Repository kỹ thuật công khai",
    selectedLabel: "CASE STUDY TIÊU BIỂU",
    selectedHeading: "Hệ thống được giải thích bằng kiến trúc và quyết định.",
    selectedIntro: "Mỗi dự án thể hiện luồng triển khai, ràng buộc cần bảo vệ và các lựa chọn kỹ thuật giúp hệ thống có thể tái lập.",
    architecture: "Kiến trúc",
    decisions: "Bằng chứng kỹ thuật",
    repository: "Xem repository",
    allProjects: "Mở toàn bộ kho dự án",
    methodLabel: "NGUYÊN TẮC KỸ THUẬT",
    methodHeading: "Cách tôi tư duy về vận hành phần mềm.",
    experienceLabel: "KINH NGHIỆM",
    experienceHeading: "Hiểu ứng dụng, kỷ luật với hạ tầng.",
    xbrainRole: "Thực tập sinh Kỹ sư DevOps",
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    xbrainText: "Áp dụng thực hành quản trị DevOps trong provisioning, rà soát cấu hình, xác thực tuân thủ, auditing, monitoring và tài liệu kỹ thuật. Rà soát thiết kế Terraform cùng dependency AWS, lập kế hoạch triển khai và hỗ trợ xác thực bằng chứng audit.",
    xbrainHighlights: [
      "Tự động hóa workload Go và Kubernetes trên EC2 sau AWS Application Load Balancer hai AZ bằng Terraform.",
      "Xây GitOps canary delivery với xác thực Prometheus và rollback tự động.",
      "Làm cứng ranh giới Kubernetes bằng RBAC, Gatekeeper, External Secrets, Trivy và Cosign.",
    ],
    techhausRole: "Thực tập sinh Backend Developer",
    techhausDate: "Tháng 8 2025 — Tháng 11 2025",
    techhausText: "Phát triển và kiểm thử tính năng backend Python và Django, REST API, tương tác cơ sở dữ liệu, validation, xử lý lỗi và application logic. Phối hợp qua Git branch, pull request, review, debugging và trao đổi kỹ thuật.",
    techhausHighlights: [
      "Hiện thực REST endpoint và logic Django từ yêu cầu đã xác định.",
      "Kiểm tra tương tác database, trường hợp biên và xử lý lỗi có cấu trúc.",
      "Làm việc qua feature branch, pull request, code review và debugging.",
    ],
    writingLabel: "GHI CHÉP KỸ THUẬT",
    writingHeading: "Viết giúp kinh nghiệm dự án trở thành tri thức có thể tái sử dụng.",
    writingText: "Tôi ghi lại lập luận đằng sau hệ thống triển khai, không chỉ cấu hình cuối cùng. Nhờ đó trade-off trở nên rõ ràng và dự án tiếp theo có điểm bắt đầu tốt hơn.",
    readArticle: "Đọc bài ghi chép",
    toolkitLabel: "NĂNG LỰC KỸ THUẬT",
    toolkitHeading: "Chọn công cụ theo hệ thống, không ép hệ thống theo công cụ.",
    educationLabel: "HỌC VẤN",
    university: "Đại học Công nghệ Thông tin",
    degree: "Cử nhân Kỹ thuật Phần mềm",
    certification: "CHỨNG CHỈ",
  },
} as const;

export default function Home() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];
  const post = posts[0];

  return (
    <main>
      <div id="about">
        <section className="hero">
          <div className="hero-copy" data-reveal>
            <div className="hero-eyebrow"><span>{t.eyebrow}</span><span><i /> {t.status}</span></div>
            <h1>{t.heroLead} <span>{t.heroAccent}</span></h1>
            <p className="hero-lede">{t.lede}</p>
            <div className="hero-actions">
              <Link className="button button--primary" href="#case-studies"><UiIcon name="projects" />{t.explore}<UiIcon name="arrow" /></Link>
              <a className="button button--ghost" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer"><UiIcon name="code" />GitHub<UiIcon name="arrow" /></a>
            </div>
          </div>
          <div className="hero-visual" data-reveal data-reveal-delay="1"><DeliveryMap /></div>
        </section>

        <div className="ticker" aria-label="Areas of expertise. Focus or hover to pause." data-reveal tabIndex={0}>
          <div><span>AWS</span><span>TERRAFORM</span><span>DOCKER</span><span>KUBERNETES</span><span>CI/CD</span><span>GITOPS</span><span>PROMETHEUS</span><span>ARGO CD</span></div>
          <div aria-hidden="true"><span>AWS</span><span>TERRAFORM</span><span>DOCKER</span><span>KUBERNETES</span><span>CI/CD</span><span>GITOPS</span><span>PROMETHEUS</span><span>ARGO CD</span></div>
        </div>

        <section className="direction-section" data-reveal>
          <div className="direction-copy"><span>{t.currentLabel}</span><h2>{t.currentTitle}</h2><p>{t.currentText}</p></div>
          <dl className="direction-facts">
            <div><UiIcon name="shield" /><dt>{t.focus}</dt><dd>{t.focusValue}</dd></div>
            <div><UiIcon name="workflow" /><dt>{t.practice}</dt><dd>{t.practiceValue}</dd></div>
            <div><UiIcon name="code" /><dt>{t.proof}</dt><dd>{t.proofValue}</dd></div>
          </dl>
        </section>

        <section className="case-studies" id="case-studies">
          <header className="section-intro" data-reveal>
            <span>{t.selectedLabel}</span>
            <div><h2>{t.selectedHeading}</h2><p>{t.selectedIntro}</p></div>
          </header>
          <div className="case-list">
            {projects.slice(0, 3).map((project, index) => (
              <article className="case-study" key={project.slug} data-reveal>
                <header><span>{project.stage[language]}</span><time>{project.date[language]}</time></header>
                <div className="case-visual"><ProjectArchitecture project={project} variant={index} language={language} /></div>
                <div className="case-copy">
                  <p className="case-type">{project.type[language]}</p>
                  <h3>{project.title}</h3>
                  <p className="case-summary">{project.summary[language]}</p>
                  <div className="case-architecture"><span>{t.architecture}</span><code>{project.architecture[language]}</code></div>
                  <div className="case-evidence"><span>{t.decisions}</span><ul>{project.highlights.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div>
                  <ul className="tags" aria-label={`${project.title} technology stack`}>{project.stack.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
                  <a className="case-link" href={project.href} target="_blank" rel="noreferrer">{t.repository}<span><UiIcon name="arrow" /></span></a>
                </div>
              </article>
            ))}
          </div>
          <Link className="archive-link" href="/projects"><span>{t.allProjects}</span><i><UiIcon name="arrow" /></i></Link>
        </section>

        <section className="operations-section">
          <header className="section-intro" data-reveal><span>{t.methodLabel}</span><div><h2>{t.methodHeading}</h2></div></header>
          <div className="operations-flow">
            {operatingModel.map((item, index) => (
              <article key={item.code} data-reveal data-reveal-delay={String(index % 3)}>
                <span className="operation-code"><UiIcon name={item.icon} />{item.code}</span><i className="operation-signal" aria-hidden="true" />
                <h3>{item.title[language]}</h3><p>{item.description[language]}</p><code>{item.evidence}</code>
              </article>
            ))}
          </div>
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

        <section className="writing-section" data-reveal>
          <div className="writing-copy"><span>{t.writingLabel}</span><h2>{t.writingHeading}</h2><p>{t.writingText}</p></div>
          <Link className="writing-card" href={`/blog/${post.slug}`}>
            <div className="blog-meta"><time dateTime={post.publishedAt}>{post.displayDate[language]}</time><span>{post.readingTime[language]}</span></div>
            <h3>{post.title[language]}</h3><p>{post.excerpt[language]}</p>
            <strong><UiIcon name="blog" />{t.readArticle}<i><UiIcon name="arrow" /></i></strong>
          </Link>
        </section>

        <section className="profile-section">
          <article className="skills-panel" data-reveal>
            <span>{t.toolkitLabel}</span><h2>{t.toolkitHeading}</h2>
            <dl>{skills.map(([label, value]) => <div key={label.en}><dt>{label[language]}</dt><dd>{value}</dd></div>)}</dl>
          </article>
          <article className="education-panel" data-reveal data-reveal-delay="1">
            <span>{t.educationLabel}</span><div className="education-mark">UIT</div><h2>{t.university}</h2><p>2022—2026</p><strong>{t.degree}</strong>
          </article>
        </section>

        <section className="certification-section" data-reveal>
          <h2>{t.certification}</h2><div><strong>IELTS</strong><span>Overall Band 5.5</span><time>2024</time></div>
        </section>
      </div>
    </main>
  );
}
