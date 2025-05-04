import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Apropos from './pages/Apropos';
import ContactPage from './pages/ContactPage';
import Commander from './pages/Commander';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {<Route path="/register" element={<Register />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/commander" element={<Commander />} />
        {/* Ajouter d'autres routes au besoin */}
      </Routes>
    </Router>
  );
}
export default App;