import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Магазин</h3>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/catalog">Букеты</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/order">Заказать</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Контакты</h3>
            <ul>
              <li>г. Ростов-на-Дону</li>
              <li>8‒800‒555‒16‒15</li>
              <li>info@flower.ru</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Часы работы</h3>
            <ul>
              <li>Пн-Пт: 9:00 - 20:00</li>
              <li>Сб-Вс: 10:00 - 18:00</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 Flowwow. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}