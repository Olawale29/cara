const firstEightproducts = products.slice(0, 8);
const secondEightproducts = products.slice(8, 16);
const section1 = document.querySelector(".products1");
const section2 = document.querySelector(".products2");
const shop = document.querySelector(".shops");
let coupon = document.getElementById("coupon");
let cartNumber = document.querySelectorAll(".cart-number");
let subtotal = document.querySelector(".subtotals");
const ship = document.querySelector(".ship");
const totalss = document.querySelector(".total");

//render products2
function renderProducts1() {
  firstEightproducts.forEach((product) => {
    if (section1 !== null) {
      section1.innerHTML += `<div class="col-lg-3 col-md-6 col-sm-12"  data-aos-duration="2000" data-aos="zoom-in"> 
      <div class="card pro">
        <a class="a-card" href="sproduct.html">
        <img
        class="product-image"
        src= "${product.imgSrc}"
        alt="${product.name}"
        />
        </a>
        <div class="card-body des">
        <h6 class="card-title">${product.name}</h6>
        <p class="fw-bold card-text">${product.description}</p>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div
        class="amount-cart d-flex justify-content-between align-center"
        >
        <h4>₦${product.price}</h4>
        <div class="cart" data-product-id="${product.id}" onclick="addToCart(${product.id})"
        ><i class="fa-solid fa-cart-shopping"></i
          ></div>
        </div>
      </div>
    </div>
  </div>
  `;
    }
  });
}
renderProducts1();

//render products2
function renderProducts2() {
  secondEightproducts.forEach((product) => {
    if (section2 !== null) {
      section2.innerHTML += `<div class="col-lg-3 col-md-6 col-sm-12"  data-aos-duration="2000" data-aos="zoom-in"> 
      <div class="card pro">
        <a class="a-card" href="sproduct.html">
        <img
        class="product-image"
        src= "${product.imgSrc}"
        alt="${product.name}"
        />
        </a>
        <div class="card-body des">
        <h6 class="card-title">${product.name}</h6>
        <p class="fw-bold card-text">${product.description}</p>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div
        class="amount-cart d-flex justify-content-between align-center"
        >
        <h4>₦${product.price}</h4>
        <div class="cart" onclick="addToCart(${product.id})"
        ><i class="fa-solid fa-cart-shopping"></i
          ></div>
        </div>
      </div>
    </div>
  </div>
  `;
    }
  });
}
renderProducts2();

//render shop products
function renderShopProducts() {
  products.forEach((product) => {
    if (shop !== null) {
      shop.innerHTML += `<div class="col-lg-3 col-md-6 col-sm-12"  data-aos-duration="2000" data-aos="zoom-in"> 
      <div class="card pro">
        <a class="a-card" href="sproduct.html">
        <img
        class="product-image"
        src= "${product.imgSrc}"
        alt="${product.name}"
        />
        </a>
        <div class="card-body des">
        <h6 class="card-title">${product.name}</h6>
        <p class="fw-bold card-text">${product.description}</p>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div
        class="amount-cart d-flex justify-content-between align-center"
        >
        <h4>₦${product.price}</h4>
        <div class="cart" onclick="addToCart(${product.id})"
        ><i class="fa-solid fa-cart-shopping"></i
          ></div>
        </div>
      </div>
    </div>
  </div>
  `;
    }
  });
}
renderShopProducts();

// localStorage.clear()

let cartCount = localStorage.getItem("cartCount") || 0;
updatedCartCount();

//add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const selectedProduct = products.find((product) => product.id === id);
  if (selectedProduct) {
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // selectedProduct.instock--;
    // updateStock(id, selectedProduct.instock)
    alert("Product added to cart");
    cartCount = cart.length;
    localStorage.setItem("cartCount", cartCount);
    updatedCartCount();
  } else {
    console.error("Product not found");
  }
}

//display cart
function displayCart() {
  const empty = document.querySelector(".empty");
  const cartHeader = document.getElementById("cart-header");
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartContainer) {
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
      const row = document.createElement("tr");
      let subtotal = product.price * product.quantity;
      let shipping = product.shipping;
      if (shipping === "Free") {
        shipping = "Free";
      } else {
        shipping = `₦${product.shipping}`;
      }
      let twoDecimal = subtotal.toFixed(2);
      row.innerHTML = `
        <td><a onclick="removeFromCart(${product.id})" class="" href="#"><i class="fa-solid fa-circle-xmark"></i></a></td>
        <td><img class="product-image" src="${product.imgSrc}" alt=""></td>
        <td>${product.description}</td>
        <td>₦${product.price}</td>
        <td><input type="number" value ="${product.quantity}"  onchange="updateQuantity(${product.id}, this.value)"></td>
        <td>₦${twoDecimal}</td>
        <td>${shipping}</td>
      `;
      cartContainer.appendChild(row);
      sub();
      shipings();
      totals();
    });
  }

  if (cart.length === 0 && empty !== null) {
    empty.innerHTML = "Your cart is empty";
    coupon.style.display = "none";
    cartContainer.innerHTML = "";
    cartHeader.innerHTML = "";
  }
}
//remove from carts
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((product) => product.id !== id);
  console.log(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  cartCount = updatedCart.length;
  localStorage.setItem("cartCount", cartCount);
  updatedCartCount();
  displayCart();
}

