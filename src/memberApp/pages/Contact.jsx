import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch('http://localhost:3001/api/contact', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message envoyé avec succès !');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert("Erreur réseau.");
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>Contactez-nous</h2>
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
        <input
          type="text"
          name="sujet"
          placeholder="Sujet"
          value={formData.sujet}
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
