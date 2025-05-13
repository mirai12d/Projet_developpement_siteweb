import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || '';

const Login = () => {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifiant || !password) {
      setMessage("Veuillez remplir tous les champs.");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant, password }),
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userPrenom', result.user.prenom);
        localStorage.setItem('userNom', result.user.nom);
        localStorage.setItem('userEmail', result.user.email);

        login();
        setSuccess(true);
        setMessage("Connexion réussie !");
        setTimeout(() => {
          navigate(location.state?.from || '/');
        }, 1000);
      } else {
        setSuccess(false);
        setMessage(result.message || "Identifiants incorrects.");
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="auth-container">
     <div className="auth-avatar">
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
</div>

      <h2 className="auth-title">Connexion</h2>
      <p className="auth-subtitle">Accédez à votre espace membre personnalisé.</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email ou nom d'utilisateur"
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>

      {message && (
        <p className={`message ${success ? 'success' : 'error'}`}>{message}</p>
      )}

      <p className="switch-auth">
        Pas encore de compte ?{' '}
        <span className="link" onClick={() => navigate('/signup')}>
          Inscrivez-vous
        </span>
      </p>
    </div>
  );
};

export default Login;
