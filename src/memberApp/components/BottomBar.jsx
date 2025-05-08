import React from 'react';
import { Link } from 'react-router-dom';
import './BottomBar.css';

const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-logo">O.</div>
      <div className="bottom-links">
      <Link to="/profil">Profil</Link>
        <Link to="/reservation">Réservation</Link> {/* ✅ correction ici */}
        <Link to="/estimation">Estimation</Link>
        <Link to="/support">Support</Link>
       
      </div>
    </div>
  );
};

export default BottomBar;
