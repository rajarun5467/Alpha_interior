import React from 'react';
import { ArrowRight } from 'lucide-react';
import AboutSection from '../components/AboutSection';
import SkylineVector from '../components/SkylineVector';
import FaqAccordion from '../components/FaqAccordion';

export default function AboutPage({ setActivePage, onOpenQuoteModal }) {
  return (
    <div className="about-page">
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #040D1C 0%, #0B1B36 100%)',
        padding: '4.5rem 0 4rem 0',
        color: '#FFFFFF',
        position: 'relative',
        borderBottom: '4px solid #F59E0B'
      }}>
        {/* Dot Matrix Pattern */}
        <div className="dot-grid-pattern-dark" style={{
          position: 'absolute',
          top: '20px',
          right: '40px',
          width: '180px',
          height: '120px',
          opacity: 0.5,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 data-reveal style={{ fontSize: '3.2rem', color: '#FFFFFF', marginTop: '0.4rem', fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>
            About Alpha Office Interior
          </h1>
          <p data-reveal data-reveal-delay="150" style={{ color: '#FBBF24', fontSize: '1.2rem', maxWidth: '700px', margin: '0.5rem auto 0', fontWeight: 600 }}>
            Designing Inspiring Workspaces with Innovation & Excellence
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <SkylineVector opacity={0.25} fill="#F59E0B" height="40px" />
        </div>
      </section>

      {/* Main Interactive About Section */}
      <AboutSection setActivePage={setActivePage} onOpenQuoteModal={onOpenQuoteModal} />

      {/* FAQ Accordion Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">Frequently Asked <span className="gradient-text-navy">Questions</span></h2>
            <p className="section-desc">Clear answers regarding space planning, turnkey execution timelines, and warranties.</p>
          </div>

          <div data-reveal data-reveal-delay="150">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #040D1C 0%, #0B1B36 100%)',
        padding: '5.5rem 0',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }} data-reveal="scale">
          <h2 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '1.25rem', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}>
            Let's Create Something Extraordinary Together
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#CBD5E1', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
            Transform your workplace into a high-performance environment designed to boost employee productivity and corporate brand value.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenQuoteModal} className="btn btn-gold btn-lg">
              Book Free Consultation <ArrowRight size={18} />
            </button>
            <button onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-outline-white btn-lg">
              Contact Our Noida Team
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <SkylineVector opacity={0.3} fill="#F59E0B" height="60px" />
        </div>
      </section>
    </div>
  );
}
