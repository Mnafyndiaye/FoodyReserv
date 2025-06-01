import { useState } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  // Navigation pour retourner à la page d'accueil
  const navigateToHome = () => {
    window.location.href = '/';
  };
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    referralCode: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    // Validation de base
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('Vous devez accepter les termes et conditions');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Préparation des données pour le backend
      const requestData = {
        nomUtilisateur: `${formData.firstName}_${formData.lastName}`.toLowerCase(),
        motDePasse: formData.password,
        email: formData.email,
        telephone: '+221' + formData.phone,
        role: 'CLIENT' // Par défaut, on inscrit un client
      };
      
      // Appel à l'API d'inscription
      const response = await fetch('http://localhost:8080/api/auth/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      // Tenter de parser la réponse en JSON, sinon utiliser le texte brut
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          // Essayer de parser le texte comme JSON
          data = JSON.parse(text);
        } catch (e) {
          // Si ce n'est pas du JSON valide, utiliser le texte brut
          data = { message: text };
        }
      }
      
      if (response.ok) {
        // Récupérer le nom d'utilisateur généré
        const username = data.nomUtilisateur || requestData.nomUtilisateur;
        setGeneratedUsername(username);
        setSuccess(`Inscription réussie! Votre nom d'utilisateur est: ${username}. Redirection vers la page de connexion...`);
        
        // Redirection vers la page de connexion après 5 secondes (plus de temps pour voir le nom d'utilisateur)
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        setError(data.message || "Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (err) {
      setError('Erreur de connexion au serveur. Veuillez réessayer plus tard.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Registration Form */}
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
          
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold mb-6">
            Smartphones & Tablettes
            <br />
            <span className="text-xl">FOODYRESERV!</span>
          </h1>
          
          <div className="border-b-4 border-orange-400 w-16 mx-auto mb-8"></div>
          
          {/* Social Login Buttons */}
          <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
  href="https://google.com"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white-500 hover:bg-yellow-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" width="20" height="20">
    <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.4-34.5-4.1-51H272v96.7h147.3c-6.3 33.5-25 61.8-53.4 80.8v67h86.1c50.3-46.4 81.5-114.9 81.5-193.5z"/>
    <path fill="#34A853" d="M272 544.3c72.6 0 133.5-24.1 178-65.5l-86.1-67c-24 16.1-54.6 25.5-91.9 25.5-70.6 0-130.5-47.7-151.9-111.7H32.9v69.9C77.4 482.2 167.3 544.3 272 544.3z"/>
    <path fill="#FBBC05" d="M120.1 325.6c-10.2-30.5-10.2-63.3 0-93.8v-69.9H32.9c-32.9 65.8-32.9 143.9 0 209.7l87.2-45.9z"/>
    <path fill="#EA4335" d="M272 107.7c39.5 0 75 13.6 102.9 40.3l77.2-77.2C405.5 24.1 344.6 0 272 0 167.3 0 77.4 62.1 32.9 157.4l87.2 69.9c21.4-64 81.3-111.7 151.9-111.7z"/>
  </svg>
</a>


              </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OU ALORS</span>
            </div>
          </div>
          
          {/* Registration Form Fields */}
          <div className="space-y-4">
            {/* First Name */}
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            
            {/* Last Name */}
            <input
              type="text"
              name="lastName"
              placeholder="Nom de famille"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            
            {/* Phone Number */}
            <div className="flex">
              <div className="flex items-center bg-white border border-gray-300 rounded-l p-3">
                <span className="flex items-center">
                  <img src="/api/placeholder/24/16" alt="Senegal " className="mr-2" />
                  +221
                </span>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="70 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 border-l-0 rounded-r"
              />
            </div>
            
            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Referral Code */}
            <input
              type="text"
              name="referralCode"
              placeholder="Code de parrainage (facultatif)"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
            
            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm">
                En appuyant sur Inscription, vous indiquez que vous avez lu le{" "}
                <span className="text-blue-600">Termes et conditions</span> et que vous acceptez le{" "}
                <span className="text-blue-600">Politique de confidentialité</span>.
              </label>
            </div>
            
            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
            
            {/* Login Link */}
            <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Vous avez deja un compte?{" "}
              <a href="Login" className="text-yellow-500">
                S'identifier
              </a>
            </p>
          </div>
          </div>
        </div>
        
        {/* Right Side - Food Image */}
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
    </div>
  );
}