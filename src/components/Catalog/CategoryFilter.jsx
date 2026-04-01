import React from 'react';

const categories = [
  { id: 'all', name: 'Все букеты' },
  { id: 'romantic', name: 'Романтические' },
  { id: 'wedding', name: 'Свадебные' },
  { id: 'spring', name: 'Весенние' },
  { id: 'birthday', name: 'День рождения' },
  { id: 'business', name: 'Деловые' }
];

export function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <section className="catalog-filters">
      <div className="container">
        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}