"use strict";

// Khai báo các biến
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");

const apiKey = "756cd85ac4dc45e185e27ef202194bb0";

// Lấy dữ liệu từ setting, nếu chưa setting thì mặc định là 10 bài/trang, chủ đề là general
const pageSize = JSON.parse(getFromStorage("page-size")) || "10";
const category = JSON.parse(getFromStorage("category")) || "general";

let pageNum = "1";
document.getElementById("page-num").innerHTML = pageNum;

// Hàm lấy dữ liệu từ newsapi
const getNewsData = async function (pageNum) {
  let res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`
  );
  let data = await res.json();
  let articles = data.articles;
  pageNav(pageNum, data.totalResults, pageSize);
  renderNews(articles);
};

// Hàm xử lý hiển thị previous-next button
function pageNav(page, totalResults, pageSize) {
  let maxPage =
    totalResults % pageSize === 0
      ? totalResults / pageSize
      : Math.floor(totalResults / pageSize) + 1;
  if (totalResults <= pageSize) {
    nextBtn.setAttribute("style", "display:none");
    prevBtn.setAttribute("style", "display:none");
  } else if (page == 1) {
    prevBtn.setAttribute("style", "display:none");
    nextBtn.removeAttribute("style");
  } else if (page < maxPage) {
    prevBtn.removeAttribute("style");
    nextBtn.removeAttribute("style");
  } else if (page >= maxPage) {
    nextBtn.setAttribute("style", "display:none");
  }
}

// Hàm hiển thị bài báo
const renderNews = function (x) {
  newsContainer.innerHTML = "";
  let html = "";
  for (let i = 0; i < x.length; i++) {
    html += `<article>
      <figure class="left-column" >
      <img class="img-new" src="${x[i].urlToImage}" />
      </figure>
      <figure class="right-column">
        <h2>${x[i].title}</h2>
        <p>${x[i].description}</p>
        <a class="btn-view" href="${x[i].url}" target="_blank">View</a>
      </figure>
    </article>`;
  }
  newsContainer.innerHTML = html;
};

// Load trang lần đầu
window.onload = getNewsData(pageNum);

// Next button onclick
nextBtn.addEventListener("click", function () {
  pageNum++;
  document.getElementById("page-num").innerHTML = pageNum;
  getNewsData(pageNum);
});

// previous button onlick
prevBtn.addEventListener("click", function () {
  pageNum--;
  document.getElementById("page-num").innerHTML = pageNum;
  getNewsData(pageNum);
});
