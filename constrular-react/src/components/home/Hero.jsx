import { FileText, MessageCircle, Eye } from 'lucide-react';
import './Hero.css';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="badge-tag">Qualidade Garantida</span>
          <h1>
            Tudo para sua obra{' '}
            <span className="hero-gradient">em um só lugar</span>
          </h1>
          <p>
            Qualidade, economia e entrega rápida para sua construção.
            Encontre os melhores materiais das principais marcas do mercado.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => scrollTo('orcamento')}>
              <FileText size={18} /> Solicitar Orçamento
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('produtos')}>
              <Eye size={18} /> Ver Produtos
            </button>
            <a
              href="https://wa.me/5511999999999?text=Olá, gostaria de solicitar um orçamento."
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle size={18} /> Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img src="/hero_construction.png" alt="Obra residencial moderna em andamento" />
        </div>
      </div>
    </section>
  );
}
