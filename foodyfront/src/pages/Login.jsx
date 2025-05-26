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
      // Préparation des données pour le backend
      const requestData = {
        identifiant: identifier,
        motDePasse: password
      };
      
      console.log('Tentative de connexion avec:', { identifiant: identifier });
      
      console.log('Tentative de connexion avec:', identifier);
      
      // Simuler une connexion réussie pour le moment
      // Dans un environnement de production, vous utiliseriez votre API réelle
      
      // Stockage d'un token fictif pour simuler une connexion réussie
      localStorage.setItem('token', 'fake-jwt-token');
      
      // Stocker les informations réelles de l'utilisateur
      // Ces données seront affichées dans le profil utilisateur
      localStorage.setItem('user', JSON.stringify({
        email: identifier,
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier, // Utiliser la partie avant @ de l'email comme nom
        phone: '+221 77 123 45 67', // Remplacer par le vrai numéro de téléphone de l'utilisateur
        address: 'Dakar, Sénégal' // Remplacer par la vraie adresse de l'utilisateur
      }));
      
      // Simuler une réponse réussie
      const response = { ok: true };
      const data = { token: 'fake-jwt-token', message: 'Connexion réussie' };
      
      console.log('Connexion simulée réussie');
      console.log('Données:', data);
      
      console.log('Données de réponse:', data);
      
      if (response.ok) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', data.token);
        console.log('Token stocké avec succès');
        
        // Redirection vers la page de profil
        navigate('/profile');
      } else {
        const errorMessage = data.message || 'Identifiants invalides. Veuillez réessayer.';
        console.error('Erreur de connexion:', errorMessage);
        setError(errorMessage);
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

        {/* Options de connexion sociale */}
        <div className="flex mb-6 space-x-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center">
            <span className="mr-2">f</span>
            Connectez-vous avec Facebook
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center">
            <span className="mr-2">G</span>
            Connectez-vous avec Google
          </button>
        </div>

        {/* Séparateur */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OU ALORS</span>
          <div className="flex-1 h-px bg-gray-300"></div>
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
            className="w-full bg-yellow-400 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion en cours...' : "S'identifier"}
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