const addNoteButton = document.querySelector(".addnote");

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

    // Create button to add new snippets to the note
    let addNewSnippet = document.createElement("button");
    addNewSnippet.classList.add("transparentbutton");
    addNewSnippet.classList.add("addnewsnippet");
    addNewSnippet.innerHTML = "+";
    addNewSnippet.addEventListener("click", () => {
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
        addNewSnippet.before(snippet);
    });

    // Append newly created elements to the note
    note.append(noteTop);
    note.append(snippet);
    note.append(addNewSnippet);

    // Insert the note before the note creation button
    addNoteButton.before(note);
});