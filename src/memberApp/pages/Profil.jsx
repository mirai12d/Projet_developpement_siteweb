import React from 'react';
import MemberLayout from '../../layouts/MemberLayout';
import './Profil.css';

const Profil = () => {
  const prenom = localStorage.getItem('userPrenom');
  const nom = localStorage.getItem('userNom');
  const email = localStorage.getItem('userEmail');

  return (
    <MemberLayout>
      <div className="profil-container">
        <h2>Bienvenue {prenom} {nom}</h2>
        <p>Accédez à vos outils, vos paramètres, et plus encore.</p>

        <div className="profil-info">
          <p><strong>Nom :</strong> {prenom} {nom}</p>
          <p><strong>Email :</strong> {email}</p>
        </div>
      </div>
    </MemberLayout>
  );
};

export default Profil;
