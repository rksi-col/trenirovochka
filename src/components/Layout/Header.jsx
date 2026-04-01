import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="header-top">
          <Link to="/" className="logo">
            <i className="fas fa-spa"></i> Flowwow
          </Link>
          
          <nav className={`nav-main ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Главная</NavLink></li>
              <li><NavLink to="/catalog" onClick={() => setIsMenuOpen(false)}>Букеты</NavLink></li>
              <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)}>О нас</NavLink></li>
              <li><NavLink to="/order" onClick={() => setIsMenuOpen(false)}>Заказать</NavLink></li>
              {isAuthenticated && (
                <li><NavLink to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Админ-панель</NavLink></li>
              )}
            </ul>
          </nav>
          
          <div className="header-icons">
            <a href="tel:+78005551615"><i className="fas fa-phone-alt"></i> 8‒800‒555‒16‒15</a>
            {isAuthenticated && (
              <button onClick={logout} className="logout-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            )}
          </div>
          
          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
}