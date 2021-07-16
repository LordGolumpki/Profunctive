const deleteSnippetButtons = document.querySelectorAll(".deletesnippet");

deleteSnippetButtons.forEach((deleteSnippetButton) => {
    deleteSnippetButton.addEventListener("click", (event) => {
        deleteSnippetButton.parentElement.remove();
    });
});