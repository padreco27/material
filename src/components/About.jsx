import { Clock, Headphones, Truck, Layers, Building2 } from 'lucide-react';

const cards = [
  {
    icon: <Clock size={24} />,
    title: 'Anos de Experiência',
    desc: 'Mais de 20 anos no mercado de materiais de construção, entregando qualidade e confiança em cada projeto.',
  },
  {
    icon: <Headphones size={24} />,
    title: 'Atendimento Especializado',
    desc: 'Equipe técnica preparada para orientar na escolha dos melhores materiais para sua obra.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Entregas Rápidas',
    desc: 'Frota própria para garantir que seus materiais cheguem no prazo, sem atrasos.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Grande Variedade',
    desc: 'Mais de 500 produtos das melhores marcas, desde fundação até acabamento.',
  },
  {
    icon: <Building2 size={24} />,
    title: 'PF & PJ',
    desc: 'Atendemos tanto consumidores finais quanto empresas, com condições especiais para cada perfil.',
  },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <h2>Por que escolher a Constrular?</h2>
          <div className="divider"></div>
          <p>Somos referência no segmento de materiais de construção. Conheça nossas principais vantagens.</p>
        </div>
        <div className="about-grid">
          {cards.map((card, i) => (
            <div className="about-card" key={i}>
              <div className="about-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
