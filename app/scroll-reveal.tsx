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
    const setScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", String(scrollable > 0 ? window.scrollY / scrollable : 0));
      document.documentElement.style.setProperty("--parallax-y", `${Math.min(window.scrollY * 0.07, 180)}px`);
      document.documentElement.style.setProperty("--parallax-y-reverse", `${Math.max(window.scrollY * -0.04, -120)}px`);
    };
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
      frame = window.requestAnimationFrame(() => {
        revealPastViewport();
        setScrollProgress();
      });
    };

    let pointerFrame = 0;
    const handlePointer = ({ clientX, clientY }: PointerEvent) => {
      window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${clientY}px`);
        document.documentElement.style.setProperty("--pointer-shift-x", `${((clientX / window.innerWidth) - 0.5) * 14}px`);
        document.documentElement.style.setProperty("--pointer-shift-y", `${((clientY / window.innerHeight) - 0.5) * 14}px`);
        document.documentElement.style.setProperty("--pointer-shift-x-reverse", `${((clientX / window.innerWidth) - 0.5) * -10}px`);
        document.documentElement.style.setProperty("--pointer-shift-y-reverse", `${((clientY / window.innerHeight) - 0.5) * -10}px`);
      });
    };

    setScrollProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, [pathname]);

  return null;
}
