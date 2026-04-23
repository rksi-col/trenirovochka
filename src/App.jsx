import { getAvailableExercises, createTraining } from './api/trainings';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { login, register } from './api/auth';
import { 
  getAllTrainings, 
  createTraining, 
  getTrainingByTimestamp,
  addExerciseToTraining,
  removeExerciseFromTraining,
  getAvailableExercises,
  getTrainingsByDay
} from './api/trainings';

// ============ СТРАНИЦА ВХОДА ============
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1 className="form-title">Вход</h1>
        <p className="form-subtitle">Войдите в свой аккаунт</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите username"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: 24 }}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}

// ============ СТРАНИЦА РЕГИСТРАЦИИ ============
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      await register(username, password);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1 className="form-title">Регистрация</h1>
        <p className="form-subtitle">Создайте новый аккаунт</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Придумайте username"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Подтверждение пароля</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              required
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: 24 }}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}

// ============ КОМПОНЕНТ LAYOUT ============
function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setIsAuthenticated(true);
      setUser({ username });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="header-top">
            <Link to="/" className="logo">💪 TrackWorkout</Link>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            <nav className={menuOpen ? 'nav-main active' : 'nav-main'}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Дашборд</Link>
                  <Link to="/workouts" onClick={() => setMenuOpen(false)}>Тренировки</Link>
                  <Link to="/calendar" onClick={() => setMenuOpen(false)}>Календарь</Link>
                  <Link to="/reports" onClick={() => setMenuOpen(false)}>Отчеты</Link>
                  <button onClick={handleLogout} className="logout-btn">Выйти</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Вход</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>Регистрация</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>TrackWorkout</h3>
              <p>Отслеживай свои тренировки</p>
            </div>
            <div className="footer-column">
              <h3>Контакты</h3>
              <p>Email: support@trackworkout.com</p>
            </div>
          </div>
          <div className="copyright">
            <p>© 2025 TrackWorkout - Твой фитнес трекер</p>
          </div>
        </div>
      </footer>
    </>
  );
}

// ============ ГЛАВНАЯ ============
function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="hero">
      <div className="container">
        <h1>TrackYourWorkout</h1>
        <p>Отслеживай тренировки, добавляй упражнения, смотри прогресс!</p>
        {!isAuthenticated ? (
          <div>
            <Link to="/register" className="btn">Начать сейчас</Link>
            <Link to="/login" className="btn btn-outline" style={{ marginLeft: 16 }}>Войти</Link>
          </div>
        ) : (
          <Link to="/dashboard" className="btn">Перейти в дашборд</Link>
        )}
      </div>
    </div>
  );
}

// ============ ДАШБОРД ============
function DashboardPage() {
  const [username, setUsername] = useState('');
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'Пользователь');
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      const data = await getAllTrainings();
      setTrainings(data || []);
    } catch (error) {
      console.error('Ошибка:', error);
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  const totalTrainings = trainings.length;
  const totalExercises = trainings.reduce((sum, t) => sum + (t.exercises?.length || 0), 0);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="page-title">Добро пожаловать, {username}! 👋</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📋</span>
          <div>
            <h3>Всего тренировок</h3>
            <p className="stat-number">{totalTrainings}</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💪</span>
          <div>
            <h3>Всего упражнений</h3>
            <p className="stat-number">{totalExercises}</p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Link to="/workouts/create" className="btn">+ Новая тренировка</Link>
        <Link to="/workouts" className="btn btn-outline">Все тренировки</Link>
      </div>
    </div>
  );
}

