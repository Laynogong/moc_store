function wireToggle(btnId, inputId) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  btn.addEventListener("click", () => {
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.textContent = isHidden ? "Ẩn" : "Hiện";
  });
}
wireToggle("toggleBtn1", "pass");
wireToggle("toggleBtn2", "pass2");

document.querySelector(".btn-signup").addEventListener("click", () => {
  // TODO: ở đây bạn có thể validate form / gọi API đăng ký trước
  window.location.href = "login.html";
});
