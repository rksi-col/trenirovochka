import React from 'react';

export function OrderPage() {
  const steps = [
    { num: 1, title: "Выберите букет", desc: "Посмотрите примеры наших работ или придумайте свой уникальный вариант" },
    { num: 2, title: "Позвоните нам", desc: "Обсудите детали заказа с нашим флористом по телефону" },
    { num: 3, title: "Получите букет", desc: "Мы доставим ваш заказ в указанное время и место" }
  ];

  return (
    <>
      <section style={{ padding: '80px 0', background: '#f9f3f6' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>Как заказать букет</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {steps.map(step => (
              <div key={step.num} style={{ display: 'flex', gap: '20px', background: 'white', padding: '30px', borderRadius: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: '#e83e8c', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{step.num}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  {step.num === 2 && (
                    <a href="tel:+78005551615" className="btn" style={{ display: 'inline-block', marginTop: '15px', background: '#28a745' }}>
                      <i className="fas fa-phone-alt"></i> 8‒800‒555‒16‒15
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Контакты</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div style={{ textAlign: 'center', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: '#e83e8c', marginBottom: '15px' }}></i>
              <h3>Адрес</h3>
              <p>г. Ростов-на-Дону</p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <i className="fas fa-phone-alt" style={{ fontSize: '2rem', color: '#e83e8c', marginBottom: '15px' }}></i>
              <h3>Телефон</h3>
              <p><a href="tel:+78005551615">8‒800‒555‒16‒15</a></p>
            </div>
            <div style={{ textAlign: 'center', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <i className="fas fa-clock" style={{ fontSize: '2rem', color: '#e83e8c', marginBottom: '15px' }}></i>
              <h3>Часы работы</h3>
              <p>Пн-Пт: 9:00 - 20:00<br/>Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}