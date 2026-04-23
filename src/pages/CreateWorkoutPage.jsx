import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../api/workouts';

export function CreateWorkoutPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'strength',
    date: new Date().toISOString().split('T')[0],
    duration: '60',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Введите название тренировки');
      return;
    }
    
    try {
      setLoading(true);
      await createWorkout(formData);
      navigate('/workouts');
    } catch (error) {
      console.error('Ошибка создания:', error);
      alert('Ошибка при создании тренировки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
            <button onClick={() => navigate('/workouts')} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
              ←
            </button>
            <h1>Создать тренировку</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="card">
            <div className="form-group">
              <label>Название тренировки *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Например: Утренняя зарядка"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Категория</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="strength">Силовая тренировка</option>
                <option value="cardio">Кардио</option>
                <option value="yoga">Йога</option>
                <option value="stretching">Стретчинг</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Дата</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Продолжительность (минуты)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                max="300"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Заметки (опционально)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Дополнительные заметки о тренировке..."
              />
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Создание...' : 'Создать тренировку'}
              </button>
              <button type="button" onClick={() => navigate('/workouts')} className="btn btn-outline">
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}