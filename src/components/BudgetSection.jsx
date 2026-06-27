import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { ShoppingCart, Trash2, MessageCircle, Minus, Plus, ClipboardList } from 'lucide-react';
import { formatCurrency, buildWhatsAppUrl } from '../utils.js';

export default function BudgetSection() {
  const { cart, getProduct, removeFromCart, changeCartQty, updateCartInput, cartTotal, setCart } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let text = `*NOVA SOLICITAÇÃO DE ORÇAMENTO - CONSTRULAR*\n\n`;
    text += `*Cliente:* ${form.name}\n*Telefone:* ${form.phone}\n*E-mail:* ${form.email}\n*Cidade/UF:* ${form.city}\n`;
    if (form.message) text += `*Observações:* ${form.message}\n`;
    text += `\n*PRODUTOS SOLICITADOS:*\n`;

    let total = 0;
    cart.forEach((item, i) => {
      const p = getProduct(item.id);
      if (p) {
        const val = p.price * item.quantity;
        total += val;
        text += `${i + 1}. [${p.code}] ${p.name}\n   Qtd: ${item.quantity} | Unit: ${formatCurrency(p.price)} | Total: ${formatCurrency(val)}\n`;
      }
    });

    text += `\n*VALOR ESTIMADO:* ${formatCurrency(total)}\n`;
    text += `_Gerado automaticamente pelo Catálogo Digital Constrular._`;

    window.open(buildWhatsAppUrl(text), '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    document.getElementById('customerBudgetForm')?.reset();
    setCart([]);
    setForm({ name: '', phone: '', email: '', city: '', message: '' });
  };

  return (
    <section className="budget-form-section" id="budget">
      <div className="container">
        <div className="section-header">
          <h2>Orçamento</h2>
          <div className="divider"></div>
          <p>Revise seus itens e solicite um orçamento personalizado.</p>
        </div>

        {sent ? (
          <div className="budget-list-card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 30 }}>✓</div>
            <h3 style={{ marginBottom: 12, color: 'var(--primary)' }}>Sucesso!</h3>
            <p style={{ color: 'var(--text-sec)', lineHeight: 1.5 }}>Orçamento enviado! Nosso time comercial abrirá sua conversa no WhatsApp para finalizar a cotação e frete.</p>
          </div>
        ) : (
          <div className="budget-grid">
            <div className="budget-list-card">
              <h3 style={{ marginBottom: 20 }}>Itens Selecionados</h3>
              {cart.length === 0 ? (
                <div className="budget-empty-state">
                  <ClipboardList size={48} style={{ marginBottom: 16, color: 'var(--border)' }} />
                  <p>Nenhum item adicionado ainda.</p>
                  <p style={{ fontSize: 13, marginTop: 8, color: 'var(--text-sec)' }}>Navegue pelo catálogo e adicione produtos ao orçamento.</p>
                </div>
              ) : (
                <>
                  <div className="budget-items-container">
                    {cart.map(item => {
                      const p = getProduct(item.id);
                      if (!p) return null;
                      return (
                        <div className="budget-item" key={item.id}>
                          <img src={p.images[0]} alt={p.name} className="budget-item-img" />
                          <div className="budget-item-info">
                            <div className="budget-item-title">{p.name}</div>
                            <div className="budget-item-code">Código: {p.code} | Marca: {p.brand}</div>
                            <div className="budget-item-price">{formatCurrency(p.price)} x {item.quantity} = <strong>{formatCurrency(p.price * item.quantity)}</strong></div>
                          </div>
                          <div className="budget-qty-controls">
                            <button className="qty-btn" onClick={() => changeCartQty(item.id, -1)}><Minus size={14} /></button>
                            <input
                              className="qty-input"
                              type="text"
                              value={item.quantity}
                              onChange={e => updateCartInput(item.id, e.target.value)}
                            />
                            <button className="qty-btn" onClick={() => changeCartQty(item.id, 1)}><Plus size={14} /></button>
                          </div>
                          <button className="budget-item-remove" onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="budget-summary">
                    <span>Total Estimado</span>
                    <span className="budget-summary-val">{formatCurrency(cartTotal)}</span>
                  </div>
                </>
              )}
            </div>
            <div className="budget-form-card">
              <h3>Dados para Orçamento</h3>
              <form id="customerBudgetForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nome</label>
                  <input className="form-control" name="name" placeholder="Seu nome" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input className="form-control" name="phone" placeholder="(11) 99999-9999" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input className="form-control" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Cidade / UF</label>
                  <input className="form-control" name="city" placeholder="Sua cidade" value={form.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Mensagem / Observações</label>
                  <textarea className="form-control" name="message" rows={3} placeholder="Observações..." value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={cart.length === 0}>
                  <MessageCircle size={18} /> Enviar Orçamento via WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
