// Grab all relevant board elements
const addSnippetButtons = document.querySelectorAll(".addnewsnippet");
const deleteNoteButtons = document.querySelectorAll(".deletenote");
const deleteSnippetButtons = document.querySelectorAll(".deletesnippet");

// Add listener to each existing new snippet button
addSnippetButtons.forEach((addSnippetButton) => {
    addSnippetButton.addEventListener("click", (event) => {
        let snippet = createSnippet();
        addSnippetButton.before(snippet);
    });
});

// Add listener to each existing delete note button
deleteNoteButtons.forEach((deleteNoteButton) => {
    deleteNoteButton.addEventListener("click", (event) => {
        deleteNoteButton.parentElement.parentElement.remove();
    });
});

// Add listener to each existing delete snippet button
deleteSnippetButtons.forEach((deleteSnippetButton) => {
    deleteSnippetButton.addEventListener("click", (event) => {
        deleteSnippetButton.parentElement.remove();
    });
});