import React, { useContext, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);
  const userPrenom = localStorage.getItem('userPrenom');
  const userNom = localStorage.getItem('userNom');
  

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/" className="logo-link">Ovrkode</NavLink>
        </div>

        <button className="burger" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul className="nav-links">
            <li><NavLink to="/" onClick={closeMenu}>Accueil</NavLink></li>
            <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
            <li><NavLink to="/projects" onClick={closeMenu}>Projets</NavLink></li>
            <li><NavLink to="/tarifs" onClick={closeMenu}>Tarifs</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>À propos</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>

            {!isAuthenticated ? (
              <>
                <li><NavLink to="/login" onClick={closeMenu}>Connexion</NavLink></li>
                <li><NavLink to="/signup" onClick={closeMenu}>Inscription</NavLink></li>
              </>
            ) : (
              <li className="profile-menu">
                <button onClick={toggleProfileMenu} className="profile-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1b7f79" viewBox="0 0 24 24">
  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
</svg>
</button>
                {profileMenuOpen && (
  <div className="profile-dropdown">
    <p className="profile-email">{userPrenom} {userNom}</p>
    <button onClick={() => { logout(); closeMenu(); }} className="logout-btn">Déconnexion</button>
  </div>
)}

              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
