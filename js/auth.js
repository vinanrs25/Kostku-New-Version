const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function() {
    // cek tipe inputan
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // ganti icon
    if (type === "text") {
        this.src = "img/eye-open.png";
    } else {
        this.src = "img/eye-close.png";
    }
})

console.log(this.src)