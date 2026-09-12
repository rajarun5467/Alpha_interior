import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What services are included under Alpha Office Turnkey Interior Solutions?',
      a: 'Our turnkey interior solutions cover everything from initial 3D space planning and architectural design to civil masonry, gypsum & glass partitions, modular office furniture, false ceiling, flooring, electrical fittings, plumbing, fire safety, and final keys handover.'
    },
    {
      q: 'How long does a typical office interior fit-out project take?',
      a: 'Project timelines depend on carpet area. Typically, a 3,000 to 5,000 sq. ft. office fit-out is completed within 35 to 45 business days with guaranteed milestone progress updates.'
    },
    {
      q: 'Do you provide customized modular furniture for schools and offices?',
      a: 'Yes! We manufacture and supply custom modular furniture including ergonomic workstations, executive director desks, school dual seating benches, library racks, and acoustic pods tailored to your floor dimensions.'
    },
    {
      q: 'Where are Alpha Office Interior services available?',
      a: 'We operate primarily across Noida, Greater Noida, Delhi NCR, Gurgaon, Ghaziabad, and execute pan-India commercial fit-out contracts for major corporate enterprises.'
    },
    {
      q: 'How do I get a free space layout design & project quote?',
      a: 'You can click on "Get a Free Quote" anywhere on our website, fill in your approximate carpet area and location, or call us directly at +91 8178782919 to schedule a free site evaluation.'
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="card"
              data-reveal
              data-reveal-delay={idx * 80}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: isOpen ? '1.5px solid #F59E0B' : '1px solid rgba(11, 27, 54, 0.08)',
                boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  backgroundColor: isOpen ? '#FFFBEB' : '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <HelpCircle size={20} color={isOpen ? '#D97706' : '#0B1B36'} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0B1B36' }}>{faq.q}</span>
                </div>
                <ChevronDown
                  size={20}
                  color={isOpen ? '#D97706' : '#94A3B8'}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0
                  }}
                />
              </button>

              {isOpen && (
                <div style={{ padding: '0 1.5rem 1.25rem 3.25rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, animation: 'fadeInUp 0.3s ease' }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
