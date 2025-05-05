import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/api'; // ⬅️ Import API

const Login = () => {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifiant || !password) {
      setMessage("Veuillez remplir tous les champs.");
      setSuccess(false);
      return;
    }

    try {
      const result = await loginApi({ identifiant, password });

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userPrenom', result.user.prenom);
        localStorage.setItem('userNom', result.user.nom);
        localStorage.setItem('userEmail', result.user.email);

        login();
        setSuccess(true);
        setMessage("Connexion réussie !");
        setTimeout(() => {
          navigate('/');
          window.location.reload(); // force le header à se recharger et fermer le menu
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
      <h2>Connexion</h2>
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
