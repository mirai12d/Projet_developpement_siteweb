import React, { useEffect, useState } from 'react';
import MemberLayout from '../../layouts/MemberLayout';
import './Factures.css';
import { FileText, CalendarDays, CreditCard, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Factures = () => {
  const email = localStorage.getItem('userEmail');
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/factures/by-email/${email}`);
        const data = await response.json();
        setFactures(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erreur chargement des factures :', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchFactures();
  }, [email]);

  return (
    <MemberLayout>
      <div className="factures-container">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} style={{ marginRight: 6 }} />
          Retour au tableau de bord
        </button>

        <h1>Mes factures</h1>
        <p className="factures-subtitle">Consultez vos paiements passés et téléchargez vos factures.</p>

        {loading ? (
          <p className="factures-loading">Chargement...</p>
        ) : factures.length === 0 ? (
          <p className="factures-empty">Aucune facture disponible.</p>
        ) : (
          <section className="factures-list">
            {factures.map((facture, index) => (
              <article key={index} className="facture-card">
                <div className="facture-icon">
                  <FileText size={24} />
                </div>
                <div className="facture-details">
                  <h4>Facture #{facture.numero || facture.id}</h4>
                  <p><CalendarDays size={16} /> {facture.date?.split('T')[0]}</p>
                  <p><CreditCard size={16} /> {facture.montant} $</p>
                </div>
                {facture.url && (
                  <a
                    href={facture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facture-button"
                  >
                    Télécharger
                  </a>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </MemberLayout>
  );
};

export default Factures;
