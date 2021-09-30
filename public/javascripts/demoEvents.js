// Grab all relevant board elements
const boardNameInput = document.querySelector(".boardnameinput");
const snippets = document.querySelectorAll(".snippet");
const addNoteButton = document.querySelector(".addnote");
const noteTitles = document.querySelectorAll(".notetitle");
const addSnippetButtons = document.querySelectorAll(".addnewsnippet");
const deleteNoteButtons = document.querySelectorAll(".deletenote");
const deleteSnippetButtons = document.querySelectorAll(".deletesnippet");

// Add listener to new note button
addNoteButton.addEventListener("click", async () => {
    // Create the note element
    const note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("shadow");

    // Create the top that contains the delete button for the note
    const noteTop = document.createElement("div");
    noteTop.classList.add("notetop");
    noteTop.classList.add("d-flex");
    const deleteNoteButton = document.createElement("button");
    deleteNoteButton.classList.add("transparentbutton");
    deleteNoteButton.classList.add("deletenote");
    deleteNoteButton.innerHTML = "&times;";
    deleteNoteButton.addEventListener("click", (event) => {
        deleteNoteButton.parentElement.parentElement.classList.toggle("fade");
        setTimeout(() => { deleteNoteButton.parentElement.parentElement.remove(); }, 500);
    });
    const noteTitle = document.createElement("div");
    noteTitle.classList.add("notetitle");
    noteTitle.contentEditable = true;
    noteTop.append(noteTitle);
    noteTop.append(deleteNoteButton);

    // Create initial snippet in the note
    const snippet = createSnippet();

    // Create button to add new snippets to the note
    const addNewSnippet = document.createElement("button");
    addNewSnippet.classList.add("transparentbutton");
    addNewSnippet.classList.add("addnewsnippet");
    addNewSnippet.innerHTML = "+";
    addNewSnippet.addEventListener("click", () => {
        const snippet = createSnippet();
        addNewSnippet.before(snippet);
    });

    // Append newly created elements to the note
    note.append(noteTop);
    note.append(snippet);
    note.append(addNewSnippet);

    // Insert the note before the note creation button
    addNoteButton.before(note);
});

// Add listener the existing new snippet button
addSnippetButtons.forEach((addSnippetButton) => {
    addSnippetButton.addEventListener("click", (event) => {
        const snippet = createSnippet();
        addSnippetButton.before(snippet);
    });
});

// Add listener to the existing delete note button
deleteNoteButtons.forEach((deleteNoteButton) => {
    deleteNoteButton.addEventListener("click", (event) => {
        deleteNoteButton.parentElement.parentElement.classList.toggle("fade");
        setTimeout(() => { deleteNoteButton.parentElement.parentElement.remove(); }, 500);
    });
});

// Add listener to the existing delete snippet button
deleteSnippetButtons.forEach((deleteSnippetButton) => {
    deleteSnippetButton.addEventListener("click", (event) => {
        deleteSnippetButton.parentElement.classList.toggle("fade");
        setTimeout(() => { deleteSnippetButton.parentElement.remove(); }, 500);
    });
});

// Helper function that creates snippets
function createSnippet() {
    const snippet = document.createElement("div");
    snippet.classList.add("snippet");
    snippet.classList.add("d-flex");
    snippet.classList.add("align-content-start");

    const snippetInput = document.createElement("div");
    snippetInput.classList.add("snippetinput");
    snippetInput.contentEditable = true;

    const deleteSnippet = document.createElement("button");
    deleteSnippet.classList.add("transparentbutton");
    deleteSnippet.classList.add("deletesnippet");
    deleteSnippet.innerHTML = "&times;"
    deleteSnippet.addEventListener("click", (event) => {
        deleteSnippet.parentElement.classList.toggle("fade");
        setTimeout(() => { deleteSnippet.parentElement.remove(); }, 500);
    });

    snippet.append(snippetInput);
    snippet.append(deleteSnippet);

    return snippet
};