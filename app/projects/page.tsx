"use client";

import { ProjectArchitecture } from "../architecture-visual";
import { useSitePreferences } from "../site-preferences";
import { projects } from "./projects";
import UiIcon from "../ui-icon";

const copy = {
  en: {
    heading: "Systems I built from the ground up.",
    description: "Selected work across cloud infrastructure, Kubernetes, data pipelines, secure backend systems, and delivery automation.",
    repository: "View repository",
    architecture: "Architecture",
    evidence: "Engineering evidence",
    label: "PROJECT ARCHIVE",
    aside: "SYSTEM CASE STUDIES",
    note: "Every entry documents what the system does, how the parts connect, and which implementation choices protect reliability, security, or reproducibility.",
    stack: "technology stack",
  },
  vi: {
    heading: "Những hệ thống tôi xây dựng từ đầu.",
    description: "Các dự án về hạ tầng cloud, Kubernetes, pipeline dữ liệu, hệ thống backend an toàn và tự động hóa triển khai.",
    repository: "Xem repository",
    architecture: "Kiến trúc",
    evidence: "Bằng chứng kỹ thuật",
    label: "KHO DỰ ÁN",
    aside: "CASE STUDY HỆ THỐNG",
    note: "Mỗi dự án mô tả hệ thống giải quyết điều gì, các thành phần kết nối ra sao và lựa chọn kỹ thuật nào bảo vệ độ tin cậy, an toàn hoặc khả năng tái lập.",
    stack: "công nghệ sử dụng",
  },
} as const;

export default function ProjectsPage() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
      <main className="projects-page">
        <header className="blog-hero" data-reveal>
          <div><span className="page-label">{t.label}</span><h1>{t.heading}</h1></div>
          <div className="page-aside"><span>{t.aside}</span><p>{t.description}</p></div>
        </header>

        <p className="archive-note" data-reveal>{t.note}</p>

        <section className="projects-grid" aria-label="Projects">
          {projects.map((project, index) => (
            <article className="project" id={project.slug} key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
              <header><span>{project.stage[language]}</span><time>{project.date[language]}</time></header>
              <div className="project-visual-wrap"><ProjectArchitecture project={project} variant={index} language={language} /></div>
              <div className="project-body">
                <p className="project-type">{project.type[language]}</p>
                <h2>{project.title}</h2>
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
        </section>
      </main>
  );
}
