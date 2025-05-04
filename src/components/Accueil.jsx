import React from 'react';
import './Accueil.css';

const Accueil = () => {
  return (
    <section className="accueil">
      <div className="accueil-content">
        <h1>Votre site web professionnel, rapide et sur mesure</h1>
        <p>
          StudioVirtuo vous accompagne dans la création de sites modernes,
          performants et adaptés aux petites entreprises.
        </p>
        <div className="accueil-buttons">
          <a href="#services" className="btn-principal">Voir nos services</a>
          <a href="#contact" className="btn-secondaire">Nous contacter</a>
        </div>
      </div>
    </section>
  );
};

export default Accueil;
