import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = '918178782919';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Alpha%20Office%20Interior,%20I%20would%20like%20to%20inquire%20about%20office%20interior%20services.`;

  return (
    <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 999 }}>
      {/* Tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          backgroundColor: '#07152B',
          color: '#FFFFFF',
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          border: '1px solid #D9A441',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          Chat on WhatsApp with <strong>Alpha Office</strong>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: hovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
          position: 'relative'
        }}
      >
        <MessageSquare size={30} fill="#FFFFFF" color="#25D366" />
        
        {/* Pulse ring animation */}
        <span style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '2px solid #25D366',
          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
          opacity: 0.7
        }}></span>
      </a>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
