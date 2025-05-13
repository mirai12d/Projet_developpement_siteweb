import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberLayout from '../../layouts/MemberLayout';
import './DashboardAccueil.css';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DashboardAccueil = () => {
  const prenom = localStorage.getItem('userPrenom');
  const nom = localStorage.getItem('userNom');
  const email = localStorage.getItem('userEmail');

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalReservation, setModalReservation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/reservations/by-email/${email}`);
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        console.error('Erreur chargement des réservations :', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) fetchReservations();
  }, [email]);

  return (
    <MemberLayout>
      <div className="dashboard-container">
        <motion.h1
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bienvenue, {prenom} {nom}
        </motion.h1>

        <motion.p
          className="dashboard-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Retrouvez ici vos services, documents et support en un clin d'œil.
        </motion.p>

        <motion.div
          className="dashboard-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="dashboard-card" onClick={() => navigate('/reservation')}>
            <h3>📅 Réserver un service</h3>
            <p>Choisissez une date et un service rapidement.</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/factures')}>
            <h3>🧾 Voir mes factures</h3>
            <p>Accédez à vos paiements passés et reçus.</p>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="summary-block">
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>{email}</p>
            </div>
          </div>
          <div className="summary-block">
            <span>📦</span>
            <div>
              <h4>Dernière commande</h4>
              <p>Aucune commande récente</p>
            </div>
          </div>
          <div className="summary-block">
            <span>🛠️</span>
            <div>
              <h4>Support</h4>
              <p>0 ticket(s) en cours</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-reservations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>📌 Mes réservations</h2>
          {loading ? (
            <p className="loading-text">Chargement des réservations...</p>
          ) : reservations.length === 0 ? (
            <p className="empty-text">Aucune réservation trouvée.</p>
          ) : (
            <div className="reservation-list">
              {reservations.map((r, i) => (
                <motion.div
                  key={r.id}
                  className="reservation-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <div>
                    <h4>{r.service}</h4>
                    <p>{r.date.split('T')[0]} à {r.heure}</p>
                  </div>
                  <button
                    className="cancel-button"
                    onClick={() => setModalReservation(r)}
                  >
                    ✖ Annuler
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <Modal
          isOpen={modalReservation !== null}
          onRequestClose={() => setModalReservation(null)}
          className="cancel-modal"
          overlayClassName="cancel-overlay"
        >
          <h2>Annulation</h2>
          <p>Voulez-vous annuler cette réservation ?</p>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setModalReservation(null)}>
              Retour
            </button>
            <button
              className="btn-confirm"
              onClick={async () => {
                try {
                  await fetch(`http://localhost:3001/api/reservations/${modalReservation.id}`, {
                    method: 'DELETE',
                  });
                  setReservations((prev) => prev.filter((res) => res.id !== modalReservation.id));
                  setModalReservation(null);
                } catch (err) {
                  console.error('Erreur annulation :', err);
                  alert("Erreur lors de l'annulation.");
                }
              }}
            >
              Oui, annuler
            </button>
          </div>
        </Modal>
      </div>
    </MemberLayout>
  );
};

export default DashboardAccueil;
