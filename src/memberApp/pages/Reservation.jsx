import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Reservation.css';

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Rendez-vous disponible',
    start: new Date(2025, 4, 8, 10, 0), // 8 mai 2025 à 10h00
    end: new Date(2025, 4, 8, 11, 0),
  },
  {
    title: 'Rendez-vous disponible',
    start: new Date(2025, 4, 9, 14, 0),
    end: new Date(2025, 4, 9, 15, 0),
  },
];

const Reservation = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = ({ start, end }) => {
    alert(`Demande de rendez-vous :\nDe ${format(start, 'Pp')} à ${format(end, 'Pp')}`);
  };

  return (
    <div className="reservation-container">
      <h2>Réservez un créneau avec notre équipe</h2>
      <p>Choisissez une plage horaire disponible dans le calendrier ci-dessous :</p>

      <Calendar
        localizer={localizer}
        events={events}
        selectable
        defaultView="week"
        views={['week', 'day']}
        step={30}
        timeslots={2}
        defaultDate={new Date()}
        style={{ height: '80vh' }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={event => setSelectedEvent(event)}
        messages={{
          week: 'Semaine',
          day: 'Jour',
          agenda: 'Agenda',
          date: 'Date',
          time: 'Heure',
          event: 'Événement',
          noEventsInRange: 'Aucun événement',
        }}
      />
    </div>
  );
};

export default Reservation;
