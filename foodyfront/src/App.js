import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Apropos from './pages/Apropos';
import ContactPage from './pages/ContactPage';
import Commander from './pages/Commander';
import Reserver from './pages/Reserver';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import LoadingAnimation from './components/LoadingAnimation';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';

// Import des styles globaux
import './styles/GlobalEffects.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingAnimation />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <Router>
          <Routes>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/apropos" element={<PageTransition><Apropos /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
            
            {/* Routes protégées qui nécessitent une authentification */}
            <Route path="/commander" element={
                <PageTransition><Commander /></PageTransition>
            } />
            <Route path="/reserver" element={
                <PageTransition><Reserver /></PageTransition>
            } />
            <Route path="/profile" element={
                <PageTransition><Profile /></PageTransition>
            } />
            {/* Ajouter d'autres routes au besoin */}
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;