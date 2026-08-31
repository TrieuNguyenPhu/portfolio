"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollReveal({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;

    const media = gsap.matchMedia();
    const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
    const routePaths = gsap.utils.toArray<SVGPathElement>(
      ".visual-route, .workbench-flow, .map-route",
      root,
    );
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    const heroWords = gsap.utils.toArray<HTMLElement>("[data-hero-word]", root);
    const heroIntro = gsap.utils.toArray<HTMLElement>(
      "[data-hero-intro], .hero-actions",
      root,
    );
    const heroName = root.querySelector<HTMLElement>("[data-hero-name]");
    const heroFeature = root.querySelector<HTMLElement>("[data-hero-feature]");
    const projectCards = gsap.utils.toArray<HTMLElement>("[data-project-card]", root);

    media.add(
      {
        isDesktop: "(min-width: 62.01rem)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) {
          gsap.set(revealTargets, { autoAlpha: 1, clearProps: "transform" });
          gsap.set([...heroWords, ...heroIntro, ...projectCards, heroName, heroFeature].filter(Boolean), {
            autoAlpha: 1,
            clearProps: "transform",
          });
          gsap.set(routePaths, { strokeDashoffset: 0 });
          return;
        }

        if (hero) {
          gsap.set(heroWords, { autoAlpha: 0, yPercent: 115, rotateX: -28 });
          gsap.set(heroIntro, { autoAlpha: 0, y: 18 });
          if (heroName) gsap.set(heroName, { autoAlpha: 0, yPercent: 28, clipPath: "inset(0 0 100% 0)" });
          if (heroFeature) gsap.set(heroFeature, { autoAlpha: 0, x: 24 });

          const heroEntrance = gsap.timeline({ defaults: { ease: "power3.out" } });
          heroEntrance
            .to(heroWords, {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 0.82,
              stagger: 0.045,
            }, 0.12)
            .to(heroIntro, {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
              stagger: 0.07,
            }, 0.28);
          if (heroName) {
            heroEntrance.to(heroName, {
              autoAlpha: 1,
              yPercent: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.05,
              ease: "power4.out",
            }, 0.18);
          }
          if (heroFeature) {
            heroEntrance.to(heroFeature, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.48);
          }

          if (isDesktop) {
            const heroStage = hero.querySelector<HTMLElement>(".hero-stage, .shader-frame");
            const heroCopy = hero.querySelector<HTMLElement>(".folio-hero-copy");
            const heroHud = gsap.utils.toArray<HTMLElement>(".hero-stage__hud, .hero-node-label", hero);
            const heroScroll = gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top+=76",
                end: "+=70%",
                pin: true,
                pinSpacing: true,
                scrub: 0.65,
                anticipatePin: 1,
              },
            });

            if (heroStage) heroScroll.to(heroStage, { scale: 1.045, duration: 1, ease: "none" }, 0);
            if (heroCopy) heroScroll.to(heroCopy, { y: -38, autoAlpha: 0.34, duration: 1, ease: "none" }, 0.18);
            if (heroName) heroScroll.to(heroName, { yPercent: 24, autoAlpha: 0.22, duration: 1, ease: "none" }, 0);
            if (heroFeature) heroScroll.to(heroFeature, { x: 36, autoAlpha: 0, duration: .72, ease: "none" }, 0.2);
            if (heroHud.length) heroScroll.to(heroHud, { autoAlpha: 0, duration: 0.45, stagger: 0.025 }, 0.45);
          }
        }

        gsap.set(revealTargets, {
          autoAlpha: 0,
          y: isDesktop ? 34 : 20,
          scale: 0.985,
          transformOrigin: "50% 100%",
        });

        ScrollTrigger.batch(revealTargets, {
          start: "top 88%",
          once: true,
          interval: 0.08,
          batchMax: isDesktop ? 3 : 2,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: isDesktop ? 0.7 : 0.46,
              ease: "power3.out",
              stagger: { each: isDesktop ? 0.07 : 0.04 },
              overwrite: "auto",
            });
          },
        });

        routePaths.forEach((path) => {
          gsap.fromTo(
            path,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: path.closest(".project-visual, .cloud-workbench, .delivery-map") ?? path,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

        projectCards.forEach((card, index) => {
          const visual = card.querySelector<HTMLElement>("[data-project-visual]");
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: isDesktop ? 80 : 42,
              rotateY: isDesktop ? (index % 2 === 0 ? -5 : 5) : 0,
              scale: 0.965,
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              duration: isDesktop ? 0.92 : 0.58,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 84%", once: true },
            },
          );

          if (visual && isDesktop) {
            gsap.fromTo(
              visual,
              { yPercent: -5, scale: 1.035 },
              {
                yPercent: 5,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              },
            );
          }
        });

        const progress = root.querySelector<HTMLElement>(".scroll-progress");
        if (progress) {
          gsap.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
            },
          );
        }

        gsap.from(".nav-shell", {
          autoAlpha: 0,
          y: -14,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    );

    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const magneticTargets = gsap.utils.toArray<HTMLElement>(".button--primary", root);
        const cleanups = magneticTargets.map((target) => {
          const xTo = gsap.quickTo(target, "x", { duration: 0.35, ease: "power3.out" });
          const yTo = gsap.quickTo(target, "y", { duration: 0.35, ease: "power3.out" });
          const handleMove = (event: PointerEvent) => {
            const bounds = target.getBoundingClientRect();
            xTo((event.clientX - bounds.left - bounds.width / 2) * 0.08);
            yTo((event.clientY - bounds.top - bounds.height / 2) * 0.08);
          };
          const handleLeave = () => {
            xTo(0);
            yTo(0);
          };
          target.addEventListener("pointermove", handleMove);
          target.addEventListener("pointerleave", handleLeave);
          return () => {
            target.removeEventListener("pointermove", handleMove);
            target.removeEventListener("pointerleave", handleLeave);
          };
        });
        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      media.revert();
    };
  }, { dependencies: [pathname], scope, revertOnUpdate: true });

  return <div ref={scope} className="motion-shell">{children}</div>;
}
