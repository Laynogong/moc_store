document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);

  // Mã đơn hàng: lấy từ URL (?order=MOC-123456) hoặc tự sinh ngẫu nhiên để demo
  const orderId = params.get('order') || `MOC-${Math.floor(100000 + Math.random() * 900000)}`;
  document.getElementById('tkOrderId').textContent = orderId;

  // Ngày đặt hàng: hôm nay
  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  document.getElementById('tkOrderDate').textContent = dateStr;

  // Tổng thanh toán: lấy từ URL (?total=590.000₫) nếu có, ví dụ khi chuyển hướng từ giỏ hàng
  const total = params.get('total');
  if (total) {
    document.getElementById('tkOrderTotal').textContent = decodeURIComponent(total);
  }

  // Ví dụ cách gọi trang này từ nơi khác:
  // window.location.href = `thankyou.html?order=MOC-482913&total=${encodeURIComponent('980.000₫')}`;

});