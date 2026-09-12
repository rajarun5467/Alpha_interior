import { useEffect, useState } from 'react';
import API from '../api/client.js';
import { Plus, Trash2, Edit3, X, Save, ArrowUp, ArrowDown } from 'lucide-react';

export function useApi(endpoint, single = false) {
  const [data, setData] = useState(single ? null : []);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await API.get(single ? `/admin/${endpoint}` : `/admin/${endpoint}`);
      setData(single ? res.data : res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);
  return { data, setData, loading, reload: load };
}

export function Toast({ message, type = 'success' }) {
  if (!message) return null;
  return <div className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{message}</div>;
}

export function Field({ label, value, onChange, type = 'text', textarea = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold text-sm" />
      ) : (
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)}
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
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await API.post('/admin/upload', formData);
      onChange(res.data.url);
    } catch (err) { alert('Upload failed'); }
    setUploading(false);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex gap-2 items-start">
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Image URL"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold" />
        <label className="cursor-pointer bg-slate-100 px-3 py-2 rounded-lg text-sm hover:bg-slate-200">
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>
      {value && <img src={value} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg border" />}
    </div>
  );
}

export function CrudPage({ title, endpoint, fields, newItemTemplate }) {
  const { data, setData, loading, reload } = useApi(endpoint);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const save = async () => {
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
    } catch (err) { showToast('Error saving', 'error'); }
  };

  const del = async (id) => {
    if (!confirm('Delete this item?')) return;
    await API.delete(`/admin/${endpoint}/${id}`);
    showToast('Deleted');
    reload();
  };

  const move = async (id, dir, idx) => {
    const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const ids = sorted.map((d) => d._id);
    [ids[idx], ids[swapIdx]] = [ids[swapIdx], ids[idx]];
    await API.put(`/admin/${endpoint}/reorder`, { ids });
    reload();
  };

  if (loading) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">{title}</h1>
        <button onClick={() => setEditing({ ...newItemTemplate, order: data.length })}
          className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg font-semibold hover:bg-navy-light">
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item, idx) => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                {fields.map((f) => f.type === 'image' ? null : (
                  <div key={f.key} className="text-sm">
                    {f.label === 'Title' || f.label === 'Name' || f.label === 'Question' || f.label === 'Label' ? (
                      <div className="font-semibold text-navy">{item[f.key]}</div>
                    ) : f.type === 'list' ? null : (
                      <div className="text-slate-500 text-xs mt-1 line-clamp-2">{item[f.key]}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-1 ml-2">
                <button onClick={() => move(item._id, 'up', idx)} className="text-slate-400 hover:text-navy"><ArrowUp size={16} /></button>
                <button onClick={() => move(item._id, 'down', idx)} className="text-slate-400 hover:text-navy"><ArrowDown size={16} /></button>
              </div>
            </div>
            {fields.find((f) => f.type === 'image') && item[fields.find((f) => f.type === 'image').key] && (
              <img src={item[fields.find((f) => f.type === 'image').key]} alt="" className="w-full h-32 object-cover rounded-lg mb-2" />
            )}
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditing({ ...item })} className="flex-1 bg-slate-100 text-navy py-1.5 rounded-lg text-sm hover:bg-slate-200 flex items-center justify-center gap-1"><Edit3 size={14} /> Edit</button>
              <button onClick={() => del(item._id)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
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
                if (f.type === 'number') return <Field key={f.key} label={f.label} type="number" value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: Number(v) })} />;
                if (f.type === 'select') return (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
                    <select value={editing[f.key] || ''} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gold">
                      <option value="">Select...</option>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                );
                return <Field key={f.key} label={f.label} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />;
              })}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={save} className="flex-1 bg-navy text-white py-2 rounded-lg font-semibold hover:bg-navy-light flex items-center justify-center gap-2"><Save size={18} /> Save</button>
              <button onClick={() => setEditing(null)} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <Toast message={toast} />
    </div>
  );
}

export function SinglePage({ title, endpoint, fields }) {
  const { data, loading, reload } = useApi(endpoint, true);
  const [form, setForm] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => { if (data) setForm(data); }, [data]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const save = async () => {
    try {
      await API.put(`/admin/${endpoint}`, form);
      showToast('Saved successfully');
      reload();
    } catch (err) { showToast('Error saving', 'error'); }
  };

  if (loading || !form) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">{title}</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <div className="space-y-4">
          {fields.map((f) => {
            if (f.type === 'image') return <ImageInput key={f.key} label={f.label} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />;
            if (f.type === 'textarea') return <Field key={f.key} label={f.label} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} textarea />;
            if (f.type === 'list') return <ListEditor key={f.key} label={f.label} items={form[f.key] || []} onChange={(v) => setForm({ ...form, [f.key]: v })} />;
            if (f.type === 'object') return (
              <div key={f.key} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">{f.label}</label>
                {f.subFields.map((sf) => (
                  <Field key={sf.key} label={sf.label} value={form[f.key]?.[sf.key]} onChange={(v) => setForm({ ...form, [f.key]: { ...form[f.key], [sf.key]: v } })} />
                ))}
              </div>
            );
            return <Field key={f.key} label={f.label} value={form[f.key]} onChange={(v) => setForm({ ...form, [f.key]: v })} />;
          })}
        </div>
        <button onClick={save} className="mt-5 bg-navy text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-light">Save Changes</button>
      </div>
      <Toast message={toast} />
    </div>
  );
}
