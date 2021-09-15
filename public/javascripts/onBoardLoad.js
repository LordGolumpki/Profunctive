// Grab all relevant board elements
const addNoteButton = document.querySelector(".addnote");
const addButtons = document.querySelectorAll(".addnewsnippet");
const deleteNoteButtons = document.querySelectorAll(".closenote");
const deleteSnippetButtons = document.querySelectorAll(".deletesnippet");

// Add listener to new note button
addNoteButton.addEventListener("click", () => {
    // Create the note element
    let note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("shadow");

    // Create the top that contains the close button for the note
    let noteTop = document.createElement("div");
    noteTop.classList.add("notetop");
    let closeNote = document.createElement("button");
    closeNote.classList.add("transparentbutton");
    closeNote.classList.add("closenote");
    closeNote.innerHTML = "&times;";
    closeNote.addEventListener("click", () => {
        closeNote.parentElement.parentElement.remove();
    });
    noteTop.append(closeNote);

    // Create initial snippet in the note
    let snippet = createSnippet();

    // Create button to add new snippets to the note
    let addNewSnippet = document.createElement("button");
    addNewSnippet.classList.add("transparentbutton");
    addNewSnippet.classList.add("addnewsnippet");
    addNewSnippet.innerHTML = "+";
    addNewSnippet.addEventListener("click", () => {
        let snippet = createSnippet();
        addNewSnippet.before(snippet);
    });

    // Append newly created elements to the note
    note.append(noteTop);
    note.append(snippet);
    note.append(addNewSnippet);

    // Insert the note before the note creation button
    addNoteButton.before(note);
});


// Add listener to each existing new snippet button
addButtons.forEach((addButton) => {
    addButton.addEventListener("click", (event) => {
        let snippet = createSnippet();
        addButton.before(snippet);
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

// Helper function that creates snippets
function createSnippet() {
    let snippet = document.createElement("div");
    snippet.classList.add("snippet");
    snippet.classList.add("d-flex");
    snippet.classList.add("align-content-start");

    let snippetInput = document.createElement("div");
    snippetInput.classList.add("snippetinput");
    snippetInput.contentEditable = true;

    let deleteSnippet = document.createElement("button");
    deleteSnippet.classList.add("transparentbutton");
    deleteSnippet.classList.add("deletesnippet");
    deleteSnippet.innerHTML = "&times;"
    deleteSnippet.addEventListener("click", (event) => {
        deleteSnippet.parentElement.remove();
    });

    snippet.append(snippetInput);
    snippet.append(deleteSnippet);

    return snippet
}