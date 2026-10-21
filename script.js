// =========================================================
// TERPALKU — JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // WHATSAPP
  // =========================================================

  const WHATSAPP_NUMBER = "6281234567890";


  // =========================================================
  // ELEMENTS
  // =========================================================

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const productCards =
    document.querySelectorAll(".product-card");

  const projectGroups =
    document.querySelectorAll(".event-projects");

  const productsMoreBtn =
    document.getElementById("productsMoreBtn");

  const productsMoreContainer =
    document.querySelector(".products-more");


  // =========================================================
  // PRODUCT SETTINGS
  // =========================================================

  const PRODUCTS_PER_CATEGORY = 2;

  let currentCategory = "all";
  let showAllProducts = false;


  // =========================================================
  // MOBILE MENU
  // =========================================================

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  // =========================================================
  // UPDATE SHOW MORE BUTTON
  // =========================================================

  function updateShowMoreButton() {

    if (!productsMoreBtn || !productsMoreContainer) {
      return;
    }


    // Tombol hanya muncul di Semua Produk
    if (currentCategory !== "all") {

      productsMoreContainer.classList.add("hidden");

      return;

    }


    productsMoreContainer.classList.remove("hidden");


    const buttonText =
      productsMoreBtn.querySelector(
        ".products-more-text"
      );


    if (showAllProducts) {

      buttonText.textContent =
        "Tampilkan Lebih Sedikit";

      productsMoreBtn.classList.add("expanded");

      productsMoreBtn.setAttribute(
        "aria-expanded",
        "true"
      );

    } else {

      buttonText.textContent =
        "Lihat Produk Lainnya";

      productsMoreBtn.classList.remove("expanded");

      productsMoreBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }


  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  function filterProducts(category) {

    currentCategory = category;


    // -----------------------------------------
    // RESET SHOW MORE
    // -----------------------------------------

    if (category !== "all") {
      showAllProducts = false;
    }


    // -----------------------------------------
    // UPDATE ACTIVE FILTER BUTTON
    // -----------------------------------------

    filterButtons.forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });


    // -----------------------------------------
    // SEMUA PRODUK
    // -----------------------------------------

    if (category === "all") {

      const categoryCount = {};


      productCards.forEach((card) => {

        const productCategory =
          card.dataset.category;


        if (!categoryCount[productCategory]) {
          categoryCount[productCategory] = 0;
        }


        categoryCount[productCategory]++;


        const shouldShow =
          showAllProducts ||
          categoryCount[productCategory] <=
            PRODUCTS_PER_CATEGORY;


        card.classList.toggle(
          "hidden",
          !shouldShow
        );

      });

    }


    // -----------------------------------------
    // KATEGORI SPESIFIK
    // -----------------------------------------

    else {

      productCards.forEach((card) => {

        const matches =
          card.dataset.category === category;


        card.classList.toggle(
          "hidden",
          !matches
        );

      });

    }


    // -----------------------------------------
    // PROJECT SECTION
    // -----------------------------------------

    projectGroups.forEach((project) => {

      const matches =
        category !== "all" &&
        project.dataset.projectCategory ===
          category;


      project.classList.toggle(
        "active",
        matches
      );

    });


    // -----------------------------------------
    // UPDATE SHOW MORE BUTTON
    // -----------------------------------------

    updateShowMoreButton();

  }


  // =========================================================
  // FILTER BUTTON CLICK
  // =========================================================

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.filter;


      // Reset ketika pindah filter
      showAllProducts = false;


      filterProducts(category);

    });

  });


  // =========================================================
  // SHOW MORE PRODUCTS
  // =========================================================

  if (productsMoreBtn) {

    productsMoreBtn.addEventListener(
      "click",
      () => {

        showAllProducts =
          !showAllProducts;


        filterProducts("all");


        // Kalau kembali ke mode ringkas,
        // scroll halus ke bagian produk
        if (!showAllProducts) {

          const productsSection =
            document.getElementById("products");


          if (productsSection) {

            productsSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }

      }
    );

  }


  // =========================================================
  // QUICK CATEGORY LINK
  // =========================================================

  document
    .querySelectorAll("[data-filter-link]")
    .forEach((link) => {

      link.addEventListener("click", () => {

        const category =
          link.dataset.filterLink;


        showAllProducts = false;


        filterProducts(category);

      });

    });


  // =========================================================
  // WHATSAPP URL
  // =========================================================

  function whatsappUrl(message) {

    return (
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`
    );

  }


  // =========================================================
  // PRODUCT → WHATSAPP
  // =========================================================

  document
    .querySelectorAll("[data-product]")
    .forEach((button) => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();


          const productName =
            button.dataset.product;


          const message =
            `Halo, saya ingin bertanya tentang ${productName}. ` +
            `Boleh minta informasi harga dan spesifikasinya?`;


          window.open(
            whatsappUrl(message),
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

    });


  // =========================================================
  // GENERAL WHATSAPP CTA
  // =========================================================

  const generalMessage =
    "Halo, saya ingin bertanya tentang produk terpal yang tersedia.";


  const whatsappCta =
    document.getElementById("whatsappCta");

  const floatingWa =
    document.getElementById("floatingWa");


  if (whatsappCta) {

    whatsappCta.href =
      whatsappUrl(generalMessage);

  }


  if (floatingWa) {

    floatingWa.href =
      whatsappUrl(generalMessage);

  }


  // =========================================================
  // YEAR
  // =========================================================

  const yearElement =
    document.getElementById("year");


  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  // =========================================================
  // DEFAULT FILTER
  // =========================================================

  filterProducts("all");

});