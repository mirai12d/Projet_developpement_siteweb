import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // À connecter à une API ou un service email plus tard
    alert("Message envoyé (simulation) !");
    setFormData({ nom: '', email: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <h2>Contactez-nous</h2>
      <p>Vous avez un projet en tête ? Envoyez-nous un message, on vous répond rapidement !</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre adresse email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
};

export default Contact;
