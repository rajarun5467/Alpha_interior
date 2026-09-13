import { CrudPage, SinglePage, Field, ImageInput, useApi, Toast } from '../components/CrudComponents.jsx';
import { useEffect, useState } from 'react';
import API from '../api/client.js';
import { Plus, Trash2, Save, Calculator } from 'lucide-react';

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

export function CostCalculatorConfigManager() {
  const { data, loading, reload } = useApi('cost-calculator-config', true);
  const [form, setForm] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => { if (data) setForm(data); }, [data]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const save = async () => {
    try {
      await API.put('/admin/cost-calculator-config', form);
      showToast('Saved successfully');
      reload();
    } catch (err) { showToast('Error saving', 'error'); }
  };

  // ── Space Types helpers ──
  const addSpaceType = () => setForm({ ...form, spaceTypes: [...(form.spaceTypes || []), { id: '', label: '' }] });
  const updateSpaceType = (i, field, val) => {
    const next = [...(form.spaceTypes || [])];
    next[i] = { ...next[i], [field]: val };
    setForm({ ...form, spaceTypes: next });
  };
  const removeSpaceType = (i) => setForm({ ...form, spaceTypes: (form.spaceTypes || []).filter((_, idx) => idx !== i) });

  // ── Packages helpers ──
  const addPackage = () => setForm({ ...form, packages: [...(form.packages || []), { id: '', label: '', ratePerSqft: 0, timelinePer1000sqft: 0 }] });
  const updatePackage = (i, field, val) => {
    const next = [...(form.packages || [])];
    next[i] = { ...next[i], [field]: field === 'ratePerSqft' || field === 'timelinePer1000sqft' ? Number(val) : val };
    setForm({ ...form, packages: next });
  };
  const removePackage = (i) => setForm({ ...form, packages: (form.packages || []).filter((_, idx) => idx !== i) });

  if (loading || !form) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-navy text-gold p-2.5 rounded-lg"><Calculator size={22} /></div>
        <div>
          <h1 className="text-2xl font-bold text-navy">Cost Calculator Config</h1>
          <p className="text-sm text-slate-500">Configure area range, space types & pricing packages shown on the public cost calculator.</p>
        </div>
      </div>

      {/* ── Area Range ── */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-navy mb-4 pb-2 border-b border-slate-100">📐 Area Range (Sq. Ft.)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Minimum Area</label>
            <input type="number" value={form.areaRange?.min ?? 500} onChange={(e) => setForm({ ...form, areaRange: { ...form.areaRange, min: Number(e.target.value) } })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Maximum Area</label>
            <input type="number" value={form.areaRange?.max ?? 15000} onChange={(e) => setForm({ ...form, areaRange: { ...form.areaRange, max: Number(e.target.value) } })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Step Size</label>
            <input type="number" value={form.areaRange?.step ?? 100} onChange={(e) => setForm({ ...form, areaRange: { ...form.areaRange, step: Number(e.target.value) } })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
          </div>
        </div>
      </div>

      {/* ── Space Types ── */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-lg font-bold text-navy">🏢 Space Types</h2>
          <button onClick={addSpaceType} className="flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-navy-light">
            <Plus size={16} /> Add Space Type
          </button>
        </div>
        <div className="space-y-3">
          {(form.spaceTypes || []).map((st, i) => (
            <div key={i} className="flex gap-2 items-center bg-slate-50 p-3 rounded-lg">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input value={st.id || ''} onChange={(e) => updateSpaceType(i, 'id', e.target.value)} placeholder="ID (e.g. corporate)"
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
                <input value={st.label || ''} onChange={(e) => updateSpaceType(i, 'label', e.target.value)} placeholder="Label (e.g. Corporate Office)"
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <button onClick={() => removeSpaceType(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
            </div>
          ))}
          {(!form.spaceTypes || form.spaceTypes.length === 0) && <p className="text-sm text-slate-400 italic">No space types yet. Click "Add Space Type" to create one.</p>}
        </div>
      </div>

      {/* ── Packages ── */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-lg font-bold text-navy">💰 Pricing Packages</h2>
          <button onClick={addPackage} className="flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-navy-light">
            <Plus size={16} /> Add Package
          </button>
        </div>
        <div className="space-y-3">
          {(form.packages || []).map((pkg, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input value={pkg.id || ''} onChange={(e) => updatePackage(i, 'id', e.target.value)} placeholder="ID (e.g. essential)"
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
                  <input value={pkg.label || ''} onChange={(e) => updatePackage(i, 'label', e.target.value)} placeholder="Label (e.g. Essential)"
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <button onClick={() => removePackage(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Rate per Sq. Ft. (₹)</label>
                  <input type="number" value={pkg.ratePerSqft ?? 0} onChange={(e) => updatePackage(i, 'ratePerSqft', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Timeline per 1000 Sq. Ft. (days)</label>
                  <input type="number" value={pkg.timelinePer1000sqft ?? 0} onChange={(e) => updatePackage(i, 'timelinePer1000sqft', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
                </div>
              </div>
            </div>
          ))}
          {(!form.packages || form.packages.length === 0) && <p className="text-sm text-slate-400 italic">No packages yet. Click "Add Package" to create one.</p>}
        </div>
      </div>

      {/* ── Save Button ── */}
      <button onClick={save} className="flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-light">
        <Save size={18} /> Save Changes
      </button>
      <Toast message={toast} />
    </div>
  );
}
