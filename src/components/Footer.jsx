import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Koodi — Tous droits réservés.</p>

      <div className="footer-links">
        <Link to="/">Accueil</Link>
        <Link to="/services">Services</Link>
        <Link to="/projects">Projets</Link>
        <Link to="/about">À propos</Link>
        <Link to="/contact">Contact</Link>
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
