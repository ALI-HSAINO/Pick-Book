let deleteAll = document.querySelector(".cart-content .order-header span");
let ordersContainer = document.querySelector(".cart .cart-content .orders");
//? Start LocaLStorage To Display
//* PreviousPart In index.js
let displayingOrders = [];
if (window.localStorage.getItem("orders")) {
  displayingOrders = JSON.parse(window.localStorage.getItem("orders"));
  localStorageToArr(displayingOrders);
}
function localStorageToArr(arr) {
  arr.forEach((ele) => {
    let order = document.createElement("div");
    order.classList.add("order");
    let orderImg = document.createElement("img");
    orderImg.src = ele.orderImg;
    let orderName = document.createElement("p");
    orderName.textContent = ele.orderName;
    let orderPrice = document.createElement("span");
    orderPrice.classList.add("price");
    orderPrice.textContent = ele.orderPrice;
    ordersContainer.append(order);
    order.append(orderImg);
    order.append(orderName);
    order.append(orderPrice);
  });
}

deleteAll.addEventListener("click", () => {
  window.localStorage.clear();
  displayingOrders = [];
  ordersContainer.innerHTML = "";
});
//* PreviousPart In index.js
//? End LocaLStorage To Display
