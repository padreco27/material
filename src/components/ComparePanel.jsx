import { useApp } from '../context/AppContext.jsx';
import { GitCompare, X, Eye } from 'lucide-react';

function formatCurrency(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ComparePanel() {
  const { compareList, compareOpen, getProduct, toggleCompare, closeComparePanel, openCompareModal } = useApp();

  const slots = [0, 1, 2];

  return (
    <div className={`compare-panel ${compareOpen ? 'active' : ''}`}>
      <div className="compare-panel-header">
        <h4><GitCompare size={16} style={{ marginRight: 6 }} /> Comparar Produtos</h4>
        <span className="compare-panel-close" onClick={closeComparePanel}><X size={18} /></span>
      </div>
      <div className="compare-items-grid">
        {slots.map(i => {
          const p = compareList[i] ? getProduct(compareList[i]) : null;
          return (
            <div className="compare-item-slot" key={i}>
              {p ? (
                <>
                  <span className="compare-slot-remove" onClick={() => toggleCompare(p.id)}><X size={10} /></span>
                  <img src={p.images[0]} alt={p.name} className="compare-slot-img" />
                  <div>
                    <div className="compare-slot-title">{p.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>{formatCurrency(p.price)}</div>
                  </div>
                </>
              ) : (
                <div className="compare-slot-empty">Vazio</div>
              )}
            </div>
          );
        })}
        <button className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13, whiteSpace: 'nowrap' }} onClick={openCompareModal}>
          <Eye size={14} /> Comparar
        </button>
      </div>
    </div>
  );
}
