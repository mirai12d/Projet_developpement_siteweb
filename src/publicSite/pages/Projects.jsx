import React from 'react';
import './Projects.css';
import { useTranslation } from 'react-i18next'; // ✅ Import i18n

const Projects = () => {
  const { t } = useTranslation(); // ✅ Hook i18n

  const projects = [
    {
      title: t('projects.coiffure.title'),
      description: t('projects.coiffure.description'),
      image: '/images/projects/coiffure.png',
    },
    {
      title: t('projects.cafe.title'),
      description: t('projects.cafe.description'),
      image: '/images/projects/cafe.png',
    },
    {
      title: t('projects.autopro.title'),
      description: t('projects.autopro.description'),
      image: '/images/projects/autopro.png',
    },
  ];

  return (
    <section className="projects" id="projects">
      <h2>{t('projects.title')}</h2>
      <p className="projects-intro">{t('projects.intro')}</p>

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