function updatedCartCount() {
  if (cartNumber) {
    cartNumber.forEach((element) => {
      element.innerHTML = cartCount;
    });
  }
}

//update quantity
function updateQuantity(id, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productToUpdate = cart.find((product) => product.id === id);

  if (productToUpdate) {
    // Check if the new quantity exceeds the available stock
    if (parseInt(newQuantity, 10) > productToUpdate.instock) {
      alert("Sorry, the quantity exceeds available stock.");
    } else {
      // Update the quantity of the found product with the new quantity
      productToUpdate.quantity = parseInt(newQuantity, 10);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart(); // Update the displayed cart after updating the quantity
    }
  }
}

//subtotal
function sub() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let sum = 0;
  cart.forEach((product) => {
    const subtotals = product.price * product.quantity;
    let twoD = subtotals.toFixed(2);
    sum += parseFloat(twoD);
    if (subtotal !== null) {
      subtotal.innerHTML = `₦${sum.toFixed(2)}`;
    }
  });
}

//shipping
function shipings() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let sum = 0;

  cart.forEach((product) => {
    let shipTotal = product.shipping;
    if (shipTotal === "Free") {
      // If shipping is free, no need to add to sum here
    } else if (typeof shipTotal === "number") {
      sum += parseFloat(shipTotal);
    } else if (typeof shipTotal === "string") {
      let numbers = shipTotal.match(/\d+/g);
      if (numbers) {
        let digit = numbers.map(Number);
        let total = digit.reduce((acc, curr) => acc + curr, 0);
        sum += total;
      }
    }
  });

  // Set ship.innerHTML after the loop is complete
  ship.innerHTML = `₦${sum.toFixed(2)}`;
}

//total
function totals() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach((product) => {
    const CartTotal = product.price * product.quantity;
    const cartToTwoDecimal = parseFloat(CartTotal.toFixed(2));
    const shippingTotal = product.shipping;

    if (shippingTotal === "Free") {
      total += cartToTwoDecimal;
    } else if (
      typeof shippingTotal === "number" ||
      /^\d+(\.\d+)?$/.test(shippingTotal)
    ) {
      total += cartToTwoDecimal + parseFloat(shippingTotal);
    } else {
      console.error("Invalid shippingTotal:", shippingTotal);
    }
  });

  if (!isNaN(total) && totalss !== null) {
    totalss.innerHTML = `₦${total.toFixed(2)}`;
  } else {
    console.error("Total is not a valid number:", total);
  }

  return total;
}

localStorage.setItem("products", JSON.stringify(products));

const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

function searchProducts(query) {
  const filteredProducts = storedProducts.filter(
    (product) =>
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.name.toLowerCase().includes(query.toLowerCase())
  );
  return filteredProducts;
}

displayCart();

document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector(".search-input");
  if (search) {
    search.addEventListener("input", function () {
      const query = search.value.trim();
      renderSearchedProducts(query);
    });
  }

  function renderSearchedProducts(query) {
    const searchResults = searchProducts(query);

    section1.innerHTML = "";
    section2.innerHTML = "";

    searchResults.forEach((product) => {
      const productHtml = `<div class="col-lg-3 col-md-6 col-sm-12"  data-aos-duration="2000" data-aos="zoom-in"> 
      <div class="card pro">
        <a class="a-card" href="sproduct.html">
        <img
        class="product-image"
        src= "${product.imgSrc}"
        alt="${product.name}"
        />
        </a>
        <div class="card-body des">
        <h6 class="card-title">${product.name}</h6>
        <p class="fw-bold card-text">${product.description}</p>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div
        class="amount-cart d-flex justify-content-between align-center"
        >
        <h4>₦${product.price}</h4>
        <div class="cart" data-product-id="${product.id}" onclick="addToCart(${product.id})"
        ><i class="fa-solid fa-cart-shopping"></i
          ></div>
        </div>
      </div>
    </div>
  </div>
  `;

      if (section1 !== null) {
        section1.innerHTML += productHtml;
      } else if (section2 !== null) {
        section2.innerHTML += productHtml;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector(".search-input");
  if (search) {
    search.addEventListener("input", function () {
      const query = search.value.trim();
      renderSearchedShopProducts(query);
    });
  }

  function renderSearchedShopProducts(query) {
    const searchResults = searchProducts(query);

    shop.innerHTML = "";

    searchResults.forEach((product) => {
      const productHtml = `<div class="col-lg-3 col-md-6 col-sm-12"  data-aos-duration="2000" data-aos="zoom-in"> 
        <div class="card pro">
          <a class="a-card" href="sproduct.html">
            <img class="product-image" src="${product.imgSrc}" alt="${product.name}" />
          </a>
          <div class="card-body des">
            <h6 class="card-title">${product.name}</h6>
            <p class="fw-bold card-text">${product.description}</p>
            <div class="star">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <div class="amount-cart d-flex justify-content-between align-center">
              <h4>₦${product.price}</h4>
              <div class="cart" data-product-id="${product.id}" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          </div>
        </div>
      </div>`;

      if (shop !== null) {
        shop.innerHTML += productHtml;
      }
    });
  }
});
