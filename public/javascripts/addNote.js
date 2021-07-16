const addNoteButton = document.querySelector(".addnote");

addNoteButton.addEventListener("click", () => {
    let note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("shadow");

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

    let snippet = document.createElement("div");
    snippet.classList.add("snippet");
    let snippetInput = document.createElement("input");
    snippetInput.type = "text";
    snippetInput.classList.add("snippetinput");
    let deleteSnippet = document.createElement("button");
    deleteSnippet.classList.add("transparentbutton");
    deleteSnippet.classList.add("deletesnippet");
    deleteSnippet.innerHTML = "&times;"
    deleteSnippet.addEventListener("click", (event) => {
        deleteSnippet.parentElement.remove();
    });
    snippet.append(snippetInput);
    snippet.append(deleteSnippet);

    let addNewSnippet = document.createElement("button");
    addNewSnippet.classList.add("transparentbutton");
    addNewSnippet.classList.add("addnewsnippet");
    addNewSnippet.innerHTML = "+";
    addNewSnippet.addEventListener("click", () => {
        let snippet = document.createElement("div");
        snippet.classList.add("snippet");
        let snippetInput = document.createElement("input");
        snippetInput.type = "text";
        snippetInput.classList.add("snippetinput");
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

    note.append(noteTop);
    note.append(snippet);
    note.append(addNewSnippet);

    addNoteButton.before(note);
});