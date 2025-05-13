import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || '';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    entreprise: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Nom d’utilisateur requis';
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
    if (!formData.email.includes('@')) newErrors.email = 'Email invalide';
    if (formData.motDePasse.length < 6) newErrors.motDePasse = 'Mot de passe trop court (6 caractères minimum)';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setMessage('');

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            password: formData.motDePasse,
            telephone: formData.telephone,
            entreprise: formData.entreprise
          }),
        });

        const result = await response.json();

        if (result && result.id) {
          setSuccess(true);
          setMessage('Inscription réussie !');
          setTimeout(() => navigate('/login'), 1000);
        } else {
          setSuccess(false);
          setMessage(result.message || 'Erreur lors de l’inscription.');
        }
      } catch (error) {
        console.error(error);
        setSuccess(false);
        setMessage('Erreur serveur. Veuillez réessayer plus tard.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-avatar">
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
</div>

      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}

        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
        {errors.nom && <p className="error">{errors.nom}</p>}

        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} />
        {errors.prenom && <p className="error">{errors.prenom}</p>}

        <input type="email" name="email" placeholder="Adresse email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} />
        {errors.motDePasse && <p className="error">{errors.motDePasse}</p>}

        <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} />
        <input type="text" name="entreprise" placeholder="Entreprise (facultatif)" onChange={handleChange} />

        <button type="submit">Créer un compte</button>
      </form>

      {message && (
        <p className={`message ${success ? 'success' : 'error'}`}>{message}</p>
      )}

      <p className="switch-auth">
        Vous avez déjà un compte ?{' '}
        <span className="link" onClick={() => navigate('/login')}>
          Connectez-vous
        </span>
      </p>
    </div>
  );
};

export default Signup;
