import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Award, Clock, Compass, CheckCircle2, ChevronRight, Lightbulb, Users, HeartHandshake, FileText, Check, Star, Sparkles, Briefcase } from 'lucide-react';
import StatsCounter from '../components/StatsCounter';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import TestimonialSlider from '../components/TestimonialSlider';
import SkylineVector from '../components/SkylineVector';
import TransformationPreview from '../components/TransformationPreview';
import MarqueeLogos from '../components/MarqueeLogos';
import CostCalculator from '../components/CostCalculator';
import ProcessSteps from '../components/ProcessSteps';
import AboutSection from '../components/AboutSection';
import CountUp from '../components/CountUp';
import hero1Img from '../assets/hero1.png';

export default function HomePage({ setActivePage, onOpenQuoteModal, onSelectProject }) {
  const servicesPreview = [
    {
      title: 'Corporate Office Interior',
      description: 'Full-service office design from concept to completion.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      icon: <Compass size={22} />,
      highlights: ['3D Concept Visualization', 'Space Optimization', 'Turnkey Fit-Out']
    },
    {
      title: 'Space Planning',
      description: 'Strategic layouts maximizing efficiency and flow.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      icon: <FileText size={22} />,
      highlights: ['Workflow Optimization', 'Ergonomic Zoning', 'Flexible Desking']
    },
    {
      title: 'Modular Furniture',
      description: 'Custom furniture solutions tailored to your space.',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      icon: <Award size={22} />,
      highlights: ['Modular Desking', 'Executive Cabins', 'Ergonomic Task Chairs']
    },
    {
      title: 'Modular School Furniture',
      description: 'Custom school furniture solutions tailored to your space.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      icon: <Users size={22} />,
      highlights: ['Child-Safe Rounded Edges', 'Heavy-Duty Steel Frames', 'Custom School Bench']
    },
    {
      title: 'False Ceiling & Wall Design',
      description: 'Aesthetic ceiling and wall treatments for a polished look.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      icon: <ShieldCheck size={22} />,
      highlights: ['Acoustic Soundproofing', 'Energy Efficient LED', 'Gypsum & Wood Panel']
    },
    {
      title: 'Turnkey Interior Solutions',
      description: 'End-to-end project management — we handle everything.',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      icon: <Clock size={22} />,
      highlights: ['Single Point Contact', 'Fixed Budget & Timeline', 'Post-Handover Warranty']
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'Modern Workspaces',
      category: 'Modern Workspaces',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      description: 'Ergonomic and efficient workspaces designed to enhance productivity, collaboration, and employee well-being.',
      features: ['Height Adjustable Desks', 'Cable Management', 'Acoustic Wall Panels']
    },
    {
      id: 2,
      title: 'Glass Partition Solutions',
      category: 'Glass Partition Solutions',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      description: 'Stylish and functional glass partitions that create open, modern, and professional environments.',
      features: ['Acoustic Laminated Glass', 'Black Matte Frame', 'Frosted Privacy Film']
    },
    {
      id: 3,
      title: 'Director Cabin',
      category: 'Director Cabin',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      description: 'Premium designs that reflect leadership, sophistication, and professionalism with comfort and functionality.',
      features: ['Italian Veneer Finish', 'Private Meeting Table', 'Ambient Cove Lighting']
    },
    {
      id: 4,
      title: 'Reception Area',
      category: 'Reception Area',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
      description: 'Beautifully designed reception areas that create a lasting first impression with elegance and warmth.',
      features: ['Backlit Acrylic Brand Logo', 'Corian Reception Desk', 'Designer Wall Cladding']
    },
    {
      id: 5,
      title: 'Conference Room',
      category: 'Conference Room',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      description: 'Well-planned conference rooms equipped for effective meetings, presentations, and seamless collaboration.',
      features: ['Pop-up Connectivity Box', 'Fabric Wall Panelling', 'Motorized Blinds']
    },
    {
      id: 6,
      title: 'School Furniture',
      category: 'School Furniture',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      description: 'Durable and comfortable school furniture designed to support learning, focus, and student well-being.',
      features: ['Scratch-Resistant Top', 'Heavy-Duty Tubular Frame', 'Back Support Contour']
    },
    {
      id: 7,
      title: 'Seminar Hall',
      category: 'Seminar Hall',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      description: 'Spacious and well-equipped seminar halls for training, workshops, and corporate events.',
      features: ['Acoustic Slotted Panels', 'Cushioned Tip-up Chairs', 'Stage Lighting Rig']
    },
    {
      id: 8,
      title: 'Office Cafeteria',
      category: 'Office Cafeteria',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      description: 'Vibrant and comfortable cafeterias that offer a relaxing space for employees to unwind and recharge.',
      features: ['Industrial Ceiling Grid', 'Easy-Clean Laminates', 'Pendant Lighting']
    }
  ];

  const fullServiceChecklist = [
    { name: 'Office Furniture', desc: 'Ergonomic workstations, executive desks, conference tables & storage units — custom-built for your floor plan and brand theme.' },
    { name: 'School Furniture', desc: 'Dual student desks, teacher lecterns, library racks & activity tables built with child-safe rounded edges and durable frames.' },
    { name: 'Gypsum Partitions', desc: 'Lightweight drywall partitions for cabins, meeting rooms & quick layout changes — with acoustic insulation options.' },
    { name: 'Glass Partitions', desc: 'Toughened acoustic glass partitions with sleek aluminium frames, frosted branding stripes & premium door hardware.' },
    { name: 'Wall Panel', desc: 'Designer wall panelling — wooden louvers, fabric acoustic panels, 3D textures & veneer cladding for reception & cabins.' },
    { name: 'Paint Work', desc: 'Premium emulsion, texture & enamel finishes with branded corporate color themes — low-VOC, washable options.' },
    { name: 'False Ceiling Services', desc: 'Gypsum, grid & designer ceilings with cove LED lighting, acoustic treatment & integrated HVAC diffuser layouts.' },
    { name: 'Flooring', desc: 'Vinyl planks, carpet tiles, wooden laminate & Italian marble flooring engineered for high-traffic corporate spaces.' },
    { name: 'Electrical Fittings', desc: 'Complete office wiring, modular switches, under-desk raceways, server points & smart lighting systems.' },
    { name: 'Plumbing Work', desc: 'Pantry & washroom plumbing, premium CP fittings, water purifiers & drainage management for office spaces.' },
    { name: 'Fire Safety Work', desc: 'Fire alarm panels, sprinkler layouts, extinguishers & emergency exit signage — fully compliant with safety norms.' },
    { name: 'Interior Decoration', desc: 'Branding walls, indoor plants, artwork, signage & styling elements that bring your office identity to life.' },
    { name: 'Workstation', desc: 'Linear & cluster workstations with integrated cable management, privacy screens & ergonomic layouts.' },
    { name: 'Office Chairs', desc: 'Ergonomic task chairs, executive high-back chairs & visitor seating built for all-day comfort.' },
    { name: 'Wide Range Of Tables', desc: 'Conference, cafeteria, training & height-adjustable standing tables in fully custom sizes & finishes.' },
    { name: 'Metal (SS/Chrome) Work', desc: 'Stainless steel railings, partitions, door frames & chrome-finish architectural metalwork detailing.' },
    { name: 'Aluminum Work', desc: 'Aluminium windows, doors, structural glazing & partition framing systems with powder-coated finishes.' }
  ];

  const [activeService, setActiveService] = useState(null);

  return (
    <div className="home-page">
      {/* Luxury Split Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #040D1C 0%, #0B1B36 60%, #12284C 100%)',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}>
        {/* Ambient Gold Glow Radial Mesh */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          right: '-150px',
          width: '580px',
          height: '580px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        {/* Dot Matrix Pattern */}
        <div className="dot-grid-pattern-dark" style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          width: '220px',
          height: '160px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="hero-split">
            
            {/* Left Content Column */}
            <div>
              {/* Main Headline */}
              <h1 data-reveal style={{
                fontSize: '3.75rem',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.12,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}>
                DESIGN THAT TOUCH <br />
                <span className="gradient-text">YOUR HEART</span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: '#E2E8F0',
                lineHeight: 1.6,
                marginBottom: '2.25rem',
                maxWidth: '560px',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Innovative Design. Smart Solutions. <br />
                <strong style={{ color: '#FBBF24' }}>Better Work Environments.</strong> Turnkey fit-outs & 3D space planning across Noida & Delhi NCR.
              </p>

              {/* Floating Glass Chips */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {[
                  { label: '150+ Turnkey Projects', icon: <CheckCircle2 size={16} color="#FBBF24" /> },
                  { label: '4.9/5 Rating', icon: <Star size={16} color="#FBBF24" fill="#FBBF24" /> },
                  { label: '5+ Years Excellence', icon: <Award size={16} color="#FBBF24" /> }
                ].map((chip, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '0.45rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}>
                    {chip.icon} {chip.label}
                  </div>
                ))}
              </div>

              {/* CTA Group */}
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <button onClick={onOpenQuoteModal} className="btn btn-gold btn-lg">
                  Book Free Consultation <ArrowRight size={18} />
                </button>
                <button onClick={() => { setActivePage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn btn-outline-white btn-lg">
                  Explore Portfolio
                </button>
              </div>

            </div>

            {/* Right Column Image Stack */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                border: '3px solid rgba(245, 158, 11, 0.4)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)'
              }}>
                <img 
                  src={hero1Img} 
                  alt="Alpha Office Executive Suite Interior"
                  style={{ width: '100%', height: '510px', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-20px',
                backgroundColor: '#040D1C',
                color: '#FFFFFF',
                padding: '1.25rem 1.75rem',
                borderRadius: '18px',
                border: '2px solid #F59E0B',
                boxShadow: 'var(--shadow-gold)'
              }} className="badge-hide-mobile">
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FBBF24', lineHeight: 1 }}>Turnkey Fit-Out</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.2rem', fontWeight: 600 }}>Commercial & Institutional Interior</div>
              </div>
            </div>

          </div>
        </div>

        {/* Skyline Line-Art Vector */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <SkylineVector opacity={0.25} fill="#F59E0B" height="60px" />
        </div>
      </section>

      {/* Marquee Partner Ticker */}
      <MarqueeLogos />

      {/* SECTION 2: Instant Cost & Budget Estimator */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <CostCalculator onOpenQuote={onOpenQuoteModal} />
        </div>
      </section>

      {/* SECTION 3: Step-by-Step Design Journey */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">How We Work</span>
            <h2 className="section-title">Our 5-Step <span className="gradient-text-navy">Turnkey Process</span></h2>
            <p className="section-desc">From initial site evaluation to final keys handover, we manage every detail seamlessly.</p>
          </div>

          <div data-reveal data-reveal-delay="150">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* SECTION 4: Rebuilt Interactive About Section */}
      <AboutSection setActivePage={setActivePage} onOpenQuoteModal={onOpenQuoteModal} />

      {/* SECTION 5: Interactive 3D Space Transformation Showcase */}
      <section className="section-padding" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="container">
          <TransformationPreview onOpenQuote={onOpenQuoteModal} />
        </div>
      </section>

      {/* SECTION 6: What We Do Best (From Document Page 3) */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">Our Expertise</span>
            <h2 className="section-title">What We <span className="gradient-text-navy">Do Best</span></h2>
            <p className="section-desc">
              Smart Designs. Functional Spaces. Lasting Impact.<br />
              We deliver comprehensive interior solutions that combine creativity, comfort and efficiency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }} data-reveal data-reveal-delay="150">
            {servicesPreview.map((s, idx) => (
              <ServiceCard 
                key={idx}
                index={idx}
                title={s.title}
                description={s.description}
                image={s.image}
                icon={s.icon}
                highlights={s.highlights}
                onOpenQuote={onOpenQuoteModal}
              />
            ))}
          </div>

          {/* Bottom 4-Card Navy Strip from Page 3 */}
          <div style={{
            backgroundColor: '#0B1B36',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            color: '#FFFFFF',
            borderTop: '4px solid #F59E0B',
            boxShadow: 'var(--shadow-lg)'
          }} data-reveal data-reveal-delay="200">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              {[
                { icon: <Lightbulb size={32} color="#FBBF24" />, title: 'INNOVATIVE DESIGNS', desc: 'Creative solutions that reflect your vision and values.' },
                { icon: <Award size={32} color="#FBBF24" />, title: 'QUALITY CRAFTSMANSHIP', desc: 'Attention to detail with premium materials.' },
                { icon: <Clock size={32} color="#FBBF24" />, title: 'TIMELY DELIVERY', desc: 'On-time execution with commitment and dedication.' },
                { icon: <Users size={32} color="#FBBF24" />, title: 'CUSTOMER FOCUS', desc: 'Your satisfaction is our top priority at every stage.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    border: '1.5px solid #F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.4rem' }}>{item.title}</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: Complete Interior Solutions — LUXURY REDESIGN */}
      <section style={{ background: '#F8F9FF', padding: '7rem 0 0', position: 'relative', overflow: 'hidden' }}>

        {/* ── Subtle grid pattern overlay ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(11,27,54,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(11,27,54,0.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* ══ PART 1: HEADER + TWO-PANEL SPLIT ══ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '5rem' }} className="sol-split">

            {/* LEFT — Text + service pills */}
            <div data-reveal="left">
              {/* Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg,#F59E0B,#FBBF24)' }} />
                <span style={{
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#F59E0B',
                }}>Complete Interior Solutions</span>
              </div>

              {/* Heading */}
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem,4vw,3.25rem)',
                fontWeight: 900, color: '#040D1C', lineHeight: 1.15, margin: '0 0 1.5rem',
              }}>
                Everything Your <br />
                <span style={{
                  background: 'linear-gradient(90deg,#D97706,#F59E0B,#FBBF24)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Office Needs</span>
                <br />Under One Roof.
              </h2>

              <p style={{
                fontSize: '1rem', color: '#475569', lineHeight: 1.8,
                maxWidth: '420px', marginBottom: '2.5rem',
              }}>
                From civil fit-out to premium furniture — we manage every aspect of your office transformation with precision and care.
              </p>

              {/* Service Pills — clickable, wrapping flex */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.25rem' }}>
                {fullServiceChecklist.map((s, i) => {
                  const isActive = activeService === i;
                  return (
                    <button key={i}
                      onClick={() => setActiveService(isActive ? null : i)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.45rem 0.95rem',
                        background: isActive
                          ? 'linear-gradient(135deg, #D97706, #F59E0B)'
                          : i % 3 === 0 ? 'rgba(245,158,11,0.10)' : i % 3 === 1 ? '#FFFFFF' : '#F1F5FF',
                        border: `1px solid ${isActive ? '#F59E0B' : i % 3 === 0 ? 'rgba(245,158,11,0.35)' : '#E2E8F0'}`,
                        borderRadius: '50px',
                        fontSize: '0.8rem', fontWeight: isActive ? 800 : 600,
                        color: isActive ? '#040D1C' : i % 3 === 0 ? '#B45309' : '#334155',
                        boxShadow: isActive ? '0 6px 18px rgba(245,158,11,0.4)' : '0 2px 8px rgba(11,27,54,0.06)',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        if (isActive) return;
                        e.currentTarget.style.background = 'rgba(245,158,11,0.15)';
                        e.currentTarget.style.borderColor = '#F59E0B';
                        e.currentTarget.style.color = '#92400E';
                      }}
                      onMouseLeave={e => {
                        if (isActive) return;
                        e.currentTarget.style.background = i % 3 === 0 ? 'rgba(245,158,11,0.10)' : i % 3 === 1 ? '#FFFFFF' : '#F1F5FF';
                        e.currentTarget.style.borderColor = i % 3 === 0 ? 'rgba(245,158,11,0.35)' : '#E2E8F0';
                        e.currentTarget.style.color = i % 3 === 0 ? '#B45309' : '#334155';
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: isActive ? '#040D1C' : '#F59E0B', flexShrink: 0 }} />
                      {s.name}
                    </button>
                  );
                })}
              </div>

              {/* Selected Service Detail Card */}
              {activeService !== null && (
                <div
                  key={activeService}
                  style={{
                    animation: 'serviceDetailIn 0.35s ease-out',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9ED 100%)',
                    border: '1.5px solid rgba(245,158,11,0.45)',
                    borderLeft: '5px solid #F59E0B',
                    borderRadius: '16px',
                    padding: '1.1rem 1.35rem',
                    marginBottom: '2rem',
                    boxShadow: '0 14px 36px rgba(245,158,11,0.14)',
                    maxWidth: '520px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#040D1C', margin: 0 }}>
                      {fullServiceChecklist[activeService].name}
                    </h4>
                    <button
                      onClick={() => setActiveService(null)}
                      aria-label="Close service details"
                      style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1, padding: '0.15rem 0.4rem', borderRadius: '6px', fontWeight: 800 }}
                    >
                      ✕
                    </button>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                    {fullServiceChecklist[activeService].desc}
                  </p>
                  <button
                    onClick={onOpenQuoteModal}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'none', border: 'none', padding: 0,
                      color: '#D97706', fontWeight: 800, fontSize: '0.85rem',
                      cursor: 'pointer', letterSpacing: '0.02em'
                    }}
                  >
                    Get This Service Quote <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* CTA row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={onOpenQuoteModal}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    background: 'linear-gradient(135deg,#D97706,#F59E0B)',
                    color: '#040D1C', fontWeight: 800, fontSize: '0.9rem',
                    padding: '0.9rem 1.8rem', borderRadius: '50px', border: 'none',
                    cursor: 'pointer', boxShadow: '0 8px 28px rgba(245,158,11,0.4)',
                    letterSpacing: '0.03em',
                  }}>
                  <Briefcase size={17} />
                  Get Free Quote
                </button>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>
                  ✦ No hidden charges
                </span>
              </div>
            </div>

            {/* RIGHT — Image with floating stats */}
            <div style={{ position: 'relative' }} data-reveal="right">
              {/* Main image */}
              <div style={{
                borderRadius: '32px', overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(4,13,28,0.2), 0 0 0 1.5px rgba(245,158,11,0.2)',
                position: 'relative',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=85"
                  alt="Alpha Office Interior Design"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
                {/* Bottom fade */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(4,13,28,0.65) 0%, transparent 50%)',
                }} />
              </div>

              {/* Floating card — bottom left */}
              <div style={{
                position: 'absolute', bottom: '28px', left: '-24px',
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
                borderRadius: '20px', padding: '1rem 1.4rem',
                boxShadow: '0 16px 48px rgba(4,13,28,0.15), 0 0 0 1px rgba(245,158,11,0.15)',
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                minWidth: '190px',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg,#F59E0B,#FBBF24)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(245,158,11,0.4)',
                }}>
                  <Award size={22} color="#040D1C" />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#040D1C', lineHeight: 1 }}>
                    <CountUp target={150} suffix="+" />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>Projects Completed</div>
                </div>
              </div>

              {/* Floating card — top right */}
              <div style={{
                position: 'absolute', top: '28px', right: '-24px',
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
                borderRadius: '20px', padding: '1rem 1.4rem',
                boxShadow: '0 16px 48px rgba(4,13,28,0.15), 0 0 0 1px rgba(245,158,11,0.15)',
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                minWidth: '175px',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: 'linear-gradient(135deg,#0B1B36,#1E3A5F)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Users size={20} color="#FBBF24" />
                </div>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#040D1C', lineHeight: 1 }}>
                    <CountUp target={100} suffix="+" />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>Happy Clients</div>
                </div>
              </div>

              {/* Gold dot decoration */}
              <div style={{
                position: 'absolute', bottom: '-20px', right: '20px',
                width: '80px', height: '80px',
                background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)',
                borderRadius: '50%',
              }} />
            </div>
          </div>

          {/* ══ PART 2: WHY CHOOSE US — Dark Luxury Banner ══ */}
        </div>

        {/* Full-width dark section */}
        <div style={{
          background: 'linear-gradient(120deg, #040D1C 0%, #0B1B36 50%, #071428 100%)',
          padding: '5rem 0',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '0',
        }}>
          {/* Diagonal gold accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, #F59E0B 30%, #FBBF24 50%, #F59E0B 70%, transparent 100%)',
          }} />
          {/* Glow spots */}
          <div style={{
            position: 'absolute', top: '-100px', left: '15%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-80px', right: '10%', width: '350px', height: '350px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} data-reveal>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6))' }} />
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: '#F59E0B',
                }}>Our Advantage</span>
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, rgba(245,158,11,0.6), transparent)' }} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)',
                fontWeight: 900, color: '#FFFFFF', margin: 0, lineHeight: 1.2,
              }}>
                Why Choose{' '}
                <span style={{
                  background: 'linear-gradient(90deg,#F59E0B,#FBBF24)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Alpha Office Interior?</span>
              </h2>
            </div>

            {/* 5 Feature Tiles */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1.5rem',
            }} className="why-grid-lux" data-reveal data-reveal-delay="150">
              {[
                { icon: Compass, label: 'Complete Solutions', body: 'All interior needs — civil, furniture, electrical — handled in-house.', num: '01' },
                { icon: Users, label: 'Expert Team', body: '25+ seasoned designers, engineers & project managers on every job.', num: '02' },
                { icon: Award, label: 'Premium Quality', body: 'Only certified, high-grade materials that stand the test of time.', num: '03' },
                { icon: Clock, label: 'On-Time Delivery', body: '95% of projects delivered on-schedule with zero compromise.', num: '04' },
                { icon: HeartHandshake, label: 'Client-First Culture', body: 'Your vision, budget & timeline are our top priority, always.', num: '05' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx}
                    className="adv-tile"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '24px',
                      padding: '2rem 1.25rem 1.75rem',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.35s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(245,158,11,0.07)';
                      e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)';
                      e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Number watermark */}
                    <div style={{
                      position: 'absolute', top: '1rem', right: '1.25rem',
                      fontSize: '2.5rem', fontWeight: 900, color: 'rgba(245,158,11,0.07)',
                      fontFamily: 'var(--font-heading)', lineHeight: 1,
                      userSelect: 'none',
                    }}>{item.num}</div>

                    {/* Icon */}
                    <div className="adv-icon" style={{
                      width: '56px', height: '56px', borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.06))',
                      border: '1px solid rgba(245,158,11,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}>
                      <Icon size={24} color="#FBBF24" strokeWidth={1.8} />
                    </div>

                    <h4 style={{
                      color: '#F1F5F9', fontSize: '0.95rem', fontWeight: 800,
                      marginBottom: '0.6rem', lineHeight: 1.3,
                    }}>{item.label}</h4>

                    <p style={{
                      color: '#64748B', fontSize: '0.78rem', lineHeight: 1.65,
                      margin: 0,
                    }}>{item.body}</p>

                    {/* Bottom gold line */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: '50%',
                      transform: 'translateX(-50%)',
                      width: '0', height: '2px',
                      background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                      borderRadius: '2px',
                      transition: 'width 0.35s ease',
                    }} className="tile-underline" />
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .sol-split { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
          @media (max-width: 820px) {
            .why-grid-lux { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .why-grid-lux { grid-template-columns: repeat(2, 1fr) !important; gap: 0.85rem !important; }
            .why-grid-lux .adv-tile { padding: 1.25rem 0.85rem 1.1rem !important; border-radius: 16px !important; }
          }
          .why-grid-lux > div:hover .tile-underline {
            width: 48px !important;
          }
        `}</style>
      </section>

      {/* Stats Counter Animated Section */}
      <StatsCounter />

      {/* SECTION 8: Our Projects (From Document Page 5) */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header" data-reveal>
            <span className="section-subtitle">Our Commitment</span>
            <h2 className="section-title">Transforming Spaces. <span className="gradient-text-navy">Delivering Excellence.</span></h2>
            <p className="section-desc">
              Every project reflects our commitment to quality, innovation, and functionality — across corporate and residential spaces.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }} data-reveal data-reveal-delay="150">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={onSelectProject} />
            ))}
          </div>

          {/* Bottom 5-Card Navy Strip "OUR COMMITMENT" from Page 5 */}
          <div style={{
            backgroundColor: '#0B1B36',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            color: '#FFFFFF',
            borderTop: '4px solid #F59E0B',
            boxShadow: 'var(--shadow-lg)'
          }} data-reveal data-reveal-delay="200">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#FBBF24', fontWeight: 800, letterSpacing: '0.1em' }}>
              OUR COMMITMENT
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              textAlign: 'center'
            }}>
              {[
                { icon: <Award size={28} color="#FBBF24" />, title: 'QUALITY ASSURANCE', desc: 'We use premium materials and follow stringent quality standards.' },
                { icon: <Lightbulb size={28} color="#FBBF24" />, title: 'INNOVATIVE DESIGNS', desc: 'Creative solutions that combine aesthetics with functionality.' },
                { icon: <Users size={28} color="#FBBF24" />, title: 'CLIENT FOCUSED', desc: 'We listen, understand, and deliver spaces that reflect your vision.' },
                { icon: <Clock size={28} color="#FBBF24" />, title: 'ON-TIME DELIVERY', desc: 'Timely execution with efficient project management.' },
                { icon: <HeartHandshake size={28} color="#FBBF24" />, title: 'END-TO-END SUPPORT', desc: 'From concept to completion, we handle everything for you.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.3rem' }}>{item.title}</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.8rem', lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <div data-reveal><TestimonialSlider /></div>

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

      <style>{`
        @keyframes serviceDetailIn {
          0% { opacity: 0; transform: translateY(-8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 800px) {
          .hero-split, .about-split, .checklist-split {
            grid-template-columns: 1fr !important;
          }
          .badge-hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
