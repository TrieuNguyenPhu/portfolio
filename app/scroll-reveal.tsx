"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const selector = "[data-reveal]";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const revealAll = () => targets.forEach((target) => target.classList.add("is-revealed"));
    const revealPastViewport = () => {
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < window.innerHeight * 0.92) {
          target.classList.add("is-revealed");
        }
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    document.documentElement.dataset.motion = "ready";
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    revealPastViewport();

    let frame = 0;
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(revealPastViewport);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
