import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Apropos from './pages/Apropos';
import ContactPage from './pages/ContactPage';
import Commander from './pages/Commander';
import Reserver from './pages/Reserver';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import LoadingAnimation from './components/LoadingAnimation';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransition from './components/PageTransition';
import AdminCommandes from './pages/admin/AdminCommandes';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenu from './pages/admin/AdminMenu';
import AdminProfile from './pages/admin/AdminProfile';
import AdminReservation from './pages/admin/AdminReservation';
import AdminMessages from './pages/admin/AdminMessages';
import AdminCommentaires from './pages/admin/AdminCommentaires';
import DeliveryProfile from './pages/livreur/DeliveryProfile';

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
            <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
            <Route path="/apropos" element={<PageTransition><Apropos /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/menu" element={<AdminMenu />} />
            <Route path="/admin/commandes" element={<AdminCommandes />} />
            <Route path="/admin/reservations" element={<AdminReservation />} />
            <Route path="/admin/commentaires" element={<AdminCommentaires />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/delivery-profile" element={<DeliveryProfile />} />

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
