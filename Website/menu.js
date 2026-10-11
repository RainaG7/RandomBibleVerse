const menuButton = document.getElementById("menu-button");
const sideMenu = document.getElementById("side-menu");

menuButton.addEventListener("click", function () {
    const isOpen = sideMenu.classList.toggle("open");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
});

// Close the menu when clicking outside it
document.addEventListener("click", function (event) {
    if (
        !sideMenu.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {
        sideMenu.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    }
});

// Close the menu with Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        sideMenu.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    }
});