export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g className="logo-arms">
        <path d="M32 27V18H24V10" />
        <path d="M35 28L41 22V14H49" />
        <path d="M37 32H50V24H58" />
        <path d="M35 36L42 43V51H52" />
        <path d="M32 38V50H40V58" />
        <path d="M29 36L22 43V51H12" />
        <path d="M27 32H14V24H6" />
        <path d="M29 28L23 22V14H15" />
      </g>
      <g className="logo-terminals">
        <circle cx="24" cy="10" r="2" />
        <circle cx="49" cy="14" r="2" />
        <circle cx="58" cy="24" r="2" />
        <circle cx="52" cy="51" r="2" />
        <circle cx="40" cy="58" r="2" />
        <circle cx="12" cy="51" r="2" />
        <circle cx="6" cy="24" r="2" />
        <circle cx="15" cy="14" r="2" />
      </g>
      <path className="logo-core" d="M32 23.5L39.4 27.8V36.2L32 40.5L24.6 36.2V27.8Z" />
      <circle className="logo-core-dot" cx="32" cy="32" r="2.4" />
    </svg>
  );
}
