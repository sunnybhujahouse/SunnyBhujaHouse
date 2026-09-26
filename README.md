# Sunny Bhuja House — Website

A production-ready static website for **Sunny Bhuja House** (a Kushavaha Foods venture),
built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no backend, no build step.
Deployable on GitHub Pages and ready to connect to **sunnybhujahouse.in**.

---

## 1. How to run the website locally

**Option A — just open it:** double-click `index.html`. Everything works from the file system.

**Option B — local server (recommended):**
```bash
cd sunny-bhuja-house
python -m http.server 8000
# open http://localhost:8000 in your browser
```
Or use the "Live Server" extension in VS Code.

## 2. How to replace the logo

- The small sun mark is `assets/logo/mark.svg` (used in the header, footer, badge and favicon).
- The full lockup with text is `assets/logo/logo.svg`.
- To use your own logo: save your file as `assets/logo/mark.svg` (same name), or save it under a
  new name and update the `src` in every `.html` file (search for `mark.svg`).
- PNG works too: save as `assets/logo/mark.png` and change `src="assets/logo/mark.svg"` to
  `src="assets/logo/mark.png"` in the HTML files.

## 3. How to replace product images

Product photos live in `assets/products/` (one image per product). To swap a photo,
either replace the file keeping the same name (e.g. `roasted-chana.jpg`), or add your new
image to `assets/products/` and update that product's `image` path in `js/products.js`.

## 4. How to change the WhatsApp number

Open `js/app.js`. At the very top you will find the **OWNER CONFIGURATION** block:

```js
WHATSAPP_NUMBER: "919999999999",   // replace with your number, digits only
```

Use the international format with country code and **no** `+`, spaces or dashes.
Example for an Indian number 98765 43210 → `"919876543210"`.
This one change updates every WhatsApp button on the website.

## 5. How to change prices

Open `js/products.js`. Each product has a `price` field, for example:

```js
price: "Coming Soon"   →   price: "₹20"
```

Prices are plain text, so `₹20`, `₹45 (500g)` etc. all work.

## 6. How to add a new product

Open `js/products.js` and copy any block from `{ ... },` inside the `PRODUCTS` list, then edit:

```js
{
  id: "new-snack",                        // unique, lowercase, no spaces
  name: "New Snack",
  description: "One tasty sentence.",
  image: "assets/products/new-snack.jpg",
  imageAlt: "Describe the photo",
  sizes: ["100g", "250g"],
  price: "Coming Soon",
  available: true,
  category: "namkeen"                     // bhuja | roasted | namkeen | drinks
}
```

Save and refresh — the card, filter and WhatsApp ordering appear automatically.

## 7. How to deploy on GitHub Pages

1. Create a GitHub account and a new **public** repository (e.g. `sunny-bhuja-house`).
2. Upload all files from this folder (index.html, css/, js/, assets/, favicon.ico, robots.txt,
   sitemap.xml) to the repository — the files, not the folder itself.
3. In the repository: **Settings → Pages → Source: Deploy from a branch → Branch: main / root → Save.**
4. After a minute your site is live at `https://<username>.github.io/sunny-bhuja-house/`.

## 8. How to connect sunnybhujahouse.in later

1. Buy the domain from any registrar (GoDaddy, Namecheap, Hostinger, etc.).
2. In the repository: **Settings → Pages → Custom domain** → enter `sunnybhujahouse.in` → Save.
3. At your registrar, add DNS records as GitHub instructs:
   - `A` records for the root domain → GitHub Pages IPs (185.199.108.153, 185.199.109.153,
     185.199.110.153, 185.199.111.153)
   - `CNAME` record for `www` → `<username>.github.io`
4. Wait for DNS to propagate (up to 24 h) and enable **Enforce HTTPS** in Settings → Pages.
5. Update the canonical/OG URLs in the HTML only if you keep the domain long-term
   (they already point to `https://sunnybhujahouse.in`).

## 9. How to update Instagram / Facebook / X links

In `js/app.js`, owner configuration block:

```js
INSTAGRAM_URL: "https://www.instagram.com/sunnybhujahouse",
FACEBOOK_URL:  "https://www.facebook.com/sunnybhujahouse",
X_URL:         "https://x.com/sunnybhujahouse",
GOOGLE_BUSINESS_URL: "",   // Google Business Profile link
```

Every social icon on the website updates from these four lines.

## 10. How to add the final Google Maps location

1. Open Google Maps and search your shop location.
2. Choose **Share → Embed a map → copy the link inside `src="..."`** of the iframe code.
3. Paste it in `js/app.js`:

```js
GOOGLE_MAPS_URL: "https://www.google.com/maps/embed?pb=...",
```

The map placeholder on the Home and Contact pages is replaced by the real map automatically.

---

## File structure

```
sunny-bhuja-house/
├── index.html          # Home (hero, products, why us, story, packaging, delivery, contact)
├── products.html       # Full catalog with filters
├── about.html          # Our story, values, roadmap
├── contact.html        # Business info, how to order, map
├── css/style.css       # All styling (brand colors via CSS variables at the top)
├── js/app.js           # OWNER CONFIGURATION + site behaviour
├── js/products.js      # Product data — edit products/prices here
├── assets/
│   ├── logo/           # mark.svg, logo.svg
│   ├── products/       # Product photos
│   └── images/         # Hero & story photos
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

## Brand color system

Change these variables at the top of `css/style.css` to re-skin the entire site:

```css
--primary: #8c1d18;      /* deep warm red / maroon */
--secondary: #e9a31c;    /* golden accent */
--background: #faf4e8;   /* cream */
--surface: #ffffff;      /* cards */
--text: #2a1a12;         /* dark brown */
--muted: #7c6a5a;
--border: #ebdecb;
```

## Future-ready

The site is intentionally simple now (Phase 1: website + WhatsApp ordering). The product data
already lives in one JavaScript array, so an online catalogue, cart, payments and order tracking
can be layered on later without redesigning anything.
