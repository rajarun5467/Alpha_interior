import { useEffect, useState } from 'react';
import API from '../api/client.js';
import { Users, Briefcase, Star, FolderKanban, TrendingUp, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ quotes: 0, contacts: 0, projects: 0, services: 0, testimonials: 0 });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      API.get('/admin/leads/quotes').catch(() => ({ data: [] })),
      API.get('/admin/leads/contacts').catch(() => ({ data: [] })),
      API.get('/admin/projects').catch(() => ({ data: [] })),
      API.get('/admin/services').catch(() => ({ data: [] })),
      API.get('/admin/testimonials').catch(() => ({ data: [] }))
    ]).then(([q, c, p, s, t]) => {
      setStats({ quotes: q.data.length, contacts: c.data.length, projects: p.data.length, services: s.data.length, testimonials: t.data.length });
      setRecentQuotes(q.data.slice(0, 5));
      setRecentContacts(c.data.slice(0, 5));
    });
  }, []);

  const cards = [
    { label: 'Quote Leads', value: stats.quotes, icon: Mail, color: 'bg-blue-500' },
    { label: 'Contact Leads', value: stats.contacts, icon: Phone, color: 'bg-green-500' },
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'bg-purple-500' },
    { label: 'Services', value: stats.services, icon: Briefcase, color: 'bg-gold' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'bg-pink-500' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-2`}>
                <Icon size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-navy">{card.value}</div>
              <div className="text-sm text-slate-500">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy">Recent Quote Submissions</h2>
            <button onClick={() => navigate('/leads')} className="text-sm text-gold hover:underline">View All</button>
          </div>
          {recentQuotes.length === 0 ? <p className="text-slate-400 text-sm">No leads yet</p> : (
            <div className="space-y-2">
              {recentQuotes.map((q) => (
                <div key={q._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                  <div>
                    <div className="text-sm font-medium text-navy">{q.name}</div>
                    <div className="text-xs text-slate-500">{q.service} · {q.city}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${q.status === 'new' ? 'bg-blue-100 text-blue-700' : q.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{q.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy">Recent Contact Submissions</h2>
            <button onClick={() => navigate('/leads')} className="text-sm text-gold hover:underline">View All</button>
          </div>
          {recentContacts.length === 0 ? <p className="text-slate-400 text-sm">No leads yet</p> : (
            <div className="space-y-2">
              {recentContacts.map((c) => (
                <div key={c._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                  <div>
                    <div className="text-sm font-medium text-navy">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.service}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'new' ? 'bg-blue-100 text-blue-700' : c.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
