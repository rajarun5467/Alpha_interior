import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function CostCalculator({ onOpenQuote }) {
  const [spaceType, setSpaceType] = useState('office');
  const [area, setArea] = useState(2500);
  const [packageType, setPackageType] = useState('premium');

  const rates = {
    essential: 950,   // ₹/sq ft
    premium: 1450,   // ₹/sq ft
    luxury: 2100     // ₹/sq ft
  };

  const calculateEstimate = () => {
    const rate = rates[packageType];
    const total = area * rate;
    const min = Math.round((total * 0.95) / 100000);
    const max = Math.round((total * 1.08) / 100000);
    return { min, max };
  };

  const calculateDays = () => {
    if (area <= 1500) return '25 - 30 Days';
    if (area <= 3500) return '35 - 45 Days';
    if (area <= 6000) return '45 - 60 Days';
    return '60 - 75 Days';
  };

  const estimate = calculateEstimate();
  const duration = calculateDays();

  return (
    <div className="card" data-reveal style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF8F5 100%)',
      borderRadius: '24px',
      padding: '2.75rem 2.25rem',
      boxShadow: 'var(--shadow-lg)',
      border: '2px solid rgba(245, 158, 11, 0.35)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#D97706',
          backgroundColor: '#FFFBEB',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          padding: '0.35rem 1rem',
          borderRadius: '20px',
          fontSize: '0.825rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} color="#D97706" /> Instant Interior Budget Estimator
        </span>
        <h3 style={{ fontSize: '2.2rem', color: '#0B1B36', fontFamily: 'var(--font-heading)', fontWeight: 900 }}>
          Calculate Your <span className="gradient-text-navy">Fit-Out Cost</span>
        </h3>
        <p style={{ color: '#475569', fontSize: '0.95rem' }}>Select your floor specifications below for an instant budget & timeline estimate.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="calculator-split">
        
        {/* Left Inputs */}
        <div>
          {/* 1. Space Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0B1B36', display: 'block', marginBottom: '0.6rem' }}>
              1. Select Space Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {[
                { id: 'office', label: 'Corporate Office' },
                { id: 'director', label: 'Executive Suite' },
                { id: 'school', label: 'School / Institute' },
                { id: 'commercial', label: 'Commercial Retail' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSpaceType(st.id)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'all 0.25s',
                    backgroundColor: spaceType === st.id ? '#0B1B36' : '#FFFFFF',
                    color: spaceType === st.id ? '#FBBF24' : '#475569',
                    border: spaceType === st.id ? '2px solid #F59E0B' : '1px solid #CBD5E1',
                    textAlign: 'center'
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Carpet Area Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0B1B36' }}>
                2. Approximate Carpet Area (Sq. Ft.)
              </label>
              <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#D97706', fontFamily: 'var(--font-heading)' }}>
                {area.toLocaleString()} sq ft
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="250"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#F59E0B',
                cursor: 'pointer',
                height: '8px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.25rem' }}>
              <span>500 sq ft</span>
              <span>5,000 sq ft</span>
              <span>15,000 sq ft</span>
            </div>
          </div>

          {/* 3. Package Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0B1B36', display: 'block', marginBottom: '0.6rem' }}>
              3. Select Interior Package
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
              {[
                { id: 'essential', title: 'Essential', price: '₹950/sq ft' },
                { id: 'premium', title: 'Premium', price: '₹1,450/sq ft' },
                { id: 'luxury', title: 'Ultra Executive', price: '₹2,100/sq ft' }
              ].map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setPackageType(pkg.id)}
                  style={{
                    padding: '0.65rem 0.5rem',
                    borderRadius: '10px',
                    transition: 'all 0.25s',
                    backgroundColor: packageType === pkg.id ? '#0B1B36' : '#FFFFFF',
                    color: packageType === pkg.id ? '#FFFFFF' : '#0B1B36',
                    border: packageType === pkg.id ? '2px solid #F59E0B' : '1px solid #CBD5E1',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: packageType === pkg.id ? '#FBBF24' : '#0B1B36' }}>{pkg.title}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{pkg.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Box */}
        <div style={{
          backgroundColor: '#040D1C',
          borderRadius: '20px',
          padding: '2rem 1.75rem',
          color: '#FFFFFF',
          border: '2px solid #F59E0B',
          boxShadow: 'var(--shadow-gold)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.1em' }}>
            Estimated Turnkey Investment
          </div>
          <div style={{
            fontSize: '2.6rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            color: '#FBBF24',
            margin: '0.3rem 0 0.5rem 0'
          }}>
            ₹{estimate.min} – ₹{estimate.max} <span style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>Lakhs*</span>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#CBD5E1' }}>Estimated Timeline:</span>
            <span style={{ fontWeight: 800, color: '#FBBF24' }}>{duration}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#94A3B8', textAlign: 'left', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#F59E0B" /> Includes 3D Layout Renders
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#F59E0B" /> Commercial Grade Materials & Partitions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={14} color="#F59E0B" /> 5-Year Warranty & Free Site Audit
            </div>
          </div>

          <button onClick={onOpenQuote} className="btn btn-gold" style={{ width: '100%', fontSize: '0.9rem' }}>
            Lock In This Estimate <ArrowRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .calculator-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
