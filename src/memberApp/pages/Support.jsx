import React, { useState } from 'react';
import MemberLayout from '../../layouts/MemberLayout';
import './Support.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ i18n

const Support = () => {
  const { t } = useTranslation(); // ✅
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: localStorage.getItem('userPrenom') + ' ' + localStorage.getItem('userNom'),
    email: localStorage.getItem('userEmail'),
    sujet: '',
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
      const response = await fetch('http://localhost:3001/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(t('support.success'));
        setFormData({ ...formData, sujet: '', message: '' });
      } else {
        toast.error(t('support.error'));
      }
    } catch (error) {
      toast.error(t('support.serverError'));
      console.error(error);
    }
  };

  return (
    <MemberLayout>
      <div className="support-container">
        <div style={{ textAlign: 'left' }}>
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            ← {t('support.back')}
          </button>
        </div>

        <h2>{t('support.title')}</h2>
        <p className="support-subtitle">{t('support.subtitle')}</p>

        <form onSubmit={handleSubmit} className="support-form">
          <input type="text" value={formData.nom} disabled />
          <input type="email" value={formData.email} disabled />
          <input
            type="text"
            name="sujet"
            placeholder={t('support.fields.subject')}
            value={formData.sujet}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder={t('support.fields.message')}
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">{t('support.send')}</button>
        </form>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </MemberLayout>
  );
};

export default Support;
