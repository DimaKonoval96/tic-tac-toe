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

  const clear = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = "";
      }
    }
  };

  // Update board array
  const updateBoard = (index, value) => {
    let [row, column] = index.split("");
    if (board[row][column] !== "") return "NONE";
    currValue = value;
    board[row][column] = value;
    return checkBoard(row, column, value);
  };

  // Checks if we have a winner
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

    for (let i = 0, j = board[0].length - 1; i < board[0].length; i++, j--) {
      if (board[i][j] == value) {
        count3++;
      }
    }

    const isTie = board.every((arr) => {
      let tmp = arr.every((item) => item != "");
      return tmp == true;
    });

    const res2 = count === board[0].length ? true : false;
    const res3 = count2 === board[0].length ? true : false;
    const res4 = count3 === board[0].length ? true : false;
    if (res1 || res2 || res3 || res4) {
      return "WIN";
    }
    if (isTie) {
      return "TIE";
    }
  };

  return { getBoard, updateBoard, clear };
})();

// The players factory
const players = (name, value) => {
  return { name, value };
};

// Controller module of the game flow
const gameController = (() => {
  const player1 = players("Player 1", "x");
  const player2 = players("Player 2", "o");

  const modal = document.querySelector(".modal");
  const newGameBtn = document.querySelector(".new_game");
  const player1Select = document.querySelector("#player1Select");
  const player2Select = document.querySelector("#player2Select");
  const player1Name = document.querySelector("#player1Name");
  const player2Name = document.querySelector("#player2Name");
  const startBtn = document.querySelector("#startBtn");
  const playersModal = document.querySelector("#playersModal");

  player1Select.addEventListener("change", (ev) => {
    if (ev.target.value == "Computer") {
      player1Name.classList.add("hidden");
    } else {
      player1Name.classList.remove("hidden");
    }
  });

  player2Select.addEventListener("change", (ev) => {
    if (ev.target.value == "Computer") {
      player2Name.classList.add("hidden");
    } else {
      player2Name.classList.remove("hidden");
    }
  });

  newGameBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    gameBoard.clear();
    displayBoard();
    currPlayer = player1;
    playersModal.classList.remove("hidden");
  });

  startBtn.addEventListener("click", (ev) => {
    player1.name = player1Name.value;
    player2.name = player2Name.value;
    playersModal.classList.add("hidden");
  });

  let currPlayer = player1;
  const dGameBoard = document.querySelector("#GameBoard");
  const dCells = document.querySelectorAll(".cell");

  dGameBoard.addEventListener("click", (ev) => {
    const index = ev.target.dataset.cell;
    const gameResult = gameBoard.updateBoard(index, currPlayer.value);

    switch (gameResult) {
      case "WIN":
        displayGameEnd(`${currPlayer.name} is the Winner`);
        break;

      case "TIE":
        displayGameEnd("TIE");
        break;
      case "NONE":
        return;
    }

    displayBoard();
    currPlayer = currPlayer == player1 ? player2 : player1;
  });

  const displayGameEnd = (msg) => {
    const resultMsg = document.querySelector("#result_msg");
    modal.classList.remove("hidden");
    resultMsg.textContent = msg;
  };

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
