import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">Koodi</Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className="nav-item">Accueil</Link></li>
            <li><Link to="/services" className="nav-item">Services</Link></li>
            <li><Link to="/projects" className="nav-item">Projets</Link></li>
            <li><Link to="/tarifs" className="nav-item">Tarifs</Link></li>
            <li><Link to="/about" className="nav-item">À propos</Link></li>
            <li><Link to="/contact" className="nav-item">Contact</Link></li>

            {!isAuthenticated ? (
              <>
                <li><Link to="/login" className="nav-item">Connexion</Link></li>
                <li><Link to="/signup" className="nav-item">Inscription</Link></li>
              </>
            ) : (
              <li>
                <button onClick={logout} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1b7f79' }}>
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
