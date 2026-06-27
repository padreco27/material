import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../utils.js';

const promoItems = [
  { id: 4, name: 'Argamassa AC2 Cinza 20kg', desc: 'Argamassa colante industrializada de alta aderência para áreas externas e internas.' },
  { id: 26, name: 'Porcelanato Bianco Polido 80x80cm', desc: 'Porcelanato polido retificado de alto brilho com juntas quase invisíveis.' },
];

export default function PromoSection() {
  const { getProduct, addToCart } = useApp();
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  });
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  if (!timeLeft) return null;

  const expired = target - Date.now() <= 0;

  return (
    <section className="promo-section" id="promo">
      <div className="container">
        <div className="section-header">
          <h2>Promoções Imperdíveis</h2>
          <div className="divider"></div>
          <p>Aproveite ofertas especiais por tempo limitado.</p>
        </div>

        {expired ? (
          <div className="promo-banner" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 18 }}>PROMOÇÃO ENCERRADA!</p>
            <p style={{ color: 'var(--text-sec)', marginTop: 8 }}>Fique atento às próximas ofertas.</p>
          </div>
        ) : (
          <div className="promo-timer" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
            {Object.entries(timeLeft).map(([key, val]) => (
              <div className="timer-box" key={key}>
                <span className="timer-num">{String(val).padStart(2, '0')}</span>
                <span className="timer-lbl">{key === 'days' ? 'Dias' : key === 'hours' ? 'Horas' : key === 'minutes' ? 'Min' : 'Seg'}</span>
              </div>
            ))}
          </div>
        )}

        {!expired && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {promoItems.map(item => {
              const product = getProduct(item.id);
              if (!product) return null;
              const oldPrice = product.price * 1.25;
              return (
                <div className="promo-banner" key={item.id}>
                  <div className="promo-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="promo-info">
                      <span className="promo-tag">Oferta Relâmpago</span>
                      <h3>{item.name}</h3>
                      <p className="promo-desc">{item.desc}</p>
                      <p className="promo-savings">Economia de até <span>25% OFF</span></p>
                      <div className="promo-prices" style={{ marginTop: 16 }}>
                        <span className="promo-old-price-label">De: {formatCurrency(oldPrice)}</span>
                        <span className="promo-curr-price">Por: {formatCurrency(product.price)}</span>
                      </div>
                    </div>
                    <div className="promo-product-image">
                      <img src={product.images[0]} alt={product.name} />
                      <div className="hero-btns" style={{ justifyContent: 'center', marginTop: 12 }}>
                        <button className="btn btn-primary" onClick={() => addToCart(product.id, 1)}>
                          <ShoppingCart size={16} /> Adicionar
                        </button>
                        <a
                          href={`https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20na%20promoção:%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          style={{ borderColor: '#25D366', color: '#25D366' }}
                        >
                          <MessageCircle size={16} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}
