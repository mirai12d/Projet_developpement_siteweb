import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberLayout from '../../layouts/MemberLayout';
import './DashboardAccueil.css';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { Calendar, FileText, Mail, Wrench, Pin } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // ✅ i18n

Modal.setAppElement('#root');

const DashboardAccueil = () => {
  const { t } = useTranslation(); // ✅ hook i18n
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
          {t('dashboard.welcome')}, {prenom} {nom}
        </motion.h1>

        <motion.p
          className="dashboard-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('dashboard.subtitle')}
        </motion.p>

        <motion.div
          className="dashboard-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="dashboard-card" onClick={() => navigate('/reservation')}>
            <h3><Calendar size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('dashboard.actions.reserve.title')}</h3>
            <p>{t('dashboard.actions.reserve.description')}</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate('/factures')}>
            <h3><FileText size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('dashboard.actions.invoices.title')}</h3>
            <p>{t('dashboard.actions.invoices.description')}</p>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="summary-block">
            <Mail size={20} />
            <div>
              <h4>Email</h4>
              <p>{email}</p>
            </div>
          </div>
          <div className="summary-block">
            <Wrench size={20} />
            <div>
              <h4>{t('dashboard.support.title')}</h4>
              <p>{t('dashboard.support.status')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="dashboard-reservations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2><Pin size={20} style={{ marginRight: 8, verticalAlign: 'middle' }} /> {t('dashboard.reservations.title')}</h2>
          {loading ? (
            <p className="loading-text">{t('dashboard.reservations.loading')}</p>
          ) : reservations.length === 0 ? (
            <p className="empty-text">{t('dashboard.reservations.empty')}</p>
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
                    ✖ {t('dashboard.reservations.cancel')}
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
          <h2>{t('dashboard.modal.title')}</h2>
          <p>{t('dashboard.modal.confirm')}</p>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setModalReservation(null)}>
              {t('dashboard.modal.back')}
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
                  alert(t('dashboard.modal.error'));
                }
              }}
            >
              {t('dashboard.modal.confirmButton')}
            </button>
          </div>
        </Modal>
      </div>
    </MemberLayout>
  );
};

export default DashboardAccueil;
