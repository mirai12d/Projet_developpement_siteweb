import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './FullScreenMenu.css';

const FullScreenMenu = () => {
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const userPrenom = localStorage.getItem('userPrenom');
  const userNom = localStorage.getItem('userNom');

  const location = useLocation();
  const navigate = useNavigate();

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const isMemberPage = location.pathname.startsWith('/profil') ||
                       location.pathname.startsWith('/commande') ||
                       location.pathname.startsWith('/reservation') ||
                       location.pathname.startsWith('/estimation');

  const handleEspaceMembreClick = () => {
    if (isMemberPage) {
      navigate('/');
    } else {
      navigate('/profil');
    }
  };

  return (
    <>
      <div className="top-bar">
        <Link to="/" className="menu-logo">Ovrkode</Link>
        <div className="top-links">
          <span className="top-link" onClick={() => setOpen(!open)}>Explorer ▾</span>

          {isAuthenticated && (
            <button className="top-link member-btn" onClick={handleEspaceMembreClick}>
            {isMemberPage ? 'Quitter l’espace membre' : 'Espace membre'}
          </button>
          
          )}

          {isAuthenticated && (
            <div className="profile-menu">
              <button onClick={toggleProfileMenu} className="profile-icon">
                <svg width="24" height="24" fill="#1b7f79" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              </button>
              {profileMenuOpen && (
                <div className="profile-dropdown">
                  <p className="profile-email">{userPrenom} {userNom}</p>
                  <button onClick={logout} className="logout-btn">Déconnexion</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`mega-menu ${open ? 'open' : ''}`}>
        <div className="menu-column">
          <h4><i className="icon">🏆</i> Navigation</h4>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/projects" onClick={() => setOpen(false)}>Projets</Link>
          <Link to="/tarifs" onClick={() => setOpen(false)}>Tarifs</Link>
        </div>
        <div className="menu-column">
          <h4><i className="icon">ℹ️</i> Informations</h4>
          <Link to="/about" onClick={() => setOpen(false)}>À propos</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>

        {!isAuthenticated && (
          <div className="menu-column">
            <h4><i className="icon">🔐</i> Compte</h4>
            <Link to="/login" onClick={() => setOpen(false)}>Connexion</Link>
            <Link to="/signup" onClick={() => setOpen(false)}>Inscription <span className="badge">New</span></Link>
          </div>
        )}
      </div>
    </>
  );
};

export default FullScreenMenu;
