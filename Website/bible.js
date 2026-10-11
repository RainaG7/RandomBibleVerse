const bookSelect = document.getElementById("book-select");
const chapterSelect = document.getElementById("chapter-select");

const readButton = document.getElementById("read-button");

const chapterTitle =
    document.getElementById("chapter-title");

const chapterText =
    document.getElementById("chapter-text");


readButton.addEventListener("click", function() {

    const selectedBook =
        bookSelect.value;

    const selectedChapter =
        chapterSelect.value;


    if (selectedBook === "" || selectedChapter === "") {

        chapterTitle.textContent =
            "Please choose a book and chapter.";

        chapterText.textContent = "";

        return;

    }


    chapterTitle.textContent =
        selectedBook + " " + selectedChapter;


    chapterText.textContent =
        "Your Bible chapter will appear here!";

});