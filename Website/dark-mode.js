const darkModeButton =
    document.getElementById("dark-mode-button");


if (
    localStorage.getItem("darkMode") === "enabled"
) {

    document.body.classList.add("dark-mode");

    if (darkModeButton) {

        darkModeButton.textContent =
            "☀️ Light Mode";

    }

}


if (darkModeButton) {

    darkModeButton.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");


        if (
            document.body.classList.contains("dark-mode")
        ) {

            localStorage.setItem(
                "darkMode",
                "enabled"
            );

            darkModeButton.textContent =
                "☀️ Light Mode";

        } else {

            localStorage.setItem(
                "darkMode",
                "disabled"
            );

            darkModeButton.textContent =
                "🌙 Dark Mode";

        }

    });

}