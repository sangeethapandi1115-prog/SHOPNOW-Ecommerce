let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
document.querySelectorAll(".add-to-cart").forEach(btn=>{
  btn.addEventListener("click",()=>{

    let name = btn.dataset.name;
    let price = parseInt(btn.dataset.price);
    let img = btn.dataset.img;

    let item = cart.find(p => p.name === name);

    if(item){
      item.qty += 1;
    }else{
      cart.push({
        name:name,
        price:price,
        img:img,
        qty:1
      });
    }

    localStorage.setItem("cart",JSON.stringify(cart));
    displayCart();
    alert("Added to cart ✅");
  });
});

/* DISPLAY CART */
function displayCart(){
  let cartBox = document.getElementById("cart-items");
  let totalBox = document.getElementById("grand-total");

  if(!cartBox) return;

  cartBox.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item,i)=>{
    let total = item.price * item.qty;
    grandTotal += total;

    cartBox.innerHTML += `
      <tr>
        <td><img src="${item.img}" width="60"></td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.qty}"
          onchange="updateQty(${i},this.value)">
        </td>
        <td>₹${total}</td>
        <td>
          <button class="btn btn-danger btn-sm"
          onclick="removeItem(${i})">X</button>
        </td>
      </tr>
    `;
  });

  totalBox.innerText = grandTotal;
}

/* UPDATE QTY */
function updateQty(i,qty){
  cart[i].qty = parseInt(qty);
  localStorage.setItem("cart",JSON.stringify(cart));
  displayCart();
}

/* REMOVE ITEM */
function removeItem(i){
  cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  displayCart();
}

displayCart();
/* SHOW CHECKOUT SUMMARY */
function showCheckout(){
  let summary = document.getElementById("order-summary");
  let totalBox = document.getElementById("checkout-total");

  if(!summary) return;

  summary.innerHTML = "";
  let total = 0;

  cart.forEach(item=>{
    let price = item.price * item.qty;
    total += price;

    summary.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${item.name} (x${item.qty})
        <span>₹${price}</span>
      </li>
    `;
  });

  totalBox.innerText = total;
}

/* PLACE ORDER */
function placeOrder(){

  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;

  if(name === "" || address === ""){
    alert("Please fill shipping details ❌");
    return;
  }

  alert("Order placed successfully 🎉");

  /* ✅ CLEAR CART */
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
  showCheckout();

  /* ✅ CLEAR SHIPPING DETAILS */
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
  document.getElementById("city").value = "";
  document.getElementById("pincode").value = "";
}
function submitContact(){
  let name = document.getElementById("cname").value;
  let email = document.getElementById("cemail").value;
  let msg = document.getElementById("cmessage").value;

  if(name === "" || email === "" || msg === ""){
    alert("Please fill all fields ❌");
    return false;
  }

  alert("Message sent successfully ✅");

  document.getElementById("cname").value = "";
  document.getElementById("cemail").value = "";
  document.getElementById("csubject").value = "";
  document.getElementById("cmessage").value = "";

  return false;
}
function loginUser(){
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  if(email === "" || password === ""){
    alert("Please fill all fields ❌");
    return;
  }

  let username = email.split("@")[0];

  // save login
  localStorage.setItem("username", username);

  alert("Login successful ✅");

  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";

  let modal = bootstrap.Modal.getInstance(
    document.getElementById("loginModal")
  );
  modal.hide();

  showUsername();
}
function showUsername(){
  let user = localStorage.getItem("username");
  let userBox = document.getElementById("user-name");
  let loginBtn = document.getElementById("loginBtn");

  if(user){
    userBox.innerText = "Hi, " + user;
    loginBtn.style.display = "none";
  }
}

// page load-la call
showUsername();
function showUsername(){
  let user = localStorage.getItem("username");
  let userBox = document.getElementById("user-name");
  let loginBtn = document.getElementById("loginBtn");
  let logoutBtn = document.getElementById("logoutBtn");

  if(user){
    userBox.innerText = "Hi, " + user;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }else{
    userBox.innerText = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

// page load
showUsername();
function logoutUser(){
  localStorage.removeItem("username");

  document.getElementById("user-name").innerText = "";
  document.getElementById("loginBtn").style.display = "inline-block";
  document.getElementById("logoutBtn").style.display = "none";

  alert("Logged out successfully 👋");
}

function scrollToTop(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.onscroll = function(){
  let btn = document.getElementById("topBtn");
  btn.style.display = window.scrollY > 300 ? "block" : "none";
};
