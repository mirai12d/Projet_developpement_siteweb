import React, { useState } from 'react';
import './Estimation.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3001/api/estimation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Votre demande d'estimation a été envoyée !");
      setFormData({
        nom: '',
        email: '',
        entreprise: '',
        service: '',
        budget: '',
        message: ''
      });
    } else {
      toast.error("Erreur lors de l'envoi.");
    }
  } catch (err) {
    console.error('Erreur réseau :', err);
    toast.error("Erreur réseau.");
  }
};


  return (
    <div className="estimation-container">
      <h2>Demande d’estimation</h2>
      <p className="estimation-subtitle">Expliquez-nous votre projet pour obtenir un devis personnalisé.</p>

      <form onSubmit={handleSubmit} className="estimation-form">
        <input type="text" name="nom" placeholder="Votre nom" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Votre adresse email" onChange={handleChange} required />
        <input type="text" name="entreprise" placeholder="Nom de votre entreprise (optionnel)" onChange={handleChange} />

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

        <textarea name="message" placeholder="Décrivez votre besoin en quelques lignes..." rows="6" onChange={handleChange}></textarea>

        <button type="submit">Envoyer la demande</button>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Estimation;