// ============ СПИСОК ТРЕНИРОВОК ============
function WorkoutsPage() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      const data = await getAllTrainings();
      setTrainings((data || []).sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error('Ошибка:', error);
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ru-RU');
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <h1>Мои тренировки</h1>
        <Link to="/workouts/create" className="btn">+ Создать</Link>
      </div>
      
      {trainings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <h3>У вас пока нет тренировок</h3>
          <p>Создайте свою первую тренировку!</p>
          <Link to="/workouts/create" className="btn">Создать тренировку</Link>
        </div>
      ) : (
        <div className="table-container">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Категория</th>
                <th>Упражнения</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trainings.map(t => (
                <tr key={t.id}>
                  <td>{formatDate(t.timestamp)}</td>
                  <td>{t.category}</td>
                  <td>{t.exercises?.length || 0}</td>
                  <td>
                    <button onClick={() => navigate(`/workouts/${t.timestamp}`)} className="icon-btn">📝</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============ СОЗДАНИЕ ТРЕНИРОВКИ ============
function CreateWorkoutPage() {
  const [category, setCategory] = useState('силовая');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [availableExercises] = useState(getAvailableExercises());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addExercise = (exercise) => {
    // Проверяем, что exercise.id существует
    if (!exercise.id) {
      console.error('У упражнения нет ID!', exercise);
      return;
    }
    
    // Проверяем, не добавлено ли уже это упражнение
    if (selectedExercises.find(e => e.exerciseId === exercise.id)) {
      alert('Это упражнение уже добавлено');
      return;
    }
    
    // Добавляем упражнение с его ID
    setSelectedExercises([...selectedExercises, { 
      exerciseId: exercise.id,  // ← КЛЮЧЕВОЙ МОМЕНТ! ID подставляется здесь
      name: exercise.name,
      sortId: selectedExercises.length + 1 
    }]);
  };

  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(e => e.exerciseId !== exerciseId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedExercises.length === 0) {
      alert('Добавьте хотя бы одно упражнение');
      return;
    }

    setLoading(true);
    try {
      await createTraining(Date.now(), category, selectedExercises);
      navigate('/workouts');
    } catch (error) {
      alert('Ошибка создания тренировки');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>Новая тренировка</h1>
      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
        <div className="form-group">
          <label>Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="силовая">Силовая</option>
            <option value="кардио">Кардио</option>
            <option value="гибкость">Гибкость</option>
          </select>
        </div>

        <div className="form-group">
          <label>Добавить упражнения</label>
          <select 
            onChange={(e) => {
              const ex = availableExercises.find(ex => ex.id === parseInt(e.target.value));
              if (ex) {
                console.log('Выбрано упражнение:', ex); // Проверка в консоли
                addExercise(ex);
              }
              e.target.value = '';
            }} 
            style={{ marginBottom: 16 }}
          >
            <option value="">-- Выберите упражнение --</option>
            {availableExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name} - {ex.targetMuscle}</option>
            ))}
          </select>
        </div>

        {selectedExercises.length > 0 && (
          <div>
            <label>Выбранные упражнения:</label>
            {selectedExercises.map(ex => (
              <div key={ex.exerciseId} className="exercise-card">
                <div>
                  <strong>{ex.name}</strong>
                </div>
                <button type="button" onClick={() => removeExercise(ex.exerciseId)} className="icon-btn delete">🗑️</button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <button type="submit" className="btn" disabled={loading}>{loading ? 'Создание...' : 'Создать'}</button>
          <button type="button" onClick={() => navigate('/workouts')} className="btn btn-outline">Отмена</button>
        </div>
      </form>
    </div>
  );
}

// ============ ДЕТАЛИ ТРЕНИРОВКИ ============
function WorkoutDetailPage() {
  const { timestamp } = useParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableExercises] = useState(getAvailableExercises());
  const [addingExercise, setAddingExercise] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadTraining();
  }, [timestamp]);

  const loadTraining = async () => {
    try {
      const data = await getTrainingByTimestamp(parseInt(timestamp));
      setTraining(data);
    } catch (error) {
      console.error('Ошибка:', error);
      setTraining(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = async () => {
    if (!selectedExerciseId) return;
    setAddingExercise(true);
    try {
      await addExerciseToTraining(training.id, parseInt(selectedExerciseId), (training.exercises?.length || 0) + 1);
      await loadTraining();
      setSelectedExerciseId('');
    } catch (error) {
      alert('Ошибка добавления упражнения');
    } finally {
      setAddingExercise(false);
    }
  };

  const handleRemoveExercise = async (exerciseId) => {
    try {
      await removeExerciseFromTraining(training.id, exerciseId);
      await loadTraining();
    } catch (error) {
      alert('Ошибка удаления упражнения');
    }
  };

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (!training) return <div className="container" style={{ paddingTop: 40 }}>Тренировка не найдена</div>;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>{training.category} тренировка</h1>
      <p>Дата: {new Date(training.timestamp).toLocaleString('ru-RU')}</p>

      <h2 style={{ marginTop: 32, marginBottom: 16 }}>Упражнения</h2>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <select value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)} className="filter-select" style={{ padding: 10 }}>
          <option value="">-- Добавить упражнение --</option>
          {availableExercises.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.name} - {ex.targetMuscle}</option>
          ))}
        </select>
        <button onClick={handleAddExercise} className="btn btn-small" disabled={addingExercise || !selectedExerciseId}>
          {addingExercise ? '...' : '+ Добавить'}
        </button>
      </div>

      {training.exercises?.length === 0 ? (
        <p>Нет упражнений. Добавьте первое!</p>
      ) : (
        training.exercises?.map(ex => (
          <div key={ex.id} className="exercise-card">
            <div className="exercise-info">
              <h4>{ex.name}</h4>
              <p>{ex.targetMuscle}</p>
            </div>
            <button onClick={() => handleRemoveExercise(ex.id)} className="icon-btn delete">🗑️</button>
          </div>
        ))
      )}

      <Link to="/workouts" className="btn btn-outline" style={{ marginTop: 32 }}>← Назад к списку</Link>
    </div>
  );
}

