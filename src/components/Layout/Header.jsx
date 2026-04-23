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
            <i className="fas fa-dumbbell"></i> TrackYourWorkout
          </Link>
          
          <nav className={`nav-main ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><NavLink to="/" onClick={() => setIsMenuOpen(false)}>Главная</NavLink></li>
              {isAuthenticated && (
                <>
                  <li><NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Дашборд</NavLink></li>
                  <li><NavLink to="/workouts" onClick={() => setIsMenuOpen(false)}>Тренировки</NavLink></li>
                  <li><NavLink to="/calendar" onClick={() => setIsMenuOpen(false)}>Календарь</NavLink></li>
                  <li><NavLink to="/reports" onClick={() => setIsMenuOpen(false)}>Отчеты</NavLink></li>
                </>
              )}
            </ul>
          </nav>
          
          <div className="header-icons">
            {isAuthenticated ? (
              <button onClick={logout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Выйти
              </button>
            ) : (
              <Link to="/login" className="btn btn-small">Войти</Link>
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