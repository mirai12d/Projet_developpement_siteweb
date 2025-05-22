import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅

const Footer = () => {
  const { t } = useTranslation(); // ✅

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Ovrkode — {t('footer.rights')}</p>

      <div className="footer-links">
        <Link to="/">{t('footer.links.home')}</Link>
        <Link to="/services">{t('footer.links.services')}</Link>
        <Link to="/projects">{t('footer.links.projects')}</Link>
        <Link to="/about">{t('footer.links.about')}</Link>
        <Link to="/contact">{t('footer.links.contact')}</Link>
      </div>

      <div className="footer-socials">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
