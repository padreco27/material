// --- ESTADO GLOBAL DA APLICAÇÃO ---
let cart = [];
let favorites = [];
let compareList = [];
let activeCategory = "todos";
let layoutMode = "grid";
let currentTheme = "light";

// --- UTILITÁRIOS ---
function formatCurrency(value) {
  return `R$ ${value.toFixed(2)}`;
}

function getProduct(id) {
  return products.find(p => p.id === id);
}

function getNumericInput(id) {
  return parseFloat(document.getElementById(id).value) || 0;
}

function buildWhatsAppUrl(text) {
  return `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
}

function batchCreateIcons() {
  lucide.createIcons();
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function getHeaderOffset() {
  const header = document.querySelector('header');
  return header ? header.offsetHeight : 70;
}

// --- INICIALIZAÇÃO DO APP ---
document.addEventListener("DOMContentLoaded", () => {
  loadLocalStorage();
  initTheme();
  initBackToTop();
  initPromoCountdown();
  populateBrandFilters();
  filterProducts();
  calculateMaterials();
  updateHeaderBadges();
  handleQueryParams();
  
  // Delegate clicks outside modals/suggestions
  document.addEventListener("click", (e) => {
    const suggestions = document.getElementById("searchSuggestions");
    const searchInput = document.getElementById("searchInput");
    if (e.target !== suggestions && e.target !== searchInput) {
      suggestions.style.display = "none";
    }
  });

  // Event delegation for product cards
  document.getElementById("productsGrid").addEventListener("click", handleProductAction);

  // Event delegation for favorites drawer
  document.getElementById("favoritesDrawerBody").addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = parseInt(target.dataset.id);
    const action = target.dataset.action;
    switch (action) {
      case "modal": openProductModal(id); closeAllDrawers(); break;
      case "budget-fav": addToCart(id, 1); closeAllDrawers(); break;
      case "remove-fav": toggleFavorite(id); break;
    }
  });

  // Event delegation for budget cart
  document.getElementById("budgetItemsContainer").addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = parseInt(target.dataset.id);
    const action = target.dataset.action;
    switch (action) {
      case "qty-dec": changeCartQty(id, -1); break;
      case "qty-inc": changeCartQty(id, 1); break;
      case "remove-cart": removeFromCart(id); break;
    }
  });

  document.getElementById("budgetItemsContainer").addEventListener("change", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = parseInt(target.dataset.id);
    if (target.dataset.action === "qty-input") {
      updateCartInput(id, target.value);
    }
  });

  // Event delegation for compare panel
  document.getElementById("comparePanel").addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = parseInt(target.dataset.id);
    if (target.dataset.action === "remove-compare") {
      toggleCompare(id, e);
    }
  });

  // Event delegation for compare modal table
  document.getElementById("compareModalTableBody").addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = parseInt(target.dataset.id);
    const action = target.dataset.action;
    switch (action) {
      case "compare-budget": addToCart(id, 1); closeCompareModalOverlay(); break;
      case "compare-whatsapp": buyViaWhatsapp(id); break;
    }
  });

  // Event delegation for modal related products
  document.getElementById("modalRelatedGrid").addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const id = parseInt(target.dataset.id);
    if (target.dataset.action === "modal") openProductModal(id);
  });

  batchCreateIcons();
});

// --- PRODUCT GRID EVENT HANDLER (DELEGATION) ---
function handleProductAction(e) {
  const target = e.target.closest("[data-action]");
  if (!target) return;
  const id = parseInt(target.dataset.id);
  const action = target.dataset.action;
  switch (action) {
    case "modal": openProductModal(id); break;
    case "fav": toggleFavorite(id, e); break;
    case "compare": toggleCompare(id, e); break;
    case "budget": addToCart(id, 1); break;
    case "whatsapp": buyViaWhatsapp(id); break;
  }
}

// --- QUERY PARAMS (DEEP LINKING) ---
function handleQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');
  if (productId) {
    const id = parseInt(productId);
    if (getProduct(id)) {
      setTimeout(() => openProductModal(id), 500);
    }
  }
}

// --- PERSISTÊNCIA E LOCALSTORAGE ---
function loadLocalStorage() {
  try {
    const localCart = localStorage.getItem("constrular_cart");
    const localFavs = localStorage.getItem("constrular_favorites");
    const localCompare = localStorage.getItem("constrular_compare");
    const localTheme = localStorage.getItem("constrular_theme");

    if (localCart) cart = JSON.parse(localCart);
    if (localFavs) favorites = JSON.parse(localFavs);
    if (localCompare) compareList = JSON.parse(localCompare);
    if (localTheme) currentTheme = localTheme;
  } catch (e) {
    // Se localStorage corrompido, resetar
    cart = [];
    favorites = [];
    compareList = [];
  }
}

function saveCart() {
  localStorage.setItem("constrular_cart", JSON.stringify(cart));
  updateHeaderBadges();
  renderCart();
}

function saveFavorites() {
  localStorage.setItem("constrular_favorites", JSON.stringify(favorites));
  updateHeaderBadges();
  renderFavoritesList();
}

function saveCompareList() {
  localStorage.setItem("constrular_compare", JSON.stringify(compareList));
  updateHeaderBadges();
  updateComparePanel();
}

// --- CONTADORES DO MENU ---
function updateHeaderBadges() {
  document.getElementById("cartBadgeCount").innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("favBadgeCount").innerText = favorites.length;
  document.getElementById("compareBadgeCount").innerText = compareList.length;
}

// --- TEMA (MODO CLARO / ESCURO) ---
function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    setThemeIcon("sun");
  } else if (currentTheme === "light") {
    document.body.classList.remove("dark");
    setThemeIcon("moon");
  } else if (prefersDark) {
    document.body.classList.add("dark");
    currentTheme = "dark";
    setThemeIcon("sun");
  } else {
    document.body.classList.remove("dark");
    currentTheme = "light";
    setThemeIcon("moon");
  }
}

function toggleTheme() {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    currentTheme = "light";
    setThemeIcon("moon");
  } else {
    document.body.classList.add("dark");
    currentTheme = "dark";
    setThemeIcon("sun");
  }
  localStorage.setItem("constrular_theme", currentTheme);
}

function setThemeIcon(iconName) {
  const btn = document.getElementById("themeToggleBtn");
  btn.innerHTML = `<i data-lucide="${iconName}"></i>`;
  batchCreateIcons();
}

// --- BACK TO TOP ---
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
}

// --- NAVEGAÇÃO SUAVE E MENU MOBILE ---
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    closeMobileMenu();
    
    const offset = getHeaderOffset();
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = section.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
    });
    const activeLink = Array.from(document.querySelectorAll(".nav-link")).find(link => 
      link.textContent.toLowerCase().includes(sectionId.substring(0, 4))
    );
    if (activeLink) activeLink.classList.add("active");
  }
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const burgerBtn = document.getElementById("mobileMenuBtn");
  const isActive = navLinks.classList.toggle("active");
  burgerBtn.classList.toggle("active");
  burgerBtn.setAttribute("aria-expanded", isActive);
  burgerBtn.setAttribute("aria-label", isActive ? "Fechar menu de navegação" : "Abrir menu de navegação");
}

function closeMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const burgerBtn = document.getElementById("mobileMenuBtn");
  navLinks.classList.remove("active");
  burgerBtn.classList.remove("active");
  burgerBtn.setAttribute("aria-expanded", "false");
  burgerBtn.setAttribute("aria-label", "Abrir menu de navegação");
}

// --- FILTRO E BUSCA DE PRODUTOS ---
function populateBrandFilters() {
  const brands = [...new Set(products.map(p => p.brand))].sort();
  const select = document.getElementById("brandFilter");
  const checkboxList = document.getElementById("brandCheckboxList");

  // Limpa anteriores
  select.innerHTML = '<option value="todos">Todas as Marcas</option>';
  checkboxList.innerHTML = '';

  brands.forEach(brand => {
    // Dropdown (Usado no Mobile/Filtro rápido)
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    select.appendChild(opt);

    // Checkbox (Usado no Sidebar Desktop)
    const label = document.createElement("label");
    label.className = "brand-checkbox-label";
    label.innerHTML = `
      <input type="checkbox" value="${brand}" onchange="filterProducts()" class="brand-checkbox">
      <span>${brand}</span>
    `;
    checkboxList.appendChild(label);
  });
}

function updatePriceSliderLabel(val) {
  document.getElementById("priceRangeLabel").innerText = formatCurrency(parseFloat(val));
}

function selectSidebarCategory(category) {
  activeCategory = category;
  document.getElementById("categoryFilter").value = category;
  
  // Atualiza classe ativa na sidebar
  document.querySelectorAll(".category-item").forEach(item => {
    item.classList.remove("active");
  });
  const activeItem = document.querySelector(`.category-item[data-category="${category}"]`);
  if (activeItem) activeItem.classList.add("active");

  filterProducts();
}

function filterProducts() {
  const searchVal = document.getElementById("searchInput").value.toLowerCase().trim();
  const catVal = document.getElementById("categoryFilter").value;
  const brandVal = document.getElementById("brandFilter").value;
  const maxPrice = parseFloat(document.getElementById("priceRange").value);
  const sortVal = document.getElementById("sortSelect").value;

  // Obter marcas marcadas na sidebar
  const checkedBrands = Array.from(document.querySelectorAll(".brand-checkbox:checked")).map(cb => cb.value);

  // Filtrar
  let filtered = products.filter(product => {
    // Busca por Texto (Nome, Código, Categoria, Marca)
    const matchesSearch = !searchVal || 
      product.name.toLowerCase().includes(searchVal) ||
      product.code.toLowerCase().includes(searchVal) ||
      product.category.toLowerCase().includes(searchVal) ||
      product.brand.toLowerCase().includes(searchVal);

    // Categoria
    const matchesCategory = catVal === "todos" || product.category === catVal;

    // Marca (Se houver checkbox na sidebar marcada, prioriza. Se não, usa o dropdown superior)
    let matchesBrand = true;
    if (checkedBrands.length > 0) {
      matchesBrand = checkedBrands.includes(product.brand);
    } else if (brandVal !== "todos") {
      matchesBrand = product.brand === brandVal;
    }

    // Preço
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Ordenar
  if (sortVal === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Renderizar
  renderProductsGrid(filtered);
  updateCategoryCounts();
}

function updateCategoryCounts() {
  // Total Geral
  document.getElementById("count-todos").innerText = products.length;

  // Por Categoria
  const categories = [
    "cimento-e-argamassas", "estrutural", "ferragens", 
    "hidraulica", "elétrica", "acabamento", "ferramentas"
  ];

  categories.forEach(cat => {
    const count = products.filter(p => p.category === cat).length;
    const el = document.getElementById(`count-${cat}`);
    if (el) el.innerText = count;
  });
}

function renderProductsGrid(list) {
  const grid = document.getElementById("productsGrid");
  const countLabel = document.getElementById("resultsCount");
  
  countLabel.innerText = `${list.length} ${list.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-products">
        <i data-lucide="info"></i>
        <p>Nenhum produto atende a estes critérios de filtro.</p>
        <button class="btn btn-outline" onclick="resetFilters()">Limpar Filtros</button>
      </div>
    `;
    batchCreateIcons();
    return;
  }

  const fragment = document.createDocumentFragment();
  list.forEach(product => {
    const isFav = favorites.includes(product.id);
    const isCompare = compareList.includes(product.id);
    const hasPromo = product.id === 26 || product.id === 4;
    const oldPrice = hasPromo ? product.price * 1.25 : null;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-card-image" data-action="modal" data-id="${product.id}">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="product-badges">
          ${hasPromo ? '<span class="badge-item badge-promo">Oferta</span>' : ''}
          ${product.availability ? '<span class="badge-item badge-availability">Estoque</span>' : '<span class="badge-item badge-out-stock">Sob Consulta</span>'}
        </div>
      </div>
      <button class="product-wishlist-btn ${isFav ? 'active' : ''}" data-action="fav" data-id="${product.id}" title="Favoritar" aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
        <i data-lucide="heart" ${isFav ? 'fill="var(--danger)"' : ''}></i>
      </button>
      <button class="product-compare-btn ${isCompare ? 'active' : ''}" data-action="compare" data-id="${product.id}" title="Comparar Especificações" aria-label="${isCompare ? 'Remover da comparação' : 'Adicionar à comparação'}">
        <i data-lucide="columns-2"></i>
      </button>
      
      <div class="product-card-body">
        <div class="product-brand-code">
          <span>${product.brand}</span>
          <span>${product.code}</span>
        </div>
        <h3 class="product-title" data-action="modal" data-id="${product.id}">${product.name}</h3>
        <div class="product-rating">
          <i data-lucide="star" fill="var(--star)"></i>
          <span>${product.rating}</span>
          <span>(${product.reviewsCount})</span>
        </div>
        <div class="product-price-wrapper">
          ${oldPrice ? `<span class="product-old-price">${formatCurrency(oldPrice)}</span>` : ''}
          <span class="product-price">${formatCurrency(product.price)}</span>
          <span class="product-unit">/ ${product.unit}</span>
        </div>
      </div>
      
      <div class="product-card-actions">
        <button class="btn-card-budget" data-action="budget" data-id="${product.id}">
          <i data-lucide="plus"></i> Orçar
        </button>
        <button class="btn-card-whatsapp" data-action="whatsapp" data-id="${product.id}">
          <i data-lucide="message-square"></i> WhatsApp
        </button>
      </div>
    `;
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
  toggleLayout(layoutMode);
  batchCreateIcons();
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "todos";
  document.getElementById("brandFilter").value = "todos";
  document.getElementById("priceRange").value = 600;
  document.getElementById("sortSelect").value = "default";
  updatePriceSliderLabel(600);
  
  // Desmarcar todos os checkboxes da sidebar
  document.querySelectorAll(".brand-checkbox").forEach(cb => cb.checked = false);

  selectSidebarCategory("todos");
}

function toggleLayout(mode) {
  layoutMode = mode;
  const grid = document.getElementById("productsGrid");
  const btnGrid = document.getElementById("btnLayoutGrid");
  const btnList = document.getElementById("btnLayoutList");

  if (mode === "list") {
    grid.classList.add("list-view");
    btnList.classList.add("active");
    btnGrid.classList.remove("active");
  } else {
    grid.classList.remove("list-view");
    btnGrid.classList.add("active");
    btnList.classList.remove("active");
  }
}

// --- SUGGESTIONS (BUSCA INTELIGENTE) ---
function handleSearch(e) {
  const val = e.target.value.toLowerCase().trim();
  const suggestions = document.getElementById("searchSuggestions");

  if (!val) {
    suggestions.style.display = "none";
    filterProducts();
    return;
  }

  // Filtrar até 5 sugestões
  const matches = products.filter(p => 
    p.name.toLowerCase().includes(val) || 
    p.code.toLowerCase().includes(val) ||
    p.brand.toLowerCase().includes(val)
  ).slice(0, 5);

  if (matches.length > 0) {
    suggestions.innerHTML = "";
    matches.forEach(product => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.onclick = () => {
        openProductModal(product.id);
        suggestions.style.display = "none";
        document.getElementById("searchInput").value = product.name;
      };
      div.innerHTML = `
        <span class="suggestion-name">${product.name} <small style="color: var(--text-sec)">(${product.brand})</small></span>
        <span class="suggestion-category">${product.code}</span>
      `;
      suggestions.appendChild(div);
    });
    suggestions.style.display = "block";
  } else {
    suggestions.style.display = "none";
  }

  // Disparar filtragem real após pressionar Enter
  if (e.key === "Enter") {
    suggestions.style.display = "none";
    filterProducts();
  }
}

