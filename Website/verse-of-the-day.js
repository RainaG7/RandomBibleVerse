
const today = new Date();

const dayOfYear =
    Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / 86400000
    );


const verseIndex = dayOfYear % verses.length;

const selectedVerse = verses[verseIndex];


document.getElementById("daily-verse-label").textContent =
    selectedVerse.label;

document.getElementById("daily-verse").textContent =
    selectedVerse.verse;

const streakElement = document.getElementById("streak");

let currentStreak =
    Number(localStorage.getItem("streak")) || 0;

const todayDate =
    today.toDateString();

const lastVisit =
    localStorage.getItem("lastVisit");


if (lastVisit === null) {

    currentStreak = 1;

} else {

    const previousDate =
        new Date(lastVisit);

    const difference =
        today - previousDate;

    const oneDay =
        1000 * 60 * 60 * 24;


    if (difference >= oneDay && difference < oneDay * 2) {

        currentStreak++;

    } else if (difference >= oneDay * 2) {

        currentStreak = 1;

    }

}


localStorage.setItem(
    "streak",
    currentStreak
);

localStorage.setItem(
    "lastVisit",
    todayDate
);


streakElement.textContent =
    "🔥 " + currentStreak + " Day Streak";

// DAILY VERSE FAVORITES

const dailyFavoriteButton =
    document.getElementById("daily-favorite-button");

let dailyFavorites =
    JSON.parse(localStorage.getItem("favoriteVerses")) || [];

function updateDailyFavoriteButton() {

    const isFavorite = dailyFavorites.some(function(favorite) {
        return favorite.label === selectedVerse.label;
    });

    if (isFavorite) {
        dailyFavoriteButton.textContent = "💔 Unfavorite Verse";
    } else {
        dailyFavoriteButton.textContent = "❤️ Favorite Verse";
    }
}

updateDailyFavoriteButton();

dailyFavoriteButton.addEventListener("click", function() {

    const existingIndex = dailyFavorites.findIndex(function(favorite) {
        return favorite.label === selectedVerse.label;
    });

    if (existingIndex !== -1) {

        dailyFavorites.splice(existingIndex, 1);

    } else {

        dailyFavorites.push({
            label: selectedVerse.label,
            verse: selectedVerse.verse
        });

    }

    localStorage.setItem(
        "favoriteVerses",
        JSON.stringify(dailyFavorites)
    );

    updateDailyFavoriteButton();

});