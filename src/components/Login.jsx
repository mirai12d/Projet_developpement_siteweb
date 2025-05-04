import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
      setMessage("Connexion réussie !");
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
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
