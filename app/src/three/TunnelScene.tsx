import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { tunnelVertexShader, tunnelFragmentShader } from './shaders';

function createPathTexture(path: THREE.CatmullRomCurve3): THREE.DataTexture {
  const data = new Float32Array(128 * 2 * 4);
  for (let i = 0; i < 128; i++) {
    const t = i / 127;
    const point = path.getPointAt(t);
    data[i * 4] = point.x;
    data[i * 4 + 1] = point.y;
    data[i * 4 + 2] = point.z;
    data[i * 4 + 3] = 1.0;
    data[(128 + i) * 4] = point.x;
    data[(128 + i) * 4 + 1] = point.y;
    data[(128 + i) * 4 + 2] = point.z;
    data[(128 + i) * 4 + 3] = 1.0;
  }
  const texture = new THREE.DataTexture(data, 128, 2, THREE.RGBAFormat, THREE.FloatType);
  texture.needsUpdate = true;
  return texture;
}

const vignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 1.2 },
    darkness: { value: 1.5 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
      gl_FragColor = vec4(mix(texel.rgb, vec3(0.0), dot(uv, uv) * darkness), texel.a);
    }
  `,
};

const scanlinesShader = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 0.5 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float opacity;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      float scanline = sin(vUv.y * 800.0) * 0.04;
      gl_FragColor = vec4(texel.rgb + scanline * opacity, texel.a);
    }
  `,
};

export default function TunnelScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (cleanupRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0908, 0.035);

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x0A0908, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Path
    const pathPoints = [
      new THREE.Vector3(0, 0, 20),
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 5, -10),
      new THREE.Vector3(0, 0, -20),
      new THREE.Vector3(-5, -2, -30),
      new THREE.Vector3(0, 0, -40),
    ];
    const path = new THREE.CatmullRomCurve3(pathPoints);

    // Path texture
    const pathTexture = createPathTexture(path);

    // Tunnel
    const tunnelGeo = new THREE.CylinderGeometry(3, 3, 30, 128, 64, true);
    const textureLoader = new THREE.TextureLoader();
    const woodTexture = textureLoader.load('/wood-texture.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    });

    const tunnelMat = new THREE.ShaderMaterial({
      vertexShader: tunnelVertexShader,
      fragmentShader: tunnelFragmentShader,
      side: THREE.BackSide,
      uniforms: {
        time: { value: 0 },
        pathTexture: { value: pathTexture },
        mouse: { value: new THREE.Vector2(0, 0) },
        texture1: { value: woodTexture },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    });

    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    scene.add(tunnel);

    // Rings
    const ringsGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xC9A96E,
      transparent: true,
      opacity: 0.4,
    });
    for (let i = 0; i < 20; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(path.getPointAt(i / 20));
      ring.lookAt(path.getPointAt((i + 1) / 20));
      ringsGroup.add(ring);
    }
    scene.add(ringsGroup);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const vignette = new ShaderPass(vignetteShader);
    vignette.uniforms['offset'].value = 1.2;
    vignette.uniforms['darkness'].value = 1.5;
    composer.addPass(vignette);

    const filmPass = new FilmPass(0.35);
    composer.addPass(filmPass);

    const scanlines = new ShaderPass(scanlinesShader);
    scanlines.uniforms['opacity'].value = 0.5;
    composer.addPass(scanlines);

    // Mouse
    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseCurrent = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    let progress = 0.0;
    let autoRotate = true;
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      if (autoRotate) {
        progress += 0.0005;
        if (progress >= 1) progress = 0;
      }

      const currentPathPos = path.getPointAt(progress);
      camera.position.lerp(currentPathPos, 0.08);
      const lookAtTarget = path.getPointAt((progress + 0.03) % 1);
      camera.lookAt(lookAtTarget);

      mouseCurrent.lerp(mouseTarget, 0.05);
      tunnelMat.uniforms.mouse.value.copy(mouseCurrent);
      tunnelMat.uniforms.time.value = time;

      ringsGroup.children.forEach((r) => {
        r.rotation.z += 0.02;
        r.rotation.x += 0.01;
      });

      composer.render();
    };

    animate();

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      tunnelMat.uniforms.resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener('resize', onResize);

    // Visibility
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    cleanupRef.current = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      composer.dispose();
      renderer.dispose();
      tunnelGeo.dispose();
      tunnelMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pathTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
