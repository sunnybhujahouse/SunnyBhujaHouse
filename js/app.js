/* ==========================================================================
   SUNNY BHUJA HOUSE — app.js
   ==========================================================================

   ┌────────────────────────────────────────────────────────────────────────┐
   │  OWNER CONFIGURATION — EDIT THIS BLOCK ONLY                            │
   │  All brand links used across the website come from here.               │
   └────────────────────────────────────────────────────────────────────────┘ */


/* =========================================================
   SUNNY BHUJA HOUSE — MAIN JAVASCRIPT
   Vanilla JavaScript | GitHub Pages compatible
   ========================================================= */

"use strict";

/* -------------------- CONFIGURATION -------------------- */

const CONFIG = {
  WHATSAPP_NUMBER: "918539856181",
  BUSINESS_NAME: "Sunny Bhuja House",
  EMAIL: "sunnybhujahouse@gmail.com",
  WEBSITE: "https://sunnybhujahouse.in/",
  ADDRESS: "Tajpur Fulwariya, Manjhi, Saran, Bihar 841209",
  MAPS_URL:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Tajpur Fulwariya, Manjhi, Saran, Bihar 841209"
    )
};

/* -------------------- PRICE HELPERS -------------------- */

// Sunny Bhuja ke confirmed pack-wise prices.
// Other products ke liye products.js ka price fallback hoga.

function getUnitPrice(product, size) {
  if (
    product.prices &&
    Object.prototype.hasOwnProperty.call(product.prices, size)
  ) {
    const price = Number(product.prices[size]);

    return Number.isFinite(price) && price >= 0
      ? price
      : null;
  }

  const match = String(product.price || "").match(
    /\d+(?:\.\d+)?/
  );

  return match ? Number(match[0]) : null;
}

function formatPrice(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });
}

function updateCardPrice(card, product) {
  const selectedChip = card.querySelector(
    ".size-chip.is-selected"
  );

  const quantityElement = card.querySelector(".qty-value");
  const unitPriceElement = card.querySelector(".unit-price");
  const totalPriceElement = card.querySelector(".total-price");

  if (
    !selectedChip ||
    !quantityElement ||
    !unitPriceElement ||
    !totalPriceElement
  ) {
    return;
  }

  const size = selectedChip.dataset.size;
  const quantity = Number(quantityElement.textContent) || 1;
  const unitPrice = getUnitPrice(product, size);

  if (unitPrice === null) {
    unitPriceElement.textContent =
      product.price || "Price not set";

    totalPriceElement.textContent = "—";
    return;
  }

  unitPriceElement.textContent = formatPrice(unitPrice);
  totalPriceElement.textContent = formatPrice(
    unitPrice * quantity
  );
}

/* -------------------- WHATSAPP HELPER -------------------- */

function waLink(message) {
  return (
    "https://wa.me/" +
    CONFIG.WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message)
  );
}

function openWhatsApp(message) {
  window.open(
    waLink(message),
    "_blank",
    "noopener,noreferrer"
  );
}

/* -------------------- PRODUCT CARD -------------------- */

