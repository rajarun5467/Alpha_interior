import React, { useState } from 'react';
import { Layers, ShieldCheck, Award, Clock, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SkylineVector from '../components/SkylineVector';

export default function ProjectsPage({ onSelectProject, onOpenQuoteModal }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Modern Workspaces',
    'Glass Partition Solutions',
    'Director Cabin',
    'Reception Area',
    'Conference Room',
    'School Furniture',
    'Seminar Hall',
    'Office Cafeteria'
  ];

  const allProjects = [
    {
      id: 1,
      title: 'Modern Workspaces',
      category: 'Modern Workspaces',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      description: 'Ergonomic and efficient workspaces designed to enhance productivity, collaboration, and employee well-being in open-plan IT offices.',
      features: ['Ergonomic Task Seating', 'Under-Desk Power Raceway', 'Sound Absorbing Fabric Panels']
    },
    {
      id: 2,
      title: 'Glass Partition Solutions',
      category: 'Glass Partition Solutions',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      description: 'Stylish and functional glass partitions creating open, modern, professional environments while maintaining privacy and sound damping.',
      features: ['Acoustic Laminated Toughened Glass', 'Sleek Aluminium Frame', 'Custom Frosted Stripe Branding']
    },
    {
      id: 3,
      title: 'Director Cabin Suite',
      category: 'Director Cabin',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      description: 'Premium designs reflecting leadership, sophistication, comfort and functionality for top executive suites and management cabins.',
      features: ['Executive Wooden Veneer Table', 'Private Sofa Lounge', 'Warm Ambient Cove Lights']
    },
    {
      id: 4,
      title: 'Corporate Reception Area',
      category: 'Reception Area',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
      description: 'Beautifully designed reception areas creating a lasting first impression for visiting corporate clients, partners, and employees.',
      features: ['Corian Backlit Desk', 'Marble Wall Cladding', 'Plush Visitor Waiting Chairs']
    },
    {
      id: 5,
      title: 'Conference & Board Room',
      category: 'Conference Room',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      description: 'Well-planned rooms equipped for effective meetings, hybrid video conferencing, and high-level corporate collaboration.',
      features: ['Integrated Video Conf System', 'Pop-up Wire Ports', 'Slotted Acoustic Ceiling']
    },
    {
      id: 6,
      title: 'Modular School Furniture',
      category: 'School Furniture',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      description: 'Durable and comfortable furniture supporting learning, student posture, and well-being across primary and senior classrooms.',
      features: ['Heavy Gauge MS Steel Frame', 'Postformed Scratchless Edge', 'Book Storage Shelves']
    },
    {
      id: 7,
      title: 'Institutional Seminar Hall',
      category: 'Seminar Hall',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      description: 'Spacious, well-equipped halls for training workshops, corporate orientation events, and academic seminars.',
      features: ['Tiered Auditorium Seating', 'Stage Podium & Sound Rig', 'Acoustic Soundproofing']
    },
    {
      id: 8,
      title: 'Vibrant Office Cafeteria',
      category: 'Office Cafeteria',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      description: 'Vibrant, comfortable cafeterias for employees to unwind, recharge, and enjoy casual team interactions.',
      features: ['Hygienic Easy-Clean Surfaces', 'Industrial Open Ceiling', 'Relaxing Lounge Booths']
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="projects-page">
      {/* Portfolio Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #07152B 0%, #0B1F3A 100%)',
        padding: '4rem 0 3.5rem 0',
        color: '#FFFFFF',
        position: 'relative',
        borderBottom: '3px solid #D9A441'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span data-reveal style={{ fontSize: '0.85rem', color: '#D9A441', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Alpha Project Portfolio
          </span>
          <h1 data-reveal data-reveal-delay="100" style={{ fontSize: '3rem', color: '#FFFFFF', marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Excellence In Space Execution
          </h1>
          <p data-reveal data-reveal-delay="200" style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '700px', margin: '0.75rem auto 0' }}>
            Explore our finished corporate office fit-outs, executive cabins, glass partitions, and institutional seating.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <SkylineVector opacity={0.25} fill="#D9A441" height="40px" />
        </div>
      </section>

      {/* Filterable Portfolio Gallery */}
      <section className="section-padding geo-accent-bg">
        <div className="container">
          
          {/* Filter Pills */}
          <div style={{
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem'
          }} data-reveal>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '30px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                  backgroundColor: activeCategory === cat ? '#0B1F3A' : '#FFFFFF',
                  color: activeCategory === cat ? '#D9A441' : 'var(--color-navy)',
                  border: activeCategory === cat ? '2px solid #D9A441' : '1px solid #CBD5E1',
                  boxShadow: activeCategory === cat ? 'var(--shadow-md)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }} data-reveal data-reveal-delay="150">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={onSelectProject} />
            ))}
          </div>

        </div>
      </section>

      {/* Client Logos Section */}
      <section style={{ backgroundColor: '#07152B', padding: '3.5rem 0', color: '#FFFFFF', borderTop: '1px solid rgba(217, 164, 65, 0.2)' }}>
        <div className="container" style={{ textAlign: 'center' }} data-reveal>
          <div style={{ fontSize: '0.85rem', color: '#D9A441', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Featured Partner Organizations & Corporate Clients
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '3.5rem' }}>
            {['Wipro', 'Pinaakee Digital', 'TechVision Global', 'Skyline Infra', 'Apex Education'].map((client, idx) => (
              <div key={idx} style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '-0.02em'
              }}>
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Our Commitment" Banner Strip */}
      <section style={{ backgroundColor: 'var(--color-gold-light)', padding: '3rem 0', borderTop: '1px solid rgba(217, 164, 65, 0.3)', borderBottom: '1px solid rgba(217, 164, 65, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }} data-reveal>
            <h3 style={{ color: 'var(--color-navy)', fontSize: '1.6rem' }}>Our Commitment To Every Client</h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }} data-reveal data-reveal-delay="150">
            {[
              { icon: <Award size={24} color="#C98F1E" />, label: 'Quality Assurance' },
              { icon: <Layers size={24} color="#C98F1E" />, label: 'Innovative Designs' },
              { icon: <HeartHandshake size={24} color="#C98F1E" />, label: 'Client Focused' },
              { icon: <Clock size={24} color="#C98F1E" />, label: 'On-Time Delivery' },
              { icon: <ShieldCheck size={24} color="#C98F1E" />, label: 'End-to-End Support' }
            ].map((c, idx) => (
              <div key={idx} style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem 1rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                fontSize: '0.95rem'
              }}>
                {c.icon} {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ backgroundColor: 'var(--color-navy)', padding: '4.5rem 0', color: '#FFFFFF', textAlign: 'center' }}>
        <div className="container" data-reveal="scale">
          <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>Have A Custom Space Concept In Mind?</h2>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Let our 3D space architects model your exact office floor plan with custom furniture and lighting.
          </p>
          <button onClick={onOpenQuoteModal} className="btn btn-gold btn-lg">
            Start Your Project Consultation <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
