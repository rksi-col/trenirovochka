import React from 'react';

export function AboutPage() {
  const team = [
    { name: "Полина", role: "Главный флорист", img: "https://i.pinimg.com/736x/1e/a3/6d/1ea36d5bb25523c8d877f9c58b48bfa3.jpg" },
    { name: "Мария", role: "Флорист-дизайнер", img: "https://i.pinimg.com/736x/21/b7/ae/21b7ae162182f17922ac5b193161d1c4.jpg" },
    { name: "Дмитрий", role: "Менеджер", img: "https://i.pinimg.com/736x/47/b4/08/47b408d514b99960bd5041e7f9153e3f.jpg" }
  ];

  return (
    <>
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>О нашей мастерской</h1>
          <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '400px', backgroundImage: "url('https://i.pinimg.com/736x/40/78/4f/40784f0ccab353251335751f474581e7.jpg')", backgroundSize: 'cover', borderRadius: '10px' }}></div>
            <div style={{ flex: 1 }}>
              <p>Flowwow - это команда профессиональных флористов с более чем 10-летним опытом создания уникальных цветочных композиций.</p>
              <p>Наша история началась в 2010 году с небольшой цветочной лавки в центре Москвы. Сегодня мы - полноценная цветочная мастерская с собственной студией и командой талантливых флористов.</p>
              <p>Мы работаем только со свежими цветами от проверенных поставщиков и создаем букеты с душой и вниманием к деталям.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#f9f3f6' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>Наша команда</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {team.map((member, i) => (
              <div key={i} style={{ textAlign: 'center', background: 'white', padding: '30px', borderRadius: '10px' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundImage: `url(${member.img})`, backgroundSize: 'cover', margin: '0 auto 20px' }}></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}