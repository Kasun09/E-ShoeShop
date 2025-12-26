// ===== PRODUCT DATA =====
const products = [
    { id: 1, name: "Air Nitro Red", category: "men", price: 160, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", featured: true, salePrice: 129 },
    { id: 2, name: "Cloudfoam Lifestyle", category: "women", price: 120, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600", featured: true },
    { id: 3, name: "Street Retro High", category: "child", price: 90, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600" },
    { id: 4, name: "Minimalist Pure White", category: "men", price: 110, img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600", featured: true },
    { id: 5, name: "Midnight Stealth", category: "men", price: 195, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
    { id: 6, name: "Zenith Runner", category: "women", price: 140, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600" },
    { id: 7, name: "Urban Edge", category: "women", price: 130, img: "https://images.unsplash.com/photo-1512374382149-4332c6c021f1?w=600" },
    { id: 8, name: "Junior Spark", category: "child", price: 65, img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600" },
    { id: 9, name: "Velocity Pro", category: "men", price: 175, img: "https://images.unsplash.com/photo-1520975913670-6f8b4a4f7c8f?w=600", salePrice: 149 },
    { id: 10, name: "Luxe Court", category: "women", price: 150, img: "https://images.unsplash.com/photo-1536305030019-3d91e7e84a2a?w=600" },
    { id: 11, name: "Trail Seeker", category: "men", price: 170, img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=600" },
    { id: 12, name: "Breeze Slip-On", category: "women", price: 95, img: "https://images.unsplash.com/photo-1523381218650-83d6b0b1d6b1?w=600" },
    { id: 13, name: "Mini Runner", category: "child", price: 55, img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600" },
    { id: 14, name: "Court Classic", category: "men", price: 125, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
    { id: 15, name: "Floral Daydream", category: "women", price: 110, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600", featured: true, salePrice: 85 },
    { id: 16, name: "Playtime Pro", category: "child", price: 70, img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=600" }
];

// ===== SLIDER VARIABLES =====
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoPlay = null;
if (slides.length > 0) {
    autoPlay = setInterval(() => changeSlide(1), 6000);
}

// ===== SLIDER FUNCTIONS =====
function showSlide(n) {
    if (!slides || slides.length === 0) return;
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function changeSlide(step) {
    resetTimer();
    if (slides.length > 0) showSlide(slideIndex + step);
}

function currentSlide(index) {
    resetTimer();
    if (slides.length > 0) showSlide(index);
}

function resetTimer() {
    if (autoPlay) clearInterval(autoPlay);
    if (slides.length > 0) autoPlay = setInterval(() => changeSlide(1), 6000);
}

// ===== PRODUCT RENDERING & FILTERING =====
let currentCategory = 'all';
let favorites = [];

let maxPrice = Infinity;

function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid') || document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = products.filter(p => {
        const matchCat = filter === 'all' || p.category === filter;
        const matchPrice = p.price <= maxPrice;
        return matchCat && matchPrice;
    });

    // update item count if present (shop page)
    const itemCount = document.getElementById('itemCount');
    if (itemCount) itemCount.innerText = `${filtered.length} Premium items found`;

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <button class="fav-btn" onclick="toggleFavorite(this, ${product.id})">
                <i data-lucide="heart"></i>
            </button>
            <div class="card-img-container" onclick="openProductDetail(${product.id})">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="product-info">
                <p>${product.category.toUpperCase()}</p>
                <h4>${product.name}</h4>
                <span class="price">${product.salePrice ? `<span class=\"sale\">$${product.salePrice}</span> <del>$${product.price}</del>` : `$${product.price}`}</span>
            </div>
        `;
        grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
}

// helper to create a product card element (used for multiple grids)
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <button class="fav-btn" onclick="toggleFavorite(this, ${product.id})">
            <i data-lucide="heart"></i>
        </button>
        <div class="card-img-container" onclick="openProductDetail(${product.id})">
            <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-info">
            <p>${product.category.toUpperCase()}</p>
            <h4>${product.name}</h4>
            <span class="price">${product.salePrice ? `<span class=\\"sale\\">$${product.salePrice}</span> <del>$${product.price}</del>` : `$${product.price}`}</span>
        </div>
    `;
    return card;
}

// Render featured / discounted items on the homepage only
function renderHomeFeatured() {
    const collectionGrid = document.getElementById('product-grid');
    const arrivalsGrid = document.getElementById('new-arrivals-grid');
    const featured = products.filter(p => p.featured || p.salePrice).slice(0, 6);

    if (collectionGrid) {
        collectionGrid.innerHTML = '';
        featured.forEach(p => collectionGrid.appendChild(createProductCard(p)));
    }
    if (arrivalsGrid) {
        arrivalsGrid.innerHTML = '';
        featured.forEach(p => arrivalsGrid.appendChild(createProductCard(p)));
    }
    if (window.lucide) lucide.createIcons();
}

// Provide filterCategory wrapper used by shop.html buttons
function filterCategory(cat) {
    currentCategory = cat;
    const categoryTitle = document.getElementById('categoryTitle');
    if (categoryTitle) categoryTitle.innerText = cat === 'all' ? 'All Collections' : `${cat} releases`;

    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.getElementById(`btn-${cat}`);
    if (btn) btn.classList.add('active');

    renderProducts(cat);
}

// Price range listener (only if present on shop page)
const priceRangeEl = document.getElementById('priceRange');
if (priceRangeEl) {
    priceRangeEl.addEventListener('input', (e) => {
        maxPrice = Number(e.target.value) || Infinity;
        const priceLabel = document.getElementById('priceLabel');
        if (priceLabel) priceLabel.innerText = maxPrice;
        renderProducts(currentCategory);
    });
}

function filterProducts(cat) {
    currentCategory = cat;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const activeTab = Array.from(document.querySelectorAll('.tab')).find(t => t.textContent.toLowerCase() === cat);
    if (activeTab) activeTab.classList.add('active');
    renderProducts(cat);
}

function toggleFavorite(btn, id) {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        if (!favorites.includes(id)) favorites.push(id);
    } else {
        favorites = favorites.filter(favId => favId !== id);
    }
}

function toggleFavoriteById(id) {
    if (!favorites.includes(id)) favorites.push(id);
    else favorites = favorites.filter(favId => favId !== id);
    // update any fav buttons on page
    document.querySelectorAll('.product-card').forEach(card => {
        const btn = card.querySelector('.fav-btn');
        const onclick = btn ? btn.getAttribute('onclick') : null;
        if (onclick && onclick.includes(`${id}`)) {
            if (favorites.includes(id)) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });
}

// ===== MODAL FUNCTIONS =====
const modal = document.getElementById('product-modal');

let currentProductId = null;
let selectedSize = null;

function openProductDetail(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod || !modal) return;
    currentProductId = productId;
    selectedSize = null;
    document.getElementById('modal-title').innerText = prod.name;
    const priceEl = document.getElementById('modal-price');
    if (prod.salePrice) {
        priceEl.innerHTML = `<span class="sale">$${prod.salePrice}</span> <del>$${prod.price}</del>`;
    } else {
        priceEl.innerText = `$${prod.price}`;
    }
    document.getElementById('modal-image').src = prod.img;

    // sizes: mark none selected
    const sizeBtns = modal.querySelectorAll('.sizes button');
    sizeBtns.forEach(b => {
        b.classList.remove('active');
        b.onclick = () => {
            sizeBtns.forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            selectedSize = b.innerText;
        };
    });

    // wishlist button in modal
    const wishlistBtn = modal.querySelector('.wishlist');
    if (wishlistBtn) {
        wishlistBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavoriteById(currentProductId);
            wishlistBtn.classList.toggle('active');
        };
        wishlistBtn.classList.toggle('active', favorites.includes(currentProductId));
    }

    // show modal
    modal.style.display = 'block';
}

const closeModal = document.querySelector('.close-modal');
if (closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
}

// close modal on outside click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

// ===== CART FUNCTIONALITY =====
let cartCount = 0;


function addToCart(e) {
    e.stopPropagation();
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
}

// ===== NEWSLETTER SUBSCRIPTION =====
const subscribeBtn = document.querySelector('.sub-box button');
const emailInput = document.querySelector('.sub-box input');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', () => {
        if (emailInput.value.includes('@')) {
            subscribeBtn.innerText = "Check your Email!";
            subscribeBtn.style.background = "#22c55e";
            emailInput.value = "";

            setTimeout(() => {
                subscribeBtn.innerText = "Join";
                subscribeBtn.style.background = "#111";
            }, 3000);
        } else {
            alert("Please enter a valid email address.");
        }
    });
}

// ===== FOOTER SCROLL REVEAL =====
const footerElement = document.querySelector('footer');
if (footerElement) {
    footerElement.style.opacity = "0";
    footerElement.style.transform = "translateY(20px)";
    footerElement.style.transition = "all 0.8s ease-out";

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    footerObserver.observe(footerElement);
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const themeIcon = document.getElementById('theme-icon');

function updateThemeUI(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    }
    if (window.lucide) lucide.createIcons();
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    updateThemeUI(true);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeUI(isDark);
    });
}

// ===== UI/UX MOTION ENHANCEMENTS =====
const revealItems = document.querySelectorAll('.product-card, .category-card, .newsletter, .section-header');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

function staggerCards() {
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });
}
staggerCards();

document.querySelectorAll('button, .btn-shop-link').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.96)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
});

