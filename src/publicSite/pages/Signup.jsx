import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n

const API_URL = process.env.REACT_APP_API_URL || '';

const Signup = () => {
  const { t } = useTranslation(); // ✅ Hook i18n
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
  const [modalOpen, setModalOpen] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = t('signup.errors.username');
    if (!formData.nom.trim()) newErrors.nom = t('signup.errors.nom');
    if (!formData.prenom.trim()) newErrors.prenom = t('signup.errors.prenom');
    if (!formData.email.includes('@')) newErrors.email = t('signup.errors.email');
    if (formData.motDePasse.length < 6) newErrors.motDePasse = t('signup.errors.motDePasse');
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendEmail = async () => {
    try {
      await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      startCooldown();
    } catch (error) {
      console.error("Erreur lors du renvoi de l'email :", error);
    }
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

        if (response.ok) {
          setModalOpen(true);
          startCooldown();
        } else {
          setMessage(result.message || t('signup.genericError'));
        }
      } catch (error) {
        console.error(error);
        setMessage(t('signup.serverError'));
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

      <h2>{t('signup.title')}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="username" placeholder={t('signup.placeholders.username')} onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}

        <input type="text" name="nom" placeholder={t('signup.placeholders.nom')} onChange={handleChange} />
        {errors.nom && <p className="error">{errors.nom}</p>}

        <input type="text" name="prenom" placeholder={t('signup.placeholders.prenom')} onChange={handleChange} />
        {errors.prenom && <p className="error">{errors.prenom}</p>}

        <input type="email" name="email" placeholder={t('signup.placeholders.email')} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="motDePasse" placeholder={t('signup.placeholders.motDePasse')} onChange={handleChange} />
        {errors.motDePasse && <p className="error">{errors.motDePasse}</p>}

        <input type="tel" name="telephone" placeholder={t('signup.placeholders.telephone')} onChange={handleChange} />
        <input type="text" name="entreprise" placeholder={t('signup.placeholders.entreprise')} onChange={handleChange} />

        <div className="form-footer">
          <button type="submit">{t('signup.button')}</button>
          {message && <p className="error">{message}</p>}
        </div>
      </form>

      <p className="switch-auth">
        {t('signup.already_account')}{" "}
        <span className="link" onClick={() => navigate('/login')}>
          {t('signup.login_link')}
        </span>
      </p>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{t('signup.modal.title')}</h3>
            <p>{t('signup.modal.message')} <strong>{formData.email}</strong>.</p>
            <p>{t('signup.modal.validity')}</p>
            <button onClick={resendEmail} disabled={resendCooldown > 0}>
              {resendCooldown > 0
                ? `${t('signup.modal.resend')} (${resendCooldown}s)`
                : t('signup.modal.resend')}
            </button>
            <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
              {t('signup.modal.note')}
            </p>
            <button style={{ marginTop: '16px' }} onClick={() => navigate('/login')}>
              {t('signup.modal.goto_login')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
