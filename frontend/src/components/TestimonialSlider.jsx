import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import API, { resolveImageUrl } from '../api/client.js';

const fallbackTestimonials = [
  { name: 'Vikas Malhotra', role: 'Operations Head', company: 'Pinaakee Digital Solutions', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'Alpha Office Interior transformed our 8,000 sq. ft. office space in Sector-62 Noida within the promised 45 days timeline. Their glass partitions, modular workstations, and false ceiling design created a modern high-tech vibe that our employees love!', stars: 5 },
  { name: 'Ananya Sharma', role: 'Facility Manager', company: 'Enterprise Corporate Client', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'The turnkey fit-out execution was flawless. From civil & electrical work to executive director cabins and acoustically panelled conference rooms, Alpha Office delivered premium quality with zero stress for our team.', stars: 5 },
  { name: 'Rajesh Verma', role: 'Director of Infrastructure', company: 'Apex Knowledge Academy', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', quote: 'We commissioned Alpha Office Interior for modular school furniture and seminar hall seating. The durability, ergonomic design, and color themes exceeded all expectations. Exceptional craftsmanship!', stars: 5 }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    API.get('/testimonials').then((res) => {
      if (Array.isArray(res.data) && res.data.length > 0) {
        setTestimonials(res.data.map(t => ({ ...t, avatar: resolveImageUrl(t.avatar) })));
      }
    }).catch(() => {});
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding geo-accent-bg" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-subtitle">Client Experiences</span>
          <h2 className="section-title">What Our Clients Say About Us</h2>
          <p className="section-desc">
            Trusted by leading IT corporations, digital agencies, and educational institutions across Delhi NCR.
          </p>
        </div>

        <div style={{ maxWidth: '880px', margin: '0 auto' }} data-reveal data-reveal-delay="150">
          <div
            className="card testimonial-card"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              padding: '3.25rem 3rem 2.75rem',
              position: 'relative',
              borderRadius: '28px',
              boxShadow: '0 24px 60px rgba(11,27,54,0.10)',
              border: '1px solid rgba(217, 164, 65, 0.25)',
              background: 'linear-gradient(145deg, #FFFFFF 0%, #FDFAF3 100%)',
              overflow: 'visible'
            }}
          >
            {/* Decorative corner glow */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: '200px', height: '200px',
              background: 'radial-gradient(circle at 100% 0%, rgba(217,164,65,0.08), transparent 70%)',
              borderRadius: '0 28px 0 0',
              pointerEvents: 'none'
            }} />

            {/* Quote Icon */}
            <div style={{
              position: 'absolute',
              top: '-26px',
              left: '44px',
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F3C663 0%, #D9A441 100%)',
              color: '#0B1F3A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 28px rgba(217, 164, 65, 0.45)',
              border: '3px solid #FFFFFF'
            }}>
              <Quote size={28} fill="#0B1F3A" />
            </div>

            {/* Slide content — remounts on index change for fade animation */}
            <div key={currentIndex} style={{ animation: 'testimonialFade 0.55s ease-out' }}>
              {/* Rating Stars + Verified badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {[...Array(current.stars)].map((_, i) => (
                    <Star key={i} size={22} fill="#D9A441" color="#D9A441" />
                  ))}
                </div>
                <span style={{
                  fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: '#C98F1E',
                  backgroundColor: '#FFFBEB', border: '1px solid rgba(217,164,65,0.35)',
                  padding: '0.35rem 0.9rem', borderRadius: '50px'
                }}>
                  Verified Client
                </span>
              </div>

              {/* Testimonial Quote */}
              <p style={{
                fontStyle: 'italic',
                fontSize: '1.22rem',
                color: 'var(--color-navy)',
                lineHeight: 1.75,
                marginBottom: '2.25rem',
                minHeight: '8rem',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500
              }}>
                "{current.quote}"
              </p>

              {/* User Details & Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', paddingTop: '1.5rem', borderTop: '1px solid #EDE4D3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                  {/* Avatar with gold ring */}
                  <div style={{
                    padding: '3px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F3C663, #D9A441, #B07C1F)',
                    boxShadow: '0 8px 22px rgba(217, 164, 65, 0.4)',
                    flexShrink: 0
                  }}>
                    <img
                      src={current.avatar}
                      alt={current.name}
                      style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #FFFFFF',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.2rem', fontWeight: 800 }}>{current.name}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.15rem' }}>{current.role}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{current.company}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="testimonial-nav-btn"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '1.5px solid #E2D9C8',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-navy)',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0B1F3A, #12284C)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(11,31,58,0.3)'
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    background: idx === currentIndex
                      ? 'linear-gradient(90deg, #F3C663, #D9A441)'
                      : '#E3E7EE',
                    boxShadow: idx === currentIndex ? '0 2px 8px rgba(217,164,65,0.4)' : 'none',
                    transition: 'all 0.35s ease'
                  }}
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes testimonialFade {
          0% { opacity: 0; transform: translateX(24px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .testimonial-nav-btn:hover {
          border-color: #D9A441 !important;
          background-color: #FFFBEB !important;
          color: #C98F1E !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
