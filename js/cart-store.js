const CART_KEY = 'moc_cart';

function parsePrice(str) {
  if (!str) return 0;
  const digits = String(str).replace(/[^\d]/g, '');
  return parseInt(digits || '0', 10);
}

function formatPrice(num) {
  return num.toLocaleString('vi-VN') + '₫';
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(name, priceStr, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price: parsePrice(priceStr), qty });
  }
  saveCart(cart);
}

function removeFromCart(name) {
  const cart = getCart().filter(item => item.name !== name);
  saveCart(cart);
}

function updateQty(name, qty) {
  const cart = getCart();
  const item = cart.find(i => i.name === name);
  if (item) item.qty = Math.max(1, qty);
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function showToast(message) {
  let toast = document.getElementById('mocToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'mocToast';
    toast.className = 'moc-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('show');
  void toast.offsetWidth; // restart animation
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);