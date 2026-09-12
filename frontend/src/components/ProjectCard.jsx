import React from 'react';
import { Maximize2, Compass, ShieldCheck, Award, Users, Monitor, BookOpen, Mic, Coffee } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {
  // Map icons based on project id / category
  const getIcon = (id) => {
    switch (id) {
      case 1: return <Monitor size={18} />;
      case 2: return <ShieldCheck size={18} />;
      case 3: return <Award size={18} />;
      case 4: return <Users size={18} />;
      case 5: return <Compass size={18} />;
      case 6: return <BookOpen size={18} />;
      case 7: return <Mic size={18} />;
      case 8: return <Coffee size={18} />;
      default: return <Award size={18} />;
    }
  };

  const formattedNum = project.id < 10 ? `0${project.id}` : `${project.id}`;

  return (
    <div 
      onClick={() => onClick(project)}
      className="card"
      data-reveal
      data-reveal-delay={(project.id - 1) * 80}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid rgba(217, 164, 65, 0.25)',
        background: '#FFFFFF'
      }}
    >
      {/* Image Banner */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="project-card-img"
        />

        {/* Number Badge (01, 02, etc.) */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          backgroundColor: '#0B1F3A',
          color: '#FFFFFF',
          fontSize: '0.85rem',
          fontWeight: 800,
          padding: '0.35rem 0.85rem',
          borderRadius: '8px',
          border: '1px solid #D9A441',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          fontFamily: 'var(--font-heading)'
        }}>
          {formattedNum}
        </div>

        {/* Hover Lightbox Icon */}
        <div className="project-expand-btn" style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#D9A441',
          color: '#0B1F3A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          transition: 'transform 0.3s ease'
        }}>
          <Maximize2 size={16} />
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ color: 'var(--color-navy)', fontSize: '1.15rem', fontWeight: 800 }}>
            {project.title}
          </h3>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(217, 164, 65, 0.15)',
            color: '#C98F1E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {getIcon(project.id)}
          </div>
        </div>

        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.description}
        </p>
      </div>

      <style>{`
        .card:hover .project-card-img {
          transform: scale(1.08);
        }
        .card:hover .project-expand-btn {
          transform: scale(1.1) rotate(90deg);
        }
      `}</style>
    </div>
  );
}
