import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { login } = useContext(AuthContext); // ✅
  const navigate = useNavigate(); // ✅

  const handleLogin = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
      login(); // ✅ active la session
      navigate('/'); // ✅ redirection vers accueil
    } else {
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
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
