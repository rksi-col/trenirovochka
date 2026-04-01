import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/Catalog/ProductGrid';
import { getItems } from '../api/items';

export function HomePage() {
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const items = await getItems();
        setPopularItems(items.slice(0, 3));
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPopular();
  }, []);

  const categoryImages = {
    wedding: "https://i.pinimg.com/736x/04/99/5d/04995d268635d11f1ee0a659525a0711.jpg",
    birthday: "https://i.pinimg.com/736x/ac/ed/d2/acedd2e2b953d0637e41e9fffdbbfee7.jpg",
    romantic: "https://i.pinimg.com/736x/d9/6d/7c/d96d7c6e332d711c13acb67193b7380a.jpg",
    business: "https://i.pinimg.com/736x/44/b8/fa/44b8fa8a8744b195159eb5a3a19e2919.jpg"
  };

  const features = [
    { icon: "fa-truck", title: "Быстрая доставка", desc: "Доставка в день заказа" },
    { icon: "fa-leaf", title: "Свежие цветы", desc: "Только свежие цветы" },
    { icon: "fa-gift", title: "Подарочная упаковка", desc: "Красивая упаковка" },
    { icon: "fa-lock", title: "Безопасная оплата", desc: "Оплата при получении" }
  ];

  return (
    <>
      <section className="hero" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://i.pinimg.com/736x/2b/59/d3/2b59d3685de2a7461f557ccf16bdda40.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <h1>Искусство цветов в каждом букете</h1>
          <p>Дарите эмоции с нашими авторскими букетами</p>
          <a href="tel:+78005551615" className="btn">Заказать букет</a>
        </div>
      </section>

      <section className="popular">
        <div className="container">
          <h2 className="section-title">Популярные букеты</h2>
          <p className="section-subtitle">Выберите идеальный букет для любого случая</p>
          <ProductGrid products={popularItems} loading={loading} />
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/catalog" className="btn btn-outline">Посмотреть всю коллекцию</Link>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">Категории букетов</h2>
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <Link to="/category/wedding" className="category-card" style={{ position: 'relative', height: '200px', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ backgroundImage: `url(${categoryImages.wedding})`, height: '100%', backgroundSize: 'cover' }}></div>
              <h3 style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', padding: '20px' }}>Свадебные</h3>
            </Link>
            <Link to="/category/birthday" className="category-card" style={{ position: 'relative', height: '200px', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ backgroundImage: `url(${categoryImages.birthday})`, height: '100%', backgroundSize: 'cover' }}></div>
              <h3 style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', padding: '20px' }}>День рождения</h3>
            </Link>
            <Link to="/category/romantic" className="category-card" style={{ position: 'relative', height: '200px', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ backgroundImage: `url(${categoryImages.romantic})`, height: '100%', backgroundSize: 'cover' }}></div>
              <h3 style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', padding: '20px' }}>Романтические</h3>
            </Link>
            <Link to="/category/business" className="category-card" style={{ position: 'relative', height: '200px', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ backgroundImage: `url(${categoryImages.business})`, height: '100%', backgroundSize: 'cover' }}></div>
              <h3 style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'white', padding: '20px' }}>Деловые</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Преимущества</h2>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ textAlign: 'center', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <i className={`fas ${f.icon}`} style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '15px' }}></i>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}