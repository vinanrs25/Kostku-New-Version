function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    });
}

// karena dashboard ada di folder pages
loadComponent("sidebar", "../components/sidebar.html");
loadComponent("topbar", "../components/topbar.html");
