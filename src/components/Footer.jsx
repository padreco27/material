import { MapPin, Phone, Mail, Clock, FileText } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <div className="logo-text">Constrular<span>.</span></div>
            <p className="footer-desc">
              Sua loja de materiais de construção com os melhores preços, marcas e atendimento
              especializado. Construindo confiança há mais de 20 anos.
            </p>
            <div className="social-links">
              <button className="social-btn" aria-label="Instagram" onClick={() => window.open('#', '_blank')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </button>
              <button className="social-btn" aria-label="Facebook" onClick={() => window.open('#', '_blank')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </button>
              <button className="social-btn" aria-label="YouTube" onClick={() => window.open('#', '_blank')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </button>
            </div>
          </div>

          <div className="footer-col">
            <h4>Links Rápidos</h4>
            <div className="footer-links">
              <a onClick={() => scrollTo('hero')}>Início</a>
              <a onClick={() => scrollTo('about')}>Sobre Nós</a>
              <a onClick={() => scrollTo('catalog')}>Produtos</a>
              <a onClick={() => scrollTo('promo')}>Promoções</a>
              <a onClick={() => scrollTo('simulator')}>Simulador</a>
              <a onClick={() => scrollTo('professionals')}>Profissionais</a>
              <a onClick={() => scrollTo('budget')}>Orçamento</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Rua das Construções, 123 - Centro, São Paulo - SP</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>(11) 99999-9999</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>contato@constrular.com.br</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={16} />
              <span>Seg-Sex: 7h-18h | Sáb: 7h-12h</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Localização</h4>
            <div className="footer-map-qr">
              <div className="footer-map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197491294249!2d-46.6574471!3d-23.5613988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8f0e5b5d1%3A0x8f8b8f8b8f8b8f8b!2sS%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1"
                  title="Localização"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="footer-qr-wrapper">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://constrular.com.br"
                  alt="QR Code"
                  className="footer-qr-img"
                />
                <span className="footer-qr-lbl">Acesse o Catálogo</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button className="btn btn-outline" onClick={handlePrint} style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}>
            <FileText size={16} /> Baixar Catálogo em PDF
          </button>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Constrular Materiais de Construção. Todos os direitos reservados.</span>
          <span>CNPJ: 00.000.000/0001-00</span>
        </div>
      </div>
    </footer>
  );
}
