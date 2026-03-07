import { useEffect, useRef, memo } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  ShaderMaterial,
  Color,
  Vector2,
  AdditiveBlending
} from 'three'

const PARTICLE_COUNT = 80

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Organic floating motion
    float t = uTime * aSpeed;
    pos.x += sin(t * 0.7 + aPhase) * 0.3 + sin(t * 0.3 + aPhase * 2.0) * 0.15;
    pos.y += t * 0.08 + sin(t * 0.5 + aPhase * 1.5) * 0.2;
    pos.z += cos(t * 0.6 + aPhase * 0.8) * 0.2;

    // Wrap vertically — restart from bottom when reaching top
    pos.y = mod(pos.y + 5.0, 10.0) - 5.0;

    // Mouse repulsion
    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vec4 projected = projectionMatrix * mvPos;
    vec2 screenPos = projected.xy / projected.w;
    vec2 diff = screenPos - uMouse;
    float dist = length(diff);
    float repulsion = smoothstep(0.4, 0.0, dist) * 0.5;
    mvPos.xy += normalize(diff + 0.001) * repulsion;

    // Pulsing glow alpha
    vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(t * 2.0 + aPhase * 3.0));

    // Size attenuation — keep particles small and delicate
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = aSize * uPixelRatio * (50.0 / -mvPos.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 12.0);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    // Soft circular glow — tight core, subtle halo
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    // Tight glow falloff for small, crisp firefly dots
    float glow = 1.0 - smoothstep(0.0, 0.4, d);
    glow = pow(glow, 2.0);

    gl_FragColor = vec4(uColor, glow * vAlpha * 0.6);
  }
`

const GhibliParticles = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null)
  const materialRef = useRef<ShaderMaterial | null>(null)
  const mouseRef = useRef(new Vector2(9999, 9999))

  const lightColorHex = '#d4a853'
  const darkColorHex = '#98D8C8'
  const colorHex = useColorModeValue(lightColorHex, darkColorHex)

  // Setup Three.js scene once
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = window.innerWidth
    const height = window.innerHeight

    // Renderer
    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
      precision: 'mediump',
      stencil: false,
      depth: false
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Scene & Camera
    const scene = new Scene()
    const camera = new PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 5

    // Particle geometry
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT)
    const speeds = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      sizes[i] = Math.random() * 5 + 2
      phases[i] = Math.random() * Math.PI * 2
      speeds[i] = Math.random() * 0.6 + 0.4
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('aSize', new Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('aPhase', new Float32BufferAttribute(phases, 1))
    geometry.setAttribute('aSpeed', new Float32BufferAttribute(speeds, 1))

    // Material with custom shaders
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColor: { value: new Color(colorHex) },
        uMouse: { value: new Vector2(9999, 9999) }
      },
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    })
    materialRef.current = material

    const points = new Points(geometry, material)
    scene.add(points)

    // Mouse tracking
    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onPointerLeave = () => {
      mouseRef.current.set(9999, 9999)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    // Resize
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Animation loop
    let raf: number
    const startTime = performance.now()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const elapsed = (performance.now() - startTime) / 1000

      material.uniforms.uTime.value = elapsed
      material.uniforms.uMouse.value.copy(mouseRef.current)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', onResize)
      renderer.domElement.remove()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      materialRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update particle color on theme change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value.set(colorHex)
    }
  }, [colorHex])

  return (
    <Box
      ref={containerRef}
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      overflow="hidden"
      pointerEvents="none"
      zIndex={0}
      sx={{
        '& canvas': {
          display: 'block',
          width: '100% !important',
          height: '100% !important'
        }
      }}
    />
  )
})
GhibliParticles.displayName = 'GhibliParticles'

export default GhibliParticles
