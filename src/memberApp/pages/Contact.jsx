import React, { useState } from 'react';
import './Contact.css';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n

const Contact = () => {
  const { t } = useTranslation(); // ✅ Hook i18n

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
        alert(t('contact.success'));
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      } else {
        alert(t('contact.error'));
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      alert(t('contact.network'));
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>{t('contact.title')}</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder={t('contact.fields.nom')}
          value={formData.nom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t('contact.fields.email')}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="sujet"
          placeholder={t('contact.fields.sujet')}
          value={formData.sujet}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder={t('contact.fields.message')}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{t('contact.button')}</button>
      </form>
    </section>
  );
};

export default Contact;
