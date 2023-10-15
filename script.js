const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('[data-status]');
const restartButton = document.querySelector('[data-restart]');
const probabilityX = document.querySelector('[data-probability-x]');
const probabilityO = document.querySelector('[data-probability-o]');

let currentPlayer = 'X';
let gameOver = false;
let probabilityPlayerX = 50;
let probabilityPlayerO = 50;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
  const cell = e.target;

  if (cell.classList.contains('occupied') || gameOver) {
    return;
  }

  cell.textContent = currentPlayer;
  cell.classList.add('occupied');

  if (checkWin(currentPlayer)) {
    endGame(currentPlayer + ' wins!');
  } else if (isDraw()) {
    endGame("draw!");
  } else {
    updateProbabilities();
    currentPlayer = selectNextPlayer();
  }
}

function updateProbabilities() {
  if (currentPlayer === 'X') {
    probabilityPlayerX -= 10;
    probabilityPlayerO += 10;
  } else {
    probabilityPlayerX += 10;
    probabilityPlayerO -= 10;
  }

  probabilityX.textContent = `X: ${probabilityPlayerX}%`;
  probabilityO.textContent = `O: ${probabilityPlayerO}%`;
}

function selectNextPlayer() {
  const randomValue = Math.random() * 100; // Zufällige Zahl zwischen 0 und 100

  if (randomValue < probabilityPlayerX) {
    return 'X';
  } else {
    return 'O';
  }
}

function endGame(message) {
  status.textContent = message;
  gameOver = true;
  probabilityX.textContent = '';
  probabilityO.textContent = '';
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('occupied');
  });
  status.textContent = '';
  currentPlayer = 'X';
  gameOver = false;
  probabilityPlayerX = 50;
  probabilityPlayerO = 50;
  probabilityX.textContent = `X: ${probabilityPlayerX}%`;
  probabilityO.textContent = `O: ${probabilityPlayerO}%`;
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('occupied'));
}
