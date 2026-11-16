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


// GALERÍAS EMERGENTES DE TRABAJOS

const workGalleryModal = document.getElementById("workGalleryModal");
const workGalleryTitle = document.getElementById("workGalleryTitle");
const workGalleryGrid = document.getElementById("workGalleryGrid");

const workGalleries = {
  terminaciones: {
    title: "Trabajos de terminaciones",
    images: []
  },
  obra: {
    title: "Trabajos de obra",
    images: []
  },
  renovaciones: {
    title: "Trabajos de renovaciones",
    images: [
      "imagenes/a18c1c94-49d2-4f78-8ff7-0c9958202c3a.jpg",
      "imagenes/b8667ff1-c057-4130-a53a-852e870dbc17.jpg",
      "imagenes/fce1147f-d13f-424a-849d-db1f096874ac.jpg"
    ]
  }
};

let lastGalleryTrigger = null;

function openWorkGallery(category, trigger) {
  const gallery = workGalleries[category];

  if (!gallery) return;

  lastGalleryTrigger = trigger;
  workGalleryTitle.textContent = gallery.title;
  workGalleryGrid.replaceChildren();

  if (gallery.images.length === 0) {
    const message = document.createElement("p");
    message.textContent =
      "Próximamente agregaremos trabajos de esta categoría.";
    workGalleryGrid.appendChild(message);
  } else {
    gallery.images.forEach((src, index) => {
      const image = document.createElement("img");
      image.src = src;
      image.alt = `${gallery.title} - trabajo ${index + 1}`;
      image.loading = "lazy";
      workGalleryGrid.appendChild(image);
    });
  }

  workGalleryModal.classList.add("is-open");
  workGalleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("work-gallery-lock");

  workGalleryModal.querySelector(".work-gallery-close").focus();
}

function closeWorkGallery() {
  workGalleryModal.classList.remove("is-open");
  workGalleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("work-gallery-lock");

  if (lastGalleryTrigger) {
    lastGalleryTrigger.focus();
  }
}

document.querySelectorAll(".gallery-trigger").forEach(card => {
  card.addEventListener("click", () => {
    openWorkGallery(card.dataset.gallery, card);
  });

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWorkGallery(card.dataset.gallery, card);
    }
  });
});

workGalleryModal.querySelectorAll("[data-close-work-gallery]").forEach(button => {
  button.addEventListener("click", closeWorkGallery);
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    workGalleryModal.classList.contains("is-open")
  ) {
    closeWorkGallery();
  }
});

