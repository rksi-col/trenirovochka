import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutById, addExercise, deleteExercise, updateWorkout } from '../api/workouts';

export function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: ''
  });
  const [addingExercise, setAddingExercise] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadWorkout();
  }, [id]);

  const loadWorkout = async () => {
    try {
      const data = await getWorkoutById(id);
      setWorkout(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseChange = (e) => {
    setExerciseForm({ ...exerciseForm, [e.target.name]: e.target.value });
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    
    if (!exerciseForm.name.trim()) {
      alert('Введите название упражнения');
      return;
    }
    
    try {
      setAddingExercise(true);
      await addExercise(id, {
        name: exerciseForm.name,
        sets: parseInt(exerciseForm.sets) || 0,
        reps: parseInt(exerciseForm.reps) || 0,
        weight: parseFloat(exerciseForm.weight) || 0
      });
      await loadWorkout();
      setExerciseForm({ name: '', sets: '', reps: '', weight: '' });
      setShowExerciseForm(false);
    } catch (error) {
      console.error('Ошибка добавления:', error);
      alert('Ошибка при добавлении упражнения');
    } finally {
      setAddingExercise(false);
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    if (!confirm('Удалить это упражнение?')) return;
    
    try {
      setDeletingId(exerciseId);
      await deleteExercise(exerciseId);
      await loadWorkout();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении упражнения');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCompleteWorkout = async () => {
    try {
      await updateWorkout(id, { completed: true });
      navigate('/workouts');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (!workout) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>Тренировка не найдена</h2>
        <button onClick={() => navigate('/workouts')} className="btn">Вернуться к списку</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => navigate('/workouts')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
              ←
            </button>
            <h1>{workout.name}</h1>
          </div>
          <button onClick={handleCompleteWorkout} className="btn btn-secondary">
            <i className="fas fa-check"></i> Завершить тренировку
          </button>
        </div>
        
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <strong>Дата:</strong> {new Date(workout.date).toLocaleDateString('ru-RU')}
            </div>
            <div>
              <strong>Продолжительность:</strong> {workout.duration} минут
            </div>
            <div>
              <strong>Категория:</strong> {
                workout.category === 'cardio' ? 'Кардио' :
                workout.category === 'strength' ? 'Силовая' :
                workout.category === 'yoga' ? 'Йога' : 'Стретчинг'
              }
            </div>
            <div>
              <strong>Статус:</strong> {workout.completed ? '✅ Завершена' : '🔄 В процессе'}
            </div>
          </div>
          {workout.notes && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <strong>Заметки:</strong>
              <p style={{ marginTop: '8px', color: '#6b7280' }}>{workout.notes}</p>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Упражнения</h2>
          <button onClick={() => setShowExerciseForm(!showExerciseForm)} className="btn btn-small">
            <i className="fas fa-plus"></i> Добавить упражнение
          </button>
        </div>
        
        {showExerciseForm && (
          <form onSubmit={handleAddExercise} className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Новое упражнение</h3>
            <div className="form-group">
              <label>Название упражнения *</label>
              <input
                type="text"
                name="name"
                value={exerciseForm.name}
                onChange={handleExerciseChange}
                placeholder="Например: Приседания"
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Подходы</label>
                <input
                  type="number"
                  name="sets"
                  value={exerciseForm.sets}
                  onChange={handleExerciseChange}
                  placeholder="3"
                />
              </div>
              <div className="form-group">
                <label>Повторения</label>
                <input
                  type="number"
                  name="reps"
                  value={exerciseForm.reps}
                  onChange={handleExerciseChange}
                  placeholder="10"
                />
              </div>
              <div className="form-group">
                <label>Вес (кг)</label>
                <input
                  type="number"
                  name="weight"
                  value={exerciseForm.weight}
                  onChange={handleExerciseChange}
                  placeholder="20"
                  step="0.5"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button type="submit" className="btn" disabled={addingExercise}>
                {addingExercise ? 'Добавление...' : 'Добавить'}
              </button>
              <button type="button" onClick={() => setShowExerciseForm(false)} className="btn btn-outline">
                Отмена
              </button>
            </div>
          </form>
        )}
        
        {(!workout.exercises || workout.exercises.length === 0) ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <i className="fas fa-dumbbell" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}></i>
            <p>Упражнения не добавлены</p>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Нажмите "Добавить упражнение" чтобы начать</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Упражнение</th>
                  <th>Подходы</th>
                  <th>Повторения</th>
                  <th>Вес (кг)</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {workout.exercises.map(exercise => (
                  <tr key={exercise.id}>
                    <td><strong>{exercise.name}</strong></td>
                    <td>{exercise.sets || '-'}</td>
                    <td>{exercise.reps || '-'}</td>
                    <td>{exercise.weight || '-'}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteExercise(exercise.id)}
                        disabled={deletingId === exercise.id}
                        style={{
                          background: '#fee2e2',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          color: '#dc2626',
                          cursor: 'pointer'
                        }}
                      >
                        {deletingId === exercise.id ? '...' : <i className="fas fa-trash"></i>}
                      </button>
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