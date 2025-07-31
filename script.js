const products = [
  { id: 1, title: 'Sony ZX110', price: 1799, image: 'images/product1.webp', rating: 4 },
  { id: 2, title: 'boAt Rockerz 450', price: 1999, image: 'images/product2.webp', rating: 4.5 },
  { id: 3, title: 'JBL Tune 500BT', price: 2999, image: 'images/product3.webp', rating: 4.2 },
  { id: 4, title: 'Sennheiser HD 206', price: 2599, image: 'images/product4.webp', rating: 4 },
  { id: 5, title: 'Philips SHL5000', price: 1899, image: 'images/product5.webp', rating: 3.8 },
  { id: 6, title: 'Zebronics Zeb-Rush', price: 999, image: 'images/product6.webp', rating: 3.5 },
  { id: 7, title: 'Marshall Major IV', price: 7499, image: 'images/product7.webp', rating: 4.6 },
  { id: 8, title: 'ATH-M20x', price: 4299, image: 'images/product8.webp', rating: 4.4 },
  { id: 9, title: 'AKG K92', price: 3299, image: 'images/product9.webp', rating: 4.1 },
  { id: 10, title: 'Redragon Ares H120', price: 1499, image: 'images/product10.webp', rating: 3.9 },
];

const cart = [];

// === Render Products ===
function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <span class="wishlist-btn" data-id="${p.id}">🤍</span>
      <img src="${p.image}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p>₹${p.price}</p>
      <div class="rating">${'★'.repeat(Math.floor(p.rating))}☆ (${p.rating})</div>
      <button data-id="${p.id}">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}
renderProducts();

// === Wishlist ===
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('wishlist-btn')) {
    const id = e.target.dataset.id;
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(item => item !== id);
      e.target.classList.remove('active');
    } else {
      wishlist.push(id);
      e.target.classList.add('active');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
});

// === Open Modal on Add to Cart ===
document.getElementById('product-list').addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    document.getElementById('modal-title').innerText = product.title;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-description').innerText = 'High-quality sound for every listener.';
    document.getElementById('modal-qty').value = 1;
    document.getElementById('modal-add').dataset.id = id;
    document.getElementById('modal').style.display = 'flex';
  }
});

// === Add to Cart from Modal ===
document.getElementById('modal-add').addEventListener('click', () => {
  const id = parseInt(document.getElementById('modal-add').dataset.id);
  const qty = parseInt(document.getElementById('modal-qty').value);
  const product = products.find(p => p.id === id);
  const exists = cart.find(item => item.id === id);
  if (exists) {
    exists.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  document.getElementById('modal').style.display = 'none';
  updateCartIcon();
  renderCart();
  showToast();
});

// === Render Cart Items ===
function renderCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  cartItemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.qty * item.price;
    total += itemTotal;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div>
        <strong>${item.title}</strong><br>
        ₹${item.price} × 
        <button class="qty-btn" data-index="${index}" data-action="minus">−</button>
        ${item.qty}
        <button class="qty-btn" data-index="${index}" data-action="plus">+</button>
         = ₹${itemTotal}
      </div>
    `;
    cartItemsEl.appendChild(itemEl);
  });

  cartTotalEl.innerText = total;
}

// === Update Cart Icon ===
function updateCartIcon() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-icon').innerText = `🛒 ${totalItems}`;
}

// === Show Cart Summary Modal ===
document.getElementById('cart-icon').addEventListener('click', () => {
  document.getElementById('cart-summary').style.display = 'flex';
  renderCart();
});

// === Modal Close Buttons ===
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});
document.getElementById('cart-close').addEventListener('click', () => {
  document.getElementById('cart-summary').style.display = 'none';
});

// === Cart Quantity Update ===
document.getElementById('cart-items').addEventListener('click', function (e) {
  if (e.target.classList.contains('qty-btn')) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    if (action === 'plus') {
      cart[index].qty += 1;
    } else if (action === 'minus' && cart[index].qty > 1) {
      cart[index].qty -= 1;
    } else if (action === 'minus') {
      cart.splice(index, 1);
    }
    updateCartIcon();
    renderCart();
  }
});

// === Theme Toggle ===
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// === Toast Show ===
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1500);
}

// === Hamburger Menu Toggle ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('show');
});

