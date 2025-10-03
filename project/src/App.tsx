import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blogs } from './pages/Blogs';
import { Projects } from './pages/Projects';
import { Journals } from './pages/Journals';
import { Contact } from './pages/Contact';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && showAdminLogin) {
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
    }
  }, [user, showAdminLogin]);

  const handleNavigate = (page: string) => {
    if (page === 'admin') {
      if (user) {
        setShowAdminDashboard(true);
        setShowAdminLogin(false);
      } else {
        setShowAdminLogin(true);
        setShowAdminDashboard(false);
      }
    } else if (page.startsWith('manage-')) {
      setCurrentPage(page);
    } else {
      setCurrentPage(page);
      setShowAdminLogin(false);
      setShowAdminDashboard(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    setShowAdminDashboard(false);
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink border-r-transparent mb-4"></div>
          <p className="text-beige text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (showAdminLogin) {
    return <Login onLoginSuccess={() => setShowAdminDashboard(true)} />;
  }

  if (showAdminDashboard && user) {
    return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-grey-dark">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      <main>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'blogs' && <Blogs />}
        {currentPage === 'projects' && <Projects />}
        {currentPage === 'journals' && <Journals />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
