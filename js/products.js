/* ==========================================================================
   SUNNY BHUJA HOUSE — products.js
   --------------------------------------------------------------------------
   All products live in this ONE list. Add, remove or edit products here and
   the website rebuilds the catalog automatically. Set "price" to a string
   like "₹20" once prices are final, or keep "Coming Soon".
   category must be one of: bhuja | roasted | namkeen | drinks
   ========================================================================== */

const PRODUCT_CATEGORIES = [
  { id: "all",     label: "All" },
  { id: "bhuja",   label: "Bhuja" },
  { id: "roasted", label: "Roasted" },
  { id: "namkeen", label: "Namkeen" },
  { id: "drinks",  label: "Drinks" }
];

const PRODUCTS = [
  {
    id: "sunny-bhuja",
    name: "Sunny Bhuja",
    description: "Our signature puffed-rice bhuja — light, crunchy and seasoned the way Bihar loves it.",
    image: "assets/products/sunny-bhuja.jpg",
    imageAlt: "Bowl of Sunny Bhuja puffed-rice snack mix",
    sizes: ["50g", "100g", "250g"],
    price: "Coming Soon",
    available: true,
    category: "bhuja",
    badge: "Signature"
  },
  {
    id: "roasted-chana",
    name: "Roasted Chana",
    description: "Whole roasted chana, dry-roasted for a nutty crunch that keeps you coming back.",
    image: "assets/products/roasted-chana.jpg",
    imageAlt: "Bowl of dark roasted chana (roasted chickpeas)",
    sizes: ["100g", "250g", "500g"],
    price: "Coming Soon",
    available: true,
    category: "roasted"
  },
  {
    id: "roasted-moongfali",
    name: "Roasted Moongfali",
    description: "Golden roasted peanuts with a gentle salt kick — the everyday tea-time classic.",
    image: "assets/products/roasted-moongfali.jpg",
    imageAlt: "Close-up of roasted peanuts (moongfali)",
    sizes: ["100g", "250g", "500g"],
    price: "Coming Soon",
    available: true,
    category: "roasted"
  },
  {
    id: "sev",
    name: "Sev",
    description: "Thin, crisp sev with a warm savoury finish — made for sharing and sprinkling.",
    image: "assets/products/sev.jpg",
    imageAlt: "Fresh yellow sev piled in a large bowl",
    sizes: ["100g", "250g"],
    price: "Coming Soon",
    available: true,
    category: "namkeen"
  },
  {
    id: "chiwda",
    name: "Chiwda",
    description: "Flattened-rice chiwda tossed with peanuts and curry leaves — light and aromatic.",
    image: "assets/products/chiwda.jpg",
    imageAlt: "Bowl of chiwda — flattened rice snack mix with peanuts",
    sizes: ["100g", "250g"],
    price: "Coming Soon",
    available: true,
    category: "namkeen"
  },
  {
    id: "makka",
    name: "Makka",
    description: "Crunchy roasted makka with a toasty, homestyle flavour.",
    image: "assets/products/makka.jpg",
    imageAlt: "Bowl of crunchy roasted makka (corn snack)",
    sizes: ["100g", "250g"],
    price: "Coming Soon",
    available: true,
    category: "roasted"
  },
  {
    id: "mixed-bhuja",
    name: "Mixed Bhuja",
    description: "Bhuja, sev, peanuts and more in one hearty, full-flavoured mixture.",
    image: "assets/products/mixed-bhuja.jpg",
    imageAlt: "Bowl of mixed bhuja namkeen with sev and peanuts",
    sizes: ["100g", "250g", "500g"],
    price: "Coming Soon",
    available: true,
    category: "bhuja"
  },
  {
    id: "sunny-popcorn",
    name: "Sunny Popcorn",
    description: "Popped fresh in small batches — a simple, feel-anytime snack.",
    image: "assets/products/sunny-popcorn.jpg",
    imageAlt: "Bowl of freshly popped popcorn",
    sizes: ["100g", "250g"],
    price: "Coming Soon",
    available: true,
    category: "namkeen"
  },
  {
    id: "nimbu-pani",
    name: "Nimbu Pani",
    description: "Cool, tangy nimbu pani made fresh — the perfect partner to a packet of bhuja.",
    image: "assets/products/nimbu-pani.jpg",
    imageAlt: "Glass of fresh nimbu pani with lemon and mint",
    sizes: ["250 ml", "500 ml"],
    price: "Coming Soon",
    available: true,
    category: "drinks"
  }
];
