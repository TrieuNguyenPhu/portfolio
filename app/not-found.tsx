import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">Unbound page · 404</p><h1>This volume is missing.</h1><p>The requested record is not part of this edition.</p><Link className="primary-link" href="/">Return to the shelf <span aria-hidden="true">↗</span></Link></main>;
}
