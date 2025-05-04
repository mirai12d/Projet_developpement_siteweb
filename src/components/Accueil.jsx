import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';

const Accueil = () => {
  return (
    <section className="accueil">
      <div className="accueil-content">
        <h1>Votre site web professionnel, rapide et sur mesure</h1>
        <p>
          Koodi vous accompagne dans la création de sites modernes,
          performants et adaptés aux petites entreprises.
        </p>
        <div className="accueil-buttons">
          <Link to="/services" className="btn-principal">Voir nos services</Link>
          <Link to="/contact" className="btn-secondaire">Nous contacter</Link>
        </div>
      </div>
    </section>
  );
};

export default Accueil;
