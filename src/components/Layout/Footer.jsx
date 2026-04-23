import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>TrackYourWorkout</h3>
            <ul>
              <li><Link to="/">Главная</Link></li>
              {isAuthenticated ? (
                <>
                  <li><Link to="/dashboard">Дашборд</Link></li>
                  <li><Link to="/workouts">Тренировки</Link></li>
                  <li><Link to="/calendar">Календарь</Link></li>
                  <li><Link to="/reports">Отчеты</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Войти</Link></li>
                  <li><Link to="/register">Регистрация</Link></li>
                </>
              )}
            </ul>
          </div>
          <div className="footer-column">
            <h3>Контакты</h3>
            <ul>
              <li>Email: support@trackworkout.com</li>
              <li>Телефон: +7 (999) 123-45-67</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>О проекте</h3>
            <ul>
              <li>Отслеживайте тренировки</li>
              <li>Анализируйте прогресс</li>
              <li>Достигайте новых целей</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 TrackYourWorkout. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}