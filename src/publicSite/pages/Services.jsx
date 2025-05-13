import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    icon: '/icons/website.svg',
    title: 'Création de sites vitrine',
    description: 'Des sites élégants, rapides et optimisés pour votre activité.',
  },
  {
    icon: '/icons/responsive.svg',
    title: 'Design responsive',
    description: 'Une expérience parfaite sur ordinateur, mobile et tablette.',
  },
  {
    icon: '/icons/security.svg',
    title: 'Sécurité & maintenance',
    description: 'Nous assurons les sauvegardes, mises à jour et surveillance.',
  },
  {
    icon: '/icons/seo.svg',
    title: 'Référencement (SEO)',
    description: 'Votre site visible sur Google avec des pratiques SEO modernes.',
  },
  {
    icon: '/icons/ecommerce.svg',
    title: 'E-commerce',
    description: 'Boutiques en ligne performantes, simples à gérer.',
  },
  {
    icon: '/icons/email.svg',
    title: 'Email & formulaires',
    description: 'Formulaires de contact, email pro, prise de RDV intégrée.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Services = () => {
  return (
    <section className="services" id="services">
      <h2>Nos Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <div className="service-icon">
              <img src={service.icon} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
