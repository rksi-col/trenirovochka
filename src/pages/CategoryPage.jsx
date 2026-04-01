import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductGrid } from '../components/Catalog/ProductGrid';
import { getItems } from '../api/items';

export function CategoryPage() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const allItems = await getItems();
        const filtered = allItems.filter(item => item.category === categoryId);
        setItems(filtered);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, [categoryId]);

  const categoryNames = {
    romantic: 'Романтические букеты',
    wedding: 'Свадебные букеты',
    spring: 'Весенние букеты',
    birthday: 'Букеты на день рождения',
    business: 'Деловые букеты'
  };

  const categoryName = categoryNames[categoryId] || 'Категория';

  return (
    <>
      <section style={{ padding: '20px 0', background: '#f9f3f6' }}>
        <div className="container">
          <ul style={{ display: 'flex', listStyle: 'none' }}>
            <li><Link to="/" style={{ color: '#e83e8c' }}>Главная</Link></li>
            <li style={{ margin: '0 10px' }}>/</li>
            <li><Link to="/catalog" style={{ color: '#e83e8c' }}>Букеты</Link></li>
            <li style={{ margin: '0 10px' }}>/</li>
            <li>{categoryName}</li>
          </ul>
        </div>
      </section>
      
      <section style={{ padding: '40px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{categoryName}</h1>
          <p style={{ color: '#666' }}>Подборка красивых букетов для особенных моментов</p>
        </div>
      </section>
      
      <section style={{ padding: '40px 0', background: '#f9f3f6' }}>
        <div className="container">
          <ProductGrid products={items} loading={loading} />
        </div>
      </section>
    </>
  );
}