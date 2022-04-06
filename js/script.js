// The game board module
const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // Return board array
  const getBoard = () => {
    return board;
  };

  // Update board array
  const updateBoard = (index, value) => {
    let [row, column] = index.split("");
    if (board[row][column] !== "") return;
    currValue = value;
    board[row][column] = value;
    if (checkBoard(row, column, value) == true) {
      console.log(true);
    }
  };

  const checkBoard = (row, column, value) => {
    const res1 = board[row].every((item) => item === value);

    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (board[i][column] === value) {
        count++;
      }
    }

    const res2 = count == 3 ? true : false;
    return res1 || res2;
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
  };
  return { displayBoard };
})();

gameController.displayBoard();
