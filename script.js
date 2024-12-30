const notesContainer = document.querySelector(".notes-container");
    const createNoteBtn = document.querySelector("#create-note");

    function showNotes() {
        const storedNotes = localStorage.getItem("modernNotes");
        notesContainer.innerHTML = storedNotes ? storedNotes : "";
    }

    function updateStorage() {
        localStorage.setItem("modernNotes", notesContainer.innerHTML);
    }

    createNoteBtn.addEventListener("click", () => {
        const note = document.createElement("div");
        note.className = "note";
        note.setAttribute("contenteditable", "true");
        note.innerHTML = "<img src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' alt='Delete'> Click to edit...";

        note.querySelector("img").addEventListener("click", (e) => {
            if (confirm("Are you sure you want to delete this note?")) {
                e.target.parentElement.remove();
                updateStorage();
            }
        });

        note.addEventListener("input", updateStorage);

        notesContainer.appendChild(note);
        updateStorage();
    });

    notesContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("note")) {
            e.target.setAttribute("contenteditable", "true");
        }

        if (e.target.tagName === "IMG") {
            if (confirm("Are you sure you want to delete this note?")) {
                e.target.parentElement.remove();
                updateStorage();
            }
        }
    });

    // Prevent new line on Enter key in notes
    document.addEventListener("keydown", (e) => {
        if (e.target.classList.contains("note") && e.key === "Enter") {
            e.preventDefault();
        }
    });

    showNotes();
