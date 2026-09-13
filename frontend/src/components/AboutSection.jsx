import React, { useState, useEffect } from 'react';
import {
  Compass, Award, Clock, HeartHandshake, CheckCircle2,
  Users, ShieldCheck, ArrowRight, Sparkles, Building,
  Phone, Wrench, Target, Star, Zap, Globe, TrendingUp,
  LayoutDashboard, Layers, GitMerge, Settings
} from 'lucide-react';
import API from '../api/client.js';

const TABS = [
  { id: 'overview',  label: 'Company Overview',        icon: Building    },
  { id: 'values',   label: '4 Core Values',            icon: Star        },
  { id: 'whyus',    label: 'Why Choose Us',             icon: Award       },
  { id: 'team',     label: '25+ Expert Team',           icon: Users       },
];

const coreValues = [
  {
    title: 'Tailored Designs',
    subtitle: 'Custom Workspace Architecture',
    desc: 'Customized interior solutions designed to match your business culture, acoustic needs, and spatial workflow requirements.',
    icon: Compass, num: '01',
    color: '#F59E0B',
  },
  {
    title: 'Premium Materials',
    subtitle: 'Commercial Grade Durability',
    desc: 'We use high-density laminates, toughened acoustic glass, and heavy-duty steel built for long-lasting performance.',
    icon: Award, num: '02',
    color: '#FBBF24',
  },
  {
    title: 'On-Time Delivery',
    subtitle: 'Milestone-Driven Execution',
    desc: 'Every project planned and executed within committed timelines using professional milestone tracking systems.',
    icon: Clock, num: '03',
    color: '#F59E0B',
  },
  {
    title: 'Client Satisfaction',
    subtitle: 'End-to-End Dedicated Support',
    desc: 'Transparent pricing, zero hidden costs, dedicated project managers, and reliable 5-year warranty support.',
    icon: HeartHandshake, num: '04',
    color: '#FBBF24',
  },
];

const whyItems = [
  { title: 'Complete Turnkey Interior Solutions', cat: 'Turnkey', icon: Layers },
  { title: 'Glass Partition & Cabin Design', cat: 'Partitions', icon: LayoutDashboard },
  { title: 'Timely Project Delivery', cat: 'Timeline', icon: Clock },
  { title: 'Innovative Space Planning', cat: 'Design', icon: Compass },
  { title: 'Electrical & Civil Work', cat: 'MEP', icon: Zap },
  { title: 'Dedicated After-Sales Support', cat: 'Warranty', icon: ShieldCheck },
  { title: 'Modern Office Furniture', cat: 'Furniture', icon: Settings },
  { title: 'Transparent Pricing', cat: 'Pricing', icon: TrendingUp },
  { title: 'Quality Assurance', cat: 'Quality', icon: Star },
  { title: 'False Ceiling & Lighting', cat: 'Ceiling', icon: Sparkles },
  { title: 'Experienced Project Management', cat: 'Management', icon: GitMerge },
  { title: 'End-to-End Turnkey Services', cat: 'Execution', icon: Globe },
];

const teamStrengths = [
  {
    role: '3D Space Architects',
    count: '5+ Specialists',
    desc: 'Transforming floor plans into photorealistic 3D renders that clients can walk through before build.',
    icon: Compass,
    bg: 'linear-gradient(135deg,#0B1B36,#1E3A5F)',
  },
  {
    role: 'Project Engineers & MEP',
    count: '8+ Engineers',
    desc: 'Executing electrical, plumbing, HVAC & civil masonry with precision and code compliance.',
    icon: Zap,
    bg: 'linear-gradient(135deg,#0B1B36,#1E3A5F)',
  },
  {
    role: 'Modular Furniture Craftsmen',
    count: '10+ Technicians',
    desc: 'Custom desk assembly, acoustic pods & premium wood paneling installed with zero-gap precision.',
    icon: Settings,
    bg: 'linear-gradient(135deg,#0B1B36,#1E3A5F)',
  },
  {
    role: 'Quality Audit Managers',
    count: '4+ Inspectors',
    desc: 'Ensuring zero defects with multi-stage quality checks before final keys handover to the client.',
    icon: ShieldCheck,
    bg: 'linear-gradient(135deg,#0B1B36,#1E3A5F)',
  },
];

