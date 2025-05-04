import { useState } from 'react';
import {ChevronRight, ArrowLeft, MapPin, ShoppingCart } from 'lucide-react';

export default function HomePage() {
  const [searchAddress, setSearchAddress] = useState('');
  const [deliveryMode, setDeliveryMode] = useState('');
  
  const foodCategories = [
    {id:1, name: 'CUISINE LIBANAISE - GRILL', image: '/images/categories/cuisinelibanaise.png' },
    { name: 'SUSHI', image: '/images/categories/sushi.png' },
    { name: 'PASTA', image: '/images/categories/pasta.png' },
    { name: 'PIZZA', image: '/images/categories/Pizza.png' },
    { name: 'LES PLATS DU JOUR', image: '/images/categories/platdujour.png' },
    { name: 'CUISINE AFRICAINE', image: '/images/categories/cuisineafricaine.png' },
    { name: 'PETIT DÉJEUNER ET BRUNCH', image: '/images/categories/Brunch.png' },
  ];

  const nearbyRestaurants = [
    { name: 'Restaurant Libanais', rating: 4.5, image: '/images/restaurantlibanais.png' },
    { name: 'Sushi Palace', rating: 4.3, image: '/images/sushipalace.png' },
    { name: 'Pasta House', rating: 4.6, image: '/images/pastahouse.png' },
    { name: 'Pizza Express', rating: 4.0, image: '/images/Pizzaexpress.png' },
  ];
  
  const navigateToLoginPage = () => {
    window.location.href = '/login';
  };

  const navigateToApropos = () => {
    window.location.href = '/apropos';
  };

  const handleSearch = () => {
    console.log('Searching for restaurants near:', searchAddress);
    // Gérer la recherche de restaurants
  };
  
  return (
    
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-green-700 text-2xl font-bold">FOODY</span>
            <span className="text-yellow-500 text-2xl font-bold">RESERV</span>
            <img src="/images/logo.png" className="h-10 ml-2" alt="Logo" />
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="font-medium">Accueil</a>
            <a href="/commander" className="font-medium">Commander !</a>
            <a href="/apropos" className="font-medium">À propos</a>
            <a href="/contact" className="font-medium">Contactez-Nous</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
            </button>
            <button 
              onClick={navigateToLoginPage}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md font-medium"
            >
              SE CONNECTER
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 relative" style={{
        backgroundImage: "url(/images/copy.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
      
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 ">
          
            <h1 className="text-4xl font-bold mb-4">Vos repas livrés chez vous en un clic !</h1>
            <p className="text-lg mb-6">Commandez rapidement et directement auprès de votre restaurant favori</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                className="border rounded-md p-3 bg-white"
                value={deliveryMode}
                onChange={(e) => setDeliveryMode(e.target.value)}
              >
                <option value="">Sélectionnez mode de commande</option>
                <option value="delivery">Livraison</option>
                <option value="pickup">À emporter</option>
              </select>
              
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Saisissez votre adresse"
                  className="w-full p-3 border rounded-md pl-10"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                />
                <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <button 
                onClick={handleSearch}
                className="bg-yellow-500 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full text-center py-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-green-700">CHOISISSEZ.</span> 
              <span className="text-yellow-500">COMMANDEZ.</span> 
              <span className="text-red-600">SAVOUREZ.</span>
            </h2>
          </div>
        </div>
      </section>
      
      {/* Food Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recherches rapides</h2>
            <div className="flex space-x-2">
              <button className="p-2 border rounded-full">
                <ArrowLeft size={20} />
              </button>
              <button className="p-2 border rounded-full">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {foodCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-200">
                  {/* Correction ici: category.image au lieu de category.images */}
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.target.src = "/api/placeholder/100/100"; 
                      e.target.alt = "Image non disponible";
                    }}
                  />
                </div>
                <div className="p-2 text-center">
                  <p className="font-medium text-sm">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nearby Restaurants */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Tous les restaurants à proximité</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyRestaurants.map((restaurant, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  {/* Utilisation de l'image du restaurant avec fallback vers placeholder */}
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.target.src = "/api/placeholder/300/200"; 
                      e.target.alt = "Image non disponible";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                    <span>★</span>
                    <span className="ml-1">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">30-45 min • Frais de livraison: 2,50€</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-yellow-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">FOODY RESERV</h3>
              <p>La meilleure plateforme de livraison de repas à Dakar</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-3">À propos</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-yellow-500">Qui sommes-nous</a></li>
                  <li><a href="#" className="hover:text-yellow-500">Comment ça marche</a></li>
                  <li><a href="#" className="hover:text-yellow-500">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Aide</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-yellow-500">FAQ</a></li>
                  <li><a href="#" className="hover:text-yellow-500">Contact</a></li>
                  <li><a href="#" className="hover:text-yellow-500">Conditions</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Partenaires</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-yellow-500">Restaurants</a></li>
                  <li><a href="#" className="hover:text-yellow-500">Livreurs</a></li>
                  <li><a href="#" className="hover:text-yellow-500">Investisseurs</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>© 2025 FOODY RESERV. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}