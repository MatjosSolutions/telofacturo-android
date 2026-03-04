const products = [
  { id: 1, name: "Mouse inalámbrico", category: "Accesorios", price: 25.9 },
  { id: 2, name: "Monitor 24\"", category: "Pantallas", price: 189.99 },
  { id: 3, name: "Auriculares Pro", category: "Audio", price: 79.5 },
];

const form = document.getElementById("product-form");
const tableBody = document.getElementById("product-table-body");
const count = document.getElementById("count");
const formTitle = document.getElementById("form-title");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const productIdInput = document.getElementById("product-id");
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const searchInput = document.getElementById("search");
const statTotal = document.getElementById("stat-total");
const statValue = document.getElementById("stat-value");

function formatCurrency(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function getFilteredProducts() {
  const term = searchInput.value.trim().toLowerCase();

  if (!term) {
    return products;
  }

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term),
  );
}

function renderMetrics() {
  const totalValue = products.reduce((acc, product) => acc + product.price, 0);
  statTotal.textContent = String(products.length);
  statValue.textContent = formatCurrency(totalValue);
}

function renderTable() {
  tableBody.innerHTML = "";
  const filteredProducts = getFilteredProducts();

  if (filteredProducts.length === 0) {
    const emptyState = document
      .getElementById("empty-state-template")
      .content.cloneNode(true);
    tableBody.appendChild(emptyState);
  } else {
    filteredProducts.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${formatCurrency(product.price)}</td>
        <td>
          <div class="row-actions">
            <button class="btn sm edit" data-action="edit" data-id="${product.id}">Editar</button>
            <button class="btn sm delete" data-action="delete" data-id="${product.id}">Eliminar</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  count.textContent = `${filteredProducts.length} de ${products.length} items`;
  renderMetrics();
}

function resetForm() {
  form.reset();
  productIdInput.value = "";
  formTitle.textContent = "Crear producto";
  saveBtn.textContent = "Guardar";
  cancelBtn.hidden = true;
}

function upsertProduct(event) {
  event.preventDefault();

  const payload = {
    name: nameInput.value.trim(),
    category: categoryInput.value.trim(),
    price: Number(priceInput.value),
  };

  if (
    !payload.name ||
    !payload.category ||
    Number.isNaN(payload.price) ||
    payload.price < 0
  ) {
    return;
  }

  const editId = Number(productIdInput.value);

  if (editId) {
    const index = products.findIndex((product) => product.id === editId);
    if (index >= 0) {
      products[index] = { ...products[index], ...payload };
    }
  } else {
    products.unshift({
      id: Date.now(),
      ...payload,
    });
  }

  resetForm();
  renderTable();
}

function onTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;
  const productId = Number(id);
  const selectedProduct = products.find((product) => product.id === productId);

  if (!selectedProduct) {
    return;
  }

  if (action === "edit") {
    productIdInput.value = selectedProduct.id;
    nameInput.value = selectedProduct.name;
    categoryInput.value = selectedProduct.category;
    priceInput.value = selectedProduct.price;
    formTitle.textContent = "Editar producto";
    saveBtn.textContent = "Actualizar";
    cancelBtn.hidden = false;
    nameInput.focus();
    return;
  }

  if (action === "delete") {
    const index = products.findIndex((product) => product.id === productId);
    if (index >= 0) {
      products.splice(index, 1);
    }

    if (Number(productIdInput.value) === productId) {
      resetForm();
    }

    renderTable();
  }
}

form.addEventListener("submit", upsertProduct);
cancelBtn.addEventListener("click", resetForm);
tableBody.addEventListener("click", onTableClick);
searchInput.addEventListener("input", renderTable);

renderTable();
