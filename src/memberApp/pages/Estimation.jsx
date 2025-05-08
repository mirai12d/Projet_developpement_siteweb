import React, { useState } from 'react';
import './Estimation.css';

const Estimation = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ⚠️ Ici tu pourras appeler ton API backend pour envoyer l'email
    console.log('Formulaire soumis :', formData);
    alert("Demande d'estimation envoyée !");
  };

  return (
    <div className="estimation-container">
      <h2>Demande d’estimation</h2>
      <form onSubmit={handleSubmit} className="estimation-form">
        <input type="text" name="nom" placeholder="Votre nom" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Votre adresse email" onChange={handleChange} required />
        <input type="text" name="entreprise" placeholder="Nom de votre entreprise" onChange={handleChange} />
        <select name="service" onChange={handleChange} required>
          <option value="">Service souhaité</option>
          <option value="site_vitrine">Site vitrine</option>
          <option value="ecommerce">E-commerce</option>
          <option value="seo">SEO / Référencement</option>
          <option value="autre">Autre</option>
        </select>
        <select name="budget" onChange={handleChange}>
          <option value="">Budget estimé</option>
          <option value="500-1000">500$ – 1000$</option>
          <option value="1000-3000">1000$ – 3000$</option>
          <option value="3000+">Plus de 3000$</option>
        </select>
        <textarea name="message" placeholder="Détaillez votre besoin..." rows="6" onChange={handleChange}></textarea>
        <button type="submit">Envoyer la demande</button>
      </form>
    </div>
  );
};

export default Estimation;
