import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Layout } from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Leads from './pages/Leads.jsx';
import {
  Settings, HeroManager, ServicesManager, ProjectsManager, TestimonialsManager,
  StatsManager, FaqsManager, ProcessStepsManager, ClientLogosManager,
  AdvantageTilesManager, TransformationTabsManager, AboutContentManager,
  CostCalculatorConfigManager, PageHeadersManager, CtaBannersManager, FooterConfigManager
} from './pages/AllPages.jsx';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-navy text-xl">Loading...</div>;
  if (!admin) return <Navigate to="/login" />;
  return children;
}

function AppRoutes() {
  const { admin } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={admin ? <Navigate to="/" /> : <Login />} />
      <Route path="*" element={
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/hero" element={<HeroManager />} />
              <Route path="/services" element={<ServicesManager />} />
              <Route path="/projects" element={<ProjectsManager />} />
              <Route path="/testimonials" element={<TestimonialsManager />} />
              <Route path="/stats" element={<StatsManager />} />
              <Route path="/faqs" element={<FaqsManager />} />
              <Route path="/process-steps" element={<ProcessStepsManager />} />
              <Route path="/client-logos" element={<ClientLogosManager />} />
              <Route path="/advantage-tiles" element={<AdvantageTilesManager />} />
              <Route path="/transformation-tabs" element={<TransformationTabsManager />} />
              <Route path="/about-content" element={<AboutContentManager />} />
              <Route path="/cost-calculator" element={<CostCalculatorConfigManager />} />
              <Route path="/page-headers" element={<PageHeadersManager />} />
              <Route path="/cta-banners" element={<CtaBannersManager />} />
              <Route path="/footer-config" element={<FooterConfigManager />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/admin">
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
