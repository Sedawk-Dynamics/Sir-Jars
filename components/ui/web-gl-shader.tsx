'use client'

import { useEffect, useRef } from 'react'

/**
 * Fullscreen WebGL wave-distortion shader for the hero banner.
 *
 * The reference component (21st.dev @designali-in/web-gl-shader) publishes its
 * source behind authentication, so this is a rebuild on the same construction:
 * an iterative sine/cosine warp of the UV field, sampled through a cosine
 * palette. That loop is what produces the characteristic flowing, folded bands
 * of a "colorful wave distortion" — it is the structure of the effect, not an
 * approximation of the look.
 *
 * Two differences from a generic drop-in, both deliberate:
 *  - It runs on raw WebGL rather than three.js / react-three-fiber. The effect
 *    is one fullscreen triangle and one fragment shader; pulling in three
 *    (~150kB gzipped) to draw it would cost the hero its load budget.
 *  - `palette="brand"` (the default) runs the same warp through the logo-led
 *    plum/wine/gold ramp, per the review's rule that the futuristic feeling
 *    comes from depth and motion rather than neon. Pass `palette="spectrum"`
 *    for the vivid rainbow the reference ships with.
 *
 * Behaviour contract:
 *  - Purely decorative, hidden from assistive tech. No hero copy waits on it.
 *  - prefers-reduced-motion paints one static frame and stops.
 *  - Pauses off-screen and in background tabs; DPR capped at 1.5.
 *  - If WebGL is unavailable the plum background simply shows through.
 */

const VERT = `#version 100
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragment = (brand: boolean) => `#version 100
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uPointer;

// Logo-led palette (review p.6)
const vec3 PLUM     = vec3(0.294, 0.051, 0.141); // #4B0D24
const vec3 WINE     = vec3(0.439, 0.051, 0.173); // #700D2C
const vec3 BURGUNDY = vec3(0.529, 0.129, 0.263); // #872143
const vec3 ROSE     = vec3(0.604, 0.180, 0.310); // #9A2E4F
const vec3 GOLD     = vec3(0.945, 0.710, 0.231); // #F1B53B

// Ramp the wave field across the brand family: deepest plum in the troughs,
// gold only on the crests, so gold stays a fill and never becomes text.
vec3 brandRamp(float v) {
  v = clamp(v, 0.0, 1.0);
  vec3 c = mix(PLUM, WINE, smoothstep(0.00, 0.42, v));
  c = mix(c, BURGUNDY,     smoothstep(0.34, 0.66, v));
  c = mix(c, ROSE,         smoothstep(0.58, 0.84, v));
  c = mix(c, GOLD,         smoothstep(0.84, 1.00, v) * 0.9);
  return c;
}

void main() {
  // Aspect-corrected coordinates, origin at centre.
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

  // Damped pointer parallax — reads as depth, not as a cursor toy.
  uv += uPointer * 0.06;

  vec2 p = uv * 1.35;
  float t = uTime * 0.28;

  // ── The wave distortion ──────────────────────────────────────────────
  // Each iteration folds the field back into itself at a higher frequency
  // and lower amplitude. Seven passes is where the bands stop gaining
  // visible detail on a 1.5x-DPR canvas.
  for (float i = 1.0; i < 8.0; i++) {
    p.x += 0.62 / i * cos(i * 2.4 * p.y + t + i * 0.35);
    p.y += 0.62 / i * cos(i * 1.7 * p.x + t * 1.15 - i * 0.22);
  }

  // Signed field driving both the colour ramp and the crest highlight.
  float wave = sin(p.x + p.y + t * 0.5);
  float v = 0.5 + 0.5 * wave;

${
  brand
    ? `  vec3 col = brandRamp(v);

  // Ridge lines: the thin bright seams where the folds cross.
  float ridge = pow(abs(sin(p.x * 1.1 - p.y * 0.9)), 12.0);
  col += GOLD * ridge * 0.34;`
    : `  // Cosine palette — the vivid spectrum the reference effect ships with.
  vec3 col = 0.5 + 0.5 * cos(vec3(p.x + t, p.y + t + 2.0, p.x + p.y + 4.0));

  float ridge = pow(abs(sin(p.x * 1.1 - p.y * 0.9)), 12.0);
  col += vec3(1.0) * ridge * 0.22;`
}

  // Vignette: keeps the headline column dark enough for ivory text to clear
  // AA contrast wherever the crests happen to land.
  float vign = 1.0 - 0.52 * dot(uv * 0.66, uv * 0.66);
  col *= clamp(vign, 0.0, 1.0);

  // Dither to kill banding across the wide gradients.
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function WebGLShader({
  className,
  palette = 'brand',
}: {
  className?: string
  /** 'brand' runs the warp through the logo palette; 'spectrum' is the vivid original. */
  palette?: 'brand' | 'spectrum'
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    }) as WebGLRenderingContext | null
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment(palette === 'brand'))
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Single full-viewport triangle — cheaper than a quad, no seam.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uPointer = gl.getUniformLocation(program, 'uPointer')

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const resize = () => {
      // Cap DPR at 1.5: the effect is soft, and uncapped retina rendering is
      // the fastest way to hand a mobile visitor a janky first screen.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uResolution, canvas.width, canvas.height)
    }

    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let frame = 0
    let running = true
    const start = performance.now()

    const render = (now: number) => {
      if (!running) return
      resize()
      pointer.x += (target.x - pointer.x) * 0.04
      pointer.y += (target.y - pointer.y) * 0.04
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      frame = requestAnimationFrame(render)
    }

    const renderStatic = () => {
      resize()
      gl.uniform2f(uPointer, 0, 0)
      // A fixed offset rather than 0 — t=0 sits in a flat part of the field.
      gl.uniform1f(uTime, 12)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const startLoop = () => {
      cancelAnimationFrame(frame)
      if (reduceMotion.matches) {
        window.removeEventListener('pointermove', onPointerMove)
        renderStatic()
      } else {
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        frame = requestAnimationFrame(render)
      }
    }

    // Pause off-screen and in background tabs — no reason to burn a GPU
    // animating a hero the visitor has already scrolled past.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          running = true
          startLoop()
        } else {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frame)
      } else {
        running = true
        startLoop()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    reduceMotion.addEventListener('change', startLoop)
    window.addEventListener('resize', resize)

    startLoop()

    return () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reduceMotion.removeEventListener('change', startLoop)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [palette])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  )
}

export default WebGLShader
