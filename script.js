
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

// CATÁLOGO EMERGENTE
const catalogModal = document.getElementById("catalogModal");
const catalogTitle = document.getElementById("catalogTitle");
const catalogItems = document.getElementById("catalogItems");

const catalogData = {
  "Soluciones para techos": [
    {
      title: "Solución para techos 1",
      image: "imagenes/076167df-9b1f-4072-8cbc-9e1aaf2abbee.jpg"
    },
    {
      title: "Solución para techos 2",
      image: "imagenes/3e6f60f8-d9f1-4378-bad2-28358d4e1c49.jpg"
    },
    {
      title: "Solución para techos 3",
      image: "imagenes/490d4136-69f4-458b-848d-5267d0d32f47.jpg"
    },
    {
      title: "Solución para techos 4",
      image: "imagenes/541f284b-debf-4246-b080-63ec260fc45d.jpg"
    },
    {
      title: "Solución para techos 5",
      image: "imagenes/6f1d1ab4-ebe6-4caa-a0c6-0f1c68ec3e96.jpg"
    },
    {
      title: "Solución para techos 6",
      image: "imagenes/7fe4a94b-6b98-499a-8018-269a39a64752.jpg"
    },
    {
      title: "Solución para techos 7",
      image: "imagenes/8bc84a24-99a7-4813-828a-8a8cd96ed10e.jpg"
    },
    {
      title: "Solución para techos 8",
      image: "imagenes/9478a884-e902-4fd8-b4e0-df7ae961f842.jpg"
    }
  ],

  "Pinturas y revestimientos": [
    "Pintura para interiores",
    "Pintura para exteriores",
    "Revestimiento"
  ],

  "Materiales para obra": [
    "Material de construcción",
    "Adhesivos y selladores",
    "Accesorios para obra"
  ]
};

function openCatalog(category) {
  catalogTitle.textContent = category;

  catalogItems.innerHTML = (catalogData[category] || []).map((product, index) => {
    const isObject = typeof product === "object";

    const productName = isObject
      ? product.title
      : product;

    const productImage = isObject
      ? `<img src="${product.image}" alt="${productName}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">`
      : "IMAGEN DEL PRODUCTO";

    const message = isObject
      ? `Hola Imhoof Group, quisiera consultar por el producto ${index + 1} de Soluciones para techos.`
      : `Hola Imhoof Group, quisiera consultar precio y disponibilidad de: ${product} (${category}).`;

    const url = `https://wa.me/543413846242?text=${encodeURIComponent(message)}`;

    return `
      <article class="catalog-item">
        <div class="catalog-item-photo">
          ${productImage}
        </div>

        <div class="catalog-item-info">
          <h3>${productName}</h3>
          <p>Consultá por precio y disponibilidad.</p>
          <a href="${url}" target="_blank" rel="noopener">
            Consultar por WhatsApp
          </a>
        </div>
      </article>
    `;
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
  if (event.key === "Escape" && catalogModal.classList.contains("is-open")) {
    closeCatalog();
  }
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
