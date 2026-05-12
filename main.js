
const PRODUCTS = [
  { id:1,  name:"Blue AIR NIKE",          img:"pictures/picture3-removebg-preview.png",             oldPrice:71.43,  price:50.00,  discount:30, category:"sneakers", rating:4.8, reviews:124 },
  { id:2,  name:"Red AIR NIKE",           img:"pictures/picture4-removebg-preview.png",             oldPrice:50.00,  price:30.00,  discount:40, category:"sneakers", rating:4.6, reviews:89  },
  { id:3,  name:"Blue JORDAN 2025",       img:"pictures/jordan-1-unc-dz5485-400-2.webp",            oldPrice:125.00, price:100.00, discount:20, category:"jordans",  rating:4.9, reviews:210 },
  { id:4,  name:"Yellow JORDAN 2025",     img:"pictures/picture6-removebg-preview.png",             oldPrice:129.41, price:110.00, discount:15, category:"jordans",  rating:4.7, reviews:76  },
  { id:5,  name:"Adidas Running",         img:"pictures/ID8636_01_standard.avif",                   oldPrice:100.00, price:75.00,  discount:25, category:"adidas",   rating:4.5, reviews:143 },
  { id:6,  name:"Adidas Classic",         img:"pictures/B22767.png",                                oldPrice:50.00,  price:35.00,  discount:30, category:"adidas",   rating:4.4, reviews:58  },
  { id:7,  name:"Pink Adidas",            img:"pictures/IE7002_01_standard.avif",                   oldPrice:200.00, price:150.00, discount:25, category:"adidas",   rating:4.7, reviews:92  },
  { id:8,  name:"Adidas Sport",           img:"pictures/IF5720_01_standard.avif",                   oldPrice:100.00, price:90.00,  discount:10, category:"adidas",   rating:4.3, reviews:37  },
  { id:9,  name:"Adidas F50",             img:"pictures/1026161_Main_1913622.jpg",                  oldPrice:100.00, price:80.00,  discount:20, category:"adidas",   rating:4.6, reviews:61  },
  { id:10, name:"Gold F50 Special",       img:"pictures/270789_Main_Thumb_1287083.avif",            oldPrice:312.50, price:250.00, discount:20, category:"adidas",   rating:4.9, reviews:33  },
  { id:11, name:"Adidas F50 Pro",         img:"pictures/281010_Main_Thumb_1310748.avif",            oldPrice:80.00,  price:60.00,  discount:25, category:"adidas",   rating:4.5, reviews:48  },
  { id:12, name:"Adidas F50 Elite",       img:"pictures/1011511_Main_1764337.avif",                 oldPrice:71.43,  price:50.00,  discount:30, category:"adidas",   rating:4.4, reviews:29  },
  { id:13, name:"Adidas Sandals",         img:"pictures/il_fullxfull.4566453805_ll0y.avif",         oldPrice:50.00,  price:30.00,  discount:40, category:"sandals",  rating:4.2, reviews:54  },
  { id:14, name:"Adidas Sport Sandals",   img:"pictures/sandals.webp",                              oldPrice:40.00,  price:20.00,  discount:50, category:"sandals",  rating:4.1, reviews:41  },
  { id:15, name:"Arsenal Jersey 2025",    img:"pictures/arsenal.webp",                              oldPrice:71.43,  price:50.00,  discount:30, category:"jerseys",  rating:4.8, reviews:178 },
  { id:16, name:"Arsenal Jersey Blue",    img:"pictures/Arsenal_21-22_Tsey_Blue_GM0212_01_laydown.avif", oldPrice:71.43, price:50.00, discount:30, category:"jerseys", rating:4.6, reviews:95 },
  { id:17, name:"Barcelona Jersey",       img:"pictures/barcelone.jpeg",                            oldPrice:80.00,  price:60.00,  discount:25, category:"jerseys",  rating:4.7, reviews:134 },
  { id:18, name:"Barcelona Home Jersey",  img:"pictures/barcelone 2.webp",                          oldPrice:100.00, price:80.00,  discount:20, category:"jerseys",  rating:4.8, reviews:112 },
  { id:19, name:"Morocco Jersey 2026",    img:"pictures/Maillot-Maroc-Domicile-2025-2026.jpg",     oldPrice:71.43,  price:50.00,  discount:30, category:"jerseys",  rating:4.9, reviews:203 },
  { id:20, name:"Morocco Away Jersey",    img:"pictures/morocco2.webp",                             oldPrice:80.00,  price:40.00,  discount:50, category:"jerseys",  rating:4.7, reviews:88  },
];

