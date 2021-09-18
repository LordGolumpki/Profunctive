// Grab all relevant board elements
const boardNameInput = document.querySelector(".boardnameinput");
const snippets = document.querySelectorAll(".snippet");
const userId = document.querySelector(".userid").innerHTML.trim();
const addNoteButton = document.querySelector(".addnote");
const noteTitles = document.querySelectorAll(".notetitle");
const addSnippetButtons = document.querySelectorAll(".addnewsnippet");
const deleteNoteButtons = document.querySelectorAll(".deletenote");
const deleteSnippetButtons = document.querySelectorAll(".deletesnippet");

// Add listener to new note button
addNoteButton.addEventListener("click", async () => {
    // Retrieve an object id from the server
    let noteId = null;
    await fetch(`/board/newnote/${userId}`, {
        method: "POST"
    }).then(async (res) => {
        await res.json().then(data => {
            noteId = data.id;
        });
    });

    // Create the note element
    const note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("shadow");
    note.id = "i" + noteId;

    // Create the top that contains the delete button for the note
    const noteTop = document.createElement("div");
    noteTop.classList.add("notetop");
    noteTop.classList.add("d-flex");
    const deleteNoteButton = document.createElement("button");
    deleteNoteButton.classList.add("transparentbutton");
    deleteNoteButton.classList.add("deletenote");
    deleteNoteButton.innerHTML = "&times;";
    deleteNoteButton.addEventListener("click", () => {
        fetch(`/board/deletenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        deleteNoteButton.parentElement.parentElement.remove();
    });
    const noteTitle = document.createElement("div");
    noteTitle.classList.add("notetitle");
    noteTitle.contentEditable = true;
    noteTitle.addEventListener("focusout", (event) => {
        const snippetsArr = getSnippets("i" + noteId);
        fetch(`/board/updatenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId,
                snippets: snippetsArr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    });
    noteTop.append(noteTitle);
    noteTop.append(deleteNoteButton);

    // Create initial snippet in the note
    const snippet = createSnippet();
    snippet.addEventListener("focusout", (event) => {
        const snippetsArr = getSnippets("i" + noteId);
        fetch(`/board/updatenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId,
                snippets: snippetsArr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    });

    // Create button to add new snippets to the note
    const addNewSnippet = document.createElement("button");
    addNewSnippet.classList.add("transparentbutton");
    addNewSnippet.classList.add("addnewsnippet");
    addNewSnippet.innerHTML = "+";
    addNewSnippet.addEventListener("click", () => {
        const snippet = createSnippet();
        snippet.addEventListener("focusout", (event) => {
            const snippetsArr = getSnippets("i" + noteId);
            fetch(`/board/updatenote/${userId}`, {
                method: "POST",
                body: JSON.stringify({
                    note: noteId,
                    snippets: snippetsArr
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
        addNewSnippet.before(snippet);
    });

    // Append newly created elements to the note
    note.append(noteTop);
    note.append(snippet);
    note.append(addNewSnippet);

    // Insert the note before the note creation button
    addNoteButton.before(note);
});

// Add listener to send board name updates to server
boardNameInput.addEventListener("focusout", (event) => {
    fetch(`/board/updatename/${userId}`, {
        method: "POST",
        body: JSON.stringify({
            newBoardName: boardNameInput.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
});

// Add listener to send note title updates to server
noteTitles.forEach((noteTitle) => {
    noteTitle.addEventListener("focusout", (event) => {
        const noteId = noteTitle.parentElement.parentElement.id.substring(1);
        const snippetsArr = getSnippets("i" + noteId);
        fetch(`/board/updatenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId,
                snippets: snippetsArr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    });
});

// Add listeners to send snippet updates to server
snippets.forEach((snippet) => {
    snippet.addEventListener("focusout", (event) => {
        const noteId = snippet.parentElement.id.substring(1);
        const snippetsArr = getSnippets("i" + noteId);
        fetch(`/board/updatenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId,
                snippets: snippetsArr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    });
});

// Add listener to each existing new snippet button
addSnippetButtons.forEach((addSnippetButton) => {
    addSnippetButton.addEventListener("click", (event) => {
        const noteId = addSnippetButton.parentElement.id.substring(1);
        const snippet = createSnippet();
        snippet.addEventListener("focusout", (event) => {
            const snippetsArr = getSnippets("i" + noteId);
            fetch(`/board/updatenote/${userId}`, {
                method: "POST",
                body: JSON.stringify({
                    note: noteId,
                    snippets: snippetsArr
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
        addSnippetButton.before(snippet);
    });
});

// Add listener to each existing delete note button
deleteNoteButtons.forEach((deleteNoteButton) => {
    deleteNoteButton.addEventListener("click", (event) => {
        const noteId = deleteNoteButton.parentElement.parentElement.id.substring(1);
        fetch(`/board/deletenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        deleteNoteButton.parentElement.parentElement.remove();
    });
});

// Add listener to each existing delete snippet button
deleteSnippetButtons.forEach((deleteSnippetButton) => {
    deleteSnippetButton.addEventListener("click", (event) => {
        const noteId = deleteSnippetButton.parentElement.parentElement.id.substring(1);
        deleteSnippetButton.parentElement.remove();
        const snippetsArr = getSnippets("i" + noteId);
        fetch(`/board/updatenote/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                note: noteId,
                snippets: snippetsArr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    });
});