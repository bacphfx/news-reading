"use strict";

// Khai báo biến
const submitBtn = document.getElementById("btn-submit");

// Xử lý submit button onclick
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu người dùng nhập vào
  let pageSize = document.getElementById("input-page-size").value;
  let category = document.getElementById("input-category").value;

  // Kiểm tra dữ liệu
  // Nếu chưa nhập pageSize
  if (pageSize === "") {
    alert("Please input News per page");
    return false;
  }
  // Dữ liệu hợp lệ, lưu vào storage
  saveToStorage("page-size", pageSize);
  saveToStorage("category", category);

  alert("Save setting successfully!");
  window.location.href = "../pages/news.html";
});
