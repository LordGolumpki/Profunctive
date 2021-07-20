const addButtons = document.querySelectorAll(".addnewsnippet");

addButtons.forEach((addButton) => {
    addButton.addEventListener("click", (event) => {
        let div = document.createElement("div");
        div.classList.add("snippet");

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