'use client'

import { useEffect, useState } from 'react'

function PrincessPortrait({ variant, cx, cy, r }) {
  const palette = {
    belle: {
      bg1: '#fff5cc',
      bg2: '#ffe28a',
      hair: '#7a3a13',
      hairLight: '#a8541f',
      dress: '#ffd84a',
      dressDark: '#e0a814',
      sash: '#fff',
      crown: '#e85a9b',
    },
    cinderella: {
      bg1: '#dceaff',
      bg2: '#7eb6ff',
      hair: '#f0d27a',
      hairLight: '#ffe9a6',
      dress: '#a8d4ff',
      dressDark: '#5b8fd1',
      sash: '#fff',
      crown: '#7eb6ff',
    },
    aurora: {
      bg1: '#ffe0ee',
      bg2: '#ffb3d4',
      hair: '#e6c45a',
      hairLight: '#fff0a8',
      dress: '#ff85b8',
      dressDark: '#d44a87',
      sash: '#fff',
      crown: '#ff85b8',
    },
  }

  const colors = palette[variant] || palette.belle
  const size = r * 2
  const gradientId = `cake-portrait-bg-${variant}-${cx}`

  return (
    <g transform={`translate(${cx - r}, ${cy - r}) scale(${size / 100})`}>
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={colors.bg1} />
          <stop offset="100%" stopColor={colors.bg2} />
        </radialGradient>
      </defs>

      <rect width="100" height="100" fill={`url(#${gradientId})`} />
      <g opacity="0.6">
        <circle cx="15" cy="20" r="1.2" fill="#fff" />
        <circle cx="85" cy="25" r="1.6" fill="#fff" />
        <circle cx="20" cy="80" r="1" fill="#fff" />
        <circle cx="78" cy="78" r="1.4" fill="#fff" />
      </g>

      <path d="M 30 100 L 20 70 Q 50 60 80 70 L 70 100 Z" fill={colors.dress} />
      <path d="M 30 100 L 20 70 Q 50 60 80 70 L 70 100 Z" fill="#fff" opacity="0.18" />
      <circle cx="35" cy="85" r="1.3" fill="#fff" opacity="0.8" />
      <circle cx="55" cy="92" r="1.6" fill="#fff" opacity="0.8" />
      <circle cx="68" cy="80" r="1.2" fill="#fff" opacity="0.8" />

      <path d="M 38 70 Q 50 64 62 70 L 60 58 Q 50 54 40 58 Z" fill={colors.dressDark} />
      <ellipse cx="50" cy="70" rx="6" ry="2.5" fill={colors.sash} />

      <rect x="46" y="50" width="8" height="6" fill="#ffd9c2" />
      <circle cx="50" cy="42" r="14" fill="#ffe2cf" />
      <circle cx="42" cy="46" r="2" fill="#ff9bb8" opacity="0.7" />
      <circle cx="58" cy="46" r="2" fill="#ff9bb8" opacity="0.7" />

      <ellipse cx="44.5" cy="42" rx="2" ry="2.8" fill="#2a1a3a" />
      <ellipse cx="55.5" cy="42" rx="2" ry="2.8" fill="#2a1a3a" />
      <circle cx="45" cy="41" r="0.8" fill="#fff" />
      <circle cx="56" cy="41" r="0.8" fill="#fff" />
      <path d="M 42 40 Q 43 38.5 44.5 39" stroke="#2a1a3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M 56 39 Q 57.5 38.5 58.5 40" stroke="#2a1a3a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
      <path d="M 47 49 Q 50 51 53 49" stroke="#c43d6a" strokeWidth="0.9" fill="none" strokeLinecap="round" />

      {variant === 'cinderella' && (
        <g>
          <path d="M 36 36 Q 32 28 38 22 Q 50 14 62 22 Q 68 28 64 36 Q 64 28 50 24 Q 36 28 36 36 Z" fill={colors.hair} />
          <ellipse cx="50" cy="22" rx="6" ry="5" fill={colors.hair} />
          <ellipse cx="50" cy="20" rx="3" ry="2" fill={colors.hairLight} />
        </g>
      )}

      {variant === 'belle' && (
        <g>
          <path d="M 35 38 Q 30 26 40 20 Q 50 16 60 20 Q 70 26 65 38 Q 70 50 60 56 Q 65 44 60 38 Q 50 30 40 38 Q 35 44 40 56 Q 30 50 35 38 Z" fill={colors.hair} />
          <circle cx="62" cy="32" r="2.5" fill="#e85a9b" />
        </g>
      )}

      {variant === 'aurora' && (
        <g>
          <path d="M 36 36 Q 30 26 40 20 Q 50 16 60 20 Q 70 26 64 36 Q 68 50 62 60 Q 60 48 60 38 Q 50 30 40 38 Q 40 48 38 60 Q 32 50 36 36 Z" fill={colors.hair} />
          <path d="M 40 40 Q 38 50 36 58" stroke={colors.hairLight} strokeWidth="1" fill="none" />
          <path d="M 60 40 Q 62 50 64 58" stroke={colors.hairLight} strokeWidth="1" fill="none" />
        </g>
      )}

      <g>
        <path d="M 42 28 L 46 24 L 50 27 L 54 24 L 58 28 Z" fill="#ffe89a" stroke="#a07820" strokeWidth="0.4" />
        <circle cx="50" cy="26" r="1.2" fill={colors.crown} />
      </g>

      <ellipse cx="36" cy="68" rx="3" ry="6" fill="#ffe2cf" transform="rotate(-15 36 68)" />
      <ellipse cx="64" cy="68" rx="3" ry="6" fill="#ffe2cf" transform="rotate(15 64 68)" />
      <g transform="translate(50, 72)">
        <circle r="2.5" fill="#ff85b8" />
        <circle r="1.4" fill="#fff8d8" />
      </g>
    </g>
  )
}

