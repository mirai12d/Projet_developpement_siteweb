import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2>À propos de Koodi</h2>
        <p>
          Nous sommes deux développeurs passionnés, basés à Montréal. Grâce à notre expérience en React, Symfony, SQL et design web,
          nous proposons des solutions professionnelles accessibles aux petites entreprises et entrepreneurs.
        </p>
        <p>
          Notre mission : vous offrir un site performant, esthétique et simple à gérer. Nous privilégions la qualité, la transparence et l'efficacité.
        </p>
      </div>
      <div className="about-team">
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Adam" />
          <h4>Adam Boulisfane</h4>
          <p>Designer, développeur front-end & fondateur</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Ayoub" />
          <h4>Ayoub Oubalkass</h4>
          <p>Designer, développeur front-end & fondateur</p>
        </div>
      </div>
    </section>
  );
};

export default About;
