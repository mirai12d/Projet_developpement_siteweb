import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // ✅ importe les styles

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  const currentLang = i18n.language || 'fr';

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${currentLang === 'fr' ? 'active' : ''}`}
        onClick={() => changeLanguage('fr')}
      >
        FR
      </button>
      <button
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
