"use client";

import { useSitePreferences } from "../site-preferences";
import { projects } from "./projects";

const copy = {
  en: {
    heading: "Systems I built from the ground up.",
    description: "Selected work across cloud infrastructure, Kubernetes, data pipelines, secure backend systems, and delivery automation.",
    repository: "View repository",
    architecture: "Architecture",
    evidence: "Evidence",
  },
  vi: {
    heading: "Những hệ thống tôi xây dựng từ đầu.",
    description: "Các dự án về hạ tầng cloud, Kubernetes, pipeline dữ liệu, hệ thống backend an toàn và tự động hóa triển khai.",
    repository: "Xem repository",
    architecture: "Kiến trúc",
    evidence: "Bằng chứng kỹ thuật",
  },
} as const;

export default function ProjectsPage() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
      <main className="projects-page">
        <header className="blog-hero" data-reveal>
          <div><span className="page-label">PROJECT ARCHIVE</span><h1>{t.heading}</h1></div>
          <div className="page-aside"><span>SELECTED SYSTEMS</span><p>{t.description}</p></div>
        </header>

        <section className="projects-grid" aria-label="Projects">
          {projects.map((project, index) => (
            <article className="project" key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
              <header><span>{project.stage[language]}</span><span>{project.date[language]}</span><i>↗</i></header>
              <div className="project-body">
                <h2>{project.title}</h2>
                <p className="project-type">{project.type[language]}</p>
                <p className="project-summary">{project.summary[language]}</p>
                <div className="project-architecture">
                  <span>{t.architecture}</span>
                  <p>{project.architecture[language]}</p>
                </div>
                <div className="project-evidence">
                  <span>{t.evidence}</span>
                  <ul>{project.highlights.map((item) => <li key={item.en}>{item[language]}</li>)}</ul>
                </div>
              </div>
              <ul className="tags" aria-label={`${project.title} technology stack`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <footer className="project-footer">
                <a href={project.href} target="_blank" rel="noreferrer">{t.repository}</a>
              </footer>
            </article>
          ))}
        </section>
      </main>
  );
}
