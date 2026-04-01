import React from 'react';

export function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-img" style={{ backgroundImage: `url(${product.image_url})` }}>
        {product.is_hit && <div className="product-badge hit">Хит продаж</div>}
        {product.is_new && <div className="product-badge new">Новинка</div>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-price">
          {product.price.toLocaleString()} ₽
        </div>
        <a href="tel:+78005551615" className="btn btn-small">Заказать</a>
      </div>
    </div>
  );
}