export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g className="logo-arms">
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(45 32 32)" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(90 32 32)" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(135 32 32)" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(180 32 32)" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(225 32 32)" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(270 32 32)" />
        <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(315 32 32)" />
      </g>
      <circle className="logo-core" cx="32" cy="32" r="6" />
    </svg>
  );
}
