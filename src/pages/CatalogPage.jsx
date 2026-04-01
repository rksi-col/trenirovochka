import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryFilter } from '../components/Catalog/CategoryFilter';
import { ProductGrid } from '../components/Catalog/ProductGrid';
import { getItems } from '../api/items';

export function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('cat') || 'all';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        setAllItems(data);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/catalog?cat=${categoryId}`, { replace: true });
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return allItems;
    }
    return allItems.filter(item => item.category === activeCategory);
  }, [allItems, activeCategory]);

  const categories = {
    all: { title: 'Все букеты', desc: 'Выберите идеальный букет для любого случая' },
    romantic: { title: 'Романтические букеты', desc: 'Для признаний в любви' },
    wedding: { title: 'Свадебные букеты', desc: 'Идеальные букеты для вашего дня' },
    spring: { title: 'Весенние букеты', desc: 'Свежие и яркие композиции' },
    birthday: { title: 'Букеты на день рождения', desc: 'Яркие и праздничные' },
    business: { title: 'Деловые букеты', desc: 'Строгие и элегантные' }
  };

  const current = categories[activeCategory] || categories.all;

  return (
    <>
      <section style={{ padding: '60px 0', textAlign: 'center', background: '#fff5f9' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{current.title}</h1>
          <p style={{ color: '#666' }}>{current.desc}</p>
        </div>
      </section>
      
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      
      <section style={{ padding: '40px 0' }}>
        <div className="container">
          <ProductGrid products={filteredItems} loading={loading} />
        </div>
      </section>
      
      <section style={{ padding: '60px 0', textAlign: 'center', background: '#f5fff9' }}>
        <div className="container">
          <h2>Не нашли нужный букет?</h2>
          <p>Мы создадим индивидуальную композицию специально для вас</p>
          <a href="tel:+78005551615" className="btn">Позвонить флористу</a>
        </div>
      </section>
    </>
  );
}