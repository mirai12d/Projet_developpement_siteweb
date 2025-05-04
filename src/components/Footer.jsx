import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} StudioVirtuo — Tous droits réservés.</p>
      <div className="footer-links">
        <a href="#home">Accueil</a>
        <a href="#services">Services</a>
        <a href="#projects">Projets</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
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
