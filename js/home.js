document.addEventListener('DOMContentLoaded', () => {

  // Nút "Đăng nhập" trên navbar -> chuyển sang login.html
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // ===================== MODAL MUA HÀNG =====================
  const overlay = document.getElementById('buyModalOverlay');
  const modalText = document.getElementById('buyModalText');
  const closeBtn = document.getElementById('buyModalClose');
  const cancelBtn = document.getElementById('buyModalCancel');
  const confirmBtn = document.getElementById('buyModalConfirm');

  let currentProduct = null;

  function openModal(name, price) {
    currentProduct = { name, price };
    modalText.innerHTML = `Bạn muốn mua <br><strong>${name}</strong><br>với giá <span class="modal-price">${price}</span>?`;
    overlay.classList.add('active');
  }

  function closeModal() {
    overlay.classList.remove('active');
    currentProduct = null;
  }

  // Gắn sự kiện click cho TẤT CẢ loại thẻ sản phẩm trong trang:
  // thumb-card (hero), arrival-feature + arrival-item (sản phẩm mới), product-card (bộ sưu tập)
  document.querySelectorAll('.thumb-card, .arrival-feature, .arrival-item, .product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Không mở modal nếu bấm vào nút yêu thích (trái tim)
      if (e.target.closest('.wish')) return;

      const name = card.dataset.name;
      const price = card.dataset.price;
      if (name && price) openModal(name, price);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Đóng modal khi nhấn phím Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  confirmBtn.addEventListener('click', () => {
    if (currentProduct) {
      addToCart(currentProduct.name, currentProduct.price, 1);
      showToast(`Đã thêm "${currentProduct.name}" vào giỏ hàng`);
    }
    closeModal();
  });

});
