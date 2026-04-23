import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkouts } from '../api/workouts';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';

export function CalendarPage() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const getWorkoutsForDate = (date) => {
    return workouts.filter(w => isSameDay(new Date(w.date), date));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const selectedWorkouts = selectedDate ? getWorkoutsForDate(selectedDate) : [];

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px' }}>Календарь тренировок</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={handlePrevMonth} className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <h2>{format(currentMonth, 'LLLL yyyy', { locale: ru })}</h2>
              <button onClick={handleNextMonth} className="btn-icon" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <div className="calendar-weekdays">
              {weekDays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            
            <div className="calendar-days">
              {daysInMonth.map((day, index) => {
                const dayWorkouts = getWorkoutsForDate(day);
                const hasWorkout = dayWorkouts.length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                
                return (
                  <div
                    key={index}
                    className={`calendar-day ${hasWorkout ? 'has-workout' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <span>{format(day, 'd')}</span>
                    {hasWorkout && <div className="workout-indicator"></div>}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ marginBottom: '16px' }}>
              {selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
            </h3>
            
            {selectedDate && selectedWorkouts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <i className="fas fa-calendar-day" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}></i>
                <p>Нет тренировок на этот день</p>
                <button
                  onClick={() => navigate('/workouts/create')}
                  className="btn btn-small"
                  style={{ marginTop: '16px' }}
                >
                  Создать тренировку
                </button>
              </div>
            ) : selectedDate && selectedWorkouts.length > 0 ? (
              <div>
                {selectedWorkouts.map(workout => (
                  <div
                    key={workout.id}
                    className="exercise-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/workouts/${workout.id}`)}
                  >
                    <div className="exercise-info">
                      <h4>{workout.name}</h4>
                      <p>{workout.duration} мин • {
                        workout.category === 'cardio' ? 'Кардио' :
                        workout.category === 'strength' ? 'Силовая' :
                        workout.category === 'yoga' ? 'Йога' : 'Стретчинг'
                      }</p>
                    </div>
                    <i className="fas fa-chevron-right" style={{ color: '#9ca3af' }}></i>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}