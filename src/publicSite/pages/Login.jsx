import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n

const API_URL = process.env.REACT_APP_API_URL || '';

const Login = () => {
  const { t } = useTranslation(); // ✅ Hook i18n

  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifiant || !password) {
      setMessage(t('login.fill_fields'));
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant, password }),
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('userPrenom', result.user.prenom);
        localStorage.setItem('userNom', result.user.nom);
        localStorage.setItem('userEmail', result.user.email);

        login();
        setSuccess(true);
        setMessage(t('login.success'));
        setTimeout(() => {
          navigate(location.state?.from || '/');
        }, 1000);
      } else {
        setSuccess(false);
        setMessage(result.message || t('login.invalid_credentials'));
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setMessage(t('login.error'));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-avatar">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        </svg>
      </div>

      <h2 className="auth-title">{t('login.title')}</h2>
      <p className="auth-subtitle">{t('login.subtitle')}</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder={t('login.placeholder_user')}
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('login.placeholder_password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-footer">
          <button type="submit">{t('login.button')}</button>
          {message && (
            <p className={`message ${success ? 'success' : 'error'}`}>{message}</p>
          )}
        </div>
      </form>

      <p className="switch-auth">
        {t('login.no_account')}{" "}
        <span className="link" onClick={() => navigate('/signup')}>
          {t('login.signup_link')}
        </span>
      </p>
    </div>
  );
};

export default Login;
