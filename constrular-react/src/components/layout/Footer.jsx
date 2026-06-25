import { MapPin, Phone, MessageSquare, Mail, Clock, Facebook, Instagram, Youtube, Linkedin, Download } from 'lucide-react';
import './Footer.css';

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="logo-wrap">
            <div className="footer-logo-icon">C</div>
            <span className="logo-text">Constru<em>lar</em></span>
          </div>
          <p>A Constrular oferece soluções completas e materiais de altíssima qualidade para todas as etapas da sua construção civil ou reforma residencial.</p>
          <div className="social-links">
            <a href="#" className="social-btn" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" className="social-btn" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" className="social-btn" aria-label="YouTube"><Youtube size={16} /></a>
            <a href="#" className="social-btn" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>

        {/* Nav Links */}
        <div className="footer-col">
          <h4>Navegação</h4>
          {['home','sobre','produtos','promocoes','simulador','profissional','orcamento'].map(id => (
            <span key={id} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1).replace('orcamento','Orçamento').replace('profissional','Profissionais').replace('sobre','Sobre Nós').replace('promocoes','Promoções').replace('simulador','Simulador').replace('produtos','Produtos').replace('home','Início')}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Atendimento</h4>
          <div className="contact-item"><MapPin size={15} /><span>Av. da Construção, 1500 — Distrito Industrial<br />São Paulo - SP, CEP 01234-567</span></div>
          <div className="contact-item"><Phone size={15} /><span>(11) 4004-9876</span></div>
          <div className="contact-item"><MessageSquare size={15} /><span>(11) 99999-9999 (WhatsApp)</span></div>
          <div className="contact-item"><Mail size={15} /><span>contato@constrularmateriais.com.br</span></div>
          <div className="contact-item"><Clock size={15} /><span>Seg–Sex: 07:00 às 18:00<br />Sábados: 08:00 às 14:00</span></div>
        </div>

        {/* Map + QR */}
        <div className="footer-col">
          <h4>Localização & Recursos</h4>
          <div className="map-qr">
            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.489!2d-46.654!3d-23.551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f943179a97e72!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1"
                title="Mapa Constrular"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="qr-box">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://wa.me/5511999999999"
                alt="QR Code WhatsApp"
              />
              <span>Orçamento rápido</span>
            </div>
          </div>
          <button className="btn btn-outline footer-pdf" onClick={() => window.print()}>
            <Download size={16} /> Baixar Catálogo PDF
          </button>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; 2026 Constrular Materiais de Construção. Todos os direitos reservados.</p>
        <p>CNPJ: 12.345.678/0001-99</p>
      </div>
    </footer>
  );
}
