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
        deleteSnippet.parentElement.remove();
    });

    snippet.append(snippetInput);
    snippet.append(deleteSnippet);

    return snippet
};

function getSnippets(noteId) {
    const note = document.querySelector(`#${noteId}`);
    const snippets = [];
    note.childNodes.forEach((child) => {
        if (child.tagName == "DIV" && child.classList.contains("notetop"))
            child.childNodes.forEach((grandChild) => {
                if (grandChild.tagName == "DIV" && grandChild.classList.contains("notetitle"))
                    snippets.push(grandChild.innerText);
            });
        if (child.tagName == "DIV" && child.classList.contains("snippet"))
            child.childNodes.forEach((grandChild) => {
                if (grandChild.tagName == "DIV" && grandChild.classList.contains("snippetinput"))
                    snippets.push(grandChild.innerText);
            });
    });
    return snippets;
}