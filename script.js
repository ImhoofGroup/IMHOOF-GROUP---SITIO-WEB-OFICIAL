const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Cerrar el menú con Escape.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

// Consultas generales por WhatsApp.
document.querySelectorAll("[data-message]").forEach(link => {
  link.addEventListener("click", () => {
    const message = link.dataset.message;
    link.href = `https://wa.me/543413846242?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });
});

// Catálogo emergente: conserva el menú hamburguesa original de tres barras.
const catalogModal = document.getElementById("catalogModal");
const catalogTitle = document.getElementById("catalogTitle");
const catalogItems = document.getElementById("catalogItems");
const catalogData = {
  "Soluciones para techos": ["Impermeabilizante", "Membrana líquida", "Reparador de filtraciones"],
  "Pinturas y revestimientos": ["Pintura para interiores", "Pintura para exteriores", "Revestimiento"],
  "Materiales para obra": ["Material de construcción", "Adhesivos y selladores", "Accesorios para obra"]
};

function openCatalog(category) {
  catalogTitle.textContent = category;
  catalogItems.innerHTML = (catalogData[category] || []).map(product => {
    const message = `Hola Imhoof Group, quisiera consultar precio y disponibilidad de: ${product} (${category}).`;
    const url = `https://wa.me/543413846242?text=${encodeURIComponent(message)}`;
    return `<article class="catalog-item"><div class="catalog-item-photo">IMAGEN DEL PRODUCTO</div><div class="catalog-item-info"><h3>${product}</h3><p>Consultá por presentaciones, precio y disponibilidad.</p><a href="${url}" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></article>`;
  }).join("");
  catalogModal.classList.add("is-open");
  catalogModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("catalog-lock");
  catalogModal.querySelector(".catalog-close").focus();
}

function closeCatalog() {
  catalogModal.classList.remove("is-open");
  catalogModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("catalog-lock");
}

document.querySelectorAll(".catalog-trigger").forEach(card => {
  card.addEventListener("click", () => openCatalog(card.dataset.category));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCatalog(card.dataset.category);
    }
  });
});

catalogModal.querySelectorAll("[data-close-catalog]").forEach(button => {
  button.addEventListener("click", closeCatalog);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && catalogModal.classList.contains("is-open")) closeCatalog();
});

// Año automático del pie de página.
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
