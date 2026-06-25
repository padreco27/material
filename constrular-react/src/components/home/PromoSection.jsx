import { Sparkles, Plus, MessageCircle } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import { useApp } from '../../context/AppContext';
import './PromoSection.css';

const PROMO_END = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

export default function PromoSection() {
  const { addToCart } = useApp();
  const { days, hours, mins, secs, expired } = useCountdown(PROMO_END);
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="promo-section" id="promocoes">
      <div className="container">
        <div className="section-header">
          <h2>Ofertas Exclusivas</h2>
          <div className="divider" />
          <p>Aproveite nossos preços promocionais por tempo limitado.</p>
        </div>

        <div className="promo-banner">
          <div className="promo-grid">
            {/* Info */}
            <div className="promo-info">
              <span className="promo-tag">Destaque da Semana</span>
              <h3>Porcelanato Bianco Polido 80x80cm Retificado — Portobello</h3>
              <p className="promo-desc">
                Acabamento retificado que possibilita juntas finas de 1,5 mm, trazendo uniformidade
                e elegância a salas, halls e dormitórios.
              </p>
              <div className="promo-savings">
                <Sparkles size={16} />
                Economia real de <strong>R$&nbsp;45,00 por caixa (1,92&nbsp;m²)</strong>
              </div>

              {/* Countdown */}
              <div className="promo-countdown">
                <p className="countdown-label">Esta oferta termina em:</p>
                {expired ? (
                  <p className="promo-expired">PROMOÇÃO ENCERRADA</p>
                ) : (
                  <div className="timer">
                    {[['Dias', pad(days)], ['Horas', pad(hours)], ['Min', pad(mins)], ['Seg', pad(secs)]].map(([lbl, val]) => (
                      <div className="timer-box" key={lbl}>
                        <span className="timer-num">{val}</span>
                        <span className="timer-lbl">{lbl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product card */}
            <div className="promo-product-card">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop"
                alt="Porcelanato Bianco Polido"
              />
              <div className="promo-prices">
                <span className="promo-price">R$ 89,90<small> / m²</small></span>
                <span className="promo-old-price">R$ 114,90</span>
              </div>
              <div className="promo-actions">
                <button className="btn btn-primary" onClick={() => addToCart(26, 1)}>
                  <Plus size={16} /> Adicionar ao Orçamento
                </button>
                <a
                  href="https://wa.me/5511999999999?text=Quero%20o%20Porcelanato%20Bianco%20Polido%2080x80"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} /> Comprar agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
