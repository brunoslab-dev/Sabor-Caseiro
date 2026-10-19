const WHATSAPP_NUMBER = "351210000000";

const menuItems = [
  {
    category: "main",
    name: "Traditional Cod",
    description: "Selected cod loin with potatoes, eggs, onions, olives and extra virgin olive oil.",
    price: "€18.90",
    image: "images/dishes/traditional-cod.webp",
    alt: "Traditional cod with potatoes and olives",
    customizations: [
      {
        id: "side",
        title: "Choose Your Side",
        type: "radio",
        required: true,
        minChoices: 1,
        maxChoices: 1,
        options: [
          { id: "potatoes", name: "Roasted Potatoes", priceCents: 0 },
          { id: "fries", name: "French Fries", priceCents: 150 },
          { id: "rice", name: "White Rice", priceCents: 100 }
        ]
      },
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 3,
        options: [
          { id: "extra-egg", name: "Extra Egg", priceCents: 120 },
          { id: "extra-cod", name: "Extra Cod", priceCents: 450 },
          { id: "extra-olives", name: "Extra Olives", priceCents: 80 }
        ]
      }
    ]
  },
  {
    category: "main",
    name: "Special Francesinha",
    description: "Artisan sandwich layered with selected meats, melted cheese, house sauce and a fried egg.",
    price: "€16.90",
    image: "images/dishes/special-francesinha.webp",
    alt: "Special francesinha sandwich",
    customizations: [
      {
        id: "extras",
        title: "Make It Extra Special",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 3,
        options: [
          { id: "extra-cheese", name: "Extra Cheese", priceCents: 150 },
          { id: "extra-egg", name: "Extra Fried Egg", priceCents: 120 },
          { id: "extra-fries", name: "Extra French Fries", priceCents: 250 }
        ]
      }
    ]
  },
  {
    category: "main",
    name: "Seafood Paella",
    description: "Creamy rice with prawns, mussels and Mediterranean herbs for a generous taste of the coast.",
    price: "€21.90",
    image: "images/dishes/seafood-paella.webp",
    alt: "Seafood paella with prawns and mussels",
    customizations: [
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 2,
        options: [
          { id: "extra-prawns", name: "Extra Prawns", priceCents: 350 },
          { id: "extra-seafood", name: "Extra Seafood", priceCents: 450 }
        ]
      }
    ]
  },
  {
    category: "main",
    name: "Premium Grilled Picanha",
    description: "A tender cut grilled to order, served with white rice, crisp fries and fresh salad.",
    price: "€19.90",
    image: "images/dishes/grilled-picanha-premium.webp",
    alt: "Grilled picanha steak with fries and salad",
    customizations: [
      {
        id: "doneness",
        title: "Choose Your Doneness",
        type: "radio",
        required: true,
        minChoices: 1,
        maxChoices: 1,
        options: [
          { id: "medium-rare", name: "Medium Rare", priceCents: 0 },
          { id: "medium", name: "Medium", priceCents: 0 },
          { id: "well-done", name: "Well Done", priceCents: 0 }
        ]
      },
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 3,
        options: [
          { id: "extra-steak", name: "Extra Steak", priceCents: 500 },
          { id: "extra-fries", name: "Extra French Fries", priceCents: 250 },
          { id: "extra-rice", name: "Extra Rice", priceCents: 150 }
        ]
      }
    ]
  },
  {
    category: "main",
    name: "Lemon Grilled Salmon",
    description: "Grilled salmon fillet with seasonal vegetables, golden potatoes and Sicilian lemon.",
    price: "€20.90",
    image: "images/dishes/grilled-lemon-salmon.webp",
    alt: "Grilled salmon with vegetables and lemon",
    customizations: [
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 2,
        options: [
          { id: "extra-salmon", name: "Extra Salmon", priceCents: 500 },
          { id: "extra-potatoes", name: "Extra Potatoes", priceCents: 150 }
        ]
      }
    ]
  },
  {
    category: "main",
    name: "Creamy Prawn Fettuccine",
    description: "Artisan pasta in a rich house cream sauce with selected prawns and fine herbs.",
    price: "€17.90",
    image: "images/dishes/creamy-prawn-fettuccine.webp",
    alt: "Creamy fettuccine with prawns",
    customizations: [
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 2,
        options: [
          { id: "extra-prawns", name: "Extra Prawns", priceCents: 350 },
          { id: "extra-parmesan", name: "Extra Parmesan", priceCents: 120 }
        ]
      }
    ]
  },
  {
    category: "drink",
    name: "House Premium Soda",
    description: "A chilled soft drink served with crystal-clear ice, perfect alongside any dish.",
    price: "€3.90",
    image: "images/drinks/house-premium-soda.webp",
    alt: "Chilled premium soft drink",
    customizations: [
      {
        id: "size",
        title: "Choose Your Size",
        type: "radio",
        required: true,
        minChoices: 1,
        maxChoices: 1,
        options: [
          { id: "regular", name: "Regular", priceCents: 0 },
          { id: "large", name: "Large", priceCents: 100 }
        ]
      }
    ]
  },
  {
    category: "drink",
    name: "Specialty Coffee",
    description: "Selected beans with a balanced roast, served hot and aromatic.",
    price: "€2.90",
    image: "images/drinks/specialty-coffee.webp",
    alt: "Specialty coffee",
    customizations: [
      {
        id: "milk",
        title: "Choose Your Milk",
        type: "radio",
        required: false,
        minChoices: 0,
        maxChoices: 1,
        options: [
          { id: "regular-milk", name: "Regular Milk", priceCents: 0 },
          { id: "oat-milk", name: "Oat Milk", priceCents: 70 },
          { id: "no-milk", name: "No Milk", priceCents: 0 }
        ]
      }
    ]
  },
  {
    category: "drink",
    name: "Fresh Lemonade",
    description: "Fresh lemon, mint and just the right amount of sweetness for a bright finish.",
    price: "€4.50",
    image: "images/drinks/fresh-lemonade.webp",
    alt: "Fresh lemonade with mint",
    customizations: [
      {
        id: "size",
        title: "Choose Your Size",
        type: "radio",
        required: true,
        minChoices: 1,
        maxChoices: 1,
        options: [
          { id: "regular", name: "Regular", priceCents: 0 },
          { id: "large", name: "Large", priceCents: 120 }
        ]
      }
    ]
  },
  {
    category: "dessert",
    name: "Strawberry Supreme Tart",
    description: "Crisp pastry, house cream and a generous layer of fresh strawberries.",
    price: "€7.90",
    image: "images/desserts/strawberry-supreme-tart.webp",
    alt: "Strawberry tart",
    customizations: [
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 2,
        options: [
          { id: "extra-cream", name: "Extra Cream", priceCents: 100 },
          { id: "ice-cream", name: "Vanilla Ice Cream", priceCents: 180 }
        ]
      }
    ]
  },
  {
    category: "dessert",
    name: "Dark Chocolate Mousse",
    description: "Silky mousse made with fine chocolate, finished with chocolate shavings and mint.",
    price: "€6.50",
    image: "images/desserts/dark-chocolate-mousse.webp",
    alt: "Dark chocolate mousse",
    customizations: [
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 2,
        options: [
          { id: "extra-chocolate", name: "Extra Chocolate", priceCents: 100 },
          { id: "ice-cream", name: "Vanilla Ice Cream", priceCents: 180 }
        ]
      }
    ]
  },
  {
    category: "dessert",
    name: "Red Berry Cheesecake",
    description: "Velvety cheesecake topped with fresh berries and a house-made fruit coulis.",
    price: "€8.50",
    image: "images/desserts/red-berry-cheesecake.webp",
    alt: "Cheesecake with red berries",
    customizations: [
      {
        id: "extras",
        title: "Add Extras",
        type: "checkbox",
        required: false,
        minChoices: 0,
        maxChoices: 2,
        options: [
          { id: "extra-berries", name: "Extra Berries", priceCents: 150 },
          { id: "ice-cream", name: "Vanilla Ice Cream", priceCents: 180 }
        ]
      }
    ]
  }
];

