import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './FullScreenMenu.css';

const FullScreenMenu = () => {
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const { isAuthenticated, logout } = useContext(AuthContext);
  const userPrenom = localStorage.getItem('userPrenom');
  const userNom = localStorage.getItem('userNom');

  return (
    <>
      <div className="top-bar">
      <Link to="/" className="menu-logo">Ovrkode</Link>


        <div className="top-actions">
          <Link to="/contact" className="top-link">Contactez-nous</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="top-link">Connexion</Link>
              <Link to="/signup" className="top-link">Inscription</Link>
            </>
          ) : (
            <div className="profile-menu">
              <button onClick={toggleProfileMenu} className="profile-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1b7f79" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                </svg>
              </button>
              {profileMenuOpen && (
                <div className="profile-dropdown">
                  <p className="profile-email">{userPrenom} {userNom}</p>
                  <button onClick={() => { logout(); setOpen(false); }} className="logout-btn">Déconnexion</button>
                </div>
              )}
            </div>
          )}

          <button className="menu-toggle" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div className={`menu-fullscreen ${open ? 'show' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Accueil</Link></li>
          <li><Link to="/services" onClick={() => setOpen(false)}>Services</Link></li>
          <li><Link to="/projects" onClick={() => setOpen(false)}>Projets</Link></li>
          <li><Link to="/tarifs" onClick={() => setOpen(false)}>Tarifs</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>À propos</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
      </div>
    </>
  );
};

export default FullScreenMenu;