function cardHTML(product) {
  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : [];

  const firstSize = sizes[0] || "";
  const firstPrice = getUnitPrice(product, firstSize);

  const image =
    product.image ||
    product.imageUrl ||
    product.img ||
    "";

  const imageHTML = image
    ? `<img
         class="product-image"
         src="${escapeHTML(image)}"
         alt="${escapeHTML(product.name)}"
         loading="lazy"
         decoding="async"
       >`
    : `<div class="product-image product-image-placeholder"
            aria-label="${escapeHTML(product.name)}">
         ${escapeHTML(product.name)}
       </div>`;

  const sizeHTML = sizes
    .map((size, index) => {
      const selected = index === 0;

      return `
        <button
          type="button"
          class="size-chip${selected ? " is-selected" : ""}"
          data-size="${escapeHTML(size)}"
          aria-pressed="${selected}"
        >
          ${escapeHTML(size)}
        </button>
      `;
    })
    .join("");

  const badgeHTML = product.badge
    ? `<span class="product-badge">
         ${escapeHTML(product.badge)}
       </span>`
    : "";

  const unavailable = product.available === false;

  return `
    <article
      class="product-card"
      data-id="${escapeHTML(product.id)}"
      data-category="${escapeHTML(product.category || "all")}"
    >
      <div class="product-image-wrap">
        ${imageHTML}
        ${badgeHTML}
      </div>

      <div class="product-info">
        <h3 class="product-name">
          ${escapeHTML(product.name || "Product")}
        </h3>

        ${
          product.description
            ? `<p class="product-description">
                 ${escapeHTML(product.description)}
               </p>`
            : ""
        }

        <div class="product-sizes">
          <span class="size-label">Choose pack:</span>
          <div class="size-options">
            ${sizeHTML}
          </div>
        </div>

        <div class="quantity-row">
          <span class="quantity-label">Quantity:</span>

          <div class="quantity-control">
            <button
              type="button"
              class="qty-btn"
              data-dir="-1"
              aria-label="Decrease quantity"
            >−</button>

            <span class="qty-value" aria-live="polite">1</span>

            <button
              type="button"
              class="qty-btn"
              data-dir="1"
              aria-label="Increase quantity"
            >+</button>
          </div>
        </div>

        <p class="product-price">
          <span>Price per pack:</span>
          <strong class="unit-price">
            ${
              firstPrice === null
                ? escapeHTML(product.price || "Price not set")
                : formatPrice(firstPrice)
            }
          </strong>
        </p>

        <p class="product-total">
          <span>Subtotal:</span>
          <strong class="total-price">
            ${
              firstPrice === null
                ? "—"
                : formatPrice(firstPrice)
            }
          </strong>
        </p>

        <button
          type="button"
          class="btn-order"
          ${unavailable ? "disabled" : ""}
        >
          ${
            unavailable
              ? "Currently Unavailable"
              : "Order on WhatsApp"
          }
        </button>
      </div>
    </article>
  `;
}

/* Escape product text before inserting it into HTML. */

function escapeHTML(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );
}

/* -------------------- RENDER PRODUCTS -------------------- */

function renderProducts() {
  const grid = document.getElementById("product-grid");

  if (!grid) return;

  if (typeof PRODUCTS === "undefined" || !Array.isArray(PRODUCTS)) {
    console.error(
      "PRODUCTS list nahi mili. products.js ko app.js se pehle load karein."
    );

    grid.innerHTML =
      '<p class="product-error">Products load nahi ho paaye. Please refresh the page.</p>';

    return;
  }

  grid.innerHTML = PRODUCTS.map(cardHTML).join("");

  grid.querySelectorAll(".product-card").forEach((card) => {
    const product = PRODUCTS.find(
      (item) => item.id === card.dataset.id
    );

    if (product) {
      updateCardPrice(card, product);
    }
  });
}

/* -------------------- PRODUCT FILTERS -------------------- */

function initFilters() {
  const filterButtons = document.querySelectorAll(
    "[data-filter]"
  );

  const grid = document.getElementById("product-grid");

  if (!filterButtons.length || !grid) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);

        if (item === button) {
          item.setAttribute("aria-pressed", "true");
        } else {
          item.setAttribute("aria-pressed", "false");
        }
      });

      grid.querySelectorAll(".product-card").forEach((card) => {
        const category = card.dataset.category || "all";

        const show =
          filter === "all" ||
          filter === category;

        card.hidden = !show;
      });
    });
  });
}

/* -------------------- PRODUCT INTERACTIONS -------------------- */

