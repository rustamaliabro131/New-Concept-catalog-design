/**
 * ATELIER LUXE | VIRTUAL WARDROBE CORE ENGINE (script.js)
 * Modern Vanilla JavaScript (ES6+) Architecture
 * Handles:
 *  - Reactive catalog data rendering with realistic hanging physics
 *  - 3D hover states & click events to trigger Quick-View drawer
 *  - High-res macro fabric inspection, sizing matrix, and accordion specs
 *  - Category tabs & slide-out multi-attribute filtering
 *  - Dynamic "Add to Cart" feedback loop with ghost garment trajectory
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CATALOG DATASET (Luxury Eastern Pret - Sana Safinaz / So Kamal aesthetic)
     -------------------------------------------------------------------------- */
  const CATALOG_PRODUCTS = [
    {
      id: "SS-2026-01",
      title: "Zinnia Royal Emerald Pret",
      collection: "Luxury Pret",
      category: "luxury-pret",
      fabric: "Raw Silk",
      silhouette: "Straight Kurta with Organza Hem",
      occasion: "Festive Evening",
      pricePKR: 34500,
      sizes: ["XS", "S", "M", "L"],
      outOfStockSizes: ["XL"],
      image: "assets/garments/emerald-raw-silk.svg",
      macroTexture: "assets/textures/raw-silk-macro.svg",
      palette: ["#1D3B2E", "#2B4036", "#D4AF37", "#FBE790"],
      specs: "Handcrafted pure raw silk kurta enriched with intricate zardozi, micro-pearls, and resham thread embroidery. Accompanied by embroidered straight pants and scalloped zari organza dupatta.",
      care: "Strictly dry clean only. Preserve in breathable cotton garment bag away from dampness and direct UV sunlight.",
      stylistNotes: "Pair with traditional antique polki chandbalis and embroidered raw silk khussas for an effortless festive soirée."
    },
    {
      id: "SK-2026-02",
      title: "Kandahar Velvet Shawl Kurta",
      collection: "Winter Festive",
      category: "winter-collection",
      fabric: "Plush Velvet",
      silhouette: "Relaxed Boxy Velvet Tunic",
      occasion: "Intimate Soirée",
      pricePKR: 42000,
      sizes: ["S", "M", "L", "XL"],
      outOfStockSizes: ["XS"],
      image: "assets/garments/velvet-plum-kurta.svg",
      macroTexture: "assets/textures/velvet-macro.svg",
      palette: ["#3A1828", "#4D2237", "#C8A261", "#ECD49F"],
      specs: "Heavy micro-velvet tunic lined with soft crepe. Elaborate gold tilla marori work framing the neckline, slit cuffs, and side slits.",
      care: "Specialist dry cleaning required. Steam iron on reverse inside-out; do not apply direct hot plate to velvet pile.",
      stylistNotes: "Harmonize with tailored raw silk cigarette pants and an heirloom kashmiri pashmina shawl."
    },
    {
      id: "SS-2026-03",
      title: "Noor-e-Chaman Karandi Kalidar",
      collection: "Winter Festive",
      category: "winter-collection",
      fabric: "Winter Karandi",
      silhouette: "16-Kali Kalidar Flared Kurta",
      occasion: "Royal Festive",
      pricePKR: 38900,
      sizes: ["XS", "S", "M", "L", "XL"],
      outOfStockSizes: [],
      image: "assets/garments/ivory-karandi-suit.svg",
      macroTexture: "assets/textures/karandi-macro.svg",
      palette: ["#EFECE6", "#DFDAD1", "#8C7456", "#B39B7D"],
      specs: "Woven winter Karandi featuring self-textured weave, accented with gold tilla booti spray and delicate crochet lace trims on flare.",
      care: "Dry clean only. Iron at moderate heat setting using protective pressing cloth.",
      stylistNotes: "Style with pearl jhumkas, a sleek low bun, and metallic champagne mojris."
    },
    {
      id: "SK-2026-04",
      title: "Shalimar Sage Angrakha",
      collection: "New Arrivals",
      category: "new-arrivals",
      fabric: "Zari Organza",
      silhouette: "Asymmetrical Cross Angrakha",
      occasion: "Daytime Soirée",
      pricePKR: 29500,
      sizes: ["XS", "S", "M"],
      outOfStockSizes: ["L", "XL"],
      image: "assets/garments/sage-organza-angrakha.svg",
      macroTexture: "assets/textures/organza-macro.svg",
      palette: ["#8B9D8B", "#9FB29F", "#E6C875", "#FFF0BD"],
      specs: "Sheer shimmer organza layered over dyed silk slip. Embellished with resham floral sprays, delicate dori tassels, and gota patti borders.",
      care: "Delicate dry clean only. Hang on padded hangers to avoid shoulder stretch.",
      stylistNotes: "Ideal for daytime garden weddings; pair with mint tourmaline drops and an embellished potli pouch."
    },
    {
      id: "SS-2026-05",
      title: "Mehtab Noir Silk Tunic",
      collection: "Luxury Pret",
      category: "luxury-pret",
      fabric: "Raw Silk",
      silhouette: "Modern Silhouette Kaftan",
      occasion: "Intimate Soirée",
      pricePKR: 32000,
      sizes: ["S", "M", "L"],
      outOfStockSizes: ["XS", "XL"],
      image: "assets/garments/noir-rawsilk-kaftan.svg",
      macroTexture: "assets/textures/raw-silk-macro.svg",
      palette: ["#1C1917", "#262320", "#C5A880", "#E2CEB4"],
      specs: "Lustrous charcoal raw silk draped into an architectural silhouette. Subtle gold bullion wire embroidery along neckline and asymmetric cuffs.",
      care: "Professional dry clean only. Avoid spraying perfumes directly over metallic bullion embroidery.",
      stylistNotes: "Wear with sleek gold stilettos, a statement cuff bangle, and a bold crimson lip."
    },
    {
      id: "SK-2026-06",
      title: "Gulzar Dusty Rose Pishwas",
      collection: "Curated Archive",
      category: "sale",
      fabric: "Embroidered Chiffon",
      silhouette: "Tiered Anarkali Pishwas",
      occasion: "Royal Festive",
      pricePKR: 27500,
      sizes: ["XS", "S", "M", "L"],
      outOfStockSizes: ["XL"],
      image: "assets/garments/rose-chiffon-pishwas.svg",
      macroTexture: "assets/textures/chiffon-macro.svg",
      palette: ["#B87A84", "#C98D97", "#EAD0A8", "#FFF3E0"],
      specs: "Gossamer pure chiffon pishwas with sequined resham booti work. Fitted yoke with mother-of-pearl buttons and deep organza hem frill.",
      care: "Dry clean only. Store folded flat inside tissue paper to protect delicate sequin handwork.",
      stylistNotes: "Drape the matching crushed chiffon dupatta across one shoulder for a regal heritage aesthetic."
    },
    {
      id: "SS-2026-07",
      title: "Darya Cobalt Luxury 3-Piece",
      collection: "Unstitched Luxury",
      category: "unstitched",
      fabric: "Cotton Net",
      silhouette: "Straight Kurta with Culottes",
      occasion: "Festive Evening",
      pricePKR: 24800,
      sizes: ["XS", "S", "M", "L", "XL"],
      outOfStockSizes: [],
      image: "assets/garments/cobalt-cotton-net.svg",
      macroTexture: "assets/textures/cotton-net-macro.svg",
      palette: ["#16324F", "#1E4369", "#C9A96E", "#E8D4A2"],
      specs: "Unstitched luxury 3-piece set comprising embroidered cotton net shirt (3.25m), silk trousers (2.5m), and digital printed silk net dupatta (2.75m).",
      care: "Gentle dry clean or gentle hand wash with mild wool silk detergent in cold water.",
      stylistNotes: "Tailor with modern boat neckline and scalloped lace hemline trousers."
    },
    {
      id: "SK-2026-08",
      title: "Qaus Champagne Gold Tunic",
      collection: "New Arrivals",
      category: "new-arrivals",
      fabric: "Raw Silk",
      silhouette: "A-Line Kalidar Tunic",
      occasion: "Festive Evening",
      pricePKR: 36500,
      sizes: ["S", "M", "L"],
      outOfStockSizes: ["XS", "XL"],
      image: "assets/garments/champagne-gold-pret.svg",
      macroTexture: "assets/textures/raw-silk-macro.svg",
      palette: ["#CBB89D", "#DDD0BB", "#9E7E4E", "#F4E7CA"],
      specs: "Subtle champagne woven raw silk with dabka and kora floral sprays. Detailed neckline placket finished with miniature handcrafted buttons.",
      care: "Dry clean only. Keep in cool, dark environment to preserve gold luster.",
      stylistNotes: "Pair with flared crushed silk sharara pants and heritage Kundan choker."
    }
  ];

  /* --------------------------------------------------------------------------
     2. APPLICATION STATE MANAGEMENT
     -------------------------------------------------------------------------- */
  const AppState = {
    products: CATALOG_PRODUCTS,
    filteredProducts: [...CATALOG_PRODUCTS],
    activeCategory: 'all',
    selectedFabric: 'all',
    selectedOccasion: 'all',
    maxPrice: 65000,
    activeGarmentId: null,
    selectedSize: 'S',
    selectedQuantity: 1,
    wishlist: new Set(),
    cart: JSON.parse(localStorage.getItem('atelier_luxe_cart') || '[]'),
    viewMode: 'silhouette' // 'silhouette' | 'macro'
  };

  /* --------------------------------------------------------------------------
     3. DOM ELEMENT REFERENCES
     -------------------------------------------------------------------------- */
  const DOM = {
    // Header & Navigation
    siteHeader: document.getElementById('siteHeader'),
    categoryTabs: document.getElementById('categoryTabs'),
    activeFilterCount: document.getElementById('activeFilterCount'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    wishlistCountBadge: document.getElementById('wishlistCountBadge'),
    openFilterBtn: document.getElementById('openFilterBtn'),
    openCartBtn: document.getElementById('openCartBtn'),
    wishlistBtn: document.getElementById('wishlistBtn'),

    // Wardrobe Stage & Rack
    wardrobeStage: document.getElementById('wardrobeStage'),
    rackViewport: document.getElementById('rackViewport'),
    wardrobeTrack: document.getElementById('wardrobeTrack'),
    rackCounter: document.getElementById('rackCounter'),
    rackPrevBtn: document.getElementById('rackPrevBtn'),
    rackNextBtn: document.getElementById('rackNextBtn'),
    railProgressFill: document.getElementById('railProgressFill'),

    // Quick-View Drawer
    quickviewDrawer: document.getElementById('quickviewDrawer'),
    qvScrim: document.getElementById('qvScrim'),
    qvPanel: document.getElementById('qvPanel'),
    qvCloseBtn: document.getElementById('qvCloseBtn'),
    qvCategory: document.getElementById('qvCategory'),
    qvTitle: document.getElementById('qvTitle'),
    qvMainImage: document.getElementById('qvMainImage'),
    qvMacroView: document.getElementById('qvMacroView'),
    qvMacroImage: document.getElementById('qvMacroImage'),
    btnViewSilhouette: document.getElementById('btnViewSilhouette'),
    btnViewMacro: document.getElementById('btnViewMacro'),
    qvPaletteDots: document.getElementById('qvPaletteDots'),
    qvPrice: document.getElementById('qvPrice'),
    qvSku: document.getElementById('qvSku'),
    qvFabric: document.getElementById('qvFabric'),
    qvCut: document.getElementById('qvCut'),
    qvTechnique: document.getElementById('qvTechnique'),
    qvOccasion: document.getElementById('qvOccasion'),
    qvSizePills: document.getElementById('qvSizePills'),
    qvStockIndicator: document.getElementById('qvStockIndicator'),
    qtyMinusBtn: document.getElementById('qtyMinusBtn'),
    qtyPlusBtn: document.getElementById('qtyPlusBtn'),
    qtyDisplay: document.getElementById('qtyDisplay'),
    qvAddToCartBtn: document.getElementById('qvAddToCartBtn'),
    qvReserveBtn: document.getElementById('qvReserveBtn'),
    qvSpecs: document.getElementById('qvSpecs'),
    qvCare: document.getElementById('qvCare'),
    qvStylist: document.getElementById('qvStylist'),
    openSizeGuideBtn: document.getElementById('openSizeGuideBtn'),

    // Filter Drawer
    filterDrawer: document.getElementById('filterDrawer'),
    filterScrim: document.getElementById('filterScrim'),
    filterCloseBtn: document.getElementById('filterCloseBtn'),
    fabricFilterChips: document.getElementById('fabricFilterChips'),
    occasionFilterChips: document.getElementById('occasionFilterChips'),
    priceRangeInput: document.getElementById('priceRangeInput'),
    priceDisplay: document.getElementById('priceDisplay'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    applyFiltersBtn: document.getElementById('applyFiltersBtn'),

    // Cart Drawer
    cartDrawer: document.getElementById('cartDrawer'),
    cartScrim: document.getElementById('cartScrim'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartCountTitle: document.getElementById('cartCountTitle'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartTotal: document.getElementById('cartTotal'),
    cartFooter: document.getElementById('cartFooter'),
    cartBrowseBtn: document.getElementById('cartBrowseBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),

    // Size Guide Modal
    sizeGuideModal: document.getElementById('sizeGuideModal'),
    closeSizeGuideBtn: document.getElementById('closeSizeGuideBtn'),

    // Flight Layer & Toast
    flightLayer: document.getElementById('flightLayer'),
    toastContainer: document.getElementById('toastContainer')
  };

  /* --------------------------------------------------------------------------
     4. HELPER UTILITIES
     -------------------------------------------------------------------------- */
  function formatPKR(val) {
    return 'PKR ' + Number(val).toLocaleString('en-PK');
  }

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <svg class="ui-icon toast-icon" aria-hidden="true"><use href="#icon-sparkle"/></svg>
      <span>${message}</span>
    `;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(16px)';
      toast.style.transition = 'all 300ms ease';
      setTimeout(() => toast.remove(), 320);
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     5. DYNAMIC RENDERING: HANGING WARDROBE RACK
     -------------------------------------------------------------------------- */
  function renderWardrobeRack() {
    DOM.wardrobeTrack.innerHTML = '';

    if (AppState.filteredProducts.length === 0) {
      DOM.wardrobeTrack.innerHTML = `
        <div style="padding: 60px 40px; text-align: center; color: var(--color-text-muted);">
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--color-text-heading); margin-bottom: 8px;">No Garments Found</h3>
          <p style="font-size: 0.88rem;">Adjust your fabric or price criteria to reveal matching couture pieces.</p>
        </div>
      `;
      DOM.rackCounter.textContent = "0 Masterpieces Available";
      updateRailProgress();
      return;
    }

    DOM.rackCounter.textContent = `Displaying ${AppState.filteredProducts.length} Couture Masterpieces`;

    const fragment = document.createDocumentFragment();

    AppState.filteredProducts.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'garment-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-id', item.id);
      card.setAttribute('aria-label', `${item.title}, ${item.fabric}, ${formatPKR(item.pricePKR)}`);

      card.innerHTML = `
        <div class="garment-wrap">
          <div class="garment-figure">
            <div class="fabric-sheen" aria-hidden="true"></div>
            <img src="${item.image}" alt="${item.title}" class="garment-svg-img" loading="lazy" />
            <div class="garment-floor-shadow" aria-hidden="true"></div>
          </div>
          <div class="garment-tag">
            <span class="tag-fabric-badge">${item.fabric}</span>
            <h3 class="tag-title">${item.title}</h3>
            <div class="tag-price-row">
              <span class="tag-price">${formatPKR(item.pricePKR)}</span>
              <span class="tag-action-hint">Inspect &rarr;</span>
            </div>
          </div>
        </div>
      `;

      // Click to open quick-view drawer
      card.addEventListener('click', () => openQuickView(item.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openQuickView(item.id);
        }
      });

      fragment.appendChild(card);
    });

    DOM.wardrobeTrack.appendChild(fragment);
    updateRailProgress();
  }

  /* --------------------------------------------------------------------------
     6. RAIL SCROLL, MOMENTUM DRAG & PROGRESS TRACKING
     -------------------------------------------------------------------------- */
  function updateRailProgress() {
    const el = DOM.rackViewport;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      DOM.railProgressFill.style.width = '100%';
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    const pct = Math.min(Math.max(ratio * 100, 15), 100);
    DOM.railProgressFill.style.width = `${pct}%`;
  }

  function initRailInteractions() {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let moved = false;

    DOM.rackViewport.addEventListener('mousedown', (e) => {
      isDown = true;
      moved = false;
      DOM.rackViewport.classList.add('is-dragging');
      startX = e.pageX - DOM.rackViewport.offsetLeft;
      scrollLeft = DOM.rackViewport.scrollLeft;
    });

    DOM.rackViewport.addEventListener('mouseleave', () => {
      isDown = false;
      DOM.rackViewport.classList.remove('is-dragging');
    });

    DOM.rackViewport.addEventListener('mouseup', () => {
      isDown = false;
      DOM.rackViewport.classList.remove('is-dragging');
    });

    DOM.rackViewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - DOM.rackViewport.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity
      if (Math.abs(walk) > 5) moved = true;
      DOM.rackViewport.scrollLeft = scrollLeft - walk;
      updateRailProgress();
    });

    DOM.rackViewport.addEventListener('scroll', updateRailProgress);

    // Left / Right Arrow Buttons
    DOM.rackPrevBtn.addEventListener('click', () => {
      DOM.rackViewport.scrollBy({ left: -340, behavior: 'smooth' });
    });
    DOM.rackNextBtn.addEventListener('click', () => {
      DOM.rackViewport.scrollBy({ left: 340, behavior: 'smooth' });
    });

    // Keyboard Arrow Keys
    DOM.rackViewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        DOM.rackViewport.scrollBy({ left: 300, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        DOM.rackViewport.scrollBy({ left: -300, behavior: 'smooth' });
      }
    });

    // Header scroll background styling
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        DOM.siteHeader.classList.add('is-scrolled');
      } else {
        DOM.siteHeader.classList.remove('is-scrolled');
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. QUICK-VIEW DRAWER & FABRIC INSPECTOR
     -------------------------------------------------------------------------- */
  function openQuickView(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;

    AppState.activeGarmentId = productId;
    AppState.selectedQuantity = 1;
    AppState.viewMode = 'silhouette';
    DOM.qtyDisplay.textContent = '1';

    // Populate Titles & Metadata
    DOM.qvCategory.textContent = product.collection;
    DOM.qvTitle.textContent = product.title;
    DOM.qvPrice.textContent = formatPKR(product.pricePKR);
    DOM.qvSku.textContent = product.id;

    // Attributes
    DOM.qvFabric.textContent = product.fabric;
    DOM.qvCut.textContent = product.silhouette;
    DOM.qvTechnique.textContent = "Artisan Bullion & Zardozi";
    DOM.qvOccasion.textContent = product.occasion;

    // Accordions
    DOM.qvSpecs.textContent = product.specs;
    DOM.qvCare.textContent = product.care;
    DOM.qvStylist.textContent = product.stylistNotes;

    // Images
    DOM.qvMainImage.src = product.image;
    DOM.qvMainImage.alt = product.title;
    DOM.qvMacroImage.src = product.macroTexture;
    DOM.qvMacroImage.alt = `${product.fabric} macro weave texture`;

    // View switcher reset
    setViewMode('silhouette');

    // Palette Dots
    DOM.qvPaletteDots.innerHTML = '';
    product.palette.forEach(color => {
      const dot = document.createElement('span');
      dot.className = 'color-dot';
      dot.style.backgroundColor = color;
      dot.title = `Swatch ${color}`;
      DOM.qvPaletteDots.appendChild(dot);
    });

    // Size Pills Matrix
    DOM.qvSizePills.innerHTML = '';
    const allSizes = ["XS", "S", "M", "L", "XL"];
    let defaultSelected = false;

    allSizes.forEach(sz => {
      const isAvailable = product.sizes.includes(sz);
      const isChecked = isAvailable && !defaultSelected;
      if (isChecked) {
        defaultSelected = true;
        AppState.selectedSize = sz;
      }

      const label = document.createElement('label');
      label.className = 'size-pill-option';
      label.innerHTML = `
        <input type="radio" name="atelier_size" value="${sz}" ${isChecked ? 'checked' : ''} ${!isAvailable ? 'disabled' : ''} />
        <span class="size-pill-box" title="${isAvailable ? 'Available' : 'Sold Out'}">${sz}</span>
      `;

      label.querySelector('input').addEventListener('change', (e) => {
        if (e.target.checked) {
          AppState.selectedSize = sz;
        }
      });

      DOM.qvSizePills.appendChild(label);
    });

    // Open Drawer
    DOM.quickviewDrawer.classList.add('is-active');
    DOM.quickviewDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    DOM.qvCloseBtn.focus();
  }

  function closeQuickView() {
    DOM.quickviewDrawer.classList.remove('is-active');
    DOM.quickviewDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setViewMode(mode) {
    AppState.viewMode = mode;
    if (mode === 'silhouette') {
      DOM.qvMainImage.style.display = 'block';
      DOM.qvMacroView.classList.remove('active-view');
      DOM.btnViewSilhouette.classList.add('active');
      DOM.btnViewSilhouette.setAttribute('aria-checked', 'true');
      DOM.btnViewMacro.classList.remove('active');
      DOM.btnViewMacro.setAttribute('aria-checked', 'false');
    } else {
      DOM.qvMainImage.style.display = 'none';
      DOM.qvMacroView.classList.add('active-view');
      DOM.btnViewMacro.classList.add('active');
      DOM.btnViewMacro.setAttribute('aria-checked', 'true');
      DOM.btnViewSilhouette.classList.remove('active');
      DOM.btnViewSilhouette.setAttribute('aria-checked', 'false');
    }
  }

  /* --------------------------------------------------------------------------
     8. ADD-TO-CART DYNAMICS & GHOST FLIGHT TRAJECTORY
     -------------------------------------------------------------------------- */
  function triggerAddToCart() {
    const product = AppState.products.find(p => p.id === AppState.activeGarmentId);
    if (!product) return;

    const btn = DOM.qvAddToCartBtn;
    btn.classList.add('is-loading');

    // 1. Initiate Parallax Flying Garment Thumbnail
    animateGarmentFlight(product.image);

    setTimeout(() => {
      // 2. Add to Local State
      const existing = AppState.cart.find(item => item.id === product.id && item.size === AppState.selectedSize);
      if (existing) {
        existing.quantity += AppState.selectedQuantity;
      } else {
        AppState.cart.push({
          id: product.id,
          title: product.title,
          pricePKR: product.pricePKR,
          fabric: product.fabric,
          image: product.image,
          size: AppState.selectedSize,
          quantity: AppState.selectedQuantity
        });
      }

      localStorage.setItem('atelier_luxe_cart', JSON.stringify(AppState.cart));
      updateCartBadge();
      renderCartItems();

      // 3. Button Visual State Feedback
      btn.classList.remove('is-loading');
      btn.classList.add('is-success');
      btn.querySelector('.btn-text').textContent = "Added to Wardrobe ✓";

      showToast(`Added ${product.title} (${AppState.selectedSize}) to your wardrobe bag.`);

      setTimeout(() => {
        btn.classList.remove('is-success');
        btn.querySelector('.btn-text').textContent = "Add to Wardrobe";
      }, 2000);
    }, 450);
  }

  function animateGarmentFlight(imageSrc) {
    const startRect = DOM.qvMainImage.getBoundingClientRect();
    const endRect = DOM.openCartBtn.getBoundingClientRect();

    const ghost = document.createElement('img');
    ghost.src = imageSrc;
    ghost.className = 'ghost-garment-clone';
    ghost.style.left = `${startRect.left + startRect.width / 4}px`;
    ghost.style.top = `${startRect.top + startRect.height / 4}px`;

    DOM.flightLayer.appendChild(ghost);

    requestAnimationFrame(() => {
      ghost.style.transform = `translate(${endRect.left - startRect.left}px, ${endRect.top - startRect.top}px) scale(0.2)`;
      ghost.style.opacity = '0.3';
    });

    setTimeout(() => {
      ghost.remove();
      DOM.cartCountBadge.classList.add('count-pulse');
      setTimeout(() => DOM.cartCountBadge.classList.remove('count-pulse'), 450);
    }, 680);
  }

  /* --------------------------------------------------------------------------
     9. WARDROBE BAG / CART DRAWER LOGIC
     -------------------------------------------------------------------------- */
  function updateCartBadge() {
    const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    DOM.cartCountBadge.textContent = totalCount;
    DOM.cartCountTitle.textContent = totalCount;
  }

  function renderCartItems() {
    DOM.cartItemsList.innerHTML = '';

    if (AppState.cart.length === 0) {
      DOM.cartEmptyState.classList.add('is-visible');
      DOM.cartFooter.style.display = 'none';
      return;
    }

    DOM.cartEmptyState.classList.remove('is-visible');
    DOM.cartFooter.style.display = 'block';

    let subtotal = 0;

    AppState.cart.forEach((item, index) => {
      const itemTotal = item.pricePKR * item.quantity;
      subtotal += itemTotal;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-top">
            <h4 class="cart-item-title">${item.title}</h4>
            <button class="cart-item-remove" data-index="${index}" aria-label="Remove item">
              <svg class="ui-icon-xs" aria-hidden="true"><use href="#icon-trash"/></svg>
            </button>
          </div>
          <div class="cart-item-meta">
            <span>Size: <strong>${item.size}</strong></span> &bull; 
            <span>Qty: <strong>${item.quantity}</strong></span> &bull; 
            <span>${item.fabric}</span>
          </div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatPKR(itemTotal)}</span>
          </div>
        </div>
      `;

      row.querySelector('.cart-item-remove').addEventListener('click', () => {
        AppState.cart.splice(index, 1);
        localStorage.setItem('atelier_luxe_cart', JSON.stringify(AppState.cart));
        updateCartBadge();
        renderCartItems();
        showToast("Item removed from your wardrobe bag.", "info");
      });

      DOM.cartItemsList.appendChild(row);
    });

    DOM.cartSubtotal.textContent = formatPKR(subtotal);
    DOM.cartTotal.textContent = formatPKR(subtotal);
  }

  function openCart() {
    renderCartItems();
    DOM.cartDrawer.classList.add('is-active');
    DOM.cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    DOM.cartCloseBtn.focus();
  }

  function closeCart() {
    DOM.cartDrawer.classList.remove('is-active');
    DOM.cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     10. FILTERING & SORTING ENGINE
     -------------------------------------------------------------------------- */
  function applyFilters() {
    AppState.filteredProducts = AppState.products.filter(item => {
      const matchesCategory = (AppState.activeCategory === 'all') || (item.category === AppState.activeCategory);
      const matchesFabric = (AppState.selectedFabric === 'all') || (item.fabric === AppState.selectedFabric);
      const matchesOccasion = (AppState.selectedOccasion === 'all') || (item.occasion === AppState.selectedOccasion);
      const matchesPrice = item.pricePKR <= AppState.maxPrice;

      return matchesCategory && matchesFabric && matchesOccasion && matchesPrice;
    });

    // Update active filter counter in top header
    let count = 0;
    if (AppState.selectedFabric !== 'all') count++;
    if (AppState.selectedOccasion !== 'all') count++;
    if (AppState.maxPrice < 65000) count++;
    DOM.activeFilterCount.textContent = count;

    renderWardrobeRack();
  }

  function initCategoryTabs() {
    const tabs = DOM.categoryTabs.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');

        AppState.activeCategory = tab.getAttribute('data-category');
        applyFilters();

        // Smooth scroll wardrobe back to start on tab change
        DOM.rackViewport.scrollTo({ left: 0, behavior: 'smooth' });
      });
    });
  }

  function initFilterDrawer() {
    // Open & Close
    DOM.openFilterBtn.addEventListener('click', () => {
      DOM.filterDrawer.classList.add('is-active');
      DOM.filterDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      DOM.filterCloseBtn.focus();
    });

    const closeFilter = () => {
      DOM.filterDrawer.classList.remove('is-active');
      DOM.filterDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    DOM.filterCloseBtn.addEventListener('click', closeFilter);
    DOM.filterScrim.addEventListener('click', closeFilter);

    // Fabric Filter Chips
    const fabricChips = DOM.fabricFilterChips.querySelectorAll('.filter-chip');
    fabricChips.forEach(chip => {
      chip.addEventListener('click', () => {
        fabricChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        AppState.selectedFabric = chip.getAttribute('data-fabric');
      });
    });

    // Occasion Filter Chips
    const occasionChips = DOM.occasionFilterChips.querySelectorAll('.filter-chip');
    occasionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        occasionChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        AppState.selectedOccasion = chip.getAttribute('data-occasion');
      });
    });

    // Price Slider
    DOM.priceRangeInput.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      AppState.maxPrice = val;
      DOM.priceDisplay.textContent = formatPKR(val);
    });

    // Reset All
    DOM.resetFiltersBtn.addEventListener('click', () => {
      AppState.selectedFabric = 'all';
      AppState.selectedOccasion = 'all';
      AppState.maxPrice = 65000;
      DOM.priceRangeInput.value = '65000';
      DOM.priceDisplay.textContent = 'PKR 65,000';

      fabricChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-fabric') === 'all'));
      occasionChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-occasion') === 'all'));

      applyFilters();
      closeFilter();
      showToast("Filter parameters reset.", "info");
    });

    // Apply Button
    DOM.applyFiltersBtn.addEventListener('click', () => {
      applyFilters();
      closeFilter();
      showToast(`Showing ${AppState.filteredProducts.length} filtered items.`);
    });
  }

  /* --------------------------------------------------------------------------
     11. EVENT LISTENERS INITIALIZATION
     -------------------------------------------------------------------------- */
  function initEventListeners() {
    // Quick-View Scrim & Close
    DOM.qvCloseBtn.addEventListener('click', closeQuickView);
    DOM.qvScrim.addEventListener('click', closeQuickView);

    // Cart Scrim & Close
    DOM.openCartBtn.addEventListener('click', openCart);
    DOM.cartCloseBtn.addEventListener('click', closeCart);
    DOM.cartScrim.addEventListener('click', closeCart);
    DOM.cartBrowseBtn.addEventListener('click', closeCart);

    // Global Escape Key to Dismiss Any Active Drawer / Modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeQuickView();
        closeCart();
        DOM.filterDrawer.classList.remove('is-active');
        DOM.sizeGuideModal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });

    // Silhouette vs Macro Weave Switcher
    DOM.btnViewSilhouette.addEventListener('click', () => setViewMode('silhouette'));
    DOM.btnViewMacro.addEventListener('click', () => setViewMode('macro'));

    // Quantity Counter
    DOM.qtyMinusBtn.addEventListener('click', () => {
      if (AppState.selectedQuantity > 1) {
        AppState.selectedQuantity--;
        DOM.qtyDisplay.textContent = AppState.selectedQuantity;
      }
    });
    DOM.qtyPlusBtn.addEventListener('click', () => {
      if (AppState.selectedQuantity < 8) {
        AppState.selectedQuantity++;
        DOM.qtyDisplay.textContent = AppState.selectedQuantity;
      }
    });

    // Add To Cart CTA
    DOM.qvAddToCartBtn.addEventListener('click', triggerAddToCart);

    // Reserve CTA
    DOM.qvReserveBtn.addEventListener('click', () => {
      showToast("Atelier concierge notified. A private boutique fitting has been reserved for you.", "success");
    });

    // Checkout CTA
    DOM.checkoutBtn.addEventListener('click', () => {
      showToast("Proceeding to secure checkout gateway...", "success");
    });

    // Wishlist Toggle
    DOM.wishlistBtn.addEventListener('click', () => {
      showToast("Wishlist features are synchronizing with your atelier profile.", "info");
    });

    // Size Guide Modal
    DOM.openSizeGuideBtn.addEventListener('click', () => {
      DOM.sizeGuideModal.classList.add('is-active');
      DOM.sizeGuideModal.setAttribute('aria-hidden', 'false');
    });
    DOM.closeSizeGuideBtn.addEventListener('click', () => {
      DOM.sizeGuideModal.classList.remove('is-active');
      DOM.sizeGuideModal.setAttribute('aria-hidden', 'true');
    });
    DOM.sizeGuideModal.addEventListener('click', (e) => {
      if (e.target === DOM.sizeGuideModal) {
        DOM.sizeGuideModal.classList.remove('is-active');
        DOM.sizeGuideModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. SYSTEM BOOTSTRAP
     -------------------------------------------------------------------------- */
  function init() {
    renderWardrobeRack();
    initRailInteractions();
    initCategoryTabs();
    initFilterDrawer();
    initEventListeners();
    updateCartBadge();

    console.log("Atelier Luxe Virtual Wardrobe Catalog initialized successfully.");
  }

  // Execute on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
