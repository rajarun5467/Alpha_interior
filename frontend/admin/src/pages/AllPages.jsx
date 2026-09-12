import { CrudPage, SinglePage, Field, ImageInput, useApi, Toast } from '../components/CrudComponents.jsx';
import { useEffect, useState } from 'react';
import API from '../api/client.js';

export function Settings() {
  return <SinglePage title="Site Settings" endpoint="settings" fields={[
    { key: 'brandName', label: 'Brand Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address', type: 'textarea' },
    { key: 'whatsappNumber', label: 'WhatsApp Number' },
    { key: 'whatsappMessage', label: 'WhatsApp Message', type: 'textarea' },
    { key: 'mapEmbedUrl', label: 'Google Maps Embed URL', type: 'textarea' },
    { type: 'object', key: 'socialLinks', label: 'Social Links', subFields: [
      { key: 'facebook', label: 'Facebook URL' },
      { key: 'instagram', label: 'Instagram URL' },
      { key: 'linkedin', label: 'LinkedIn URL' },
      { key: 'pinterest', label: 'Pinterest URL' }
    ]},
    { type: 'object', key: 'seo', label: 'SEO', subFields: [
      { key: 'title', label: 'Page Title' },
      { key: 'description', label: 'Meta Description', type: 'textarea' }
    ]},
    { type: 'object', key: 'brandColors', label: 'Brand Colors', subFields: [
      { key: 'navy', label: 'Navy Color' },
      { key: 'gold', label: 'Gold Color' },
      { key: 'goldDark', label: 'Gold Dark Color' }
    ]}
  ]} />;
}

export function HeroManager() {
  return <SinglePage title="Hero Manager" endpoint="hero" fields={[
    { key: 'headline', label: 'Headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'textarea' },
    { key: 'image', label: 'Hero Image', type: 'image' },
    { key: 'chips', label: 'Floating Chips', type: 'list' },
    { key: 'ctaButtons', label: 'CTA Buttons (label, link, style)', type: 'list' }
  ]} />;
}

export function ServicesManager() {
  return <CrudPage title="Services Manager" endpoint="services" fields={[
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'icon', label: 'Icon (lucide name)' },
    { key: 'highlights', label: 'Highlights', type: 'list' },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ title: '', description: '', image: '', icon: 'Building', highlights: [], isActive: true }} />;
}

export function ProjectsManager() {
  return <CrudPage title="Projects Manager" endpoint="projects" fields={[
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'features', label: 'Features', type: 'list' },
    { key: 'isFeatured', label: 'Featured', type: 'select', options: ['true', 'false'] },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ title: '', category: '', image: '', description: '', features: [], isFeatured: false, isActive: true }} />;
}

export function TestimonialsManager() {
  return <CrudPage title="Testimonials Manager" endpoint="testimonials" fields={[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'company', label: 'Company' },
    { key: 'avatar', label: 'Avatar', type: 'image' },
    { key: 'quote', label: 'Quote', type: 'textarea' },
    { key: 'stars', label: 'Stars', type: 'number' },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ name: '', role: '', company: '', avatar: '', quote: '', stars: 5, isActive: true }} />;
}

export function StatsManager() {
  return <CrudPage title="Stats Manager" endpoint="stats" fields={[
    { key: 'target', label: 'Target Number', type: 'number' },
    { key: 'suffix', label: 'Suffix (+, %)' },
    { key: 'label', label: 'Label' },
    { key: 'description', label: 'Description' },
    { key: 'icon', label: 'Icon (lucide name)' },
    { key: 'color', label: 'Color' }
  ]} newItemTemplate={{ target: 0, suffix: '+', label: '', description: '', icon: 'Award', color: '#F59E0B' }} />;
}

export function FaqsManager() {
  return <CrudPage title="FAQ Manager" endpoint="faqs" fields={[
    { key: 'question', label: 'Question' },
    { key: 'answer', label: 'Answer', type: 'textarea' },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ question: '', answer: '', isActive: true }} />;
}

