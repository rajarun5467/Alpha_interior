import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TransformationPreview({ onOpenQuote }) {
  const [activeTab, setActiveTab] = useState('fitout');

  const tabs = [
    {
      id: 'raw',
      label: '01. Raw Space & Layout',
      title: 'Strategic Architectural Floor Planning',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      description: 'We evaluate carpet area, traffic flow, acoustic requirements, and departmental zoning to create an optimized architectural blueprint.',
      bullets: ['Traffic Flow Optimization', 'Acoustic Zoning Plan', 'Structural Compliance & MEP']
    },
    {
      id: 'design',
      label: '02. 3D Concept Design',
      title: 'Photorealistic 3D Renders & Material Selection',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      description: 'Experience your future workspace before construction begins with photorealistic lighting, custom veneer finishes, and glass partitions.',
      bullets: ['Lighting & Ceiling Renders', 'Custom Veneer & Laminates', 'Ergonomic Workstation Specs']
    },
    {
      id: 'fitout',
      label: '03. Turnkey Fit-Out',
      title: 'Complete Execution & On-Time Keys Handover',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      description: 'Single-point execution covering civil masonry, electrical fittings, HVAC ducting, modular furniture, and final project handover.',
      bullets: ['On-Time Handover Guarantee', 'Single Point Responsibility', '5-Year Post Handover Warranty']
    }
  ];

  const activeData = tabs.find(t => t.id === activeTab);

  return (
    <div data-reveal style={{
      background: 'linear-gradient(135deg, #040D1C 0%, #0B1B36 100%)',
      borderRadius: '24px',
      padding: '3rem 2.5rem',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-lg)',
      border: '2px solid rgba(245, 158, 11, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header & Tabs */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Interactive Transformation Showcase
        </span>
        <h3 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginTop: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: 900 }}>
          From Blank Canvas to <span style={{ color: '#F59E0B' }}>Inspired Workplace</span>
        </h3>

        {/* Tab Buttons */}
        <div className="transform-tab-row" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginTop: '1.75rem',
          flexWrap: 'wrap'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '30px',
                fontSize: '0.9rem',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                backgroundColor: activeTab === tab.id ? '#F59E0B' : 'rgba(255, 255, 255, 0.08)',
                color: activeTab === tab.id ? '#040D1C' : '#FFFFFF',
                border: activeTab === tab.id ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: activeTab === tab.id ? 'var(--shadow-gold)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Preview Display */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }} className="transformation-split">
        {/* Image Container */}
        <div style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          border: '2px solid rgba(245, 158, 11, 0.35)',
          height: '360px',
          position: 'relative'
        }}>
          <img 
            src={activeData.image} 
            alt={activeData.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.5s ease' }} 
          />
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '15px',
            backgroundColor: 'rgba(11, 27, 54, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#F59E0B',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 800,
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Layers size={14} /> Stage: {activeData.label}
          </div>
        </div>

        {/* Content Details */}
        <div>
          <h4 style={{ fontSize: '1.6rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '0.85rem' }}>
            {activeData.title}
          </h4>
          <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {activeData.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {activeData.bullets.map((bullet, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#F59E0B', fontWeight: 700, fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#F59E0B" /> <span style={{ color: '#FFFFFF' }}>{bullet}</span>
              </div>
            ))}
          </div>

          <button onClick={onOpenQuote} className="btn btn-gold">
            Plan Your Space Transformation <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .transformation-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
