import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // ✅ Import
import './Accueil.css';

const Accueil = () => {
  const { t } = useTranslation(); // ✅ Hook i18n

  return (
    <section className="accueil">
      <motion.div
        className="accueil-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>

        <div className="accueil-buttons">
          <Link to="/services" className="btn-principal">
            {t('home.services_button')}
          </Link>
          <Link to="/contact" className="btn-secondaire">
            {t('home.contact_button')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Accueil;
