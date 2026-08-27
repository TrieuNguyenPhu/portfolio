export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path className="logo-head" d="M15 30c0-11 7.6-20 17-20s17 9 17 20v5c0 4.4-3.6 8-8 8H23c-4.4 0-8-3.6-8-8Z" />
      <circle className="logo-eye" cx="26" cy="29" r="2.4" />
      <circle className="logo-eye" cx="38" cy="29" r="2.4" />
      <path className="logo-tentacle" d="M19 39v6c0 5-7 5-7 10 0 4 4 6 8 3M26 41v8c0 4-4 5-4 9M32 42v11c0 4-3 6-6 6M38 41v9c0 4 3 6 6 5M45 39v7c0 5 7 4 7 9 0 4-4 6-8 3" />
    </svg>
  );
}
