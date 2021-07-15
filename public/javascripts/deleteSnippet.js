const deleteButtons = document.querySelectorAll(".deletesnippet");

deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
        deleteButton.parentElement.remove();
    });
});