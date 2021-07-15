const addButtons = document.querySelectorAll(".addnewsnippet");

addButtons.forEach((addButton) => {
    addButton.addEventListener("click", (event) => {
        let div = document.createElement("div");
        div.classList.add("snippet");

        let input = document.createElement("input");
        input.type = "text";
        input.classList.add("snippetinput");

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