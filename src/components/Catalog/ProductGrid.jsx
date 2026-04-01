import React from 'react';
import { ProductCard } from '../UI/ProductCard';
import { Loader } from '../UI/Loader';

export function ProductGrid({ products, loading }) {
  if (loading) {
    return <Loader />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center" style={{ padding: '60px 0' }}>
        <p>В этой категории пока нет букетов</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}