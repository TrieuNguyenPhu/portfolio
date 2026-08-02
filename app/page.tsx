const projects = [
  {
    index: "01",
    slug: "seckube",
    title: "SecKube",
    type: "Kubernetes GitOps & Security Platform",
    date: "July 2026",
    summary:
      "A secure GitOps platform built around five ordered Argo CD sync waves, canary analysis, admission policies, signed images, and automatic rollback.",
    stack: ["Kubernetes", "Argo CD", "Prometheus", "Gatekeeper", "Cosign"],
    href: "https://github.com/TrieuNguyenPhu/SecKube",
    visual: ["SOURCE", "BUILD", "SIGN", "SYNC", "VERIFY"],
    metric: "5 sync waves",
  },
  {
    index: "02",
    slug: "shortenlink",
    title: "NPT ShortenLink",
    type: "Serverless URL Shortener on AWS",
    date: "May — July 2026",
    summary:
      "A Next.js and Go platform using Lambda, DynamoDB, CloudFront, Route 53, SAM, automated tests, vulnerability scans, and deployment smoke checks.",
    stack: ["Next.js", "Go", "Lambda", "DynamoDB", "CloudFormation"],
    href: "https://github.com/TrieuNguyenPhu/shorten-link",
    live: "https://npt-shortenlink.dev",
    visual: ["EDGE", "API", "LAMBDA", "DATA"],
    metric: "Serverless stack",
  },
  {
    index: "03",
    slug: "minesweeper",
    title: "Minesweeper",
    type: "Kubernetes Application on AWS",
    date: "June 2026",
    summary:
      "A Go service deployed to Minikube on EC2, with networking, compute, load balancing, and secure access provisioned through one Terraform workflow.",
    stack: ["Go", "Terraform", "EC2", "ALB", "Minikube"],
    href: "https://github.com/TrieuNguyenPhu/minesweeper-gin",
    visual: ["VPC", "EC2", "K8S", "ALB"],
    metric: "16 AWS resources",
  },
  {
    index: "04",
    slug: "stans",
    title: "STANS",
    type: "Containerized Navigation System",
    date: "July 2026",
    summary:
      "A multi-stage React container, GHCR delivery pipeline, and scripted Ubuntu host with Nginx, TLS certificates, health checks, and firewall rules.",
    stack: ["Docker", "GitHub Actions", "GHCR", "Nginx", "Bash"],
    href: "https://github.com/TrieuNguyenPhu/STANS-Nav-System",
    visual: ["COMMIT", "IMAGE", "GHCR", "SERVER"],
    metric: "Build to TLS",
  },
];

const skills = [
  ["Cloud & IaC", "AWS, Terraform, AWS SAM, CloudFormation"],
  ["Containers", "Docker, Docker Compose, Kubernetes, Minikube"],
  ["Delivery", "GitHub Actions, Argo CD, Argo Rollouts, GHCR"],
  ["Security", "Trivy, Cosign, OPA Gatekeeper, Kubernetes RBAC"],
  ["Systems", "Python, Go, Bash, Linux, Git, Nginx"],
];

