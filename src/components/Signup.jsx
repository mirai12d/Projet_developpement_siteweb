import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    entreprise: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
    if (!formData.email.includes('@')) newErrors.email = 'Email invalide';
    if (formData.motDePasse.length < 6) newErrors.motDePasse = 'Mot de passe trop court (6 caractères minimum)';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Inscription réussie :', formData);
      // tu pourrais ici stocker des données temporairement :
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPassword', formData.motDePasse);
      localStorage.setItem('userPrenom', formData.prenom);
      localStorage.setItem('userNom', formData.nom);

      navigate('/login'); // redirection après inscription
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
        />
        {errors.nom && <p className="error">{errors.nom}</p>}

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
        />
        {errors.prenom && <p className="error">{errors.prenom}</p>}

        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="motDePasse"
          placeholder="Mot de passe"
          onChange={handleChange}
        />
        {errors.motDePasse && <p className="error">{errors.motDePasse}</p>}

        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone"
          onChange={handleChange}
        />

        <input
          type="text"
          name="entreprise"
          placeholder="Nom de l'entreprise (facultatif)"
          onChange={handleChange}
        />

        <button type="submit">Créer un compte</button>
      </form>

      <p className="switch-auth">
        Vous avez déjà un compte ?{' '}
        <span className="link" onClick={() => navigate('/login')}>Connectez-vous</span>
      </p>
    </div>
  );
};

export default Signup;
