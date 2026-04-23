import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../api/workouts';

export function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить эту тренировку?')) return;
    
    try {
      setDeletingId(id);
      await deleteWorkout(id);
      await loadWorkouts();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении тренировки');
    } finally {
      setDeletingId(null);
    }
  };

  const categoryColors = {
    cardio: '#ef4444',
    strength: '#4f46e5',
    yoga: '#10b981',
    stretching: '#f59e0b'
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <h1>Мои тренировки</h1>
          <Link to="/workouts/create" className="btn">
            <i className="fas fa-plus"></i> Создать тренировку
          </Link>
        </div>
        
        {workouts.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <i className="fas fa-dumbbell" style={{ fontSize: '64px', color: '#d1d5db', marginBottom: '16px' }}></i>
            <h3>У вас пока нет тренировок</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>Создайте свою первую тренировку!</p>
            <Link to="/workouts/create" className="btn">Создать тренировку</Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Дата</th>
                  <th>Продолжительность</th>
                  <th>Упражнения</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map(workout => (
                  <tr key={workout.id}>
                    <td><strong>{workout.name}</strong></td>
                    <td>
                      <span style={{ 
                        background: categoryColors[workout.category] || '#6b7280', 
                        color: 'white', 
                        padding: '4px 12px', 
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}>
                        {workout.category === 'cardio' ? 'Кардио' : 
                         workout.category === 'strength' ? 'Силовая' :
                         workout.category === 'yoga' ? 'Йога' : 'Стретчинг'}
                      </span>
                    </td>
                    <td>{new Date(workout.date).toLocaleDateString('ru-RU')}</td>
                    <td>{workout.duration} мин</td>
                    <td>{workout.exercises?.length || 0}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link to={`/workouts/${workout.id}`} className="btn-icon" style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: '32px', 
                          height: '32px', 
                          background: '#e5e7eb', 
                          borderRadius: '8px',
                          color: '#374151'
                        }}>
                          <i className="fas fa-eye"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(workout.id)} 
                          disabled={deletingId === workout.id}
                          style={{ 
                            width: '32px', 
                            height: '32px', 
                            background: '#fee2e2', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#dc2626',
                            cursor: 'pointer'
                          }}
                        >
                          {deletingId === workout.id ? '...' : <i className="fas fa-trash"></i>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}