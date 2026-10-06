import { useEffect, useState, useRef } from 'react';
import API, { BACKEND_URL } from '../api/client.js';
import { Plus, Trash2, Edit3, X, Save, ArrowUp, ArrowDown, Search } from 'lucide-react';

export function useApi(endpoint, single = false) {
  const [data, setData] = useState(single ? null : []);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await API.get(`/admin/${endpoint}`);
      setData(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  return { data, setData, loading, reload: load };
}

export function Toast({ toast }) {
  if (!toast) return null;
  return <div className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg z-50 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>{toast.message}</div>;
}

export function useToast() {
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => { setToast({ message, type }); setTimeout(() => setToast(null), 2500); };
  return { toast, showToast };
}

export function Field({ label, value, onChange, type = 'text', textarea = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold text-sm" />
      ) : (
        <input type={type} value={value ?? ''} onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold text-sm" />
      )}
    </div>
  );
}

export function ListEditor({ label, items, onChange }) {
  const update = (i, val) => { const next = [...items]; next[i] = val; onChange(next); };
  const add = () => onChange([...items, '']);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="space-y-2">
        {(items || []).map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={(e) => update(i, e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
            <button onClick={() => remove(i)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={add} className="text-sm text-gold hover:underline flex items-center gap-1"><Plus size={16} /> Add</button>
      </div>
    </div>
  );
}

export function ImageInput({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await API.post('/admin/upload', formData);
      onChange(res.data.url);
    } catch (err) { alert('Upload failed: ' + (err.response?.data?.message || err.message)); }
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Paste image URL or browse below"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Browse & Upload'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        {fileName && <span className="text-xs text-slate-500 truncate max-w-[200px]">{fileName}</span>}
      </div>
      {value && (
        <div className="mt-3 relative inline-block">
          <img src={value.startsWith('/') ? `${BACKEND_URL}${value}` : value}
            alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-slate-200"
            onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="%23e2e8f0"/><text x="64" y="68" font-size="12" text-anchor="middle" fill="%2394a3b8">No Image</text></svg>'; }} />
          <button type="button" onClick={() => { onChange(''); setFileName(''); }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">×</button>
        </div>
      )}
    </div>
  );
}

const TITLE_KEYS = ['title', 'name', 'question', 'label'];

// Detect whether a select field's options are boolean strings
const isBoolSelect = (f) => f.options?.every((o) => o === 'true' || o === 'false');

export function CrudPage({ title, endpoint, fields, newItemTemplate }) {
  const { data, setData, loading, reload } = useApi(endpoint);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const { toast, showToast } = useToast();

  const titleKey = fields.find((f) => TITLE_KEYS.includes(f.key))?.key || fields[0]?.key;

  const save = async () => {
    const missing = fields.find((f) => f.required && (editing[f.key] === undefined || editing[f.key] === null || String(editing[f.key]).trim() === ''));
    if (missing) { showToast(`"${missing.label}" is required`, 'error'); return; }
    setSaving(true);
    try {
      if (editing._id) {
        await API.put(`/admin/${endpoint}/${editing._id}`, editing);
        showToast('Updated successfully');
      } else {
        await API.post(`/admin/${endpoint}`, editing);
        showToast('Created successfully');
      }
      setEditing(null);
      reload();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error saving', 'error');
    }
    setSaving(false);
  };

  const del = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await API.delete(`/admin/${endpoint}/${id}`);
      showToast('Deleted');
      reload();
    } catch (err) { showToast('Delete failed', 'error'); }
  };

  const move = async (id, dir, idx) => {
    const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const ids = sorted.map((d) => d._id);
    [ids[idx], ids[swapIdx]] = [ids[swapIdx], ids[idx]];
    try {
      await API.put(`/admin/${endpoint}/reorder`, { ids });
      reload();
    } catch (err) { showToast('Reorder failed', 'error'); }
  };

  if (loading) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
  const filtered = search
    ? sorted.filter((item) => String(item[titleKey] || item.title || item.name || '').toLowerCase().includes(search.toLowerCase()))
    : sorted;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-navy">{title}</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold w-48" />
          </div>
          <button onClick={() => setEditing({ ...newItemTemplate, order: data.length })}
            className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-light">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const sortedIdx = sorted.findIndex((s) => s._id === item._id);
          return (
          <div key={item._id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-navy truncate">{item[titleKey] || item.title || item.name || '(untitled)'}</div>
                {fields.filter((f) => f.type !== 'image' && f.type !== 'list' && f.key !== titleKey).slice(0, 3).map((f) => (
                  <div key={f.key} className="text-slate-500 text-xs mt-1 line-clamp-2">
                    {typeof item[f.key] === 'boolean'
                      ? `${f.label}: ${item[f.key] ? 'Yes' : 'No'}`
                      : item[f.key]}
                  </div>
                ))}
              </div>
              {!search && (
                <div className="flex gap-1 ml-2 shrink-0">
                  <button onClick={() => move(item._id, 'up', sortedIdx)} className="text-slate-400 hover:text-navy"><ArrowUp size={16} /></button>
                  <button onClick={() => move(item._id, 'down', sortedIdx)} className="text-slate-400 hover:text-navy"><ArrowDown size={16} /></button>
                </div>
              )}
            </div>
            {fields.find((f) => f.type === 'image') && item[fields.find((f) => f.type === 'image').key] && (
              <img src={item[fields.find((f) => f.type === 'image').key]} alt="" className="w-full h-32 object-cover rounded-lg mb-2"
                onError={(e) => { e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="%23e2e8f0"/></svg>'; }} />
            )}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditing({ ...item })} className="flex-1 bg-slate-100 text-navy py-1.5 rounded-lg text-sm hover:bg-slate-200 flex items-center justify-center gap-1"><Edit3 size={14} /> Edit</button>
              <button onClick={() => del(item._id)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"><Trash2 size={14} /></button>
            </div>
          </div>
          );
        })}
        {filtered.length === 0 && <p className="text-slate-400 text-sm col-span-full text-center py-8">{search ? 'No matching items' : 'No items yet'}</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy">{editing._id ? 'Edit' : 'Add New'}</h2>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-navy"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              {fields.map((f) => {
                if (f.type === 'image') return <ImageInput key={f.key} label={f.label} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />;
                if (f.type === 'list') return <ListEditor key={f.key} label={f.label} items={editing[f.key] || []} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />;
                if (f.type === 'textarea') return <Field key={f.key} label={f.label} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} textarea />;
                if (f.type === 'number') return <Field key={f.key} label={f.label} type="number" value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />;
                if (f.type === 'select') {
                  const bool = isBoolSelect(f);
                  return (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}{f.required && <span className="text-red-500"> *</span>}</label>
                      <select
                        value={bool ? String(editing[f.key] ?? '') : (editing[f.key] ?? '')}
                        onChange={(e) => setEditing({ ...editing, [f.key]: bool ? e.target.value === 'true' : e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold">
                        <option value="">Select...</option>
                        {f.options.map((o) => <option key={o} value={o}>{bool ? (o === 'true' ? 'Yes' : 'No') : o}</option>)}
                      </select>
                    </div>
                  );
                }
                return <Field key={f.key} label={f.label + (f.required ? ' *' : '')} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />;
              })}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} disabled={saving} className="flex-1 bg-navy text-white py-2 rounded-lg font-semibold hover:bg-navy-light flex items-center justify-center gap-2 disabled:opacity-50">
                <Save size={18} /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setEditing(null)} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <Toast toast={toast} />
    </div>
  );
}

