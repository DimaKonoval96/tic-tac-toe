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
    let count2 = 0;
    let count3 = 0;

    for (let i = 0; i < board[0].length; i++) {
      if (board[i][column] === value) {
        count++;
      }
    }

    for (let i = 0; i < board[0].length; i++) {
      if (board[i][i] == value) {
        count2++;
      }
    }

    for (let i = 0; i < board[0].length; i++) {
      for (let j = board[0].length - 1; j >= 0; j--) {
        if (board[i][j] == value) {
          count3++;
        }
      }
    }

    const res2 = count == board[0].length ? true : false;
    const res3 = count2 == board[0].length ? true : false;
    const res4 = count3 == board[0].length ? true : false;
    return res1 || res2 || res3 || res4;
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
