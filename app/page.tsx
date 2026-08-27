"use client";

import Link from "next/link";
import { CloudWorkbench, ProjectArchitecture } from "./architecture-visual";
import { posts } from "./blog/posts";
import ProfileOverview from "./profile-overview";
import { projects } from "./projects/projects";
import { useSitePreferences } from "./site-preferences";
import UiIcon from "./ui-icon";

const technologies = ["AWS", "Terraform", "Docker", "Kubernetes", "CI/CD", "GitOps", "Prometheus", "Argo CD"] as const;

const copy = {
  en: {
    role: "DEVOPS ENGINEER · CLOUD INFRASTRUCTURE",
    headline: "I design reliable cloud platforms and delivery systems.",
    lede: "I build AWS infrastructure, Kubernetes platforms, and CI/CD workflows with repeatability, observability, secure defaults, and a clear path to rollback.",
    work: "Explore projects", hello: "Contact me", technologies: "Core technologies", stack: "technology stack",
    projectsLabel: "SELECTED ENGINEERING WORK", projectsTitle: "Projects that show how I solve real system problems.",
    projectsText: "These case studies focus on architecture, delivery constraints, security boundaries, and the evidence used to validate each system.",
    evidence: "Key engineering decisions", caseStudy: "View case study", repository: "Repository", allProjects: "Browse all projects",
    writingLabel: "ENGINEERING NOTES", writingTitle: "I document the reasoning behind the implementation.",
    writingText: "Concise notes turn project decisions into knowledge another engineer can review and reuse.", read: "Read the article",
    contactLabel: "WORK TOGETHER", contactTitle: "Need someone who can connect software delivery with cloud operations?",
    contactText: "I am based in Ho Chi Minh City and open to DevOps, cloud infrastructure, and platform engineering opportunities.",
    contactProjects: "Review my projects", contactAction: "Start a conversation",
  },
  vi: {
    role: "KỸ SƯ DEVOPS · HẠ TẦNG CLOUD",
    headline: "Tôi thiết kế nền tảng cloud và hệ thống triển khai đáng tin cậy.",
    lede: "Tôi xây hạ tầng AWS, nền tảng Kubernetes và quy trình CI/CD với khả năng tái lập, quan sát, mặc định an toàn và đường rollback rõ ràng.",
    work: "Khám phá dự án", hello: "Liên hệ", technologies: "Công nghệ chính", stack: "công nghệ sử dụng",
    projectsLabel: "DỰ ÁN KỸ THUẬT TIÊU BIỂU", projectsTitle: "Những dự án thể hiện cách tôi giải quyết bài toán hệ thống.",
    projectsText: "Các case study tập trung vào kiến trúc, ràng buộc triển khai, ranh giới bảo mật và bằng chứng dùng để xác thực hệ thống.",
    evidence: "Quyết định kỹ thuật chính", caseStudy: "Xem case study", repository: "Repository", allProjects: "Xem tất cả dự án",
    writingLabel: "GHI CHÉP KỸ THUẬT", writingTitle: "Tôi ghi lại lập luận phía sau phần triển khai.",
    writingText: "Ghi chép ngắn gọn biến quyết định trong dự án thành tri thức kỹ sư khác có thể review và tái sử dụng.", read: "Đọc bài viết",
    contactLabel: "HỢP TÁC", contactTitle: "Bạn cần người kết nối software delivery với cloud operations?",
    contactText: "Tôi đang ở TP. Hồ Chí Minh và sẵn sàng cho cơ hội DevOps, cloud infrastructure hoặc platform engineering.",
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

      <ProfileOverview />

      <section className="folio-writing" data-reveal><div><span>{t.writingLabel}</span><h2>{t.writingTitle}</h2><p>{t.writingText}</p></div><Link href={`/blog/${post.slug}`}><div className="blog-meta"><time dateTime={post.publishedAt}>{post.displayDate[language]}</time><span>{post.readingTime[language]}</span></div><h3>{post.title[language]}</h3><strong>{t.read}<UiIcon name="arrow" /></strong></Link></section>

      <section className="project-showcase" id="case-studies">
        <header className="folio-section-heading" data-reveal><span>{t.projectsLabel}</span><div><h2>{t.projectsTitle}</h2><p>{t.projectsText}</p></div></header>
        <div className="featured-project-grid">{projects.slice(0, 3).map((project, index) => <article className="featured-project-card" key={project.slug} data-reveal data-reveal-delay={String(index)}><div className="featured-project-visual"><ProjectArchitecture project={project} variant={index} language={language} /></div><div className="featured-project-copy"><div className="project-kicker"><span>{project.stage[language]}</span><time>{project.date[language]}</time></div><p className="project-type">{project.type[language]}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary[language]}</p><div className="featured-evidence"><span>{t.evidence}</span><ul>{project.highlights.slice(0, 2).map((item) => <li key={item.en}>{item[language]}</li>)}</ul></div><ul className="tags" aria-label={`${project.title} ${t.stack}`}>{project.stack.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul><div className="project-actions"><Link className="case-link case-link--primary" href={`/projects/${project.slug}`}>{t.caseStudy}<span><UiIcon name="arrow" /></span></Link><a className="case-link" href={project.href} target="_blank" rel="noopener noreferrer">{t.repository}<span><UiIcon name="code" /></span></a></div></div></article>)}</div>
        <Link className="folio-outline-link" href="/projects">{t.allProjects}<UiIcon name="arrow" /></Link>
      </section>

      <section className="portfolio-cta" aria-labelledby="home-contact-title" data-reveal>
        <div><span>{t.contactLabel}</span><h2 id="home-contact-title">{t.contactTitle}</h2><p>{t.contactText}</p></div>
        <div className="portfolio-cta__actions"><Link className="button button--ghost" href="/projects">{t.contactProjects}<UiIcon name="arrow" /></Link><a className="button button--primary" href="mailto:nguyentrieu080604@gmail.com">{t.contactAction}<UiIcon name="mail" /></a></div>
      </section>
    </div></main>
  );
}
