import React, { useState, useContext } from 'react';
import './Signup.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    entreprise: '',
  });

  const { login } = useContext(AuthContext); // permet de simuler la connexion
  const navigate = useNavigate(); // permet de rediriger

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Inscription :', formData);

    // ⚠️ ici on suppose que l'inscription fonctionne
    login(); // active la connexion (set isAuthenticated à true)
    navigate('/'); // redirige vers la page d'accueil
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <p className="redirect-login">
  Déjà inscrit ? <Link to="/login">Se connecter</Link>
</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Adresse email" onChange={handleChange} required />
        <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} required />
        <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} />
        <input type="text" name="entreprise" placeholder="Nom de l'entreprise (facultatif)" onChange={handleChange} />
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
};

export default Signup;
