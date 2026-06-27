export function formatCurrency(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function buildWhatsAppUrl(text) {
  return `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
}

export const isPromoProduct = (id) => id === 4 || id === 26;

export const categoryLabels = {
  todos: 'Todos',
  'cimento-e-argamassas': 'Cimento & Argamassas',
  estrutural: 'Estrutural',
  ferragens: 'Ferragens',
  hidraulica: 'Hidráulica',
  'elétrica': 'Elétrica',
  acabamento: 'Acabamento',
  ferramentas: 'Ferramentas',
};

export const promoProductIds = [4, 26];