function initGridActions() {
  const grid = document.getElementById("product-grid");

  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".product-card");

    if (!card || !grid.contains(card)) return;

    const product = PRODUCTS.find(
      (item) => item.id === card.dataset.id
    );

    if (!product) return;

    /* Size selection: select pack and reset quantity to 1. */

    const sizeChip = event.target.closest(".size-chip");

    if (sizeChip) {
      card.querySelectorAll(".size-chip").forEach((chip) => {
        const selected = chip === sizeChip;

        chip.classList.toggle("is-selected", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });

      const quantityElement = card.querySelector(".qty-value");

      if (quantityElement) {
        quantityElement.textContent = "1";
      }

      updateCardPrice(card, product);
      return;
    }

    /* Quantity controls: minimum 1, maximum 20. */

    const quantityButton = event.target.closest(".qty-btn");

    if (quantityButton) {
      const quantityElement = card.querySelector(".qty-value");

      if (!quantityElement) return;

      const current =
        parseInt(quantityElement.textContent, 10) || 1;

      const direction = Number(quantityButton.dataset.dir) || 0;

      const next = Math.min(
        20,
        Math.max(1, current + direction)
      );

      quantityElement.textContent = String(next);

      updateCardPrice(card, product);
      return;
    }

    /* WhatsApp order. */

    const orderButton = event.target.closest(".btn-order");

    if (orderButton && !orderButton.disabled) {
      const selectedChip = card.querySelector(
        ".size-chip.is-selected"
      );

      const size = selectedChip
        ? selectedChip.dataset.size
        : (product.sizes || [])[0] || "Not selected";

      const quantity =
        parseInt(
          card.querySelector(".qty-value")?.textContent,
          10
        ) || 1;

      const unitPrice = getUnitPrice(product, size);

      const lines = [
        "Hello " + CONFIG.BUSINESS_NAME + ", I want to order:",
        "",
        "Product: " + product.name,
        "Size: " + size,
        "Quantity: " + quantity
      ];

      if (unitPrice !== null) {
        lines.push(
          "Price per pack: " + formatPrice(unitPrice)
        );

        lines.push(
          "Subtotal: " + formatPrice(unitPrice * quantity)
        );
      } else {
        lines.push("Price: Please confirm");
      }

      lines.push(
        "",
        "Please confirm availability and delivery charges.",
        "Thank you!"
      );

      openWhatsApp(lines.join("\n"));
    }
  });
}

/* -------------------- WHATSAPP / EMAIL / MAP LINKS -------------------- */

function initConfigLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((element) => {
    const message =
      element.dataset.whatsapp ||
      "Hello Sunny Bhuja House, I would like to know more about your products.";

    element.href = waLink(message);
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-email]").forEach((element) => {
    element.href = "mailto:" + CONFIG.EMAIL;
  });

  document.querySelectorAll("[data-maps]").forEach((element) => {
    element.href = CONFIG.MAPS_URL;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-business-email]").forEach((element) => {
    element.textContent = CONFIG.EMAIL;
  });

  document.querySelectorAll("[data-business-address]").forEach((element) => {
    element.textContent = CONFIG.ADDRESS;
  });

  document.querySelectorAll("[data-business-name]").forEach((element) => {
    element.textContent = CONFIG.BUSINESS_NAME;
  });
}

/* -------------------- MOBILE NAVIGATION -------------------- */

function initMobileNavigation() {
  const menuButton = document.querySelector(
    ".menu-toggle, .hamburger, [data-menu-toggle]"
  );

  const navigation = document.querySelector(
    ".nav-links, .main-nav, [data-navigation]"
  );

  if (!menuButton || !navigation) return;

  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menuButton.classList.toggle("is-active", !isOpen);
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.classList.remove("is-active");
      navigation.classList.remove("is-open");
    });
  });
}

/* -------------------- SCROLL REVEAL -------------------- */

function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".reveal, .reveal-up, [data-reveal]"
  );

  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  elements.forEach((element) => observer.observe(element));
}

/* -------------------- SUBTLE PARALLAX -------------------- */

function initParallax() {
  const elements = document.querySelectorAll("[data-parallax]");

  if (!elements.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  let ticking = false;

  function updateParallax() {
    const viewportHeight = window.innerHeight;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const speed = Number(element.dataset.parallaxSpeed) || 0.08;
      const offset =
        (rect.top - viewportHeight / 2) * speed;

      element.style.setProperty(
        "--parallax-offset",
        offset.toFixed(2) + "px"
      );
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();
}

/* -------------------- FOOTER YEAR -------------------- */

function initFooterYear() {
  const year = String(new Date().getFullYear());

  document.querySelectorAll(
    "#current-year, #footer-year, [data-current-year]"
  ).forEach((element) => {
    element.textContent = year;
  });
}

/* -------------------- INITIALIZE WEBSITE -------------------- */

function initSunnyBhujaHouse() {
  renderProducts();
  initFilters();
  initGridActions();

  initConfigLinks();
  initMobileNavigation();

  initScrollReveal();
  initParallax();
  initFooterYear();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initSunnyBhujaHouse
  );
} else {
  initSunnyBhujaHouse();
}