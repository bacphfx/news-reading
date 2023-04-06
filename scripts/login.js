"use strict";
// Khai báo biến
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

const loginBtn = document.getElementById("btn-submit");

let currentUser;

// Lấy dữ liệu mảng người dùng đã đăng ký
const KEY = "user-array";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);

// Xử lý khi ấn log in
loginBtn.addEventListener("click", function () {
  // Valide dữ liệu
  // Thiếu username
  if (usernameInput.value === "") {
    alert("Please input username");
    return false;
  }
  // Thiếu password
  if (passwordInput.value === "") {
    alert("Please input password");
    return false;
  }
  // Sai mật khẩu
  for (let i = 0; i < userArr.length; i++) {
    if (
      usernameInput.value === userArr[i].username &&
      passwordInput.value !== userArr[i].password
    ) {
      alert("Wrong password!");
      return false;
    }
  }
  // Tìm người dùng nhập so sánh với trong useArr
  currentUser = userArr.find(
    (user) =>
      user.username === usernameInput.value &&
      user.password === passwordInput.value
  );
  // Nếu username không tồn tại
  if (!currentUser) {
    alert("This username does not exists!");
    return false;
  }
  // Đăng nhập thành công
  else {
    alert("Logged in successfully");
    saveToStorage("current-user", currentUser);
    console.log(currentUser);
    window.location.href = "../index.html";
  }
});
