(() => {
  const KEY = "saborCaseiroRecommendationsV1";
  const products = [
    { name: "Fresh Lemonade", label: "Limonada fresca", price: "4,50 €" },
    { name: "Specialty Coffee", label: "Café especial", price: "2,90 €" },
    { name: "House Premium Soda", label: "Refrigerante da casa", price: "3,90 €" },
    { name: "Strawberry Supreme Tart", label: "Tarte de morango", price: "7,90 €" },
    { name: "Dark Chocolate Mousse", label: "Mousse de chocolate", price: "6,50 €" },
    { name: "Red Berry Cheesecake", label: "Cheesecake de frutos vermelhos", price: "8,50 €" }
  ];
  const form = document.querySelector("#recommendation-settings-form");
  const options = document.querySelector("#recommendation-options");
  const status = document.querySelector("#recommendation-admin-status");
  if (!form || !options) return;
  let settings = { enabled: true, productNames: ["Fresh Lemonade", "Dark Chocolate Mousse", "Specialty Coffee"] };
  try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved && Array.isArray(saved.productNames)) settings = saved; } catch { /* use defaults */ }
  document.querySelector("#recommendations-enabled").checked = settings.enabled !== false;
  products.forEach(product => {
    const label = document.createElement("label"); label.className = "recommendation-option";
    const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.name = "productNames"; checkbox.value = product.name; checkbox.checked = settings.productNames.includes(product.name);
    const title = document.createElement("span"); title.textContent = product.label;
    const price = document.createElement("strong"); price.textContent = product.price;
    label.append(checkbox, title, price); options.append(label);
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const productNames = [...form.querySelectorAll('input[name="productNames"]:checked')].map(input => input.value).slice(0, 3);
    if (productNames.length === 0 && document.querySelector("#recommendations-enabled").checked) {
      status.textContent = "Seleciona pelo menos um complemento ou desativa as sugestões."; status.className = "recommendation-status is-error"; return;
    }
    settings = { enabled: document.querySelector("#recommendations-enabled").checked, productNames };
    localStorage.setItem(KEY, JSON.stringify(settings));
    status.textContent = "Sugestões guardadas neste navegador. No máximo três produtos serão apresentados por pedido.";
    status.className = "recommendation-status is-success";
  });
})();
