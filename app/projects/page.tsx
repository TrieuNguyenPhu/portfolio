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
        <header className="blog-hero" data-reveal>
          <h1>{t.heading}</h1>
          <p>{t.description}</p>
        </header>

        <section className="projects-grid" aria-label="Projects">
          {projects.map((project, index) => (
            <article className="project" key={project.slug} data-reveal data-reveal-delay={String(index % 3)}>
              <header><span>{project.metric[language]}</span><span>{project.date[language]}</span></header>
              <div className="project-body">
                <h2>{project.title}</h2>
                <p className="project-type">{project.type[language]}</p>
                <p className="project-summary">{project.summary[language]}</p>
              </div>
              <ul className="tags" aria-label={`${project.title} technology stack`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <footer className="project-footer">
                <a href={project.href} target="_blank" rel="noreferrer">{t.repository}</a>
                {project.live ? <a href={project.live} target="_blank" rel="noreferrer">{t.live}</a> : null}
              </footer>
            </article>
          ))}
        </section>
      </main>
  );
}
