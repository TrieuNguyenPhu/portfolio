"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const coreVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    float slowWave = sin(position.x * 2.8 + uTime * 0.62) * 0.055;
    float crossWave = sin(position.y * 4.1 - uTime * 0.48) * 0.038;
    float detailWave = cos((position.z + position.x) * 6.2 + uTime * 0.34) * 0.022;
    float displacement = slowWave + crossWave + detailWave;
    vec3 displaced = position + normal * displacement;
    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);

    vNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = worldPosition.xyz;
    vDisplacement = displacement;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const coreFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float facing = max(0.0, dot(viewDirection, normalize(vNormal)));
    float fresnel = pow(1.0 - facing, 3.2);
    float innerRim = pow(1.0 - facing, 8.0);
    float scan = 0.5 + 0.5 * sin((vWorldPosition.y * 14.0) - (uTime * 1.3));
    scan = smoothstep(0.76, 1.0, scan);
    float colorMix = clamp((vNormal.y + 1.0) * 0.5 + vDisplacement * 2.5, 0.0, 1.0);
    vec3 signal = mix(uColorA, uColorB, colorMix);
    vec3 base = vec3(0.008, 0.012, 0.035) + signal * (0.055 + scan * 0.08);
    vec3 glow = signal * fresnel * 2.35 + vec3(0.3, 0.55, 1.0) * innerRim * 1.5;

    gl_FragColor = vec4(base + glow, 0.96);
  }
`;

const pointVertexShader = `
  attribute float aSize;
  attribute float aMix;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vMix;
  varying float vPulse;

  void main() {
    vec3 transformed = position;
    float pulse = 0.72 + 0.28 * sin(uTime * 0.82 + aPhase);
    transformed += normalize(position) * sin(uTime * 0.25 + aPhase) * 0.025;
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * pulse * uPixelRatio * (34.0 / max(1.0, -viewPosition.z));
    vMix = aMix;
    vPulse = pulse;
  }
`;

const pointFragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vMix;
  varying float vPulse;

  void main() {
    float radius = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.08, 0.5, radius);
    vec3 color = mix(uColorA, uColorB, vMix);
    gl_FragColor = vec4(color * (1.0 + vPulse * 0.65), alpha * vPulse);
  }
`;

type PointCloudOptions = {
  count: number;
  innerRadius: number;
  outerRadius: number;
  flatten?: number;
  size: [number, number];
  colors: [number, number];
  opacity?: number;
};

function makePointCloud(renderer: THREE.WebGLRenderer, options: PointCloudOptions) {
  const positions = new Float32Array(options.count * 3);
  const sizes = new Float32Array(options.count);
  const mixes = new Float32Array(options.count);
  const phases = new Float32Array(options.count);
  const flatten = options.flatten ?? 1;

  for (let index = 0; index < options.count; index += 1) {
    const radius = THREE.MathUtils.lerp(options.innerRadius, options.outerRadius, Math.pow(Math.random(), 0.72));
    const theta = Math.random() * Math.PI * 2;
    const cosine = THREE.MathUtils.randFloatSpread(2);
    const sine = Math.sqrt(1 - cosine * cosine);
    positions[index * 3] = radius * sine * Math.cos(theta);
    positions[index * 3 + 1] = radius * cosine * flatten;
    positions[index * 3 + 2] = radius * sine * Math.sin(theta);
    sizes[index] = THREE.MathUtils.randFloat(options.size[0], options.size[1]);
    mixes[index] = Math.random();
    phases[index] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uColorA: { value: new THREE.Color(options.colors[0]) },
      uColorB: { value: new THREE.Color(options.colors[1]) },
    },
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: options.opacity ?? 1,
    toneMapped: false,
  });

  return { points: new THREE.Points(geometry, material), material };
}