export function ProcessStepsManager() {
  return <CrudPage title="Process Steps Manager" endpoint="process-steps" fields={[
    { key: 'number', label: 'Number (01, 02...)' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon (lucide name)' }
  ]} newItemTemplate={{ number: '', title: '', description: '', icon: 'CheckCircle2' }} />;
}

export function ClientLogosManager() {
  return <CrudPage title="Client Logos Manager" endpoint="client-logos" fields={[
    { key: 'name', label: 'Client Name' },
    { key: 'isActive', label: 'Active', type: 'select', options: ['true', 'false'] }
  ]} newItemTemplate={{ name: '', isActive: true }} />;
}

export function AdvantageTilesManager() {
  return <CrudPage title="Advantage Tiles Manager" endpoint="advantage-tiles" fields={[
    { key: 'group', label: 'Group', type: 'select', options: ['home-what-we-do', 'home-why-choose', 'services-advantage', 'projects-commitment'] },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon (lucide name)' }
  ]} newItemTemplate={{ group: 'home-what-we-do', title: '', description: '', icon: 'Award' }} />;
}

export function TransformationTabsManager() {
  return <CrudPage title="Transformation Tabs Manager" endpoint="transformation-tabs" fields={[
    { key: 'id', label: 'ID' },
    { key: 'label', label: 'Label' },
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'bullets', label: 'Bullets', type: 'list' }
  ]} newItemTemplate={{ id: '', label: '', title: '', image: '', description: '', bullets: [] }} />;
}

export function AboutContentManager() {
  return <SinglePage title="About Content Manager" endpoint="about-content" fields={[
    { key: 'pullQuote', label: 'Pull Quote (text)', type: 'textarea' }
  ]} />;
}

export function CostCalculatorConfigManager() {
  return <SinglePage title="Cost Calculator Config" endpoint="cost-calculator-config" fields={[]} />;
}

export function PageHeadersManager() {
  const { data, loading, reload } = useApi('page-headers');
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const pages = ['about', 'services', 'projects', 'contact'];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const save = async () => {
    try {
      await API.put(`/admin/page-headers/${editing.page}`, editing);
      showToast('Saved');
      setEditing(null);
      reload();
    } catch { showToast('Error', 'error'); }
  };

  if (loading) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Page Headers Manager</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {pages.map((page) => {
          const header = data.find((h) => h.page === page) || { page, subtitle: '', title: '', description: '' };
          return (
            <div key={page} className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-navy capitalize mb-2">{page}</h3>
              <div className="text-sm text-slate-500 mb-1">{header.subtitle}</div>
              <div className="text-sm font-medium text-navy mb-1">{header.title}</div>
              <div className="text-xs text-slate-400 line-clamp-2">{header.description}</div>
              <button onClick={() => setEditing({ ...header })} className="mt-2 text-sm text-gold hover:underline">Edit</button>
            </div>
          );
        })}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-navy mb-4 capitalize">{editing.page} Header</h2>
            <div className="space-y-3">
              <Field label="Subtitle" value={editing.subtitle} onChange={(v) => setEditing({ ...editing, subtitle: v })} />
              <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
            </div>
            <button onClick={save} className="mt-4 w-full bg-navy text-white py-2 rounded-lg font-semibold">Save</button>
          </div>
        </div>
      )}
      <Toast message={toast} />
    </div>
  );
}

export function CtaBannersManager() {
  const { data, loading, reload } = useApi('cta-banners');
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const locations = ['home-final', 'about-final', 'services', 'projects', 'footer-top'];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const save = async () => {
    try {
      await API.put(`/admin/cta-banners/${editing.location}`, editing);
      showToast('Saved');
      setEditing(null);
      reload();
    } catch { showToast('Error', 'error'); }
  };

  if (loading) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">CTA Banners Manager</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {locations.map((loc) => {
          const banner = data.find((b) => b.location === loc) || { location: loc, title: '', description: '' };
          return (
            <div key={loc} className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-navy mb-2">{loc}</h3>
              <div className="text-sm font-medium text-navy">{banner.title}</div>
              <div className="text-xs text-slate-400 line-clamp-2">{banner.description}</div>
              <button onClick={() => setEditing({ ...banner })} className="mt-2 text-sm text-gold hover:underline">Edit</button>
            </div>
          );
        })}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-navy mb-4">{editing.location}</h2>
            <div className="space-y-3">
              <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Field label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} textarea />
            </div>
            <button onClick={save} className="mt-4 w-full bg-navy text-white py-2 rounded-lg font-semibold">Save</button>
          </div>
        </div>
      )}
      <Toast message={toast} />
    </div>
  );
}

export function FooterConfigManager() {
  return <SinglePage title="Footer Config" endpoint="footer-config" fields={[
    { key: 'ctaTitle', label: 'CTA Title' },
    { key: 'ctaDescription', label: 'CTA Description', type: 'textarea' },
    { key: 'serviceLinks', label: 'Service Links', type: 'list' },
    { key: 'copyrightText', label: 'Copyright Text' },
    { key: 'designedByText', label: 'Designed By Text' }
  ]} />;
}
