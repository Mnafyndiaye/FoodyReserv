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
      // Vérifier si c'est l'administrateur qui se connecte
      // Identifiants administrateur (en dur pour la démonstration)
      const adminEmail = 'admin@foodyreserv.com';
      const adminUsername = 'admin';
      const adminPassword = 'admin123';
      
      const isAdmin = (identifier === adminEmail || identifier === adminUsername) && password === adminPassword;
      
      console.log('Tentative de connexion avec:', { identifiant: identifier });
      
      // Simuler une connexion réussie pour le moment
      // Dans un environnement de production, vous utiliseriez votre API réelle
      
      // Stockage d'un token fictif pour simuler une connexion réussie
      localStorage.setItem('token', 'fake-jwt-token');
      
      // Définir des identifiants clients statiques pour la démonstration
      const clientCredentials = [
        { email: 'client@foodyreserv.com', password: 'client123', name: 'Amadou Diallo', phone: '+221 77 123 45 67' },
        { email: 'fatou@foodyreserv.com', password: 'fatou123', name: 'Fatou Ndiaye', phone: '+221 76 987 65 43' },
        { email: 'moussa@foodyreserv.com', password: 'moussa123', name: 'Moussa Sow', phone: '+221 70 555 44 33' }
      ];
      
      // Vérifier si c'est un client qui se connecte
      const clientMatch = clientCredentials.find(client => 
        (client.email === identifier || identifier === client.name.toLowerCase()) && 
        client.password === password
      );
      
      if (isAdmin) {
        // Stocker les informations de l'administrateur
        localStorage.setItem('user', JSON.stringify({
          email: adminEmail,
          name: 'Administrateur',
          phone: '+221 77 000 00 00',
          address: 'Dakar, Sénégal',
          isAdmin: true
        }));
        
        console.log('Connexion administrateur réussie');
        
        // Redirection vers le tableau de bord administrateur
        navigate('/admin');
      } else if (clientMatch) {
        // Stocker les informations du client
        localStorage.setItem('user', JSON.stringify({
          email: clientMatch.email,
          name: clientMatch.name,
          phone: clientMatch.phone,
          address: 'Dakar, Sénégal',
          isAdmin: false
        }));
        
        // Simuler une réponse réussie
        const response = { ok: true };
        const data = { token: 'fake-jwt-token', message: 'Connexion réussie' };
        
        console.log('Connexion client réussie');
        console.log('Données:', data);
        
        if (response.ok) {
          // Stocker le token dans le localStorage
          localStorage.setItem('token', data.token);
          console.log('Token stocké avec succès');
          
          // Redirection vers la page d'accueil
          navigate('/');
        } else {
          const errorMessage = data.message || 'Identifiants invalides. Veuillez réessayer.';
          console.error('Erreur de connexion:', errorMessage);
          setError(errorMessage);
        }
      } else {
        // Identifiants invalides
        setError('Identifiants invalides. Veuillez réessayer.');
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
        <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-400 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266-.058-1.644-.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
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
            <a href="/reset-password" className="text-sm text-yellow-500 hover:underline">
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
