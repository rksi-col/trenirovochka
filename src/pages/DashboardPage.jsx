import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getWorkoutStats } from '../api/workouts';

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalExercises: 0,
    categoryStats: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getWorkoutStats();
      setStats(data);
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { to: '/workouts', icon: 'fa-dumbbell', title: 'Мои тренировки', desc: 'Просмотр и управление тренировками', color: '#4f46e5' },
    { to: '/workouts/create', icon: 'fa-plus-circle', title: 'Создать тренировку', desc: 'Добавьте новую тренировку', color: '#10b981' },
    { to: '/calendar', icon: 'fa-calendar-alt', title: 'Календарь', desc: 'Просмотр тренировок по датам', color: '#f59e0b' },
    { to: '/reports', icon: 'fa-chart-line', title: 'Отчеты', desc: 'Анализ прогресса', color: '#ef4444' }
  ];

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1>Добро пожаловать, {user?.name || 'Пользователь'}! 👋</h1>
          <p style={{ color: '#6b7280' }}>Вот сводка ваших тренировок</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <i className="fas fa-calendar-check"></i>
            <div className="stat-info">
              <h3>Всего тренировок</h3>
              <div className="stat-number">{stats.totalWorkouts}</div>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-running"></i>
            <div className="stat-info">
              <h3>Всего упражнений</h3>
              <div className="stat-number">{stats.totalExercises}</div>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-chart-simple"></i>
            <div className="stat-info">
              <h3>Категорий</h3>
              <div className="stat-number">{Object.keys(stats.categoryStats).length}</div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 style={{ marginBottom: '24px' }}>Быстрые действия</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {menuItems.map(item => (
              <Link key={item.to} to={item.to} className="card" style={{ textAlign: 'center' }}>
                <i className={`fas ${item.icon}`} style={{ fontSize: '48px', color: item.color, marginBottom: '16px' }}></i>
                <h3>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}