const galleryItems = [
  {
    title: "The dining room",
    image: "images/gallery/the-dining-room.webp",
    alt: "Warm dining room interior"
  },
  {
    title: "The atmosphere",
    image: "images/gallery/the-atmosphere.webp",
    alt: "Premium restaurant atmosphere"
  },
  {
    title: "The experience",
    image: "images/gallery/the-experience.webp",
    alt: "Guests enjoying the restaurant"
  }
];

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function euroToCents(value) {
  const numeric = String(value)
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");

  return Math.round(Number(numeric) * 100);
}

function formatMoney(cents) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(cents / 100);
}

/* MENU CARDS */

function createMenuCard(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "col-12 col-md-6 col-xl-4";

  const article = document.createElement("article");
  article.className = "menu-card";

  const image = document.createElement("img");
  image.className = "menu-card__image";
  image.src = item.image;
  image.alt = item.alt;
  image.loading = "lazy";
  image.decoding = "async";

  const openDishDetails = () => {
    window.location.href =
      `dish.html?name=${encodeURIComponent(item.name)}`;
  };

  image.style.cursor = "pointer";
  image.setAttribute("role", "link");
  image.setAttribute("tabindex", "0");
  image.setAttribute("aria-label", `View details for ${item.name}`);
  image.addEventListener("click", openDishDetails);
  image.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDishDetails();
    }
  });

  const body = document.createElement("div");
  body.className = "menu-card__body";

  const top = document.createElement("div");
  top.className = "menu-card__top";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const price = document.createElement("span");
  price.className = "menu-card__price";
  price.textContent = item.price;

  top.append(title, price);

  const description = document.createElement("p");
  description.textContent = item.description;

  const tag = document.createElement("span");
  tag.className = "menu-card__tag";

  tag.textContent =
    item.category === "main"
      ? "From Our Kitchen"
      : item.category === "drink"
        ? "Drinks"
        : "Desserts";

  const actions = document.createElement("div");
  actions.className = "menu-card__actions";

  const detailsLink = document.createElement("a");
  detailsLink.className = "menu-details-button";
  detailsLink.href =
    `dish.html?name=${encodeURIComponent(item.name)}`;
  detailsLink.textContent = "Customize Dish";

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "menu-add-button";
  addButton.textContent = "Add to Cart";

  addButton.addEventListener("click", () => {
    addToCart(item);
  });

  actions.append(detailsLink, addButton);
  body.append(top, description, tag, actions);
  article.append(image, body);
  wrapper.appendChild(article);

  return wrapper;
}


