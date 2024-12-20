const gameBoard = () => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }

  const getBoard = () => board;

  // Function to draw X or O to board;
  const drawXorO = (row, column, player) => {
    board[row][column] = player;
  };

  const printBoard = () => console.table(board);

  return { getBoard, drawXorO, printBoard };
};

const gameController = (
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) => {
  const board = gameBoard();

  const players = [
    { name: playerOneName, mark: "X" },
    { name: playerTwoName, mark: "O" },
  ];

  let activePlayer = players[0];
  let winner = null;

  // Gets board from board factory
  const getBoard = () => board.getBoard();

  const getActivePlayer = () => activePlayer;

  //Only set winner if winner is declared
  const setWinner = () => {
    winner =
      isWinnerDeclared() && !isDraw()
        ? getActivePlayer().name
        : !isWinnerDeclared() && isDraw()
        ? "Draw"
        : null;
  };

  const getWinner = () => winner;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    if (winner !== null && winner !== "Draw") {
      console.log(`${getWinner()} is the winner!`);
    } else if (winner !== null && winner === "Draw") {
      console.log(`It's a Draw!!!`);
    } else {
      console.log(`${getActivePlayer().name}'s turn`);
    }
  };

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} is playing...`);

    // Function to draw X or O to board
    board.drawXorO(row, column, getActivePlayer().mark);

    setWinner();
    switchPlayerTurn();
    printNewRound();
  };

  const isWinnerDeclared = () => {
    const boardArray = board.getBoard();
    const activePlayer = getActivePlayer().name;
    // // Win conditions
    // Right diagonal
    if (
      boardArray[0][2] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[2][0] &&
      boardArray[0][2] !== ""
    ) {
      return true;
    }

    // Left diagonal
    if (
      boardArray[0][0] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[2][2] &&
      boardArray[0][0] !== ""
    ) {
      return true;
    }

    // First horizontal
    if (
      boardArray[0][0] === boardArray[0][1] &&
      boardArray[0][1] === boardArray[0][2] &&
      boardArray[0][0] !== ""
    ) {
      return true;
    }

    // Second horizontal
    if (
      boardArray[1][0] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[1][2] &&
      boardArray[1][0] !== ""
    ) {
      return true;
    }

    // Third horizontal
    if (
      boardArray[2][0] === boardArray[2][1] &&
      boardArray[2][1] === boardArray[2][2] &&
      boardArray[2][0] !== ""
    ) {
      return true;
    }

    // First vertical
    if (
      boardArray[0][0] === boardArray[1][0] &&
      boardArray[1][0] === boardArray[2][0] &&
      boardArray[0][0] !== ""
    ) {
      return true;
    }

    // Second vertical
    if (
      boardArray[0][1] === boardArray[1][1] &&
      boardArray[1][1] === boardArray[2][1] &&
      boardArray[0][1] !== ""
    ) {
      return true;
    }

    // Third vertical
    if (
      boardArray[0][2] === boardArray[1][2] &&
      boardArray[1][2] === boardArray[2][2] &&
      boardArray[0][2] !== ""
    ) {
      return true;
    }

    return false;
  };

  // Check if there is a draw
  const isDraw = () => {
    // Checks if a winner is declared and if all board cells are filled
    if (
      !isWinnerDeclared() &&
      !board.getBoard().some((row) => row.some((column) => column === ""))
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Starts new round on initialization
  printNewRound();

  return { playRound, getActivePlayer, getWinner, getBoard };
};

const gameDisplayController = (playerOneNameValue, playerTwoNameValue) => {
  const playerOneName = playerOneNameValue;
  const playerTwoName = playerTwoNameValue;
  const game = gameController(playerOneName, playerTwoName);
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn");
  const newGameButton = document.querySelector(".new-game-btn");
  const gameContainerDiv = document.querySelector(".game-container");
  const dialog = document.querySelector(".dialog");

  dialog.style.display = "none";
  gameContainerDiv.style.display = "flex";

  const updateScreen = () => {
    // Clear the board
    boardDiv.textContent = "";

    // Get the newest version of the board and active player
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Get winner
    const winner = game.getWinner();

    // Display winner or display active player's turn
    if (winner !== null && winner !== "Draw") {
      playerTurnDiv.textContent = `${winner} is the winner!`;
    } else if (winner !== null && winner === "Draw") {
      playerTurnDiv.textContent = `It's a Draw!!!`;
    } else {
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    }

    // Renders board to UI
    board.forEach((row, rowIndex) =>
      row.forEach((column, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        // Adds row and column dataset for updating board
        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;

        cellButton.dataset.mark = column; // Sets data-mark for specific styling

        cellButton.textContent = column;

        // Disables button if game is won or draw
        if (winner !== null && winner !== "Draw") {
          cellButton.disabled = true;
        } else if (winner !== null && winner === "Draw") {
          cellButton.disabled = true;
        }

        boardDiv.appendChild(cellButton);
      })
    );
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    const selectedCellValue = e.target.textContent;

    // Make sure I've clicked a column and not the gaps in between
    if (!selectedRow && !selectedColumn) return;

    // Checks if the square already contains a mark
    if (selectedCellValue !== "") return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  const newGame = () => {
    gameDisplayController(playerOneName, playerTwoName);
  };

  boardDiv.addEventListener("click", clickHandlerBoard);
  newGameButton.addEventListener("click", newGame);

  updateScreen();
};

const mainDisplayController = () => {
  const dialog = document.querySelector(".dialog");
  const gameContainerDiv = document.querySelector(".game-container");
  const startGameBtn = document.querySelector(".start-game-btn");
  const playerOneName = document.querySelector("#player-1-name");
  const playerTwoName = document.querySelector("#player-2-name");

  dialog.style.display = "flex";
  gameContainerDiv.style.display = "none";

  const startGame = () => {
    const playerOne = playerOneName.value ? playerOneName.value : "Player One";
    const playerTwo = playerTwoName.value ? playerTwoName.value : "Player Two";

    gameDisplayController(playerOne, playerTwo);
  };

  startGameBtn.addEventListener("click", startGame);
};

mainDisplayController();