// ============ КАЛЕНДАРЬ ============
function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    getTrainingsForDate(today);
  }, []);

  const getTrainingsForDate = async (date) => {
    setLoading(true);
    try {
      const data = await getTrainingsByDay(date);
      setTrainings(data || []);
    } catch (error) {
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    getTrainingsForDate(date);
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>Календарь тренировок</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 30, marginTop: 24 }}>
        <div className="calendar">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}
          />
        </div>

        <div className="card">
          <h3>{selectedDate}</h3>
          {loading ? (
            <div className="loader-container" style={{ padding: 20 }}><div className="loader"></div></div>
          ) : trainings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <p>Нет тренировок на этот день</p>
              <Link to="/workouts/create" className="btn btn-small" style={{ marginTop: 16 }}>Создать тренировку</Link>
            </div>
          ) : (
            trainings.map(t => (
              <div key={t.id} className="exercise-card">
                <div>
                  <strong>{t.category}</strong>
                  <p>{new Date(t.timestamp).toLocaleTimeString('ru-RU')}</p>
                </div>
                <Link to={`/workouts/${t.timestamp}`} className="icon-btn">📝</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ============ ОТЧЕТЫ ============
function ReportsPage() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      const data = await getAllTrainings();
      setTrainings(data || []);
    } catch (error) {
      console.error('Ошибка:', error);
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  const totalTrainings = trainings.length;
  const totalExercises = trainings.reduce((sum, t) => sum + (t.exercises?.length || 0), 0);
  
  const categoryStats = {};
  trainings.forEach(t => {
    categoryStats[t.category] = (categoryStats[t.category] || 0) + 1;
  });

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1>Отчеты</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div><h3>Всего тренировок</h3><p className="stat-number">{totalTrainings}</p></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💪</span>
          <div><h3>Всего упражнений</h3><p className="stat-number">{totalExercises}</p></div>
        </div>
      </div>

      <div className="card">
        <h3>Статистика по категориям</h3>
        {Object.keys(categoryStats).length === 0 ? (
          <p>Нет данных</p>
        ) : (
          Object.entries(categoryStats).map(([cat, count]) => (
            <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span>{cat}</span>
              <span style={{ fontWeight: 'bold' }}>{count} тренировок</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============ ОСНОВНОЙ КОМПОНЕНТ ============
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/workouts/create" element={<CreateWorkoutPage />} />
        <Route path="/workouts/:timestamp" element={<WorkoutDetailPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;