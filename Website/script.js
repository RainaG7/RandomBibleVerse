
const verseElement = document.getElementById("verse");
const verseLabel = document.getElementById("verse-label");

const randomButton = document.getElementById("random-button");
const favoriteButton = document.getElementById("favorite-button");
const copyButton = document.getElementById("copy-button");

const aboutButton = document.getElementById("about-button");
const aboutSection = document.getElementById("about-section");
const aboutText = document.getElementById("about-text");


let favorites =
    JSON.parse(localStorage.getItem("favoriteVerses")) || [];


// ABOUT THIS VERSE

aboutButton.addEventListener("click", function() {

    if (aboutSection.style.display === "block") {

        aboutSection.style.display = "none";

        return;

    }


    const currentLabel = verseLabel.textContent;

    const currentVerse = verses.find(function(verse) {

        return verse.label === currentLabel;

    });


    if (currentVerse) {

        aboutText.textContent = currentVerse.about;

        aboutSection.style.display = "block";

    } else {

        aboutText.textContent =
            "Please choose a random Bible verse first.";

        aboutSection.style.display = "block";

    }

});


// COPY VERSE

copyButton.addEventListener("click", function() {

    const textToCopy =
        verseLabel.textContent + "\n\n" +
        verseElement.textContent;

    navigator.clipboard.writeText(textToCopy);

    copyButton.textContent = "✓ Copied!";

    setTimeout(function() {

        copyButton.textContent = "📋 Copy Verse";

    }, 2000);

});


// RANDOM VERSE

function showRandomVerse() {

    const randomIndex =
        Math.floor(Math.random() * verses.length);

    const selectedVerse =
        verses[randomIndex];


    verseLabel.textContent =
        selectedVerse.label;

    verseElement.textContent =
        selectedVerse.verse;


    aboutSection.style.display = "none";

    aboutText.textContent = "";


    updateFavoriteButton();

}

randomButton.addEventListener(
    "click",
    showRandomVerse
);


// FAVORITE VERSE

favoriteButton.addEventListener("click", function() {

    const currentVerse = {

        label: verseLabel.textContent,

        verse: verseElement.textContent

    };


    const existingIndex =
        favorites.findIndex(function(favorite) {

            return favorite.label === currentVerse.label;

        });


    if (existingIndex !== -1) {

        favorites.splice(existingIndex, 1);

        favoriteButton.textContent =
            "❤️ Favorite Verse";

    } else {

        favorites.push(currentVerse);

        favoriteButton.textContent =
            "💔 Unfavorite Verse";

    }


    localStorage.setItem(
        "favoriteVerses",
        JSON.stringify(favorites)
    );

});


// UPDATE FAVORITE BUTTON

function updateFavoriteButton() {

    const currentLabel =
        verseLabel.textContent;


    const isFavorite =
        favorites.some(function(favorite) {

            return favorite.label === currentLabel;

        });


    if (isFavorite) {

        favoriteButton.textContent =
            "💔 Unfavorite Verse";

    } else {

        favoriteButton.textContent =
            "❤️ Favorite Verse";

    }

}


updateFavoriteButton();

// PERSONAL NOTES ON VERSES

const noteInput = document.getElementById("verse-note");
const saveNoteButton = document.getElementById("save-note-button");
const noteStatus = document.getElementById("note-status");

// Load the saved note for the current verse
function loadVerseNote() {
    const currentLabel = verseLabel.textContent;

    const savedNotes =
        JSON.parse(localStorage.getItem("verseNotes")) || {};

    noteInput.value = savedNotes[currentLabel] || "";
    noteStatus.textContent = "";
}

// Save the note for the current verse
saveNoteButton.addEventListener("click", function() {
    const currentLabel = verseLabel.textContent;

    if (!currentLabel || currentLabel === "Welcome to") {
        noteStatus.textContent =
            "Please choose a Bible verse first.";
        return;
    }

    const savedNotes =
        JSON.parse(localStorage.getItem("verseNotes")) || {};

    savedNotes[currentLabel] = noteInput.value;

    localStorage.setItem(
        "verseNotes",
        JSON.stringify(savedNotes)
    );

    noteStatus.textContent = "✅ Your note has been saved!";
});

// Load the correct note whenever a new verse is selected
randomButton.addEventListener("click", loadVerseNote);

// Load a saved note when the page opens
loadVerseNote();


/* OPEN AND CLOSE PERSONAL NOTES */

const notesButton = document.getElementById("notes-button");
const notesSection = document.getElementById("notes-section");

notesButton.addEventListener("click", function() {
    notesSection.classList.toggle("notes-open");

    if (notesSection.classList.contains("notes-open")) {
        notesButton.textContent = "✖ Close Notes";
        notesSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        noteInput.focus({ preventScroll: true });
    } else {
        notesButton.textContent = "📝 My Notes";
    }
});