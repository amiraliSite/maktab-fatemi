import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, RotateCcw, BookOpen } from 'lucide-react';
import heroMedinaFallback from '../assets/images/hero_medina_courtyard_1794535526734.jpg';
import { AppLocale, useLanguage } from '../i18n/LanguageContext';

type CameraPreset = 'pavilion' | 'codex' | 'top';
type BindingFinish = 'garnet' | 'lapis' | 'chestnut';

const BINDING_LABELS: Record<AppLocale, Record<BindingFinish, string>> = {
  fa: {
    garnet: 'زرکوب عقیق (فاطمی)',
    lapis: 'لاجورد اصفهان (علوی)',
    chestnut: 'چرم کهن عتیق'
  },
  ar: {
    garnet: 'عقيق مذهّب (فاطمي)',
    lapis: 'لازورد أصبهان (علوي)',
    chestnut: 'جلد أثري عتيق'
  },
  en: {
    garnet: 'Fatemi Garnet Gold',
    lapis: 'Alawi Lapis Blue',
    chestnut: 'Antique Chestnut'
  }
};

const CAMERA_LABELS: Record<AppLocale, Record<CameraPreset, string>> = {
  fa: {
    pavilion: 'نمای رواق',
    codex: 'نمای کتاب خطی',
    top: 'نمای بالا و نقوش'
  },
  ar: {
    pavilion: 'منظر الرواق',
    codex: 'منظر المخطوطة',
    top: 'المنظر العلوي'
  },
  en: {
    pavilion: 'Sanctuary',
    codex: 'Codex Close-Up',
    top: 'Geometric Top'
  }
};

const BINDING_PALETTES: Record<
  BindingFinish,
  { label: string; color: number; roughness: number; swatch: string }
> = {
  garnet: {
    label: 'زرکوب عقیق (فاطمی)',
    color: 0x6b1d24,
    roughness: 0.48,
    swatch: '#6B1D24'
  },
  lapis: {
    label: 'لاجورد اصفهان (علوی)',
    color: 0x1b365d,
    roughness: 0.44,
    swatch: '#1B365D'
  },
  chestnut: {
    label: 'چرم کهن عتیق',
    color: 0x5c3a21,
    roughness: 0.62,
    swatch: '#5C3A21'
  }
};

const CAMERA_TARGETS: Record<
  CameraPreset,
  { label: string; pos: [number, number, number]; look: [number, number, number] }