export function SinglePage({ title, endpoint, fields }) {
  const { data, loading, reload } = useApi(endpoint, true);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = async () => {
    const missing = fields.find((f) => f.required && (form[f.key] === undefined || form[f.key] === null || String(form[f.key]).trim() === ''));
    if (missing) { showToast(`"${missing.label}" is required`, 'error'); return; }
    setSaving(true);
    try {
      await API.put(`/admin/${endpoint}`, form);
      showToast('Saved successfully');
      reload();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error saving', 'error');
    }
    setSaving(false);
  };

  if (loading || !form) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">{title}</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <div className="space-y-4">
          {fields.map((f) => {
            if (f.type === 'image') return <ImageInput key={f.key} label={f.label} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />;
            if (f.type === 'textarea') return <Field key={f.key} label={f.label + (f.required ? ' *' : '')} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} textarea />;
            if (f.type === 'list') return <ListEditor key={f.key} label={f.label} items={form[f.key] || []} onChange={(v) => setForm({ ...form, [f.key]: v })} />;
            if (f.type === 'object') return (
              <div key={f.key} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">{f.label}</label>
                {f.subFields.map((sf) => (
                  <Field key={sf.key} label={sf.label} value={form[f.key]?.[sf.key]} onChange={(v) => setForm({ ...form, [f.key]: { ...form[f.key], [sf.key]: v } })} />
                ))}
              </div>
            );
            return <Field key={f.key} label={f.label + (f.required ? ' *' : '')} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />;
          })}
        </div>
        <button onClick={save} disabled={saving} className="mt-5 bg-navy text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-light disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
