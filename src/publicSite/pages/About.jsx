import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n
import './About.css';

const About = () => {
  const { t } = useTranslation(); // ✅ Hook i18n

  return (
    <section className="about" id="about">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>{t('about.title')}</h2>
        <p>{t('about.paragraph1')}</p>
        <p>{t('about.paragraph2')}</p>
      </motion.div>
    </section>
  );
};

export default About;
