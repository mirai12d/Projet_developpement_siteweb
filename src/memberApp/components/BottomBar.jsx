import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomBar.css';

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const isProfilPage = pathname === '/profil';

  const isActive = (path) => pathname === path;

  return (
    <div className="bottom-bar">
      <div className="bottom-logo">O.</div>
      <div className="bottom-links">
        {!isProfilPage ? (
          <>
            <button
              onClick={() => navigate('/profil')}
              className={isActive('/profil') ? 'active' : ''}
            >
              Profil
            </button>
            <button
              onClick={() => navigate('/reservation')}
              className={isActive('/reservation') ? 'active' : ''}
            >
              Réservation
            </button>
            <button
              onClick={() => navigate('/estimation')}
              className={isActive('/estimation') ? 'active' : ''}
            >
              Estimation
            </button>
            <button
              onClick={() => navigate('/support')}
              className={isActive('/support') ? 'active' : ''}
            >
              Support
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/profil?settings=true')}
            className={location.search === '?settings=true' ? 'active' : ''}
          >
            Réglages
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
