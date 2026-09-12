import React from 'react';

export default function MarqueeLogos() {
  const logos = [
    'Wipro Technologies',
    'Pinaakee Digital',
    'TechVision Global',
    'Nexus Business Park',
    'Apex Knowledge Academy',
    'Innova Logistics',
    'Skyline Infra Tech',
    'Zenith Corporate Solutions'
  ];

  return (
    <div style={{
      backgroundColor: '#040D1C',
      padding: '1.75rem 0',
      overflow: 'hidden',
      borderTop: '3px solid #F59E0B',
      borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
      position: 'relative'
    }}>
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: '#F59E0B',
        fontWeight: 800,
        marginBottom: '1rem'
      }}>
        Trusted By Corporate Enterprises & Institutional Partners
      </div>

      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div className="marquee-track" style={{ display: 'inline-flex', gap: '4rem', alignItems: 'center' }}>
          {logos.concat(logos).map((logo, idx) => (
            <div
              key={idx}
              style={{
                fontSize: '1.4rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 0.4)',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.color = '#F59E0B'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