function Candle({ x, y = 0, scale = 1, lit, blowing, delay = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${scale})`}>
        <rect x="-5" y="0" width="10" height="38" rx="2" fill="url(#cake-candle-grad)" stroke="#b48ed1" strokeWidth="0.6" />
        <rect x="-5" y="0" width="10" height="6" fill="#fff5fb" opacity="0.5" />
        <line x1="-5" y1="14" x2="5" y2="14" stroke="#ff8fb8" strokeWidth="1.2" />
        <line x1="-5" y1="24" x2="5" y2="24" stroke="#ff8fb8" strokeWidth="1.2" />
        <line x1="0" y1="0" x2="0" y2="-4" stroke="#3a2a1a" strokeWidth="1.4" />

        {lit && (
          <g
            className={`cake-flame ${blowing ? 'cake-flame-blow' : ''}`}
            style={{ transformOrigin: '0px -4px', animationDelay: `${delay}s` }}
          >
            <ellipse cx="0" cy="-12" rx="5" ry="10" fill="url(#cake-flame-outer)" />
            <ellipse cx="0" cy="-11" rx="3" ry="7" fill="url(#cake-flame-inner)" />
            <ellipse cx="0" cy="-9" rx="1.4" ry="3" fill="#fff7c4" />
            <circle cx="0" cy="-11" r="14" fill="url(#cake-flame-glow)" opacity="0.55" />
          </g>
        )}

        {!lit && (
          <g className="cake-smoke" style={{ animationDelay: `${delay * 0.35}s` }}>
            <path
              d="M -2 -4 Q 1 -10 -2 -16 Q -5 -22 0 -28"
              stroke="#cfcfcf"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              opacity="0.72"
            />
          </g>
        )}
      </g>
    </g>
  )
}

function HeartDeco({ x, y, color, rot = 0, size = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot}) scale(${size})`}>
      <path
        d="M0,4 C-6,-3 -14,2 -8,9 C-4,14 0,18 0,18 C0,18 4,14 8,9 C14,2 6,-3 0,4 Z"
        fill={color}
        stroke="#a06fc0"
        strokeWidth="0.6"
        opacity="0.95"
      />
    </g>
  )
}

