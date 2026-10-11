const favoritesList = document.getElementById("favorites-list");

let favorites = JSON.parse(localStorage.getItem("favoriteVerses")) || [];

if (favorites.length === 0) {

    const emptyMessage = document.createElement("p");

    emptyMessage.textContent =
        "You don't have any favorite verses yet.";

    emptyMessage.classList.add("empty-favorites");

    favoritesList.appendChild(emptyMessage);

}

favorites.forEach(function(favorite, index) {

    const favoriteItem = document.createElement("div");

    favoriteItem.classList.add("favorite-card");

    favoriteItem.innerHTML = `
        <h3>${favorite.label}</h3>

        <p>${favorite.verse}</p>

        <button class="remove-favorite">
            🗑️ Remove Favorite
        </button>
    `;

    const removeButton =
        favoriteItem.querySelector(".remove-favorite");

   removeButton.addEventListener("click", function() {

    favorites.splice(index, 1);

    localStorage.setItem(
        "favoriteVerses",
        JSON.stringify(favorites)
    );

    favoriteItem.remove();

    if (favorites.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "You don't have any favorite verses yet.";

        emptyMessage.classList.add("empty-favorites");

        favoritesList.appendChild(emptyMessage);

    }

});

    favoritesList.appendChild(favoriteItem);

});