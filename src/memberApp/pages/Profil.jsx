import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import MemberLayout from '../../layouts/MemberLayout';
import './Profil.css';

const Profil = () => {
  const prenom = localStorage.getItem('userPrenom') || 'Utilisateur';
  const nom = localStorage.getItem('userNom') || '';
  const email = localStorage.getItem('userEmail') || 'inconnu@test.com';
  const token = localStorage.getItem('token');

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [afficherSettings, setAfficherSettings] = useState(false);
  const [ongletActif, setOngletActif] = useState('compte');

  const [userInfo, setUserInfo] = useState({
    nomComplet: `${prenom} ${nom}`,
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
  }, [location.search]);

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateUserInfo = async () => {
    const [p, n] = userInfo.nomComplet.split(' ');
    try {
      const resp = await fetch('http://localhost:3001/api/user/update-info', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prenom: p, nom: n, email: userInfo.email }),
      });
      if (resp.ok) {
        alert('Informations mises à jour.');
        localStorage.setItem('userPrenom', p);
        localStorage.setItem('userNom', n);
        localStorage.setItem('userEmail', userInfo.email);
        window.location.reload();
      } else {
        alert('Erreur lors de la mise à jour.');
      }
    } catch {
      alert('Erreur réseau.');
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
        alert('Mot de passe mis à jour.');
        setPasswords({ current: '', new: '' });
      } else {
        alert('Erreur lors du changement de mot de passe.');
      }
    } catch {
      alert('Erreur réseau.');
    }
  };

  return (
    <MemberLayout>
      <div className="profil-layout">
        {afficherSettings && (
          <aside className="profil-sidebar">
            <h3 className="profil-sidebar-title">Paramètres utilisateur</h3>
            <button onClick={() => setOngletActif('compte')} className={ongletActif === 'compte' ? 'actif' : ''}>Mon compte</button>
            <button onClick={() => setOngletActif('securite')} className={ongletActif === 'securite' ? 'actif' : ''}>Sécurité</button>
            <button onClick={() => setOngletActif('factures')} className={ongletActif === 'factures' ? 'actif' : ''}>Factures</button>
            <button onClick={() => setOngletActif('commandes')} className={ongletActif === 'commandes' ? 'actif' : ''}>Commandes</button>
            <button onClick={() => setOngletActif('paiements')} className={ongletActif === 'paiements' ? 'actif' : ''}>Paiements</button>
            <button onClick={() => setOngletActif('support')} className={ongletActif === 'support' ? 'actif' : ''}>Support</button>
          </aside>
        )}

        <section className="profil-main">
          <div className="dashboard-container">
            <button className="back-button" onClick={() => navigate('/dashboard')}>
              ← Retour au tableau de bord
            </button>

            {!afficherSettings ? (
              <>
                <h2 className="profil-title">Mon profil</h2>
                <p className="profil-subtitle">Bienvenue {prenom} {nom} 👋</p>

                <div className="profil-header-card">
                  <div className="avatar-placeholder">👤</div>
                  <div>
                    <h3>{prenom} {nom}</h3>
                    <p>{email}</p>
                  </div>
                </div>

                <div className="dashboard-summary">
                  <div className="summary-block">
                    <span>📧</span>
                    <div>
                      <h4>Email</h4>
                      <p>{email}</p>
                    </div>
                  </div>
                  <div className="summary-block">
                    <span>📦</span>
                    <div>
                      <h4>Dernière commande</h4>
                      <p>Aucune commande récente</p>
                    </div>
                  </div>
                  <div className="summary-block">
                    <span>🛠️</span>
                    <div>
                      <h4>Support</h4>
                      <p>0 ticket(s) ouvert(s)</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {ongletActif === 'compte' && (
                  <div>
                    <h2>Mon compte</h2>
                    <p>Gérez vos informations personnelles.</p>
                    <div className="form-group">
                      <label>Nom complet</label>
                      <input type="text" name="nomComplet" value={userInfo.nomComplet} onChange={handleUserInfoChange} />
                    </div>
                    <div className="form-group">
                      <label>Adresse e-mail</label>
                      <input type="email" name="email" value={userInfo.email} onChange={handleUserInfoChange} />
                    </div>
                    <button className="save-btn" onClick={updateUserInfo}>Enregistrer les modifications</button>
                  </div>
                )}

                {ongletActif === 'securite' && (
                  <div>
                    <h2>Sécurité</h2>
                    <p>Modifiez votre mot de passe.</p>
                    <div className="form-group">
                      <label>Mot de passe actuel</label>
                      <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group">
                      <label>Nouveau mot de passe</label>
                      <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} />
                    </div>
                    <button className="save-btn" onClick={updatePassword}>Mettre à jour le mot de passe</button>
                  </div>
                )}

                {ongletActif === 'factures' && (
                  <div>
                    <h2>Mes factures</h2>
                    <p>Vous n'avez pas encore de factures disponibles.</p>
                  </div>
                )}

                {ongletActif === 'commandes' && (
                  <div>
                    <h2>Mes commandes</h2>
                    <p>Aucune commande enregistrée pour le moment.</p>
                  </div>
                )}

                {ongletActif === 'paiements' && (
                  <div>
                    <h2>Mes moyens de paiement</h2>
                    <p>Aucun moyen de paiement enregistré.</p>
                  </div>
                )}

                {ongletActif === 'support' && (
                  <div>
                    <h2>Support</h2>
                    <p>Vous n'avez pas encore ouvert de ticket.</p>
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
