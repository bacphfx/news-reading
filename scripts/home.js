"use strict";

// Khai báo biến
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

// Lấy người dùng đang đăng nhập từ storage
const KEY = "current-user";
const currentUser = JSON.parse(getFromStorage(KEY));

console.log(currentUser);

// Hiển thị giao diện theo trạng thái người dùng
// Nếu chưa đăng nhập
if (!currentUser) {
  mainContent.remove();
  console.log("no user");
}
// Nếu đã đăng nhập
else {
  loginModal.remove();
  console.log("user logged in");
  welcomeMessage.innerHTML = `Welcome ${currentUser.firstName}!`;
}

// Xử lý khi ấn log out
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem(KEY);
  window.location.reload(true);
});
