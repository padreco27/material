import { createContext, useContext, useCallback, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── Tema ──────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useLocalStorage('constrular_theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  // ── Carrinho de Orçamento ─────────────────────────────────────────────────
  const [cart, setCart] = useLocalStorage('constrular_cart', []);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { id, quantity: qty }];
    });
    showToast('Produto adicionado ao orçamento!');
  }, [setCart]);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, [setCart]);

  const changeQty = useCallback((id, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: newQty } : i));
    }
  }, [setCart]);

  const clearCart = useCallback(() => setCart([]), [setCart]);

  // ── Favoritos ─────────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useLocalStorage('constrular_favorites', []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, [setFavorites]);

  // ── Comparação ────────────────────────────────────────────────────────────
  const [compareList, setCompareList] = useLocalStorage('constrular_compare', []);

  const toggleCompare = useCallback((id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 3) {
        showToast('Máximo de 3 produtos para comparar.');
        return prev;
      }
      return [...prev, id];
    });
  }, [setCompareList]);

  const clearCompare = useCallback(() => setCompareList([]), [setCompareList]);

  // ── Modal do Produto ──────────────────────────────────────────────────────
  const [modalProductId, setModalProductId] = useState(null);

  const openModal = useCallback((id) => setModalProductId(id), []);
  const closeModal = useCallback(() => setModalProductId(null), []);

  // ── Drawer de Favoritos ───────────────────────────────────────────────────
  const [favDrawerOpen, setFavDrawerOpen] = useState(false);
  const toggleFavDrawer = useCallback(() => setFavDrawerOpen((v) => !v), []);

  // ── Modal de Comparação ───────────────────────────────────────────────────
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const openCompareModal = useCallback(() => {
    if (compareList.length < 2) {
      showToast('Selecione pelo menos 2 produtos para comparar.');
      return;
    }
    setCompareModalOpen(true);
  }, [compareList]);
  const closeCompareModal = useCallback(() => setCompareModalOpen(false), []);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // ── Totais calculados ─────────────────────────────────────────────────────
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      cart, addToCart, removeFromCart, changeQty, clearCart, cartCount,
      favorites, toggleFavorite,
      compareList, toggleCompare, clearCompare,
      modalProductId, openModal, closeModal,
      favDrawerOpen, toggleFavDrawer,
      compareModalOpen, openCompareModal, closeCompareModal,
      toasts, showToast,
    }}>
      <div data-theme={theme} className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
