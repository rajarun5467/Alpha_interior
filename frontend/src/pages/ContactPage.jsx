import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, PinterestIcon } from '../components/SocialIcons';
import FaqAccordion from '../components/FaqAccordion';
import SkylineVector from '../components/SkylineVector';
import API from '../api/client.js';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Corporate Office Interior',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState({});
  const [serviceOptions, setServiceOptions] = useState([
    'Corporate Office Interior', 'Space Planning', 'Modular Office Furniture',
    'Modular School Furniture', 'False Ceiling & Wall Design', 'Turnkey Interior Solutions'
  ]);

  useEffect(() => {
    API.get('/settings').then((res) => { if (res.data) setSettings(res.data); }).catch(() => {});
    API.get('/services').then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        setServiceOptions(res.data.map(s => s.title).filter(Boolean));
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/leads/contact', formData);
    } catch (err) {
      console.error('Lead submission failed:', err);
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="contact-page">
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #040D1C 0%, #0B1B36 100%)',
        padding: '4.5rem 0 4rem 0',
        color: '#FFFFFF',
        position: 'relative',
        borderBottom: '4px solid #F59E0B'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span data-reveal style={{ fontSize: '0.85rem', color: '#F59E0B', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Get In Touch
          </span>
          <h1 data-reveal data-reveal-delay="100" style={{ fontSize: '3.2rem', color: '#FFFFFF', marginTop: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: 900 }}>
            Contact Alpha Office Interior
          </h1>
          <p data-reveal data-reveal-delay="200" style={{ color: '#CBD5E1', fontSize: '1.15rem', maxWidth: '680px', margin: '0.6rem auto 0' }}>
            Reach out to our senior interior consultants for space evaluations, turnkey quotes, or site visits in Noida & Delhi NCR.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <SkylineVector opacity={0.25} fill="#F59E0B" height="40px" />
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="section-padding geo-accent-bg" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem' }} className="contact-split">
            
            {/* Left: Contact Detail Cards */}
            <div data-reveal="left">
              <span className="section-subtitle">Reach Out Directly</span>
              <h2 className="section-title" style={{ fontSize: '2.2rem' }}>We Are Here To Help You</h2>
              <p style={{ color: '#475569', fontSize: '0.975rem', marginBottom: '2.25rem' }}>
                Visit our experience center in Sector-2 Noida or call our interior project managers directly.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                
                {/* Card 1: Call Us */}
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', borderLeft: '5px solid #F59E0B' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFBEB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#0B1B36', fontWeight: 800, marginBottom: '0.2rem' }}>Call Us Directly</h4>
                    <a href={`tel:${settings.phone || '+918178782919'}`} style={{ fontSize: '1.15rem', fontWeight: 900, color: '#D97706' }}>{settings.phone || '+91 8178782919'}</a>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>Mon - Sat: 9:30 AM - 7:00 PM</div>
                  </div>
                </div>

                {/* Card 2: Email Us */}
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', borderLeft: '5px solid #F59E0B' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFBEB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#0B1B36', fontWeight: 800, marginBottom: '0.2rem' }}>Email Us</h4>
                    <a href={`mailto:${settings.email || 'info@alphaofficeinterior.com'}`} style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0B1B36' }}>
                      {settings.email || 'info@alphaofficeinterior.com'}
                    </a>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.2rem' }}>Guaranteed response within 24 hours</div>
                  </div>
                </div>

                {/* Card 3: Visit Us */}
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', borderLeft: '5px solid #F59E0B' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFBEB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#0B1B36', fontWeight: 800, marginBottom: '0.2rem' }}>Visit Our Noida Office</h4>
                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.5 }}>
                      {settings.address || 'B-115, Sector-2, Noida, Uttar Pradesh – 201301, India'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Links */}
              <div>
                <h4 style={{ fontSize: '1rem', color: '#0B1B36', fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '0.06em', position: 'relative', paddingBottom: '0.4rem', display: 'inline-block' }}>
                  FOLLOW US
                  <span style={{ position: 'absolute', bottom: 0, left: 0, width: '28px', height: '3px', backgroundColor: '#D9A441', borderRadius: '2px' }}></span>
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginTop: '0.6rem', marginBottom: '0.85rem' }}>
                  @alphaofficeinterior on Facebook, Instagram, LinkedIn & Pinterest
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
                        padding: '0.65rem 1.25rem',
                        borderRadius: '30px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        color: '#0B1B36',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {s.icon} {s.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Contact Form */}
            <div className="card" data-reveal="right" style={{ padding: '2.75rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: '2px solid rgba(245, 158, 11, 0.35)' }}>
              <h3 style={{ fontSize: '1.75rem', color: '#0B1B36', fontWeight: 900, marginBottom: '0.4rem' }}>Send Us A Message</h3>
              <p style={{ color: '#475569', fontSize: '0.925rem', marginBottom: '1.75rem' }}>
                Fill in your project requirements below to receive an itemized proposal from our senior 3D layout architects.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <CheckCircle size={68} color="#F59E0B" style={{ margin: '0 auto 1.25rem auto' }} />
                  <h3 style={{ fontSize: '1.75rem', color: '#0B1B36', fontWeight: 800, marginBottom: '0.5rem' }}>Inquiry Received!</h3>
                  <p style={{ color: '#475569', marginBottom: '1.75rem' }}>
                    Thank you <strong>{formData.name}</strong>. Our senior project architect will call you back within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', service: 'Corporate Office Interior', message: '' });
                    }} 
                    className="btn btn-navy"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Verma"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@company.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="form-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Service Interested In *</label>
                    <select
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Details / Carpet Area (sq ft) *</label>
                    <textarea
                      required
                      className="form-textarea"
                      placeholder="Share details about carpet area, floor plan, location, or project start timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" disabled={submitting} className="btn btn-gold" style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem', opacity: submitting ? 0.6 : 1 }}>
                    {submitting ? 'Sending...' : 'Send Project Inquiry'} {!submitting && <Send size={18} />}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Noida Google Map */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }} data-reveal>
            <span className="section-subtitle">Office Location</span>
            <h2 className="section-title">Visit Our Noida Office</h2>
            <p className="section-desc">B-115, Sector-2, Noida, Uttar Pradesh – 201301, India</p>
          </div>

          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '2px solid rgba(245, 158, 11, 0.35)',
            height: '450px'
          }} data-reveal data-reveal-delay="150">
            <iframe
              title="Alpha Office Interior Noida Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7424699564287!2d77.315000!3d28.577000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f4b000001%3A0x1!2sB-115%2C%20Sector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">Common Questions</span>
            <h2 className="section-title">Turnkey Fit-Out FAQ</h2>
          </div>
          <div data-reveal data-reveal-delay="150">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* Slogan Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #040D1C 0%, #0B1B36 100%)',
        padding: '5rem 0',
        color: '#FFFFFF',
        textAlign: 'center',
        borderTop: '4px solid #F59E0B'
      }}>
        <div className="container" style={{ maxWidth: '850px' }} data-reveal="scale">
          <h2 style={{ fontSize: '2.6rem', color: '#FBBF24', fontFamily: 'var(--font-heading)', fontWeight: 900, marginBottom: '0.85rem' }}>
            "Your Vision. Our Expertise. Exceptional Spaces, Lasting Impressions."
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem' }}>
            Let Alpha Office Interior engineer your dream workspace today.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .contact-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