/* MENU RENDERING AND FILTERS */

function renderMenu(filter = "all") {
  const grid = $("#menuGrid");

  if (!grid) return;

  const items =
    filter === "all"
      ? menuItems
      : menuItems.filter(item => item.category === filter);

  grid.setAttribute("aria-busy", "true");
  grid.replaceChildren(...items.map(createMenuCard));
  grid.removeAttribute("aria-busy");
}

function setupMenuFilters() {
  $$("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      $$("[data-filter]").forEach(filterButton => {
        const active = filterButton === button;

        filterButton.classList.toggle("is-active", active);
        filterButton.setAttribute(
          "aria-pressed",
          String(active)
        );
      });

      renderMenu(filter);
    });
  });
}

const API_BASE_URL = "http://localhost:3333/api";

let apiMenuCache = null;

async function getApiMenu() {
  if (apiMenuCache) return apiMenuCache;

  const response = await fetch(`${API_BASE_URL}/menu`);

  if (!response.ok) {
    throw new Error("Could not load the restaurant menu.");
  }

  apiMenuCache = await response.json();
  return apiMenuCache;
}

function normalizeOptionName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/* CART STORAGE AND STATE */

const CART_KEY = "saborCaseiroCartV1";

let cart = [];

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Could not save cart:", error);
  }
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));

    if (!Array.isArray(saved)) {
      cart = [];
      return;
    }

    cart = saved
      .filter(line =>
        line &&
        typeof line.name === "string" &&
        Number.isFinite(Number(line.priceCents)) &&
        Number(line.priceCents) >= 0
      )
      .map(line => ({
        ...line,
        priceCents: Number(line.priceCents),
        quantity: Math.max(1, Math.floor(Number(line.quantity) || 1)),
        customizations: Array.isArray(line.customizations)
          ? line.customizations
          : []
      }));
  } catch (error) {
    console.error("Could not load cart:", error);
    cart = [];
  }
}

function cartTotalCents() {
  return cart.reduce(
    (total, line) =>
      total + line.priceCents * line.quantity,
    0
  );
}

function getCustomizationKey(customizations = []) {
  return JSON.stringify(
    [...customizations].sort((a, b) =>
      String(a.id || a.name).localeCompare(
        String(b.id || b.name)
      )
    )
  );
}


/* ADD TO CART */

