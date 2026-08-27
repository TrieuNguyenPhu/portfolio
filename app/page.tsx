"use client";

import Link from "next/link";
import { CloudWorkbench, ProjectArchitecture } from "./architecture-visual";
import { posts } from "./blog/posts";
import ProfileOverview from "./profile-overview";
import { featuredProjects } from "./projects/projects";
import { useSitePreferences } from "./site-preferences";
import UiIcon from "./ui-icon";

const technologies = ["Java", "Spring Boot", "PostgreSQL", "AWS", "Docker", "GitHub Actions"] as const;

const copy = {
  en: {
    role: "SOFTWARE ENGINEER · BACKEND & CLOUD",
    headline: "I build reliable backend systems and the infrastructure behind them.",
    lede: "I work across application code, databases, cloud infrastructure, delivery automation, and operational signals—so the software and the platform support each other from the start.",
    work: "Explore projects", hello: "Contact me", technologies: "Core technologies", stack: "technology stack",
    projectsLabel: "SELECTED ENGINEERING WORK", projectsTitle: "Projects that show how I solve real system problems.",
    projectsText: "These case studies focus on system boundaries, correctness, architecture, delivery constraints, and the evidence used to validate each implementation.",
    evidence: "Key engineering decisions", caseStudy: "View case study", repository: "Repository", allProjects: "Browse all projects",
    writingLabel: "ENGINEERING NOTES", writingTitle: "I document the reasoning behind the implementation.",
    writingText: "Concise notes turn project decisions into knowledge another engineer can review and reuse.", read: "Read the article",
    contactLabel: "WORK TOGETHER", contactTitle: "Need an engineer who understands both the application and the platform?",
    contactText: "Vietnam · Open to software engineering, backend, cloud infrastructure, and platform opportunities.",
    contactProjects: "Review my projects", contactAction: "Start a conversation",
  },
  vi: {
    role: "KỸ SƯ PHẦN MỀM · BACKEND & CLOUD",
    headline: "Tôi xây dựng hệ thống backend đáng tin cậy cùng hạ tầng vận hành phía sau.",
    lede: "Tôi làm việc xuyên suốt mã nguồn ứng dụng, cơ sở dữ liệu, hạ tầng cloud, tự động hóa triển khai và tín hiệu vận hành—để phần mềm và platform hỗ trợ nhau ngay từ đầu.",
    work: "Khám phá dự án", hello: "Liên hệ", technologies: "Công nghệ chính", stack: "công nghệ sử dụng",
    projectsLabel: "DỰ ÁN KỸ THUẬT TIÊU BIỂU", projectsTitle: "Những dự án thể hiện cách tôi giải quyết bài toán hệ thống.",
    projectsText: "Các case study tập trung vào ranh giới hệ thống, tính đúng đắn, kiến trúc, ràng buộc triển khai và bằng chứng xác thực phần hiện thực.",
    evidence: "Quyết định kỹ thuật chính", caseStudy: "Xem case study", repository: "Repository", allProjects: "Xem tất cả dự án",
    writingLabel: "GHI CHÉP KỸ THUẬT", writingTitle: "Tôi ghi lại lập luận phía sau phần triển khai.",
    writingText: "Ghi chép ngắn gọn biến quyết định trong dự án thành tri thức kỹ sư khác có thể review và tái sử dụng.", read: "Đọc bài viết",
    contactLabel: "HỢP TÁC", contactTitle: "Bạn cần một kỹ sư hiểu cả ứng dụng lẫn platform?",
    contactText: "Việt Nam · Sẵn sàng cho cơ hội software engineering, backend, cloud infrastructure và platform.",
    contactProjects: "Xem dự án của tôi", contactAction: "Bắt đầu trao đổi",
  },
} as const;

export default function Home() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];
  const post = posts[0];

  return (
    <main className="folio-home"><div id="home">
      <section className="folio-hero">
        <div className="folio-hero-copy" data-reveal>
          <p className="folio-role">{t.role}</p><h1>{t.headline}</h1><p className="folio-lede">{t.lede}</p>
          <div className="hero-actions"><Link className="button button--primary" href="#case-studies"><UiIcon name="projects" />{t.work}<UiIcon name="arrow" /></Link><a className="button button--ghost" href="mailto:nguyentrieu080604@gmail.com"><UiIcon name="mail" />{t.hello}</a></div>
        </div>
        <div className="folio-illustration" data-reveal data-reveal-delay="1"><CloudWorkbench /></div>
      </section>

      <ul className="technology-rail" aria-label={t.technologies} data-reveal>{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>

      <section className="project-showcase" id="case-studies">
        <header className="folio-section-heading" data-reveal><span>{t.projectsLabel}</span><div><h2>{t.projectsTitle}</h2><p>{t.projectsText}</p></div></header>
        <div className="featured-project-grid">{featuredProjects.map((project, index) => <article className="featured-project-card" key={project.slug} data-reveal data-reveal-delay={String(index)}><div className="featured-project-visual"><ProjectArchitecture project={project} variant={index} language={language} /></div><div className="featured-project-copy"><div className="project-kicker"><span>{project.stage[language]}</span><time>{project.date[language]}</time></div><p className="project-type">{project.type[language]}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary[language]}</p><div className="featured-evidence"><span>{t.evidence}</span><ul>{project.highlights.slice(0, 2).map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div><ul className="tags" aria-label={`${project.title} ${t.stack}`}>{project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul><div className="project-actions"><Link className="case-link case-link--primary" href={`/projects/${project.slug}`}>{t.caseStudy}<span><UiIcon name="arrow" /></span></Link><a className="case-link" href={project.href} target="_blank" rel="noopener noreferrer">{t.repository}<span><UiIcon name="code" /></span></a></div></div></article>)}</div>
        <Link className="folio-outline-link" href="/projects">{t.allProjects}<UiIcon name="arrow" /></Link>
      </section>

      <ProfileOverview />

      <section className="folio-writing" data-reveal><div><span>{t.writingLabel}</span><h2>{t.writingTitle}</h2><p>{t.writingText}</p></div><Link href={`/blog/${post.slug}`}><div className="blog-meta"><time dateTime={post.publishedAt}>{post.displayDate[language]}</time><span>{post.readingTime[language]}</span></div><h3>{post.title[language]}</h3><strong>{t.read}<UiIcon name="arrow" /></strong></Link></section>

      <section className="portfolio-cta" aria-labelledby="home-contact-title" data-reveal>
        <div><span>{t.contactLabel}</span><h2 id="home-contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <div className="portfolio-cta__actions"><Link className="button button--ghost" href="/projects">{t.contactProjects}<UiIcon name="arrow" /></Link><a className="button button--primary" href="mailto:nguyentrieu080604@gmail.com">{t.contactAction}<UiIcon name="mail" /></a></div>
      </section>
    </div></main>
  );
}
