'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const EnvelopePromise = dynamic(() => import('./EnvelopePromise'), { ssr: false })
const HeartParticles = dynamic(() => import('./HeartParticles'), { ssr: false })
import photo1 from '../Images/1775886681934.png'
import photo2 from '../Images/1775886682054.png'
import photo3 from '../Images/1775886682123.png'
import photo4 from '../Images/1775886682174.png'
import photo5 from '../Images/1775886682265.png'
import photo6 from '../Images/1775886682297.png'
import photo7 from '../Images/1775886682396.png'
import photo8 from '../Images/1775886682498.png'
import photo9 from '../Images/1775886682638.png'
import photo10 from '../Images/1775886682736.png'
import photo11 from '../Images/1775886682803.png'
import photo12 from '../Images/LS20260403164527.png'
import photo13 from '../Images/LS20260403164533.png'
import photo14 from '../Images/LS20260403164542.png'

/* ══════════════════════════════════════════════
   SVG FLOWER COMPONENTS
══════════════════════════════════════════════ */

function RoseSVG({ width = 120, color = '#ff5c9a', centerColor = '#ffd700', className = '', style = {} }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg
      width={width} height={width}
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`rg-${color.replace('#', '')}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </radialGradient>
        <filter id="bloom-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {petals.map((angle, i) => (
        <ellipse
          key={i}
          cx="100" cy="58" rx="22" ry="46"
          transform={`rotate(${angle} 100 100)`}
          fill={`url(#rg-${color.replace('#', '')})`}
          filter="url(#bloom-glow)"
          opacity={0.75 + i * 0.02}
        />
      ))}
      {/* Inner layer petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="100" cy="72" rx="14" ry="28"
          transform={`rotate(${angle} 100 100)`}
          fill={color}
          opacity={0.55}
        />
      ))}
      <circle cx="100" cy="100" r="26" fill={centerColor} opacity="0.95" filter="url(#bloom-glow)" />
      <circle cx="100" cy="100" r="18" fill={centerColor === '#ffd700' ? '#fff8a0' : '#fff'} opacity="0.7" />
      <circle cx="100" cy="100" r="10" fill={centerColor} opacity="0.9" />
    </svg>
  )
}

function SmallFlower({ width = 50, color = '#ff5c9a', style = {} }) {
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <svg width={width} height={width} viewBox="0 0 100 100" aria-hidden="true" style={style}>
      <defs>
        <radialGradient id={`sg-${width}-${color.replace('#', '')}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </radialGradient>
      </defs>
      {petals.map((angle, i) => (
        <ellipse
          key={i}
          cx="50" cy="28" rx="11" ry="24"
          transform={`rotate(${angle} 50 50)`}
          fill={`url(#sg-${width}-${color.replace('#', '')})`}
          opacity={0.85 + i * 0.02}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#ffd700" />
      <circle cx="50" cy="50" r="9" fill="#fff8a0" opacity="0.8" />
    </svg>
  )
}

function TinyFlower({ color = '#c060f0', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx="30" cy="16" rx="7" ry="14"
          transform={`rotate(${angle} 30 30)`}
          fill={color}
          opacity={0.8 + i * 0.03}
        />
      ))}
      <circle cx="30" cy="30" r="9" fill="#ffd700" />
    </svg>
  )
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */

const WISHES = [
  {
    icon: '🌸',
    title: 'Endless Joy',
    text: 'May every single day bring you the same overflowing joy that you bring to everyone lucky enough to know you. Your laughter is the most beautiful music.',
    delay: '0s',
  },
  {
    icon: '✨',
    title: 'A Brilliant Future',
    text: 'As you step into your nineteenth year, may every path ahead shine brilliant and golden. The world is wide and waiting — the greatest chapters of your story have only just begun.',
    delay: '0.5s',
  },
  {
    icon: '💖',
    title: 'Unconditional Love',
    text: 'You are cherished beyond measure, beyond words, beyond what any sentence could ever fully hold. That love is yours — today, tomorrow, and always.',
    delay: '1s',
  },
  {
    icon: '🦋',
    title: 'Beautiful Growth',
    text: 'Nineteen years of becoming someone truly extraordinary. Your metamorphosis is a marvel to witness — and the most breathtaking version of you is still unfolding.',
    delay: '1.5s',
  },
  {
    icon: '🌺',
    title: 'Dream Without Limits',
    text: 'May every dream you hold close blossom into reality, just like flowers after spring rain. Reach for every star — you were born to catch them.',
    delay: '2s',
  },
  {
    icon: '🎂',
    title: 'A Sweet, Vivid Life',
    text: 'May your life be as sweet as birthday cake, as bold as wildflowers in full bloom, and as warm as the love that will always, always surround you.',
    delay: '2.5s',
  },
]

const GARDEN_FLOWERS = [
  { color: '#ff5c9a', centerColor: '#ffd700', width: 150, stemH: 60 },
  { color: '#c060f0', centerColor: '#ffb3d9', width: 130, stemH: 48 },
  { color: '#ff2d78', centerColor: '#fff',    width: 160, stemH: 72 },
  { color: '#a855f7', centerColor: '#ffd700', width: 140, stemH: 56 },
  { color: '#ec4899', centerColor: '#fff3a0', width: 120, stemH: 44 },
]

const PHOTO_MEMORIES = [
  { src: photo1, title: 'Golden Smile', note: 'A frame full of warmth and light.', size: 'wide', tilt: '-5deg' },
  { src: photo2, title: 'Soft Moment', note: 'The kind of memory that glows quietly.', size: 'wide', tilt: '4deg' },
  { src: photo3, title: 'Little Bloom', note: 'Small picture, huge sweetness.', size: 'square', tilt: '-3deg' },
  { src: photo4, title: 'Radiant Day', note: 'A bright memory to keep close forever.', size: 'wide', tilt: '5deg' },
  { src: photo5, title: 'Tiny Treasure', note: 'A snapshot that feels like a flower pressed in a diary.', size: 'square', tilt: '-4deg' },
  { src: photo6, title: 'Sweet Spark', note: 'Soft, playful, and full of charm.', size: 'square', tilt: '3deg' },
  { src: photo7, title: 'Graceful Glow', note: 'A portrait moment with a dreamy silhouette.', size: 'tall', tilt: '-2deg' },
  { src: photo8, title: 'Blooming Memory', note: 'One of those pictures that instantly becomes a favourite.', size: 'tall', tilt: '4deg' },
  { src: photo9, title: 'Heartfelt Frame', note: 'Elegant, warm, and beautifully unforgettable.', size: 'tall', tilt: '-5deg' },
  { src: photo10, title: 'Sweet Detail', note: 'A little pause in time, held forever.', size: 'square', tilt: '2deg' },
  { src: photo11, title: 'Forever Lovely', note: 'A closing frame for a gallery made with love.', size: 'tall', tilt: '5deg' },
  { src: photo12, title: 'New Memory', note: 'Another beautiful moment, forever treasured.', size: 'wide', tilt: '-3deg' },
  { src: photo13, title: 'Sweet Capture', note: 'A frame that warms the heart every time.', size: 'square', tilt: '4deg' },
  { src: photo14, title: 'Cherished Instant', note: 'One more gem added to this gallery of love.', size: 'tall', tilt: '-2deg' },
]

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */

export default function BirthdayPage() {
  const canvasRef  = useRef(null)
  const petalsRef  = useRef(null)
  const rafRef     = useRef(null)
  const openTimerRef = useRef(null)
  const [ready, setReady] = useState(false)
  // stage: 'promise' → 'cake' → 'gift' → 'website'
  const [stage, setStage] = useState('promise')
  const [openingEnvelope, setOpeningEnvelope] = useState(false)
  const [heartsActive, setHeartsActive] = useState(false)
  const [heartPieces, setHeartPieces] = useState([])
  const [candleBlown, setCandleBlown] = useState(false)
  const [giftOpening, setGiftOpening] = useState(false)

  /* ── Canvas sparkles ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#ff5c9a', '#c060f0', '#ffd700', '#ffffff', '#ffb3d9', '#e0b0ff', '#ff2d78']
    const particles = Array.from({ length: 160 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      sz:   Math.random() * 2.8 + 0.4,
      vx:   (Math.random() - 0.5) * 0.28,
      vy:   (Math.random() - 0.5) * 0.28,
      op:   Math.random(),
      opS:  (Math.random() * 0.015 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      twk:  Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const drawStar = (x, y, size) => {
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const outerA = (i * 4 * Math.PI) / 5 - Math.PI / 2
        const innerA = outerA + Math.PI / 5
        if (i === 0) ctx.moveTo(x + Math.cos(outerA) * size, y + Math.sin(outerA) * size)
        else         ctx.lineTo(x + Math.cos(outerA) * size, y + Math.sin(outerA) * size)
        ctx.lineTo(x + Math.cos(innerA) * size * 0.38, y + Math.sin(innerA) * size * 0.38)
      }
      ctx.closePath()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        p.op += p.opS; p.twk += 0.04

        if (p.op <= 0) { p.op = 0; p.opS = Math.abs(p.opS) }
        if (p.op >= 1) { p.op = 1; p.opS = -Math.abs(p.opS) }
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = p.op * (0.45 + 0.55 * Math.abs(Math.sin(p.twk)))
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 10
        drawStar(p.x, p.y, p.sz * 2.5)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Falling petals ── */
  useEffect(() => {
    const container = petalsRef.current
    if (!container) return

    const shapeColors = [
      '#ff5c9a', '#ff2d78', '#c060f0', '#a855f7',
      '#ffb3d9', '#e0b0ff', '#d4a0ff', '#ff80c0',
    ]

    for (let i = 0; i < 65; i++) {
      const el   = document.createElement('div')
      const size = Math.random() * 22 + 9
      const col  = shapeColors[Math.floor(Math.random() * shapeColors.length)]
      const left = Math.random() * 100
      const delay    = Math.random() * 18
      const duration = Math.random() * 12 + 9
      const drift    = (Math.random() - 0.5) * 360
      const rot      = (Math.floor(Math.random() * 3 + 2)) * 360

      // Random petal shape: ellipse or heart-ish
      const shape = Math.random() > 0.5
        ? '150% 0 150% 0'   // petal
        : '50% 50% 50% 50%' // round

      el.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: -${size + 20}px;
        width: ${size}px;
        height: ${size * (Math.random() * 0.5 + 0.8)}px;
        background: radial-gradient(ellipse, ${col}ee 0%, ${col}44 100%);
        border-radius: ${shape};
        animation: petalFall ${duration}s ${delay}s linear infinite;
        --rot: ${rot}deg;
        --drift: ${drift}px;
        pointer-events: none;
        box-shadow: 0 0 ${size / 2}px ${col}55;
        transform-style: preserve-3d;
      `
      container.appendChild(el)
    }

    return () => { container.innerHTML = '' }
  }, [])

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── Mount fade-in ── */
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  /* ── Lock scroll until website stage ── */
  useEffect(() => {
    document.body.style.overflow = stage === 'website' ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [stage])

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
    }
  }, [])

  /* ──────────────────────────────────────────── */

  const handlePromise = () => {
    if (openingEnvelope) return
    setOpeningEnvelope(true)

    // Phase 1 — after lid opens, burst hearts from envelope center
    openTimerRef.current = setTimeout(() => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const palette = ['#ff5c9a','#ff2d78','#c060f0','#ffd700','#ffb3d9','#a855f7','#ff80c0','#fff','#ec4899']
      const pieces = Array.from({ length: 72 }, (_, i) => {
        // Spread evenly across all angles so every corner gets covered
        const baseAngle = (i / 72) * Math.PI * 2
        const jitter    = (Math.random() - 0.5) * 0.4
        const angle     = baseAngle + jitter
        const dist      = vw * 0.35 + Math.random() * Math.max(vw, vh) * 0.9
        return {
          id:       i,
          hx:       `${Math.cos(angle) * dist}px`,
          hy:       `${Math.sin(angle) * dist}px`,
          hr:       `${Math.random() * 720 - 360}deg`,
          hs:       Math.random() * 0.7 + 0.2,
          size:     Math.random() * 32 + 14,
          delay:    Math.random() * 0.35,
          duration: Math.random() * 0.6 + 1.1,
          color:    palette[i % palette.length],
        }
      })
      setHeartPieces(pieces)
      setHeartsActive(true)

      // Phase 2 — show cake after hearts finish
      openTimerRef.current = setTimeout(() => {
        setHeartsActive(false)
        setStage('cake')
      }, 2200)
    }, 850)
  }

  const handleBlow = () => {
    setCandleBlown(true)
    // After candle-blow animation, transition to gift box
    setTimeout(() => setStage('gift'), 2600)
  }

  const handleGiftOpen = () => {
    if (giftOpening) return
    setGiftOpening(true)
    // After box-open animation, show website
    setTimeout(() => setStage('website'), 2000)
  }

  const confetti = Array.from({ length: 26 }, (_, i) => {
    const angle   = (i / 26) * Math.PI * 2
    const dist    = 80 + Math.random() * 180
    const palette = ['#ff5c9a','#c060f0','#ffd700','#ff2d78','#a855f7','#ec4899','#fff']
    return {
      cx: `${Math.cos(angle) * dist}px`,
      cy: `${-(Math.random() * 220 + 60)}px`,
      cr: `${Math.random() * 720 - 360}deg`,
      cd: `${(i / 26) * 1.8}s`,
      bg: palette[i % palette.length],
    }
  })

  const orbitFlowers = [
    '#ff5c9a', '#c060f0', '#ffd700', '#ff2d78',
    '#a855f7', '#ec4899', '#ff80c0', '#e0b0ff',
  ]

  return (
    <>
      {/* ══ STAGE: PROMISE ══ */}
      {stage === 'promise' && (
        <section className={`promise-screen ${openingEnvelope ? 'opened' : ''} ${heartsActive ? 'shattering' : ''}`}>
          <HeartParticles />
          <div className="promise-stars" aria-hidden="true" />
          <div className="promise-aura promise-aura-left" aria-hidden="true" />
          <div className="promise-aura promise-aura-right" aria-hidden="true" />
          <div className={heartsActive ? 'shattering' : ''}>
            <EnvelopePromise
              openingEnvelope={openingEnvelope}
              onPromise={handlePromise}
            />
          </div>
        </section>
      )}

      {/* Hearts explosion overlay — root level, not clipped */}
      {heartsActive && stage === 'promise' && (
        <div className="hearts-overlay" aria-hidden="true">
          {heartPieces.map(p => (
            <span key={p.id} className="heart-piece" style={{
              fontSize: `${p.size}px`, color: p.color,
              animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
              '--hx': p.hx, '--hy': p.hy, '--hr': p.hr, '--hs': p.hs,
            }}>♥</span>
          ))}
        </div>
      )}

      {/* ══ STAGE: CAKE ══ */}
      {stage === 'cake' && (
        <section className="cake-screen">
          <HeartParticles />
          <div className="cake-bg-aura cake-bg-aura-left" />
          <div className="cake-bg-aura cake-bg-aura-right" />
          <div className="cake-stars" aria-hidden="true" />

          <div className="cake-header  ">
            <p className="cake-eyebrow">✨ Your 19th Birthday ✨</p>
            <h2 className="cake-title">Make a Wish!</h2>
            <p className="cake-sub">Phoonk maar ke apni wish maango 🌟</p>
          </div>

          {/* ── 3D Princess Cake ── */}
          <div className="cake-scene-wrap" >
            <div className={`cake-scene ${candleBlown ? 'cake-blown' : ''}`}>

              {/* ── Candle group + Crown — sits above ct-3 ── */}
              <div className="candle-group">
                <div className="cake-crown-top">
                  <div className="crown-jewel" />
                  <div className="crown-svg-wrap">👑</div>
                </div>
                <div className="candle-row">
                  {/* Left small candle */}
                  <div className="candle candle-s candle-left">
                    {!candleBlown && <div className="flame flame-s"><div className="flame-inner" /></div>}
                    {candleBlown && <div className="smoke smoke-s" />}
                    <div className="wick" />
                    <div className="candle-body cb-pink">
                      <div className="candle-stripe" />
                    </div>
                  </div>

                  {/* Centre big candle */}
                  <div className="candle candle-m candle-center">
                    {!candleBlown && <div className="flame flame-m"><div className="flame-inner" /></div>}
                    {candleBlown && <div className="smoke smoke-m" />}
                    <div className="wick" />
                    <div className="candle-body cb-gold">
                      <div className="candle-stripe" />
                      <div className="candle-num">19</div>
                    </div>
                  </div>

                  {/* Right small candle */}
                  <div className="candle candle-s candle-right">
                    {!candleBlown && <div className="flame flame-s"><div className="flame-inner" /></div>}
                    {candleBlown && <div className="smoke smoke-s" />}
                    <div className="wick" />
                    <div className="candle-body cb-lavender">
                      <div className="candle-stripe" />
                    </div>
                  </div>
                </div>

              </div>{/* end candle-group */}

              {/* Tier 1 — top, smallest */}
              <div className="cake-tier ct-3">
                <div className="ct-top">
                  <div className="ct-top-inner" />
                </div>
                <div className="ct-body">
                  <div className="ct-frosting-drips">
                    {Array.from({length:5},(_,i)=>(
                      <div key={i} className="drip" style={{'--di':i,'--dh':`${Math.random()*12+6}px`}} />
                    ))}
                  </div>
                  <div className="ct-heart-decos">
                    {['💕','🌸','💕'].map((d,i)=>(
                      <span key={i} className="ct-deco" style={{'--deco-i':i}}>{d}</span>
                    ))}
                  </div>
                </div>
                <div className="ct-depth" />
              </div>{/* end ct-3 */}

              {/* Tier 2 — middle */}
              <div className="cake-tier ct-2">
                <div className="ct-top">
                  <div className="ct-top-inner" />
                </div>
                <div className="ct-body">
                  <div className="ct-frosting-drips">
                    {Array.from({length:7},(_,i)=>(
                      <div key={i} className="drip" style={{'--di':i,'--dh':`${Math.random()*14+8}px`}} />
                    ))}
                  </div>
                  <div className="ct-decos">
                    {['💜','⭐','💜','⭐','💜'].map((d,i)=>(
                      <span key={i} className="ct-deco" style={{'--deco-i':i}}>{d}</span>
                    ))}
                  </div>
                </div>
                <div className="ct-depth" />
              </div>{/* end ct-2 */}

              {/* Tier 3 — bottom, biggest */}
              <div className="cake-tier ct-1">
                <div className="ct-top">
                  <div className="ct-top-inner" />
                </div>
                <div className="ct-body">
                  <div className="ct-frosting-drips">
                    {Array.from({length:9},(_,i)=>(
                      <div key={i} className="drip" style={{'--di':i,'--dh':`${Math.random()*18+10}px`}} />
                    ))}
                  </div>
                  <div className="ct-decos">
                    {['🌹','✨','🌸','💫','🌹','✨','🌸'].map((d,i)=>(
                      <span key={i} className="ct-deco" style={{'--deco-i':i}}>{d}</span>
                    ))}
                  </div>
                  <div className="ct-ribbon ct-ribbon-h" />
                  <div className="ct-ribbon ct-ribbon-v" />
                </div>
                <div className="ct-depth" />
              </div>{/* end ct-1 */}

            </div>{/* end cake-scene */}

            {/* Plate / board */}
            <div className="cake-plate" />

          </div>{/* end cake-scene-wrap */}

          {/* Blow button or wish message */}
          {!candleBlown ? (
            <button className="blow-btn" onClick={handleBlow}>
              <span className="blow-icon">💨</span>
              <span>Phoonk Maro 🥰!</span>
            </button>
          ) : (
            <div className="wish-granted">
              <p className="wish-granted-text">🌟 Meri bhalu🐻❤️ ki wish zaroor poori hogi! 🌟</p>
              <p className="wish-granted-sub">Ek special gift hai tumhare liye…</p>
            </div>
          )}

        </section>
      )}

      {/* ══ STAGE: GIFT BOX ══ */}
      {stage === 'gift' && (
        <section className="gift-screen">
          <div className="gift-bg-aura gift-bg-left" />
          <div className="gift-bg-aura gift-bg-right" />

          <div className="gift-header reveal-instant">
            <p className="gift-eyebrow">🎁 Ek Khaas Tohfa 🎁</p>
            <h2 className="gift-title">Kholo Ise!</h2>
            <p className="gift-sub">❤️Special gift for special person❤️</p>
          </div>

          {/* Floating sparkles around box */}
          <div className="gift-sparkles" aria-hidden="true">
            {Array.from({length:12},(_,i)=>(
              <div key={i} className="gs" style={{'--gsi':i,'--gsx':`${Math.cos((i/12)*Math.PI*2)*160}px`,'--gsy':`${Math.sin((i/12)*Math.PI*2)*100}px`}} />
            ))}
          </div>

          <button
            className={`gift-box-btn ${giftOpening ? 'opening' : ''}`}
            onClick={handleGiftOpen}
            aria-label="Open gift box"
          >
            {/* 3D Gift Box */}
            <div className="gbox-scene">
              {/* Lid */}
              <div className={`gbox-lid ${giftOpening ? 'gbox-lid-open' : ''}`}>
                <div className="gbox-lid-top" />
                <div className="gbox-lid-front" />
                <div className="gbox-lid-side" />
                <div className="gbox-bow">
                  <div className="bow-loop bow-left" />
                  <div className="bow-loop bow-right" />
                  <div className="bow-knot" />
                  <div className="bow-tail bow-tail-l" />
                  <div className="bow-tail bow-tail-r" />
                </div>
              </div>
              {/* Box body */}
              <div className="gbox-body">
                <div className="gbox-front">
                  <div className="gbox-ribbon-h" />
                  <div className="gbox-ribbon-v" />
                  {giftOpening && (
                    <div className="gift-burst" aria-hidden="true">
                      {['✨','💖','🌸','⭐','💕','🌟','🎀','💫'].map((e,i)=>(
                        <span key={i} className="burst-piece" style={{'--bi':i}}>{e}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="gbox-side" />
                <div className="gbox-bottom" />
              </div>
            </div>
            {!giftOpening && <p className="gift-tap-hint">Tap to open 🎀</p>}
          </button>
        </section>
      )}

      {/* Fixed sparkle layer — always visible */}
      <canvas ref={canvasRef} className="sparkle-canvas" />
      <div ref={petalsRef} className="petals-layer" />

      <main
        className="page-wrapper"
        style={{ opacity: ready && stage === 'website' ? 1 : 0, transition: 'opacity 1.2s ease' }}
      >

        {/* ══════ HERO ══════ */}
        <section className="hero" id="top">

          {/* Corner flowers */}
          {[
            { cls: 'corner-flower tl', color: '#ff5c9a', delay: 0 },
            { cls: 'corner-flower tr', color: '#c060f0', delay: 0.4 },
            { cls: 'corner-flower bl', color: '#a855f7', delay: 0.8 },
            { cls: 'corner-flower br', color: '#ff2d78', delay: 1.2 },
          ].map(({ cls, color, delay }) => (
            <div key={cls} className={cls}>
              <RoseSVG
                width={120}
                color={color}
                centerColor="#ffd700"
                style={{ animation: `bloom 1.4s ease ${delay}s both, floatSway 7s ease-in-out ${delay}s infinite` }}
              />
            </div>
          ))}

          {/* Side vine flowers */}
          <div className="side-vines">
            <div className="vine-left">
              {['#ff5c9a','#c060f0','#ff2d78'].map((c, i) => (
                <TinyFlower key={i} color={c} size={32} />
              ))}
            </div>
            <div className="vine-right">
              {['#a855f7','#ffd700','#ec4899'].map((c, i) => (
                <TinyFlower key={i} color={c} size={32} />
              ))}
            </div>
          </div>

          <div className="hero-inner">
            <p className="hero-eyebrow">✨ A Very Special Day ✨</p>

            <h1 className="hero-title">Happy Birthday!</h1>

            <div className="hero-name-row">
              <span className="name-emoji">🌸</span>
              <h2 className="hero-name">Bhalu ji</h2>
              <span className="name-emoji">🌸</span>
            </div>

            {/* Age badge */}
            <div className="age-badge">
              <div className="age-digit age-digit-1">1</div>
              <div className="age-digit age-digit-2">9</div>
            </div>
            <p className="age-label">Years of Being Absolutely Magical</p>

            <p className="hero-tagline">
              Nineteen years of sunshine, wonder &amp; boundless love 🌺
            </p>

            <a href="#garden" className="scroll-btn">
              <span>Scroll to explore</span>
              <div className="scroll-circle">↓</div>
            </a>
          </div>
        </section>

        {/* ══════ GARDEN ══════ */}
        <section className="garden-section" id="garden">
          <div className="garden-header reveal">
            <p className="section-tag">🌺 A Garden Blooming Just For You 🌺</p>
            <h2 className="section-heading">Your Flower Garden</h2>
            <p className="section-sub">
              Just like these flowers, you bring beauty, colour and fragrance to everything around you
            </p>
          </div>

          <div className="flower-garden">
            {GARDEN_FLOWERS.map((f, i) => (
              <div
                key={i}
                className="garden-flower-wrap reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <RoseSVG
                  width={f.width}
                  color={f.color}
                  centerColor={f.centerColor}
                  style={{
                    animation: `bloom 1.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.25}s both,
                               floatSway ${7 + i}s ease-in-out ${i * 0.5}s infinite`,
                    filter: `drop-shadow(0 0 24px ${f.color}88)`,
                  }}
                />
                <div
                  className="garden-flower-stem"
                  style={{ height: f.stemH }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══════ WISHES ══════ */}
        <section className="wishes-section" id="wishes">
          <div className="wishes-header reveal">
            <p className="section-tag">💝 Birthday Blessings 💝</p>
            <h2 className="section-heading">Wishes From The Heart</h2>
          </div>

          <div className="wishes-grid">
            {WISHES.map((w, i) => (
              <div
                key={i}
                className="wish-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="wish-glow" />
                <div className="wish-card-inner">
                  <span className="wish-icon" style={{ '--icon-delay': `${i * 0.7}s` }}>
                    {w.icon}
                  </span>
                  <h3 className="wish-title">{w.title}</h3>
                  <p className="wish-text">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════ MEMORIES ══════ */}
        <section className="memories-section" id="memories">
          <div className="memories-shell reveal">
            <div className="memories-header">
              <p className="section-tag">📸 Little Moments, Forever Kept 📸</p>
              <h2 className="section-heading">A Gallery For Bhalu</h2>
              <p className="section-sub">
                Your beautiful memories deserve more than a plain grid, so they bloom here like treasured keepsakes.
              </p>
            </div>

            <div className="memories-grid">
              {PHOTO_MEMORIES.map((photo, i) => (
                <article
                  key={photo.src.src}
                  className={`memory-card reveal memory-card-${photo.size}`}
                  style={{
                    transitionDelay: `${0.08 * i}s`,
                    '--memory-tilt': photo.tilt,
                    '--memory-delay': `${(i % 5) * 0.45}s`,
                  }}
                >
                  <div className="memory-card-glow" />
                  <div className="memory-frame">
                    <div className="memory-pin" />
                    <div className="memory-image-wrap">
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        className="memory-image"
                        placeholder="blur"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="memory-caption">
                      <h3>{photo.title}</h3>
                      <p>{photo.note}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ LETTER ══════ */}
        <section className="letter-section" id="letter">
          <div className="letter-outer reveal">
            {/* Top flower row */}
            <div className="letter-flowers-row">
              {['#ff5c9a', '#c060f0', '#ffd700', '#c060f0', '#ff5c9a'].map((c, i) => (
                <SmallFlower
                  key={i}
                  width={40}
                  color={c}
                  style={{ animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
                />
              ))}
            </div>

            <div className="letter-box">
              <p className="letter-tag">❤️A Message From The Heart❤️</p>
              <h2 className="letter-heading">For my one and only Cutii Chotii Bhalu 🐻💕🥰</h2>

              <div className="letter-body">
                <p>
                  Nineteen years ago, the world became a more beautiful place — not because of any grand
                  event, but simply because <em>you</em> arrived in it. And from that very first moment,
                  everything has been brighter.
                </p>
                <p>
                  Watching you grow has been one of the greatest honours of my life. From a little girl
                  with eyes full of wonder and a laugh that could light up the darkest room, to the
                  remarkable, radiant young woman you are today — every step of your journey has made my
                  heart swell with pride I can barely contain.
                </p>
                <p>
                  You have always been more than just my sister. You are my <em>friend</em>, my sunshine
                  on the cloudiest days, and my constant reminder of what truly, genuinely matters in
                  this life. The way you love, the way you laugh, the way you care — it is a gift to
                  everyone who knows you.
                </p>
                <p>
                  On this beautiful day, as you turn nineteen, I want you to hear this clearly:
                  <strong> the world is entirely, completely, infinitely yours.</strong> Dream without
                  ceilings. Love without conditions. Dance in the rain. Chase every sunrise. Be bold,
                  be joyful, be unapologetically yourself.
                </p>
                <p>
                  And always, <em>always</em> know that I am here — right behind you, cheering with
                  my whole heart, every single step of the way.
                </p>
                <p className="letter-closing">
                  The best chapters of your story have only just begun, my beautiful Bhalu. 🌸
                </p>
              </div>

              <div className="letter-sig">
                <p>Apna special day bahut achhe se enjoy karna aur hanesha 😊 karna thik hai .</p>
                <p className="letter-sig-name">Tumhara Chota sa Bhai 💕</p>
              </div>
            </div>

            {/* Bottom flower row */}
            <div className="letter-flowers-row">
              {['#a855f7', '#ff2d78', '#ffd700', '#ff2d78', '#a855f7'].map((c, i) => (
                <SmallFlower
                  key={i}
                  width={40}
                  color={c}
                  style={{ animation: `float ${3.5 + i * 0.4}s ease-in-out ${i * 0.4 + 1}s infinite` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══════ CELEBRATION ══════ */}
        <section className="celebration-section" id="celebrate">

          {/* Orbiting flowers ring */}
          <div className="celebration-orbit reveal">
            <div className="orbit-center-flower">
              <RoseSVG
                width={100}
                color="#ff5c9a"
                centerColor="#ffd700"
                style={{
                  animation: 'rotateSlowly 20s linear infinite, scaleBreath 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 30px rgba(255,92,154,0.7))',
                }}
              />
            </div>
            {orbitFlowers.map((color, i) => (
              <div
                key={i}
                className="orbit-flower"
                style={{ '--od': `${-(i / orbitFlowers.length) * 14}s` }}
              >
                <TinyFlower color={color} size={36} />
              </div>
            ))}
          </div>

          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="celebration-crown">👑</span>
            <h2 className="celebration-title">Here&apos;s To You!</h2>
            <p className="celebration-sub">19 &amp; Fabulous 🌟</p>
          </div>

          <p className="celebration-msg reveal" style={{ transitionDelay: '0.4s' }}>
            May this incredible year be filled with adventures that take your breath away,
            friendships that warm your soul, and countless moments that make your heart sing.
            You deserve every beautiful, wonderful, magnificent thing this world has to offer.
            And so much more. 🌸✨
          </p>

          {/* Confetti burst */}
          <div className="confetti-wrap">
            {confetti.map((c, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  '--cx': c.cx, '--cy': c.cy, '--cr': c.cr, '--cd': c.cd,
                  background: c.bg,
                }}
              />
            ))}
          </div>

          {/* Ripple rings */}
          <div className="ripple-rings" style={{ marginTop: '3rem' }}>
            {[0, 0.8, 1.6].map((d, i) => (
              <div key={i} className="ripple-ring" style={{ '--rd': `${d}s` }} />
            ))}
          </div>

          {/* Flower row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
            className="reveal"
          >
            {['#ff5c9a','#c060f0','#ffd700','#ff2d78','#a855f7'].map((c, i) => (
              <RoseSVG
                key={i}
                width={70}
                color={c}
                centerColor={i % 2 === 0 ? '#ffd700' : '#fff'}
                style={{
                  animation: `bloom 1s ease ${i * 0.2}s both,
                             float ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                  filter: `drop-shadow(0 0 15px ${c}88)`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ══════ FOOTER ══════ */}
        <footer className="footer">
          <span className="footer-flowers">🌸 🌺 🌹 🪷 💐 🌷</span>
          <p className="footer-main">Made with infinite love for the most special girl in the world</p>
          <p className="footer-sub">Happy 19th Birthday, Bhalu &nbsp;·&nbsp; You are so deeply loved ✨</p>
        </footer>

      </main>
    </>
  )
}
