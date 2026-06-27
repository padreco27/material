import { useApp } from '../context/AppContext.jsx';
import { Heart, X, ShoppingCart } from 'lucide-react';

function formatCurrency(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function FavoritesDrawer() {
  const { drawerOpen, closeDrawer, favorites, getProduct, addToCart } = useApp();

  return (
    <>
      <div className={`drawer-backdrop ${drawerOpen ? 'active' : ''}`} onClick={closeDrawer}></div>
      <div className={`drawer ${drawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h3><Heart size={18} style={{ marginRight: 8 }} /> Favoritos</h3>
          <span className="drawer-close" onClick={closeDrawer}><X size={20} /></span>
        </div>
        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="fav-empty">
              <Heart size={48} style={{ marginBottom: 12, color: 'var(--border)' }} />
              <p>Nenhum favorito ainda.</p>
              <p style={{ fontSize: 13, marginTop: 8, color: 'var(--text-sec)' }}>
                Clique no coração dos produtos para adicioná-los aqui.
              </p>
            </div>
          ) : (
            favorites.map(id => {
              const p = getProduct(id);
              if (!p) return null;
              return (
                <div className="fav-item" key={id}>
                  <img src={p.images[0]} alt={p.name} className="fav-item-img" />
                  <div className="fav-item-info">
                    <div className="fav-item-title">{p.name}</div>
                    <div className="fav-item-price">{formatCurrency(p.price)}</div>
                  </div>
                  <div className="fav-actions">
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => addToCart(p.id, 1)}>
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
