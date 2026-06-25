// Gera link WhatsApp com mensagem pré-formatada para produto único
export function whatsappProductLink(product) {
  const text = `Olá! Gostaria de solicitar um orçamento para:\n\n*${product.name}*\nCódigo: ${product.code}\nMarca: ${product.brand}\nPreço Unitário: R$ ${product.price.toFixed(2)}\n\nAguardo retorno. Obrigado!`;
  return `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
}

// Gera link WhatsApp com carrinho completo formatado
export function whatsappBudgetLink({ cart, products, customer }) {
  let text = `*SOLICITAÇÃO DE ORÇAMENTO — CONSTRULAR*\n\n`;
  text += `*Cliente:* ${customer.name}\n`;
  text += `*Telefone:* ${customer.phone}\n`;
  text += `*E-mail:* ${customer.email}\n`;
  text += `*Cidade:* ${customer.city}\n`;
  if (customer.message) text += `*Observações:* ${customer.message}\n`;
  text += `\n*PRODUTOS SOLICITADOS:*\n`;

  let total = 0;
  cart.forEach((item, i) => {
    const p = products.find((pr) => pr.id === item.id);
    if (p) {
      const sub = p.price * item.quantity;
      total += sub;
      text += `${i + 1}. [${p.code}] ${p.name}\n`;
      text += `   Qtd: ${item.quantity} × R$ ${p.price.toFixed(2)} = R$ ${sub.toFixed(2)}\n`;
    }
  });

  text += `\n*VALOR ESTIMADO:* R$ ${total.toFixed(2)}\n`;
  text += `_Enviado pelo Catálogo Digital Constrular_`;
  return `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
}

// Gera link WhatsApp para cadastro de profissional
export function whatsappProLink({ name, role, phone, email }) {
  const text = `*SOLICITAÇÃO DE PARCERIA — CONSTRULAR*\n\n*Nome:* ${name}\n*Cargo:* ${role}\n*Telefone:* ${phone}\n*E-mail:* ${email}\n\nGostaria de me cadastrar como parceiro profissional.`;
  return `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
}
