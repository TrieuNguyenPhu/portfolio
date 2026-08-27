export type IconName =
  | "about"
  | "arrow"
  | "blog"
  | "cloud"
  | "code"
  | "database"
  | "layers"
  | "mail"
  | "projects"
  | "search"
  | "shield"
  | "workflow"
  | "x";

const paths: Record<IconName, React.ReactNode> = {
  about: <><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.7-4 2.8-6 6.5-6s5.8 2 6.5 6" /></>,
  arrow: <><path d="M7 17 17 7M8 7h9v9" /></>,
  blog: <><path d="M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3Z" /><path d="M8 8h7M8 12h7M8 16h4" /></>,
  cloud: <path d="M7.5 18.5h9.8a4.2 4.2 0 0 0 .5-8.4A6.2 6.2 0 0 0 6 8.7a5 5 0 0 0 1.5 9.8Z" />,
  code: <><path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5l-3 14" /></>,
  database: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  projects: <><path d="M3 7h7l2 2h9v10H3Z" /><path d="M3 7V5h6l2 2" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  shield: <path d="M12 3 20 6v5c0 5-3.3 8.6-8 10-4.7-1.4-8-5-8-10V6Z" />,
  workflow: <><rect x="3" y="4" width="6" height="5" rx="1" /><rect x="15" y="15" width="6" height="5" rx="1" /><path d="M9 6.5h3a4 4 0 0 1 4 4V15M15 17.5h-3a4 4 0 0 1-4-4V9" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

export default function UiIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className ? `ui-icon ${className}` : "ui-icon"} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}
