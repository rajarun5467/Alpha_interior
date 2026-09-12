import { useEffect, useState } from 'react';
import API from '../api/client.js';
import { Download, Trash2, X, Search } from 'lucide-react';

export default function Leads() {
  const [tab, setTab] = useState('quotes');
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/admin/leads/quotes').catch(() => ({ data: [] })),
      API.get('/admin/leads/contacts').catch(() => ({ data: [] }))
    ]).then(([q, c]) => {
      setQuotes(q.data);
      setContacts(c.data);
      setLoading(false);
    });
  }, []);

  const data = tab === 'quotes' ? quotes : contacts;
  const filtered = data.filter((d) => {
    const matchSearch = !search || d.name?.toLowerCase().includes(search.toLowerCase()) || d.phone?.includes(search);
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/leads/${tab}/${id}`, { status });
      const updated = (tab === 'quotes' ? quotes : contacts).map((d) => d._id === id ? { ...d, status } : d);
      if (tab === 'quotes') setQuotes(updated); else setContacts(updated);
      setSelected({ ...selected, status });
    } catch (err) { alert('Failed to update status'); }
  };

  const deleteLead = async (id) => {
    if (!confirm('Delete this lead?')) return;
    try {
      await API.delete(`/admin/leads/${tab}/${id}`);
      if (tab === 'quotes') setQuotes(quotes.filter((d) => d._id !== id)); else setContacts(contacts.filter((d) => d._id !== id));
      setSelected(null);
    } catch (err) { alert('Failed to delete'); }
  };

  const exportCSV = () => {
    const headers = tab === 'quotes'
      ? ['Name', 'Phone', 'Email', 'City', 'Service', 'Message', 'Date', 'Status']
      : ['Name', 'Email', 'Phone', 'Service', 'Message', 'Date', 'Status'];
    const rows = filtered.map((d) => tab === 'quotes'
      ? [d.name, d.phone, d.email, d.city, d.service, d.message, new Date(d.submittedAt).toLocaleString(), d.status]
      : [d.name, d.email, d.phone, d.service, d.message, new Date(d.submittedAt).toLocaleString(), d.status]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${tab}-leads.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="text-center text-slate-500 mt-20">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Leads Management</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg font-semibold hover:bg-gold-dark transition-colors">
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('quotes')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'quotes' ? 'bg-navy text-white' : 'bg-white text-slate-600'}`}>Quote Submissions ({quotes.length})</button>
        <button onClick={() => setTab('contacts')} className={`px-4 py-2 rounded-lg font-medium ${tab === 'contacts' ? 'bg-navy text-white' : 'bg-white text-slate-600'}`}>Contact Submissions ({contacts.length})</button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
          <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-gold">
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-600 text-sm">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Service</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d._id} onClick={() => setSelected(d)} className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer">
                <td className="px-4 py-3 text-sm font-medium text-navy">{d.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{d.phone}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{d.service}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(d.submittedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${d.status === 'new' ? 'bg-blue-100 text-blue-700' : d.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{d.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="5" className="text-center text-slate-400 py-8">No leads found</td></tr>}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy">Lead Details</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-navy"><X size={20} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-slate-500">Name:</span> <span className="font-medium text-navy">{selected.name}</span></div>
              <div><span className="text-slate-500">Phone:</span> <span className="font-medium text-navy">{selected.phone}</span></div>
              {selected.email && <div><span className="text-slate-500">Email:</span> <span className="font-medium text-navy">{selected.email}</span></div>}
              {selected.city && <div><span className="text-slate-500">City:</span> <span className="font-medium text-navy">{selected.city}</span></div>}
              <div><span className="text-slate-500">Service:</span> <span className="font-medium text-navy">{selected.service}</span></div>
              <div><span className="text-slate-500">Date:</span> <span className="font-medium text-navy">{new Date(selected.submittedAt).toLocaleString()}</span></div>
              <div><span className="text-slate-500">Message:</span><div className="mt-1 p-3 bg-slate-50 rounded-lg text-slate-700">{selected.message || 'No message'}</div></div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => updateStatus(selected._id, 'contacted')} className="flex-1 bg-yellow-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-yellow-600">Mark Contacted</button>
              <button onClick={() => updateStatus(selected._id, 'closed')} className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600">Mark Closed</button>
              <button onClick={() => deleteLead(selected._id)} className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100"><Trash2 size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
