const SWATCH_CLASSES = ['clay', 'white', 'sage', 'sand'];

document.addEventListener('DOMContentLoaded', () => {

  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  renderCart();

  document.getElementById('btnCheckout').addEventListener('click', () => {
    const cart = getCart();
    if (!cart.length) return;

    const subtotal = getCartSubtotal();
    const shipping = getShippingFee(subtotal);
    const total = subtotal + shipping;
    const orderId = `MOC-${Math.floor(100000 + Math.random() * 900000)}`;

    localStorage.removeItem(CART_KEY);
    updateCartBadge();

    window.location.href = `thankyou.html?order=${orderId}&total=${encodeURIComponent(formatPrice(total))}`;
  });

});

function getShippingFee(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= 500000 ? 0 : 30000;
}

function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  const countText = document.getElementById('cartItemCountText');
  const checkoutBtn = document.getElementById('btnCheckout');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countText.textContent = `${totalQty} sản phẩm`;

  if (!cart.length) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 64 64" fill="none" stroke="#211B17" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 20h4l5 30a4 4 0 0 0 4 3.4h18a4 4 0 0 0 4-3.4l4-24H22"/>
          <circle cx="26" cy="54" r="2.4" fill="#211B17"/>
          <circle cx="44" cy="54" r="2.4" fill="#211B17"/>
        </svg>
        <h3>Giỏ hàng của bạn đang trống</h3>
        <p>Hãy khám phá các mẫu áo mới nhất của MỘC và thêm vào giỏ nhé.</p>
        <a href="home.html" class="cart-empty-cta">Khám phá sản phẩm</a>
      </div>`;
    summaryEl.style.display = 'none';
    return;
  }

  summaryEl.style.display = '';
  checkoutBtn.disabled = false;

  itemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item" data-name="${escapeHtml(item.name)}">
      <div class="cart-item-swatch swatch-${SWATCH_CLASSES[idx % SWATCH_CLASSES.length]}">
        <svg viewBox="0 0 40 46" fill="none" stroke="#211B17" stroke-width="1.4" stroke-linejoin="round">
          <path d="M12 10 C12 10 6 14 4 22 L10 24 L13 17 L13 42 L27 42 L27 17 L30 24 L36 22 C34 14 28 10 28 10 L21 6 C21 6 20 10 20 10 C20 10 19 6 19 6 Z"/>
        </svg>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${escapeHtml(item.name)}</p>
        <p class="cart-item-price">${formatPrice(item.price)} / sản phẩm</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn qty-minus" aria-label="Giảm số lượng">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn qty-plus" aria-label="Tăng số lượng">+</button>
      </div>
      <div class="cart-item-total">${formatPrice(item.price * item.qty)}</div>
      <button class="cart-item-remove" aria-label="Xóa sản phẩm">✕</button>
    </div>
  `).join('<div class="cart-stitch" aria-hidden="true"></div>');

  itemsEl.querySelectorAll('.cart-item').forEach(row => {
    const name = row.dataset.name;

    row.querySelector('.qty-plus').addEventListener('click', () => {
      const item = getCart().find(i => i.name === name);
      if (item) updateQty(name, item.qty + 1);
      renderCart();
    });

    row.querySelector('.qty-minus').addEventListener('click', () => {
      const item = getCart().find(i => i.name === name);
      if (item && item.qty > 1) {
        updateQty(name, item.qty - 1);
      } else if (item) {
        removeFromCart(name);
      }
      renderCart();
    });

    row.querySelector('.cart-item-remove').addEventListener('click', () => {
      removeFromCart(name);
      renderCart();
      showToast(`Đã xóa "${name}" khỏi giỏ hàng`);
    });
  });

  const subtotal = getCartSubtotal();
  const shipping = getShippingFee(subtotal);
  document.getElementById('sumSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('sumShipping').textContent = shipping === 0 ? 'Miễn phí' : formatPrice(shipping);
  document.getElementById('sumTotal').textContent = formatPrice(subtotal + shipping);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}