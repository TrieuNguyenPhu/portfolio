"use client";

import Link from "next/link";
import { ProjectArchitecture } from "../architecture-visual";
import { useSitePreferences } from "../site-preferences";
import { archivedProjects, featuredProjects } from "./projects";
import UiIcon from "../ui-icon";

const copy = {
  en: {
    heading: "Software systems explained through architecture and evidence.",
    description: "A focused selection of backend, data, cloud, and delivery systems—organized by engineering depth instead of presented as a technology list.",
    repository: "View repository",
    architecture: "Architecture",
    evidence: "Engineering evidence",
    caseStudy: "Read case study",
    label: "PROJECTS",
    aside: "SYSTEM CASE STUDIES",
    stack: "technology stack",
    featuredLabel: "FEATURED CASE STUDIES", featuredTitle: "Backend-first work with cloud and delivery depth.",
    featuredText: "Each case study includes the implemented system boundary, architecture, and decisions that protect correctness, reliability, or security.",
    archiveLabel: "PROJECT ARCHIVE", archiveTitle: "Additional systems and application work.",
    archiveText: "A concise archive of projects that broaden the picture without repeating the full case-study format.",
    nextLabel: "MORE CONTEXT", nextTitle: "Looking for the person and experience behind the projects?",
    nextText: "My background page shows how backend foundations and cloud experience connect into an end-to-end engineering perspective.",
    nextAbout: "About my experience", nextContact: "Contact me",
  },
  vi: {
    heading: "Hệ thống phần mềm được giải thích bằng kiến trúc và bằng chứng.",
    description: "Các hệ thống backend, data, cloud và delivery được sắp xếp theo chiều sâu kỹ thuật thay vì trình bày thành danh sách công nghệ.",
    repository: "Xem repository",
    architecture: "Kiến trúc",
    evidence: "Bằng chứng kỹ thuật",
    caseStudy: "Đọc case study",
    label: "DỰ ÁN",
    aside: "CASE STUDY HỆ THỐNG",
    stack: "công nghệ sử dụng",
    featuredLabel: "CASE STUDY NỔI BẬT", featuredTitle: "Dự án backend-first có chiều sâu cloud và delivery.",
    featuredText: "Mỗi case study trình bày phạm vi đã hiện thực, kiến trúc và quyết định bảo vệ tính đúng đắn, độ tin cậy hoặc bảo mật.",
    archiveLabel: "KHO DỰ ÁN", archiveTitle: "Các hệ thống và ứng dụng khác.",
    archiveText: "Kho dự án cô đọng giúp mở rộng bức tranh năng lực mà không lặp lại toàn bộ định dạng case study.",
    nextLabel: "THÊM BỐI CẢNH", nextTitle: "Bạn muốn biết thêm về con người và kinh nghiệm phía sau các dự án?",
    nextText: "Trang giới thiệu cho thấy nền tảng backend và trải nghiệm cloud kết nối thành góc nhìn kỹ thuật đầu cuối như thế nào.",
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
          {featuredProjects.map((project, index) => (
            <article className="project" id={project.slug} key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
              <header><span>{project.stage[language]}</span><time>{project.date[language]}</time></header>
              <div className="project-visual-wrap"><ProjectArchitecture project={project} variant={index} language={language} /></div>
              <div className="project-body">
                <p className="project-type">{project.type[language]}</p>
                <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
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
                <div className="project-footer__links"><Link href={`/projects/${project.slug}`}>{t.caseStudy}<span><UiIcon name="arrow" /></span></Link><a href={project.href} target="_blank" rel="noopener noreferrer"><UiIcon name="code" />{t.repository}<span><UiIcon name="arrow" /></span></a></div>
              </footer>
            </article>
          ))}
          </div>
        </section>

        <section className="project-archive" aria-labelledby="project-archive-title">
          <header className="folio-section-heading folio-section-heading--compact" data-reveal><span>{t.archiveLabel}</span><div><h2 id="project-archive-title">{t.archiveTitle}</h2><p>{t.archiveText}</p></div></header>
          <div className="project-archive-grid">
            {archivedProjects.map((project, index) => (
              <article className="project-compact" id={project.slug} key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
                <div className="project-kicker"><span>{project.stage[language]}</span><time>{project.date[language]}</time></div>
                <p className="project-type">{project.type[language]}</p>
                <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
                <p>{project.summary[language]}</p>
                <div className="project-compact-architecture"><span>{t.architecture}</span><code>{project.architecture[language]}</code></div>
                <ul className="tags" aria-label={`${project.title} ${t.stack}`}>{project.stack.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="project-compact-links"><Link className="case-link case-link--primary" href={`/projects/${project.slug}`}>{t.caseStudy}<span><UiIcon name="arrow" /></span></Link><a className="case-link" href={project.href} target="_blank" rel="noopener noreferrer">{t.repository}<span><UiIcon name="code" /></span></a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-cta" aria-labelledby="projects-next-title" data-reveal><div><span>{t.nextLabel}</span><h2 id="projects-next-title">{t.nextTitle}</h2><p>{t.nextText}</p></div><div className="portfolio-cta__actions"><Link className="button button--ghost" href="/about">{t.nextAbout}<UiIcon name="about" /></Link><a className="button button--primary" href="mailto:nguyentrieu080604@gmail.com">{t.nextContact}<UiIcon name="mail" /></a></div></section>
      </main>
  );
}