function Rose({ x, y, color = '#7eb6ff', size = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size})`}>
      <circle r="6" fill={color} />
      <circle r="4" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.85" />
      <circle r="2" fill="#fff" opacity="0.6" />
      <path d="M -8 5 Q -4 9 -1 7" stroke="#7ec27a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 8 5 Q 4 9 1 7" stroke="#7ec27a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  )
}

function TierFrame({ cx, cy, r, princess }) {
  const clipId = `cake-clip-${cx}-${cy}`

  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 4} fill="#fff8d8" />
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="url(#cake-gold-grad)" strokeWidth="2.5" />
      {Array.from({ length: 26 }).map((_, index) => {
        const angle = (index / 26) * Math.PI * 2
        return (
          <circle
            key={index}
            cx={cx + Math.cos(angle) * (r + 4)}
            cy={cy + Math.sin(angle) * (r + 4)}
            r="2.2"
            fill="#fff"
            stroke="#d6b85a"
            strokeWidth="0.5"
          />
        )
      })}

      <clipPath id={clipId}>
        <circle cx={cx} cy={cy} r={r} />
      </clipPath>

      <g clipPath={`url(#${clipId})`}>
        <PrincessPortrait variant={princess} cx={cx} cy={cy} r={r} />
      </g>
    </g>
  )
}

