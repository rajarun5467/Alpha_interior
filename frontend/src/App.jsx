import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import QuoteModal from './components/QuoteModal';
import LightboxModal from './components/LightboxModal';
import WhatsAppButton from './components/WhatsAppButton';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Global scroll-reveal animation system
  useScrollReveal();

  const handleOpenQuote = () => setIsQuoteModalOpen(true);
  const handleCloseQuote = () => setIsQuoteModalOpen(false);

  const handleSelectProject = (project) => setSelectedProject(project);
  const handleCloseProject = () => setSelectedProject(null);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            setActivePage={setActivePage}
            onOpenQuoteModal={handleOpenQuote}
            onSelectProject={handleSelectProject}
          />
        );
      case 'about':
        return (
          <AboutPage
            setActivePage={setActivePage}
            onOpenQuoteModal={handleOpenQuote}
          />
        );
      case 'services':
        return (
          <ServicesPage
            onOpenQuoteModal={handleOpenQuote}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            onSelectProject={handleSelectProject}
            onOpenQuoteModal={handleOpenQuote}
          />
        );
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <HomePage
            setActivePage={setActivePage}
            onOpenQuoteModal={handleOpenQuote}
            onSelectProject={handleSelectProject}
          />
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Dynamic Page Content */}
      <main style={{ flexGrow: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Floating CTA WhatsApp Button */}
      <WhatsAppButton />

      {/* Interactive Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
      />

      {/* Lightbox Project Modal */}
      <LightboxModal
        project={selectedProject}
        onClose={handleCloseProject}
        onOpenQuote={handleOpenQuote}
      />
    </div>
  );
}
