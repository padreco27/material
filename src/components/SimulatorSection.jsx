import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Calculator, ShoppingCart } from 'lucide-react';

export default function SimulatorSection() {
  const { addToCart, showToast } = useApp();
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [type, setType] = useState('estrutura');

  const calculate = () => {
    const a = parseFloat(area) || 0;
    const c = parseInt(rooms) || 0;
    let cement = 0, sand = 0, gravel = 0, bricks = 0;

    if (a > 0) {
      if (type === 'estrutura') {
        cement = Math.ceil(a * 0.4 + c * 1.5);
        sand = parseFloat((a * 0.08 + c * 0.2).toFixed(1));
        gravel = parseFloat((a * 0.05 + c * 0.1).toFixed(1));
        bricks = Math.ceil((a * 25) * (1 + c * 0.08));
      } else if (type === 'reboco') {
        cement = Math.ceil(a * 0.25);
        sand = parseFloat((a * 0.05).toFixed(1));
        gravel = 0;
        bricks = 0;
      } else if (type === 'contrapiso') {
        cement = Math.ceil(a * 0.35);
        sand = parseFloat((a * 0.07).toFixed(1));
        gravel = parseFloat((a * 0.06).toFixed(1));
        bricks = 0;
      }
    }
    return { cement, sand, gravel, bricks };
  };

  const results = (parseFloat(area) || 0) > 0 ? calculate() : null;

  const handleAddAll = () => {
    if (!results) return;
    if (results.cement > 0) addToCart(1, results.cement);
    if (results.bricks > 0) addToCart(6, results.bricks);
    showToast('Cimento e Tijolos estimados adicionados ao seu orçamento!');
  };

  return (
    <section className="simulator-section" id="simulator">
      <div className="container">
        <div className="section-header">
          <h2>Simulador de Materiais</h2>
          <div className="divider"></div>
          <p>Calcule a quantidade estimada de materiais para sua obra.</p>
        </div>
        <div className="simulator-card">
          <div className="simulator-grid">
            <div className="simulator-form">
              <div className="sim-input-group">
                <label>Área Total (m²)</label>
                <input
                  type="number"
                  className="sim-input"
                  placeholder="Ex: 100"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                />
              </div>
              <div className="sim-input-group">
                <label>Quantidade de Cômodos</label>
                <input
                  type="number"
                  className="sim-input"
                  placeholder="Ex: 5"
                  value={rooms}
                  onChange={e => setRooms(e.target.value)}
                />
              </div>
              <div className="sim-input-group">
                <label>Tipo de Obra</label>
                <select className="sim-input" value={type} onChange={e => setType(e.target.value)}>
                  <option value="estrutura">Estrutura / Alvenaria</option>
                  <option value="reboco">Reboco</option>
                  <option value="contrapiso">Contrapiso</option>
                </select>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAddAll} disabled={!results}>
                <Calculator size={18} /> Adicionar ao Orçamento
              </button>
            </div>
            <div className="simulator-results">
              {results ? (
                <>
                  <h3 className="sim-results-title">Materiais Estimados</h3>
                  <div className="sim-results-list">
                    <div className="sim-result-item">
                      <span className="sim-item-name">Cimento (sacos 50kg)</span>
                      <span className="sim-item-qty">{results.cement} sacos</span>
                    </div>
                    <div className="sim-result-item">
                      <span className="sim-item-name">Areia (m³)</span>
                      <span className="sim-item-qty">{results.sand} m³</span>
                    </div>
                    <div className="sim-result-item">
                      <span className="sim-item-name">Brita (m³)</span>
                      <span className="sim-item-qty">{results.gravel} m³</span>
                    </div>
                    <div className="sim-result-item">
                      <span className="sim-item-name">Tijolos (peças)</span>
                      <span className="sim-item-qty">{results.bricks} peças</span>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={handleAddAll}>
                    <ShoppingCart size={18} /> Adicionar Cimento e Tijolos ao Orçamento
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-sec)', padding: '40px 0' }}>
                  <Calculator size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                  <p>Preencha os campos ao lado para ver a estimativa de materiais.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