function addToCart(item, customizations = null, extraCents = 0) {
  if (!item || !item.name) return;

  const basePrice = euroToCents(item.price);
  const options = Array.isArray(customizations)
    ? customizations
    : Array.isArray(item.customizations)
      ? item.customizations
      : [];
  const requestedQuantity = Math.max(
    1,
    Math.floor(Number(item.quantity) || 1)
  );

  const priceCents = basePrice + Math.max(0, Number(extraCents) || 0);
  const key = getCustomizationKey(options);

  const existing = cart.find(line =>
    line.name === item.name &&
    getCustomizationKey(line.customizations || []) === key &&
    line.priceCents === priceCents
  );

  if (existing) {
    existing.quantity += requestedQuantity;
  } else {
    cart.push({
      name: item.name,
      priceCents,
      quantity: requestedQuantity,
      image: item.image,
      alt: item.alt,
      customizations: options
    });
  }

  saveCart();
  renderCart();

  const fab = $("#cartFab");

  if (fab) {
    fab.classList.add("has-items");
    fab.setAttribute("aria-label", "Open shopping cart");
  }
}


/* RENDER CART */

function renderCart() {
  const count = cart.reduce(
    (total, line) => total + line.quantity,
    0
  );

  const subtotal = cartTotalCents();

  const cartCount = $("#cartCount");
  const cartTotal = $("#cartTotal");
  const cartSubtotal = $("#cartSubtotal");
  const lines = $("#cartLines");

  if (cartCount) cartCount.textContent = String(count);
  if (cartTotal) cartTotal.textContent = formatMoney(subtotal);
  if (cartSubtotal) cartSubtotal.textContent = formatMoney(subtotal);

  if (!lines) return;

  lines.replaceChildren();

  if (!cart.length) {
    const empty = document.createElement("p");
    empty.className = "cart-empty";
    empty.textContent =
      "Your cart is empty. Add a dish from our menu to get started.";

    lines.appendChild(empty);

    $("#cartFab")?.classList.remove("has-items");
    return;
  }

  cart.forEach((line, index) => {
    const row = document.createElement("article");
    row.className = "cart-line";

    const imageSource =
      line.image ||
      menuItems.find(item => item.name === line.name)?.image;

    if (imageSource) {
      const image = document.createElement("img");
      image.className = "cart-line__image";
      image.src = imageSource;
      image.alt = line.alt || line.name;
      image.loading = "lazy";

      image.addEventListener("error", () => {
        image.hidden = true;
      }, { once: true });

      row.appendChild(image);
    }

    const details = document.createElement("div");
    details.className = "cart-line__details";

    const name = document.createElement("strong");
    name.className = "cart-line__name";
    name.textContent = line.name;

    const unitPrice = document.createElement("p");
    unitPrice.textContent = `${formatMoney(line.priceCents)} each`;

    details.append(name, unitPrice);

    if (line.customizations?.length) {
      const options = document.createElement("p");
      options.className = "cart-line__customizations";
      options.textContent = line.customizations
        .map(option =>
          typeof option === "string"
            ? option
            : option.name
        )
        .filter(Boolean)
        .join(", ");

      details.appendChild(options);
    }

    const controls = document.createElement("div");
    controls.className = "cart-line-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute(
      "aria-label",
      `Decrease quantity of ${line.name}`
    );

    minus.addEventListener("click", () => {
      line.quantity -= 1;

      if (line.quantity <= 0) {
        cart.splice(index, 1);
      }

      saveCart();
      renderCart();
    });

    const quantity = document.createElement("span");
    quantity.className = "cart-line-controls__quantity";
    quantity.textContent = String(line.quantity);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute(
      "aria-label",
      `Increase quantity of ${line.name}`
    );

    plus.addEventListener("click", () => {
      line.quantity += 1;
      saveCart();
      renderCart();
    });

    controls.append(minus, quantity, plus);

    const lineTotal = document.createElement("strong");
    lineTotal.className = "cart-line__total";
    lineTotal.textContent = formatMoney(
      line.priceCents * line.quantity
    );

    row.append(details, controls, lineTotal);
    lines.appendChild(row);
  });
}

/* DISH DETAILS AND CUSTOMIZATIONS */

