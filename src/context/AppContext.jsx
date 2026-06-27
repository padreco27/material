import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import products from '../data/products.js';

const AppContext = createContext();

function loadLocal(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch { return fallback; }
}

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => loadLocal('constrular_cart', []));
  const [favorites, setFavorites] = useState(() => loadLocal('constrular_favorites', []));
  const [compareList, setCompareList] = useState(() => loadLocal('constrular_compare', []));
  const [theme, setTheme] = useState(() => loadLocal('constrular_theme', 'light'));
  const [toast, setToast] = useState(null);
  const [layoutMode, setLayoutMode] = useState('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [productModalId, setProductModalId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'todos',
    brand: 'todos',
    maxPrice: 600,
    sort: 'default',
    checkedBrands: [],
  });
  const toastTimer = useRef(null);

  useEffect(() => { localStorage.setItem('constrular_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('constrular_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('constrular_compare', JSON.stringify(compareList)); }, [compareList]);
  useEffect(() => {
    localStorage.setItem('constrular_theme', theme);
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!loadLocal('constrular_theme', null) && prefersDark) {
      setTheme('dark');
    }
  }, []);

  const getProduct = useCallback((id) => products.find(p => p.id === id), []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const toggleCompare = useCallback((id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(c => c !== id);
      if (prev.length >= 3) {
        showToast('Você pode comparar no máximo 3 produtos ao mesmo tempo.');
        return prev;
      }
      return [...prev, id];
    });
  }, [showToast]);

  const addToCart = useCallback((id, qty) => {
    const product = getProduct(id);
    if (!product) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { id, quantity: qty }];
    });
    showToast(`${product.name} adicionado ao orçamento!`);
  }, [getProduct, showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Item removido do orçamento.');
  }, [showToast]);

  const changeCartQty = useCallback((id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newQty = item.quantity + change;
      if (newQty < 1) return item;
      return { ...item, quantity: newQty };
    }));
  }, []);

  const updateCartInput = useCallback((id, val) => {
    const intVal = parseInt(val);
    if (isNaN(intVal) || intVal <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: intVal } : item));
  }, [removeFromCart]);

  const toggleDrawer = useCallback(() => setDrawerOpen(prev => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const closeComparePanel = useCallback(() => setCompareOpen(false), []);

  const openCompareModal = useCallback(() => {
    if (compareList.length < 2) {
      showToast('Selecione pelo menos 2 produtos para comparar.');
      return;
    }
    setCompareModalOpen(true);
  }, [compareList.length, showToast]);

  const setCategoryFilter = useCallback((cat) => {
    setFilters(prev => ({ ...prev, category: cat }));
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    const s = filters.search.toLowerCase();
    if (s) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.code.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s)
      );
    }
    if (filters.category !== 'todos') list = list.filter(p => p.category === filters.category);
    if (filters.checkedBrands.length > 0) {
      list = list.filter(p => filters.checkedBrands.includes(p.brand));
    } else if (filters.brand !== 'todos') {
      list = list.filter(p => p.brand === filters.brand);
    }
    list = list.filter(p => p.price <= filters.maxPrice);
    if (filters.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filters]);

  const categoryCounts = useMemo(() => {
    const cats = ['cimento-e-argamassas', 'estrutural', 'ferragens', 'hidraulica', 'elétrica', 'acabamento', 'ferramentas'];
    const counts = { todos: products.length };
    cats.forEach(cat => { counts[cat] = products.filter(p => p.category === cat).length; });
    return counts;
  }, []);

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))].sort(), []);

  const cartTotal = useMemo(() =>
    cart.reduce((sum, item) => {
      const p = getProduct(item.id);
      return p ? sum + p.price * item.quantity : sum;
    }, 0),
  [cart, getProduct]);

  const cartItemCount = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
  [cart]);

  const value = useMemo(() => ({
    products, cart, favorites, compareList, theme, toast, layoutMode,
    drawerOpen, compareOpen, compareModalOpen, productModalId, filters,
    brands, cartTotal, cartItemCount, categoryCounts,
    getProduct, showToast, toggleTheme, toggleFavorite, toggleCompare,
    addToCart, removeFromCart, changeCartQty, updateCartInput, setCart,
    toggleDrawer, closeDrawer, closeComparePanel, openCompareModal,
    setCompareOpen, setCompareModalOpen, setProductModalId,
    setLayoutMode, setFilters, setCategoryFilter,
    filteredProducts,
  }), [
    products, cart, favorites, compareList, theme, toast, layoutMode,
    drawerOpen, compareOpen, compareModalOpen, productModalId, filters,
    brands, cartTotal, cartItemCount, categoryCounts,
    getProduct, showToast, toggleTheme, toggleFavorite, toggleCompare,
    addToCart, removeFromCart, changeCartQty, updateCartInput, setCart,
    toggleDrawer, closeDrawer, closeComparePanel, openCompareModal,
    filteredProducts,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
