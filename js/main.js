// COMPONENT
function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      // menjalankan menu yang sedang aktif
      setActiveMenu();
    });
}

// untuk memanggil component ke pages
loadComponent("sidebar", "../components/sidebar.html");
loadComponent("topbar", "../components/topbar.html");

// SIDEBAR
document.addEventListener("click", function (e) {
  const sidebar = document.querySelector(".sidebar");
  const burger = document.getElementById("burger-btn");
  const overlay = document.getElementById("overlay");

  // buka sidebar
  if (burger && e.target === burger) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    burger.style.display = "hidden";
  }

  // tutup sidebar
  if (overlay && (e.target.id === "overlay" || e.target.id === "content")) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    if (burger) {
      burger.classList.remove("block");
    }
  }
});

// MENU AKTIF
function setActiveMenu() {
  const links = document.querySelectorAll(".list-item a");

  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (currentPath.includes(linkPath)) {
      document.querySelectorAll(".list-item").forEach((item) => {
        item.classList.remove("active");
      });

      link.closest(".list-item").classList.add("active");
    }
  });
}