function setupDishPage() {
  // Dish details and customizations are handled by js/dish.js.
  // This function must not interfere with the dedicated dish page.
  if (document.querySelector("#dishDetails")) return;

  const params = new URLSearchParams(window.location.search);
  const dishName = params.get("name");

  if (!dishName) return;

  const dish = menuItems.find(item => item.name === dishName);

  if (!dish) return;

  const title = $("#dishName");
  const description = $("#dishDescription");
  const price = $("#dishPrice");
  const image = $("#dishImage");
  const container = $("#dishCustomizations");
  const quantityInput = $("#dishQuantity");
  const total = $("#dishTotal");
  const addButton = $("#dishAddToCart");

  if (title) title.textContent = dish.name;
  if (description) description.textContent = dish.description;
  if (price) price.textContent = dish.price;

  if (image) {
    image.src = dish.image;
    image.alt = dish.alt;
  }

  if (!container) return;

  container.replaceChildren();

  let extraCents = 0;

  function getSelections() {
    return [...container.querySelectorAll("[data-option]:checked")]
      .map(input => JSON.parse(input.dataset.option));
  }

  function updateTotal() {
    const selections = getSelections();

    extraCents = selections.reduce(
      (sum, option) => sum + (Number(option.priceCents) || 0),
      0
    );

    const quantity = Math.max(
      1,
      Number.parseInt(quantityInput?.value || "1", 10)
    );

    const unitPrice = euroToCents(dish.price) + extraCents;

    if (total) {
      total.textContent = formatMoney(unitPrice * quantity);
    }

    if (price) {
      price.textContent = formatMoney(unitPrice);
    }
  }

  (dish.customizations || []).forEach(group => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "dish-customization";

    const legend = document.createElement("legend");
    legend.textContent = group.title;
    fieldset.appendChild(legend);

    group.options.forEach(option => {
      const label = document.createElement("label");
      label.className = "dish-option";

      const input = document.createElement("input");
      input.type = group.type === "radio" ? "radio" : "checkbox";
      input.name = `${group.id}-${dish.name}`;
      input.dataset.option = JSON.stringify(option);
      input.dataset.group = group.id;

      if (group.type === "radio" && group.required &&
          option === group.options[0]) {
        input.checked = true;
      }

      const optionText = document.createElement("span");
      optionText.textContent = option.name;

      const optionPrice = document.createElement("span");
      optionPrice.textContent = option.priceCents > 0
        ? `+${formatMoney(option.priceCents)}`
        : "Included";

      label.append(input, optionText, optionPrice);
      fieldset.appendChild(label);

      input.addEventListener("change", updateTotal);
    });

    container.appendChild(fieldset);
  });

  quantityInput?.addEventListener("change", () => {
    quantityInput.value = Math.max(
      1,
      Number.parseInt(quantityInput.value || "1", 10)
    );
    updateTotal();
  });

  if (addButton) {
    addButton.addEventListener("click", () => {
      const selections = getSelections();

      for (const group of dish.customizations || []) {
        const selected = selections.filter(option =>
          group.options.some(item => item.id === option.id)
        );

        if (group.required && selected.length === 0) {
          alert(`Please select an option for "${group.title}".`);
          return;
        }

        if (selected.length < (group.minChoices || 0)) {
          alert(`Please select more options for "${group.title}".`);
          return;
        }

        if (group.maxChoices &&
            selected.length > group.maxChoices) {
          alert(`Please select fewer options for "${group.title}".`);
          return;
        }
      }

      const quantity = Math.max(
        1,
        Number.parseInt(quantityInput?.value || "1", 10)
      );

      const optionNames = selections.map(option => ({
        id: option.id,
        name: option.name
      }));

      for (let i = 0; i < quantity; i++) {
        addToCart(dish, optionNames, extraCents);
      }
    });
  }

  updateTotal();
}


/* CART OVERLAY */

function openOrder() {
  const overlay = $("#orderOverlay");

  if (overlay) {
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
  }

  const checkout = $("#checkoutForm");
  const upsell = $("#upsellSection");

  if (checkout) checkout.hidden = true;
  if (upsell) upsell.hidden = false;

  renderCart();
  renderUpsells();
}

function closeOrder() {
  const overlay = $("#orderOverlay");

  if (overlay) {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
  }
}

