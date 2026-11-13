import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function ThreeAuthBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f131a);
    scene.fog = new THREE.FogExp2(0x0f131a, 0.065);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight),
      0.1,
      50
    );
    camera.position.set(0, 0.5, 7.5);

    const hemi = new THREE.HemisphereLight(0x6b93d6, 0x2b1d12, 0.8);
    scene.add(hemi);

    const warmKey = new THREE.DirectionalLight(0xffd796, 2.2);
    warmKey.position.set(5, 5, 5);
    scene.add(warmKey);

    const coolRim = new THREE.DirectionalLight(0x3a64a8, 1.1);
    coolRim.position.set(-5, -3, -4);
    scene.add(coolRim);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd9b34a,
      roughness: 0.22,
      metalness: 0.94
    });
    const lapisMat = new THREE.MeshStandardMaterial({
      color: 0x1b365d,
      roughness: 0.35,
      metalness: 0.65
    });
    const garnetMat = new THREE.MeshStandardMaterial({
      color: 0x7f1d1d,
      roughness: 0.35,
      metalness: 0.45
    });

    // Composite Procedural Islamic Astrolabe & Nested Sacred Geometry
    const astrolabeGroup = new THREE.Group();
    astrolabeGroup.position.set(-1.6, 0.1, 0);

    const outerRingGeo = new THREE.TorusGeometry(2.3, 0.045, 16, 80);
    const outerRing = new THREE.Mesh(outerRingGeo, goldMat);
    astrolabeGroup.add(outerRing);

    const midRingGeo = new THREE.TorusGeometry(1.75, 0.032, 16, 64);
    const midRing = new THREE.Mesh(midRingGeo, lapisMat);
    midRing.rotation.x = 0.55;
    astrolabeGroup.add(midRing);

    const innerRingGeo = new THREE.TorusGeometry(1.22, 0.025, 14, 56);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMat);
    innerRing.rotation.y = 0.7;
    astrolabeGroup.add(innerRing);

    // 8-Pointed Octagram Core (2 rotated beveled frames)
    const starFrameGeo = new THREE.BoxGeometry(1.15, 1.15, 0.08);
    const starA = new THREE.Mesh(starFrameGeo, goldMat);
    const starB = new THREE.Mesh(starFrameGeo, garnetMat);
    starB.rotation.z = Math.PI / 4;
    astrolabeGroup.add(starA, starB);

    const coreSphereGeo = new THREE.OctahedronGeometry(0.36, 0);
    const coreSphere = new THREE.Mesh(coreSphereGeo, goldMat);
    astrolabeGroup.add(coreSphere);

    scene.add(astrolabeGroup);

    // Starfield / Luminous Dust Particles
    const starCount = 180;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xf4d58d,
      size: 0.045,
      transparent: true,
      opacity: 0.7
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || !gl.fenceSync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        outerRing.rotation.y += dt * 0.18;
        outerRing.rotation.x = Math.sin(elapsed * 0.35) * 0.25;
        midRing.rotation.z -= dt * 0.28;
        midRing.rotation.y += dt * 0.12;
        innerRing.rotation.x += dt * 0.35;
        starA.rotation.z += dt * 0.16;
        starB.rotation.z -= dt * 0.16;
        coreSphere.rotation.y += dt * 0.45;
        stars.rotation.y = elapsed * 0.015;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.5, 3, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.5 - pointer.y * 0.35, 3, dt);
      camera.lookAt(-0.4, 0, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    const handleResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      outerRingGeo.dispose();
      midRingGeo.dispose();
      innerRingGeo.dispose();
      starFrameGeo.dispose();
      coreSphereGeo.dispose();
      starsGeo.dispose();
      goldMat.dispose();
      lapisMat.dispose();
      garnetMat.dispose();
      starsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
