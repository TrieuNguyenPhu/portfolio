"use client";

import { useEffect, useRef, useState } from "react";

type Filter = "All" | "GitOps" | "AWS" | "CI/CD";

const projects = [
  {
    id: "seckube",
    title: "SecKube",
    subtitle: "Kubernetes GitOps and Security Platform",
    date: "07 / 2026",
    categories: ["GitOps", "CI/CD"],
    summary:
      "A five-wave Argo CD platform with canary analysis, policy enforcement, signed images, and automated rollback.",
    stack: ["Kubernetes", "Argo CD", "Prometheus", "Gatekeeper", "Cosign"],
    href: "https://github.com/TrieuNguyenPhu/SecKube",
    featured: true,
  },
  {
    id: "shortenlink",
    title: "NPT ShortenLink",
    subtitle: "Serverless URL Shortener on AWS",
    date: "05—07 / 2026",
    categories: ["AWS", "CI/CD"],
    summary:
      "A Next.js and Go platform deployed through SAM, with DynamoDB conditional writes, CloudFront delivery, and post-deploy smoke tests.",
    stack: ["Next.js", "Go", "Lambda", "DynamoDB", "CloudFormation"],
    href: "https://github.com/TrieuNguyenPhu/shorten-link",
    domain: "https://npt-shortenlink.dev",
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    subtitle: "Kubernetes Application on AWS",
    date: "06 / 2026",
    categories: ["AWS", "GitOps"],
    summary:
      "A Go service on Minikube and EC2, with 16 AWS resources provisioned through one Terraform apply workflow.",
    stack: ["Go", "Terraform", "EC2", "ALB", "Minikube"],
    href: "https://github.com/TrieuNguyenPhu/minesweeper-gin",
  },
  {
    id: "stans",
    title: "STANS",
    subtitle: "Containerized Navigation System",
    date: "07 / 2026",
    categories: ["CI/CD"],
    summary:
      "A multi-stage container build, GHCR delivery pipeline, and scripted Ubuntu host with TLS, Nginx, and a restricted firewall.",
    stack: ["Docker", "GitHub Actions", "GHCR", "Nginx", "Bash"],
    href: "https://github.com/TrieuNguyenPhu/STANS-Nav-System",
  },
] as const;

const commands = [
  { label: "View GitHub", detail: "TrieuNguyenPhu", href: "https://github.com/TrieuNguyenPhu" },
  { label: "Open LinkedIn", detail: "trieunguyenphu86", href: "https://www.linkedin.com/in/trieunguyenphu86/" },
  { label: "Send email", detail: "nguyentrieu080604@gmail.com", href: "mailto:nguyentrieu080604@gmail.com" },
  { label: "Browse projects", detail: "Selected work", href: "#projects" },
];

