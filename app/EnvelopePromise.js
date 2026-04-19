'use client'
import { useState, useRef, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'

const HEART_CONFIG = [
  { x: '-38px', y: '15%',  size: 22, color: '#ff5c9a', glow: '#ff5c9a', delay: 0,    dur: 3.2 },
  { x: '-28px', y: '55%',  size: 16, color: '#c060f0', glow: '#c060f0', delay: 0.8,  dur: 2.8 },
  { x: '-44px', y: '80%',  size: 26, color: '#ff3d7f', glow: '#ff3d7f', delay: 1.6,  dur: 3.6 },
  { x: '100%',  y: '20%',  size: 18, color: '#ffd700', glow: '#ffd700', delay: 0.4,  dur: 3.0 },
  { x: '100%',  y: '60%',  size: 24, color: '#ff9dc8', glow: '#ff5c9a', delay: 1.2,  dur: 2.6 },
  { x: '100%',  y: '85%',  size: 14, color: '#c060f0', glow: '#c060f0', delay: 2.0,  dur: 3.4 },
  { x: '22%',   y: '-28px',size: 16, color: '#ff5c9a', glow: '#ff5c9a', delay: 0.6,  dur: 2.9 },
  { x: '55%',   y: '-34px',size: 20, color: '#ffd700', glow: '#ffd700', delay: 1.4,  dur: 3.1 },
  { x: '78%',   y: '-24px',size: 14, color: '#ff9dc8', glow: '#ff5c9a', delay: 2.2,  dur: 2.7 },
]

function GlowHearts() {
  return (
    <>
      {HEART_CONFIG.map((h, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: h.x,
            top: h.y,
            fontSize: h.size,
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 10,
            filter: `drop-shadow(0 0 6px ${h.glow}) drop-shadow(0 0 14px ${h.glow})`,
            userSelect: 'none',
          }}
          animate={{
            y: [0, -18, 0],
            scale: [0.85, 1.25, 0.85],
            opacity: [0.55, 1, 0.55],
            filter: [
              `drop-shadow(0 0 5px ${h.glow}) drop-shadow(0 0 10px ${h.glow})`,
              `drop-shadow(0 0 12px ${h.glow}) drop-shadow(0 0 28px ${h.glow})`,
              `drop-shadow(0 0 5px ${h.glow}) drop-shadow(0 0 10px ${h.glow})`,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: h.dur,
            delay: h.delay,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}
    </>
  )
}

function SparkleCloud() {
  const ref = useRef()
  const count = 70

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      [1, 0.36, 0.60],
      [0.75, 0.37, 0.94],
      [1, 0.84, 0],
      [1, 0.70, 0.85],
      [1, 1, 1],
    ]
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 2.0 + Math.random() * 1.5
      pos[i * 3]     = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1
      const c = palette[i % palette.length]
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2]
    }
    return { positions: pos, colors: col }
  }, [])

  const phases = useMemo(() => Float32Array.from({ length: count }, () => Math.random() * Math.PI * 2), [])
  const speeds = useMemo(() => Float32Array.from({ length: count }, () => 0.6 + Math.random() * 0.9), [])
  const baseY  = useMemo(() => Float32Array.from({ length: count }, (_, i) => positions[i * 3 + 1]), [positions])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = baseY[i] + Math.sin(t * speeds[i] + phases[i]) * 0.24
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.material.opacity = 0.5 + 0.4 * Math.abs(Math.sin(t * 0.35))
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function EnvelopePromise({ openingEnvelope, onPromise }) {
  const [lidOpen, setLidOpen] = useState(false)

  const handleLidClick = () => {
    if (lidOpen || openingEnvelope) return
    setLidOpen(true)
  }

  return (
    <div className="promise-envelope-wrap" style={{ position: 'relative' }}>

      {/* Glowing hearts around the envelope */}
      <GlowHearts />

      {/* Three.js sparkle canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 0,
        borderRadius: '16px', overflow: 'hidden',
      }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 55 }}
          gl={{ alpha: true, antialias: false }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <SparkleCloud />
          </Suspense>
        </Canvas>
      </div>

      <div className="promise-envelope-shadow" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.12 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="promise-envelope">

          {/* Bear ears — z-index 8 */}
          <div className="promise-bear-ears" aria-hidden="true">
            <motion.span
              className="promise-bear-ear promise-bear-ear-left"
              animate={{ rotate: [-6, 4, -6], y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              style={{ display: 'block' }}
            />
            <motion.span
              className="promise-bear-ear promise-bear-ear-right"
              animate={{ rotate: [6, -4, 6], y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3.7, ease: 'easeInOut' }}
              style={{ display: 'block' }}
            />
          </div>

          {/* Bear face — plain div, NO Framer Motion wrapper (would break translateX(-50%)) */}
          <div className="promise-bear-face" aria-hidden="true" style={{ zIndex: 8 }}>
            <motion.span
              className="promise-bear-eye promise-bear-eye-left"
              animate={{ scaleY: [1, 0.08, 1] }}
              transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut', repeatDelay: 3.5 }}
              style={{ display: 'block' }}
            />
            <motion.span
              className="promise-bear-eye promise-bear-eye-right"
              animate={{ scaleY: [1, 0.08, 1] }}
              transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut', repeatDelay: 3.8 }}
              style={{ display: 'block' }}
            />
            <span className="promise-bear-snout">
              <span className="promise-bear-nose" />
            </span>
          </div>

          {/* Envelope body */}
          <div className="promise-envelope-body" aria-hidden="true" />

          {/* Sealed cover — AnimatePresence for clean slide-up exit */}
          <AnimatePresence>
            {!lidOpen && (
              <motion.div
                className="env-sealed-cover"
                onClick={handleLidClick}
                style={{ cursor: 'pointer', zIndex: 5 }}
                initial={{ y: 0, opacity: 1 }}
                exit={{
                  y: '-105%',
                  opacity: 0,
                  transition: { duration: 0.55, ease: [0.34, 1.1, 0.64, 1] },
                }}
              >
                <div className="env-cover-crease env-cover-crease-left"  aria-hidden="true" />
                <div className="env-cover-crease env-cover-crease-right" aria-hidden="true" />

                <motion.div
                  className="env-wax-seal"
                  animate={{ scale: [1, 1.07, 1], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                >
                  <span className="env-wax-paw">🐾</span>
                </motion.div>

                <motion.div
                  className="env-tap-hint"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  ✦ Tap to open ✦
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter — flex wrapper handles centering so FM can animate freely */}
          <div style={{
            position: 'absolute',
            left: 0, right: 0,
            top: '18%',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pointerEvents: lidOpen ? 'auto' : 'none',
          }}>
            <motion.div
              className="promise-envelope-letter"
              style={{
                position: 'relative',
                left: 'auto',
                top: 'auto',
                transform: 'none',
                width: 'min(86%, 520px)',
              }}
              initial={{ opacity: 0, y: 80 }}
              animate={lidOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={lidOpen
                ? { type: 'spring', stiffness: 85, damping: 18, delay: 0.3 }
                : { duration: 0 }
              }
            >
              <p className="promise-kicker">Ek Chhota Sa Promise Pehle</p>
              <h2 className="promise-title">First promise me ki hamesha khush rahogi</h2>
              <p className="promise-text">
                Bas itna sa vaada chahiye, ki chahe din kaise bhi ho, tum apni smile kabhi khona mat.
                Aaj ka yeh surprise tabhi khulega jab tum yeh promise karogi.
              </p>
              <div className="promise-seal-row">
                <span className="promise-seal-flower">🌸</span>
                <motion.button
                  type="button"
                  className="promise-button"
                  whileHover={{ scale: 1.06, boxShadow: '0 14px 36px rgba(255,92,154,0.45)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPromise}
                >
                  Promise Karo
                </motion.button>
                <span className="promise-seal-flower">🌸</span>
              </div>
            </motion.div>
          </div>

          {/* Bear paws — hidden when envelope is open */}
          <AnimatePresence>
            {!lidOpen && (
              <motion.div
                className="promise-bear-paws"
                aria-hidden="true"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                <motion.span
                  className="promise-bear-paw promise-bear-paw-left"
                  animate={{ rotate: [-8, 2, -8] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  style={{ display: 'block' }}
                />
                <motion.span
                  className="promise-bear-paw promise-bear-paw-right"
                  animate={{ rotate: [8, -2, 8] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }}
                  style={{ display: 'block' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  )
}
