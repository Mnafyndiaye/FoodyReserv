import React from 'react';

// Composant ProtectedRoute modifié pour permettre l'accès sans authentification
const ProtectedRoute = ({ children }) => {
  // Retourne directement les composants enfants sans vérification d'authentification
  return children;
};

export default ProtectedRoute;
