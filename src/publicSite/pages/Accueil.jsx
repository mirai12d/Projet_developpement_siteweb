import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Accueil.css';

const Accueil = () => {
  return (
    <section className="accueil">
      <motion.div
        className="accueil-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>Votre site web professionnel, rapide et sur mesure</h1>
        <p>
          Ovrkode vous accompagne dans la création de sites modernes,
          performants et adaptés aux petites entreprises.
        </p>
        <div className="accueil-buttons">
          <Link to="/services" className="btn-principal">Voir nos services</Link>
          <Link to="/contact" className="btn-secondaire">Nous contacter</Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Accueil;
