//? Start Header Logic
let icon = document.querySelector("header .header > .icon");
let menu = document.querySelector("header .menu ");
let header = document.querySelector("#header");
icon.onclick = function () {
  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    icon.style.transform = "rotate(0deg)";
    icon.style.color = "#0099ff";
  } else {
    menu.classList.add("show");
    icon.style.transform = "rotate(90deg)";
    icon.style.color = "#005792";
  }
};
//? End Header Logic
//? Start Most Rated
let next = document.querySelector(
  ".carousel .carousel-control > .fa-angles-right"
);
let previous = document.querySelector(
  ".carousel .carousel-control > .fa-angles-left"
);
let slides = document.querySelectorAll(".carousel .carousel-content .slide");
let slidePosition = 0;
next.onclick = function () {
  moveNext();
};
previous.onclick = function () {
  movePrevious();
};
function moveNext() {
  if (slidePosition === slides.length - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updatePos();
}
function movePrevious() {
  if (slidePosition === 0) {
    slidePosition = slides.length - 1;
  } else {
    slidePosition--;
  }
  updatePos();
}
function updatePos() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("slide-show");
    slides[i].style.zIndex = 3;
  }
  slides[slidePosition].classList.add("slide-show");
  slides[slidePosition].style.zIndex = 4;
}
let buttonOrder = document.querySelector(".pick-book .content .order > button");
let ordered = document.querySelector(".pick-book .content .order .ordered");
console.log(buttonOrder);
console.log(ordered);

buttonOrder.addEventListener("click", () => {
  ordered.classList.remove("unactive");
  setTimeout(() => {
    ordered.classList.add("active");
  }, 200);
  setTimeout(() => {
    ordered.classList.remove("active");
  }, 5000);
  setTimeout(() => {
    ordered.classList.remove("unactive");
  }, 5500);
});
//? End Most Rated
//? Start Welcome Logic
let pickButton = document.querySelector(".welcome .welcome-text button");
let welcomePic = document.querySelector(".welcome .welcome-img > img");

pickButton.onmouseenter = function () {
  welcomePic.style.filter = "grayscale(0%)";
};
pickButton.onmouseout = function () {
  welcomePic.style.filter = "grayscale(100%)";
};
//? End Welcome Logic
//? Start Most Read logic
let readButtons = [...document.querySelector(".most-read .catag").children];
let readSections = [...document.querySelector(".most-read .content").children];
let mostButton = document.querySelector(".most-read > button");
readButtons.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    readButtons.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
    readSections.forEach((ele) => {
      ele.classList.remove("active");
      if (e.target.dataset.cata === ele.dataset.cata) {
        ele.classList.add("active");
      }
    });
  });
});
mostButton.addEventListener("click", () => {
  if (mostButton.classList.contains("active")) {
    readButtons.forEach((ele) => {
      ele.classList.remove("active");
    });
    readSections.forEach((ele) => {
      ele.classList.remove("active");
    });
    mostButton.classList.remove("active");
    mostButton.textContent = "See More!";
    window.scrollTo({
      top: 1600,
      left: 0,
      behavior: "smooth",
    });
  } else {
    readButtons.forEach((ele) => {
      ele.classList.add("active");
    });
    readSections.forEach((ele) => {
      ele.classList.add("active");
    });
    mostButton.classList.add("active");
    mostButton.textContent = "See Less!";
  }
});
//? End Most Read logic
//? Start Soon Logic
let soonBook = [...document.querySelectorAll(".soon-book")];
let preOrderButton = [
  ...document.querySelectorAll(".soon .soon-books .soon-book .join button"),
];
let preOrdered = [
  ...document.querySelectorAll(
    ".soon .soon-books .soon-book .join .pre-ordered"
  ),
];
soonBook.forEach((ele) => {
  ele.addEventListener("click", () => {
    soonBook.forEach((ele) => {
      ele.classList.add("active");
    });
    ele.classList.remove("active");
  });
});
preOrderButton.forEach((eleB) => {
  eleB.addEventListener("click", () => {
    preOrdered.forEach((ele) => {
      if (eleB.dataset.soon === ele.dataset.soon) {
        basicText = ele.innerHTML;
        ele.innerHTML = `<p class = "title">${ele.parentElement.parentElement.children[1].children[0].textContent}</p>  ${basicText}`;
        ele.classList.remove("unactive");
        setTimeout(() => {
          ele.classList.add("active");
        }, 200);
        let closePreOrdered = [...document.querySelectorAll("span.close")];
        closePreOrdered.forEach((eleC) => {
          if (eleB.dataset.soon === eleC.dataset.soon) {
            eleC.addEventListener("click", (e) => {
              if (e.target.parentElement == eleC) {
                ele.classList.remove("active");
                setTimeout(() => {
                  ele.classList.add("unactive");
                }, 200);
                setTimeout(() => {
                  ele.innerHTML = `${basicText}`;
                }, 300);
                e.stopPropagation();
              }
            });
          }
        });
      }
    });
  });
});
//? End Soon Logic
//? Start pickBook To LocalStorage
//* Continued In cart.js
let orders = [];
buttonOrder.addEventListener("click", () => {
  pushToOrders(slides, "slide-show", orders);
});
function pushToOrders(books, requiredClass, arr) {
  books.forEach((ele) => {
    if (ele.classList.contains(requiredClass)) {
      let order = {
        orderId: Date.now(),
        orderPrice: ele.dataset.price,
        orderImg: ele.children[0].src,
        orderName: ele.children[2].textContent,
        orderStatus: false,
      };
      if (!window.localStorage.getItem("orders")) {
        let flag1 = arr.some((e) => e.orderName == order.orderName);
        if (flag1 == false) {
          arr.push(order);
        }
      } else {
        arr = JSON.parse(window.localStorage.getItem("orders"));
        let flag2 = arr.some((e) => e.orderName == order.orderName);
        if (flag2 == false) {
          arr.push(order);
        }
      }
    }
  });
  arrToLocalStorage(arr, "orders");
}
function arrToLocalStorage(arr, key) {
  window.localStorage.setItem(key, JSON.stringify(arr));
}
//* Continued In cart.js
//? End pickBook To LocalStorage
