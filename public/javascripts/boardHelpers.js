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
};