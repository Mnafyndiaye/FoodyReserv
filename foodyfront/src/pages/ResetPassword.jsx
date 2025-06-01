import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Simuler une requête API pour envoyer un lien de réinitialisation
      // Remplacer par une vraie requête API dans un environnement de production
      console.log('Envoi de la demande de réinitialisation pour:', email);
      
      // Simuler une réponse réussie
      setMessage('Un lien de réinitialisation a été envoyé à votre adresse email.');
      setEmail('');
      
      // Redirection optionnelle après un délai
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error('Erreur lors de la demande de réinitialisation:', err);
      setError('Erreur lors de l’envoi de la demande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Réinitialiser le mot de passe</h1>
          <div className="w-16 h-1 bg-yellow-500 mt-1 mx-auto"></div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 mt-1"
              placeholder="Entrez votre email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Envoi...</span>
              </>
            ) : (
              "Envoyer le lien de réinitialisation"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Retour à{" "}
            <a href="/login" className="text-yellow-500">
              la connexion
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
