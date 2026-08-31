"use client";

import { useEffect, useRef } from "react";

type FieldPoint = {
  angle: number;
  depth: number;
  drift: number;
  radius: number;
};

const TAU = Math.PI * 2;

export default function InfrastructureField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const points: FieldPoint[] = Array.from({ length: 92 }, (_, index) => ({
      angle: (index / 92) * TAU + Math.sin(index * 2.41) * 0.18,
      depth: 0.18 + ((index * 37) % 81) / 100,
      drift: ((index * 13) % 17) / 17,
      radius: 0.55 + ((index * 19) % 9) / 10,
    }));

    let width = 0;
    let height = 0;
    let ratio = 1;
    let frameId = 0;
    let visible = !document.hidden;
    let inViewport = true;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    const startedAt = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };

    const draw = (timestamp: number) => {
      context.clearRect(0, 0, width, height);
      const elapsed = reducedMotion ? 0 : (timestamp - startedAt) / 1000;
      pointerX += (pointerTargetX - pointerX) * 0.045;
      pointerY += (pointerTargetY - pointerY) * 0.045;
      const originX = width * (0.5 + pointerX * 0.035);
      const originY = height * (0.73 + pointerY * 0.025);
      const spread = Math.max(width, height) * 0.72;

      const wash = context.createRadialGradient(originX, originY, 0, originX, originY, spread * 0.76);
      wash.addColorStop(0, "rgba(84, 234, 220, 0.09)");
      wash.addColorStop(0.42, "rgba(96, 125, 255, 0.035)");
      wash.addColorStop(1, "rgba(4, 8, 8, 0)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      points.forEach((point, index) => {
        const wave = Math.sin(elapsed * 0.18 + point.drift * TAU) * 0.018;
        const distance = spread * (point.depth + wave);
        const squeeze = 0.42 + point.depth * 0.38;
        const x = originX + Math.cos(point.angle) * distance;
        const y = originY + Math.sin(point.angle) * distance * squeeze - point.depth * height * 0.12;
        const alpha = Math.max(0.025, (1 - point.depth) * 0.15);

        context.beginPath();
        context.moveTo(originX, originY);
        context.lineTo(x, y);
        context.strokeStyle = index % 7 === 0
          ? `rgba(143, 122, 255, ${alpha})`
          : `rgba(99, 231, 218, ${alpha})`;
        context.lineWidth = point.depth < 0.35 ? 0.8 : 0.45;
        context.stroke();

        context.beginPath();
        context.arc(x, y, point.radius * (1.25 - point.depth * 0.6), 0, TAU);
        context.fillStyle = index % 7 === 0
          ? `rgba(168, 151, 255, ${alpha * 2.6})`
          : `rgba(122, 246, 234, ${alpha * 2.6})`;
        context.fill();
      });

      context.beginPath();
      context.arc(originX, originY, 2.4, 0, TAU);
      context.fillStyle = "rgba(137, 255, 242, 0.8)";
      context.shadowColor = "rgba(84, 234, 220, 0.9)";
      context.shadowBlur = 18;
      context.fill();
      context.shadowBlur = 0;

      frameId = reducedMotion ? 0 : window.requestAnimationFrame(draw);
    };

    const handlePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerTargetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointerTargetY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    };
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && inViewport && !frameId) draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport && visible && !frameId) draw(performance.now());
      if (!inViewport && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }, { rootMargin: "15%" });
    intersectionObserver.observe(canvas);
    if (finePointer && !reducedMotion) canvas.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    if (!reducedMotion && !frameId) frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="infrastructure-field" aria-hidden="true" />;
}
