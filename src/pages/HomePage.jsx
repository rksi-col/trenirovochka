import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    { icon: "fa-calendar-alt", title: "Календарь тренировок", desc: "Планируйте и отслеживайте свои тренировки" },
    { icon: "fa-dumbbell", title: "Упражнения", desc: "Добавляйте упражнения в каждую тренировку" },
    { icon: "fa-chart-line", title: "Отчеты", desc: "Анализируйте свой прогресс" },
    { icon: "fa-mobile-alt", title: "Доступность", desc: "Пользуйтесь на любом устройстве" }
  ];

  return (
    <>
      {/* Hero секция */}
      <section style={{ 
        padding: '100px 0', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>TrackYourWorkout</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto' }}>
            Отслеживайте свои тренировки, управляйте упражнениями и достигайте новых целей!
          </p>
          {!isAuthenticated ? (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/register" className="btn">Начать сейчас</Link>
              <Link to="/login" className="btn btn-outline" style={{ background: 'transparent', borderColor: 'white', color: 'white' }}>
                Войти
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="btn">Перейти в панель управления</Link>
          )}
        </div>
      </section>

      {/* Преимущества */}
      <section style={{ padding: '80px 0', background: '#f9fafb' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Возможности приложения</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px',
            marginTop: '40px'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{ 
                textAlign: 'center', 
                padding: '30px', 
                background: 'white', 
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <i className={`fas ${f.icon}`} style={{ fontSize: '2.5rem', color: '#4f46e5', marginBottom: '15px' }}></i>
                <h3>{f.title}</h3>
                <p style={{ color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}