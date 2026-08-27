"use client";

import Link from "next/link";
import { CloudWorkbench, ProjectArchitecture } from "./architecture-visual";
import { posts } from "./blog/posts";
import { text } from "./lib/localization";
import { projects } from "./projects/projects";
import { useSitePreferences } from "./site-preferences";
import UiIcon, { type IconName } from "./ui-icon";

const expertise = [
  {
    icon: "cloud" as IconName,
    title: text("Cloud Infrastructure", "Hạ tầng Cloud"),
    description: text("I turn environments into reviewable, repeatable code instead of one-off console work.", "Tôi biến môi trường thành code có thể review và tái lập, thay vì thao tác thủ công trên console."),
    focus: text("What I build", "Tôi xây dựng"), focusValue: "AWS · Terraform · Serverless · Linux",
    tools: text("Core tools", "Công cụ chính"), toolValue: "Terraform, AWS SAM, CloudFormation, Bash",
  },
  {
    icon: "workflow" as IconName,
    title: text("Delivery & Security", "Triển khai & Bảo mật"),
    description: text("I design delivery paths with visible checks, progressive releases, and a safe way back.", "Tôi thiết kế luồng triển khai có kiểm tra rõ ràng, phát hành tăng dần và luôn có đường lui an toàn."),
    focus: text("What I protect", "Tôi bảo vệ"), focusValue: "CI/CD · GitOps · Supply chain · Policy",
    tools: text("Core tools", "Công cụ chính"), toolValue: "GitHub Actions, Argo CD, Trivy, Cosign",
  },
  {
    icon: "database" as IconName,
    title: text("Software & Observability", "Phần mềm & Quan sát"),
    description: text("I connect application behavior to metrics and logs so systems can be explained under pressure.", "Tôi kết nối hành vi ứng dụng với metrics và logs để hệ thống vẫn có thể được giải thích khi có sự cố."),
    focus: text("What I operate", "Tôi vận hành"), focusValue: "Kubernetes · APIs · Data · Telemetry",
    tools: text("Core tools", "Công cụ chính"), toolValue: "Python, Go, Prometheus, Grafana",
  },
] as const;

const principles = [
  { icon: "cloud" as IconName, label: "PROVISION", title: text("Rebuildable by design", "Có thể dựng lại từ thiết kế"), description: text("Dependencies stay explicit and infrastructure changes stay reviewable.", "Dependency luôn rõ ràng và thay đổi hạ tầng luôn có thể review.") },
  { icon: "workflow" as IconName, label: "DELIVER", title: text("Release with a way back", "Phát hành luôn có đường lui"), description: text("Health signals guide promotion, and rollback never depends on memory.", "Tín hiệu sức khỏe quyết định promote, rollback không phụ thuộc trí nhớ.") },
  { icon: "database" as IconName, label: "OBSERVE", title: text("Evidence before assumptions", "Bằng chứng trước phỏng đoán"), description: text("Metrics, logs, and deployment context explain what the system is doing.", "Metrics, logs và ngữ cảnh triển khai giải thích hệ thống đang làm gì.") },
  { icon: "shield" as IconName, label: "SECURE", title: text("Trust lives in the path", "Niềm tin nằm trong luồng"), description: text("Scanning, signing, policy, and secret boundaries are defaults—not cleanup.", "Scanning, signing, policy và ranh giới secret là mặc định, không phải bước dọn dẹp.") },
] as const;

