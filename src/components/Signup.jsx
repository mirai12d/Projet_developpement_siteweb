import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    entreprise: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription :', formData);
    // Tu peux remplacer ce console.log par une requête API
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
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
