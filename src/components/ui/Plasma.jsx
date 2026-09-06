import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./Plasma.css";

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const buildFragment = (iterations) => `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
uniform float uQuality;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;
  for (vec2 r = iResolution.xy, Q; ++i < ${iterations}.0; O += o.w / d * o.xyz) {
    p = z * normalize(vec3(C - 0.5 * r, r.y));
    p.z -= 4.0;
    S = p;
    d = p.y - T;
    p.x += 0.4 * (1.0 + p.y) * sin(d + p.x * 0.1) * cos(0.34 * d + p.x * 0.05);
    Q = p.xz *= mat2(cos(p.y + vec4(0.0, 11.0, 33.0, 0.0) - T));
    z += d = (abs(sqrt(length(Q * Q)) - 0.25 * (5.0 + S.y)) / 3.0 + 8e-4);
    o = 1.0 + sin(S.y + p.z * 0.5 + S.z - length(S - p) + vec4(2.0, 1.0, 0.0, 8.0));
    if (i >= uQuality) break;
  }
  o.xyz = tanh(O / 1e4);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = max(o.rgb, vec3(0.0));
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 finalColor = mix(rgb, intensity * uCustomColor, step(0.5, uUseCustomColor));
  fragColor = vec4(finalColor, length(rgb) * uOpacity);
}`;

export default function Plasma({
  color = "#6366f1",
  speed = 0.6,
  direction = "forward",
  scale = 1.1,
  opacity = 0.55,
  mouseInteractive = false,
  renderScale = 0.55,
  maxDpr = 1.5,
  targetFps = 30,
  iterations = 60,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, maxDpr),
      });
    } catch {
      return undefined;
    }

    const gl = renderer.gl;
    if (!gl) return undefined;
    const canvas = gl.canvas;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const program = new Program(gl, {
      vertex,
      fragment: buildFragment(iterations),
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(hexToRgb(color)) },
        uUseCustomColor: { value: color ? 1 : 0 },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: direction === "reverse" ? -1 : 1 },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1 : 0 },
        uQuality: { value: iterations },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(rect.width * renderScale)),
        Math.max(1, Math.floor(rect.height * renderScale))
      );
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frame = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / targetFps;
    const render = (time) => {
      if (time - lastFrame >= frameInterval) {
        lastFrame = time;
        program.uniforms.iTime.value = time * 0.001;
        renderer.render({ scene: mesh });
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      try {
        container.removeChild(canvas);
      } catch {
        // The canvas may already be detached during hot reload.
      }
    };
  }, [color, direction, iterations, maxDpr, mouseInteractive, opacity, renderScale, scale, speed, targetFps]);

  return <div ref={containerRef} className="plasma-container" aria-hidden="true" />;
}