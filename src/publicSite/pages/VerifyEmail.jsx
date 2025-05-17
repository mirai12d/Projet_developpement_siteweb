import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Vérification en cours...');
  const [success, setSuccess] = useState(null);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const verify = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-email/${token}`);
        const data = await res.json();

        if (data.success) {
          setMessage(data.message || "Votre compte a bien été vérifié.");
          setSuccess(true);
        } else {
          setMessage(data.message || "Lien invalide ou expiré.");
          setSuccess(false);
        }
      } catch {
        setMessage("Erreur réseau.");
        setSuccess(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div style={{
      padding: '40px 20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{
        color: success ? 'green' : 'red',
        marginBottom: '16px',
        fontSize: '1.5rem'
      }}>
        {message}
      </h2>

      {success && (
        <>
          <p style={{ marginBottom: '20px', fontSize: '1rem' }}>
            Vous pouvez maintenant vous connecter.
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: '#111',
              color: '#fff',
              padding: '14px 28px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              width: '100%',
              maxWidth: '280px'
            }}
          >
            Se connecter
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
