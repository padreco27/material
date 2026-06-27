import { ArrowRight, ShoppingCart, MessageCircle } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="badge-tag">Construindo Confiança</span>
            <h1>
              Materiais de Construção com <span>Preço Justo</span> e Entrega Rápida
            </h1>
            <p>
              A Constrular é referência em qualidade e variedade. Do cimento ao acabamento,
              temos tudo que sua obra precisa com os melhores preços da região.
            </p>
            <div className="hero-btns">
              <button className="btn btn-primary" onClick={() => scrollTo('budget')}>
                Solicitar Orçamento <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary" onClick={() => scrollTo('catalog')}>
                Ver Produtos <ShoppingCart size={18} />
              </button>
              <a
                href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20mais%20informações."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Fale Conosco <MessageCircle size={18} />
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop"
              alt="Materiais de Construção"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
