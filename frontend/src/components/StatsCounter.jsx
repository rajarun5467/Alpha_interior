import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Calendar, Briefcase, Clock, HeartHandshake } from 'lucide-react';

const stats = [
  {
    icon: Briefcase,
    target: 150,
    suffix: '+',
    label: 'Projects Completed',
    desc: 'Delivered across India',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.35)',
  },
  {
    icon: HeartHandshake,
    target: 100,
    suffix: '+',
    label: 'Happy Clients',
    desc: 'Long-term partnerships',
    color: '#FBBF24',
    glow: 'rgba(251,191,36,0.3)',
  },
  {
    icon: Calendar,
    target: 5,
    suffix: '+',
    label: 'Years of Experience',
    desc: 'In office fit-out industry',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.35)',
  },
  {
    icon: Users,
    target: 25,
    suffix: '+',
    label: 'Expert Professionals',
    desc: 'Designers & project leads',
    color: '#FBBF24',
    glow: 'rgba(251,191,36,0.3)',
  },
  {
    icon: Clock,
    target: 95,
    suffix: '%',
    label: 'On-Time Delivery',
    desc: 'Project deadlines met',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.35)',
  },
  {
    icon: Award,
    target: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    desc: 'Across all engagements',
    color: '#FBBF24',
    glow: 'rgba(251,191,36,0.3)',
  },
];

export default function StatsCounter() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setHasAnimated(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #040D1C 0%, #071428 40%, #0B1F3A 100%)',
        padding: '6rem 0 7rem',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glows */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-80px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-80px',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      {/* Thin horizontal rule accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '120px', height: '3px',
        background: 'linear-gradient(90deg, transparent, #F59E0B, transparent)',
      }} />

      <div className="container">
        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-reveal>
          <span style={{
            display: 'inline-block',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F59E0B',
            background: 'rgba(245,158,11,0.10)',
            border: '1px solid rgba(245,158,11,0.25)',
            padding: '0.4rem 1.2rem',
            borderRadius: '40px',
            marginBottom: '1.25rem',
          }}>
            Our Impact In Numbers
          </span>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 1rem',
            lineHeight: 1.2,
          }}>
            Delivering{' '}
            <span style={{
              background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Proven
            </span>{' '}
            Fit-Out Excellence
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#94A3B8',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Numbers that reflect our commitment to quality, precision, and client trust — built project by project.
          </p>
        </div>

        {/* ── 3 × 2 Stats Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '1rem',
        }}
          className="stats-grid"
          data-reveal
          data-reveal-delay="150"
        >
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} animate={hasAnimated} delay={idx * 120} />
          ))}
        </div>
      </div>

      {/* Responsive grid breakpoints */}
      <style>{`
        @media (max-width: 1100px) {
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.75rem !important; }
          .stat-card { padding: 1.25rem 0.5rem 1rem !important; }
        }
        @keyframes statFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .stat-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(245,158,11,0.18);
          border-radius: 16px;
          padding: 1.5rem 0.75rem 1.25rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: default;
          animation: statFloat 4.5s ease-in-out infinite;
        }
        .stat-card:nth-child(2) { animation-delay: 0.4s; }
        .stat-card:nth-child(3) { animation-delay: 0.8s; }
        .stat-card:nth-child(4) { animation-delay: 1.2s; }
        .stat-card:nth-child(5) { animation-delay: 1.6s; }
        .stat-card:nth-child(6) { animation-delay: 2s; }
        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(245,158,11,0.05) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .stat-card:hover {
          animation-play-state: paused;
          transform: translateY(-8px);
          border-color: rgba(245,158,11,0.45);
          box-shadow: 0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(245,158,11,0.15);
        }
        .stat-card:hover::before { opacity: 1; }
        @keyframes iconFlip {
          0% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.12); }
          100% { transform: rotateY(360deg) scale(1.08); }
        }
        .stat-card:hover .icon-badge {
          box-shadow: 0 0 28px var(--glow), 0 0 8px var(--glow);
          animation: iconFlip 0.7s ease forwards;
        }
        .icon-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(245,158,11,0.12);
          border: 1.5px solid rgba(245,158,11,0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.9rem;
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }
      `}</style>
    </section>
  );
}

function StatCard({ stat, animate, delay }) {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const duration = 1800;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = stat.target / steps;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += increment;
        if (start >= stat.target) {
          setCount(stat.target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [animate, stat.target, delay]);

  return (
    <div className="stat-card" style={{ '--glow': stat.glow }}>
      {/* Corner shine */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '80px', height: '80px',
        background: 'radial-gradient(circle at 100% 0%, rgba(245,158,11,0.08), transparent 70%)',
        borderRadius: '0 20px 0 0',
        pointerEvents: 'none',
      }} />

      {/* Icon badge */}
      <div className="icon-badge" style={{ '--glow': stat.glow }}>
        <Icon size={22} color={stat.color} strokeWidth={1.7} />
      </div>

      {/* Count */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
        fontWeight: 900,
        lineHeight: 1,
        background: `linear-gradient(135deg, ${stat.color}, #FBBF24)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.4rem',
      }}>
        {count}{stat.suffix}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.82rem',
        fontWeight: 700,
        color: '#E2E8F0',
        marginBottom: '0.25rem',
      }}>
        {stat.label}
      </div>

      {/* Sub-desc */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        color: '#64748B',
        letterSpacing: '0.03em',
      }}>
        {stat.desc}
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '40px', height: '2px',
        background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
        borderRadius: '2px',
      }} />
    </div>
  );
}