export default function AboutSection({ setActivePage, onOpenQuoteModal }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [pullQuote, setPullQuote] = useState('');

  useEffect(() => {
    API.get('/about-content').then((res) => {
      if (res.data && res.data.pullQuote) {
        const q = res.data.pullQuote;
        setPullQuote(typeof q === 'string' ? q : (q.text || ''));
      }
    }).catch(() => {});
  }, []);

  return (
    <section style={{
      background: 'linear-gradient(180deg,#F0F4FF 0%,#FFFFFF 100%)',
      padding: '7rem 0 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(11,27,54,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(11,27,54,0.025) 1px,transparent 1px)',
        backgroundSize: '52px 52px',
      }} />
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} data-reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ height: '1.5px', width: '48px', background: 'linear-gradient(90deg,transparent,#F59E0B)' }} />
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#F59E0B',
            }}>About Us</span>
            <div style={{ height: '1.5px', width: '48px', background: 'linear-gradient(90deg,#F59E0B,transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem,4vw,3.25rem)',
            fontWeight: 900, color: '#040D1C', margin: '0 0 0.75rem', lineHeight: 1.15,
          }}>
            About{' '}
            <span style={{ background: 'linear-gradient(90deg,#D97706,#F59E0B,#FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Alpha Office Interior
            </span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            {pullQuote || 'Designing inspiring workspaces with innovation & excellence — since 2019.'}
          </p>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="tab-nav-row" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3.5rem', flexWrap: 'wrap' }} data-reveal data-reveal-delay="150">
          {TABS.map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.5rem', borderRadius: '50px',
                fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                border: active ? '1.5px solid #F59E0B' : '1.5px solid #E2E8F0',
                background: active ? '#040D1C' : '#FFFFFF',
                color: active ? '#FBBF24' : '#64748B',
                boxShadow: active ? '0 8px 24px rgba(4,13,28,0.2)' : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.25s ease',
              }}>
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════
            TAB 1: Company Overview
        ══════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }} className="about-split">

              {/* LEFT — Stacked image composition */}
              <div style={{ position: 'relative', paddingBottom: '2rem', paddingRight: '1.5rem' }} data-reveal="left">
                {/* Main image */}
                <div style={{
                  borderRadius: '28px', overflow: 'hidden',
                  boxShadow: '0 32px 72px rgba(4,13,28,0.18)',
                  height: '420px',
                  border: '2px solid rgba(245,158,11,0.2)',
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=900&q=85"
                    alt="Alpha Office Reception"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top,rgba(4,13,28,0.4) 0%,transparent 50%)',
                    borderRadius: '28px',
                  }} />
                </div>

                {/* Offset secondary image */}
                <div style={{
                  position: 'absolute', bottom: '-10px', right: '-10px',
                  width: '240px', height: '165px', borderRadius: '20px', overflow: 'hidden',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
                  border: '3px solid #FFFFFF',
                }} className="badge-hide-mobile hide-mobile">
                  <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"
                    alt="Executive Office"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Experience badge */}
                <div style={{
                  position: 'absolute', top: '-16px', left: '-16px',
                  background: 'linear-gradient(135deg,#040D1C,#0B1B36)',
                  border: '2px solid #F59E0B',
                  borderRadius: '20px', padding: '1rem 1.5rem',
                  boxShadow: '0 12px 36px rgba(245,158,11,0.25)',
                  display: 'flex', alignItems: 'center', gap: '0.9rem',
                }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FBBF24', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>5+</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.4, fontWeight: 700 }}>
                    Years Of<br />Fit-Out Excellence
                  </div>
                </div>

                {/* Projects badge */}
                <div style={{
                  position: 'absolute', bottom: '40px', left: '-16px',
                  background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
                  borderRadius: '16px', padding: '0.8rem 1.2rem',
                  boxShadow: '0 12px 36px rgba(4,13,28,0.12), 0 0 0 1px rgba(245,158,11,0.15)',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }} className="floating-stat-card badge-hide-mobile">
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: 'linear-gradient(135deg,#F59E0B,#FBBF24)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Award size={18} color="#040D1C" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#040D1C', lineHeight: 1 }}>150+</div>
                    <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>Projects Delivered</div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Content */}
              <div data-reveal="right">
                {/* Label */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#FFFBEB', border: '1px solid rgba(245,158,11,0.4)',
                  padding: '0.4rem 1rem', borderRadius: '50px',
                  fontSize: '0.75rem', fontWeight: 800, color: '#D97706',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginBottom: '1.25rem',
                }}>
                  <Building size={13} color="#D97706" /> Turnkey Fit-Out Specialist
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.4rem)',
                  fontWeight: 900, color: '#040D1C', lineHeight: 1.2, marginBottom: '1.25rem',
                }}>
                  Transforming Raw Floors Into{' '}
                  <span style={{ background: 'linear-gradient(90deg,#D97706,#FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Inspiring Workspaces
                  </span>
                </h3>

                <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8, marginBottom: '0.85rem', fontWeight: 500 }}>
                  Alpha Office Interior specializes in creating modern, functional office interiors that enhance productivity and reflect your brand identity.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.75, marginBottom: '2rem' }}>
                  From concept planning & 3D space layout to turnkey execution and final keys handover — we provide complete interior solutions with premium materials, expert craftsmanship, and guaranteed on-time delivery.
                </p>

                {/* 3 feature rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.25rem' }}>
                  {[
                    { title: 'Complete Turnkey Fit-Out Execution', desc: 'Civil, MEP, electrical, false ceiling, glass partitions & modular furniture under one contract.', Icon: Wrench },
                    { title: 'Guaranteed Milestone Handover', desc: 'Milestone progress tracking ensures your office floor is delivered strictly on schedule.', Icon: Clock },
                    { title: '5-Year Post Handover Support', desc: 'Zero hidden charges, dedicated project managers & post-installation warranty included.', Icon: ShieldCheck },
                  ].map(({ title, desc, Icon }, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '1rem', alignItems: 'flex-start',
                      background: '#FFFFFF', border: '1px solid #E8EDF5',
                      borderLeft: '4px solid #F59E0B',
                      borderRadius: '14px', padding: '1rem 1.25rem',
                      boxShadow: '0 2px 12px rgba(11,27,54,0.05)',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(245,158,11,0.12)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(11,27,54,0.05)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                        background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={17} color="#D97706" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#040D1C', fontWeight: 800, marginBottom: '0.2rem' }}>{title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="cta-btn-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button onClick={onOpenQuoteModal} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    background: 'linear-gradient(135deg,#D97706,#F59E0B)',
                    color: '#040D1C', fontWeight: 800, fontSize: '0.9rem',
                    padding: '0.9rem 1.8rem', borderRadius: '50px', border: 'none',
                    cursor: 'pointer', boxShadow: '0 8px 28px rgba(245,158,11,0.4)',
                    letterSpacing: '0.03em',
                  }}>
                    Book Free Consultation <ArrowRight size={16} />
                  </button>
                  <a href="tel:+918178782919" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    fontWeight: 700, fontSize: '0.88rem', color: '#040D1C',
                    padding: '0.85rem 1.5rem', borderRadius: '50px',
                    border: '1.5px solid #CBD5E1', background: '#FFFFFF',
                    textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                  }}>
                    <Phone size={15} color="#0B1B36" /> Call +91 8178782919
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 2: Core Values
        ══════════════════════════════════════ */}
        {activeTab === 'values' && (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.75rem' }} className="values-grid">
              {coreValues.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} style={{
                    background: '#FFFFFF', borderRadius: '24px',
                    border: '1px solid rgba(245,158,11,0.18)',
                    boxShadow: '0 8px 32px rgba(11,27,54,0.07)',
                    padding: '2.25rem 2rem', position: 'relative', overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 56px rgba(245,158,11,0.12)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(11,27,54,0.07)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.18)'; }}
                  >
                    {/* Number watermark */}
                    <div style={{
                      position: 'absolute', top: '1.5rem', right: '1.75rem',
                      fontSize: '4rem', fontWeight: 900, color: 'rgba(245,158,11,0.06)',
                      fontFamily: 'var(--font-heading)', lineHeight: 1, userSelect: 'none',
                    }}>{v.num}</div>

                    {/* Icon */}
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '18px',
                      background: 'linear-gradient(135deg,#F59E0B,#FBBF24)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.5rem',
                      boxShadow: '0 8px 24px rgba(245,158,11,0.35)',
                    }}>
                      <Icon size={26} color="#040D1C" strokeWidth={2} />
                    </div>

                    <h4 style={{ fontSize: '1.2rem', color: '#040D1C', fontWeight: 900, marginBottom: '0.3rem' }}>{v.title}</h4>
                    <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.85rem' }}>{v.subtitle}</div>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>

                    {/* Bottom accent */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '3px', background: 'linear-gradient(90deg,#F59E0B,#FBBF24,transparent)',
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 3: Why Choose Us (12 strengths)
        ══════════════════════════════════════ */}
        {activeTab === 'whyus' && (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <div style={{
              background: 'linear-gradient(135deg,#040D1C 0%,#0B1B36 100%)',
              borderRadius: '28px', overflow: 'hidden',
              boxShadow: '0 24px 72px rgba(4,13,28,0.25)',
            }}>
              {/* Header */}
              <div style={{
                padding: '2rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: 'rgba(245,158,11,0.05)',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,#F59E0B,#FBBF24)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Award size={22} color="#040D1C" />
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Our Edge</div>
                  <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', fontWeight: 900, margin: 0 }}>
                    Why Choose Alpha Office Interior?{' '}
                    <span style={{ color: '#F59E0B', fontSize: '0.9rem', fontWeight: 700 }}>— 12 Core Strengths</span>
                  </h3>
                </div>
              </div>

              {/* Grid */}
              <div style={{ padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }} className="whyus-grid">
                {whyItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
                      background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.07)',
                      padding: '1.1rem 1.25rem',
                      transition: 'all 0.25s ease', cursor: 'default',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,158,11,0.08)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                    >
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
                        background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={16} color="#FBBF24" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.2rem' }}>{item.cat}</div>
                        <div style={{ fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 700, lineHeight: 1.35 }}>{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 4: Expert Team
        ══════════════════════════════════════ */}
        {activeTab === 'team' && (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            {/* Hero stat row */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem',
              marginBottom: '2.5rem',
            }} className="team-stats">
              {[
                { val: '25+', label: 'Expert Professionals', sub: 'In-house team' },
                { val: '100%', label: 'Client Satisfaction', sub: 'Across all projects' },
                { val: '5+', label: 'Years Experience', sub: 'In office interiors' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(135deg,#040D1C,#0B1B36)',
                  borderRadius: '20px', padding: '2rem', textAlign: 'center',
                  border: '1px solid rgba(245,158,11,0.2)',
                  boxShadow: '0 12px 36px rgba(4,13,28,0.15)',
                }}>
                  <div style={{
                    fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 900, lineHeight: 1,
                    background: 'linear-gradient(90deg,#F59E0B,#FBBF24)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    fontFamily: 'var(--font-heading)', marginBottom: '0.4rem',
                  }}>{s.val}</div>
                  <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{s.label}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Team role cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }} className="team-grid">
              {teamStrengths.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <div key={idx} style={{
                    background: '#FFFFFF', borderRadius: '22px',
                    border: '1px solid rgba(245,158,11,0.18)',
                    boxShadow: '0 8px 28px rgba(11,27,54,0.06)',
                    padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.boxShadow = '0 20px 52px rgba(245,158,11,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.18)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(11,27,54,0.06)'; }}
                  >
                    <div style={{
                      width: '58px', height: '58px', borderRadius: '16px', flexShrink: 0,
                      background: 'linear-gradient(135deg,#040D1C,#0B1B36)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(4,13,28,0.2)',
                    }}>
                      <Icon size={24} color="#FBBF24" strokeWidth={1.7} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.05rem', color: '#040D1C', fontWeight: 900, marginBottom: '0.2rem' }}>{t.role}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 800, display: 'block', marginBottom: '0.6rem' }}>{t.count}</span>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ── Full-width Pull Quote ── */}
      <div style={{
        background: 'linear-gradient(120deg,#040D1C 0%,#0B1B36 50%,#071428 100%)',
        marginTop: '5rem', padding: '3.5rem 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg,transparent,#F59E0B 30%,#FBBF24 50%,#F59E0B 70%,transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '-80px', right: '10%', width: '350px', height: '350px',
          background: 'radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }} data-reveal="scale">
          <p style={{
            fontSize: 'clamp(1.3rem,2.5vw,1.85rem)', color: '#FFFFFF',
            fontStyle: 'italic', maxWidth: '820px', margin: '0 auto 1.5rem',
            fontFamily: 'var(--font-heading)', lineHeight: 1.5, fontWeight: 600,
          }}>
            We don't just design offices — we create{' '}
            <span style={{ background: 'linear-gradient(90deg,#F59E0B,#FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 900 }}>
              productive, inspiring workspaces
            </span>{' '}
            that help businesses grow.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(245,158,11,0.4)' }} />
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Alpha Office Interior</span>
            <div style={{ height: '1px', width: '40px', background: 'rgba(245,158,11,0.4)' }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-split { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .whyus-grid  { grid-template-columns: 1fr 1fr !important; }
          .team-grid   { grid-template-columns: 1fr !important; }
          .team-stats  { grid-template-columns: 1fr !important; }
          .badge-hide-mobile { display: none !important; }
        }
        @media (max-width: 560px) {
          .whyus-grid  { grid-template-columns: 1fr !important; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