function stars(r) {
  let s='';
  for(let i=0;i<5;i++){
    if(i<Math.floor(r)) s+='<i class="fas fa-star"></i>';
    else if(i<r) s+='<i class="fas fa-star-half-alt"></i>';
    else s+='<i class="far fa-star"></i>';
  }
  return s;
}

// Cart
function getCart()   { try{return JSON.parse(localStorage.getItem('mk_cart'))||[];}catch{return[];} }
function saveCart(c) { localStorage.setItem('mk_cart',JSON.stringify(c)); updateBadges(); renderCartSidebar(); }
function cartCount() { return getCart().reduce((s,i)=>s+i.qty,0); }
function cartTotal() { return getCart().reduce((s,i)=>s+i.price*i.qty,0); }
function clearCart() { saveCart([]); }

function addToCart(id,qty=1){
  const cart=getCart(), ex=cart.find(i=>i.id===id);
  if(ex){ex.qty+=qty;}else{const p=PRODUCTS.find(p=>p.id===id);if(p)cart.push({id:p.id,name:p.name,img:p.img,price:p.price,qty});}
  saveCart(cart);
  showToast('<i class="fas fa-check-circle"></i> Added to cart!');
}
function removeFromCart(id){ saveCart(getCart().filter(i=>i.id!==id)); }
function updateQty(id,qty){
  const cart=getCart(),item=cart.find(i=>i.id===id);
  if(!item)return;
  if(qty<1)removeFromCart(id);else{item.qty=qty;saveCart(cart);}
}

// Wishlist
function getWishlist()   { try{return JSON.parse(localStorage.getItem('mk_wish'))||[];}catch{return[];} }
function saveWishlist(w) { localStorage.setItem('mk_wish',JSON.stringify(w)); updateBadges(); }
function isWished(id)    { return getWishlist().includes(id); }
function toggleWish(id){
  const w=getWishlist(),idx=w.indexOf(id);
  if(idx>-1){w.splice(idx,1);showToast('<i class="fas fa-heart-broken"></i> Removed from wishlist');}
  else{w.push(id);showToast('<i class="fas fa-heart"></i> Added to wishlist!');}
  saveWishlist(w);
  document.querySelectorAll(`.wish-btn[data-id="${id}"]`).forEach(btn=>btn.classList.toggle('active',w.includes(id)));
}

// Badges
function updateBadges(){
  const cc=cartCount(),wc=getWishlist().length;
  document.querySelectorAll('.cart-count').forEach(el=>{el.textContent=cc;el.style.display=cc?'flex':'none';});
  document.querySelectorAll('.wish-count').forEach(el=>{el.textContent=wc;el.style.display=wc?'flex':'none';});
}

// Toast
function showToast(html,type='success'){
  let t=document.getElementById('mk-toast');
  if(!t){t=document.createElement('div');t.id='mk-toast';document.body.appendChild(t);}
  t.innerHTML=html;t.className='mk-toast '+type+' show';
  clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2800);
}

