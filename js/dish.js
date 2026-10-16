function initDishPage() {
  const container = document.querySelector("#dishDetails");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const dishName = params.get("name");

  const dish = menuItems.find(item => item.name === dishName);

  if (!dish) {
    const message = document.createElement("div");
    message.className = "dish-not-found";

    const title = document.createElement("h1");
    title.textContent = "Dish Not Found";

    const description = document.createElement("p");
    description.textContent = "Sorry, this dish is currently unavailable.";

    const link = document.createElement("a");
    link.href = "index.html#menu";
    link.textContent = "Back to Menu";

    message.append(title, description, link);
    container.replaceChildren(message);

    document.title = "Dish Not Found | Sabor Caseiro";
    return;
  }

  const basePriceCents = parsePriceToCents(dish.price);
  const selectedOptions = new Map();

  let quantity = 1;

  const layout = document.createElement("div");
  layout.className = "dish-detail";

  const image = document.createElement("img");
  image.className = "dish-detail__image";
  image.src = dish.image;
  image.alt = dish.alt || dish.name;
  image.loading = "eager";

  const content = document.createElement("div");
  content.className = "dish-detail__content";

  const category = document.createElement("p");
  category.className = "eyebrow";
  category.textContent = getDishCategoryLabel(dish.category);

  const title = document.createElement("h1");
  title.className = "dish-detail__title";
  title.textContent = dish.name;

  const description = document.createElement("p");
  description.className = "dish-detail__description";
  description.textContent = dish.description;

  const price = document.createElement("p");
  price.className = "dish-detail__price";

  const customizationContainer = document.createElement("div");
  customizationContainer.className = "dish-customizations";

  const quantityGroup = document.createElement("div");
  quantityGroup.className = "dish-quantity";

  const quantityLabel = document.createElement("span");
  quantityLabel.textContent = "Quantity";
  quantityLabel.id = "dishQuantityLabel";

  const quantityControls = document.createElement("div");
  quantityControls.className = "dish-quantity__controls";

  const decreaseButton = document.createElement("button");
  decreaseButton.type = "button";
  decreaseButton.textContent = "−";
  decreaseButton.setAttribute("aria-label", "Decrease quantity");

  const quantityValue = document.createElement("span");
  quantityValue.className = "dish-quantity__value";
  quantityValue.setAttribute("aria-live", "polite");

  const increaseButton = document.createElement("button");
  increaseButton.type = "button";
  increaseButton.textContent = "+";
  increaseButton.setAttribute("aria-label", "Increase quantity");

  quantityControls.append(decreaseButton, quantityValue, increaseButton);
  quantityGroup.append(quantityLabel, quantityControls);

  const total = document.createElement("p");
  total.className = "dish-detail__total";
  total.setAttribute("aria-live", "polite");

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "menu-add-button";
  addButton.textContent = "Add to Cart";

  const status = document.createElement("p");
  status.className = "dish-detail__status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");

  function renderCustomizations() {
    customizationContainer.replaceChildren();

    const groups = Array.isArray(dish.customizations)
      ? dish.customizations
      : [];

    groups.forEach(group => {
      const fieldset = document.createElement("fieldset");
      fieldset.className = "dish-option-group";

      const legend = document.createElement("legend");
      legend.textContent = group.title;

      fieldset.appendChild(legend);

      const hint = document.createElement("p");
      hint.className = "dish-option-group__hint";

      if (group.type === "radio" && group.required) {
        hint.textContent = "Choose one option.";
      } else if (group.type === "checkbox") {
        hint.textContent = `Choose up to ${group.maxChoices} options.`;
      } else {
        hint.textContent = "Choose an option if you wish.";
      }

      fieldset.appendChild(hint);

      (group.options || []).forEach(option => {
        const label = document.createElement("label");
        label.className = "dish-option";

        const input = document.createElement("input");
        input.type = group.type === "checkbox" ? "checkbox" : "radio";
        input.name = `customization-${group.id}`;
        input.value = option.id;

        const selectionKey = `${group.id}:${option.id}`;
        input.checked = selectedOptions.has(selectionKey);

        const optionName = document.createElement("span");
        optionName.className = "dish-option__name";
        optionName.textContent = option.name;

        const optionPrice = document.createElement("span");
        optionPrice.className = "dish-option__price";

        const extraCents = Number(option.priceCents) || 0;
        optionPrice.textContent = extraCents > 0
          ? `+${formatPrice(extraCents)}`
          : "Included";

        input.addEventListener("change", () => {
          if (group.type === "radio") {
            for (const key of selectedOptions.keys()) {
              if (key.startsWith(`${group.id}:`)) {
                selectedOptions.delete(key);
              }
            }
          }

          if (input.checked) {
            if (group.type === "checkbox") {
              const groupCount = [...selectedOptions.keys()].filter(
                key => key.startsWith(`${group.id}:`)
              ).length;

              if (groupCount >= group.maxChoices) {
                input.checked = false;
                status.textContent =
                  `You can choose up to ${group.maxChoices} options.`;
                return;
              }
            }

            selectedOptions.set(selectionKey, {
              groupId: group.id,
              groupTitle: group.title,
              id: option.id,
              name: option.name,
              priceCents: extraCents
            });
          } else {
            selectedOptions.delete(selectionKey);
          }

          status.textContent = "";
          updateTotals();
        });

        label.append(input, optionName, optionPrice);
        fieldset.appendChild(label);
      });

      customizationContainer.appendChild(fieldset);
    });
  }

  function validateSelections() {
    for (const group of dish.customizations || []) {
      const count = [...selectedOptions.values()].filter(
        option => option.groupId === group.id
      ).length;

      const minimum = Number(group.minChoices) || 0;
      const maximum = Number(group.maxChoices);

      if (group.required && count < Math.max(1, minimum)) {
        return `Please complete: ${group.title}.`;
      }

      if (count < minimum) {
        return `Please choose at least ${minimum} option(s) for ${group.title}.`;
      }

      if (Number.isFinite(maximum) && count > maximum) {
        return `Please choose no more than ${maximum} option(s) for ${group.title}.`;
      }
    }

    return "";
  }

  function getUnitPriceCents() {
    const extras = [...selectedOptions.values()].reduce(
      (sum, option) => sum + option.priceCents,
      0
    );

    return basePriceCents + extras;
  }

  function updateTotals() {
    quantityValue.textContent = String(quantity);
    price.textContent = formatPrice(basePriceCents);
    total.textContent = `Total: ${formatPrice(getUnitPriceCents() * quantity)}`;
  }

  decreaseButton.addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    updateTotals();
  });

  increaseButton.addEventListener("click", () => {
    quantity = Math.min(99, quantity + 1);
    updateTotals();
  });

  addButton.addEventListener("click", () => {
    const validationMessage = validateSelections();

    if (validationMessage) {
      status.textContent = validationMessage;
      return;
    }

    const cartItem = {
      ...dish,
      price: formatPrice(getUnitPriceCents()),
      quantity,
      customizations: [...selectedOptions.values()].map(option => ({
        ...option
      }))
    };

    addToCart(cartItem);
    status.textContent = `${dish.name} added to cart.`;
  });

  renderCustomizations();

  content.append(
    category,
    title,
    description,
    price,
    customizationContainer,
    quantityGroup,
    total,
    addButton,
    status
  );

  layout.append(image, content);
  container.replaceChildren(layout);

  updateTotals();

  document.title = `${dish.name} | Sabor Caseiro`;
}

/* PRICE & CATEGORY HELPERS */

function parsePriceToCents(price) {
  if (typeof price === "number") {
    return Math.round(price * 100);
  }

  const normalized = String(price)
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");

  return Math.round(Number(normalized) * 100);
}

function formatPrice(cents) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR"
  }).format(cents / 100);
}

function getDishCategoryLabel(category) {
  const labels = {
    main: "FROM OUR KITCHEN",
    drink: "DRINKS",
    dessert: "DESSERTS"
  };

  return labels[category] || "OUR MENU";
}

document.addEventListener("DOMContentLoaded", initDishPage);
