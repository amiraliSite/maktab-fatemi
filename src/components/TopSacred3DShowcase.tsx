import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';
import { scrollToSection } from '../utils/formatPersian';
import heroMedinaFallback from '../assets/images/hero_medina_courtyard_1794535526734.jpg';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_STRINGS } from '../i18n/uiStrings';

type SanctuaryMood = 'radiant' | 'garnet' | 'lapis';

const MOOD_PRESETS: Record<
  SanctuaryMood,
  {
    bgHex: number;
    rimHex: number;
    coreHex: number;
    particleHex: number;
  }
> = {
  radiant: {
    bgHex: 0x0c0e14,
    rimHex: 0x3b67a8,
    coreHex: 0xe6c260,
    particleHex: 0xffe08a
  },
  garnet: {
    bgHex: 0x130a0c,
    rimHex: 0x991b1b,
    coreHex: 0xd4af37,
    particleHex: 0xf7b28b
  },
  lapis: {
    bgHex: 0x09111d,
    rimHex: 0x2563eb,
    coreHex: 0xe6c260,
    particleHex: 0x93c5fd
  }
};

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

export function TopSacred3DShowcase() {
  const { locale } = useLanguage();
  const t = UI_STRINGS[locale];
  const mountRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<SanctuaryMood>('radiant');
  const [webglFailed, setWebglFailed] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const coreMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const motesMatRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    const cfg = MOOD_PRESETS[mood];
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(cfg.bgHex);
      sceneRef.current.fog = new THREE.FogExp2(cfg.bgHex, 0.055);
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.setHex(cfg.rimHex);
    }
    if (coreMatRef.current) {
      coreMatRef.current.color.setHex(cfg.coreHex);
    }
    if (motesMatRef.current) {
      motesMatRef.current.color.setHex(cfg.particleHex);
    }
  }, [mood]);

  useEffect(() => {
    const container = mountRef.current;
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
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || 1200, container.clientHeight || 420);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    const onContextRestored = () => {
      setWebglFailed(false);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    const initial = MOOD_PRESETS.radiant;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(initial.bgHex);
    scene.fog = new THREE.FogExp2(initial.bgHex, 0.055);
    sceneRef.current = scene;

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(
      42,
      (container.clientWidth || 1200) / (container.clientHeight || 420),
      0.1,
      60
    );
    camera.position.set(0, 0.25, 8.2);

    const hemi = new THREE.HemisphereLight(0x9bbcf2, 0x2a1c12, 0.75);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffdf9e, 2.3);
    keyLight.position.set(5, 5.5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(initial.rimHex, 1.35);
    rimLight.position.set(-5, -2.5, -4);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const coreGlowLight = new THREE.PointLight(0xffcb66, 2.0, 11, 1.5);
    coreGlowLight.position.set(0, 0, 2.2);
    scene.add(coreGlowLight);

    const disposables: Array<{ dispose: () => void }> = [];

    const goldMat = new THREE.MeshStandardMaterial({
      color: initial.coreHex,
      roughness: 0.2,
      metalness: 0.94,
      emissive: 0x3b2608,
      emissiveIntensity: 0.28
    });
    coreMatRef.current = goldMat;

    const lapisMat = new THREE.MeshStandardMaterial({
      color: 0x1b365d,
      roughness: 0.34,
      metalness: 0.7
    });

    const garnetMat = new THREE.MeshStandardMaterial({
      color: 0x7f1d1d,
      roughness: 0.32,
      metalness: 0.5
    });
    disposables.push(goldMat, lapisMat, garnetMat);

    // 3D Composite Sacred Shamseh & Nested Celestial Rings
    const crestGroup = new THREE.Group();
    crestGroup.position.set(0, 0.05, -0.5);

    const outerTorusGeo = new THREE.TorusGeometry(2.85, 0.036, 16, 96);
    const outerTorus = new THREE.Mesh(outerTorusGeo, goldMat);
    crestGroup.add(outerTorus);

    const secondTorusGeo = new THREE.TorusGeometry(2.3, 0.028, 16, 84);
    const secondTorus = new THREE.Mesh(secondTorusGeo, lapisMat);
    secondTorus.rotation.x = 0.42;
    crestGroup.add(secondTorus);

    const thirdTorusGeo = new THREE.TorusGeometry(1.72, 0.022, 14, 72);
    const thirdTorus = new THREE.Mesh(thirdTorusGeo, goldMat);
    thirdTorus.rotation.y = 0.65;
    crestGroup.add(thirdTorus);

    // Dual 8-pointed Octagram Star Lattice
    const frameGeo = new THREE.BoxGeometry(1.75, 1.75, 0.055);
    const frameA = new THREE.Mesh(frameGeo, goldMat);
    const frameB = new THREE.Mesh(frameGeo, garnetMat);
    frameB.rotation.z = Math.PI / 4;
    crestGroup.add(frameA, frameB);

    // Orbiting Golden Nodes around Outer Ring
    const pearlGeo = new THREE.OctahedronGeometry(0.095, 0);
    const pearlsGroup = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const pearl = new THREE.Mesh(pearlGeo, goldMat);
      pearl.position.set(Math.cos(angle) * 2.85, Math.sin(angle) * 2.85, 0);
      pearlsGroup.add(pearl);
    }
    crestGroup.add(pearlsGroup);

    // Side Architectural Orbiting Rings flanking on wide screens
    const sideRingGeo = new THREE.TorusGeometry(1.05, 0.022, 12, 48);
    const leftSideRing = new THREE.Mesh(sideRingGeo, goldMat);
    leftSideRing.position.set(-4.6, 0.1, -1.5);
    const rightSideRing = new THREE.Mesh(sideRingGeo, lapisMat);
    rightSideRing.position.set(4.6, -0.1, -1.5);
    scene.add(leftSideRing, rightSideRing);

    scene.add(crestGroup);
    disposables.push(outerTorusGeo, secondTorusGeo, thirdTorusGeo, frameGeo, pearlGeo, sideRingGeo);

    // Luminous Golden Dust Motes
    const moteCount = 210;
    const motePositions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePositions[i * 3] = (Math.random() - 0.5) * 16;
      motePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      motePositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    const motesGeo = new THREE.BufferGeometry();
    motesGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
    const motesMat = new THREE.PointsMaterial({
      color: initial.particleHex,
      size: 0.048,
      transparent: true,
      opacity: 0.78
    });
    motesMatRef.current = motesMat;
    const motes = new THREE.Points(motesGeo, motesMat);
    scene.add(motes);
    disposables.push(motesGeo, motesMat);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

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
        crestGroup.rotation.y = THREE.MathUtils.damp(
          crestGroup.rotation.y,
          pointer.x * 0.28 + Math.sin(elapsed * 0.35) * 0.14,
          4,
          dt
        );
        crestGroup.rotation.x = THREE.MathUtils.damp(
          crestGroup.rotation.x,
          -pointer.y * 0.16,
          4,
          dt
        );
        outerTorus.rotation.z += dt * 0.12;
        secondTorus.rotation.y -= dt * 0.22;
        thirdTorus.rotation.x += dt * 0.28;
        frameA.rotation.z += dt * 0.14;
        frameB.rotation.z -= dt * 0.14;
        pearlsGroup.rotation.z -= dt * 0.18;

        leftSideRing.rotation.x += dt * 0.25;
        leftSideRing.rotation.y += dt * 0.18;
        rightSideRing.rotation.x -= dt * 0.22;
        rightSideRing.rotation.y -= dt * 0.16;

        motes.rotation.y = elapsed * 0.025;
        coreGlowLight.intensity = 1.85 + Math.sin(elapsed * 1.8) * 0.25;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.45, 3.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.25 - pointer.y * 0.28, 3.5, dt);
      camera.lookAt(0, 0, 0);

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
      const w = container.clientWidth || 1200;
      const h = container.clientHeight || 420;
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
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      for (const item of disposables) {
        item.dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      aria-label={t.top3d.headline}
      className="relative w-full overflow-hidden border-b border-[#D4AF37]/30 bg-[#0C0E14] text-[#FBF9F5]"
    >
      {/* 3D WebGL Canvas Layer or Graceful Static Fallback */}
      <div className="relative min-h-[340px] sm:min-h-[390px] lg:min-h-[430px] flex items-center justify-center">
        {webglFailed ? (
          <img
            src={heroMedinaFallback}
            alt="Medina courtyard sanctuary"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          />
        ) : (
          <div
            ref={mountRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        )}

        {/* Measured Scrim for Guaranteed 4.5:1+ Legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0C0E14]/55 via-[#0C0E14]/35 to-[#0C0E14]/85 pointer-events-none"
        />

        {/* Semantic Illuminated DOM Content Centered Over the 3D Crest */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-center flex flex-col items-center">
          <p className="text-xs sm:text-sm font-medium text-[#E6C260] mb-3">{t.top3d.kicker}</p>

          <h2
            className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.35] radiant-gold-text mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.top3d.headline}
          </h2>

          <p className="text-sm sm:text-lg text-[#EAE3D5] leading-[1.85] max-w-3xl mb-7">
            {t.top3d.subtitle}
          </p>

          {/* Interactive 3D Lighting & Section Navigation Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#161922]/85 border border-[#D4AF37]/30">
              {(Object.keys(MOOD_PRESETS) as SanctuaryMood[]).map((key) => {
                const active = mood === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMood(key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#D4AF37] text-[#12100E] font-semibold'
                        : 'text-[#DED6C8] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>{t.top3d.moods[key]}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('martyrdom')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#7F1D1D] text-[#FBF9F5] border border-[#D4AF37]/40 hover:bg-[#991B1B] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              <Compass className="w-4 h-4 text-[#E6C260]" />
              <span>{t.top3d.enterButton}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
