import { useState } from 'react';
import { Calculator, ShoppingCart } from 'lucide-react';
import { useMaterialSimulator } from '../../hooks/useMaterialSimulator';
import { useApp } from '../../context/AppContext';
import './Simulator.css';

export default function Simulator() {
  const [area, setArea] = useState(50);
  const [rooms, setRooms] = useState(3);
  const [type, setType] = useState('estrutura');
  const { addToCart, showToast } = useApp();
  const results = useMaterialSimulator(area, rooms, type);

  const handleAddAll = () => {
    if (!area || area <= 0) { showToast('Informe uma área válida.'); return; }
    if (results.cement > 0) addToCart(1, results.cement);
    if (results.bricks > 0) addToCart(6, results.bricks);
    showToast('Estimativa adicionada ao orçamento!');
  };

  return (
    <section className="simulator-section" id="simulador">
      <div className="container">
        <div className="section-header">
          <h2>Simulador de Materiais</h2>
          <div className="divider" />
          <p>Informe os dados da sua obra e receba uma estimativa rápida dos materiais essenciais.</p>
        </div>

        <div className="sim-card">
          <div className="sim-grid">
            {/* Inputs */}
            <div className="sim-form">
              <div className="sim-field">
                <label>Área Total da Construção (m²)</label>
                <input type="number" min="1" value={area} onChange={e => setArea(e.target.value)} className="form-control" placeholder="Ex: 80" />
              </div>
              <div className="sim-field">
                <label>Quantidade de Cômodos</label>
                <input type="number" min="1" value={rooms} onChange={e => setRooms(e.target.value)} className="form-control" placeholder="Ex: 4" />
              </div>
              <div className="sim-field">
                <label>Tipo Principal de Obra</label>
                <select value={type} onChange={e => setType(e.target.value)} className="form-control">
                  <option value="estrutura">Alvenaria Estrutural (Fundações e Paredes)</option>
                  <option value="reboco">Reboco e Emboço (Revestimento de Paredes)</option>
                  <option value="contrapiso">Contrapiso (Nivelamento de Lajes/Chão)</option>
                </select>
              </div>
              <p className="sim-disclaimer">* Estimativas baseadas em tabelas padrão de consumo. Recomendamos validação com engenheiro ou mestre de obras.</p>
            </div>

            {/* Results */}
            <div className="sim-results">
              <h3 className="sim-results-title"><Calculator size={20} /> Estimativa Calculada</h3>
              <div className="sim-list">
                {[
                  { label: 'Cimento CP II (sacos 50kg)', val: `${results.cement} sacos` },
                  { label: 'Areia Média / Fina',         val: `${results.sand} m³` },
                  { label: 'Brita nº 1',                 val: `${results.gravel} m³` },
                  { label: 'Tijolos Baianos 8 furos',    val: `${results.bricks} peças` },
                ].map(({ label, val }) => (
                  <div className="sim-row" key={label}>
                    <span>{label}</span>
                    <span className="sim-val">{val}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary sim-add-btn" onClick={handleAddAll}>
                <ShoppingCart size={16} /> Adicionar Estimativa ao Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
