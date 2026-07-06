
const HARDCODED_USERS = [
  {
    username: 'seller',
    password: 'seller123',
    role: 'seller',
    email: 'seller@weshop.id'
  },
  {
    username: 'buyer',
    password: 'buyer123',
    role: 'buyer',
    email: 'buyer@weshop.id'
  }
];


const STORAGE_KEYS = {
  cart: 'weshop_cart',
  currentUser: 'weshop_current_user',
  orders: 'weshop_orders',
  customProducts: 'weshop_custom_products'
};


function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)) || [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.innerText = count;
}


function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser)) || null;
}

function saveCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.location.href = 'login.html';
}

function checkSession() {
  const user = getCurrentUser();
  if (user) {
    window.currentUser = user;
    window.userProfile = user;
  } else {
    window.currentUser = null;
    window.userProfile = null;
  }
  updateNavAuth();
  updateCartCount();
}

function updateNavAuth() {
  const authMenu = document.getElementById('auth-menu');
  if (!authMenu) return;

  if (window.currentUser && window.userProfile) {
    const role = window.userProfile.role;
    let roleLink = '';
    if (role === 'seller') {
      roleLink = `<a href="dashboard-seller.html" class="bg-green-800 hover:bg-green-700 px-3 py-1 rounded text-sm font-semibold">Dashboard Penjual</a>`;
    }
    authMenu.innerHTML = `
      <a href="profile.html" class="hover:underline">Halo, ${window.userProfile.username}</a>
      ${roleLink}
      <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm ml-2">Logout</button>
    `;
  } else {
    authMenu.innerHTML = `<a href="login.html" class="bg-white text-green-700 px-4 py-1 rounded font-semibold hover:bg-gray-100">Login</a>`;
  }
}


function getOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.orders)) || [];
}

function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
}

function getCustomProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.customProducts)) || [];
}

function addCustomProduct(product) {
  const products = getCustomProducts();
  product.product_id = 'cust_' + Date.now();
  products.push(product);
  localStorage.setItem(STORAGE_KEYS.customProducts, JSON.stringify(products));
}


document.addEventListener('DOMContentLoaded', checkSession);