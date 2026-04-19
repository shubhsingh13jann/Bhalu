'use client'
import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 1500

// Targets at scale=1; actual scale computed from viewport in useFrame
function getHeartPosition(t) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  return new THREE.Vector3(x, y, 0)
}

const HEART_WIDTH  = 32   // bounding box width at scale=1
const HEART_HEIGHT = 28.6 // bounding box height at scale=1

const PALETTE = [
  [0.498, 0.361, 1.0],
  [0.749, 0.600, 1.0],
  [0.600, 0.376, 0.941],
  [0.400, 0.200, 0.900],
  [0.749, 0.600, 1.0],
  [0.498, 0.361, 1.0],
]

function Particles({ heartScale }) {
  const { viewport } = useThree()
  const mainRef = useRef()
  const glowRef = useRef()

  const { positions, glowPositions, targets, colors } = useMemo(() => {
    const pos = []
    const tar = []
    const col = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      const t = (i / PARTICLE_COUNT) * Math.PI * 2
      const heart = getHeartPosition(t)
      tar.push(heart.x, heart.y, heart.z)
      const c = PALETTE[i % PALETTE.length]
      col.push(c[0], c[1], c[2])
    }
    return {
      positions:     new Float32Array(pos),
      glowPositions: new Float32Array(pos),
      targets:       new Float32Array(tar),
      colors:        new Float32Array(col),
    }
  }, [])

  useFrame(({ clock }) => {
    if (!mainRef.current) return
    const time = clock.getElapsedTime()

    // Clamp scale so heart always fits within the visible viewport
    const maxW = (viewport.width  * 0.88) / HEART_WIDTH
    const maxH = (viewport.height * 0.85) / HEART_HEIGHT
    const effectiveScale = Math.min(heartScale, maxW, maxH)

    const pos = mainRef.current.geometry.attributes.position.array
    const col = mainRef.current.geometry.attributes.color.array

    for (let i = 0; i < pos.length; i += 3) {
      pos[i]     += (targets[i]     * effectiveScale - pos[i])     * 0.02
      pos[i + 1] += (targets[i + 1] * effectiveScale - pos[i + 1]) * 0.02
      pos[i + 2] += (targets[i + 2] * effectiveScale - pos[i + 2]) * 0.02
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base  = PALETTE[i % PALETTE.length]
      const pulse = 0.75 + 0.25 * Math.sin(time * 1.8 + i * 0.02)
      col[i * 3]     = base[0] * pulse
      col[i * 3 + 1] = base[1] * pulse
      col[i * 3 + 2] = base[2] * pulse
    }

    mainRef.current.geometry.attributes.position.needsUpdate = true
    mainRef.current.geometry.attributes.color.needsUpdate    = true

    const pulse = 1 + Math.sin(time * 2) * 0.05
    mainRef.current.scale.setScalar(pulse)

    if (glowRef.current) {
      glowRef.current.geometry.attributes.position.array.set(pos)
      glowRef.current.geometry.attributes.position.needsUpdate = true
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <>
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={glowPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.22} color="#7f5cff" transparent opacity={0.04} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <points ref={mainRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions}  itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={PARTICLE_COUNT} array={colors}     itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} vertexColors transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  )
}

export default function HeartParticles({ heartScale = 0.25, style = {} }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      ...style,
    }}>
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true, antialias: false }}>
        <Suspense fallback={null}>
          <Particles heartScale={heartScale} />
        </Suspense>
      </Canvas>
    </div>
  )
}
