// The game board module
const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["x", "o", "o"],
    ["", "x", ""],
  ];

  const getBoard = () => {
    return board;
  };

  return { getBoard };
})();

// The players factory
const players = () => {
  return {};
};

// The game flow controller module
const gameController = (() => {
  const dGameBoard = document.querySelector("#GameBoard");
  const dCells = document.querySelectorAll(".cell");

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
