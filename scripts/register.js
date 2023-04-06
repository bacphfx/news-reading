"use strict";

// Khai báo biến
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");

const submitBtn = document.getElementById("btn-submit");

// Lấy dữ liệu mảng người dùng từ storage
const KEY = "user-array";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
console.log(userArr);

// Xử lý Event hanler khi click vào submit
submitBtn.addEventListener("click", function () {
  //Lấy dữ liệu người dùng nhập vào
  let data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value,
  };

  // Kiểm tra dữ liệu
  if (data.firstName === "") {
    alert("Please input First Name");
    return false;
  }
  if (data.lastName === "") {
    alert("Please input Last Name");
    return false;
  }
  if (data.username === "") {
    alert("Please input Username");
    return false;
  }
  for (let i = 0; i < userArr.length; i++) {
    if (data.username === userArr[i].username) {
      alert("This username already exists");
      return false;
    }
  }
  if (data.password === "") {
    alert("Please input Password");
    return false;
  } else if (data.password.length <= 8) {
    alert("Password must be more than 8 characters");
    return false;
  }
  if (data.confirmPassword != data.password) {
    alert("Re-enter incorrect password");
    return false;
  }

  // Nếu dữ liệu hợp lệ
  let userData = new userCl(
    `${data.firstName}`,
    `${data.lastName}`,
    `${data.username}`,
    `${data.password}`
  );
  userArr.push(userData);
  alert("Successful account creation, click OK to go to the login page");
  window.location.href = "../pages/login.html";
  console.log(userArr);
  // Lưu người dùng vừa đăng ký vào storage
  saveToStorage(KEY, userArr);
});
