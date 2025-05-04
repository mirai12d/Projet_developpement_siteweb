import React from 'react';
import './Header.css'; // tu peux aussi passer à Tailwind si tu préfères

const Header = () => {
  return (
    <header className="header">
      <div className="logo">StudioVirtuo</div>
      <nav className="nav">
        <a href="#home">Accueil</a>
        <a href="#services">Services</a>
        <a href="#projects">Projets</a>
        <a href="#about">À propos</a>
        <a href="#contact">Contact</a>
        <button className="cta">Demander un devis</button>
      </nav>
    </header>
  );
};

export default Header;
