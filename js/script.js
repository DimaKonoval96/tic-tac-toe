// The game board module
const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "o", ""],
    ["", "o", ""],
  ];

  // Return board array
  const getBoard = () => {
    return board;
  };

  // Update board array
  const updateBoard = (index, value) => {
    let [row, column] = index.split("");
    if (board[row][column] !== "") return;
    board[row][column] = value;
  };

  return { getBoard, updateBoard };
})();

// The players factory
const players = (name, value) => {
  return { name, value };
};

// Controller module of the game flow
const gameController = (() => {
  const player1 = players("Player 1", "x");
  const player2 = players("Player 2", "o");

  let currPlayer = player1;
  const dGameBoard = document.querySelector("#GameBoard");
  const dCells = document.querySelectorAll(".cell");
  dGameBoard.addEventListener("click", (ev) => {
    const index = ev.target.dataset.cell;
    console.log(index);
    gameBoard.updateBoard(index, currPlayer.value);
    currPlayer = currPlayer == player1 ? player2 : player1;
    displayBoard();
  });

  const displayBoard = () => {
    dCells.forEach((cell) => {
      let row = cell.dataset.cell[0];
      let column = cell.dataset.cell[1];
      cell.textContent = gameBoard.getBoard()[row][column];
    });
    console.log(player1, player2);
  };
  return { displayBoard };
})();

gameController.displayBoard();
