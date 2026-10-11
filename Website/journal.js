

/* PERSONAL JOURNAL */

const journalTitle = document.getElementById("journal-title");
const journalText = document.getElementById("journal-text");
const saveEntryButton = document.getElementById("save-entry-button");
const journalStatus = document.getElementById("journal-status");
const journalEntries = document.getElementById("journal-entries");

// Load saved entries
let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

// Give older entries IDs so they can be edited and deleted
entries.forEach(function(entry) {
    if (!entry.id) {
        entry.id = Date.now().toString() +
            Math.random().toString(36).slice(2);
    }
});

localStorage.setItem("journalEntries", JSON.stringify(entries));

// Remember which entry is being edited
let editingEntryId = null;

// Save entries to the browser
function saveEntries() {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
}

// Display all entries
function displayEntries() {
    journalEntries.innerHTML = "";

    if (entries.length === 0) {
        journalEntries.textContent =
            "Your journal entries will appear here. 💙";
        return;
    }

    entries.forEach(function(entry) {
        const entryCard = document.createElement("article");
entryCard.className = "journal-entry-card";

        entryCard.style.background = "#ffffff";
        entryCard.style.border = "1px solid #dbeafe";
        entryCard.style.borderRadius = "16px";
        entryCard.style.padding = "20px";
        entryCard.style.boxShadow =
            "0 3px 10px rgba(30, 58, 138, 0.05)";

        const title = document.createElement("h3");
        title.textContent = entry.title;
        title.style.color = "#1e3a8a";

        const date = document.createElement("p");
date.className = "journal-entry-date";
        date.textContent = "📅 " + entry.date;
        date.style.color = "#64748b";
        date.style.fontSize = "13px";

        const text = document.createElement("p");
text.className = "journal-entry-text";
        text.textContent = entry.text;
        text.style.color = "#334155";
        text.style.lineHeight = "1.8";
        text.style.whiteSpace = "pre-wrap";

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "✏️ Edit";
        editButton.className = "journal-action-button";

        editButton.addEventListener("click", function() {
            journalTitle.value = entry.title === "Untitled Entry"
                ? ""
                : entry.title;

            journalText.value = entry.text;
            editingEntryId = entry.id;

            saveEntryButton.textContent = "💾 Save Changes";
            journalStatus.textContent =
                "You're editing an entry. Make your changes below.";

            journalTitle.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            journalTitle.focus();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️ Delete";
        deleteButton.className = "journal-action-button";

        deleteButton.addEventListener("click", function() {
            const confirmed = confirm(
                "Are you sure you want to delete this journal entry?"
            );

            if (!confirmed) {
                return;
            }

            entries = entries.filter(function(item) {
                return item.id !== entry.id;
            });

            // Stop editing if this was the entry being edited
            if (editingEntryId === entry.id) {
                cancelEditing();
            }

            saveEntries();
            displayEntries();

            journalStatus.textContent =
                "Journal entry deleted.";
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexWrap = "wrap";
        buttonContainer.style.gap = "10px";
        buttonContainer.style.marginTop = "15px";

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        entryCard.appendChild(title);
        entryCard.appendChild(date);
        entryCard.appendChild(text);
        entryCard.appendChild(buttonContainer);

        journalEntries.appendChild(entryCard);
    });
}

// Cancel editing and return to a new entry
function cancelEditing() {
    editingEntryId = null;
    journalTitle.value = "";
    journalText.value = "";
    saveEntryButton.textContent = "💾 Save Entry";
}

// Save a new entry or save changes to an existing one
saveEntryButton.addEventListener("click", function() {
    const title = journalTitle.value.trim();
    const text = journalText.value.trim();

    if (text === "") {
        journalStatus.textContent =
            "Write something before saving! 💙";
        return;
    }

    if (editingEntryId !== null) {
        // Update the existing entry
        const entryToEdit = entries.find(function(entry) {
            return entry.id === editingEntryId;
        });

        if (entryToEdit) {
            entryToEdit.title = title || "Untitled Entry";
            entryToEdit.text = text;
            entryToEdit.date = new Date().toLocaleString();

            journalStatus.textContent =
                "✅ Your changes have been saved!";
        }

        editingEntryId = null;
        saveEntryButton.textContent = "💾 Save Entry";
    } else {
        // Create a new entry
        const newEntry = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            title: title || "Untitled Entry",
            text: text,
            date: new Date().toLocaleString()
        };

        entries.unshift(newEntry);

        journalStatus.textContent =
            "✅ Your journal entry has been saved!";
    }

    saveEntries();
    displayEntries();

    journalTitle.value = "";
    journalText.value = "";
});

// Show saved entries when the page opens
displayEntries();
