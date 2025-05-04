import React from 'react';
import './Tarifs.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Tarifs = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const forfaits = [
    {
      nom: 'Essor',
      prix: '0 $',
      description: 'Maquette gratuite (non mise en ligne). Permet d’avoir un aperçu visuel du site.',
      points: [
        'Maquette statique',
        'Non mise en ligne',
        'Découverte du design',
      ],
      couleur: 'forfait-essor',
    },
    {
      nom: 'Élan',
      prix: '250 $',
      description: 'Site vitrine simple avec 1 à 3 pages, responsive.',
      points: [
        'Mise en ligne incluse',
        'Responsive mobile',
        'Pages: 1 à 3',
        'Formulaire de contact',
        'Support email',
      ],
      couleur: 'forfait-elan',
    },
    {
      nom: 'Propulsion',
      prix: '400 $',
      description: 'Site personnalisé avec 4 à 6 pages, SEO de base.',
      points: [
        'Design personnalisé',
        '4 à 6 pages',
        'Formulaire + carte Google',
        'SEO de base',
        '1 modification incluse',
      ],
      couleur: 'forfait-propulsion',
    },
    {
      nom: 'Ascension',
      prix: '600 $+',
      description: 'Site complet sur mesure avec nom de domaine offert et SEO avancé.',
      points: [
        'Pages illimitées',
        'Animations et effets',
        'Nom de domaine 1 an inclus',
        'SEO avancé',
        'Support prioritaire',
      ],
      couleur: 'forfait-ascension',
    },
  ];

  const handleChoisir = (forfait) => {
    if (!isAuthenticated) {
      navigate('/signup');
    } else {
      navigate('/commande', { state: { forfait } });
    }
  };

  return (
    <div className="tarifs-container">
      <h2 className="tarifs-title">Nos Forfaits</h2>
      <div className="forfaits-grid">
        {forfaits.map((forfait, index) => (
          <div className={`forfait-card ${forfait.couleur}`} key={index}>
            <h3>{forfait.nom}</h3>
            <p className="prix">{forfait.prix}</p>
            <p className="description">{forfait.description}</p>
            <ul>
              {forfait.points.map((pt, i) => (
                <li key={i}>✓ {pt}</li>
              ))}
            </ul>
            <button
              className="btn-tarif"
              onClick={() => handleChoisir(forfait)}
            >
              Choisir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tarifs;
