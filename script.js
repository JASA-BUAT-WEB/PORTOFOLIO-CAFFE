const NOMOR_WA = "6285161983346";

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const filterButtons = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product-card");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const terbuka = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(terbuka));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const kategori = button.dataset.filter;

      filterButtons.forEach((item) => {
        const aktif = item === button;
        item.classList.toggle("active", aktif);
        item.setAttribute("aria-pressed", String(aktif));
      });

      products.forEach((product) => {
        const tampil = kategori === "all" || product.dataset.category === kategori;
        product.classList.toggle("hidden", !tampil);
      });
    });
  });
}

function pesanMenu(nama, harga) {
  const hargaFormat = Number(harga).toLocaleString("id-ID");
  const pesan = `Halo NOIR COFFEE, saya ingin memesan ${nama} seharga Rp${hargaFormat}. Apakah masih tersedia?`;
  bukaWhatsApp(pesan);
}

function bukaWhatsApp(pesan) {
  if (!/^\d{10,15}$/.test(NOMOR_WA)) {
    alert("Periksa kembali nomor WhatsApp di file script.js.");
    return;
  }

  const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".order-button").forEach((button) => {
  button.addEventListener("click", () => {
    pesanMenu(button.dataset.name, button.dataset.price);
  });
});

const contactButton = document.getElementById("contactButton");
if (contactButton) {
  contactButton.addEventListener("click", (event) => {
    event.preventDefault();
    bukaWhatsApp("Halo NOIR COFFEE, saya ingin bertanya tentang menu dan pemesanan.");
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}