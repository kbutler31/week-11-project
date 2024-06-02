const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn"); // Changed querySelector to select a single element
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // Fixed addEventListener syntax
    restartBtn.addEventListener("click", restartGame); // Fixed addEventListener syntax
    statusText.textContent = `${currentPlayer}'s turn`; // Changed jQuery syntax to string template literal
    running = true;
}   

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !== "" || !running){ // Fixed !== and added strict comparison
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){ // Changed 'call' to 'cell'
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X"; // Fixed comparison operator
    statusText.textContent = `${currentPlayer}'s turn`; // Fixed string concatenation
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        var condition = winConditions[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if(cellA === "" || cellB === "" || cellC === ""){ // Fixed !== and added strict comparison
            continue;
        }
        if(cellA === cellB && cellB === cellC){ // Fixed comparison operator
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`; // Fixed string concatenation
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = 'Draw!';
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`; // Fixed string concatenation
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
