import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '60px 0' }}>
      <div className="container">
        <div style={{ maxWidth: '450px', margin: '0 auto', background: 'white', borderRadius: '20px', padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <i className="fas fa-lock" style={{ fontSize: '48px', color: '#e83e8c', marginBottom: '15px' }}></i>
            <h1 style={{ fontSize: '24px' }}>Вход в админ-панель</h1>
            <p style={{ color: '#666' }}>Введите свои учетные данные</p>
          </div>
          
          {error && <div style={{ background: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@flowwow.ru"
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              />
            </div>
            
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '14px', color: '#666' }}>
            <p>Демо-данные:</p>
            <p><strong>admin@flowwow.ru</strong> / <strong>admin123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}