const copy = {
  en: {
    role: "DEVOPS ENGINEER & CLOUD BUILDER", headline: "I build cloud systems teams can ship with confidence.",
    lede: "From infrastructure as code to observable runtimes, I make the path from commit to production repeatable, inspectable, and safe to reverse.",
    status: "Open to DevOps and Cloud opportunities", work: "View my work", hello: "Say hello",
    introTitle: "Hi, I’m Trieu. I turn complex delivery systems into clear, dependable paths.",
    introText: "My background spans backend engineering and DevOps. That lets me reason about the application, the infrastructure beneath it, and the operational evidence a team needs after release. I care about systems another engineer can understand, rebuild, secure, and operate.",
    expertiseLabel: "WHAT I DO", expertiseTitle: "Engineering from foundation to feedback loop.",
    projectsLabel: "RECENT WORK", projectsTitle: "Real systems, explained beyond the tool list.",
    projectsText: "Each case study shows the architecture, the constraints, and the decisions that protect reliability or security.",
    evidence: "Engineering evidence", repository: "Inspect repository", allProjects: "See the complete project archive",
    principlesLabel: "HOW I WORK", principlesTitle: "Simple principles for operating serious software.",
    experienceLabel: "EXPERIENCE", experienceTitle: "Application context meets infrastructure discipline.",
    xbrainRole: "DevOps Engineer Trainee", xbrainDate: "Apr 2026 — Jul 2026",
    xbrainText: "Applied DevOps governance across Terraform and AWS design review, compliance validation, auditing, monitoring, and technical documentation.",
    xbrainHighlights: ["Automated a Kubernetes workload on EC2 behind a multi-AZ load balancer.", "Built GitOps canary delivery with health validation and automatic rollback."],
    techhausRole: "Backend Developer Trainee", techhausDate: "Aug 2025 — Nov 2025",
    techhausText: "Built and tested Python and Django backend features, REST APIs, database interactions, validation, and structured error handling.",
    techhausHighlights: ["Implemented API and application logic from defined requirements.", "Collaborated through feature branches, pull requests, reviews, and debugging."],
    writingLabel: "FROM THE BLOG", writingTitle: "I write down the reasoning, not only the final configuration.",
    writingText: "Clear notes turn project work into knowledge another engineer can reuse.", read: "Read the article",
    education: "Education", university: "University of Information Technology", degree: "Bachelor of Software Engineering",
    certification: "Certification", ielts: "IELTS Overall Band 5.5",
  },
  vi: {
    role: "KỸ SƯ DEVOPS & CLOUD", headline: "Tôi xây hệ thống cloud để đội ngũ phát hành với sự tự tin.",
    lede: "Từ infrastructure as code đến runtime có khả năng quan sát, tôi làm cho hành trình từ commit đến production có thể lặp lại, kiểm tra và quay lui an toàn.",
    status: "Sẵn sàng cho cơ hội DevOps và Cloud", work: "Xem dự án", hello: "Liên hệ",
    introTitle: "Xin chào, tôi là Triệu. Tôi biến hệ thống triển khai phức tạp thành những luồng rõ ràng và đáng tin cậy.",
    introText: "Nền tảng của tôi trải dài từ backend engineering đến DevOps. Nhờ đó, tôi có thể hiểu ứng dụng, hạ tầng bên dưới và bằng chứng vận hành mà đội ngũ cần sau mỗi lần phát hành. Tôi quan tâm đến những hệ thống kỹ sư khác có thể hiểu, dựng lại, bảo mật và vận hành.",
    expertiseLabel: "TÔI LÀM GÌ", expertiseTitle: "Kỹ thuật từ nền móng đến vòng phản hồi.",
    projectsLabel: "DỰ ÁN GẦN ĐÂY", projectsTitle: "Hệ thống thực tế, được giải thích sâu hơn danh sách công cụ.",
    projectsText: "Mỗi case study thể hiện kiến trúc, ràng buộc và quyết định bảo vệ độ tin cậy hoặc an toàn.",
    evidence: "Bằng chứng kỹ thuật", repository: "Xem repository", allProjects: "Xem toàn bộ kho dự án",
    principlesLabel: "CÁCH TÔI LÀM VIỆC", principlesTitle: "Nguyên tắc đơn giản để vận hành phần mềm nghiêm túc.",
    experienceLabel: "KINH NGHIỆM", experienceTitle: "Hiểu ứng dụng, kỷ luật với hạ tầng.",
    xbrainRole: "Thực tập sinh Kỹ sư DevOps", xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    xbrainText: "Áp dụng quản trị DevOps trong review thiết kế Terraform và AWS, xác thực tuân thủ, auditing, monitoring và tài liệu kỹ thuật.",
    xbrainHighlights: ["Tự động hóa workload Kubernetes trên EC2 sau load balancer đa AZ.", "Xây GitOps canary delivery với health validation và rollback tự động."],
    techhausRole: "Thực tập sinh Backend Developer", techhausDate: "Tháng 8 2025 — Tháng 11 2025",
    techhausText: "Xây dựng và kiểm thử tính năng backend Python, Django, REST API, tương tác database, validation và xử lý lỗi có cấu trúc.",
    techhausHighlights: ["Hiện thực API và application logic từ yêu cầu đã xác định.", "Phối hợp qua feature branch, pull request, review và debugging."],
    writingLabel: "TỪ BLOG", writingTitle: "Tôi ghi lại lập luận, không chỉ cấu hình cuối cùng.",
    writingText: "Ghi chép rõ ràng biến kinh nghiệm dự án thành tri thức kỹ sư khác có thể tái sử dụng.", read: "Đọc bài viết",
    education: "Học vấn", university: "Đại học Công nghệ Thông tin", degree: "Cử nhân Kỹ thuật Phần mềm",
    certification: "Chứng chỉ", ielts: "IELTS Overall Band 5.5",
  },
} as const;