function setupOrdering() {
  $("#cartFab")?.addEventListener("click", openOrder);
  $("#closeOrder")?.addEventListener("click", closeOrder);

  $("#orderOverlay")?.addEventListener("click", event => {
    if (event.target.id === "orderOverlay") {
      closeOrder();
    }
  });

  $("#skipUpsell")?.addEventListener("click", () => {
    const upsell = $("#upsellSection");
    const checkout = $("#checkoutForm");

    if (upsell) upsell.hidden = true;
    if (checkout) checkout.hidden = false;
  });

  


$("#checkoutForm")?.addEventListener("submit", event => {
  event.preventDefault();

  const status = $("#orderStatus");
  const form = event.currentTarget;

  if (!cart.length) {
    status.textContent = "Your cart is empty. Add a dish before checking out.";
    return;
  }

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  if (!name || !phone) {
    status.textContent = "Please enter your name and phone number.";
    return;
  }

  status.innerHTML = `
    <div class="pending-order-message">
      <div class="pending-order-icon">⏳</div>
      <h3>Pedido pendente de confirmação</h3>
      <p>Obrigado, ${name.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char])}!</p>
      <p>O teu pedido aguarda a aceitação do restaurante.</p>
      <p><strong>Recolha:</strong> Av. da Liberdade, Lisboa</p>
      <p><strong>Horário:</strong> A confirmar</p>
      <div class="pending-order-status">
        <span class="pending-order-spinner"></span>
        À espera de confirmação
      </div>
      <small>Demonstração de portefólio — nenhum pedido real foi enviado.</small>
    </div>
  `;

  status.scrollIntoView({ behavior: "smooth", block: "center" });
});
}


/* UPSELL RECOMMENDATIONS */

const RECOMMENDATIONS_KEY = "saborCaseiroRecommendationsV1";

function getRecommendations() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(RECOMMENDATIONS_KEY)
    );

    if (saved && Array.isArray(saved.productNames)) {
      return saved;
    }
  } catch (error) {
    console.error("Could not load recommendations:", error);
  }

  return {
    enabled: true,
    productNames: [
      "Fresh Lemonade",
      "Dark Chocolate Mousse",
      "Specialty Coffee"
    ]
  };
}

function renderUpsells() {
  const container = $("#upsellCards");
  const section = $("#upsellSection");

  if (!container || !section) return;

  container.replaceChildren();

  const settings = getRecommendations();
  const cartNames = new Set(cart.map(line => line.name));

  const candidates = settings.enabled
    ? menuItems.filter(item =>
        settings.productNames.includes(item.name) &&
        !cartNames.has(item.name)
      ).slice(0, 3)
    : [];

  if (!candidates.length || !cart.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  candidates.forEach(item => {
    const card = document.createElement("article");
    card.className = "upsell-card";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";

    const details = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = item.price;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "upsell-add";
    button.textContent = "Add";

    button.addEventListener("click", () => {
      addToCart(item);
      renderUpsells();
    });

    details.append(title, price, button);
    card.append(image, details);
    container.appendChild(card);
  });
}


/* GALLERY */

function renderGallery() {
  const grid = $("#galleryGrid");

  if (!grid) return;

  grid.replaceChildren();

  galleryItems.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-item";
    button.setAttribute("aria-label", `Open ${item.title}`);

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";

    button.appendChild(image);

    button.addEventListener("click", () => {
      const modal = $("#imageModal");
      const modalImage = $("#modalImage");
      const modalTitle = $("#imageModalTitle");

      if (modalImage) {
        modalImage.src = item.image;
        modalImage.alt = item.alt;
      }

      if (modalTitle) {
        modalTitle.textContent = item.title;
      }

      if (modal && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modal).show();
      }
    });

    grid.appendChild(button);
  });
}


/* NAVIGATION AND RESERVATIONS */

function setupNavigation() {
  const nav = $(".navbar-collapse");

  $$(".navbar-collapse a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
}

function setupReservationForm() {
  $("#reservationForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const status = $("#reservationStatus");

    if (status) {
      status.textContent =
        "Your reservation request has been prepared. Please contact the restaurant to confirm availability.";
    }
  });
}



/* SCROLL REVEAL */

function setupReveal() {
  const elements = $$("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

/* INITIALIZATION */

function init() {
  loadCart();
  renderMenu();
  setupMenuFilters();
  setupOrdering();
  setupDishPage();
  renderGallery();
  setupNavigation();
  setupReservationForm();
  renderCart();
  setupReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}