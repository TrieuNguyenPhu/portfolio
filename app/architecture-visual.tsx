import type { Project } from "./projects/projects";

type ProjectArchitectureProps = {
  project: Project;
  variant?: number;
  language: "en" | "vi";
};

const projectNodes = (project: Project) => {
  const parts = project.architecture.en.split("→").map((item) => item
    .trim()
    .replace(" App of Apps", "")
    .replace(" + outbox events", "")
    .replace(/^immutable /i, "")
    .replace(/ analysis$/i, "")
    .replace(/ file storage$/i, ""));
  const selected = parts.length > 4 ? [parts[0], parts[1], parts.at(-2), parts.at(-1)] : parts;
  return selected.filter((item): item is string => Boolean(item));
};

export function CloudWorkbench() {
  return (
    <div className="cloud-workbench" role="img" aria-label="A software engineering workspace connecting backend APIs, data, cloud infrastructure, delivery, and operational signals">
      <svg viewBox="0 0 1000 460" aria-hidden="true">
        <path className="workbench-orbit" d="M118 254C172 80 354 38 488 146c116 94 210 64 380-34M94 350c162 46 274 32 356-42 112-102 246-90 428 36" />
        <g className="workbench-cloud"><path d="M110 178h160c34 0 48-45 18-62-4-54-72-75-107-33-43-18-85 27-71 69-36 6-38 26 0 26Z" /><text x="190" y="144">AWS</text></g>
        <g className="workbench-monitor"><rect x="308" y="82" width="382" height="258" rx="24" /><rect x="334" y="109" width="330" height="203" rx="10" /><path d="M404 388h190M456 340v48M544 340v48" /><circle cx="365" cy="137" r="7" /><circle cx="365" cy="211" r="7" /><circle cx="488" cy="211" r="7" /><circle cx="610" cy="211" r="7" /><circle cx="610" cy="282" r="7" /><path className="workbench-flow" pathLength="1" d="M365 137v74h245v71M365 211h123" /><text x="349" y="166">API</text><text x="446" y="242">DATA</text><text x="565" y="242">TEST</text><text x="552" y="293">SIGNAL</text></g>
        <g className="workbench-rack"><rect x="752" y="166" width="142" height="191" rx="18" /><rect x="774" y="192" width="98" height="38" rx="8" /><rect x="774" y="242" width="98" height="38" rx="8" /><rect x="774" y="292" width="98" height="38" rx="8" /><circle cx="846" cy="211" r="5" /><circle cx="846" cy="261" r="5" /><circle cx="846" cy="311" r="5" /><text x="779" y="216">APP</text><text x="779" y="266">DB</text><text x="779" y="316">OPS</text></g>
        <g className="workbench-chip workbench-chip--iac"><rect x="184" y="277" width="134" height="54" rx="27" /><text x="251" y="310">Java</text></g>
        <g className="workbench-chip workbench-chip--gitops"><rect x="674" y="64" width="154" height="54" rx="27" /><text x="751" y="97">Cloud</text></g>
        <path className="workbench-ground" d="M70 390h860" />
      </svg>
    </div>
  );
}

export function DeliveryMap() {
  return (
    <div className="delivery-map" role="img" aria-label="Delivery system from source control through security gates to an observable Kubernetes runtime">
      <svg viewBox="0 0 760 620" aria-hidden="true">
        <path className="map-gridline" d="M74 104H686M74 310H686M74 516H686M176 54V566M380 54V566M584 54V566" />
        <path className="map-route map-route--main" pathLength="1" d="M118 104H380V310H584V516" />
        <path className="map-route map-route--branch" pathLength="1" d="M380 310H176V516" />
        <circle className="map-pulse map-pulse--source" cx="118" cy="104" r="7" />
        <circle className="map-pulse map-pulse--runtime" cx="584" cy="516" r="7" />
      </svg>
      <div className="map-node map-node--source"><small>SOURCE</small><strong>Git</strong><span>change intent</span></div>
      <div className="map-node map-node--build"><small>BUILD</small><strong>CI</strong><span>test · package</span></div>
      <div className="map-node map-node--trust"><small>TRUST</small><strong>Policy</strong><span>scan · sign</span></div>
      <div className="map-node map-node--state"><small>STATE</small><strong>GitOps</strong><span>desired state</span></div>
      <div className="map-node map-node--runtime"><small>RUNTIME</small><strong>Kubernetes</strong><span>progressive delivery</span></div>
      <div className="map-node map-node--signal"><small>SIGNAL</small><strong>Telemetry</strong><span>metrics · logs</span></div>
      <div className="map-core"><span>NPT</span><strong>Reliable delivery</strong><i /></div>
      <div className="map-caption"><span>DELIVERY SYSTEM</span><span>HEALTH-DRIVEN</span></div>
    </div>
  );
}

export function ProjectArchitecture({ project, variant = 0, language }: ProjectArchitectureProps) {
  const nodes = projectNodes(project);

  return (
    <div
      className="project-visual"
      data-visual={String(variant % 3)}
      role="img"
      aria-label={`${project.title}: ${project.architecture[language]}`}
    >
      <svg viewBox="0 0 760 500" aria-hidden="true">
        <path className="visual-gridline" d="M60 82H700M60 250H700M60 418H700M180 48V452M380 48V452M580 48V452" />
        <path className="visual-route visual-route--primary" pathLength="1" d="M126 132H305V250H455V368H634" />
        <path className="visual-route visual-route--secondary" pathLength="1" d="M305 250H126V368M455 250H634V132" />
      </svg>
      <div className="visual-node visual-node--one"><small>INPUT</small><strong>{nodes[0] ?? "Source"}</strong></div>
      <div className="visual-node visual-node--two"><small>CONTROL</small><strong>{nodes[1] ?? "Pipeline"}</strong></div>
      <div className="visual-node visual-node--three"><small>STATE</small><strong>{nodes[2] ?? "Runtime"}</strong></div>
      <div className="visual-node visual-node--four"><small>SIGNAL</small><strong>{nodes[3] ?? "Observe"}</strong></div>
      <div className="visual-core"><span>{project.title.slice(0, 2).toUpperCase()}</span><i /></div>
      <div className="visual-label"><span>{project.title}</span><span>{project.stage[language]}</span></div>
    </div>
  );
}
