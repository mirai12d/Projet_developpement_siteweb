// src/components/Commande.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Commande.css'; // à créer si tu veux du style

const Commande = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const forfait = location.state?.forfait;

  if (!forfait) {
    return (
      <div className="commande-container">
        <h2>Aucun forfait sélectionné</h2>
        <button onClick={() => navigate('/tarifs')}>Retour aux forfaits</button>
      </div>
    );
  }

  return (
    <div className="commande-container">
      <h2>Résumé de la commande</h2>
      <h3>Forfait : {forfait.nom}</h3>
      <p><strong>Prix :</strong> {forfait.prix}</p>
      <p><strong>Description :</strong> {forfait.description}</p>
      <ul>
        {forfait.points.map((p, idx) => (
          <li key={idx}>✓ {p}</li>
        ))}
      </ul>
      <button className="btn-commander">Confirmer ma commande</button>
    </div>
  );
};

export default Commande;
