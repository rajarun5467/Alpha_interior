import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, ShieldCheck } from 'lucide-react';
import API from '../api/client.js';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Corporate Office Interior',
    city: 'Noida',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serviceOptions, setServiceOptions] = useState([
    'Corporate Office Interior', 'Space Planning', 'Modular Office Furniture',
    'Modular School Furniture', 'False Ceiling & Wall Design', 'Turnkey Interior Solutions'
  ]);

  useEffect(() => {
    if (!isOpen) return;
    API.get('/services').then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        const titles = res.data.map(s => s.title).filter(Boolean);
        setServiceOptions(titles);
        setFormData((prev) => titles.includes(prev.service) ? prev : { ...prev, service: titles[0] });
      }
    }).catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/leads/quote', formData);
    } catch (err) {
      console.error('Quote submission failed:', err);
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: serviceOptions[0] || 'Corporate Office Interior',
      city: 'Noida',
      message: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1F3A 0%, #10264A 100%)',
          padding: '1.5rem 1.75rem',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #D9A441'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#D9A441', fontWeight: 700, letterSpacing: '0.1em' }}>
              Free Design Consultation
            </span>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginTop: '0.2rem' }}>Get A Custom Quote</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle size={64} color="#D9A441" style={{ margin: '0 auto 1.25rem auto' }} />
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Thank You, {formData.name}!</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Your request for <strong>{formData.service}</strong> has been received successfully. Our expert interior consultant will reach out to you within 24 hours.
              </p>
              <div style={{ background: '#F5F6F8', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem', borderLeft: '4px solid #D9A441' }}>
                <strong>Direct Assistance:</strong> Call us directly at <a href="tel:+918178782919" style={{ color: '#C98F1E', fontWeight: 700 }}>+91 8178782919</a>
              </div>
              <button onClick={handleReset} className="btn btn-navy">
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@company.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City / Area</label>
                  <input
                    type="text"
                    placeholder="Noida / Delhi NCR"
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Service Required *</label>
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
                <label className="form-label">Project Details / Carpet Area (sq ft)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Share details such as approximate square footage, timeline, budget range, or specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={16} color="#D9A441" /> 100% Privacy Guaranteed
                </div>
                <button type="submit" disabled={submitting} className="btn btn-gold" style={{ opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? 'Submitting...' : 'Submit Request'} {!submitting && <Send size={16} />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
