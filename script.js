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

  const getActivePlayer = () => activePlayer;

  //Only set winner if winner is declared
  const setWinner = () => {
    winner = isWinnerDeclared() ? getActivePlayer().name : null;
  };

  const getWinner = () => winner;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    if (winner) {
      console.log(`${getWinner()} is the winner!`);
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

  // Starts new round on initialization
  printNewRound();

  return { playRound, getActivePlayer, getWinner, getBoard: board.getBoard };
};

const game = gameController();
