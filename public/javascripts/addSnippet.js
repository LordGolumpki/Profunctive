const addButtons = document.querySelectorAll(".addnewsnippet");

addButtons.forEach((addButton) => {
    addButton.addEventListener("click", (event) => {
        let snippet = document.createElement("div");
        snippet.classList.add("snippet");
        snippet.classList.add("d-flex");
        snippet.classList.add("align-content-start");

        let input = document.createElement("div");
        input.classList.add("snippetinput");
        input.contentEditable = true;

        let close = document.createElement("button");
        close.classList.add("transparentbutton");
        close.classList.add("deletesnippet");
        close.innerHTML = "&times;"
        close.addEventListener("click", (event) => {
            close.parentElement.remove();
        });

        div.append(input);
        div.append(close);

        addButton.before(div);
    });
});