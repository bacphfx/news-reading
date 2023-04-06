"use strict";

// Khai báo biến
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const closeBtn = document.querySelectorAll(".close");

class Task {
  constructor(task, isDone) {
    this.task = task;
    this.isDone = isDone;
  }
}

// Lấy dữ liệu người dùng hiện tại từ storage
const currentUser = JSON.parse(getFromStorage("current-user"));
console.log(currentUser);
// Lấy dữ liệu todo của người dùng đang đăng nhập từ storage
const todoArr =
  JSON.parse(getFromStorage(`${currentUser.username}-todo`)) || [];
console.log(todoArr);

// Xử lý add button onclick
addBtn.addEventListener("click", function () {
  // Nếu người dùng chưa đăng nhập
  if (!currentUser) alert("Please log in!");
  // Người dùng đã đăng nhập
  else {
    let data = {
      task: taskInput.value,
      isDone: false,
    };
    // Kiểm tra dữ liệu
    // Nếu chưa nhập dữ liệu
    if (data.task === "") {
      alert("Please input task");
      return false;
    }
    // Nhập dữ liệu thành công
    let taskArr = new Task(data.task, data.isDone);
    todoArr.push(taskArr);
    saveToStorage(`${currentUser.username}-todo`, todoArr);
    renderTask();
    // Xóa dữ liệu trong ô nhập
    taskInput.value = "";
  }
});

// Hàm hiển thị dữ liệu
const renderTask = function () {
  let html = "";
  // Nếu dữ liệu trống
  if (todoArr.length === 0) todoList.innerHTML = html;
  // Nếu có dữ liệu
  else {
    todoArr.forEach((user) => {
      // Nếu task đã thực hiện
      if (user.isDone) {
        html += `<li class='checked' onclick=doneTask('${user.task}')>
        ${user.task}
        <span class="close" onclick=delTask('${user.task}')>×</span>
      </li>`;
      }
      // Nếu task chưa thực hiện
      else {
        html += `<li onclick=doneTask('${user.task}')>
        ${user.task}
        <span class="close" onclick=delTask('${user.task}')>×</span>
      </li>`;
      }
      // Hiển thị dữ liệu ra màn hình
      todoList.innerHTML = html;
    });
  }
};

// Hàm xóa task
const delTask = function (x) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < todoArr.length; i++) {
      if (x === todoArr[i].task) {
        todoArr.splice(i, 1);
        i--;
        saveToStorage(`${currentUser.username}-todo`, todoArr);
        renderTask();
      }
    }
  }
};

// Hàm đánh dấu task
const doneTask = function (x) {
  for (let i = 0; i < todoArr.length; i++) {
    // Tìm task trùng với nơi lick
    if (x === todoArr[i].task) {
      // Nếu task đã hoàn thành thì đổi thành chưa hoàn thành và ngược lại, sau đó hiển thị giao diện task tương ứng
      if (todoArr[i].isDone) {
        todoArr[i].isDone = false;
        saveToStorage(`${currentUser.username}-todo`, todoArr);
        renderTask();
        console.log(todoArr);
      } else {
        todoArr[i].isDone = true;
        saveToStorage(`${currentUser.username}-todo`, todoArr);
        renderTask();
        console.log(todoArr);
      }
    }
  }
};
window.onload = renderTask();