export default function Home() {
  return (
    <>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Nguyen Phu Trieu, home">
          <span>NPT</span>
          <small>DevOps Engineer</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Projects</a>
          <a href="#experience">Experience</a>
          <a className="nav-cta" href="mailto:nguyentrieu080604@gmail.com">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="status"><span aria-hidden="true" /> ENTRY-LEVEL DEVOPS ENGINEER</p>
            <h1>I turn infrastructure into a repeatable delivery system.</h1>
            <p className="hero-lede">
              AWS, Kubernetes, Terraform, GitOps, CI/CD, observability, and cloud
              security—supported by a backend foundation in Python and Go.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#work">Explore my work</a>
              <a className="button button--ghost" href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>

          <aside className="hero-console" aria-label="Core engineering focus">
            <div className="console-head"><span>SYSTEM PROFILE</span><span>2026</span></div>
            <p className="console-label">PRIMARY FOCUS</p>
            <strong>DEV<br />OPS</strong>
            <dl>
              <div><dt>Cloud</dt><dd>AWS</dd></div>
              <div><dt>Orchestration</dt><dd>Kubernetes</dd></div>
              <div><dt>Infrastructure</dt><dd>Terraform</dd></div>
              <div><dt>Delivery</dt><dd>GitHub Actions</dd></div>
            </dl>
          </aside>
        </section>

        <div className="ticker" aria-label="Areas of expertise">
          <span>AWS</span><i />
          <span>KUBERNETES</span><i />
          <span>TERRAFORM</span><i />
          <span>GITOPS</span><i />
          <span>CI/CD</span><i />
          <span>LINUX</span>
        </div>

        <section className="projects-section" id="work">
          <header className="section-intro">
            <span>01 / PERSONAL PROJECTS</span>
            <div>
              <h2>Systems I built from the ground up.</h2>
              <p>Selected work across Kubernetes, AWS infrastructure, security, containers, and delivery automation.</p>
            </div>
          </header>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className={`project project--${project.slug}`} key={project.slug}>
                <header>
                  <span>{project.index}</span>
                  <span>{project.date}</span>
                </header>

                <div className="project-visual" aria-label={`${project.title} architecture flow`}>
                  {project.visual.map((step, index) => (
                    <span key={step}>
                      <b>{step}</b>
                      {index < project.visual.length - 1 ? <i aria-hidden="true">→</i> : null}
                    </span>
                  ))}
                </div>

                <div className="project-body">
                  <p className="project-metric">{project.metric}</p>
                  <h3>{project.title}</h3>
                  <p className="project-type">{project.type}</p>
                  <p className="project-summary">{project.summary}</p>
                </div>

                <ul className="tags" aria-label={`${project.title} technology stack`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <footer className="project-footer">
                  <a href={project.href} target="_blank" rel="noreferrer">View repository <span>↗</span></a>
                  {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live site <span>↗</span></a> : null}
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <header className="section-intro">
            <span>02 / EXPERIENCE</span>
            <div><h2>From backend code to cloud operations.</h2></div>
          </header>

          <div className="experience-list">
            <article>
              <p className="experience-date">04 / 2026 — 07 / 2026</p>
              <div><h3>XBrain</h3><p>DevOps Engineer Trainee</p></div>
              <p>Infrastructure planning, Terraform design review, AWS dependency analysis, compliance evidence, audit backlogs, and Git-based change workflows.</p>
            </article>
            <article>
              <p className="experience-date">08 / 2025 — 11 / 2025</p>
              <div><h3>Techhaus Vietnam</h3><p>Backend Developer Trainee</p></div>
              <p>Python and Django backend work covering REST APIs, databases, validation, error handling, pull requests, code reviews, and debugging.</p>
            </article>
          </div>
        </section>

        <section className="profile-section">
          <article className="skills-panel">
            <p className="panel-label">03 / TOOLKIT</p>
            <h2>The tools behind the work.</h2>
            <dl>
              {skills.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </article>

          <article className="education-panel">
            <p className="panel-label">04 / EDUCATION</p>
            <div className="education-mark">UIT</div>
            <h2>University of Information Technology</h2>
            <p>VNU-HCM · 2022—2026</p>
            <strong>Bachelor of Engineering<br />Software Engineering</strong>
            <div className="certification"><span>IELTS</span><strong>Overall Band 5.5 · 2024</strong></div>
          </article>
        </section>

        <section className="contact-section">
          <p>OPEN TO DEVOPS OPPORTUNITIES</p>
          <h2>Let&apos;s build a better path to production.</h2>
          <a href="mailto:nguyentrieu080604@gmail.com">nguyentrieu080604@gmail.com <span>↗</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 Nguyen Phu Trieu</span>
        <nav aria-label="Social links">
          <a href="tel:+84858976459">Phone</a>
          <a href="https://www.linkedin.com/in/trieunguyenphu86/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </>
  );
}