function Swirl({ x, y, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`}>
      <path
        d="M0,0 C 6,-8 18,-10 22,-2 C 26,6 18,12 12,8 C 8,5 10,0 14,2"
        stroke="url(#cake-gold-grad)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M 24,4 C 30,2 34,8 30,12" stroke="url(#cake-gold-grad)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  )
}

export default function PrincessCakeScene({ candleBlown, name = 'Bhalu' }) {
  const [showBlowAnimation, setShowBlowAnimation] = useState(false)
  const candleLayout = [
    { x: 232, y: 18, scale: 0.8, delay: 0 },
    { x: 268, y: 10, scale: 0.92, delay: 0.15 },
    { x: 300, y: 0, scale: 1.12, delay: 0.3 },
    { x: 332, y: 10, scale: 0.92, delay: 0.45 },
    { x: 368, y: 18, scale: 0.8, delay: 0.6 },
  ]

  useEffect(() => {
    if (!candleBlown) {
      setShowBlowAnimation(false)
      return
    }

    setShowBlowAnimation(true)
    const timeoutId = setTimeout(() => setShowBlowAnimation(false), 650)
    return () => clearTimeout(timeoutId)
  }, [candleBlown])

  const candlesLit = !candleBlown || showBlowAnimation

  return (
    <div className="cake-scene">
      <div className="cake-crown-overlay" aria-hidden="true">
        <div className="cake-crown-top">
          <div className="crown-jewel" />
          <div className="crown-svg-wrap">👑</div>
        </div>
      </div>

      <svg
        viewBox="0 0 600 720"
        className="cake-princess-svg"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Princess birthday cake"
        role="img"
      >
        <defs>
          <linearGradient id="cake-top-tier" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6b4dbf" />
            <stop offset="50%" stopColor="#4b2fa3" />
            <stop offset="100%" stopColor="#36207a" />
          </linearGradient>
          <linearGradient id="cake-mid-tier" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3a55c9" />
            <stop offset="50%" stopColor="#2c3fa6" />
            <stop offset="100%" stopColor="#1f2d7c" />
          </linearGradient>
          <linearGradient id="cake-bottom-tier" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffb3d4" />
            <stop offset="50%" stopColor="#ff85b8" />
            <stop offset="100%" stopColor="#e85a9b" />
          </linearGradient>
          <linearGradient id="cake-gold-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffe89a" />
            <stop offset="50%" stopColor="#e0b34a" />
            <stop offset="100%" stopColor="#a07820" />
          </linearGradient>
          <linearGradient id="cake-candle-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#ffd9ec" />
          </linearGradient>
          <radialGradient id="cake-flame-outer">
            <stop offset="0%" stopColor="#ffd84a" />
            <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cake-flame-inner">
            <stop offset="0%" stopColor="#fff7c4" />
            <stop offset="100%" stopColor="#ffae2b" />
          </radialGradient>
          <radialGradient id="cake-flame-glow">
            <stop offset="0%" stopColor="#ffe27a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffe27a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cake-plate-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff5fa" />
            <stop offset="100%" stopColor="#e3cfd9" />
          </linearGradient>
          <linearGradient id="cake-plaque-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#f1e3ec" />
          </linearGradient>
        </defs>

        <ellipse cx="300" cy="660" rx="270" ry="22" fill="#a37dbf" opacity="0.5" />
        <ellipse cx="300" cy="650" rx="265" ry="18" fill="url(#cake-plate-grad)" stroke="#c79bd8" strokeWidth="1.5" />
        {Array.from({ length: 40 }).map((_, index) => (
          <circle key={index} cx={40 + index * 13.5} cy="650" r="2.5" fill="#fff" stroke="#d6b6e2" strokeWidth="0.4" />
        ))}

        <ellipse cx="300" cy="640" rx="240" ry="20" fill="#c44a89" />
        <rect x="60" y="490" width="480" height="155" rx="6" fill="url(#cake-bottom-tier)" />
        <ellipse cx="300" cy="490" rx="240" ry="20" fill="#ffc1dc" />
        {Array.from({ length: 38 }).map((_, index) => (
          <circle key={index} cx={68 + index * 12.5} cy="490" r="3" fill="#fff8d8" stroke="#d6b85a" strokeWidth="0.6" />
        ))}
        {Array.from({ length: 38 }).map((_, index) => (
          <circle key={`cake-bottom-${index}`} cx={68 + index * 12.5} cy="640" r="3" fill="#fff8d8" stroke="#d6b85a" strokeWidth="0.6" />
        ))}
        <Swirl x="100" y="560" scale={1.3} />
        <Swirl x="180" y="600" scale={1} />
        <Swirl x="450" y="560" scale={1.3} flip />
        <Swirl x="380" y="600" scale={1} flip />
        <TierFrame cx={300} cy={580} r={55} princess="aurora" />

        <g transform="translate(470, 555)">
          <ellipse cx="0" cy="0" rx="60" ry="42" fill="url(#cake-plaque-grad)" stroke="url(#cake-gold-grad)" strokeWidth="2" />
          {Array.from({ length: 20 }).map((_, index) => {
            const angle = (index / 20) * Math.PI * 2
            return (
              <circle
                key={index}
                cx={Math.cos(angle) * 60}
                cy={Math.sin(angle) * 42}
                r="1.8"
                fill="#fff"
                stroke="#d6b85a"
                strokeWidth="0.4"
              />
            )
          })}
          <text x="0" y="-8" textAnchor="middle" fontFamily="'Pacifico', cursive" fontSize="14" fill="#7a3aa5">Happy</text>
          <text x="0" y="8" textAnchor="middle" fontFamily="'Pacifico', cursive" fontSize="14" fill="#7a3aa5">Birthday</text>
          <text x="0" y="26" textAnchor="middle" fontFamily="'Pacifico', cursive" fontSize="15" fill="#c43d7d">{name}</text>
        </g>

        <HeartDeco x="105" y="510" color="#a78fdc" rot={-15} size={1.1} />
        <HeartDeco x="135" y="540" color="#ffb3e0" rot={10} size={1} />
        <HeartDeco x="80" y="565" color="#7eb6ff" rot={-25} size={0.9} />
        <HeartDeco x="225" y="510" color="#ffb3e0" rot={5} size={0.9} />
        <Rose x="160" y="625" color="#a78fdc" />
        <Rose x="220" y="630" color="#7eb6ff" size={0.9} />
        <Rose x="375" y="630" color="#a78fdc" size={1.1} />
        <Rose x="430" y="625" color="#ffb3e0" />

        <ellipse cx="300" cy="485" rx="180" ry="16" fill="#1d2870" />
        <rect x="120" y="360" width="360" height="125" rx="6" fill="url(#cake-mid-tier)" />
        <ellipse cx="300" cy="360" rx="180" ry="16" fill="#3f57db" />
        {Array.from({ length: 28 }).map((_, index) => (
          <circle key={index} cx={130 + index * 12.5} cy="360" r="2.7" fill="#fff8d8" stroke="#d6b85a" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 28 }).map((_, index) => (
          <circle key={`cake-mid-${index}`} cx={130 + index * 12.5} cy="485" r="2.7" fill="#fff8d8" stroke="#d6b85a" strokeWidth="0.5" />
        ))}
        <Swirl x="155" y="430" scale={1.1} />
        <Swirl x="425" y="430" scale={1.1} flip />
        <TierFrame cx={300} cy={425} r={48} princess="cinderella" />
        <HeartDeco x="155" y="385" color="#a78fdc" rot={-10} size={1} />
        <HeartDeco x="445" y="395" color="#ffb3e0" rot={20} size={1} />
        <Rose x="160" y="475" color="#7eb6ff" size={0.9} />
        <Rose x="440" y="475" color="#a78fdc" size={0.9} />

        <ellipse cx="300" cy="355" rx="130" ry="13" fill="#2a1860" />
        <rect x="170" y="240" width="260" height="115" rx="6" fill="url(#cake-top-tier)" />
        <ellipse cx="300" cy="240" rx="130" ry="13" fill="#7e5ed3" />
        {Array.from({ length: 22 }).map((_, index) => (
          <circle key={index} cx={177 + index * 11.5} cy="240" r="2.5" fill="#fff8d8" stroke="#d6b85a" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 22 }).map((_, index) => (
          <circle key={`cake-top-${index}`} cx={177 + index * 11.5} cy="355" r="2.5" fill="#fff8d8" stroke="#d6b85a" strokeWidth="0.5" />
        ))}
        <Swirl x="195" y="300" scale={0.95} />
        <Swirl x="395" y="300" scale={0.95} flip />
        <TierFrame cx={300} cy={300} r={42} princess="belle" />

        <g transform="translate(300, 220)">
          <HeartDeco x={-50} y={0} color="#ffb3e0" rot={-15} size={1.2} />
          <HeartDeco x={-20} y={-15} color="#a78fdc" rot={10} size={1.4} />
          <HeartDeco x={20} y={-10} color="#fff0d6" rot={-5} size={1.1} />
          <HeartDeco x={50} y={5} color="#ffb3e0" rot={20} size={1.3} />
          <HeartDeco x={-70} y={10} color="#7eb6ff" rot={-30} size={0.9} />
          <HeartDeco x={75} y={15} color="#a78fdc" rot={25} size={0.9} />
          <Rose x={-30} y={20} color="#a78fdc" size={0.85} />
          <Rose x={10} y={22} color="#ffb3e0" size={0.85} />
          <Rose x={45} y={25} color="#7eb6ff" size={0.85} />
        </g>

        <g transform="translate(0, 195)">
          {candleLayout.map((candle) => (
            <Candle
              key={`${candle.x}-${candle.scale}`}
              x={candle.x}
              y={candle.y}
              scale={candle.scale}
              lit={candlesLit}
              blowing={showBlowAnimation}
              delay={candle.delay}
            />
          ))}
        </g>

      </svg>
    </div>
  )
}
