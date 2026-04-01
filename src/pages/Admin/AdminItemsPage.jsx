import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getItems, deleteItem } from '../../api/items';
import { Loader } from '../../components/UI/Loader';

export function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить этот букет?')) return;
    
    try {
      setDeleteLoading(id);
      await deleteItem(id);
      await loadItems();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении букета');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ padding: '40px 0', background: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Управление букетами</h1>
          <Link to="/admin/items/new" className="btn">+ Добавить букет</Link>
        </div>
        
        <div style={{ background: 'white', borderRadius: '15px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Изображение</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Название</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Категория</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Цена</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Хит</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Новинка</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{item.id}</td>
                  <td style={{ padding: '15px' }}><img src={item.image_url} alt={item.name} width="50" style={{ borderRadius: '8px', height: '50px', objectFit: 'cover' }} /></td>
                  <td style={{ padding: '15px' }}>{item.name}</td>
                  <td style={{ padding: '15px' }}>{item.category}</td>
                  <td style={{ padding: '15px' }}>{item.price.toLocaleString()} ₽</td>
                  <td style={{ padding: '15px' }}>{item.is_hit ? '✓' : '—'}</td>
                  <td style={{ padding: '15px' }}>{item.is_new ? '✓' : '—'}</td>
                  <td style={{ padding: '15px' }}>
                    <Link to={`/admin/items/${item.id}/edit`} style={{ display: 'inline-block', width: '35px', height: '35px', borderRadius: '8px', background: '#f0f0f0', textAlign: 'center', lineHeight: '35px', marginRight: '10px', color: '#333' }}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button onClick={() => handleDelete(item.id)} disabled={deleteLoading === item.id} style={{ width: '35px', height: '35px', borderRadius: '8px', background: '#f0f0f0', border: 'none', cursor: 'pointer' }}>
                      {deleteLoading === item.id ? '...' : <i className="fas fa-trash"></i>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}