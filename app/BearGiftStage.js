'use client'

import { useEffect, useMemo } from 'react'
import GiftBoxParticles from './GiftBoxParticles'

function BearArt() {
  return (
    <svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" aria-label="Teddy bear">
      <defs>
        <radialGradient id="bearGiftFurBody" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#d8a877" />
          <stop offset="60%" stopColor="#b9844f" />
          <stop offset="100%" stopColor="#8f6236" />
        </radialGradient>
        <radialGradient id="bearGiftFurHead" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#e3b687" />
          <stop offset="60%" stopColor="#bf8a54" />
          <stop offset="100%" stopColor="#8c5f32" />
        </radialGradient>
        <radialGradient id="bearGiftSnout" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#fbe7cd" />
          <stop offset="100%" stopColor="#e7c79c" />
        </radialGradient>
        <radialGradient id="bearGiftEar" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f4c59b" />
          <stop offset="100%" stopColor="#b88555" />
        </radialGradient>
        <radialGradient id="bearGiftPad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fadfbd" />
          <stop offset="100%" stopColor="#e1b987" />
        </radialGradient>
        <filter id="bearGiftFuzzy" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </defs>

      <g className="bear-gift-breathe">
        <g filter="url(#bearGiftFuzzy)">
          <ellipse cx="130" cy="370" rx="58" ry="36" fill="url(#bearGiftFurBody)" />
          <ellipse cx="270" cy="370" rx="58" ry="36" fill="url(#bearGiftFurBody)" />
          <ellipse cx="200" cy="290" rx="118" ry="95" fill="url(#bearGiftFurBody)" />
          <ellipse cx="112" cy="260" rx="38" ry="62" fill="url(#bearGiftFurBody)" transform="rotate(-14 112 260)" />
          <ellipse cx="288" cy="260" rx="38" ry="62" fill="url(#bearGiftFurBody)" transform="rotate(14 288 260)" />
          <circle cx="118" cy="120" r="38" fill="url(#bearGiftFurHead)" />
          <circle cx="282" cy="120" r="38" fill="url(#bearGiftFurHead)" />
          <ellipse cx="200" cy="165" rx="110" ry="100" fill="url(#bearGiftFurHead)" />
        </g>

        <ellipse cx="120" cy="372" rx="26" ry="16" fill="url(#bearGiftPad)" />
        <ellipse cx="280" cy="372" rx="26" ry="16" fill="url(#bearGiftPad)" />
        <ellipse cx="200" cy="300" rx="70" ry="55" fill="#e8c093" opacity="0.55" />
        <circle cx="118" cy="122" r="20" fill="url(#bearGiftEar)" />
        <circle cx="282" cy="122" r="20" fill="url(#bearGiftEar)" />

        <ellipse cx="200" cy="200" rx="48" ry="32" fill="url(#bearGiftSnout)" />
        <path d="M186 184 Q200 176 214 184 Q218 194 200 202 Q182 194 186 184 Z" fill="#2a1810" />
        <ellipse cx="196" cy="184" rx="4" ry="2.5" fill="#6d4a32" opacity="0.8" />

        <path d="M200 202 Q200 214 190 218" stroke="#2a1810" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M200 202 Q200 214 210 218" stroke="#2a1810" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M186 218 Q200 226 214 218" stroke="#2a1810" strokeWidth="3" fill="none" strokeLinecap="round" />

        <g className="bear-gift-eye">
          <circle cx="158" cy="148" r="11" fill="#1a0f08" />
          <circle cx="162" cy="144" r="3.2" fill="#fff" />
        </g>
        <g className="bear-gift-eye">
          <circle cx="242" cy="148" r="11" fill="#1a0f08" />
          <circle cx="246" cy="144" r="3.2" fill="#fff" />
        </g>

        <circle cx="138" cy="196" r="11" fill="#f29fbd" opacity="0.55" />
        <circle cx="262" cy="196" r="11" fill="#f29fbd" opacity="0.55" />
      </g>
    </svg>
  )
}

function HeartsBurst({ count = 30, seed = 0 }) {
  const particles = useMemo(() => {
    const icons = ['♥', '♥', '♥', '✦', '✧', '♡']
    const colors = ['#e11d48', '#be1340', '#f43f5e', '#ff8fab', '#fff', '#fbbf24']
    const arr = []

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 160 + Math.random() * 220
      arr.push({
        i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 120,
        rot: (Math.random() - 0.5) * 720,
        scale: 0.8 + Math.random() * 1.6,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 0.25,
        icon: icons[Math.floor(Math.random() * icons.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    return arr
  }, [count, seed])

  return (
    <div className="bear-gift-burst" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.i}
          className="bear-gift-particle"
          style={{
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
            '--rot': `${particle.rot}deg`,
            '--scale': particle.scale,
            color: particle.color,
            fontSize: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            textShadow:
              particle.color === '#fff'
                ? '0 0 8px rgba(255,255,255,0.9)'
                : '0 2px 6px rgba(120, 30, 60, 0.25)',
          }}
        >
          {particle.icon}
        </span>
      ))}
    </div>
  )
}

function GiftBox({ open, onClick }) {
  return (
    <div
      className={`bear-gift-box ${open ? 'open' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open the gift box"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="bear-gift-box-inner">
        <div className="bear-gift-box-body" />
        <div className="bear-gift-box-glow" />
        <div className="bear-gift-box-lid">
          <div className="bear-gift-lid-ribbon" />
        </div>
        <div className="bear-gift-bow">
          <div className="bear-gift-bow-loop left" />
          <div className="bear-gift-bow-loop right" />
          <div className="bear-gift-bow-knot" />
        </div>
      </div>
    </div>
  )
}

export default function BearGiftStage({ open, burstKey, onOpen }) {
  const ambient = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        bottom: -10 - Math.random() * 10,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 6,
        opacity: 0.35 + Math.random() * 0.35,
      })),
    []
  )

  useEffect(() => {
    const id = 'bear-gift-fonts'

    if (!document.getElementById(id)) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <section className="bear-gift-root">
      <GiftBoxParticles heartScale={0.22} />

      {ambient.map((heart) => (
        <span
          key={heart.id}
          className="bear-gift-ambient-heart"
          style={{
            left: `${heart.left}%`,
            bottom: `${heart.bottom}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          ♥
        </span>
      ))}

      <div className="bear-gift-title">
        <div className="bear-gift-eyebrow">a little something for you</div>
        <h1>A Bear-y Special Surprise</h1>
      </div>

      <div className="bear-gift-stage">
        <div className="bear-gift-wrap">
          <BearArt />
        </div>

        <GiftBox open={open} onClick={onOpen} />

        <div className="bear-gift-floor-shadow" />

        <div className={`bear-gift-reveal-card ${open ? 'show' : ''}`}>
          You&apos;re invited! <span className="small">opening your surprise…</span>
        </div>

        {open && <HeartsBurst key={burstKey} count={30} seed={burstKey} />}

        {!open && <div className="bear-gift-tap-hint">tap the bow to open ✦</div>}
      </div>
    </section>
  )
}
