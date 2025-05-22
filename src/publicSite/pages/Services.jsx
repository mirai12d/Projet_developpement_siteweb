import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n
import './Services.css';

const Services = () => {
  const { t } = useTranslation(); // ✅ Hook i18n

  const services = [
    {
      icon: '/icons/website.svg',
      title: t('services.website.title'),
      description: t('services.website.description'),
    },
    {
      icon: '/icons/responsive.svg',
      title: t('services.responsive.title'),
      description: t('services.responsive.description'),
    },
    {
      icon: '/icons/security.svg',
      title: t('services.security.title'),
      description: t('services.security.description'),
    },
    {
      icon: '/icons/seo.svg',
      title: t('services.seo.title'),
      description: t('services.seo.description'),
    },
    {
      icon: '/icons/ecommerce.svg',
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
    },
    {
      icon: '/icons/email.svg',
      title: t('services.email.title'),
      description: t('services.email.description'),
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

  return (
    <section className="services" id="services">
      <h2>{t('services.title')}</h2>
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
