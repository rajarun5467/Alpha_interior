import React from 'react';
import { Search, Compass, Palette, Wrench, ShieldCheck } from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Site Audit',
      desc: 'Free floor measurement, carpet area evaluation, and acoustic/flow requirement assessment.',
      icon: <Search size={22} color="#0B1B36" />
    },
    {
      num: '02',
      title: '3D Space Renders',
      desc: 'Photorealistic 3D layout visualization with lighting, custom veneers, and glass partitions.',
      icon: <Compass size={22} color="#0B1B36" />
    },
    {
      num: '03',
      title: 'Itemized Proposal',
      desc: 'Transparent material breakdown, fixed milestone timeline, and itemized budget lock-in.',
      icon: <Palette size={22} color="#0B1B36" />
    },
    {
      num: '04',
      title: 'Turnkey Execution',
      desc: 'Dedicated project manager executing civil, MEP, false ceiling, and modular furniture assembly.',
      icon: <Wrench size={22} color="#0B1B36" />
    },
    {
      num: '05',
      title: 'Handover & Warranty',
      desc: 'Zero-defect quality audit before final keys handover and 5-year post-handover warranty.',
      icon: <ShieldCheck size={22} color="#0B1B36" />
    }
  ];

  return (
    <div className="process-steps-row" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
      position: 'relative'
    }}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="glass-card"
          data-reveal
          data-reveal-delay={idx * 100}
          style={{
            padding: '1.75rem 1.25rem',
            position: 'relative',
            borderRadius: '18px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Step Number Tag */}
          <div style={{
            position: 'absolute',
            top: '-14px',
            backgroundColor: '#0B1B36',
            color: '#FBBF24',
            fontSize: '0.75rem',
            fontWeight: 900,
            padding: '0.2rem 0.75rem',
            borderRadius: '12px',
            border: '1px solid #F59E0B'
          }}>
            STEP {step.num}
          </div>

          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0.75rem 0 1rem 0',
            boxShadow: 'var(--shadow-gold)'
          }}>
            {step.icon}
          </div>

          <h4 style={{ fontSize: '1.05rem', color: '#0B1B36', fontWeight: 800, marginBottom: '0.4rem' }}>
            {step.title}
          </h4>

          <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5 }}>
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
