"use client";

import { CompleteShelfLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="shelf-entry">
      <nav className="shelf-entry__bar" aria-label="Portfolio access">
        <Link className="shelf-entry__identity" href="/profile">
          <strong>Nguyen Phu Trieu</strong>
          <span>Cloud DevOps · DevSecOps</span>
        </Link>
        <p>Interactive library · Three.js r165</p>
        <div className="shelf-entry__actions">
          <Link href="/profile#volumes">Index</Link>
          <Link className="shelf-entry__primary" href="/profile">Enter portfolio <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>
      <div className="shader-frame" data-source-revision="606f200fed86">
        <CompleteShelfLandingPage
          headingFont="iowan-old-style"
          bodyFont="inter"
          headingWeight="400"
          bodyWeight="400"
          primaryColor="#c87046"
          headingSize={60}
          bodySize={12}
          headingLetterSpacing={-0.055}
        />
      </div>
    </main>
  );
}
