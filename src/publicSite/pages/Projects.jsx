import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Nos Réalisations</h2>
      <p className="projects-intro">
        Voici quelques exemples de sites que nous avons conçus pour nos clients (ou en démonstration).
      </p>
      <div className="projects-grid">
        <div className="project-card">
          <img src="https://via.placeholder.com/300x180" alt="Coiffure Luxe" />
          <h3>Coiffure Luxe</h3>
          <p>Site vitrine pour un salon de coiffure à Montréal.</p>
        </div>
        <div className="project-card">
          <img src="https://via.placeholder.com/300x180" alt="Café Nomade" />
          <h3>Café Nomade</h3>
          <p>Menu en ligne + système de réservation pour un café indépendant.</p>
        </div>
        <div className="project-card">
          <img src="https://via.placeholder.com/300x180" alt="AutoPro" />
          <h3>AutoPro</h3>
          <p>Landing page pour un garage automobile avec formulaire de contact.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
