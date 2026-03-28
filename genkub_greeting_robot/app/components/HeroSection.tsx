'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

/* ── tiny particle dot ── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <span
      style={{
        position: 'absolute',
        width: 3,
        height: 3,
        borderRadius: '50%',
        background: 'rgba(108,99,255,0.8)',
        animation: 'particle-drift 3s ease-out infinite',
        ...style,
      }}
    />
  );
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  /* Subtle parallax on mouse move */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { width, height } = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX / width  - 0.5) * 30,
        y: (e.clientY / height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    left:  `${Math.random() * 100}%`,
    top:   `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${2.5 + Math.random() * 3}s`,
  }));

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #0a0a1a 100%)',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Background grid ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'grid-fade 6s ease-in-out infinite',
          zIndex: 0,
        }}
      />

      {/* ── Gradient orbs ── */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          top: '-150px',
          left: '-100px',
          animation: 'float-orb 12s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
          bottom: '-100px',
          right: '10%',
          animation: 'float-orb2 14s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,101,132,0.08) 0%, transparent 70%)',
          top: '40%',
          left: '40%',
          animation: 'float-orb 18s ease-in-out infinite reverse',
          zIndex: 0,
        }}
      />

      {/* ── Particles ── */}
      {particles.map((p, i) => (
        <Particle
          key={i}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
          }}
        />
      ))}

      {/* ── Spline 3D scene (right half) ── */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: `translate(${mousePos.x * 0.4}px, calc(-50% + ${mousePos.y * 0.3}px))`,
          width: '65%',
          height: '100%',
          transition: 'transform 0.15s ease-out',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease, transform 0.15s ease-out',
        }}
      >
        {/* scan line effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.3), transparent)',
              animation: 'scan-line 4s linear infinite',
            }}
          />
        </div>

        <Spline
          scene="https://prod.spline.design/J2GRqx58BZMeK6OP/scene.splinecode"
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* ── Loading skeleton ── */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '60%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid rgba(108,99,255,0.2)',
              borderTop: '3px solid #6c63ff',
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── Left gradient veil ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '55%',
          height: '100%',
          background: 'linear-gradient(90deg, #0a0a1a 50%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '55%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 6% 0 8%',
          zIndex: 3,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            border: '1px solid rgba(108,99,255,0.4)',
            background: 'rgba(108,99,255,0.1)',
            backdropFilter: 'blur(10px)',
            width: 'fit-content',
            marginBottom: 28,
            animation: 'badge-pop 0.8s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#6c63ff',
              animation: 'pulse-ring 2s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          <span
            style={{ color: 'rgba(200,197,255,0.9)', fontSize: 13, letterSpacing: 1.5, fontWeight: 600, textTransform: 'uppercase' }}
          >
            AI Greeting Robot
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            animation: 'fade-up 0.9s 0.2s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          <span style={{ color: '#fff', display: 'block' }}>Meet Your</span>
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(90deg, #6c63ff, #00d4ff, #ff6584, #6c63ff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite, fade-up 0.9s 0.35s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            Intelligent
          </span>
          <span style={{ color: '#fff', display: 'block' }}>Companion</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: 'rgba(180,180,210,0.8)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            lineHeight: 1.7,
            maxWidth: 440,
            marginBottom: 44,
            animation: 'fade-up 0.9s 0.5s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          GenKub은 AI 기반의 인사 로봇입니다. 자연스러운 대화와 3D 인터랙션으로 방문객을 맞이하는 새로운 경험을 제공합니다.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            animation: 'fade-up 0.9s 0.65s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          <button
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #6c63ff, #4a42dd)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              animation: 'cta-glow 3s ease-in-out infinite',
              letterSpacing: 0.5,
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
          >
            지금 시작하기 →
          </button>
          <button
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: '1px solid rgba(108,99,255,0.4)',
              background: 'rgba(108,99,255,0.08)',
              backdropFilter: 'blur(10px)',
              color: 'rgba(200,197,255,0.9)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: 0.5,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(108,99,255,0.18)';
              e.currentTarget.style.borderColor = 'rgba(108,99,255,0.7)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(108,99,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            더 알아보기
          </button>
          <button
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: '1px solid rgba(0,212,255,0.4)',
              background: 'rgba(0,212,255,0.08)',
              backdropFilter: 'blur(10px)',
              color: 'rgba(150,230,255,0.9)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: 0.5,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.18)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.7)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            티칭 시작하기
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 56,
            animation: 'fade-up 0.9s 0.8s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {[
            { value: '99%', label: '인식 정확도' },
            { value: '0.3s', label: '응답 속도' },
            { value: '24/7', label: '무중단 운영' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                style={{
                  fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #fff, rgba(108,99,255,0.8))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {value}
              </div>
              <div style={{ color: 'rgba(140,140,170,0.8)', fontSize: 12, letterSpacing: 0.5 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 4,
          animation: 'fade-in 1s 1.2s both',
        }}
      >
        <span style={{ color: 'rgba(140,140,170,0.5)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div
          style={{
            width: 24,
            height: 38,
            border: '1.5px solid rgba(108,99,255,0.3)',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'rgba(108,99,255,0.7)',
              animation: 'scroll-dot 2s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes scroll-dot {
              0%   { transform: translateY(0);   opacity: 1; }
              80%  { transform: translateY(14px); opacity: 0; }
              100% { transform: translateY(0);   opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
