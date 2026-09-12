import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

export default function LightboxModal({ project, onClose, onOpenQuote }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 1.5rem',
          backgroundColor: '#0B1F3A',
          color: '#FFFFFF',
          borderBottom: '2px solid #D9A441'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#D9A441', fontWeight: 700 }}>
              {project.category}
            </span>
            <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: 0 }}>{project.title}</h3>
          </div>
          <button onClick={onClose} style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', maxHeight: '420px', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Project Overview</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {project.description}
              </p>

              {project.features && (
                <div>
                  <h5 style={{ fontSize: '0.95rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Key Highlights</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {project.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: '#475569' }}>
                        <Check size={14} color="#D9A441" /> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: '#F5F6F8', padding: '1.25rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 600 }}>
                  Fit-Out Solution
                </span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', margin: '0.2rem 0 1rem 0' }}>
                  Turnkey Execution
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div><strong>Client Type:</strong> Corporate / Commercial</div>
                  <div><strong>Delivery:</strong> Guaranteed On-Time</div>
                  <div><strong>Material:</strong> Premium Commercial Grade</div>
                </div>
              </div>

              <button 
                onClick={() => { onClose(); onOpenQuote(); }} 
                className="btn btn-gold" 
                style={{ width: '100%', marginTop: '1.25rem', fontSize: '0.85rem' }}
              >
                Inquire Similar Design <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
