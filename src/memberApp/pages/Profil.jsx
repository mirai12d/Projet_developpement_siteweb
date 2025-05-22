import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import MemberLayout from '../../layouts/MemberLayout';
import './Profil.css';
import { Mail, Wrench, UserCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // ✅

const Profil = () => {
  const { t } = useTranslation(); // ✅
  const prenom = localStorage.getItem('userPrenom') || t('profile.defaultPrenom');
  const nom = localStorage.getItem('userNom') || '';
  const email = localStorage.getItem('userEmail') || t('profile.defaultEmail');
  const token = localStorage.getItem('token');

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [afficherSettings, setAfficherSettings] = useState(false);
  const [ongletActif, setOngletActif] = useState('compte');

  const [userInfo, setUserInfo] = useState({
    prenom: prenom,
    nom: nom,
    username: '',
    email: email
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: ''
  });

  useEffect(() => {
    if (searchParams.get('settings') === 'true') {
      setAfficherSettings(true);
    }
  }, [location.search, searchParams]);

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateUserInfo = async () => {
    try {
      const resp = await fetch('http://localhost:3001/api/user/update-info', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          prenom: userInfo.prenom,
          nom: userInfo.nom,
          email: userInfo.email,
          username: userInfo.username
        }),
      });

      if (resp.ok) {
        alert(t('profile.infoUpdated'));
        localStorage.setItem('userPrenom', userInfo.prenom);
        localStorage.setItem('userNom', userInfo.nom);
        localStorage.setItem('userEmail', userInfo.email);
        window.location.reload();
      } else {
        alert(t('profile.updateError'));
      }
    } catch {
      alert(t('profile.networkError'));
    }
  };

  const updatePassword = async () => {
    try {
      const resp = await fetch('http://localhost:3001/api/user/update-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });
      if (resp.ok) {
        alert(t('profile.passwordUpdated'));
        setPasswords({ current: '', new: '' });
      } else {
        alert(t('profile.passwordError'));
      }
    } catch {
      alert(t('profile.networkError'));
    }
  };

  return (
    <MemberLayout>
      <div className="profil-layout">
        {afficherSettings && (
          <aside className="profil-sidebar">
            <h3 className="profil-sidebar-title">{t('profile.settingsTitle')}</h3>
            <button onClick={() => setOngletActif('compte')} className={ongletActif === 'compte' ? 'actif' : ''}>{t('profile.tabs.account')}</button>
            <button onClick={() => setOngletActif('securite')} className={ongletActif === 'securite' ? 'actif' : ''}>{t('profile.tabs.security')}</button>
            <button onClick={() => setOngletActif('factures')} className={ongletActif === 'factures' ? 'actif' : ''}>{t('profile.tabs.invoices')}</button>
            <button onClick={() => setOngletActif('paiements')} className={ongletActif === 'paiements' ? 'actif' : ''}>{t('profile.tabs.payments')}</button>
            <button onClick={() => setOngletActif('support')} className={ongletActif === 'support' ? 'actif' : ''}>{t('profile.tabs.support')}</button>
          </aside>
        )}

        <section className="profil-main">
          <div className="dashboard-container">
            <button className="back-button" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={16} style={{ marginRight: 6 }} />
              {t('profile.back')}
            </button>

            {!afficherSettings ? (
              <>
                <h2 className="profil-title">{t('profile.title')}</h2>
                <p className="profil-subtitle">{t('profile.subtitle', { prenom, nom })}</p>

                <div className="profil-header-card">
                  <div className="avatar-placeholder">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h3>{prenom} {nom}</h3>
                    <p>{email}</p>
                  </div>
                </div>

                <div className="dashboard-summary">
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
                      <h4>{t('profile.supportTitle')}</h4>
                      <p>{t('profile.supportStatus')}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {ongletActif === 'compte' && (
                  <div>
                    <h2>{t('profile.tabs.account')}</h2>
                    <p>{t('profile.editInfo')}</p>
                    <div className="form-group">
                      <label>{t('profile.fields.prenom')}</label>
                      <input type="text" name="prenom" value={userInfo.prenom} onChange={handleUserInfoChange} />
                    </div>
                    <div className="form-group">
                      <label>{t('profile.fields.nom')}</label>
                      <input type="text" name="nom" value={userInfo.nom} onChange={handleUserInfoChange} />
                    </div>
                    <div className="form-group">
                      <label>{t('profile.fields.username')}</label>
                      <input type="text" name="username" value={userInfo.username} onChange={handleUserInfoChange} />
                    </div>
                    <div className="form-group">
                      <label>{t('profile.fields.email')}</label>
                      <input type="email" name="email" value={userInfo.email} onChange={handleUserInfoChange} />
                    </div>
                    <button className="save-btn" onClick={updateUserInfo}>{t('profile.save')}</button>
                  </div>
                )}

                {ongletActif === 'securite' && (
                  <div>
                    <h2>{t('profile.tabs.security')}</h2>
                    <p>{t('profile.changePassword')}</p>
                    <div className="form-group">
                      <label>{t('profile.fields.currentPassword')}</label>
                      <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group">
                      <label>{t('profile.fields.newPassword')}</label>
                      <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} />
                    </div>
                    <button className="save-btn" onClick={updatePassword}>{t('profile.updatePassword')}</button>
                  </div>
                )}

                {ongletActif === 'factures' && (
                  <div>
                    <h2>{t('profile.tabs.invoices')}</h2>
                    <p>{t('profile.noInvoices')}</p>
                  </div>
                )}

                {ongletActif === 'paiements' && (
                  <div>
                    <h2>{t('profile.tabs.payments')}</h2>
                    <p>{t('profile.noPayments')}</p>
                  </div>
                )}

                {ongletActif === 'support' && (
                  <div>
                    <h2>{t('profile.tabs.support')}</h2>
                    <p>{t('profile.noTickets')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </MemberLayout>
  );
};

export default Profil;
