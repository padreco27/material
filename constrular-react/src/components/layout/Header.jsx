import { ShoppingCart, Heart, Columns2, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Header.css';

const navItems = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'promocoes', label: 'Promoções' },
  { id: 'simulador', label: 'Simulador' },
  { id: 'profissional', label: 'Profissionais' },
  { id: 'orcamento', label: 'Orçamento' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header() {
  const { theme, toggleTheme, cart, favorites, compareList, toggleFavDrawer, openCompareModal } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = cart.reduce((a, i) => a + i.quantity, 0);

  return (
    <header className="header">
      <div className="container header-inner">
        {/* Logo */}
        <div className="logo-wrap">
          <div className="logo-icon">C</div>
          <span className="logo-text">Constru<em>lar</em></span>
        </div>

        {/* Desktop Nav */}
        <nav className={`nav-links${mobileOpen ? ' open' : ''}`}>
          {navItems.map(({ id, label }) => (
            <span
              key={id}
              className="nav-link"
              onClick={() => { scrollTo(id); setMobileOpen(false); }}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Alternar tema">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="icon-btn fav-btn" onClick={toggleFavDrawer} title="Favoritos">
            <Heart size={18} />
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </button>

          <button className="icon-btn" onClick={openCompareModal} title="Comparar">
            <Columns2 size={18} />
            {compareList.length > 0 && <span className="badge">{compareList.length}</span>}
          </button>

          <button className="icon-btn" onClick={() => scrollTo('orcamento')} title="Orçamento">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          <button className="icon-btn mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
