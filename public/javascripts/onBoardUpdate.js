// Grab all relevant board elements
const boardNameInput = document.querySelector(".boardnameinput");
const snippets = document.querySelectorAll(".snippet");
const userId = document.querySelector(".userid").innerHTML.trim();

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

// Add listeners 