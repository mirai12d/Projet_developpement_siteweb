import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberLayout from '../../layouts/MemberLayout';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import './Reservation.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next'; // ✅ i18n

Modal.setAppElement('#root');

const Reservation = () => {
  const { t } = useTranslation(); // ✅
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    service: '',
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reservations');
        const data = await response.json();

        const currentUserEmail = localStorage.getItem('userEmail');

        const formatted = data.map(res => {
          const isOwner = res.email === currentUserEmail;
          return {
            title: isOwner
              ? `${res.service} (${res.nom})`
              : t('reservation.slotTaken'),
            start: res.date,
          };
        });

        setEvents(formatted);
      } catch (err) {
        console.error('Erreur chargement réservations', err);
      }
    };

    fetchReservations();
  }, [t]);

  const handleDateClick = (arg) => {
    const alreadyReserved = events.some(
      (event) => new Date(event.start).toISOString() === new Date(arg.dateStr).toISOString()
    );
    if (alreadyReserved) {
      toast.error(t('reservation.slotTaken'));
      return;
    }

    setSelectedSlot(arg);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSlot(null);
    setFormData({ nom: '', email: '', service: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    const heure = new Date(selectedSlot.dateStr).toTimeString().split(':').slice(0, 2).join(':');
    try {
      const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedSlot.dateStr,
          heure,
        }),
      });

      if (response.ok) {
        toast.success(t('reservation.success', { date: selectedSlot.dateStr }));
        setEvents(prev => [...prev, {
          title: `${formData.service} (${formData.nom})`,
          start: selectedSlot.dateStr,
        }]);
        closeModal();
      } else {
        toast.error(t('reservation.fail'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('reservation.serverError'));
    }
  };

  const isSlotAvailable = (selectInfo) => {
    const selectedDate = new Date(selectInfo.startStr);
    const now = new Date();
    if (selectedDate < now) return false;
    return !events.some(event =>
      new Date(event.start).toISOString() === selectedDate.toISOString()
    );
  };

  return (
    <MemberLayout>
      <div className="reservation-container">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← {t('reservation.back')}
        </button>

        <h1>{t('reservation.title')}</h1>
        <p className="subtitle">{t('reservation.subtitle')}</p>

        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            slotDuration="01:00:00"
            allDaySlot={false}
            selectable={true}
            selectAllow={isSlotAvailable}
            dateClick={handleDateClick}
            events={events.map(e => ({
              ...e,
              backgroundColor: '#000',
              borderColor: '#000',
              textColor: '#fff',
            }))}
            height="auto"
            locale="fr"
            headerToolbar={{
              left: 'today prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
          />
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="reservation-modal"
          overlayClassName="reservation-overlay"
        >
          <h2>{t('reservation.modalTitle')}</h2>
          <p className="modal-date">{selectedSlot?.dateStr}</p>
          <input type="text" name="nom" placeholder={t('reservation.fields.nom')} value={formData.nom} onChange={handleChange} />
          <input type="email" name="email" placeholder={t('reservation.fields.email')} value={formData.email} onChange={handleChange} />
          <input type="text" name="service" placeholder={t('reservation.fields.service')} value={formData.service} onChange={handleChange} />
          <div className="modal-actions">
            <button className="confirm-btn" onClick={handleConfirm}>{t('reservation.confirm')}</button>
            <button className="cancel-btn" onClick={closeModal}>{t('reservation.cancel')}</button>
          </div>
        </Modal>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </MemberLayout>
  );
};

export default Reservation;