// --- FAVOURITES DRAWER SYSTEM ---
function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  
  const idx = favorites.indexOf(id);
  if (idx > -1) {
    favorites.splice(idx, 1);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  filterProducts(); // atualiza ícone nos cards gerais
  
  // Se houver um modal de produto aberto, atualiza o botão favoritar nele
  const modalFavBtn = document.getElementById("modalFavBtn");
  if (modalFavBtn && document.getElementById("productModalOverlay").classList.contains("active")) {
    updateModalFavButtonState(id);
  }
}

function updateModalFavButtonState(id) {
  const modalFavBtn = document.getElementById("modalFavBtn");
  const isFav = favorites.includes(id);
  modalFavBtn.innerHTML = `<i data-lucide="heart" ${isFav ? 'fill="var(--danger)"' : ''}></i> ${isFav ? 'Favoritado' : 'Favoritar'}`;
  if (isFav) {
    modalFavBtn.style.color = "var(--danger)";
    modalFavBtn.style.borderColor = "var(--danger)";
  } else {
    modalFavBtn.style.color = "var(--text-main)";
    modalFavBtn.style.borderColor = "var(--border)";
  }
  batchCreateIcons();
}

function toggleFavoritesDrawer() {
  const drawer = document.getElementById("favoritesDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  drawer.classList.toggle("active");
  backdrop.classList.toggle("active");
  if (drawer.classList.contains("active")) {
    renderFavoritesList();
  }
}

function closeAllDrawers() {
  document.getElementById("favoritesDrawer").classList.remove("active");
  document.getElementById("drawerBackdrop").classList.remove("active");
}

function renderFavoritesList() {
  const body = document.getElementById("favoritesDrawerBody");
  body.innerHTML = "";

  if (favorites.length === 0) {
    body.innerHTML = `<div class="fav-empty"><i data-lucide="heart"></i><p>Sua lista de favoritos está vazia.</p></div>`;
    batchCreateIcons();
    return;
  }

  favorites.forEach(id => {
    const product = getProduct(id);
    if (!product) return;

    const div = document.createElement("div");
    div.className = "fav-item";
    div.setAttribute("data-product-id", id);
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" class="fav-item-img" data-action="modal" data-id="${id}">
      <div class="fav-item-info">
        <h4 class="fav-item-title" data-action="modal" data-id="${id}">${product.name}</h4>
        <span class="fav-item-price">${formatCurrency(product.price)}</span>
      </div>
      <div class="fav-actions">
        <button class="action-btn" data-action="budget-fav" data-id="${id}" title="Adicionar ao Orçamento" aria-label="Adicionar ao orçamento">
          <i data-lucide="plus"></i>
        </button>
        <button class="action-btn" data-action="remove-fav" data-id="${id}" title="Remover dos Favoritos" aria-label="Remover dos favoritos">
          <i data-lucide="trash"></i>
        </button>
      </div>
    `;
    body.appendChild(div);
  });
  batchCreateIcons();
}

// --- COMPARISON PANEL & MODAL SYSTEM ---
function toggleCompare(id, event) {
  if (event) event.stopPropagation();

  const idx = compareList.indexOf(id);
  if (idx > -1) {
    compareList.splice(idx, 1);
  } else {
    if (compareList.length >= 3) {
      showToast("Você pode comparar no máximo 3 produtos ao mesmo tempo.");
      return;
    }
    compareList.push(id);
  }
  
  saveCompareList();
  filterProducts(); // atualiza ícone nos cards gerais
}

function updateComparePanel() {
  const panel = document.getElementById("comparePanel");
  if (compareList.length > 0) {
    panel.classList.add("active");
  } else {
    panel.classList.remove("active");
  }

  // Preencher slots
  for (let i = 0; i < 3; i++) {
    const slot = document.getElementById(`compareSlot${i}`);
    if (compareList[i]) {
      const product = getProduct(compareList[i]);
      if (!product) continue;
      slot.className = "compare-item-slot";
      slot.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="compare-slot-img">
        <span class="compare-slot-title">${product.name.substring(0, 20)}...</span>
        <button class="compare-slot-remove" data-action="remove-compare" data-id="${product.id}" aria-label="Remover da comparação"><i data-lucide="x"></i></button>
      `;
    } else {
      slot.className = "compare-item-slot compare-slot-empty";
      slot.innerHTML = `<i data-lucide="plus"></i> Adicionar`;
    }
  }
  batchCreateIcons();
}

function closeComparePanel() {
  document.getElementById("comparePanel").classList.remove("active");
}

function openCompareModal() {
  if (compareList.length < 2) {
    showToast("Selecione pelo menos 2 produtos para comparar as especificações.");
    return;
  }
  showComparisonTableModal();
}

function showComparisonTableModal() {
  const modal = document.getElementById("compareModalOverlay");
  const body = document.getElementById("compareModalTableBody");
  modal.classList.add("active");

  const comparedProducts = compareList.map(id => getProduct(id)).filter(Boolean);

  let tableHtml = `<table class="compare-table"><thead><tr><th>Especificação</th>`;
  
  comparedProducts.forEach(p => {
    tableHtml += `
      <th>
        <div style="text-align: center;">
          <img src="${p.images[0]}" alt="${p.name}" style="width: 80px; height: 80px; object-fit: contain; background: #fff; border-radius: 4px; margin-bottom: 8px;">
          <h4 style="font-size: 13px;">${p.name}</h4>
          <span style="color: var(--accent); font-weight: 700; font-size: 14px;">${formatCurrency(p.price)}</span>
        </div>
      </th>`;
  });
  
  tableHtml += `</tr></thead><tbody>`;

  // Linhas fixas
  tableHtml += `<tr><td><strong>Código</strong></td>` + comparedProducts.map(p => `<td>${p.code}</td>`).join("") + `</tr>`;
  tableHtml += `<tr><td><strong>Marca</strong></td>` + comparedProducts.map(p => `<td>${p.brand}</td>`).join("") + `</tr>`;
  tableHtml += `<tr><td><strong>Categoria</strong></td>` + comparedProducts.map(p => `<td>${p.category}</td>`).join("") + `</tr>`;
  tableHtml += `<tr><td><strong>Avaliação</strong></td>` + comparedProducts.map(p => `<td>★ ${p.rating} (${p.reviewsCount} avaliações)</td>`).join("") + `</tr>`;
  tableHtml += `<tr><td><strong>Unidade</strong></td>` + comparedProducts.map(p => `<td>${p.unit}</td>`).join("") + `</tr>`;

  // Unificar chaves das especificações técnicas
  const allSpecKeys = new Set();
  comparedProducts.forEach(p => {
    Object.keys(p.specs).forEach(k => allSpecKeys.add(k));
  });

  allSpecKeys.forEach(key => {
    tableHtml += `<tr><td><strong>${key}</strong></td>`;
    comparedProducts.forEach(p => {
      tableHtml += `<td>${p.specs[key] || "Não especificado"}</td>`;
    });
    tableHtml += `</tr>`;
  });

  // Linha de ações
  tableHtml += `<tr><td><strong>Ações</strong></td>`;
  comparedProducts.forEach(p => {
    tableHtml += `
      <td>
        <div style="display: flex; gap: 8px; flex-direction: column;">
          <button class="btn btn-primary compare-action-budget" data-action="compare-budget" data-id="${p.id}" style="padding: 8px; font-size: 12px;">
            Orçar
          </button>
          <button class="btn btn-secondary" style="padding: 8px; font-size: 12px; background-color: #25D366;" data-action="compare-whatsapp" data-id="${p.id}">
            WhatsApp
          </button>
        </div>
      </td>`;
  });

  tableHtml += `</tr></tbody></table>`;
  body.innerHTML = tableHtml;
  batchCreateIcons();
}

function closeCompareModalOverlay() {
  document.getElementById("compareModalOverlay").classList.remove("active");
}

// --- DYNAMIC PRODUCT MODAL (PÁGINA INDIVIDUAL) ---
function openProductModal(id) {
  const product = getProduct(id);
  if (!product) return;

  const overlay = document.getElementById("productModalOverlay");
  overlay.classList.add("active");

  document.getElementById("modalBrand").innerText = product.brand;
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalCode").innerText = `Código: ${product.code}`;
  document.getElementById("modalShortDesc").innerText = product.shortDescription;
  document.getElementById("modalLongDesc").innerText = product.description;
  document.getElementById("modalPrice").innerText = formatCurrency(product.price);
  document.getElementById("modalUnit").innerText = `/ ${product.unit}`;
  document.getElementById("modalRatingScore").innerText = product.rating;
  document.getElementById("modalReviewsCount").innerText = `(${product.reviewsCount} avaliações)`;
  document.getElementById("modalReviewAvg").innerText = product.rating;
  document.getElementById("modalReviewSummaryCount").innerText = `Baseado em ${product.reviewsCount} avaliações`;

  // Disponibilidade
  const avEl = document.getElementById("modalAvailability");
  if (product.availability) {
    avEl.innerHTML = `<i data-lucide="check-circle" style="color: var(--success); vertical-align: middle;"></i> Disponível em Estoque`;
    avEl.style.color = "var(--success)";
  } else {
    avEl.innerHTML = `<i data-lucide="alert-circle" style="color: var(--danger); vertical-align: middle;"></i> Sob Consulta`;
    avEl.style.color = "var(--danger)";
  }

  // Galeria de imagens
  const mainImg = document.getElementById("modalMainImg");
  mainImg.src = product.images[0];

  const thumbs = document.getElementById("modalThumbnails");
  thumbs.innerHTML = "";
  product.images.forEach((imgUrl, index) => {
    const thumb = document.createElement("div");
    thumb.className = `modal-thumb ${index === 0 ? 'active' : ''}`;
    thumb.onclick = () => {
      mainImg.src = imgUrl;
      document.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    };
    thumb.innerHTML = `<img src="${imgUrl}" alt="${product.name} miniatura">`;
    thumbs.appendChild(thumb);
  });

  // Ações do Modal
  document.getElementById("modalAddBudgetBtn").onclick = () => {
    addToCart(product.id, 1);
    closeProductModal();
  };
  document.getElementById("modalWhatsappBtn").onclick = () => {
    buyViaWhatsapp(product.id);
  };
  document.getElementById("modalShareBtn").onclick = () => {
    shareProductLink(product);
  };

  // Botão favorito no modal
  updateModalFavButtonState(product.id);
  document.getElementById("modalFavBtn").onclick = () => {
    toggleFavorite(product.id);
  };

  // Tabela de Especificações
  const specsTable = document.getElementById("modalSpecsTable");
  specsTable.innerHTML = "";
  Object.entries(product.specs).forEach(([key, val]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${key}</td><td>${val}</td>`;
    specsTable.appendChild(tr);
  });

  // Lista de Aplicações
  const appsList = document.getElementById("modalAppsList");
  appsList.innerHTML = "";
  product.applications.forEach(app => {
    const li = document.createElement("li");
    li.innerText = app;
    appsList.appendChild(li);
  });

  // Vídeo demonstrativo
  const videoTab = document.querySelector('.modal-tab-btn[onclick*="tabVideo"]');
  const iframe = document.getElementById("modalVideoFrame");
  if (product.videoUrl && !product.videoUrl.includes('dQw4w9WgXcQ')) {
    iframe.src = product.videoUrl;
    if (videoTab) videoTab.style.display = '';
  } else {
    iframe.src = '';
    iframe.srcdoc = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f4f6f9;color:#64748B;font-family:sans-serif;flex-direction:column;gap:8px;"><p style="font-size:18px;font-weight:600;">Vídeo em breve</p><p style="font-size:14px;">O vídeo demonstrativo deste produto será disponibilizado em breve.</p></div>';
    if (videoTab) videoTab.style.display = 'none';
  }

  // Renderizar avaliações fictícias dinâmicas
  renderReviewsList(product);

  // Carregar produtos relacionados
  renderRelatedProducts(product);

  // Mostrar sempre primeira aba por padrão
  switchModalTab('tabDesc');

  batchCreateIcons();
}

function closeProductModal() {
  document.getElementById("productModalOverlay").classList.remove("active");
  // Pausar vídeo ao fechar
  document.getElementById("modalVideoFrame").src = "";
}

function switchModalTab(tabId) {
  // Desativar todas
  document.querySelectorAll(".modal-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".modal-tab-pane").forEach(pane => pane.classList.remove("active"));

  // Ativar selecionada
  const activeBtn = Array.from(document.querySelectorAll(".modal-tab-btn")).find(btn => 
    btn.getAttribute("onclick").includes(tabId)
  );
  if (activeBtn) activeBtn.classList.add("active");

  const activePane = document.getElementById(tabId);
  if (activePane) activePane.classList.add("active");
}

function renderReviewsList(product) {
  const reviewsList = document.getElementById("modalReviewsList");
  reviewsList.innerHTML = "";

  const mockReviews = [
    {
      author: "Marcos Silva (Mestre de Obras)",
      stars: 5,
      text: "Produto de excelente qualidade, rendimento excelente na obra. A entrega foi super rápida e o material veio bem embalado.",
      photos: ["https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=150&auto=format&fit=crop"]
    },
    {
      author: "Ana Julia (Arquiteta)",
      stars: 4,
      text: "Recomendo muito. O acabamento deste material é fantástico e as especificações batem perfeitamente com o projeto. Com certeza comprarei mais.",
      photos: []
    }
  ];

  mockReviews.forEach(r => {
    const item = document.createElement("div");
    item.className = "review-item";

    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += `<i data-lucide="star" ${i < r.stars ? 'fill="var(--star)"' : ''} style="color: var(--star)"></i>`;
    }

    let photosHtml = "";
    if (r.photos.length > 0) {
      photosHtml = `<div class="review-photos">` + r.photos.map(p => `
        <img src="${p}" alt="Foto do cliente" class="review-photo-item" onclick="viewPhotoFullscreen('${p}')">
      `).join("") + `</div>`;
    }

    item.innerHTML = `
      <div class="review-meta">
        <span class="review-author">${r.author}</span>
        <div class="review-stars">${starsHtml}</div>
      </div>
      <p class="review-text">${r.text}</p>
      ${photosHtml}
    `;
    reviewsList.appendChild(item);
  });
}

function viewPhotoFullscreen(url) {
  window.open(url, '_blank', 'noopener');
}

function renderRelatedProducts(currProd) {
  const grid = document.getElementById("modalRelatedGrid");
  grid.innerHTML = "";

  // Filtrar produtos da mesma categoria (excluindo ele mesmo)
  let related = products.filter(p => p.category === currProd.category && p.id !== currProd.id).slice(0, 3);

  // Se não houver produtos na mesma categoria, pega qualquer outro
  if (related.length < 3) {
    const extra = products.filter(p => p.id !== currProd.id && !related.includes(p)).slice(0, 3 - related.length);
    related = [...related, ...extra];
  }

  related.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.fontSize = "12px";
    card.innerHTML = `
      <div class="product-card-image" style="height: 120px;" data-action="modal" data-id="${p.id}">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-card-body" style="padding: 12px; gap: 6px;">
        <h4 class="product-title" style="font-size: 13px; height: 36px;" data-action="modal" data-id="${p.id}">${p.name}</h4>
        <span style="color: var(--accent); font-weight: 700;">${formatCurrency(p.price)}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function shareProductLink(product) {
  const shareData = {
    title: product.name,
    text: `Confira o produto ${product.name} no Catálogo Constrular.`,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(err => console.log(err));
  } else {
    // Fallback: copiar link para área de transferência
    navigator.clipboard.writeText(`${window.location.href}?product=${product.id}`)
      .then(() => showToast("Link do produto copiado para a área de transferência!"))
      .catch(() => showToast("Não foi possível copiar o link."));
  }
}

// --- BUDGET CART ENGINE (GAVETA / PÁGINA) ---
function addToCart(id, qty) {
  const product = getProduct(id);
  if (!product) return;

  const cartItem = cart.find(item => item.id === id);
  if (cartItem) {
    cartItem.quantity += qty;
  } else {
    cart.push({ id, quantity: qty });
  }

  saveCart();
  
  // Efeito visual no botão cart da navbar (piscar)
  const navBtn = document.querySelector(".action-btn i[data-lucide='shopping-cart']").parentElement;
  navBtn.style.transform = "scale(1.2)";
  setTimeout(() => navBtn.style.transform = "scale(1)", 200);

  // Perguntar sutilmente se quer ir ao orçamento ou continuar
  // Criamos uma notificação flutuante temporária
  showToast(`${product.name} adicionado ao orçamento!`);
}

function changeCartQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
}

function updateCartInput(id, val) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  const intVal = parseInt(val);
  if (isNaN(intVal) || intVal <= 0) {
    removeFromCart(id);
    return;
  }
  item.quantity = intVal;
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  showToast("Item removido do orçamento.");
}

function addPromoItemToBudget(id) {
  addToCart(id, 1);
}

function renderCart() {
  const container = document.getElementById("budgetItemsContainer");
  const emptyState = document.getElementById("budgetEmptyState");
  const totalValLabel = document.getElementById("budgetTotalVal");

  // Limpar anteriores
  const items = container.querySelectorAll(".budget-item");
  items.forEach(i => i.remove());

  if (cart.length === 0) {
    emptyState.style.display = "block";
    totalValLabel.innerText = "R$ 0,00";
    return;
  }

  emptyState.style.display = "none";
  let totalSum = 0;

  cart.forEach(item => {
    const product = getProduct(item.id);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    totalSum += itemTotal;

    const div = document.createElement("div");
    div.className = "budget-item";
    div.setAttribute("data-product-id", item.id);
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" class="budget-item-img">
      <div class="budget-item-info">
        <h4 class="budget-item-title">${product.name}</h4>
        <div class="budget-item-code">Código: ${product.code} | Marca: ${product.brand}</div>
        <div class="budget-item-price">${formatCurrency(product.price)} x ${item.quantity} = <strong>${formatCurrency(itemTotal)}</strong></div>
      </div>
      <div class="budget-qty-controls" data-action="qty" data-id="${product.id}">
        <button class="qty-btn" data-action="qty-dec" data-id="${product.id}" aria-label="Diminuir quantidade">-</button>
        <input type="number" class="qty-input" value="${item.quantity}" data-action="qty-input" data-id="${product.id}" inputmode="numeric" pattern="[0-9]*">
        <button class="qty-btn" data-action="qty-inc" data-id="${product.id}" aria-label="Aumentar quantidade">+</button>
      </div>
      <button class="budget-item-remove" data-action="remove-cart" data-id="${product.id}" title="Remover" aria-label="Remover item do orçamento"><i data-lucide="trash"></i></button>
    `;
    container.appendChild(div);
  });

  totalValLabel.innerText = formatCurrency(totalSum);
  batchCreateIcons();
}

// --- SIMULADOR DE MATERIAIS ENGINE ---
function calculateMaterials() {
  const area = getNumericInput("simArea");
  const rooms = parseInt(document.getElementById("simComodos").value) || 0;
  const type = document.getElementById("simObraType").value;

  let cement = 0;
  let sand = 0;
  let gravel = 0;
  let bricks = 0;

  if (area > 0) {
    if (type === "estrutura") {
      // 0.4 sacos de cimento por m² para estrutura e assentamento
      cement = Math.ceil(area * 0.4 + rooms * 1.5);
      sand = parseFloat((area * 0.08 + rooms * 0.2).toFixed(1));
      gravel = parseFloat((area * 0.05 + rooms * 0.1).toFixed(1));
      // 25 tijolos por m² + fator cômodos para divisórias internas
      bricks = Math.ceil((area * 25) * (1 + rooms * 0.08));
    } else if (type === "reboco") {
      cement = Math.ceil(area * 0.25);
      sand = parseFloat((area * 0.05).toFixed(1));
      gravel = 0; // sem brita no reboco
      bricks = 0;
    } else if (type === "contrapiso") {
      cement = Math.ceil(area * 0.35);
      sand = parseFloat((area * 0.07).toFixed(1));
      gravel = parseFloat((area * 0.06).toFixed(1));
      bricks = 0;
    }
  }

  // Preencher labels
  document.getElementById("resultCement").innerText = `${cement} sacos`;
  document.getElementById("resultSand").innerText = `${sand} m³`;
  document.getElementById("resultGravel").innerText = `${gravel} m³`;
  document.getElementById("resultBricks").innerText = `${bricks} peças`;
}

function addCalculatedMaterialsToCart() {
  const area = parseFloat(document.getElementById("simArea").value) || 0;
  const rooms = parseInt(document.getElementById("simComodos").value) || 0;
  const type = document.getElementById("simObraType").value;

  if (area <= 0) {
    showToast("Insira uma área maior que zero.");

    return;
  }

  calculateMaterials();

  // Obter valores
  const cementQtyStr = document.getElementById("resultCement").innerText;
  const bricksQtyStr = document.getElementById("resultBricks").innerText;

  const cementQty = parseInt(cementQtyStr);
  const bricksQty = parseInt(bricksQtyStr);

  let itemsAdded = 0;

  // Cimento (ID 1)
  if (cementQty > 0) {
    addToCart(1, cementQty);
    itemsAdded++;
  }

  // Tijolo (ID 6)
  if (bricksQty > 0) {
    addToCart(6, bricksQty);
    itemsAdded++;
  }

  if (itemsAdded > 0) {
    showToast("Cimento e Tijolos estimados adicionados ao seu orçamento!");
    scrollToSection("orcamento");
  } else {
    showToast("Nenhum item do catálogo disponível para adicionar com base no tipo de obra.");
  }
}

// --- FORM SUBMISSIONS & WHATSAPP INTEGRATION ---
function submitBudgetForm(event) {
  event.preventDefault();

  if (cart.length === 0) {
    showToast("Adicione produtos ao seu orçamento antes de enviar.");
    return;
  }

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const email = document.getElementById("custEmail").value;
  const city = document.getElementById("custCity").value;
  const message = document.getElementById("custMessage").value;

  // Montar texto para o WhatsApp
  let text = `*NOVA SOLICITAÇÃO DE ORÇAMENTO - CONSTRULAR*\n\n`;
  text += `*Cliente:* ${name}\n`;
  text += `*Telefone:* ${phone}\n`;
  text += `*E-mail:* ${email}\n`;
  text += `*Cidade/UF:* ${city}\n`;
  if (message) text += `*Observações:* ${message}\n`;
  text += `\n*PRODUTOS SOLICITADOS:*\n`;

  let totalEstimado = 0;
  cart.forEach((item, index) => {
    const product = getProduct(item.id);
    if (product) {
      const itemVal = product.price * item.quantity;
      totalEstimado += itemVal;
      text += `${index + 1}. [${product.code}] ${product.name}\n`;
      text += `   Qtd: ${item.quantity} | Unit: ${formatCurrency(product.price)} | Total: ${formatCurrency(itemVal)}\n`;
    }
  });

  text += `\n*VALOR ESTIMADO (MATERIAIS):* ${formatCurrency(totalEstimado)}\n\n`;
  text += `_Gerado automaticamente pelo Catálogo Digital Constrular._`;

  const whatsappUrl = buildWhatsAppUrl(text);

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  // Mostrar modal de sucesso
  showConfirmationAlert("Orçamento enviado! Nosso time comercial abrirá sua conversa no WhatsApp para finalizar a cotação e frete.");
  
  // Limpar formulário e carrinho
  document.getElementById("customerBudgetForm").reset();
  cart = [];
  saveCart();
}

function submitProForm(event) {
  event.preventDefault();
  const name = document.getElementById("proName").value;
  const role = document.getElementById("proRole").value;
  const phone = document.getElementById("proPhone").value;
  const email = document.getElementById("proEmail").value;

  let text = `*SOLICITAÇÃO DE PARCERIA PROFISSIONAL - CONSTRULAR*\n\n`;
  text += `*Nome:* ${name}\n`;
  text += `*Cargo/Profissão:* ${role.toUpperCase()}\n`;
  text += `*Telefone:* ${phone}\n`;
  text += `*E-mail:* ${email}\n\n`;
  text += `Olá, gostaria de solicitar meu cadastro de parceiro para obter descontos comerciais especiais.`;

  const whatsappUrl = buildWhatsAppUrl(text);

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  showConfirmationAlert("Cadastro de profissional enviado! Entraremos em contato com sua tabela de descontos em breve.");
  
  document.getElementById("proForm").reset();
}

function buyViaWhatsapp(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const text = `Olá, gostaria de solicitar um orçamento para o produto:\n\n*Item:* ${product.name}\n*Código:* ${product.code}\n*Marca:* ${product.brand}\n*Preço Unitário:* ${formatCurrency(product.price)}`;
  const whatsappUrl = buildWhatsAppUrl(text);

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// --- CONTEXT NOTIFICATION (TOAST & ALERTS) ---
function showToast(msg) {
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");
  toast.innerText = msg;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("visible"), 50);
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function showConfirmationAlert(msg) {
  // Criar modal customizado de alerta
  const alertOverlay = document.createElement("div");
  alertOverlay.className = "modal-overlay active";
  alertOverlay.style.zIndex = "300";

  const alertContent = document.createElement("div");
  alertContent.className = "modal-content";
  alertContent.style.maxWidth = "400px";
  alertContent.style.padding = "30px";
  alertContent.style.textAlign = "center";

  alertContent.innerHTML = `
    <div style="width: 60px; height: 60px; border-radius: 50%; background-color: rgba(16, 185, 129, 0.1); color: var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 30px;">
      ✓
    </div>
    <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--primary);">Sucesso!</h3>
    <p style="font-size: 14px; color: var(--text-sec); line-height: 1.5; margin-bottom: 24px;">${msg}</p>
    <button class="btn btn-primary" style="width: 100%;" id="alertOkBtn">OK</button>
  `;

  alertOverlay.appendChild(alertContent);
  document.body.appendChild(alertOverlay);

  document.getElementById("alertOkBtn").onclick = () => {
    alertOverlay.remove();
  };
}

// --- COUNTDOWN TIMER (OFERTAS) ---
function initPromoCountdown() {
  // Configurar para fechar em exatamente 2 dias úteis a partir de agora
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  targetDate.setHours(23, 59, 59, 999);

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      document.getElementById("countdownTimer").innerHTML = "<p style='color: var(--accent); font-weight:700;'>PROMOÇÃO ENCERRADA!</p>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("daysBox").innerText = String(days).padStart(2, "0");
    document.getElementById("hoursBox").innerText = String(hours).padStart(2, "0");
    document.getElementById("minsBox").innerText = String(mins).padStart(2, "0");
    document.getElementById("secsBox").innerText = String(secs).padStart(2, "0");
  }

  updateTimer(); // inicializar primeira vez
  const timerInterval = setInterval(updateTimer, 1000);
}
