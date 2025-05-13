import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './FullScreenMenu.css';
import { motion, AnimatePresence } from 'framer-motion';

const FullScreenMenu = () => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileTimeoutRef = useRef(null);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userPrenom = localStorage.getItem('userPrenom');
  const userNom = localStorage.getItem('userNom');

  const isMemberPage =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/profil') ||
    location.pathname.startsWith('/commande') ||
    location.pathname.startsWith('/reservation') ||
    location.pathname.startsWith('/estimation');

  const handleEspaceMembreClick = () => {
    navigate(isMemberPage ? '/' : '/dashboard');
  };

  const handleProfileClick = () => {
    navigate('/profil');
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    clearTimeout(profileTimeoutRef.current);
    setShowProfile(true);
  };

  const handleMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setShowProfile(false);
    }, 200);
  };

  return (
    <div className="menu-wrapper">
      <div className="top-bar">
        <Link to="/" className="menu-logo">Ovrkode</Link>
        <div className="top-links">
          {!isMemberPage && (
            <span className="top-link" onClick={() => setOpen(!open)}>Explorer ▾</span>
          )}

          {isAuthenticated && (
            <button className="top-link member-btn" onClick={handleEspaceMembreClick}>
              {isMemberPage ? 'Quitter l’espace membre' : 'Espace membre'}
            </button>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="top-link">Connexion</Link>
              <Link to="/signup" className="top-link">Inscription</Link>
            </>
          )}

          {isAuthenticated && (
            <div
              className="profile-hover-zone"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="avatar-icon" onClick={handleProfileClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                </svg>
              </div>

              {showProfile && (
                <div className="profile-dropdown">
                  <p className="profile-email">{userPrenom} {userNom}</p>
                  <Link to="/dashboard">Tableau de bord</Link>
                  <Link to="/profil">Profil</Link>
                  <button onClick={logout} className="logout-btn">Déconnexion</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="close-btn" onClick={() => setOpen(false)}>×</button>

            <div className="menu-column">
              <h4>
                <span className="menu-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.487 2 12s4.486 10 10 10 10-4.487 10-10S17.514 2 12 2zm3.707 8.293l-2 5a1 1 0 01-.586.586l-5 2a1 1 0 01-1.303-1.303l2-5a1 1 0 01.586-.586l5-2a1 1 0 011.303 1.303z"/>
                  </svg>
                </span>
                Navigation
              </h4>
              <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
              <Link to="/projects" onClick={() => setOpen(false)}>Projets</Link>
              <Link to="/tarifs" onClick={() => setOpen(false)}>Tarifs</Link>
            </div>

            <div className="menu-column">
              <h4>
                <span className="menu-icon">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.476 2 12s4.477 10 10 10 10-4.476 10-10S17.523 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </span>
                Informations
              </h4>
              <Link to="/about" onClick={() => setOpen(false)}>À propos</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullScreenMenu;
