import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { X, ShoppingCart, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../utils.js';
import StarRating from './StarRating.jsx';

const TABS = ['Descrição', 'Especificações', 'Aplicações', 'Demonstração', 'Avaliações'];

const mockReviews = [
  { author: 'Carlos Silva', rating: 5, text: 'Produto de excelente qualidade, entregue antes do prazo.', date: '10/03/2026' },
  { author: 'Ana Oliveira', rating: 4, text: 'Bom custo-benefício. Atendeu bem às expectativas.', date: '22/02/2026' },
  { author: 'Miguel Santos', rating: 5, text: 'Sempre compro aqui. Melhor preço da região!', date: '05/02/2026' },
];

export default function ProductModal() {
  const { productModalId, setProductModalId, getProduct, addToCart } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const product = productModalId ? getProduct(productModalId) : null;

  if (!product) return null;

  const relatedProducts = (product.relatedIds || [])
    .map(id => getProduct(id))
    .filter(Boolean);

  const hasVideo = product.videoUrl && !product.videoUrl.includes('dQw4w9WgXcQ');

  const handleClose = () => {
    setProductModalId(null);
    setActiveTab(0);
    setMainImageIndex(0);
  };

  return (
    <div className={`modal-overlay ${product ? 'active' : ''}`} onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="modal-close-btn" onClick={handleClose}><X size={18} /></span>

        <div className="modal-grid">
          <div className="modal-gallery">
            <div className="modal-main-image">
              <img src={product.images[mainImageIndex]} alt={product.name} />
            </div>
            {product.images.length > 1 && (
              <div className="modal-thumbnails">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`modal-thumb ${mainImageIndex === i ? 'active' : ''}`}
                    onClick={() => setMainImageIndex(i)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            <span className="modal-brand">{product.brand}</span>
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-price-rating">
              <span className="modal-price">{formatCurrency(product.price)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <StarRating rating={product.rating} />
                <span style={{ fontSize: 13, color: 'var(--text-sec)', marginLeft: 4 }}>
                  ({product.reviewsCount})
                </span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-sec)', lineHeight: 1.6 }}>
              {product.description}
            </p>
            <div style={{ fontSize: 13, display: 'flex', gap: 16 }}>
              <span><strong>Código:</strong> {product.code}</span>
              <span><strong>Unidade:</strong> {product.unit}</span>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => { addToCart(product.id, 1); }}>
                <ShoppingCart size={16} /> Adicionar ao Orçamento
              </button>
              <a
                href={`https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20em:%20${encodeURIComponent(product.name)}%20(Cód:${product.code})`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: '#25D366', color: '#25D366' }}
              >
                <MessageCircle size={16} /> Consultar via WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="modal-tabs-section">
          <div className="modal-tabs-header">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`modal-tab-btn ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className={`modal-tab-pane ${activeTab === 0 ? 'active' : ''}`}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-sec)' }}>{product.description}</p>
          </div>

          <div className={`modal-tab-pane ${activeTab === 1 ? 'active' : ''}`}>
            {product.specs && (
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={`modal-tab-pane ${activeTab === 2 ? 'active' : ''}`}>
            {product.applications && (
              <ul className="applications-list">
                {product.applications.map((app, i) => (
                  <li key={i}>{app}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={`modal-tab-pane ${activeTab === 3 ? 'active' : ''}`}>
            {hasVideo ? (
              <div className="video-container">
                <iframe src={product.videoUrl} title="Demonstração" allowFullScreen></iframe>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, background: 'var(--bg-sec)', borderRadius: 'var(--radius-sm)', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-sec)' }}>Vídeo em breve</p>
                <p style={{ fontSize: 14, color: 'var(--text-sec)' }}>O vídeo demonstrativo deste produto será disponibilizado em breve.</p>
              </div>
            )}
          </div>

          <div className={`modal-tab-pane ${activeTab === 4 ? 'active' : ''}`}>
            <div className="reviews-summary">
              <div className="reviews-score" style={{ color: 'var(--accent)' }}>{product.rating}</div>
              <div className="reviews-stars">
                <div className="reviews-stars-row"><StarRating rating={product.rating} size={18} /></div>
                <span className="reviews-count-lbl">{product.reviewsCount} avaliações</span>
              </div>
            </div>
            <div className="reviews-list">
              {mockReviews.map((review, i) => (
                <div className="review-item" key={i}>
                  <div className="review-meta">
                    <span className="review-author">{review.author}</span>
                    <div className="review-stars"><StarRating rating={review.rating} size={12} /></div>
                  </div>
                  <div className="review-text">{review.text}</div>
                  <span style={{ fontSize: 11, color: 'var(--text-sec)' }}>{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="modal-related-section">
            <h4 style={{ marginBottom: 16, fontSize: 18 }}>Produtos Relacionados</h4>
            <div className="modal-related-grid">
              {relatedProducts.slice(0, 3).map(rp => (
                <div
                  key={rp.id}
                  className="product-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => { setProductModalId(rp.id); setMainImageIndex(0); setActiveTab(0); }}
                >
                  <div className="product-card-image" style={{ height: 140 }}>
                    <img src={rp.images[0]} alt={rp.name} />
                  </div>
                  <div className="product-card-body" style={{ padding: 12, gap: 6 }}>
                    <div className="product-title" style={{ fontSize: 13, height: 36 }}>{rp.name}</div>
                    <div className="product-price" style={{ fontSize: 16 }}>{formatCurrency(rp.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
