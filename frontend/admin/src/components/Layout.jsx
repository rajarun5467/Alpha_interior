import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  LayoutDashboard, Users, Settings as SettingsIcon, Briefcase, FolderKanban,
  Star, Layers,
  Calculator, LogOut, Menu, X
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leads', label: 'Leads', icon: Users },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/testimonials', label: 'Testimonials', icon: Star },
  { path: '/transformation-tabs', label: 'Transformation', icon: Layers },
  { path: '/cost-calculator', label: 'Cost Calculator', icon: Calculator },
  { path: '/settings', label: 'Site Settings', icon: SettingsIcon }
];

export function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 w-64 h-full bg-navy text-white transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <img src="/logo.jpg" alt="Alpha Office Interior" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
          <div>
            <div className="text-xl font-bold leading-tight">ALPHA <span className="text-gold">OFFICE</span></div>
            <div className="text-xs text-slate-400 tracking-widest">ADMIN PANEL</div>
          </div>
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-140px)] py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${active ? 'bg-gold/20 text-gold border-r-2 border-gold' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                <Icon size={18} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-navy"><Menu size={24} /></button>
          <div className="text-sm text-slate-500">{admin?.email || 'Admin'}</div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
