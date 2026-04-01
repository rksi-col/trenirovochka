import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const { user } = useAuth();

  const menuItems = [
    { to: '/admin/items', icon: 'fa-box', title: 'Управление букетами', desc: 'Добавляйте, редактируйте и удаляйте букеты' },
    { to: '/admin/orders', icon: 'fa-truck', title: 'Заказы', desc: 'Просмотр и управление заказами' },
    { to: '/admin/users', icon: 'fa-users', title: 'Пользователи', desc: 'Управление пользователями' },
  ];

  return (
    <div style={{ padding: '40px 0', background: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Добро пожаловать, {user?.name || 'Администратор'}!</h1>
          <p>Управляйте интернет-магазином цветов</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          <div style={{ background: 'white', borderRadius: '15px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <i className="fas fa-box" style={{ fontSize: '48px', color: '#e83e8c' }}></i>
            <div>
              <h3 style={{ fontSize: '14px', color: '#666' }}>Всего букетов</h3>
              <p style={{ fontSize: '28px', fontWeight: 'bold' }}>12</p>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '48px', color: '#e83e8c' }}></i>
            <div>
              <h3 style={{ fontSize: '14px', color: '#666' }}>Заказов сегодня</h3>
              <p style={{ fontSize: '28px', fontWeight: 'bold' }}>8</p>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '15px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <i className="fas fa-users" style={{ fontSize: '48px', color: '#e83e8c' }}></i>
            <div>
              <h3 style={{ fontSize: '14px', color: '#666' }}>Пользователей</h3>
              <p style={{ fontSize: '28px', fontWeight: 'bold' }}>156</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 style={{ marginBottom: '20px' }}>Управление</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {menuItems.map(item => (
              <Link key={item.to} to={item.to} style={{ background: 'white', borderRadius: '15px', padding: '30px', textAlign: 'center', textDecoration: 'none', color: '#333', transition: 'all 0.3s' }}>
                <i className={`fas ${item.icon}`} style={{ fontSize: '48px', color: '#e83e8c', marginBottom: '15px' }}></i>
                <h3>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}