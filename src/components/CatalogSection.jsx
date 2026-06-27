import { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Search, Heart, GitCompare, Grid3X3, List, ShoppingCart, MessageCircle, SlidersHorizontal, X } from 'lucide-react';
import { formatCurrency, categoryLabels, isPromoProduct } from '../utils.js';
import StarRating from './StarRating.jsx';

export default function CatalogSection() {
  const {
    products, filters, setFilters, filteredProducts, categoryCounts,
    layoutMode, setLayoutMode, favorites, toggleFavorite, compareList, toggleCompare,
    addToCart, setProductModalId, brands,
  } = useApp();

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);
  const searchRef = useRef(null);

  const list = filteredProducts;

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 0) {
        const s = value.toLowerCase();
        const matches = products.filter(p =>
          p.name.toLowerCase().includes(s) ||
          p.code.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s)
        ).slice(0, 6);
        setSuggestions(matches);
        setShowSuggestions(matches.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleCategoryChange = (cat) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };

  const handleBrandCheck = (brand) => {
    setFilters(prev => {
      const checked = prev.checkedBrands.includes(brand)
        ? prev.checkedBrands.filter(b => b !== brand)
        : [...prev.checkedBrands, brand];
      return { ...prev, checkedBrands: checked };
    });
  };

  const handleCategoryClick = (cat) => {
    handleCategoryChange(cat);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <div className="section-header">
          <h2>Catálogo de Produtos</h2>
          <div className="divider"></div>
          <p>Encontre tudo que você precisa para sua obra.</p>
        </div>

        <div className="search-filter-panel">
          <div className="search-row" ref={searchRef}>
            <div className="search-input-wrapper">
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-sec)' }} />
              <input
                className="search-input"
                type="text"
                placeholder="Buscar por nome, código, categoria ou marca..."
                value={filters.search}
                onChange={e => handleSearch(e.target.value)}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              />
              {filters.search && (
                <button
                  onClick={() => { setFilters(prev => ({ ...prev, search: '' })); setSuggestions([]); setShowSuggestions(false); }}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', cursor: 'pointer', color: 'var(--text-sec)' }}
                >
                  <X size={16} />
                </button>
              )}
              <div className="search-suggestions" style={{ display: showSuggestions ? 'block' : 'none' }}>
                {suggestions.map(p => (
                  <div key={p.id} className="suggestion-item" onClick={() => { setProductModalId(p.id); setShowSuggestions(false); }}>
                    <span className="suggestion-name">{p.name}</span>
                    <span className="suggestion-category">{categoryLabels[p.category] || p.category}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn btn-outline"
              style={{ padding: '0 16px', display: 'none' }}
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <span className="filter-label">Categoria</span>
              <select
                className="filter-select"
                value={filters.category}
                onChange={e => handleCategoryChange(e.target.value)}
              >
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Marca</span>
              <select
                className="filter-select"
                value={filters.checkedBrands.length === 1 ? filters.checkedBrands[0] : (filters.brand === 'todos' ? 'todos' : filters.brand)}
                onChange={e => {
                  const val = e.target.value;
                  if (val === 'todos') {
                    setFilters(prev => ({ ...prev, brand: 'todos', checkedBrands: [] }));
                  } else {
                    setFilters(prev => ({ ...prev, brand: val, checkedBrands: [val] }));
                  }
                }}
              >
                <option value="todos">Todas</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <span className="filter-label">Preço Máximo</span>
              <div className="range-slider-wrapper">
                <span>R$ {filters.maxPrice.toFixed(0)}</span>
                <input
                  type="range"
                  className="price-slider"
                  min={0}
                  max={600}
                  value={filters.maxPrice}
                  onChange={e => setFilters(prev => ({ ...prev, maxPrice: parseFloat(e.target.value) }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <div className="sidebar-widget">
              <h4 className="widget-title">Categorias</h4>
              <div className="category-list">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <div
                    key={key}
                    className={`category-item ${filters.category === key ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(key)}
                  >
                    <span>{label}</span>
                    <span className="category-count">{categoryCounts[key] || 0}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h4 className="widget-title">Marcas</h4>
              <div className="brand-checkbox-list">
                {brands.map(b => (
                  <label key={b} className="brand-checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.checkedBrands.includes(b)}
                      onChange={() => handleBrandCheck(b)}
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="products-wrapper">
            <div className="catalog-toolbar">
              <span className="results-count">{list.length} produto{list.length !== 1 ? 's' : ''} encontrado{list.length !== 1 ? 's' : ''}</span>
              <div className="toolbar-controls">
                <select
                  className="sort-select"
                  value={filters.sort}
                  onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                >
                  <option value="default">Padrão</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">A-Z</option>
                </select>
                <div className="layout-toggles">
                  <button
                    className={`layout-toggle-btn ${layoutMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setLayoutMode('grid')}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    className={`layout-toggle-btn ${layoutMode === 'list' ? 'active' : ''}`}
                    onClick={() => setLayoutMode('list')}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`products-grid ${layoutMode === 'list' ? 'list-view' : ''}`}>
              {list.length === 0 ? (
                <div className="empty-products">
                  <Search size={48} style={{ marginBottom: 16 }} />
                  <p>Nenhum produto encontrado</p>
                  <p style={{ fontSize: 13, color: 'var(--text-sec)' }}>Tente alterar os filtros ou buscar por outro termo.</p>
                </div>
              ) : (
                list.map(product => {
                  const isFav = favorites.includes(product.id);
                  const isComp = compareList.includes(product.id);
                  const hasPromo = isPromoProduct(product.id);
                  const oldPrice = hasPromo ? product.price * 1.25 : null;
                  return (
                    <div className="product-card" key={product.id}>
                      <div className="product-card-image" onClick={() => setProductModalId(product.id)}>
                        <img src={product.images[0]} alt={product.name} loading="lazy" />
                        <div className="product-badges">
                          {hasPromo && <span className="badge-item badge-promo">Oferta</span>}
                          {product.availability
                            ? <span className="badge-item badge-availability">Estoque</span>
                            : <span className="badge-item badge-out-stock">Sob Consulta</span>
                          }
                        </div>
                        <button
                          className={`product-wishlist-btn ${isFav ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                        >
                          <Heart size={16} fill={isFav ? 'var(--danger)' : 'none'} />
                        </button>
                        <button
                          className={`product-compare-btn ${isComp ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }}
                        >
                          <GitCompare size={16} />
                        </button>
                      </div>
                      <div className="product-card-body">
                        <div className="product-brand-code">
                          <span>{product.brand}</span>
                          <span>{product.code}</span>
                        </div>
                        <div className="product-title" onClick={() => setProductModalId(product.id)}>
                          {product.name}
                        </div>
                        <div className="product-rating">
                          <StarRating rating={product.rating} />
                          <span>({product.reviewsCount})</span>
                        </div>
                        <div className="product-price-wrapper">
                          {oldPrice && <span className="product-old-price">{formatCurrency(oldPrice)}</span>}
                          <span className="product-price">{formatCurrency(product.price)}</span>
                          <span className="product-unit">/ {product.unit}</span>
                        </div>
                      </div>
                      <div className="product-card-actions">
                        <button className="btn-card-budget" onClick={() => addToCart(product.id, 1)}>
                          <ShoppingCart size={14} /> Orçar
                        </button>
                        <a
                          href={`https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20em:%20${encodeURIComponent(product.name)}%20(Cód:${product.code})`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-whatsapp"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
