import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, PinterestIcon } from './SocialIcons';
import API from '../api/client.js';

export default function Footer({ setActivePage, onOpenQuoteModal }) {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    API.get('/settings').then((res) => { if (res.data) setSettings(res.data); }).catch(() => {});
  }, []);

  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceNav = (idx) => {
    setActivePage('services');
    setTimeout(() => {
      const el = document.getElementById(`service-${idx}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const phone = settings.phone || '+918178782919';
  const email = settings.email || 'info@alphaofficeinterior.com';
  const address = settings.address || 'B-115, Sector-2, Noida, Uttar Pradesh – 201301, India';
  const brandName = settings.brandName || 'Alpha Office Interior';

  return (
    <footer style={{ backgroundColor: 'var(--color-navy-dark)', color: '#CBD5E1', borderTop: '4px solid var(--color-gold)' }}>
      {/* Upper Footer Banner */}
      <div style={{ backgroundColor: 'var(--color-navy)', padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container footer-cta-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }} data-reveal="left">
          <div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.6rem', marginBottom: '0.3rem' }}>Ready to Transform Your Workspace?</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>Get in touch today for space planning, 3D interior design, and complete turnkey execution.</p>
          </div>
          <div className="footer-cta-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenQuoteModal} className="btn btn-gold">
              Get Free Consultation
            </button>
            <a href={`tel:${phone}`} className="btn btn-outline-white">
              <Phone size={16} /> Call {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '4rem 1.5rem 3rem 1.5rem' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
          
          {/* Column 1: Brand Info */}
          <div className="footer-col footer-brand" data-reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/favicon.svg" alt="Alpha Office Interior" style={{ width: '40px', height: '40px' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  ALPHA <span style={{ color: '#D9A441' }}>OFFICE</span>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.18em' }}>
                  INTERIOR
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1.5rem' }}>
              Alpha Office Interior specializes in corporate office interior design, space planning, modular furniture, false ceilings, glass partitions, and turnkey fit-outs across Noida & Pan-India.
            </p>
            {/* Social Icons */}
            <h5 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.25rem', position: 'relative', paddingBottom: '0.4rem' }}>
              FOLLOW US
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '28px', height: '2.5px', backgroundColor: '#D9A441', borderRadius: '2px' }}></span>
            </h5>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '0.85rem' }}>
              @alphaofficeinterior on Facebook, Instagram, LinkedIn & Pinterest
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <FacebookIcon size={18} />, label: 'Facebook', href: 'https://facebook.com/alphaofficeinterior' },
                { icon: <InstagramIcon size={18} />, label: 'Instagram', href: 'https://instagram.com/alphaofficeinterior' },
                { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/company/alphaofficeinterior' },
                { icon: <PinterestIcon size={18} />, label: 'Pinterest', href: 'https://pinterest.com/alphaofficeinterior' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D9A441',
                    border: '1px solid rgba(217, 164, 65, 0.2)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col" data-reveal data-reveal-delay="100">
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Quick Links
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '35px', height: '2px', backgroundColor: '#D9A441' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Company' },
                { id: 'services', label: 'Our Services' },
                { id: 'projects', label: 'Project Portfolio' },
                { id: 'contact', label: 'Contact Us' }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(link.id)}
                    style={{ color: '#CBD5E1', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}
                  >
                    <ChevronRight size={14} color="#D9A441" /> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services List */}
          <div className="footer-col" data-reveal data-reveal-delay="200">
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Our Services
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '35px', height: '2px', backgroundColor: '#D9A441' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.9rem' }}>
              {[
                'Corporate Office Interior',
                'Space Planning & Layout',
                'Modular Office Furniture',
                'Modular School Furniture',
                'False Ceiling & Wall Design',
                'Turnkey Interior Solutions'
              ].map((serv, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleServiceNav(idx)}
                    className="footer-serv-link"
                    style={{ color: '#CBD5E1', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}
                  >
                    <ChevronRight size={14} color="#D9A441" /> {serv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col" data-reveal data-reveal-delay="300">
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1.25rem', position: 'relative', paddingBottom: '0.5rem' }}>
              Contact Us
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '35px', height: '2px', backgroundColor: '#D9A441' }}></span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="#D9A441" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                <span>{address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="#D9A441" style={{ flexShrink: 0 }} />
                <a href={`tel:${phone}`} style={{ color: '#F3C663', fontWeight: 600 }}>{phone}</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="#D9A441" style={{ flexShrink: 0 }} />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div style={{ backgroundColor: '#040E1D', padding: '1.25rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>© 2025 {brandName}. All Rights Reserved.</div>
          <div style={{ color: '#64748B' }}>Designed for Modern Inspiring Workspaces</div>
        </div>
      </div>
    </footer>
  );
}
