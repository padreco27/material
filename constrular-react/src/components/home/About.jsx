import { Award, Users, Truck, LayoutGrid, Building2 } from 'lucide-react';
import './About.css';

const cards = [
  { Icon: Award,    title: '+15 Anos de Experiência',     desc: 'Fornecendo materiais de confiança para o mercado da construção civil.' },
  { Icon: Users,    title: 'Atendimento Especializado',    desc: 'Nossa equipe técnica ajuda você a calcular e escolher as melhores soluções.' },
  { Icon: Truck,    title: 'Entregas Rápidas',             desc: 'Frota própria que garante o material no canteiro no prazo acordado.' },
  { Icon: LayoutGrid, title: 'Grande Variedade',           desc: 'Mais de 5.000 itens cadastrados, do cimento às ferramentas de precisão.' },
  { Icon: Building2, title: 'Atendimento PF & PJ',         desc: 'Condições especiais para construtoras, empreiteiros e autônomos.' },
];

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="container">
        <div className="section-header">
          <h2>Sobre a Constrular</h2>
          <div className="divider" />
          <p>Mais que vender materiais, entregamos soluções sólidas para realizar os seus projetos de vida.</p>
        </div>

        <div className="about-grid">
          {cards.map(({ Icon, title, desc }) => (
            <div className="about-card" key={title}>
              <div className="about-icon"><Icon size={26} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