> = {
  pavilion: {
    label: 'نمای رواق',
    pos: [4.2, 2.7, 5.2],
    look: [0, 1.15, 0]
  },
  codex: {
    label: 'نمای کتاب خطی',
    pos: [1.75, 2.55, 2.25],
    look: [0, 1.48, 0]
  },
  top: {
    label: 'نمای بالا و نقوش',
    pos: [0.3, 4.4, 2.1],
    look: [0, 1.35, 0]
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

function createMedallionTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 10;
    ctx.strokeRect(28, 28, 456, 456);
    ctx.lineWidth = 3;
    ctx.strokeRect(46, 46, 420, 420);

    const corners = [
      [58, 58],
      [454, 58],
      [58, 454],
      [454, 454]
    ];
    ctx.fillStyle = '#D4AF37';
    for (const [cx, cy] of corners) {
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.translate(256, 256);
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = '#C99E32';
      ctx.lineWidth = 4;
      ctx.strokeRect(-72, -72, 144, 144);
    }
    ctx.beginPath();
    ctx.arc(0, 0, 54, 0, Math.PI * 2);
    ctx.fillStyle = '#D4AF37';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#3B2314';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#E6C260';
    ctx.fill();
    ctx.restore();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createIlluminatedPageTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Aged cream parchment
    ctx.fillStyle = '#F5EBD6';
    ctx.fillRect(0, 0, 512, 680);

    // Lapis & Gold Tazhib illumination border
    ctx.strokeStyle = '#1B365D';
    ctx.lineWidth = 14;
    ctx.strokeRect(24, 24, 464, 632);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 5;
    ctx.strokeRect(36, 36, 440, 608);

    // Top illuminated header cartouche (Sarlawh)
    ctx.fillStyle = '#1B365D';
    ctx.fillRect(58, 58, 396, 76);
    ctx.strokeStyle = '#E6C260';
    ctx.lineWidth = 3;
    ctx.strokeRect(64, 64, 384, 64);

    // Gold medallion inside cartouche
    ctx.beginPath();
    ctx.ellipse(256, 96, 95, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#D4AF37';
    ctx.fill();

    // Stylized calligraphic text strokes
    ctx.strokeStyle = '#2C221A';
    ctx.lineCap = 'round';
    for (let row = 0; row < 12; row++) {
      const y = 176 + row * 36;
      ctx.lineWidth = row === 0 ? 4.5 : 3;
      ctx.beginPath();
      const startX = 430;
      const endX = row === 11 ? 210 : 82;
      ctx.moveTo(startX, y);
      for (let x = startX - 24; x >= endX; x -= 24) {
        const wave = Math.sin(x * 0.14 + row * 1.3) * 4;
        ctx.lineTo(x, y + wave);
      }
      ctx.stroke();

      // Subtle gold rosette verse separators
      if (row % 3 === 1) {
        ctx.beginPath();
        ctx.arc(endX + 18, y - 2, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#C99E32';
        ctx.fill();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createFloorTileTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#2A231D';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#3C3229';
    ctx.lineWidth = 4;
    for (let i = 0; i <= 512; i += 128) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    ctx.strokeStyle = '#4A3D31';
    ctx.lineWidth = 2;
    for (let x = 64; x < 512; x += 128) {
      for (let y = 64; y < 512; y += 128) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-18, -18, 36, 36);
        ctx.restore();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function ThreeSanctuaryCanvas() {
  const { locale } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const [preset, setPreset] = useState<CameraPreset>('pavilion');
  const [finish, setFinish] = useState<BindingFinish>('garnet');
  const [autoRotate, setAutoRotate] = useState(true);
  const [codexOpen, setCodexOpen] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  const presetRef = useRef<CameraPreset>('pavilion');
  const transitionActiveRef = useRef(false);
  const autoRotateRef = useRef(true);
  const codexOpenRef = useRef(false);
  const coverMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    presetRef.current = preset;
    transitionActiveRef.current = true;
  }, [preset]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    codexOpenRef.current = codexOpen;
    if (codexOpen) {
      presetRef.current = 'codex';
      setPreset('codex');
      transitionActiveRef.current = true;
    }
  }, [codexOpen]);

  useEffect(() => {
    if (coverMatRef.current) {
      const cfg = BINDING_PALETTES[finish];
      coverMatRef.current.color.setHex(cfg.color);
      coverMatRef.current.roughness = cfg.roughness;
    }
  }, [finish]);

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
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || 640, container.clientHeight || 460);

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

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x16120e);
    scene.fog = new THREE.FogExp2(0x16120e, 0.058);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(
      42,
      (container.clientWidth || 640) / (container.clientHeight || 460),
      0.1,
      60
    );
    camera.position.set(...CAMERA_TARGETS.pavilion.pos);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.85;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minPolarAngle = 0.25;
    controls.target.set(...CAMERA_TARGETS.pavilion.look);
    controls.addEventListener('start', () => {
      transitionActiveRef.current = false;
    });

    const hemiLight = new THREE.HemisphereLight(0xa3b8d9, 0x3b2a1c, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffdfb0, 2.2);
    keyLight.position.set(4.5, 6.5, 4.0);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4b74b8, 0.9);
    rimLight.position.set(-4.5, 3.5, -4.5);
    scene.add(rimLight);

    const lanternLight = new THREE.PointLight(0xffaa44, 1.5, 9, 1.6);
    lanternLight.position.set(0, 3.2, 0.4);
    scene.add(lanternLight);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const disposables: Array<{ dispose: () => void }> = [];

    // 1. Tiled Stone Courtyard Floor
    const floorTex = createFloorTileTexture(maxAniso);
    disposables.push(floorTex);
    const floorGeo = new THREE.CircleGeometry(18, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.84,
      metalness: 0.08
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    disposables.push(floorGeo, floorMat);

    // 2. Octagonal Marble & Brass Pedestal
    const pedestalGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xd8cfc0,
      roughness: 0.68,
      metalness: 0.05
    });
    const darkStoneMat = new THREE.MeshStandardMaterial({
      color: 0x322b25,
      roughness: 0.55,
      metalness: 0.15
    });
    const goldBrassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.92
    });
    disposables.push(stoneMat, darkStoneMat, goldBrassMat);

    const basePlinthGeo = new THREE.CylinderGeometry(1.45, 1.6, 0.22, 8);
    const basePlinth = new THREE.Mesh(basePlinthGeo, darkStoneMat);
    basePlinth.position.y = 0.11;
    basePlinth.receiveShadow = true;
    basePlinth.castShadow = true;
    pedestalGroup.add(basePlinth);

    const midTierGeo = new THREE.CylinderGeometry(1.05, 1.22, 0.65, 8);
    const midTier = new THREE.Mesh(midTierGeo, stoneMat);
    midTier.position.y = 0.54;
    midTier.castShadow = true;
    midTier.receiveShadow = true;
    pedestalGroup.add(midTier);

    const brassCollarGeo = new THREE.TorusGeometry(1.02, 0.032, 12, 32);
    const brassCollar = new THREE.Mesh(brassCollarGeo, goldBrassMat);
    brassCollar.rotation.x = Math.PI / 2;
    brassCollar.position.y = 0.88;
    pedestalGroup.add(brassCollar);

    const topCapGeo = new THREE.CylinderGeometry(1.12, 1.04, 0.12, 8);
    const topCap = new THREE.Mesh(topCapGeo, darkStoneMat);
    topCap.position.y = 0.94;
    topCap.receiveShadow = true;
    topCap.castShadow = true;
    pedestalGroup.add(topCap);

    scene.add(pedestalGroup);
    disposables.push(basePlinthGeo, midTierGeo, brassCollarGeo, topCapGeo);

    // 3. Carved Walnut & Brass Rehal
    const rehalGroup = new THREE.Group();
    rehalGroup.position.y = 1.0;
    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x452b18,
      roughness: 0.58,
      metalness: 0.08
    });
    disposables.push(walnutMat);

    const wingGeo = new THREE.BoxGeometry(0.92, 0.055, 0.68);
    const wingA = new THREE.Mesh(wingGeo, walnutMat);
    wingA.rotation.z = 0.42;
    wingA.position.set(0.24, 0.24, 0);
    wingA.castShadow = true;
    rehalGroup.add(wingA);

    const wingB = new THREE.Mesh(wingGeo, walnutMat);
    wingB.rotation.z = -0.42;
    wingB.position.set(-0.24, 0.24, 0);
    wingB.castShadow = true;
    rehalGroup.add(wingB);

    const pinGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 12);
    const pin = new THREE.Mesh(pinGeo, goldBrassMat);
    pin.rotation.x = Math.PI / 2;
    pin.position.y = 0.14;
    rehalGroup.add(pin);

    scene.add(rehalGroup);
    disposables.push(wingGeo, pinGeo);

    // 4. Composite Hinged Historical Illuminated Codex
    const codexGroup = new THREE.Group();
    codexGroup.position.set(0, 1.48, 0);
    codexGroup.rotation.set(0.22, 0.35, -0.08);

    const medallionTex = createMedallionTexture(maxAniso);
    const pageTex = createIlluminatedPageTexture(maxAniso);
    disposables.push(medallionTex, pageTex);

    const coverMat = new THREE.MeshStandardMaterial({
      color: BINDING_PALETTES.garnet.color,
      roughness: BINDING_PALETTES.garnet.roughness,
      metalness: 0.12,
      map: medallionTex
    });
    coverMatRef.current = coverMat;

    const spineMat = new THREE.MeshStandardMaterial({
      color: 0x3b1518,
      roughness: 0.52,
      metalness: 0.14
    });

    const parchmentMat = new THREE.MeshStandardMaterial({
      color: 0xf4ead5,
      roughness: 0.86,
      metalness: 0.02
    });

    const illuminatedTopMat = new THREE.MeshStandardMaterial({
      map: pageTex,
      roughness: 0.75,
      metalness: 0.05,
      emissive: 0x3b2609,
      emissiveIntensity: 0.25
    });
    disposables.push(coverMat, spineMat, parchmentMat, illuminatedTopMat);

    // Lower board & page block
    const boardGeo = new THREE.BoxGeometry(0.96, 0.04, 1.32);
    const bottomBoard = new THREE.Mesh(boardGeo, coverMat);
    bottomBoard.position.y = -0.13;
    bottomBoard.castShadow = true;
    codexGroup.add(bottomBoard);

    const spineGeo = new THREE.BoxGeometry(0.08, 0.3, 1.32);
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.position.set(-0.46, 0, 0);
    spine.castShadow = true;
    codexGroup.add(spine);

    const pagesGeo = new THREE.BoxGeometry(0.88, 0.22, 1.24);
    const pages = new THREE.Mesh(pagesGeo, parchmentMat);
    pages.position.set(0.01, 0, 0);
    codexGroup.add(pages);

    // Illuminated page surface revealed when cover opens
    const innerPageGeo = new THREE.PlaneGeometry(0.86, 1.22);
    const rightIlluminatedPage = new THREE.Mesh(innerPageGeo, illuminatedTopMat);
    rightIlluminatedPage.rotation.x = -Math.PI / 2;
    rightIlluminatedPage.position.set(0.01, 0.114, 0);
    codexGroup.add(rightIlluminatedPage);

    // Hinged Top Cover Pivot (at spine edge x = -0.45, y = 0.13)
    const topCoverPivot = new THREE.Group();
    topCoverPivot.position.set(-0.45, 0.13, 0);

    const topBoard = new THREE.Mesh(boardGeo, coverMat);
    topBoard.position.set(0.45, 0, 0);
    topBoard.castShadow = true;
    topCoverPivot.add(topBoard);

    // Inner side of top cover also holds an illuminated facing page!
    const leftIlluminatedPage = new THREE.Mesh(innerPageGeo, illuminatedTopMat);
    leftIlluminatedPage.rotation.x = Math.PI / 2;
    leftIlluminatedPage.position.set(0.45, -0.022, 0);
    topCoverPivot.add(leftIlluminatedPage);

    const claspGeo = new THREE.BoxGeometry(0.11, 0.055, 0.11);
    const claspOffsets: Array<[number, number]> = [
      [0.89, 0.62],
      [0.89, -0.62]
    ];
    for (const [cx, cz] of claspOffsets) {
      const claspTop = new THREE.Mesh(claspGeo, goldBrassMat);
      claspTop.position.set(cx, 0.005, cz);
      topCoverPivot.add(claspTop);
    }

    codexGroup.add(topCoverPivot);

    // Floating golden halo ring around codex
    const haloGeo = new THREE.TorusGeometry(0.98, 0.012, 10, 64);
    const haloMesh = new THREE.Mesh(haloGeo, goldBrassMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.y = -0.02;
    codexGroup.add(haloMesh);

    scene.add(codexGroup);
    disposables.push(boardGeo, spineGeo, pagesGeo, innerPageGeo, claspGeo, haloGeo);

    // 5. Four Architectural Columns framing the Courtyard
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x6f5b47,
      roughness: 0.78,
      metalness: 0.04
    });
    const colShaftGeo = new THREE.CylinderGeometry(0.24, 0.28, 3.8, 12);
    const colBaseGeo = new THREE.BoxGeometry(0.75, 0.24, 0.75);
    const colCapGeo = new THREE.CylinderGeometry(0.42, 0.24, 0.35, 8);
    disposables.push(colMat, colShaftGeo, colBaseGeo, colCapGeo);

    const colCoords: Array<[number, number]> = [
      [-3.4, -3.2],
      [3.4, -3.2],
      [-3.4, 3.2],
      [3.4, 3.2]
    ];
    for (const [cx, cz] of colCoords) {
      const colGroup = new THREE.Group();
      colGroup.position.set(cx, 0, cz);
      const cBase = new THREE.Mesh(colBaseGeo, darkStoneMat);
      cBase.position.y = 0.12;
      cBase.receiveShadow = true;
      colGroup.add(cBase);

      const cShaft = new THREE.Mesh(colShaftGeo, colMat);
      cShaft.position.y = 2.02;
      cShaft.castShadow = !isSoftwareGl;
      colGroup.add(cShaft);

      const cCap = new THREE.Mesh(colCapGeo, stoneMat);
      cCap.position.y = 4.05;
      colGroup.add(cCap);

      scene.add(colGroup);
    }

    // 6. Floating Warm Light Dust Motes
    const moteCount = 90;
    const motePositions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePositions[i * 3] = (Math.random() - 0.5) * 6.5;
      motePositions[i * 3 + 1] = 0.5 + Math.random() * 3.4;
      motePositions[i * 3 + 2] = (Math.random() - 0.5) * 6.5;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
    const moteMat = new THREE.PointsMaterial({
      color: 0xffd27d,
      size: 0.045,
      transparent: true,
      opacity: 0.72
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);
    disposables.push(moteGeo, moteMat);

    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();
    const clock = new THREE.Clock();

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

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
        codexGroup.position.y = 1.48 + Math.sin(elapsed * 1.4) * 0.045;
        if (autoRotateRef.current && !transitionActiveRef.current) {
          codexGroup.rotation.y += dt * 0.28;
        }
        haloMesh.rotation.z = elapsed * 0.25;
        motes.rotation.y = elapsed * 0.03;

        // Smooth hinge opening/closing of the illuminated 3D Codex cover
        const targetCoverAngle = codexOpenRef.current ? Math.PI * 0.78 : 0;
        topCoverPivot.rotation.z = THREE.MathUtils.damp(
          topCoverPivot.rotation.z,
          targetCoverAngle,
          5.5,
          dt
        );
      } else {
        topCoverPivot.rotation.z = codexOpenRef.current ? Math.PI * 0.78 : 0;
      }

      if (transitionActiveRef.current) {
        const cfg = CAMERA_TARGETS[presetRef.current];
        targetCamPos.set(...cfg.pos);
        targetLookAt.set(...cfg.look);

        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.x, 5, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.y, 5, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.z, 5, dt);

        controls.target.x = THREE.MathUtils.damp(controls.target.x, targetLookAt.x, 5, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, targetLookAt.y, 5, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, targetLookAt.z, 5, dt);

        if (camera.position.distanceTo(targetCamPos) < 0.03) {
          transitionActiveRef.current = false;
        }
      }

      controls.update();
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
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      controls.dispose();
      for (const item of disposables) {
        item.dispose();
      }
      renderer.dispose();
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="relative w-full h-full min-h-[380px] lg:min-h-[470px] rounded-xl overflow-hidden border border-[#E4DDD0] dark:border-[#302A24] bg-[#1C1917]">
        <img
          src={heroMedinaFallback}
          alt="نمای رواق مدینه و آرشیو سیره فاطمی"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[490px] rounded-xl overflow-hidden border border-[#292524] bg-[#16120E]">
      <div
        ref={mountRef}
        className="w-full h-full min-h-[400px] lg:min-h-[490px] cursor-grab active:cursor-grabbing"
      />

      <div className="pointer-events-none absolute top-3 right-3 left-3 flex items-center justify-between gap-2 z-10">
        <span className="px-3 py-1.5 rounded-lg bg-[#1C1917]/90 border border-[#3F362E] text-[11px] font-medium text-[#E7E5E4]">
          {locale === 'en'
            ? 'Interactive 3D Sanctuary · Drag to Orbit'
            : locale === 'ar'
              ? 'معرض ثلاثي الأبعاد تفاعلي · اسحب للتدوير'
              : 'نمایشگاه سه‌بعدی تعاملی · چرخش با ماوس'}
        </span>
      </div>

      {/* Collapsible Bottom Control Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[560px] z-10 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setDockCollapsed((v) => !v)}
          className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-[#1C1917]/95 border border-b-0 border-[#3F362E] text-[11px] font-medium text-[#D6CEBE] hover:text-[#FBF9F5] cursor-pointer"
        >
          {dockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>
            {dockCollapsed
              ? locale === 'en'
                ? 'Show 3D Controls'
                : locale === 'ar'
                  ? 'إظهار أدوات العرض'
                  : 'نمایش ابزار سه‌بعدی'
              : locale === 'en'
                ? 'Hide Controls'
                : locale === 'ar'
                  ? 'إخفاء الأدوات'
                  : 'پنهان کردن ابزار'}
          </span>
        </button>

        {!dockCollapsed && (
          <div className="w-full rounded-xl bg-[#1C1917]/92 border border-[#3F362E] p-2.5 space-y-2 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex flex-wrap items-center gap-1">
                {(Object.keys(CAMERA_TARGETS) as CameraPreset[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPreset(key)}
                    className={`px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      preset === key
                        ? 'bg-[#D4AF37] text-[#1C1917]'
                        : 'bg-[#292524] text-[#D6CEBE] hover:text-[#FBF9F5]'
                    }`}
                  >
                    {CAMERA_LABELS[locale][key]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCodexOpen((v) => !v)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    codexOpen
                      ? 'bg-[#7F1D1D] text-[#FBF9F5]'
                      : 'bg-[#292524] text-[#E6C260] hover:bg-[#3A3129]'
                  }`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span>
                    {codexOpen
                      ? locale === 'en'
                        ? 'Close Codex'
                        : locale === 'ar'
                          ? 'إغلاق المخطوطة'
                          : 'بستن کتاب'
                      : locale === 'en'
                        ? 'Open Codex'
                        : locale === 'ar'
                          ? 'فتح المخطوطة'
                          : 'گشودن کتاب خطی'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAutoRotate((v) => !v)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors cursor-pointer ${
                    autoRotate
                      ? 'bg-[#1B365D] text-[#FBF9F5]'
                      : 'bg-[#292524] text-[#A8A29E]'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">
                    {autoRotate
                      ? locale === 'en'
                        ? 'Orbit'
                        : locale === 'ar'
                          ? 'دوران'
                          : 'چرخش'
                      : locale === 'en'
                        ? 'Pause'
                        : locale === 'ar'
                          ? 'توقف'
                          : 'توقف'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-[#2E2721]">
              <span className="text-[11px] text-[#A8A29E]">
                {locale === 'en'
                  ? 'Codex Cover:'
                  : locale === 'ar'
                    ? 'غلاف المخطوطة:'
                    : 'پوشش جلد کتاب:'}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(Object.keys(BINDING_PALETTES) as BindingFinish[]).map((key) => {
                  const cfg = BINDING_PALETTES[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFinish(key)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-md border transition-colors cursor-pointer ${
                        finish === key
                          ? 'border-[#D4AF37] bg-[#292524] text-[#FBF9F5]'
                          : 'border-[#3F362E] bg-transparent text-[#A8A29E] hover:text-[#E7E5E4]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cfg.swatch }}
                      />
                      <span>{BINDING_LABELS[locale][key]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
