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

// MODAL TAMBAH KAMAR
document.addEventListener('DOMContentLoaded', () => {
  const addKamarBtn = document.getElementById('addKamarBtn');
  if (!addKamarBtn) return;

  const modal = document.getElementById('modal-TambahKamar');
  const overlay = document.getElementById('overlayModal');
  const successOverlay = document.getElementById('successOverlay');
  const form = modal.querySelector('form');

  // Fungsi toggle modal (Buka/Tutup sekaligus)
  const toggleModal = (show = false) => {
    const display = show ? 'block' : 'none';
    modal.style.display = display;
    overlay.style.display = display;
  };

  // Event untuk membuka modal
  addKamarBtn.onclick = () => toggleModal(true);

  // Event untuk menutup modal (Close button, Cancel, & Overlay)
  [modal.querySelector('.close-btn'), modal.querySelector('.btn-cancel'), overlay]
    .forEach(el => el.onclick = () => toggleModal(false));

  // Submit form
  form.onsubmit = (e) => {
    e.preventDefault();
    
    toggleModal(false); // Tutup modal input
    
    // Tampilkan & sembunyikan success overlay
    successOverlay.style.display = 'flex';
    setTimeout(() => successOverlay.style.display = 'none', 2000);
    
    console.log('Form submitted');
  };

  // MODAL EDIT KAMAR
  const modalEdit = document.getElementById('modalEditKamar');
  const successOverlayEdit = document.getElementById('successOverlayEdit');
  const formEdit = modalEdit.querySelector('form');

  // Fungsi toggle modal edit
  const toggleModalEdit = (show = false) => {
    const display = show ? 'block' : 'none';
    modalEdit.style.display = display;
    overlay.style.display = display;
  };

  // Event delegation untuk tombol edit di card
  document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-icon')) {
      e.preventDefault();
      
      // Ambil data dari card yang diklik
      const card = e.target.closest('.card');
      const nomor = card.querySelector('.card-title').textContent;
      const tipe = card.querySelector('.card-type').textContent;
      const harga = card.querySelector('.card-price').textContent.replace(' /bulan', '');
      const fasilitas = 'Lemari, WiFi, dll'; // Default, bisa disesuaikan
      
      // Isi form edit
      document.getElementById('edit-nomor').value = nomor;
      document.getElementById('edit-tipe').value = tipe.toLowerCase();
      document.getElementById('edit-harga').value = harga;
      document.getElementById('edit-fasilitas').value = fasilitas;
      
      toggleModalEdit(true);
    }
  });

  // Tutup modal edit
  [modalEdit.querySelector('.close-btn'), modalEdit.querySelector('.btn-cancel'), overlay]
    .forEach(el => el.onclick = () => toggleModalEdit(false));

  // Submit form edit
  formEdit.onsubmit = (e) => {
    e.preventDefault();
    
    toggleModalEdit(false);
    
    successOverlayEdit.style.display = 'flex';
    setTimeout(() => successOverlayEdit.style.display = 'none', 2000);
    
    console.log('Edit form submitted');
  };

  // MODAL DELETE KAMAR
  const modalDelete = document.getElementById('modalDeleteKamar');
  const successOverlayDelete = document.getElementById('successOverlayDelete');

  // Fungsi toggle modal delete
  const toggleModalDelete = (show = false) => {
    const display = show ? 'block' : 'none';
    modalDelete.style.display = display;
    overlay.style.display = display;
  };

  // Event delegation untuk tombol delete di card
  document.addEventListener('click', (e) => {
    if (e.target.closest('.delete-icon')) {
      e.preventDefault();
      
      // Ambil nomor kamar dari card
      const card = e.target.closest('.card');
      const nomor = card.querySelector('.card-title').textContent;
      
      document.getElementById('delete-nomor').textContent = nomor;
      
      toggleModalDelete(true);
    }
  });

  // Tutup modal delete
  [modalDelete.querySelector('.close-btn'), modalDelete.querySelector('.btn-cancel'), overlay]
    .forEach(el => el.onclick = () => toggleModalDelete(false));

  // Submit delete
  modalDelete.querySelector('.btn-delete').onclick = () => {
    toggleModalDelete(false);
    
    successOverlayDelete.style.display = 'flex';
    setTimeout(() => successOverlayDelete.style.display = 'none', 2000);
    
    console.log('Delete confirmed');
  };
});
