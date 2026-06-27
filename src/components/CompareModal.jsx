import { useApp } from '../context/AppContext.jsx';
import { X, GitCompare } from 'lucide-react';

function formatCurrency(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CompareModal() {
  const { compareList, compareModalOpen, setCompareModalOpen, getProduct } = useApp();

  const products = compareList.map(id => getProduct(id)).filter(Boolean);

  const rows = [
    { label: 'Preço', render: (p) => formatCurrency(p.price) },
    { label: 'Marca', render: (p) => p.brand },
    { label: 'Unidade', render: (p) => p.unit },
    { label: 'Disponibilidade', render: (p) => p.availability ? 'Disponível' : 'Indisponível' },
    { label: 'Avaliação', render: (p) => `${p.rating}/5` },
  ];

  const specKeys = products.length > 0 ? Object.keys(products[0].specs || {}) : [];

  return (
    <div className={`modal-overlay ${compareModalOpen ? 'active' : ''}`} onClick={() => setCompareModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 800 }}>
        <span className="modal-close-btn" onClick={() => setCompareModalOpen(false)}><X size={18} /></span>
        <div style={{ padding: '30px 30px 0' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <GitCompare size={20} /> Comparação de Produtos
          </h3>
        </div>
        <div className="compare-modal-body" style={{ padding: '20px 30px 30px' }}>
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: 160 }}>Especificação</th>
                {products.map(p => (
                  <th key={p.id}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }} />
                      <span style={{ fontSize: 12 }}>{p.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.label}>
                  <td><strong>{row.label}</strong></td>
                  {products.map(p => <td key={p.id}>{row.render(p)}</td>)}
                </tr>
              ))}
              {specKeys.map(key => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  {products.map(p => <td key={p.id}>{p.specs?.[key] || '-'}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
