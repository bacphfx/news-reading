"use strict";

// Hàm lưu dữ liệu vào storage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// Hàm lấy dữ liệu từ storage
const getFromStorage = function (key) {
  return localStorage.getItem(key);
};

// localStorage.clear();
