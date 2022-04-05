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
    board[row][column] = value;
  };

  return { getBoard, updateBoard };
})();

// The players factory
const players = () => {
  return {};
};

// Controller module of the game flow
const gameController = (() => {
  const dGameBoard = document.querySelector("#GameBoard");
  const dCells = document.querySelectorAll(".cell");
  dGameBoard.addEventListener("click", (ev) => {
    const index = ev.target.dataset.cell;
    console.log(index);
    gameBoard.updateBoard(index, "x");
    displayBoard();
  });
  const displayBoard = () => {
    dCells.forEach((cell) => {
      let row = cell.dataset.cell[0];
      let column = cell.dataset.cell[1];
      cell.textContent = gameBoard.getBoard()[row][column];
    });
  };
  return { displayBoard };
})();

gameController.displayBoard();
