import React, { useContext, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <NavLink to="/" className="logo-link">Koodi</NavLink>
        </div>

        {/* Burger button */}
        <button className="burger" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation */}
        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul className="nav-links">
            <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Accueil</NavLink></li>
            <li><NavLink to="/services" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Services</NavLink></li>
            <li><NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Projets</NavLink></li>
            <li><NavLink to="/tarifs" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Tarifs</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>À propos</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Contact</NavLink></li>

            {!isAuthenticated ? (
              <>
                <li><NavLink to="/login" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Connexion</NavLink></li>
                <li><NavLink to="/signup" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Inscription</NavLink></li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="nav-item"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#1b7f79',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                >
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
