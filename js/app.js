/* ==========================================================================
   SUNNY BHUJA HOUSE — app.js
   ==========================================================================

   ┌────────────────────────────────────────────────────────────────────────┐
   │  OWNER CONFIGURATION — EDIT THIS BLOCK ONLY                            │
   │  All brand links used across the website come from here.               │
   └────────────────────────────────────────────────────────────────────────┘ */

const CONFIG = {
  // WhatsApp number in international format, DIGITS ONLY (country code + number, no +, spaces or dashes).
  // Example for India: "919876543210"
  // REPLACE THE PLACEHOLDER BELOW WITH YOUR REAL NUMBER.
  WHATSAPP_NUMBER: "918539856181",

  BUSINESS_NAME: "Sunny Bhuja House",
  BUSINESS_EMAIL: "sunnybhujahouse@gmail.com",
  WEBSITE_URL: "https://sunnybhujahouse.in",

  // Social profile links — replace with the real profiles once created.
  INSTAGRAM_URL: "https://www.instagram.com/sunnybhujahouse",
  FACEBOOK_URL: "https://www.facebook.com/sunnybhujahouse",
  X_URL: "https://x.com/sunnybhujahouse",
  GOOGLE_BUSINESS_URL: "", // Google Business Profile link (optional)

  // Google Maps EMBED url: open Google Maps -> your location -> Share ->
  // "Embed a map" -> copy ONLY the src="..." link inside the iframe and paste here.
  GOOGLE_MAPS_URL: ""
};

/* ==========================================================================
   Site behaviour — no need to edit below this line for normal use.
   ========================================================================== */

const WA_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Helpers ---------- */

function waLink(message) {
  return "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function categoryLabel(id) {
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === id);
  return cat ? cat.label : id;
}

/* ---------- Product catalog ---------- */

function cardHTML(p) {
  const chips = p.sizes
    .map(
      (s, i) =>
        '<button type="button" class="size-chip' + (i === 0 ? " is-selected" : "") + '"' +
        ' data-size="' + s + '" data-testid="size-' + p.id + "-" + i + '"' +
        ' aria-pressed="' + (i === 0) + '">' + s + "</button>"
    )
    .join("");

  const badge = p.badge ? '<span class="product-badge">' + p.badge + "</span>" : "";

  return (
    '<article class="product-card reveal" data-id="' + p.id + '" data-testid="product-card-' + p.id + '">' +
      '<div class="product-media">' +
        '<img src="' + p.image + '" alt="' + p.imageAlt + '" width="600" height="600" loading="lazy">' +
        badge +
      "</div>" +
      '<div class="product-body">' +
        '<span class="product-cat">' + categoryLabel(p.category) + "</span>" +
        '<h3 class="product-name">' + p.name + "</h3>" +
        '<p class="product-desc">' + p.description + "</p>" +
        '<p class="field-label" id="size-label-' + p.id + '">Size</p>' +
        '<div class="size-row" role="group" aria-labelledby="size-label-' + p.id + '">' + chips + "</div>" +
        '<div class="order-row">' +
          '<div class="qty" role="group" aria-label="Quantity for ' + p.name + '">' +
            '<button type="button" class="qty-btn" data-dir="-1" data-testid="qty-minus-' + p.id + '" aria-label="Decrease quantity">&minus;</button>' +
            '<span class="qty-value" data-testid="qty-value-' + p.id + '" aria-live="polite">1</span>' +
            '<button type="button" class="qty-btn" data-dir="1" data-testid="qty-plus-' + p.id + '" aria-label="Increase quantity">+</button>' +
          "</div>" +
          '<p class="product-price"><span>Price:</span> ' + p.price + "</p>" +
        "</div>" +
        '<button type="button" class="btn btn-gold btn-order" data-testid="order-btn-' + p.id + '"' + (p.available ? "" : " disabled") + ">" +
          WA_ICON + "<span>Order on WhatsApp</span>" +
        "</button>" +
      "</div>" +
    "</article>"
  );
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid || typeof PRODUCTS === "undefined") return;
  grid.innerHTML = PRODUCTS.map(cardHTML).join("");
}

/* ---------- Category filter ---------- */

