'use strict';

// 📦 DOM Elements
const GameBox = document.querySelectorAll(".box");
const PlayersForm = document.getElementById("PlayersForm");
const Player1Name = document.getElementById("Player1Name");
const Player2Name = document.getElementById("Player2Name");
const Exceptions = document.getElementById("Exceptions");
const Turn = document.getElementById("Turn");
const winnerShow = document.getElementById("winnerShow");
const Player1Score = document.getElementById("Player1Score");
const Player2Score = document.getElementById("Player2Score");
const RoundShow = document.getElementById("RoundShow");
const FinalWinner = document.getElementById("FinalWinner");

// 🧠 Game Variables
let tags = "";
let Player1 = "";
let Player2 = "";
let Round = 5;
let response = 0;
let Score1 = 0;
let Score2 = 0;

// 🎮 Game Box Click Logic
GameBox.forEach(box => {
    box.addEventListener("click", () => {
        if ((box.innerHTML !== "❌") && (box.innerHTML !== "⭕")) {
            if (tags === "" || tags === "⭕") {
                tags = "❌"
                box.innerHTML = `${tags}`;
                response++;
                Turn.innerHTML = `Your turn <span style="color:blue">${Player2}</span>`;
                setTimeout(() => {
                    checkDrawOrWin();
                }, 1000);
            }
            else if (tags === "❌") {
                tags = "⭕"
                box.innerHTML = `${tags}`;
                response++;
                Turn.innerHTML = `Your turn <span style="color:red">${Player1}</span>`;
                setTimeout(() => {
                    checkDrawOrWin();
                }, 1000);
            }
        }
    });
});

// 🧾 Player Form Submission
PlayersForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    if (Player1Name.value.trim() === "") {
        Exceptions.style.display = "block";
        Exceptions.textContent = "Player1 Name is required";
        isValid = false;
    }
    if (Player2Name.value.trim() === "") {
        Exceptions.style.display = "block";
        Exceptions.textContent = "Player2 Name is required";
        isValid = false;
    }
    if ((Player1Name.value.trim() === "") && (Player2Name.value.trim() === "")) {
        Exceptions.style.display = "block";
        Exceptions.textContent = "Player names are required";
        isValid = false;
    }

    Player1 = Player1Name.value;
    Player2 = Player2Name.value;

    if (isValid) {
        // alert("Game Start");
        PlayersForm.style.display = "none";
        document.getElementById("loader").style.display = "block";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
            Turn.innerHTML = `Your turn <span style="color:red">${Player1}</span>`;
            document.getElementById("GameArea").style.display = "flex";
            Player1Score.textContent = `${Player1} ${Score1}`;
            Player2Score.textContent = `${Player2} ${Score2}`;
        }, 2000);
    }
});

// ✅ Round Reset
function subReset() {
    if (Round > 0) {
        GameBox.forEach(box => {
            box.innerHTML = "";
        });
        response = 0;
        tags = "";
        Turn.innerHTML = `Your turn <span style="color:red">${Player1}</span>`;
        Round--;
        Player1Score.textContent = `${Player1} ${Score1}`;
        Player2Score.textContent = `${Player2} ${Score2}`;
        RoundShow.textContent = `Round ${Round}`;
    } else {
        document.getElementById("GameArea").style.display = "none";
        document.getElementById("FinalArea").style.display = "block";
        checkFinalWinner();
    }
}

// 📦 Check if all boxes are filled
function CheckAllBox() {
    let boxcheck = true;
    GameBox.forEach(box => {
        if (box.innerHTML === "") {
            boxcheck = false;
        }
    });
    return boxcheck;
}

// 🏆 Final Result
function checkFinalWinner() {
    if (Score1 > Score2) {
        FinalWinner.textContent = `Final Winner is ${Player1}`;
    }
    else {
        FinalWinner.textContent = `Final Winner is ${Player2}`;
    }
}

// 🔄 Reset Everything
function HalfReset() {
    document.getElementById("loader").style.display = "block";
    setTimeout(() => {
        Round = 6;
        document.getElementById("FinalArea").style.display = "none";
        document.getElementById("GameArea").style.display = "flex";
        Score1 = 0;
        Score2 = 0;
        document.getElementById("loader").style.display = "none"
        subReset();
    }, 1000);
}

// ❌⭕ Check for Win or Draw
function checkDrawOrWin() {
    let check = checkTheWinner();
    if (check && (CheckAllBox() === true)) {
        console.log("Draw");
        Score1++;
        Score2++;
        winnerShow.textContent = `Draw`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
    }
}

// 🧠 Winner Checker (Long version, not refactored)
function checkTheWinner() {

    if ((GameBox[0].innerHTML === "⭕") && (GameBox[4].innerHTML === "⭕") && (GameBox[8].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[0].innerHTML === "❌") && (GameBox[4].innerHTML === "❌") && (GameBox[8].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[2].innerHTML === "❌") && (GameBox[4].innerHTML === "❌") && (GameBox[6].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[2].innerHTML === "⭕") && (GameBox[4].innerHTML === "⭕") && (GameBox[6].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.style.display = "block";
        winnerShow.textContent = `Winner is ${Player2}`;
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[1].innerHTML === "⭕") && (GameBox[4].innerHTML === "⭕") && (GameBox[7].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[1].innerHTML === "❌") && (GameBox[4].innerHTML === "❌") && (GameBox[7].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.style.display = "block";
        winnerShow.textContent = `Winner is ${Player1}`;
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[0].innerHTML === "⭕") && (GameBox[3].innerHTML === "⭕") && (GameBox[6].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[0].innerHTML === "❌") && (GameBox[3].innerHTML === "❌") && (GameBox[6].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[2].innerHTML === "⭕") && (GameBox[5].innerHTML === "⭕") && (GameBox[8].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[2].innerHTML === "❌") && (GameBox[5].innerHTML === "❌") && (GameBox[8].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[0].innerHTML === "⭕") && (GameBox[1].innerHTML === "⭕") && (GameBox[2].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[0].innerHTML === "❌") && (GameBox[1].innerHTML === "❌") && (GameBox[2].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[3].innerHTML === "⭕") && (GameBox[4].innerHTML === "⭕") && (GameBox[5].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[3].innerHTML === "❌") && (GameBox[4].innerHTML === "❌") && (GameBox[5].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[6].innerHTML === "⭕") && (GameBox[7].innerHTML === "⭕") && (GameBox[8].innerHTML === "⭕")) {
        console.log("Winner is ⭕");
        Score2++;
        winnerShow.textContent = `Winner is ${Player2}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else if ((GameBox[6].innerHTML === "❌") && (GameBox[7].innerHTML === "❌") && (GameBox[8].innerHTML === "❌")) {
        console.log("Winner is ❌");
        Score1++;
        winnerShow.textContent = `Winner is ${Player1}`;
        winnerShow.style.display = "block";
        setTimeout(() => {
            winnerShow.style.display = "none";
        }, 1000);
        subReset();
        return false;
    }
    else {
        return true;
    }
}
