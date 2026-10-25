const toggleBtn = document.getElementById('toggleBtn');
  const passInput = document.getElementById('pass');
  toggleBtn.addEventListener('click', () => {
    const isHidden = passInput.type === 'password';
    passInput.type = isHidden ? 'text' : 'password';
    toggleBtn.textContent = isHidden ? 'Ẩn' : 'Hiện';
  });
  // Thêm đoạn này: bấm "Đăng nhập" -> chuyển sang home.html
  document.querySelector('.btn-signin').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

if (username === "admin" && password === "123") {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
}
const loginBtn = document.getElementById("loginBtn");

if (localStorage.getItem("isLoggedIn") === "true") {
    loginBtn.textContent = "Tài khoản";
}