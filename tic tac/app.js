const board = document.getElementById("game-board");
const resetBtn = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameActive = true;
let size = 4;          
let gameState = [];


function startGame() {
    const input = document.getElementById("boardSize").value;
    const n = parseInt(input);

    if (isNaN(n) || n < 3 || n % 2 === 0) {
        alert("Enter a valid ODD number (3,5,7...)");
        return;
    }

    size = n;
    gameState = Array(size * size).fill("");
    currentPlayer = "X";
    gameActive = true;

    createBoard();
}

function createBoard() {
    board.innerHTML = "";

    board.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    board.style.gridTemplateRows = `repeat(${size}, 60px)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} Wins! 🎉`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        alert("It's a Draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}


function checkWinner() {
    const winPatterns = [];


    for (let r = 0; r < size; r++) {
        winPatterns.push(
            Array.from({ length: size }, (_, i) => r * size + i)
        );
    }

  
    for (let c = 0; c < size; c++) {
        winPatterns.push(
            Array.from({ length: size }, (_, i) => c + i * size)
        );
    }

  
    winPatterns.push(
        Array.from({ length: size }, (_, i) => i * (size + 1))
    );

    
    winPatterns.push(
        Array.from({ length: size }, (_, i) => (i + 1) * (size - 1))
    );

    return winPatterns.some(pattern =>
        pattern.every(i => gameState[i] === currentPlayer)
    );
}


resetBtn.addEventListener("click", () => {
    gameState = Array(size * size).fill("");
    currentPlayer = "X";
    gameActive = true;
    createBoard();
});
function createBoard() {
    board.innerHTML = "";

    
    let cellSize;
    if (size <= 5) cellSize = 95;
    else if (size <= 7) cellSize = 70;
    else cellSize = 45;

    board.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
    board.style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;

        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.style.fontSize = `${cellSize / 2}px`;

        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}
