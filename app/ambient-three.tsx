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
  varying vec3 vLocalPosition;

  void main() {
    vec3 transformed = position;
    float scan = sin((position.y * 7.0) - (uTime * 1.15)) * 0.018;
    transformed += normal * scan;
    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = worldPosition.xyz;
    vLocalPosition = position;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const coreFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float facing = max(0.0, dot(viewDirection, normalize(vNormal)));
    float fresnel = pow(1.0 - facing, 2.8);
    float bands = smoothstep(0.78, 1.0, 0.5 + 0.5 * sin(vLocalPosition.y * 15.0 - uTime * 2.0));
    float vertical = smoothstep(-1.1, 1.1, vLocalPosition.y);
    vec3 base = mix(uColorA * 0.13, uColorB * 0.23, vertical);
    vec3 glow = mix(uColorA, uColorB, vertical) * (fresnel * 0.72 + bands * 0.14);
    gl_FragColor = vec4(base + glow, 0.96);
  }
`;

const meshVertexShader = `
  uniform float uTime;
  varying float vEnergy;

  void main() {
    vec3 transformed = position;
    float radius = length(position.xy);
    float pulse = sin(radius * 5.2 - uTime * 1.45) * exp(-radius * 0.48);
    float crossWave = sin(position.x * 2.1 + uTime * 0.34) * cos(position.y * 1.8 - uTime * 0.28);
    transformed.z += pulse * 0.18 + crossWave * 0.035;
    vEnergy = clamp(abs(pulse) + (1.0 - smoothstep(0.0, 2.8, radius)) * 0.7, 0.0, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const meshFragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vEnergy;

  void main() {
    vec3 color = mix(uColorA, uColorB, vEnergy);
    gl_FragColor = vec4(color, 0.18 + vEnergy * 0.5);
  }
`;

const dustVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;

  void main() {
    vec3 transformed = position;
    transformed.y += sin(uTime * 0.18 + aPhase) * 0.1;
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aSize * uPixelRatio * (24.0 / max(1.0, -viewPosition.z));
    vAlpha = 0.32 + 0.32 * sin(aPhase + uTime * 0.4);
  }
`;

const dustFragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float radius = distance(gl_PointCoord, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.05, 0.5, radius);
    gl_FragColor = vec4(uColor, alpha * vAlpha);
  }
`;

function makeDust(renderer: THREE.WebGLRenderer, count: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = THREE.MathUtils.randFloatSpread(12);
    positions[index * 3 + 1] = THREE.MathUtils.randFloat(-1.2, 5.5);
    positions[index * 3 + 2] = THREE.MathUtils.randFloatSpread(9);
    sizes[index] = THREE.MathUtils.randFloat(0.45, 1.65);
    phases[index] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uColor: { value: new THREE.Color(0x8fe9df) },
    },
    vertexShader: dustVertexShader,
    fragmentShader: dustFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });

  return { points: new THREE.Points(geometry, material), material };
}

function makeRoute(start: THREE.Vector3, end: THREE.Vector3, color: number) {
  const midpoint = start.clone().lerp(end, 0.5);
  midpoint.y += 0.28 + start.distanceTo(end) * 0.07;
  const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.36,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  return { curve, line: new THREE.Line(geometry, material) };
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
    renderer.setClearColor(0x020606, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020606);
    scene.fog = new THREE.FogExp2(0x020606, 0.07);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(5.6, 4.7, 7.4);

    const world = new THREE.Group();
    world.rotation.y = -0.12;
    scene.add(world);

    scene.add(new THREE.HemisphereLight(0x9de8df, 0x04100f, 1.25));
    const keyLight = new THREE.DirectionalLight(0xd8fff9, 2.3);
    keyLight.position.set(3.5, 6, 5);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x5cebdd, 18, 10, 2);
    cyanLight.position.set(0, 1.2, 0);
    scene.add(cyanLight);

    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x07100f,
      metalness: 0.32,
      roughness: 0.72,
    });
    const platform = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.24, 4.8), baseMaterial);
    platform.position.y = -0.62;
    world.add(platform);

    const underlay = new THREE.Mesh(
      new THREE.BoxGeometry(6.75, 0.13, 4.95),
      new THREE.MeshBasicMaterial({ color: 0x030706 }),
    );
    underlay.position.y = -0.81;
    world.add(underlay);

    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(6.62, 0.25, 4.82)),
      new THREE.LineBasicMaterial({ color: 0x28564f, transparent: true, opacity: 0.5 }),
    );
    edge.position.y = -0.62;
    world.add(edge);

    const grid = new THREE.GridHelper(6.3, 18, 0x2b766d, 0x183932);
    grid.scale.z = 0.74;
    grid.position.y = -0.485;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.18;
    });
    world.add(grid);

    const meshMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(0x16423d) },
        uColorB: { value: new THREE.Color(0x82fff1) },
      },
      vertexShader: meshVertexShader,
      fragmentShader: meshFragmentShader,
      wireframe: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    const diagnosticMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.7, 4, 32, 24), meshMaterial);
    diagnosticMesh.rotation.x = -Math.PI / 2;
    diagnosticMesh.position.y = -0.47;
    world.add(diagnosticMesh);

    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(0x55eadc) },
        uColorB: { value: new THREE.Color(0xdbad64) },
      },
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      transparent: true,
      toneMapped: false,
    });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.78, 2.15, 6, 12), coreMaterial);
    core.position.y = 0.6;
    world.add(core);

    const innerCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.29, 0.4, 1.76, 6),
      new THREE.MeshBasicMaterial({
        color: 0x79fff1,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    innerCore.position.y = 0.55;
    world.add(innerCore);

    const coreRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.03, 0.018, 5, 96),
      new THREE.MeshBasicMaterial({
        color: 0x67f4e6,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    coreRing.rotation.x = Math.PI / 2;
    coreRing.position.y = -0.28;
    world.add(coreRing);

    const nodeDefinitions = [
      { label: "AWS EDGE", position: [-2.55, -0.05, -1.5], color: 0x67f4e6 },
      { label: "KUBERNETES", position: [2.45, 0.05, -1.35], color: 0xf0c078 },
      { label: "GITOPS", position: [-2.2, 0.12, 1.45], color: 0x67f4e6 },
      { label: "OBSERVABILITY", position: [2.58, -0.08, 1.38], color: 0x9d8dff },
      { label: "TERRAFORM", position: [-1.25, 0.36, -1.95], color: 0x9d8dff },
      { label: "CI/CD", position: [1.15, 0.28, -1.95], color: 0x67f4e6 },
      { label: "SECURITY", position: [-2.8, 0.25, 0.1], color: 0xf0c078 },
      { label: "RUNTIME", position: [2.85, 0.3, 0.05], color: 0x67f4e6 },
    ] as const;

    const nodeGeometry = new THREE.BoxGeometry(0.34, 0.34, 0.34);
    const nodeMeshes: THREE.Mesh[] = [];
    const routes: Array<{ curve: THREE.QuadraticBezierCurve3; pulse: THREE.Mesh }> = [];
    nodeDefinitions.forEach((definition, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: index % 3 === 0 ? 0x101716 : 0x09100f,
        emissive: definition.color,
        emissiveIntensity: index < 4 ? 0.8 : 0.32,
        metalness: 0.35,
        roughness: 0.58,
      });
      const node = new THREE.Mesh(nodeGeometry, material);
      node.position.set(definition.position[0], definition.position[1], definition.position[2]);
      node.userData.label = definition.label;
      node.userData.baseY = definition.position[1];
      node.userData.phase = index * 0.75;
      world.add(node);
      nodeMeshes.push(node);

      const wire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.5, 0.5, 0.5)),
        new THREE.LineBasicMaterial({ color: definition.color, transparent: true, opacity: 0.24 }),
      );
      node.add(wire);

      const endpoint = node.position.clone();
      const route = makeRoute(new THREE.Vector3(0, -0.12, 0), endpoint, definition.color);
      world.add(route.line);

      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 10, 10),
        new THREE.MeshBasicMaterial({ color: definition.color, toneMapped: false }),
      );
      world.add(pulse);
      routes.push({ curve: route.curve, pulse });
    });

    const dust = makeDust(renderer, lowEnd ? 180 : window.innerWidth < 720 ? 260 : 520);
    scene.add(dust.points);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.44, 0.28, 0.42);
    composer.addPass(bloomPass);

    const startTime = performance.now();
    let previousTime = startTime;
    const pointer = new THREE.Vector2();
    const pointerTarget = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredNode: THREE.Mesh | null = null;
    let lastRaycast = 0;
    let frameId = 0;
    let visible = !document.hidden;
    let inViewport = true;
    let dragging = false;
    let lastPointerX = 0;
    let dragRotation = 0;
    let scrollProgress = 0;
    let scrollTarget = 0;

    const renderStatic = () => composer.render(0);
    const resize = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;
      const pixelRatio = Math.min(window.devicePixelRatio, lowEnd ? 1 : 1.5);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      composer.setPixelRatio(pixelRatio);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      dust.material.uniforms.uPixelRatio.value = pixelRatio;
      bloomPass.enabled = width >= 720 && !lowEnd;
      world.position.set(width > 980 ? 1.1 : 0, width < 680 ? -1.05 : -0.2, 0);
      world.scale.setScalar(width < 680 ? 0.76 : width < 980 ? 0.9 : 1.08);
      camera.position.set(width < 680 ? 5.9 : 5.6, width < 680 ? 5.4 : 4.7, width < 680 ? 8.7 : 7.4);
      camera.lookAt(world.position.x * 0.22, world.position.y, 0);
      if (reducedMotion) renderStatic();
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      );
      if (dragging) {
        dragRotation += (event.clientX - lastPointerX) * 0.0045;
        lastPointerX = event.clientX;
      }
      if (performance.now() - lastRaycast < 48) return;
      lastRaycast = performance.now();
      raycaster.setFromCamera(pointerTarget, camera);
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0]?.object as THREE.Mesh | undefined;
      hoveredNode = hit ?? null;
      canvas.style.cursor = hoveredNode ? "pointer" : dragging ? "grabbing" : "grab";
      if (focusRef.current) focusRef.current.textContent = hoveredNode?.userData.label ?? "LOGIC CORE";
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      lastPointerX = event.clientX;
      canvas.setPointerCapture?.(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const handlePointerUp = (event: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = hoveredNode ? "pointer" : "grab";
    };
    const handleScroll = () => {
      const bounds = stage.getBoundingClientRect();
      scrollTarget = THREE.MathUtils.clamp(-bounds.top / Math.max(1, bounds.height), 0, 1);
    };

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
      meshMaterial.uniforms.uTime.value = elapsed;
      dust.material.uniforms.uTime.value = elapsed;
      core.rotation.y = elapsed * 0.08;
      innerCore.rotation.y = -elapsed * 0.11;
      coreRing.rotation.z += delta * 0.18;
      dust.points.rotation.y = elapsed * 0.006;

      const baseScale = stage.clientWidth < 680 ? 0.76 : stage.clientWidth < 980 ? 0.9 : 1.08;
      const targetScale = baseScale * (1 - scrollProgress * 0.08);
      world.scale.setScalar(THREE.MathUtils.lerp(world.scale.x, targetScale, 0.06));
      world.rotation.y += ((-0.12 + pointer.x * 0.1 + dragRotation + scrollProgress * 0.28) - world.rotation.y) * 0.045;
      world.rotation.x += ((pointer.y * -0.035) - world.rotation.x) * 0.04;

      nodeMeshes.forEach((node) => {
        node.position.y = node.userData.baseY + Math.sin(elapsed * 0.72 + node.userData.phase) * 0.07;
        const target = node === hoveredNode ? 1.55 : 1;
        node.scale.setScalar(THREE.MathUtils.lerp(node.scale.x, target, 0.14));
      });
      routes.forEach((route, index) => {
        route.pulse.position.copy(route.curve.getPoint((elapsed * (0.1 + index * 0.006) + index * 0.13) % 1));
      });

      camera.position.x += ((stage.clientWidth < 680 ? 5.9 : 5.6) + pointer.x * -0.14 - camera.position.x) * 0.035;
      camera.position.y += ((stage.clientWidth < 680 ? 5.4 : 4.7) + pointer.y * -0.08 - camera.position.y) * 0.035;
      camera.position.z += ((stage.clientWidth < 680 ? 8.7 : 7.4) + scrollProgress * 0.7 - camera.position.z) * 0.035;
      camera.lookAt(world.position.x * 0.22, world.position.y + 0.05, 0);

      composer.render(delta);
      frameId = reducedMotion ? 0 : window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport && visible && !frameId) animate();
    }, { rootMargin: "18%" });
    intersectionObserver.observe(stage);
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && inViewport && !frameId) animate();
    };

    resize();
    handleScroll();
    canvas.style.cursor = reducedMotion ? "default" : "grab";
    if (!reducedMotion) {
      stage.addEventListener("pointermove", updatePointer, { passive: true });
      canvas.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    document.addEventListener("visibilitychange", handleVisibility);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      if (!reducedMotion) {
        stage.removeEventListener("pointermove", updatePointer);
        canvas.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
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
      <div className="hero-stage__fallback"><span /><span /><span /><span /></div>
      <div className="hero-stage__vignette" />
      <div className="hero-stage__hud hero-stage__hud--top">
        <span>THREEUI / LOGIC CORE</span><span>ISOMETRIC INFRASTRUCTURE</span>
      </div>
      <div className="hero-stage__hud hero-stage__hud--bottom">
        <span>DRAG TO INSPECT</span><span ref={focusRef}>LOGIC CORE</span>
      </div>
      <div className="hero-node-label hero-node-label--aws"><i />AWS EDGE</div>
      <div className="hero-node-label hero-node-label--k8s"><i />KUBERNETES</div>
      <div className="hero-node-label hero-node-label--gitops"><i />GITOPS</div>
    </div>
  );
}
