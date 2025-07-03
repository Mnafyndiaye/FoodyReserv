import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  
  // Navigation pour retourner à la page d'accueil
  const navigateToHome = () => {
    window.location.href = '/';
  };

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' ou 'username'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Identifiants administrateur (en dur pour la démonstration)
      const adminEmail = 'admin@foodyreserv.com';
      const adminUsername = 'admin';
      const adminPassword = 'admin123';
      
      // Définir des identifiants clients statiques pour la démonstration
      const clientCredentials = [
        { email: 'client@foodyreserv.com', password: 'client123', name: 'Amadou Diallo', phone: '+221 77 123 45 67' },
        { email: 'fatou@foodyreserv.com', password: 'fatou123', name: 'Fatou Ndiaye', phone: '+221 76 987 65 43' },
        { email: 'moussa@foodyreserv.com', password: 'moussa123', name: 'Moussa Sow', phone: '+221 70 555 44 33' }
      ];

      // Définir des identifiants livreurs statiques
      const deliveryCredentials = [
        { email: 'livreur@foodyreserv.com', password: 'livreur123', name: 'Baba Touré', phone: '+221 78 123 45 67', vehicle: 'Scooter Yamaha' },
        { email: 'mariama@foodyreserv.com', password: 'mariama123', name: 'Mariama Sow', phone: '+221 79 987 65 43', vehicle: 'Moto Honda' }
      ];

      const isAdmin = (identifier === adminEmail || identifier === adminUsername) && password === adminPassword;
 
      const deliveryMatch = deliveryCredentials.find(delivery => 
        (delivery.email === identifier || identifier === delivery.name.toLowerCase()) && 
        delivery.password === password
      );

      const clientMatch = clientCredentials.find(client => 
        (client.email === identifier || identifier === client.name.toLowerCase()) && 
        client.password === password
      ); 

      // Stockage d'un token fictif pour simuler une connexion réussie
      localStorage.setItem('token', 'fake-jwt-token');

      if (isAdmin) {
        // Stocker les informations de l'administrateur
        localStorage.setItem('user', JSON.stringify({
          email: adminEmail,
          name: 'Administrateur',
          phone: '+221 77 000 00 00',
          address: 'Dakar, Sénégal',
          role: 'admin',
          isAdmin: true
        }));
        
        console.log('Connexion administrateur réussie');
        navigate('/admin');

      } else if (deliveryMatch) {
        // Connexion livreur
        localStorage.setItem('user', JSON.stringify({
          email: deliveryMatch.email,
          name: deliveryMatch.name,
          phone: deliveryMatch.phone,
          address: 'Dakar, Sénégal',
          vehicle: deliveryMatch.vehicle,
          role: 'LIVREUR',
          isAdmin: false
        }));
        
        console.log('Connexion livreur réussie');
        console.log('Redirection vers /delivery-profile');
        
        // Redirection vers le profil livreur
        navigate('/delivery-profile');
        
      } else if (clientMatch) {
        // Connexion client
        localStorage.setItem('user', JSON.stringify({
          email: clientMatch.email,
          name: clientMatch.name,
          phone: clientMatch.phone,
          address: 'Dakar, Sénégal',
          role: 'CLIENT',
          isAdmin: false
        }));
        
        console.log('Connexion client réussie');
        
        // Redirection vers la page d'accueil
        navigate('/');
        
      } else {
        // Identifiants invalides
        setError('Identifiants invalides. Veuillez réessayer.');
        console.log('Identifiants invalides');
      }
      
    } catch (err) {
      console.error('Erreur technique lors de la connexion:', err);
      setError('Erreur technique lors de la connexion. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Partie gauche - Formulaire de connexion */}
      <div className="w-1/2 px-8 py-6 flex flex-col items-center justify-center bg-white-50">
        {/* Logo */}
        <div className="mb-6">
          <div className="flex items-center text-center">
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="font-medium">
            <div className="text-xl font-bold">
                <span className="text-green-700">FOODY</span><br />
                <span className="text-orange-500">RESERV</span>
              </div>
              </a>
        </nav>
            <img 
              src="/images/logo.png" 
              alt="Logo scooter" 
              className="h-12 ml-2"
            />
          </div>
        </div>
        
        {/* Titre */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Commençons
          </h1>
          <div className="w-16 h-1 bg-yellow-500 mt-1"></div>
        </div>

        {/* Onglets de méthode de connexion */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center ${loginMethod === 'email' ? 'bg-yellow-400' : 'bg-white'}`}
            onClick={() => setLoginMethod('email')}
          >
            Connectez-vous avec Email
          </button>
          <button
            className={`flex-1 py-2 text-center ${loginMethod === 'username' ? 'bg-yellow-400' : 'bg-white'}`}
            onClick={() => setLoginMethod('username')}
          >
            Connectez-vous avec Nom d'utilisateur
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div>
            <input
              type={loginMethod === 'email' ? 'email' : 'text'}
              placeholder={loginMethod === 'email' ? 'Email' : "Nom d'utilisateur"}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Options supplémentaires */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Souviens-toi de moi
              </label>
            </div>
            <a href="#" className="text-sm text-gray-600">
              Mot de passe oublié?
            </a>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Connexion</span>
              </>
            ) : (
              "S'identifier"
            )}
          </button>

          {/* Lien d'inscription */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte?{" "}
              <a href="Register" className="text-yellow-500">
                S'inscrire
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Partie droite - Image et badge */}
      <div className="w-full md:w-1/2 mt-8 md:mt-5 flex items-center justify-center">
          <div className="">
            <img 
              src="images/aliment.png" 
              alt="Ingrédients de cuisine italienne" 
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-green-700">Cuisine avec passion</h3>
              <p className="text-gray-600">Découvrez les meilleurs restaurants et réservez facilement avec FoodyReserv</p>
            </div>
          </div>
          
        </div>
        
    </div>
  );
}