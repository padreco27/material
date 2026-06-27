import { useState } from 'react';
import { Check, User, Briefcase, Phone, Mail } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils.js';

const benefits = [
  { title: 'Descontos Exclusivos', desc: 'Preços especiais em todos os produtos para profissionais cadastrados.' },
  { title: 'Atendimento Prioritário', desc: 'Linha direta com nossa equipe comercial para pedidos e suporte.' },
  { title: 'Condições Especiais de Pagamento', desc: 'Prazos estendidos e condições diferenciadas para sua empresa.' },
  { title: 'Entrega Programada', desc: 'Agende suas retiradas e entregas conforme o cronograma da obra.' },
];

export default function ProfessionalsSection() {
  const [form, setForm] = useState({ name: '', role: '', phone: '', email: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*SOLICITAÇÃO DE PARCERIA PROFISSIONAL - CONSTRULAR*\n\n*Nome:* ${form.name}\n*Cargo/Profissão:* ${form.role.toUpperCase()}\n*Telefone:* ${form.phone}\n*E-mail:* ${form.email}\n\nOlá, gostaria de solicitar meu cadastro de parceiro para obter descontos comerciais especiais.`;
    window.open(buildWhatsAppUrl(text), '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', role: '', phone: '', email: '' });
  };

  return (
    <section className="professionals" id="professionals">
      <div className="container">
        <div className="section-header">
          <h2>Área do Profissional</h2>
          <div className="divider"></div>
          <p>Faça parte da nossa rede de profissionais parceiros e tenha vantagens exclusivas.</p>
        </div>
        <div className="pro-banner">
          <div className="pro-grid">
            <div className="pro-content">
              <h3 style={{ fontSize: 28 }}>Vantagens para Profissionais</h3>
              <div className="pro-benefits-list">
                {benefits.map((b, i) => (
                  <div className="pro-benefit-item" key={i}>
                    <div className="pro-benefit-icon"><Check size={14} /></div>
                    <div className="pro-benefit-text">
                      <h4>{b.title}</h4>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form className="pro-form" onSubmit={handleSubmit}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: 30 }}>✓</div>
                  <h3>Cadastro Enviado!</h3>
                  <p style={{ color: 'var(--text-sec)' }}>Entraremos em contato com sua tabela de descontos em breve.</p>
                </div>
              ) : (
                <>
                  <h3>Cadastre-se</h3>
                  <div className="form-group">
                    <label>Nome Completo</label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sec)' }} />
                      <input className="form-control" name="name" placeholder="Seu nome" value={form.name} onChange={handleChange} required style={{ paddingLeft: 40 }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Profissão / Área</label>
                    <div style={{ position: 'relative' }}>
                      <Briefcase size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sec)' }} />
                      <input className="form-control" name="role" placeholder="Ex: Pedreiro, Arquiteto" value={form.role} onChange={handleChange} required style={{ paddingLeft: 40 }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Telefone</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sec)' }} />
                      <input className="form-control" name="phone" placeholder="(11) 99999-9999" value={form.phone} onChange={handleChange} required style={{ paddingLeft: 40 }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>E-mail</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sec)' }} />
                      <input className="form-control" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required style={{ paddingLeft: 40 }} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Enviar Cadastro via WhatsApp
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