// Cart Sidebar
function renderCartSidebar(){
  const sidebar=document.getElementById('cart-sidebar');
  if(!sidebar)return;
  const cart=getCart();
  const body=sidebar.querySelector('.cart-items');
  const footer=sidebar.querySelector('.cart-footer');
  const hcount=sidebar.querySelector('#cart-header-count');
  if(hcount)hcount.textContent=cart.length?'('+cartCount()+')':'';
  if(!cart.length){
    body.innerHTML='<div class="cart-empty"><div class="cart-empty-icon"><i class="fas fa-shopping-bag"></i></div><p>Your bag is empty</p><a href="#products" onclick="closeCart()" class="btn-primary" style="font-size:.85rem;padding:11px 24px;margin-top:12px;">Start Shopping</a></div>';
    footer.innerHTML='';return;
  }
  body.innerHTML=cart.map(item=>`
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70'">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <div class="qty-controls">
          <button onclick="updateQty(${item.id},${item.qty-1})">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id},${item.qty+1})">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
        <span class="cart-item-subtotal">$${(item.price*item.qty).toFixed(2)}</span>
      </div>
    </div>`).join('');
  const total=cartTotal(),freeLeft=100-total;
  footer.innerHTML=`
    <div class="free-shipping-bar ${freeLeft<=0?'unlocked':''}">
      ${freeLeft>0
        ?`<div class="fsb-track"><div class="fsb-fill" style="width:${Math.min(100,(total/100)*100)}%"></div></div><p>Spend <strong>$${freeLeft.toFixed(2)}</strong> more for free shipping!</p>`
        :`<i class="fas fa-check-circle"></i> You've unlocked <strong>FREE shipping!</strong>`}
    </div>
    <div class="cart-summary">
      <div class="cart-total-row"><span>Subtotal (${cartCount()} items)</span><span>$${total.toFixed(2)}</span></div>
    </div>
    <a href="checkout.html" class="checkout-btn">Checkout — $${total.toFixed(2)} <i class="fas fa-arrow-right"></i></a>
    <button class="clear-cart-btn" onclick="if(confirm('Clear entire cart?')){clearCart()}">Clear Cart</button>`;
}

function openCart(){
  renderCartSidebar();
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('show');
  document.body.style.overflow='hidden';
}
function closeCart(){
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('show');
  document.body.style.overflow='';
}

// Quick View
function openQuickView(id){
  const p=PRODUCTS.find(x=>x.id===id);
  if(!p)return;
  const SIZES=['UK 6','UK 7','UK 8','UK 9','UK 10','UK 11','UK 12'];
  let modal=document.getElementById('quick-view-modal');
  if(!modal){modal=document.createElement('div');modal.id='quick-view-modal';document.body.appendChild(modal);}
  modal.innerHTML=`
    <div class="qv-overlay" onclick="closeQuickView()"></div>
    <div class="qv-box">
      <button class="qv-close" onclick="closeQuickView()"><i class="fas fa-times"></i></button>
      <div class="qv-grid">
        <div class="qv-img">
          <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400'">
          ${p.discount?`<span class="disc-badge">-${p.discount}%</span>`:''}
        </div>
        <div class="qv-info">
          <span class="qv-cat">${p.category.toUpperCase()}</span>
          <h2>${p.name}</h2>
          <div class="qv-rating"><span class="stars">${stars(p.rating)}</span><span class="rcount">${p.rating} (${p.reviews} reviews)</span></div>
          <div class="qv-prices">
            <span class="qv-new">$${p.price.toFixed(2)}</span>
            <span class="qv-old">$${p.oldPrice.toFixed(2)}</span>
            <span class="qv-save">Save $${(p.oldPrice-p.price).toFixed(2)}</span>
          </div>
          <div class="qv-sizes">
            <p class="size-label">Select Size</p>
            <div class="size-grid">${SIZES.map(s=>`<button class="size-btn" onclick="this.closest('.size-grid').querySelectorAll('.size-btn').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">${s}</button>`).join('')}</div>
          </div>
          <div class="qv-actions">
            <div class="qv-qty">
              <button onclick="var v=document.getElementById('qv-qty-val');v.value=Math.max(1,+v.value-1)">−</button>
              <input id="qv-qty-val" type="number" value="1" min="1" max="10">
              <button onclick="var v=document.getElementById('qv-qty-val');v.value=Math.min(10,+v.value+1)">+</button>
            </div>
            <button class="qv-add-btn" onclick="addToCart(${p.id},+document.getElementById('qv-qty-val').value);closeQuickView();openCart()">
              <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
          </div>
          <button class="qv-wish ${isWished(p.id)?'active':''}" data-id="${p.id}" onclick="toggleWish(${p.id});this.classList.toggle('active')">
            <i class="fas fa-heart"></i> ${isWished(p.id)?'Wishlisted':'Add to Wishlist'}
          </button>
          <div class="qv-meta">
            <span><i class="fas fa-truck"></i> Free shipping over $100</span>
            <span><i class="fas fa-undo"></i> 30-day returns</span>
            <span><i class="fas fa-shield-alt"></i> 100% authentic</span>
          </div>
        </div>
      </div>
    </div>`;
  modal.classList.add('show');
  document.body.style.overflow='hidden';
}
function closeQuickView(){
  const m=document.getElementById('quick-view-modal');
  if(m){m.classList.remove('show');document.body.style.overflow='';}
}

// Search
function searchProducts(q){
  q=q.toLowerCase().trim();
  if(!q)return null;
  return PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));
}
function closeSearch(){
  document.getElementById('searchBar')?.classList.remove('open');
  const out=document.getElementById('searchResults');
  if(out){out.innerHTML='';out.classList.remove('show');}
}

// Scroll reveal
function initScrollReveal(){
  const els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target);}});},{threshold:0.12});
  els.forEach(el=>io.observe(el));
}

// Back to top
function initBackToTop(){
  const btn=document.getElementById('back-to-top');
  if(!btn)return;
  window.addEventListener('scroll',()=>btn.classList.toggle('visible',window.scrollY>400));
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

// Promo banner
function initPromoBanner(){
  const banner=document.getElementById('promo-banner');
  const close=document.getElementById('promo-close');
  if(!banner||!close)return;
  if(sessionStorage.getItem('promo-closed')){banner.style.display='none';return;}
  close.addEventListener('click',()=>{
    banner.style.maxHeight='0';banner.style.padding='0';banner.style.overflow='hidden';
    setTimeout(()=>banner.style.display='none',400);
    sessionStorage.setItem('promo-closed','1');
  });
}

// Init
document.addEventListener('DOMContentLoaded',()=>{
  updateBadges();
  renderCartSidebar();
  initScrollReveal();
  initBackToTop();
  initPromoBanner();

  document.getElementById('cart-overlay')?.addEventListener('click',closeCart);

  const navbar=document.querySelector('.mk-navbar');
  if(navbar){
    const updateNav=()=>navbar.classList.toggle('scrolled',window.scrollY>50);
    window.addEventListener('scroll',updateNav);
    updateNav();
  }

  const toggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

toggle?.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  navMenu?.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    navMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });
});


  const searchToggle=document.getElementById('searchToggle');
  const searchBar=document.getElementById('searchBar');
  const searchInput=document.getElementById('searchInput');
  searchToggle?.addEventListener('click',e=>{e.stopPropagation();searchBar?.classList.toggle('open');if(searchBar?.classList.contains('open'))searchInput?.focus();});
  searchInput?.addEventListener('input',function(){
    const results=searchProducts(this.value);
    const out=document.getElementById('searchResults');
    if(!out)return;
    if(!this.value.trim()){out.innerHTML='';out.classList.remove('show');return;}
    if(!results||!results.length){out.innerHTML='<p class="no-results">No products found</p>';out.classList.add('show');return;}
    out.innerHTML=results.slice(0,5).map(p=>`<div class="search-result-item" onclick="closeSearch();openQuickView(${p.id})"><img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/40'"><div><strong>${p.name}</strong><span>$${p.price.toFixed(2)}</span></div></div>`).join('');
    out.classList.add('show');
  });
  document.addEventListener('click',e=>{
    if(!searchBar?.contains(e.target)&&e.target!==searchToggle)closeSearch();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeCart();closeQuickView();closeSearch();toggle?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');navMenu?.classList.remove('open');document.body.style.overflow='';}
  });
});
