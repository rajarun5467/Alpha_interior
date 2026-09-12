import React from 'react';
import { Building, Wrench, Layers, Users, Zap, Award, ShieldCheck, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import SkylineVector from '../components/SkylineVector';

export default function ServicesPage({ onOpenQuoteModal }) {
  const mainServices = [
    {
      title: 'Corporate Office Interior',
      description: 'Full-service office design from concept to completion. We handle layout zoning, executive cabins, open workstations, and cafeteria fit-outs tailored to corporate brand guidelines.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      icon: <Building size={22} />,
      highlights: ['3D Visualizations & Walkthroughs', 'Branded Color Themes', 'Executive & Workstation Fit-outs']
    },
    {
      title: 'Space Planning',
      description: 'Strategic layouts maximizing efficiency, employee circulation flow, acoustic isolation, and natural day-light distribution across all square footage.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      icon: <Layers size={22} />,
      highlights: ['Ergonomic Traffic Circulation', 'Departmental Layout Zoning', 'Scalable Floor Layouts']
    },
    {
      title: 'Modular Furniture',
      description: 'Custom furniture solutions tailored to your space: linear workstations, cluster desks, height-adjustable standing desks, executive tables, and acoustic pods.',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      icon: <Award size={22} />,
      highlights: ['Custom Modular Workstations', 'Ergonomic Task Chairs', 'Integrated Wire Trays & Power Sockets']
    },
    {
      title: 'Modular School Furniture',
      description: 'Custom school furniture solutions tailored to educational spaces: dual student desks, teacher lecterns, laboratory workbenches, and library shelving.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      icon: <Users size={22} />,
      highlights: ['Child-Safe Rounded Corner Frames', 'Durable Scratch-Proof Tops', 'Library Racks & Activity Tables']
    },
    {
      title: 'False Ceiling & Wall Design',
      description: 'Aesthetic ceiling and wall treatments for a polished look. Gypsum false ceiling grid designs, acoustic wall panels, wooden louvers, and ambient cove LED lighting.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      icon: <Zap size={22} />,
      highlights: ['Gypsum Board Ceiling Systems', 'Acoustic Wall Panelling', 'Energy-Efficient LED Lighting']
    },
    {
      title: 'Turnkey Interior Solutions',
      description: 'End-to-end project management where we handle everything: civil masonry, electrical wiring, plumbing, HVAC ducting, fire safety, paint finish, and final handover.',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      icon: <Wrench size={22} />,
      highlights: ['Single Point Responsibility', 'Fixed Cost & Timeline', 'Post-Handover Warranty & Support']
    }
  ];

  const serviceCategories = [
    {
      title: 'Furniture & Custom Carpentry',
      items: ['Office Furniture', 'School Furniture', 'Workstations', 'Office Chairs', 'Wide Range Of Tables']
    },
    {
      title: 'Partitions & Ceiling Treatments',
      items: ['Gypsum Partitions', 'Glass Partitions', 'Wall Panel', 'False Ceiling Services', 'Flooring', 'Paint Work']
    },
    {
      title: 'Civil, MEP & Safety Works',
      items: ['Electrical Fittings', 'Plumbing Work', 'Fire Safety Work', 'Interior Decoration', 'Metal (SS/Chrome) Work', 'Aluminum Work']
    }
  ];

  return (
    <div className="services-page">
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
            Alpha Interior Services
          </span>
          <h1 data-reveal data-reveal-delay="100" style={{ fontSize: '3.2rem', color: '#FFFFFF', marginTop: '0.4rem', fontFamily: 'var(--font-heading)', fontWeight: 900 }}>
            Smart Designs. Functional Spaces. Lasting Impact.
          </h1>
          <p data-reveal data-reveal-delay="200" style={{ color: '#CBD5E1', fontSize: '1.15rem', maxWidth: '720px', margin: '0.6rem auto 0' }}>
            Comprehensive interior fit-out solutions engineered for corporate offices, commercial suites, and educational institutes.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <SkylineVector opacity={0.25} fill="#F59E0B" height="40px" />
        </div>
      </section>

      {/* 6 Core Specialization Cards */}
      <section className="section-padding geo-accent-bg" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">Core Specializations</span>
            <h2 className="section-title">Turnkey Interior Solutions & Services</h2>
            <p className="section-desc">From initial 3D planning to final modular furniture installation, we engineer inspiring workspaces.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }} data-reveal data-reveal-delay="150">
            {mainServices.map((s, idx) => (
              <div key={idx} id={`service-${idx}`}>
                <ServiceCard
                  index={idx}
                  title={s.title}
                  description={s.description}
                  image={s.image}
                  icon={s.icon}
                  highlights={s.highlights}
                  onOpenQuote={onOpenQuoteModal}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorized 17-Item Office Interior Services Checklist */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">Scope of Fit-Out Services</span>
            <h2 className="section-title">Office Interior Services Checklist</h2>
            <p className="section-desc">Full 17-item fit-out capability matrix covered under our turnkey interior contracts.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }} data-reveal data-reveal-delay="150">
            {serviceCategories.map((cat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', borderRadius: '20px', borderLeft: '5px solid #F59E0B' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0B1B36', fontWeight: 800, marginBottom: '1.25rem' }}>
                  {cat.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <CheckCircle2 size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5-Icon Advantage Strip */}
      <section style={{ backgroundColor: '#040D1C', padding: '4.5rem 0', color: '#FFFFFF', borderTop: '4px solid #F59E0B' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle light">Our Advantage</span>
            <h2 className="section-title light">Why Commercial Clients Choose Us</h2>
          </div>

          <div className="svc-adv-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }} data-reveal data-reveal-delay="150">
            {[
              { icon: <Building size={32} color="#FBBF24" />, title: 'Complete Solutions', desc: 'Single-point turnkey responsibility' },
              { icon: <Users size={32} color="#FBBF24" />, title: 'Expert Team', desc: '25+ architects & MEP engineers' },
              { icon: <Award size={32} color="#FBBF24" />, title: 'Premium Quality', desc: 'High grade commercial materials' },
              { icon: <Clock size={32} color="#FBBF24" />, title: 'Timely Delivery', desc: '100% committed handover deadline' },
              { icon: <ShieldCheck size={32} color="#FBBF24" />, title: 'Customer Focus', desc: 'Transparent post-handover warranty' }
            ].map((item, idx) => (
              <div key={idx} className="adv-tile" style={{
                padding: '1.75rem 1rem',
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: '20px',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}>
                <div className="adv-icon" style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  {item.icon}
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.3rem' }}>{item.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#0B1B36', padding: '5rem 0', color: '#FFFFFF', textAlign: 'center' }}>
        <div className="container" data-reveal="scale">
          <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '1rem', fontWeight: 900 }}>Looking For A Customized Space Proposal?</h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 2.25rem auto' }}>
            Share your floor layout or rough measurements to receive an itemized proposal within 24 hours.
          </p>
          <button onClick={onOpenQuoteModal} className="btn btn-gold btn-lg">
            Request a Custom Proposal <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
