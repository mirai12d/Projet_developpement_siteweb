import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section className="services" id="services">
      <h2>Nos Services</h2>
      <div className="services-list">
        <div className="service-card">
          <h3>🌐 Création de sites vitrine</h3>
          <p>Des sites élégants, rapides et optimisés pour votre activité.</p>
        </div>
        <div className="service-card">
          <h3>📱 Design responsive</h3>
          <p>Une expérience parfaite sur ordinateur, mobile et tablette.</p>
        </div>
        <div className="service-card">
          <h3>🔒 Sécurité & maintenance</h3>
          <p>Nous assurons les sauvegardes, mises à jour et surveillance.</p>
        </div>
        <div className="service-card">
          <h3>📈 Référencement (SEO)</h3>
          <p>Votre site visible sur Google avec des pratiques SEO modernes.</p>
        </div>
        <div className="service-card">
          <h3>🛒 E-commerce</h3>
          <p>Boutiques en ligne performantes, simples à gérer.</p>
        </div>
        <div className="service-card">
          <h3>📧 Email & formulaires</h3>
          <p>Formulaires de contact, email pro, prise de RDV intégrée.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
