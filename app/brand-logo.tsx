export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path className="logo-mantle" d="M14 30.5C14 18.7 22 10 32 10s18 8.7 18 20.5v8.2c0 4.6-3.7 8.3-8.3 8.3H22.3c-4.6 0-8.3-3.7-8.3-8.3Z" />
      <path className="logo-spot" d="M24 20.5c2.3-2.1 5-3.2 8-3.2s5.7 1.1 8 3.2" />
      <circle className="logo-eye" cx="25.5" cy="31" r="2.6" />
      <circle className="logo-eye" cx="38.5" cy="31" r="2.6" />
      <path className="logo-arms" d="M18.5 43.5v5.1c0 4-5.5 4.3-5.5 8.2 0 2.4 1.8 3.7 4 3.7 2.7 0 4.7-2.4 4.7-5.5v-8.6M25.5 46v7.5c0 3.5-2.3 6.2-5.2 6.2M32 47v8.2c0 3.1-2.4 5.3-5.2 5.3M38.5 46v7.5c0 3.5 2.3 6.2 5.2 6.2M45.5 43.5v5.1c0 4 5.5 4.3 5.5 8.2 0 2.4-1.8 3.7-4 3.7-2.7 0-4.7-2.4-4.7-5.5v-8.6" />
    </svg>
  );
}
