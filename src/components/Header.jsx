import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Moon, Sun, Heart, ShoppingCart, GitCompare } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme, favorites, compareList, cartItemCount, toggleDrawer, setCompareOpen } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre', id: 'about' },
    { label: 'Produtos', id: 'catalog' },
    { label: 'Promoções', id: 'promo' },
    { label: 'Simulador', id: 'simulator' },
    { label: 'Orçamento', id: 'budget' },
  ];

  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container header-container">
        <div className="logo-wrapper">
          <div className="logo-icon">C</div>
          <div className="logo-text">Constrular<span>.</span></div>
        </div>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <span key={item.id} className="nav-link" onClick={() => handleNav(item.id)}>
              {item.label}
            </span>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="action-btn" onClick={toggleTheme} title="Alternar tema">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="action-btn favorite-btn" onClick={toggleDrawer} title="Favoritos">
            <Heart size={18} />
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </button>

          <button className="action-btn" onClick={() => setCompareOpen(prev => !prev)} title="Comparar">
            <GitCompare size={18} />
            {compareList.length > 0 && <span className="badge">{compareList.length}</span>}
          </button>

          <button className="action-btn" onClick={() => handleNav('budget')} title="Orçamento">
            <ShoppingCart size={18} />
            {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
          </button>

          <div className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
