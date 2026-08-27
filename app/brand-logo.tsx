export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path className="logo-frame" d="M7 7h37l13 13v37H7Z" />
      <path className="logo-route" d="M16 19h32M32 19v28" />
      <circle className="logo-node" cx="16" cy="19" r="3" />
      <circle className="logo-node" cx="32" cy="19" r="3" />
      <circle className="logo-node" cx="48" cy="19" r="3" />
      <circle className="logo-node" cx="32" cy="47" r="3" />
    </svg>
  );
}