export default function Home() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];
  const post = posts[0];

  return (
    <main className="folio-home"><div id="about">
      <section className="folio-hero">
        <div className="folio-hero-copy" data-reveal>
          <div className="folio-status"><i />{t.status}</div><p className="folio-role">{t.role}</p><h1>{t.headline}</h1><p className="folio-lede">{t.lede}</p>
          <div className="hero-actions"><Link className="button button--primary" href="#case-studies"><UiIcon name="projects" />{t.work}<UiIcon name="arrow" /></Link><a className="button button--ghost" href="mailto:nguyentrieu080604@gmail.com"><UiIcon name="mail" />{t.hello}</a></div>
        </div>
        <div className="folio-illustration" data-reveal data-reveal-delay="1"><CloudWorkbench /></div>
      </section>

      <section className="story-band" data-reveal><div><span>NPT / ABOUT</span><h2>{t.introTitle}</h2><p>{t.introText}</p></div></section>

      <section className="expertise-section" aria-labelledby="expertise-title">
        <header className="centered-section-heading" data-reveal><span>{t.expertiseLabel}</span><h2 id="expertise-title">{t.expertiseTitle}</h2></header>
        <div className="expertise-grid">{expertise.map((item, index) => <article key={item.title.en} data-reveal data-reveal-delay={String(index)}><div className="expertise-icon"><UiIcon name={item.icon} /></div><h3>{item.title[language]}</h3><p>{item.description[language]}</p><dl><div><dt>{item.focus[language]}</dt><dd>{item.focusValue}</dd></div><div><dt>{item.tools[language]}</dt><dd>{item.toolValue}</dd></div></dl></article>)}</div>
      </section>

      <div className="ticker" aria-label="Areas of expertise. Focus or hover to pause." data-reveal tabIndex={0}><div><span>AWS</span><span>TERRAFORM</span><span>DOCKER</span><span>KUBERNETES</span><span>CI/CD</span><span>GITOPS</span><span>PROMETHEUS</span><span>ARGO CD</span></div><div aria-hidden="true"><span>AWS</span><span>TERRAFORM</span><span>DOCKER</span><span>KUBERNETES</span><span>CI/CD</span><span>GITOPS</span><span>PROMETHEUS</span><span>ARGO CD</span></div></div>

      <section className="project-showcase" id="case-studies">
        <header className="folio-section-heading" data-reveal><span>{t.projectsLabel}</span><div><h2>{t.projectsTitle}</h2><p>{t.projectsText}</p></div></header>
        <div className="featured-project-grid">{projects.slice(0, 3).map((project, index) => <article className="featured-project-card" key={project.slug} data-reveal data-reveal-delay={String(index)}><div className="featured-project-visual"><ProjectArchitecture project={project} variant={index} language={language} /></div><div className="featured-project-copy"><div className="project-kicker"><span>{project.stage[language]}</span><time>{project.date[language]}</time></div><p className="project-type">{project.type[language]}</p><h3>{project.title}</h3><p>{project.summary[language]}</p><div className="featured-evidence"><span>{t.evidence}</span><ul>{project.highlights.slice(0, 2).map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div><ul className="tags" aria-label={`${project.title} technology stack`}>{project.stack.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul><a className="case-link" href={project.href} target="_blank" rel="noreferrer">{t.repository}<span><UiIcon name="arrow" /></span></a></div></article>)}</div>
        <Link className="folio-outline-link" href="/projects">{t.allProjects}<UiIcon name="arrow" /></Link>
      </section>

      <section className="principles-section"><header className="centered-section-heading" data-reveal><span>{t.principlesLabel}</span><h2>{t.principlesTitle}</h2></header><div className="principles-grid">{principles.map((item, index) => <article key={item.label} data-reveal data-reveal-delay={String(index % 3)}><UiIcon name={item.icon} /><span>{item.label}</span><h3>{item.title[language]}</h3><p>{item.description[language]}</p></article>)}</div></section>

      <section className="folio-experience"><header className="folio-section-heading" data-reveal><span>{t.experienceLabel}</span><div><h2>{t.experienceTitle}</h2></div></header><div className="experience-cards"><article data-reveal><div className="experience-card-head"><div><strong>XBrain</strong><span>{t.xbrainRole}</span></div><time>{t.xbrainDate}</time></div><p>{t.xbrainText}</p><ul>{t.xbrainHighlights.map((item) => <li key={item}>{item}</li>)}</ul></article><article data-reveal data-reveal-delay="1"><div className="experience-card-head"><div><strong>Techhaus Vietnam</strong><span>{t.techhausRole}</span></div><time>{t.techhausDate}</time></div><p>{t.techhausText}</p><ul>{t.techhausHighlights.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>

      <section className="folio-writing" data-reveal><div><span>{t.writingLabel}</span><h2>{t.writingTitle}</h2><p>{t.writingText}</p></div><Link href={`/blog/${post.slug}`}><div className="blog-meta"><time dateTime={post.publishedAt}>{post.displayDate[language]}</time><span>{post.readingTime[language]}</span></div><h3>{post.title[language]}</h3><strong>{t.read}<UiIcon name="arrow" /></strong></Link></section>

      <section className="credentials-strip" data-reveal><div><UiIcon name="blog" /><span>{t.education}</span><strong>{t.university}</strong><small>{t.degree}</small></div><div><UiIcon name="shield" /><span>{t.certification}</span><strong>IELTS</strong><small>{t.ielts}</small></div></section>
    </div></main>
  );
}
