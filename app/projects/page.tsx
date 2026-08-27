"use client";

import Link from "next/link";
import { ProjectArchitecture } from "../architecture-visual";
import { useSitePreferences } from "../site-preferences";
import { projects } from "./projects";
import UiIcon from "../ui-icon";

const copy = {
  en: {
    heading: "Engineering work with architecture and evidence.",
    description: "A focused selection of cloud infrastructure, Kubernetes, data, backend, and delivery systems—organized by depth instead of presented as one long list.",
    repository: "View repository",
    architecture: "Architecture",
    evidence: "Engineering evidence",
    label: "PROJECTS",
    aside: "SYSTEM CASE STUDIES",
    stack: "technology stack",
    featuredLabel: "FEATURED CASE STUDIES", featuredTitle: "The strongest examples of my DevOps and platform work.",
    featuredText: "Each case study includes the system boundary, delivery path, and the decisions that protect reliability or security.",
    archiveLabel: "PROJECT ARCHIVE", archiveTitle: "Additional systems and application work.",
    archiveText: "A concise archive of projects that broaden the picture without repeating the full case-study format.",
    nextLabel: "MORE CONTEXT", nextTitle: "Looking for the person and experience behind the projects?",
    nextText: "My background page covers work experience, education, and the path from backend engineering into DevOps.",
    nextAbout: "About my experience", nextContact: "Contact me",
  },
  vi: {
    heading: "Dự án kỹ thuật có kiến trúc và bằng chứng rõ ràng.",
    description: "Các hệ thống cloud, Kubernetes, data, backend và delivery được sắp xếp theo độ sâu thay vì trình bày thành một danh sách dài.",
    repository: "Xem repository",
    architecture: "Kiến trúc",
    evidence: "Bằng chứng kỹ thuật",
    label: "DỰ ÁN",
    aside: "CASE STUDY HỆ THỐNG",
    stack: "công nghệ sử dụng",
    featuredLabel: "CASE STUDY NỔI BẬT", featuredTitle: "Những ví dụ mạnh nhất về DevOps và platform engineering.",
    featuredText: "Mỗi case study trình bày ranh giới hệ thống, luồng delivery và quyết định bảo vệ độ tin cậy hoặc bảo mật.",
    archiveLabel: "KHO DỰ ÁN", archiveTitle: "Các hệ thống và ứng dụng khác.",
    archiveText: "Kho dự án cô đọng giúp mở rộng bức tranh năng lực mà không lặp lại toàn bộ định dạng case study.",
    nextLabel: "THÊM BỐI CẢNH", nextTitle: "Bạn muốn biết thêm về con người và kinh nghiệm phía sau các dự án?",
    nextText: "Trang giới thiệu trình bày kinh nghiệm làm việc, học vấn và hành trình từ backend engineering đến DevOps.",
    nextAbout: "Xem kinh nghiệm", nextContact: "Liên hệ",
  },
} as const;

export default function ProjectsPage() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
      <main className="projects-page">
        <header className="blog-hero portfolio-page-hero" data-reveal>
          <div><span className="page-label">{t.label}</span><h1>{t.heading}</h1></div>
          <div className="page-aside"><span>{t.aside}</span><p>{t.description}</p></div>
        </header>

        <section className="featured-case-studies" aria-labelledby="featured-projects-title">
          <header className="folio-section-heading folio-section-heading--compact" data-reveal><span>{t.featuredLabel}</span><div><h2 id="featured-projects-title">{t.featuredTitle}</h2><p>{t.featuredText}</p></div></header>
          <div className="projects-grid projects-grid--featured">
          {projects.slice(0, 3).map((project, index) => (
            <article className="project" id={project.slug} key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
              <header><span>{project.stage[language]}</span><time>{project.date[language]}</time></header>
              <div className="project-visual-wrap"><ProjectArchitecture project={project} variant={index} language={language} /></div>
              <div className="project-body">
                <p className="project-type">{project.type[language]}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary[language]}</p>
                <div className="project-architecture">
                  <span>{t.architecture}</span>
                  <code>{project.architecture[language]}</code>
                </div>
                <div className="project-evidence">
                  <span>{t.evidence}</span>
                  <ul>{project.highlights.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
                </div>
              </div>
              <footer className="project-footer">
                <ul className="tags" aria-label={`${project.title} ${t.stack}`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a href={project.href} target="_blank" rel="noopener noreferrer"><UiIcon name="code" />{t.repository}<span><UiIcon name="arrow" /></span></a>
              </footer>
            </article>
          ))}
          </div>
        </section>

        <section className="project-archive" aria-labelledby="project-archive-title">
          <header className="folio-section-heading folio-section-heading--compact" data-reveal><span>{t.archiveLabel}</span><div><h2 id="project-archive-title">{t.archiveTitle}</h2><p>{t.archiveText}</p></div></header>
          <div className="project-archive-grid">
            {projects.slice(3).map((project, index) => (
              <article className="project-compact" id={project.slug} key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
                <div className="project-kicker"><span>{project.stage[language]}</span><time>{project.date[language]}</time></div>
                <p className="project-type">{project.type[language]}</p>
                <h3>{project.title}</h3>
                <p>{project.summary[language]}</p>
                <div className="project-compact-architecture"><span>{t.architecture}</span><code>{project.architecture[language]}</code></div>
                <ul className="tags" aria-label={`${project.title} ${t.stack}`}>{project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
                <a className="case-link" href={project.href} target="_blank" rel="noopener noreferrer">{t.repository}<span><UiIcon name="arrow" /></span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-cta" aria-labelledby="projects-next-title" data-reveal><div><span>{t.nextLabel}</span><h2 id="projects-next-title">{t.nextTitle}</h2><p>{t.nextText}</p></div><div className="portfolio-cta__actions"><Link className="button button--ghost" href="/about">{t.nextAbout}<UiIcon name="about" /></Link><a className="button button--primary" href="mailto:nguyentrieu080604@gmail.com">{t.nextContact}<UiIcon name="mail" /></a></div></section>
      </main>
  );
}
