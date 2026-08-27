"use client";

import Link from "next/link";
import { ProjectArchitecture } from "../../architecture-visual";
import { useSitePreferences } from "../../site-preferences";
import UiIcon from "../../ui-icon";
import type { Project } from "../projects";

type ProjectCaseStudyProps = {
  project: Project;
  previous?: Project;
  next?: Project;
};

const copy = {
  en: {
    projects: "Projects",
    breadcrumb: "Breadcrumb",
    pagination: "Case study navigation",
    caseStudy: "System case study",
    repository: "View source repository",
    overview: "System overview",
    overviewTitle: "The problem boundary and delivery approach.",
    architecture: "Architecture",
    architectureTitle: "A traceable path from input to operational signal.",
    flow: "System flow",
    scope: "Scope",
    status: "Status",
    period: "Period",
    decisions: "Engineering decisions",
    decisionsTitle: "Decisions that protect reliability, safety, and repeatability.",
    stack: "Technology stack",
    stackTitle: "Tools selected for a clear role in the system.",
    sourceNote: "The repository contains the implementation, configuration, and delivery assets behind this case study.",
    allProjects: "Browse all projects",
    previous: "Previous case study",
    next: "Next case study",
  },
  vi: {
    projects: "Dự án",
    breadcrumb: "Đường dẫn trang",
    pagination: "Điều hướng case study",
    caseStudy: "Case study hệ thống",
    repository: "Xem source repository",
    overview: "Tổng quan hệ thống",
    overviewTitle: "Ranh giới bài toán và hướng triển khai.",
    architecture: "Kiến trúc",
    architectureTitle: "Luồng có thể truy vết từ đầu vào đến tín hiệu vận hành.",
    flow: "Luồng hệ thống",
    scope: "Phạm vi",
    status: "Trạng thái",
    period: "Thời gian",
    decisions: "Quyết định kỹ thuật",
    decisionsTitle: "Những quyết định bảo vệ độ tin cậy, an toàn và khả năng tái lập.",
    stack: "Công nghệ sử dụng",
    stackTitle: "Mỗi công nghệ được chọn cho một vai trò rõ ràng trong hệ thống.",
    sourceNote: "Repository chứa phần triển khai, cấu hình và tài nguyên delivery đứng sau case study này.",
    allProjects: "Xem tất cả dự án",
    previous: "Case study trước",
    next: "Case study tiếp theo",
  },
} as const;

export default function ProjectCaseStudy({ project, previous, next }: ProjectCaseStudyProps) {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];
  const flow = project.architecture[language].split("→").map((item) => item.trim());

  return (
    <main className="case-study-page">
      <nav className="case-breadcrumb" aria-label={t.breadcrumb} data-reveal>
        <Link href="/projects">{t.projects}</Link><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span>
      </nav>

      <header className="case-hero" data-reveal data-reveal-delay="1">
        <div className="case-hero__copy">
          <div className="project-kicker"><span>{project.stage[language]}</span><time>{project.date[language]}</time></div>
          <p className="page-label">{t.caseStudy}</p>
          <h1>{project.title}</h1>
          <p className="case-hero__type">{project.type[language]}</p>
          <p className="case-hero__summary">{project.summary[language]}</p>
          <div className="case-hero__actions">
            <a className="button button--primary" href={project.href} target="_blank" rel="noopener noreferrer"><UiIcon name="code" />{t.repository}<UiIcon name="arrow" /></a>
            <Link className="button button--ghost" href="/projects">{t.allProjects}</Link>
          </div>
        </div>
        <div className="case-hero__visual"><ProjectArchitecture project={project} language={language} /></div>
      </header>

      <section className="case-section case-overview" aria-labelledby="case-overview-title" data-reveal>
        <header><span>{t.overview}</span><h2 id="case-overview-title">{t.overviewTitle}</h2></header>
        <div className="case-overview__content">
          <dl className="case-facts">
            <div><dt>{t.scope}</dt><dd>{project.type[language]}</dd></div>
            <div><dt>{t.status}</dt><dd>{project.stage[language]}</dd></div>
            <div><dt>{t.period}</dt><dd>{project.date[language]}</dd></div>
          </dl>
          <div className="case-flow-card">
            <span>{t.flow}</span>
            <ol>{flow.map((node, index) => <li key={`${node}-${index}`}><small>{String(index + 1).padStart(2, "0")}</small><strong>{node}</strong></li>)}</ol>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="case-architecture-title" data-reveal>
        <header><span>{t.architecture}</span><h2 id="case-architecture-title">{t.architectureTitle}</h2></header>
        <div className="case-architecture-panel"><ProjectArchitecture project={project} variant={1} language={language} /><code>{project.architecture[language]}</code></div>
      </section>

      <section className="case-section" aria-labelledby="case-decisions-title" data-reveal>
        <header><span>{t.decisions}</span><h2 id="case-decisions-title">{t.decisionsTitle}</h2></header>
        <ol className="case-decisions">{project.highlights.map((decision, index) => <li key={decision.en}><span>{String(index + 1).padStart(2, "0")}</span><p>{decision[language]}</p></li>)}</ol>
      </section>

      <section className="case-section case-stack-section" aria-labelledby="case-stack-title" data-reveal>
        <header><span>{t.stack}</span><h2 id="case-stack-title">{t.stackTitle}</h2></header>
        <div><ul className="case-stack-list">{project.stack.map((technology, index) => <li key={technology}><span>{String(index + 1).padStart(2, "0")}</span>{technology}</li>)}</ul><div className="case-source-card"><p>{t.sourceNote}</p><a href={project.href} target="_blank" rel="noopener noreferrer">{t.repository}<UiIcon name="arrow" /></a></div></div>
      </section>

      <nav className="case-pagination" aria-label={t.pagination} data-reveal>
        {previous ? <Link href={`/projects/${previous.slug}`}><span>{t.previous}</span><strong>{previous.title}</strong></Link> : <Link href="/projects"><span>{t.projects}</span><strong>{t.allProjects}</strong></Link>}
        {next ? <Link href={`/projects/${next.slug}`}><span>{t.next}</span><strong>{next.title}</strong></Link> : null}
      </nav>
    </main>
  );
}