function makeOrbit(radiusX: number, radiusY: number, color: number, opacity: number) {
  const positions: THREE.Vector3[] = [];
  for (let index = 0; index <= 220; index += 1) {
    const angle = (index / 220) * Math.PI * 2;
    positions.push(new THREE.Vector3(Math.cos(angle) * radiusX, Math.sin(angle) * radiusY, 0));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(positions);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  return new THREE.LineLoop(geometry, material);
}

export default function HeroThree() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = (navigator.hardwareConcurrency ?? 4) <= 2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: !lowEnd,
        preserveDrawingBuffer: reducedMotion,
        powerPreference: "high-performance",
      });
    } catch {
      stage.dataset.scene = "fallback";
      return;
    }

    stage.dataset.scene = "ready";
    renderer.setClearColor(0x030409, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1 : 1.6));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030409, 0.052);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 45);
    camera.position.set(0, 0, 8.4);

    const world = new THREE.Group();
    const orbitSystem = new THREE.Group();
    world.add(orbitSystem);
    scene.add(world);

    scene.add(new THREE.HemisphereLight(0x8fcfff, 0x080414, 0.8));
    const keyLight = new THREE.PointLight(0x6a7cff, 12, 14, 2);
    keyLight.position.set(3.5, 2.5, 4.5);
    scene.add(keyLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.62, lowEnd ? 4 : 5);
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(0x22d3ee) },
        uColorB: { value: new THREE.Color(0x8b5cf6) },
      },
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      transparent: true,
      depthWrite: true,
      toneMapped: false,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    orbitSystem.add(core);

    const wireGeometry = new THREE.IcosahedronGeometry(1.7, 3);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x9d7dff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const wireCore = new THREE.Mesh(wireGeometry, wireMaterial);
    orbitSystem.add(wireCore);

    const surfaceCloud = makePointCloud(renderer, {
      count: lowEnd ? 480 : window.innerWidth < 720 ? 620 : 1450,
      innerRadius: 1.69,
      outerRadius: 1.82,
      size: [0.8, 2.4],
      colors: [0x22d3ee, 0x9b78ff],
    });
    orbitSystem.add(surfaceCloud.points);

    const dustCloud = makePointCloud(renderer, {
      count: lowEnd ? 260 : window.innerWidth < 720 ? 320 : 920,
      innerRadius: 3.2,
      outerRadius: 7.6,
      flatten: 0.72,
      size: [0.35, 1.35],
      colors: [0x365dff, 0x8b5cf6],
    });
    scene.add(dustCloud.points);

    const ringSpecs = [
      { x: 3.05, y: 1.25, rotation: [0.82, 0.16, 0.12], color: 0x22d3ee, opacity: 0.52 },
      { x: 3.65, y: 1.52, rotation: [1.14, -0.34, -0.28], color: 0x5575ff, opacity: 0.36 },
      { x: 4.25, y: 1.8, rotation: [1.42, 0.24, 0.46], color: 0x9b78ff, opacity: 0.3 },
      { x: 2.5, y: 1.03, rotation: [0.36, 0.48, -0.18], color: 0x22d3ee, opacity: 0.18 },
    ] as const;
    const rings = ringSpecs.map((spec) => {
      const ring = makeOrbit(spec.x, spec.y, spec.color, spec.opacity);
      ring.rotation.set(spec.rotation[0], spec.rotation[1], spec.rotation[2]);
      orbitSystem.add(ring);
      return ring;
    });

    const energyMaterials: THREE.MeshBasicMaterial[] = [];
    const energyTubes = [
      { radius: 2.2, tube: 0.018, color: 0x35d9ff, tilt: [1.03, 0.2, 0.05] },
      { radius: 2.75, tube: 0.014, color: 0xa079ff, tilt: [1.4, -0.28, -0.34] },
    ].map((spec) => {
      const pathPoints = Array.from({ length: 15 }, (_, index) => {
        const angle = (index / 15) * Math.PI * 2;
        const wobble = 1 + Math.sin(index * 2.4) * 0.035;
        return new THREE.Vector3(
          Math.cos(angle) * spec.radius * wobble,
          Math.sin(angle) * spec.radius * 0.42,
          Math.sin(angle * 2) * 0.14,
        );
      });
      const curve = new THREE.CatmullRomCurve3(pathPoints, true, "catmullrom", 0.5);
      const geometry = new THREE.TubeGeometry(curve, 180, spec.tube, 5, true);
      const material = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      });
      energyMaterials.push(material);
      const tube = new THREE.Mesh(geometry, material);
      tube.rotation.set(spec.tilt[0], spec.tilt[1], spec.tilt[2]);
      orbitSystem.add(tube);
      return tube;
    });

    const nodeGeometry = new THREE.SphereGeometry(0.075, 18, 18);
    const nodeData = [
      { label: "AWS EDGE", radius: 3.05, speed: 0.19, phase: 0.2, color: 0x22d3ee, ring: 0 },
      { label: "KUBERNETES", radius: 3.65, speed: -0.14, phase: 1.7, color: 0x5575ff, ring: 1 },
      { label: "GITOPS", radius: 4.25, speed: 0.1, phase: 3.1, color: 0x9b78ff, ring: 2 },
      { label: "OBSERVABILITY", radius: 2.5, speed: -0.22, phase: 4.4, color: 0x22d3ee, ring: 3 },
    ];
    const nodeMeshes = nodeData.map((node) => {
      const material = new THREE.MeshBasicMaterial({ color: node.color, toneMapped: false });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.userData.label = node.label;
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 16, 16),
        new THREE.MeshBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.13,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      mesh.add(halo);
      orbitSystem.add(mesh);
      return mesh;
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.78, 0.5, 0.18);
    bloomPass.enabled = window.innerWidth >= 720 && (navigator.hardwareConcurrency ?? 4) >= 4;
    composer.addPass(bloomPass);

    const startTime = performance.now();
    let previousTime = startTime;
    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredNode: THREE.Mesh | null = null;
    let scrollProgress = 0;
    let scrollTarget = 0;
    let frameId = 0;
    let visible = !document.hidden;
    let inViewport = true;
    let dragging = false;
    let lastPointerX = 0;
    let dragRotation = 0;

    const resize = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      const pixelRatio = Math.min(window.devicePixelRatio, lowEnd ? 1 : 1.6);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      composer.setPixelRatio(pixelRatio);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      surfaceCloud.material.uniforms.uPixelRatio.value = pixelRatio;
      dustCloud.material.uniforms.uPixelRatio.value = pixelRatio;
      world.position.x = width > 980 ? 2.25 : width > 680 ? 1.15 : 0;
      world.position.y = width < 680 ? -0.45 : 0.05;
      world.scale.setScalar(width < 680 ? 0.72 : width < 980 ? 0.88 : 1);
      bloomPass.enabled = width >= 720 && (navigator.hardwareConcurrency ?? 4) >= 4;
      if (reducedMotion) composer.render(0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      );

      if (dragging) {
        dragRotation += (event.clientX - lastPointerX) * 0.006;
        lastPointerX = event.clientX;
      }

      raycaster.setFromCamera(pointerTarget, camera);
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0]?.object as THREE.Mesh | undefined;
      if (hit !== hoveredNode) {
        hoveredNode = hit ?? null;
        canvas.style.cursor = hoveredNode ? "pointer" : dragging ? "grabbing" : "grab";
        if (focusRef.current) focusRef.current.textContent = hoveredNode?.userData.label ?? "CLOUD CORE";
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      lastPointerX = event.clientX;
      canvas.setPointerCapture?.(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const handlePointerUp = (event: PointerEvent) => {
      dragging = false;
      canvas.releasePointerCapture?.(event.pointerId);
      canvas.style.cursor = hoveredNode ? "pointer" : "grab";
    };
    const handleScroll = () => {
      const bounds = stage.getBoundingClientRect();
      scrollTarget = THREE.MathUtils.clamp(-bounds.top / Math.max(1, bounds.height), 0, 1);
    };
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && inViewport && !frameId) animate();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport && visible && !frameId) animate();
    }, { rootMargin: "18%" });
    intersectionObserver.observe(stage);

    const animate = (timestamp = performance.now()) => {
      if (!visible || !inViewport) {
        frameId = 0;
        return;
      }

      const delta = Math.min((timestamp - previousTime) / 1000, 0.05);
      const elapsed = (timestamp - startTime) / 1000;
      previousTime = timestamp;
      pointer.lerp(pointerTarget, 0.045);
      scrollProgress += (scrollTarget - scrollProgress) * 0.055;

      coreMaterial.uniforms.uTime.value = elapsed;
      surfaceCloud.material.uniforms.uTime.value = elapsed;
      dustCloud.material.uniforms.uTime.value = elapsed;
      core.rotation.y = elapsed * 0.035;
      core.rotation.x = Math.sin(elapsed * 0.18) * 0.08;
      wireCore.rotation.y = -elapsed * 0.024;
      surfaceCloud.points.rotation.y = elapsed * 0.018;
      dustCloud.points.rotation.y = -elapsed * 0.004;

      const responsiveScale = stage.clientWidth < 680 ? 0.72 : stage.clientWidth < 980 ? 0.88 : 1;
      const targetScale = responsiveScale * (1 - scrollProgress * 0.16);
      world.scale.setScalar(THREE.MathUtils.lerp(world.scale.x, targetScale, 0.06));
      world.rotation.y += ((pointer.x * 0.23 + dragRotation + scrollProgress * 0.75) - world.rotation.y) * 0.045;
      world.rotation.x += ((pointer.y * -0.12 + scrollProgress * 0.08) - world.rotation.x) * 0.045;
      camera.position.x += ((pointer.x * -0.16) - camera.position.x) * 0.035;
      camera.position.y += ((pointer.y * -0.1) - camera.position.y) * 0.035;
      camera.position.z += ((8.4 + scrollProgress * 1.25) - camera.position.z) * 0.04;
      camera.lookAt(world.position.x * 0.18, world.position.y * 0.15, 0);

      rings.forEach((ring, index) => {
        ring.rotation.z += delta * (index % 2 === 0 ? 0.028 : -0.022);
      });
      energyTubes[0].rotation.z += delta * 0.055;
      energyTubes[1].rotation.z -= delta * 0.042;
      energyMaterials[0].opacity = 0.72 + Math.sin(elapsed * 1.1) * 0.16;
      energyMaterials[1].opacity = 0.64 + Math.sin(elapsed * 0.85 + 1.4) * 0.14;

      nodeMeshes.forEach((mesh, index) => {
        const node = nodeData[index];
        const angle = elapsed * node.speed + node.phase;
        const yScale = [0.41, 0.42, 0.42, 0.41][node.ring];
        mesh.position.set(
          Math.cos(angle) * node.radius,
          Math.sin(angle) * node.radius * yScale,
          Math.sin(angle * 1.7 + node.phase) * 0.42,
        );
        const scale = mesh === hoveredNode ? 1.8 : 1;
        mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, scale, 0.12));
      });

      composer.render(delta);
      frameId = reducedMotion ? 0 : window.requestAnimationFrame(animate);
    };

    resize();
    handleScroll();
    canvas.style.cursor = reducedMotion ? "default" : "grab";
    if (!reducedMotion) {
      stage.addEventListener("pointermove", handlePointerMove, { passive: true });
      canvas.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    document.addEventListener("visibilitychange", handleVisibility);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      if (!reducedMotion) {
        stage.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      composer.dispose();
      renderer.dispose();
      delete stage.dataset.scene;
    };
  }, []);

  return (
    <div ref={stageRef} className="hero-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-stage__canvas" />
      <div className="hero-stage__fallback"><span /><span /><span /></div>
      <div className="hero-stage__vignette" />
      <div className="hero-stage__hud hero-stage__hud--top">
        <span>SCENE / 01</span><span>REAL-TIME WEBGL</span>
      </div>
      <div className="hero-stage__hud hero-stage__hud--bottom">
        <span>DRAG TO ORBIT</span><span ref={focusRef}>CLOUD CORE</span>
      </div>
      <div className="hero-node-label hero-node-label--aws"><i />AWS EDGE</div>
      <div className="hero-node-label hero-node-label--k8s"><i />KUBERNETES</div>
      <div className="hero-node-label hero-node-label--gitops"><i />GITOPS</div>
    </div>
  );
}