const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    modalContent.classList.add('motion-modal');
}

// ===== INITIALIZE =====
if (window.lucide) {
    lucide.createIcons();
}

window.addEventListener('load', () => {
    // If a category query is present (from Explore links), apply it
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const path = window.location.pathname.toLowerCase();
    const isIndex = path.endsWith('/') || path.endsWith('/index.html') || path.includes('index.html');
    if (isIndex) {
        renderHomeFeatured();
    } else if (cat && (cat === 'men' || cat === 'women' || cat === 'child')) {
        filterProducts(cat);
    } else {
        renderProducts('all');
    }
    if (window.lucide) lucide.createIcons();

    // Bind add-to-cart inside modal (ensure binding works on both pages)
    const addToCartBtnLocal = document.querySelector('.add-to-cart');
    if (addToCartBtnLocal) {
        addToCartBtnLocal.onclick = (e) => {
            e.stopPropagation();
            if (!currentProductId) return alert('No product selected.');
            const prod = products.find(p => p.id === currentProductId);
            cartCount++;
            const cartCountEl = document.getElementById('cart-count');
            if (cartCountEl) cartCountEl.innerText = cartCount;
            alert(`Added to cart: ${prod.name}${selectedSize ? ' (Size ' + selectedSize + ')' : ''}`);
            const modalEl = document.getElementById('product-modal');
            if (modalEl) modalEl.style.display = 'none';
        };
    }
});
