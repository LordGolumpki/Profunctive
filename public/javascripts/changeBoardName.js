const boardNameInput = document.querySelector(".boardnameinput");
const userId = document.querySelector(".userid").innerHTML.trim();

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