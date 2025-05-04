import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Veuillez remplir tous les champs.");
      setSuccess(false);
      return;
    }

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
      login();
      setSuccess(true);
      setMessage("Connexion réussie !");
      setTimeout(() => {
        navigate('/');
      }, 1000); // redirection après 1s
    } else {
      setSuccess(false);
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
