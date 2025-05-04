import { useState } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';

export default function Register() {

  // Navigation pour retourner à la page d'accueil
  const navigateToHome = () => {
    window.location.href = '/';
  };
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
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
          <div className="flex gap-3 mb-6">
            <button 
              type="button"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <span>Facebook</span>
            </button>
            <button 
              type="button"
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center"
            >
              <span>Google</span>
            </button>
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
            
            {/* Profile Image Upload */}
            <div>
              <p className="mb-2">Ajouter une image de profil</p>
              <div className="flex items-center gap-2 cursor-pointer bg-gray-100 p-2 rounded w-fit">
                <Upload size={20} />
                <span>télécharger une image</span>
              </div>
            </div>
            
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
            
            {/* Submit Button */}
            <button 
              onClick={handleSubmit} 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded"
            >
              S'inscrire
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