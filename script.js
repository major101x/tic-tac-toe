const gameBoard = (function () {
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

  const drawXorO = (row, column, player) => {
    board[row][column] = player;
  };

  const printBoard = () => console.table(board);

  return { getBoard, drawXorO, printBoard };
})();

gameBoard.printBoard();

const gameController = (
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) => {
  const board = gameBoard;

  const players = [
    { name: playerOneName, mark: "X" },
    { name: playerTwoName, mark: "O" },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} is playing...`);
    board.drawXorO(row, column, getActivePlayer().mark);

    const declareWinner = () => {
      let hasWon = false;
      // // Win conditions
      // Right diagonal
      if (
        board.getBoard()[0][2] === board.getBoard()[1][1] &&
        board.getBoard()[1][1] === board.getBoard()[2][0]
      ) {
        hasWon = true;
      }

      // Left diagonal
      if (
        board.getBoard()[0][0] === board.getBoard()[1][1] &&
        board.getBoard()[1][1] === board.getBoard()[2][0]
      ) {
        hasWon = true;
      }

      // First horizontal
      if (
        board.getBoard()[0][0] === board.getBoard()[0][1] &&
        board.getBoard()[0][1] === board.getBoard()[0][2]
      ) {
        hasWon = true;
      }

      // Second horizontal
      if (
        board.getBoard()[1][0] === board.getBoard()[1][1] &&
        board.getBoard()[1][1] === board.getBoard()[1][2]
      ) {
        hasWon = true;
      }

      // Third horizontal
      if (
        board.getBoard()[2][0] === board.getBoard()[2][1] &&
        board.getBoard()[2][1] === board.getBoard()[2][2]
      ) {
        hasWon = true;
      }

      // First vertical
      if (
        board.getBoard()[0][0] === board.getBoard()[1][0] &&
        board.getBoard()[1][0] === board.getBoard()[2][0]
      ) {
        hasWon = true;
      }

      // Second vertical
      if (
        board.getBoard()[0][1] === board.getBoard()[1][1] &&
        board.getBoard()[1][1] === board.getBoard()[2][1]
      ) {
        hasWon = true;
      }

      // Third vertical
      if (
        board.getBoard()[0][2] === board.getBoard()[1][2] &&
        board.getBoard()[1][2] === board.getBoard()[2][2]
      ) {
        hasWon = true;
      }

      if (hasWon) {
        console.log(`${getActivePlayer().name} has won!!!`);
      }
    };

    declareWinner();
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return { playRound, getActivePlayer };
};

const game = gameController();
