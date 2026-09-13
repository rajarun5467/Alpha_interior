import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ServiceCard({ title, description, image, icon, highlights, onOpenQuote, index }) {
  const formattedIndex = index !== undefined ? (index + 1 < 10 ? `0${index + 1}` : `${index + 1}`) : null;

  return (
    <div 
      className="card service-card-bright" 
      data-reveal
      data-reveal-delay={(index || 0) * 100}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        background: '#FFFFFF',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        boxShadow: 'var(--shadow-md)',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Top Image Container - 100% Bright, No Gradient */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img 
          src={image} 
          alt={title}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="service-card-img"
        />

        {/* Index Pill Tag Top Left */}
        {formattedIndex && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#040D1C',
            color: '#FBBF24',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            border: '1px solid #F59E0B',
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            fontFamily: 'var(--font-heading)',
            zIndex: 3
          }}>
            {formattedIndex} Service
          </div>
        )}

        {/* Circular Gold Icon Badge Top Right */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: '#F59E0B',
          color: '#040D1C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          border: '2px solid #FFFFFF',
          zIndex: 3
        }}>
          {icon}
        </div>
      </div>

      {/* Card Body - Bright & Clear */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{
          fontSize: '1.3rem',
          color: '#0B1B36',
          fontWeight: 800,
          marginBottom: '0.6rem',
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.25
        }}>
          {title}
        </h3>

        <p style={{
          color: '#475569',
          fontSize: '0.9rem',
          lineHeight: 1.55,
          marginBottom: '1.25rem',
          flexGrow: 1
        }}>
          {description}
        </p>

        {/* Highlights List */}
        {highlights && (
          <div style={{
            marginBottom: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backgroundColor: '#F8FAFC',
            padding: '0.85rem 1rem',
            borderRadius: '12px',
            border: '1px solid #F1F5F9'
          }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ fontSize: '0.85rem', color: '#0B1B36', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFBEB',
                  border: '1px solid #F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={11} color="#D97706" strokeWidth={3} />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button Footer */}
        <button 
          onClick={onOpenQuote}
          className="service-cta-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            width: '100%',
            color: '#0B1B36',
            fontWeight: 800,
            fontSize: '0.875rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid #F1F5F9',
            transition: 'all 0.3s ease'
          }}
        >
          <span>Request Custom Proposal</span>
          <div className="arrow-circle" style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#FFFBEB',
            border: '1px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#D97706',
            transition: 'all 0.3s ease'
          }}>
            <ArrowRight size={15} />
          </div>
        </button>

      </div>

      <style>{`
        .service-card-bright:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(11, 27, 54, 0.14);
          border-color: #F59E0B;
        }
        .service-card-bright:hover .service-card-img {
          transform: scale(1.08);
        }
        .service-card-bright:hover .service-cta-btn {
          color: #D97706;
        }
        .service-card-bright:hover .arrow-circle {
          background-color: #F59E0B;
          color: #040D1C;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
