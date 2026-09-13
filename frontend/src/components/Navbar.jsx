import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="top-bar" style={{
        background: '#07152B',
        color: '#CBD5E1',
        fontSize: '0.825rem',
        padding: '0.4rem 0',
        borderBottom: '1px solid rgba(217, 164, 65, 0.2)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="#D9A441" /> Turnkey Fit-Out Contractor & Office Designers
            </span>
            <span style={{ color: '#64748B' }}>|</span>
            <span>Serving Noida, Delhi NCR & Pan-India</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="tel:+918178782919" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F3C663', fontWeight: 600 }}>
              <Phone size={13} /> +91 8178782919
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky-nav ${isScrolled ? 'scrolled' : ''}`} style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: isScrolled ? 'rgba(11, 31, 58, 0.96)' : '#0B1F3A',
        backdropFilter: 'blur(10px)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}>
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <img src="/logo.jpg" alt="Alpha Office Interior Logo" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}>
                ALPHA <span style={{ color: '#D9A441' }}>OFFICE</span>
              </div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                color: '#94A3B8',
                letterSpacing: '0.18em',
                textTransform: 'uppercase'
              }}>
                INTERIOR
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  color: activePage === item.id ? '#D9A441' : '#FFFFFF',
                  fontWeight: activePage === item.id ? 700 : 500,
                  fontSize: '0.95rem',
                  padding: '0.4rem 0.2rem',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                  borderBottom: activePage === item.id ? '2px solid #D9A441' : '2px solid transparent'
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={onOpenQuoteModal} 
              className="btn btn-gold desktop-cta"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
            >
              Get a Free Quote <ArrowRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-hamburger"
              aria-label="Toggle menu"
              style={{ color: '#FFFFFF', padding: '0.4rem' }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer" style={{
            backgroundColor: '#07152B',
            borderTop: '1px solid rgba(217, 164, 65, 0.2)',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    textAlign: 'left',
                    color: activePage === item.id ? '#D9A441' : '#FFFFFF',
                    fontSize: '1.1rem',
                    fontWeight: activePage === item.id ? 700 : 500,
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenQuoteModal(); }} 
              className="btn btn-gold" 
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Get a Free Quote <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .desktop-menu, .desktop-cta {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-hamburger, .mobile-drawer {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