function ProjectVisual({ id }: { id: string }) {
  if (id === "seckube") {
    return (
      <figure className="visual visual--topology" aria-label="SecKube delivery topology">
        <span>GITHUB</span><i aria-hidden="true" /><span>GHCR</span><i aria-hidden="true" />
        <span>ARGO CD</span><i aria-hidden="true" /><strong>K8S</strong>
      </figure>
    );
  }

  if (id === "shortenlink") {
    return (
      <figure className="visual visual--route" aria-label="ShortenLink serverless request path">
        <span>NEXT.JS</span><b>→</b><span>API GW</span><b>→</b><span>LAMBDA</span><b>→</b><strong>DYNAMODB</strong>
      </figure>
    );
  }

  if (id === "minesweeper") {
    return (
      <figure className="visual visual--metric" aria-label="Minesweeper infrastructure count">
        <strong>16</strong><span>AWS resources<br />from one apply</span>
      </figure>
    );
  }

  return (
    <figure className="visual visual--pipeline" aria-label="STANS delivery pipeline">
      <span>BUILD</span><i aria-hidden="true" /><span>GHCR</span><i aria-hidden="true" />
      <span>SSH</span><i aria-hidden="true" /><strong>TLS</strong>
    </figure>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const visible = commands.filter((command) =>
    `${command.label} ${command.detail}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  if (!open) return null;

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <section
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-title"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
          if (event.key === "Tab") {
            const focusable = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>("input, a[href]"),
            );
            const first = focusable[0];
            const last = focusable.at(-1);
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((value) => Math.min(value + 1, visible.length - 1));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((value) => Math.max(value - 1, 0));
          }
          if (event.key === "Enter" && visible[active]) window.location.href = visible[active].href;
        }}
      >
        <h2 id="palette-title" className="visually-hidden">Quick navigation</h2>
        <label className="palette-search">
          <span>SEARCH</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActive(0); }}
            placeholder="Type a destination…"
            aria-controls="command-list"
          />
        </label>
        <div className="palette-helper" aria-live="polite">
          {visible.length ? `${visible.length} destinations` : "No destination found"}
        </div>
        <div id="command-list" className="command-list" role="listbox">
          {visible.map((command, index) => (
            <a
              key={command.label}
              href={command.href}
              role="option"
              aria-selected={active === index}
              className={active === index ? "command is-active" : "command"}
              onMouseEnter={() => setActive(index)}
              onClick={onClose}
            >
              <span>{command.label}</span><small>{command.detail}</small>
            </a>
          ))}
        </div>
        <p className="palette-hint">↑↓ move · enter open · esc close</p>
      </section>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduced) {
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-in")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.categories.includes(filter as never),
  );

  const closePalette = () => {
    setPaletteOpen(false);
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".command-trigger")?.focus());
  };

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Nguyen Phu Trieu, home">
          NPT<span aria-hidden="true">/</span><small>DEVOPS</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
          <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)}>
            Menu <kbd>⌘K</kbd>
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="intro reveal">
          <div className="intro-copy">
            <p className="eyebrow"><span aria-hidden="true" /> ENTRY-LEVEL DEVOPS ENGINEER</p>
            <h1>I build the paths software takes to production.</h1>
          </div>
          <div className="intro-detail">
            <p>
              Hands-on with AWS, Kubernetes, Terraform, GitOps, CI/CD, observability,
              and cloud security—backed by Python and Go.
            </p>
            <div className="contact-line">
              <a href="mailto:nguyentrieu080604@gmail.com">Email me ↗</a>
              <a href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
        </section>

        <section className="work-section" id="projects" aria-labelledby="projects-title">
          <header className="section-heading reveal">
            <p>SELECTED WORK · 2026</p>
            <h2 id="projects-title">Infrastructure, delivery, and cloud-native systems.</h2>
          </header>

          <div className="filter-bar reveal" role="group" aria-label="Filter projects">
            {(["All", "GitOps", "AWS", "CI/CD"] as Filter[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
            <span aria-live="polite">{filteredProjects.length.toString().padStart(2, "0")} PROJECTS</span>
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className={`project ${"featured" in project && project.featured ? "project--featured" : ""}`}>
                <div className="project-meta"><span>{project.date}</span><span>{project.categories.join(" + ")}</span></div>
                <ProjectVisual id={project.id} />
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p>{project.summary}</p>
                </div>
                <ul className="stack-list" aria-label={`${project.title} technology stack`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="project-links">
                  <a href={project.href} target="_blank" rel="noreferrer">Open repository ↗</a>
                  {"domain" in project && project.domain ? (
                    <a href={project.domain} target="_blank" rel="noreferrer">Visit live site ↗</a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="delivery-band reveal" aria-labelledby="delivery-title">
          <div>
            <p>DELIVERY LOOP</p>
            <h2 id="delivery-title">Plan. Validate. Ship. Observe.</h2>
          </div>
          <ol>
            <li><span>01</span><strong>Provision</strong><small>Terraform · SAM</small></li>
            <li><span>02</span><strong>Validate</strong><small>Trivy · Kubeconform</small></li>
            <li><span>03</span><strong>Release</strong><small>GitHub Actions · Argo CD</small></li>
            <li><span>04</span><strong>Observe</strong><small>Prometheus · CloudWatch</small></li>
          </ol>
        </section>

        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <header className="section-heading reveal">
            <h2 id="experience-title">Experience across infrastructure and backend engineering.</h2>
          </header>
          <div className="timeline reveal">
            <article>
              <div><span>04—07 / 2026</span><strong>XBrain</strong><small>DevOps Engineer Trainee</small></div>
              <p>Infrastructure planning, Terraform design review, AWS dependency analysis, compliance evidence, audit backlogs, and Git-based change workflows.</p>
            </article>
            <article>
              <div><span>08—11 / 2025</span><strong>Techhaus Vietnam</strong><small>Backend Developer Trainee</small></div>
              <p>Python and Django backend work covering REST APIs, database interactions, validation, error handling, pull requests, reviews, and debugging.</p>
            </article>
          </div>
        </section>

        <section className="profile-grid reveal" aria-label="Skills and education">
          <article>
            <h2 className="profile-title">Core toolkit</h2>
            <ul className="toolkit">
              <li><span>Cloud + IaC</span><strong>AWS · Terraform · SAM · CloudFormation</strong></li>
              <li><span>Containers</span><strong>Docker · Kubernetes · Minikube</strong></li>
              <li><span>Delivery</span><strong>GitHub Actions · Argo CD · GHCR</strong></li>
              <li><span>Security</span><strong>Trivy · Cosign · Gatekeeper · RBAC</strong></li>
              <li><span>Systems</span><strong>Python · Go · Bash · Linux · Nginx</strong></li>
            </ul>
          </article>
          <article className="education">
            <h2>University of Information Technology</h2>
            <span>VNU-HCM · 2022—2026</span>
            <strong>Bachelor of Engineering<br />Software Engineering</strong>
            <div><span>IELTS</span><strong>Overall Band 5.5 · 2024</strong></div>
          </article>
        </section>
      </main>

      <footer>
        <p>Have a system that needs a clearer path to production?</p>
        <a className="footer-email" href="mailto:nguyentrieu080604@gmail.com">nguyentrieu080604@gmail.com ↗</a>
        <div className="footer-line">
          <span>Nguyen Phu Trieu · DevOps Engineer</span>
          <nav aria-label="Social links">
            <a href="tel:+84858976459">Phone</a>
            <a href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  );
}
