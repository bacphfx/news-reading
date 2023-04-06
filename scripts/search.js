"use strict";

// Khai báo biến
const searchInput = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");

const apiKey = "756cd85ac4dc45e185e27ef202194bb0";
let pageNum = "1";
const pageSize = 10;
document.getElementById("page-num").innerHTML = pageNum;

// Xử lý sự kiện khi ấn nút tìm kiếm
searchBtn.addEventListener("click", function () {
  // Kiểm tra dữ liệu người dùng nhập vào
  let searchData = searchInput.value;
  // Nếu nhập thiếu
  if (searchData === "") {
    {
      alert("Please input data you want to search!");
      return false;
    }
  }
  // Nhập thành công
  else {
    // Hàm lấy dữ liệu từ newsapi
    const getNewsData = async function (pageNum) {
      let res = await fetch(
        `https://newsapi.org/v2/everything?q=${searchData}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`
      );
      let data = await res.json();
      let articles = data.articles;
      console.log(data);
      pageNav(pageNum, data.totalResults, pageSize);
      renderNews(articles, data);
    };
    getNewsData(pageNum);

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
    const renderNews = function (art, data) {
      newsContainer.innerHTML = "";
      let html = "";
      // Nếu kết quả tìm kiếm = 0
      if (data.totalResults === 0) {
        html = "No result!";
      }
      // Nếu tìm thấy kết quả
      else {
        for (let i = 0; i < art.length; i++) {
          html += `<article>
            <figure class="left-column" >
            <img class="img-new" src="${art[i].urlToImage}" />
            </figure>
            <figure class="right-column">
              <h2>${art[i].title}</h2>
              <p>${art[i].description}</p>
              <a class="btn-view" href="${art[i].url}" target="_blank">View</a>
            </figure>
          </article>`;
        }
      }
      newsContainer.innerHTML = html;
    };

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
  }
});
