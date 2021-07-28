const boardNameInput = document.querySelector(".boardnameinput");

boardNameInput.addEventListener("focusout", (event) => {
    console.log(boardNameInput.value);
});