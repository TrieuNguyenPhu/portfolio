"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  attribute float aScale;
  attribute float aMix;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vMix;

  void main() {
    vec3 transformed = position;
    transformed.y += sin((position.x * 1.35) + (uTime * 0.22)) * 0.035;
    transformed.x += cos((position.z * 1.1) + (uTime * 0.18)) * 0.025;
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aScale * uPixelRatio * (24.0 / max(1.0, -viewPosition.z));
    vMix = aMix;
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.05, 0.5, distanceToCenter);
    vec3 color = mix(uColorA, uColorB, vMix);
    gl_FragColor = vec4(color, alpha * 0.72);
  }
`;

function makeArc(points: THREE.Vector3[], color: number, opacity: number) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(96));
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.Line(geometry, material);
}

export default function AmbientThree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowEnd = (navigator.hardwareConcurrency ?? 4) <= 2;

    if (prefersReducedMotion || isLowEnd) {
      document.documentElement.dataset.webgl = "fallback";
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      document.documentElement.dataset.webgl = "fallback";
      return;
    }

    document.documentElement.dataset.webgl = "ready";
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 50);
    camera.position.set(0, 0, 8.2);

    const field = new THREE.Group();
    scene.add(field);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x5574d8,
      transparent: true,
      opacity: 0.075,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const wireGeometry = new THREE.IcosahedronGeometry(2.45, 2);
    const wireGlobe = new THREE.Mesh(wireGeometry, wireMaterial);
    wireGlobe.scale.set(1.18, 0.82, 1);
    field.add(wireGlobe);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.09,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringGeometries = [
      new THREE.TorusGeometry(3.1, 0.012, 4, 160),
      new THREE.TorusGeometry(2.65, 0.01, 4, 160),
    ];
    const outerRing = new THREE.Mesh(ringGeometries[0], ringMaterial);
    const innerRing = new THREE.Mesh(ringGeometries[1], ringMaterial.clone());
    outerRing.rotation.set(1.1, 0.12, 0.22);
    innerRing.rotation.set(1.36, -0.18, -0.38);
    field.add(outerRing, innerRing);

    const pointCount = window.innerWidth < 768 ? 180 : 360;
    const positions = new Float32Array(pointCount * 3);
    const scales = new Float32Array(pointCount);
    const mixes = new Float32Array(pointCount);

    for (let index = 0; index < pointCount; index += 1) {
      const radius = 2.4 + Math.random() * 2.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = 0.26 + Math.random() * 2.5;
      positions[index * 3] = Math.cos(theta) * Math.sin(phi) * radius;
      positions[index * 3 + 1] = Math.cos(phi) * radius * 0.62;
      positions[index * 3 + 2] = Math.sin(theta) * Math.sin(phi) * radius * 0.72;
      scales[index] = 0.7 + Math.random() * 1.8;
      mixes[index] = Math.min(1, Math.max(0, (positions[index * 3 + 1] + 2.8) / 5.6));
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    pointsGeometry.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));

    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uColorA: { value: new THREE.Color(0x22d3ee) },
        uColorB: { value: new THREE.Color(0x8b5cf6) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    field.add(points);

    const arcs = [
      makeArc(
        [
          new THREE.Vector3(-3.5, -0.8, 0.2),
          new THREE.Vector3(-1.2, 2.15, 0.5),
          new THREE.Vector3(1.5, 1.4, 0.25),
          new THREE.Vector3(3.8, -0.45, 0.1),
        ],
        0x8b5cf6,
        0.28,
      ),
      makeArc(
        [
          new THREE.Vector3(-3.8, 0.35, -0.4),
          new THREE.Vector3(-1.6, -1.65, 0),
          new THREE.Vector3(1.1, -1.4, 0.2),
          new THREE.Vector3(3.6, 0.75, -0.15),
        ],
        0x22d3ee,
        0.15,
      ),
    ];
    field.add(...arcs);

    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    let scrollTarget = 0;
    let scrollProgress = 0;
    let frameId = 0;
    let isVisible = !document.hidden;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      pointsMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      field.position.x = width > 1024 ? 2.15 : width > 640 ? 1.15 : 0.65;
      field.scale.setScalar(width < 640 ? 0.82 : 1);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = scrollable > 0 ? window.scrollY / scrollable : 0;
    };
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !frameId) animate();
    };

    const animate = () => {
      if (!isVisible) {
        frameId = 0;
        return;
      }

      const elapsed = clock.getElapsedTime();
      pointer.lerp(pointerTarget, 0.035);
      scrollProgress += (scrollTarget - scrollProgress) * 0.035;
      pointsMaterial.uniforms.uTime.value = elapsed;
      field.rotation.y = elapsed * 0.018 + pointer.x * 0.075;
      field.rotation.x += ((pointer.y * -0.045) - field.rotation.x) * 0.04;
      field.position.y = 0.2 - scrollProgress * 1.45;
      outerRing.rotation.z = 0.22 + elapsed * 0.012;
      innerRing.rotation.z = -0.38 - elapsed * 0.009;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    handleScroll();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringGeometries.forEach((geometry) => geometry.dispose());
      ringMaterial.dispose();
      (innerRing.material as THREE.Material).dispose();
      arcs.forEach((arc) => {
        arc.geometry.dispose();
        (arc.material as THREE.Material).dispose();
      });
      renderer.dispose();
      delete document.documentElement.dataset.webgl;
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-three" aria-hidden="true" />;
}
