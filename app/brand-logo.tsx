export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path className="logo-frame" d="M7 7h37l13 13v37H7Z" />
      <path className="logo-route" d="M18 44V20l27 24V20" />
      <circle className="logo-node" cx="18" cy="20" r="3" />
      <circle className="logo-node" cx="18" cy="44" r="3" />
      <circle className="logo-node" cx="45" cy="20" r="3" />
      <circle className="logo-node" cx="45" cy="44" r="3" />
    </svg>
  );
}
