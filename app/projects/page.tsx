"use client";

import { useSitePreferences } from "../site-preferences";
import { projects } from "./projects";

const copy = {
  en: {
    heading: "Systems I built from the ground up.",
    description: "Selected work across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
    repository: "View repository",
    live: "Live site",
  },
  vi: {
    heading: "Những hệ thống tôi xây dựng từ đầu.",
    description: "Các dự án về Kubernetes, hạ tầng AWS, bảo mật, containers và tự động hóa triển khai.",
    repository: "Xem repository",
    live: "Trang web",
  },
} as const;

export default function ProjectsPage() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
      <main className="projects-page">
        <header className="blog-hero">
          <h1>{t.heading}</h1>
          <p>{t.description}</p>
        </header>

        <section className="projects-grid" aria-label="Projects">
          {projects.map((project) => (
            <article className="project" key={project.slug}>
              <header><span>{project.date[language]}</span></header>
              <div className="project-visual" aria-label={`${project.title} architecture flow`}>
                {project.visual.map((step, index) => (
                  <span key={step}><b>{step}</b>{index < project.visual.length - 1 ? <i aria-hidden="true" /> : null}</span>
                ))}
              </div>
              <div className="project-body">
                <p className="project-metric">{project.metric[language]}</p>
                <h2>{project.title}</h2>
                <p className="project-type">{project.type[language]}</p>
                <p className="project-summary">{project.summary[language]}</p>
              </div>
              <ul className="tags" aria-label={`${project.title} technology stack`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <footer className="project-footer">
                <a href={project.href} target="_blank" rel="noreferrer">{t.repository} <span className="link-arrow" aria-hidden="true" /></a>
                {project.live ? <a href={project.live} target="_blank" rel="noreferrer">{t.live} <span className="link-arrow" aria-hidden="true" /></a> : null}
              </footer>
            </article>
          ))}
        </section>
      </main>
  );
}
