import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomBar.css';
import { useTranslation } from 'react-i18next'; // ✅

const BottomBar = () => {
  const { t } = useTranslation(); // ✅
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
              {t('bottom.profil')}
            </button>
            <button
              onClick={() => navigate('/reservation')}
              className={isActive('/reservation') ? 'active' : ''}
            >
              {t('bottom.reservation')}
            </button>
            <button
              onClick={() => navigate('/estimation')}
              className={isActive('/estimation') ? 'active' : ''}
            >
              {t('bottom.estimation')}
            </button>
            <button
              onClick={() => navigate('/support')}
              className={isActive('/support') ? 'active' : ''}
            >
              {t('bottom.support')}
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/profil?settings=true')}
            className={location.search === '?settings=true' ? 'active' : ''}
          >
            {t('bottom.settings')}
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
