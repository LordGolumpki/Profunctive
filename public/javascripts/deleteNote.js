const deleteNoteButtons = document.querySelectorAll(".closenote");

deleteNoteButtons.forEach((deleteNoteButton) => {
    deleteNoteButton.addEventListener("click", (event) => {
        deleteNoteButton.parentElement.parentElement.remove();
    });
});