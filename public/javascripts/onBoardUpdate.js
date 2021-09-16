// Grab all relevant board elements
const boardNameInput = document.querySelector(".boardnameinput");
const snippets = document.querySelectorAll(".snippet");
const userId = document.querySelector(".userid").innerHTML.trim();
const addNoteButton = document.querySelector(".addnote");

// Add listener to new note button
addNoteButton.addEventListener("click", () => {
    // Create the note element
    let note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("shadow");

    // Create the top that contains the delete button for the note
    let noteTop = document.createElement("div");
    noteTop.classList.add("notetop");
    noteTop.classList.add("d-flex");
    let deleteNoteButton = document.createElement("button");
    deleteNoteButton.classList.add("transparentbutton");
    deleteNoteButton.classList.add("deletenote");
    deleteNoteButton.innerHTML = "&times;";
    deleteNoteButton.addEventListener("click", () => {
        deleteNoteButton.parentElement.parentElement.remove();
    });
    let noteTitle = document.createElement("div");
    noteTitle.classList.add("notetitle");
    noteTitle.contentEditable = true;
    noteTop.append(noteTitle);
    noteTop.append(deleteNoteButton);

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

// Add listener to send board name updates to server
boardNameInput.addEventListener("focusout", (event) => {
    fetch(`/board/${userId}/name`, {
        method: "POST",
        body: JSON.stringify({
            newBoardName: boardNameInput.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
});

// Add listeners to send snippet updates to server
// snippets.forEach((snippet) => {
//     snippet.addEventListener("focusout", (event) => {
//         fetch(`/board/${userId}/note`, {
//             method: "POST",
//             body: JSON.stringify({
//                 newBoardName: boardNameInput.value
//             }),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     });
// });

