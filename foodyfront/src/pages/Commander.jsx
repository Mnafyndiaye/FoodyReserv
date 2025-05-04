import { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, Clock, MapPin, ChevronDown } from 'lucide-react';

export default function Commander() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Navigation vers la page de connexion
  const navigateToLoginPage = () => {
    window.location.href = '/login';
  };

  // Catégories de nourriture
  const categories = [
    "Tous les restaurants",
    "Cuisine Libanaise",
    "Sushi",
    "Pasta",
    "Pizza",
    "Plats du jour",
    "Cuisine Africaine",
    "Petit déjeuner"
  ];
  
  // Liste des restaurants (normalement chargée depuis une API)
  const restaurants = [
    {
      id: 1,
      name: "Restaurant Libanais",
      category: "Cuisine Libanaise",
      rating: 4.5,
      deliveryTime: "30-45 min",
      deliveryFee: 2.50,
      minOrder: 15,
      image: "/images/categories/cuisinelibanaise.png",
      specialties: ["Chawarma", "Falafel", "Hummus"]
    },
    {
      id: 2,
      name: "Sushi Palace",
      category: "Sushi",
      rating: 4.3,
      deliveryTime: "40-55 min",
      deliveryFee: 3.00,
      minOrder: 20,
      image: "/images/categories/sushi.png",
      specialties: ["Maki", "Sashimi", "California Rolls"]
    },
    {
      id: 3,
      name: "Pasta House",
      category: "Pasta",
      rating: 4.6,
      deliveryTime: "25-40 min",
      deliveryFee: 2.00,
      minOrder: 12,
      image: "/images/categories/pasta.png",
      specialties: ["Carbonara", "Bolognese", "Lasagne"]
    },
    {
      id: 4,
      name: "Pizza Express",
      category: "Pizza",
      rating: 4.0,
      deliveryTime: "20-35 min",
      deliveryFee: 1.50,
      minOrder: 10,
      image: "/images/categories/Pizza.png",
      specialties: ["Margherita", "Pepperoni", "4 Fromages"]
    },
    {
      id: 5,
      name: "Saveurs d'Afrique",
      category: "Cuisine Africaine",
      rating: 4.7,
      deliveryTime: "35-50 min",
      deliveryFee: 2.75,
      minOrder: 18,
      image: "/images/categories/cuisineafricaine.png",
      specialties: ["Mafé", "Thieboudienne", "Yassa"]
    },
    {
      id: 6,
      name: "Brunch & Co",
      category: "Petit déjeuner",
      rating: 4.4,
      deliveryTime: "20-35 min",
      deliveryFee: 2.25,
      minOrder: 15,
      image: "/images/categories/Brunch.png",
      specialties: ["Pancakes", "Omelettes", "Avocado Toast"]
    },
    {
        id: 7,
        name: "Restaurant du jour",
        category: "Plats du jour",
        rating: 4.2,
        deliveryTime: "30-45 min",
        deliveryFee: 2.50,
        minOrder: 15,
        image: "/images/categories/platdujour.png",
        specialties: ["Plat du jour 1", "Plat du jour 2", "Plat du jour 3"]
    }
  ];
  
  // Filtrer les restaurants en fonction de la recherche et de la catégorie sélectionnée
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tous les restaurants' || 
      restaurant.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - même structure sur toutes les pages */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-green-700 text-2xl font-bold">FOODY</span>
              <span className="text-yellow-500 text-2xl font-bold">RESERV</span>
              <img src="/images/logo.png" className="h-10 ml-2" alt="Logo" />
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="font-medium">Accueil</a>
            <a href="/commander" className="font-medium text-yellow-500">Commander !</a>
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

      {/* Bannière */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Restaurants à Dakar</h1>
          <p className="text-gray-600">Découvrez les meilleurs restaurants pour la livraison ou à emporter</p>
        </div>
      </div>

      {/* Filtre et recherche */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher un restaurant ou un plat..."
                className="w-full p-3 border rounded-md pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="relative md:w-1/4">
              <select 
                className="w-full border rounded-md p-3 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-md font-medium"
            >
              <Filter size={18} className="mr-2" />
              Filtres
            </button>
          </div>
          
          {filtersOpen && (
            <div className="mt-4 p-4 border rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-bold mb-2">Prix</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 border rounded-full text-sm hover:bg-yellow-50">€</button>
                  <button className="px-3 py-1 border rounded-full text-sm hover:bg-yellow-50">€€</button>
                  <button className="px-3 py-1 border rounded-full text-sm hover:bg-yellow-50">€€€</button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Note minimale</h3>
                <div className="flex flex-wrap gap-2">
                  {[3, 4, 4.5].map((rating) => (
                    <button key={rating} className="px-3 py-1 border rounded-full text-sm hover:bg-yellow-50 flex items-center">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Temps de livraison</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 border rounded-full text-sm hover:bg-yellow-50">&lt; 30 min</button>
                  <button className="px-3 py-1 border rounded-full text-sm hover:bg-yellow-50">&lt; 45 min</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liste des restaurants */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Aucun restaurant trouvé</h2>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/200"; 
                      e.target.alt = "Image non disponible";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.category}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock size={16} className="mr-1" />
                    <span className="mr-4">{restaurant.deliveryTime}</span>
                    <MapPin size={16} className="mr-1" />
                    <span>2.5 km</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.specialties.map((specialty, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Min. <span className="font-medium">{restaurant.minOrder}€</span>
                    </span>
                    <span className="text-sm">
                      Livraison: <span className="font-medium">{restaurant.deliveryFee.toFixed(2)}€</span>
                    </span>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <button className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 transition-colors">
                    Voir le menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer - même structure sur toutes les pages */}
      <footer className="bg-yellow-600 text-white py-8 mt-auto">
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
                  <li><a href="/about" className="hover:text-yellow-500">Qui sommes-nous</a></li>
                  <li><a href="/how-it-works" className="hover:text-yellow-500">Comment ça marche</a></li>
                  <li><a href="/blog" className="hover:text-yellow-500">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Aide</h4>
                <ul className="space-y-2">
                  <li><a href="/faq" className="hover:text-yellow-500">FAQ</a></li>
                  <li><a href="/contact" className="hover:text-yellow-500">Contact</a></li>
                  <li><a href="/terms" className="hover:text-yellow-500">Conditions</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Partenaires</h4>
                <ul className="space-y-2">
                  <li><a href="/restaurants" className="hover:text-yellow-500">Restaurants</a></li>
                  <li><a href="/drivers" className="hover:text-yellow-500">Livreurs</a></li>
                  <li><a href="/investors" className="hover:text-yellow-500">Investisseurs</a></li>
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