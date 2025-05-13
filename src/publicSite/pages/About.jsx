import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>À propos de Ovrkode</h2>
        <p>
          Nous sommes deux développeurs passionnés, basés à Montréal. Grâce à notre expérience en React, Symfony, SQL et design web,
          nous proposons des solutions professionnelles accessibles aux petites entreprises et entrepreneurs.
        </p>
        <p>
          Notre mission : vous offrir un site performant, esthétique et simple à gérer. Nous privilégions la qualité, la transparence et l'efficacité.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