function initFilters() {
  const bar = document.getElementById("filters");
  const grid = document.getElementById("product-grid");
  if (!bar || !grid) return;

  bar.innerHTML = PRODUCT_CATEGORIES.map(
    (c) =>
      '<button type="button" class="filter-btn' + (c.id === "all" ? " is-active" : "") + '"' +
      ' data-filter="' + c.id + '" data-testid="filter-' + c.id + '" aria-pressed="' + (c.id === "all") + '">' +
      c.label + "</button>"
  ).join("");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    const filter = btn.dataset.filter;
    grid.querySelectorAll(".product-card").forEach((card) => {
      const p = PRODUCTS.find((x) => x.id === card.dataset.id);
      const show = filter === "all" || (p && p.category === filter);
      card.classList.toggle("is-hidden", !show);
    });
  });
}

/* ---------- Size / quantity / WhatsApp order ---------- */

function initGridActions() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const sizeChip = e.target.closest(".size-chip");
    if (sizeChip) {
      card.querySelectorAll(".size-chip").forEach((c) => {
        c.classList.toggle("is-selected", c === sizeChip);
        c.setAttribute("aria-pressed", c === sizeChip ? "true" : "false");
      });
      return;
    }

    const qtyBtn = e.target.closest(".qty-btn");
    if (qtyBtn) {
      const valueEl = card.querySelector(".qty-value");
      const next = Math.min(20, Math.max(1, parseInt(valueEl.textContent, 10) + Number(qtyBtn.dataset.dir)));
      valueEl.textContent = next;
      return;
    }

    const orderBtn = e.target.closest(".btn-order");
    if (orderBtn && !orderBtn.disabled) {
      const product = PRODUCTS.find((x) => x.id === card.dataset.id);
      const size = card.querySelector(".size-chip.is-selected");
      const qty = card.querySelector(".qty-value").textContent;
      const message =
        "Hello " + CONFIG.BUSINESS_NAME + ", I want to order:\n" +
        "Product: " + product.name + "\n" +
        "Size: " + (size ? size.dataset.size : product.sizes[0]) + "\n" +
        "Quantity: " + qty;
      window.open(waLink(message), "_blank", "noopener");
    }
  });
}

/* ---------- Config-driven links (WhatsApp, socials, email) ---------- */

function initConfigLinks() {
  document.querySelectorAll(".js-wa").forEach((a) => {
    a.href = waLink("Hello " + CONFIG.BUSINESS_NAME + ", I want to place an order.");
  });

  const socialMap = {
    instagram: CONFIG.INSTAGRAM_URL,
    facebook: CONFIG.FACEBOOK_URL,
    x: CONFIG.X_URL,
    whatsapp: waLink("Hello " + CONFIG.BUSINESS_NAME + ", I want to place an order."),
    google: CONFIG.GOOGLE_BUSINESS_URL
  };
  document.querySelectorAll("[data-social]").forEach((a) => {
    const url = socialMap[a.dataset.social];
    if (url) a.href = url;
  });

  document.querySelectorAll("[data-config-href='mailto']").forEach((a) => {
    a.href = "mailto:" + CONFIG.BUSINESS_EMAIL;
  });
}

/* ---------- Google Maps embed / placeholder ---------- */

function initMap() {
  const map = document.getElementById("map-embed");
  if (!map || !CONFIG.GOOGLE_MAPS_URL) return;
  map.outerHTML =
    '<div class="map-embed map-embed--live"><iframe src="' + CONFIG.GOOGLE_MAPS_URL + '" ' +
    'title="Sunny Bhuja House location on Google Maps" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
}

/* ---------- Header: scrolled state + mobile menu ---------- */

function initHeader() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  if (!header || !toggle) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const close = () => {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  document.querySelectorAll("#site-nav a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    if (header.classList.contains("nav-open") && !header.contains(e.target)) close();
  });
}

/* ---------- Scroll reveals ---------- */

function initReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Subtle hero parallax ---------- */

function initParallax() {
  if (prefersReducedMotion) return;
  const img = document.getElementById("hero-img");
  if (!img) return;
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.05, 36);
        img.style.transform = "translateY(" + y + "px) scale(1.03)";
        ticking = false;
      });
    },
    { passive: true }
  );
}

/* ---------- Footer year ---------- */

function initYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Init ---------- */

renderProducts();
initFilters();
initGridActions();
initConfigLinks();
initMap();
initHeader();
initReveals();
initParallax();
initYear();
