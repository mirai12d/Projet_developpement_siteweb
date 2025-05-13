import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Coiffure Luxe',
    description: 'Site vitrine pour un salon de coiffure à Montréal.',
    image: '/images/projects/coiffure.png',
  },
  {
    title: 'Café Nomade',
    description: 'Menu en ligne + système de réservation pour un café indépendant.',
    image: '/images/projects/cafe.png',
  },
  {
    title: 'AutoPro',
    description: 'Landing page pour un garage automobile avec formulaire de contact.',
    image: '/images/projects/autopro.png',
  },
];


const Projects = () => {
  return (
    <section className="projects" id="projects">
      <h2>Nos Réalisations</h2>
      <p className="projects-intro">
        Voici quelques exemples de sites que nous avons conçus pour nos clients ou en démonstration.
      </p>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={project.image} alt={project.title} />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
