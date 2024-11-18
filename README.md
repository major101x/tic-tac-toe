# Tic-Tac-Toe

A website to let you play the popular tic-tac-toe board game with your friends.

## Lessons Learned

This is my very first project that involves factory functions and modules.

The `gameBoard` manages the board, the `gameController` manages the rounds and winner, the `gameDisplayController` manages the game's ui, and the `mainDisplayController` manages the dialog before the game ui is mounted.

I learned about factory functions and the module pattern, as well as IIFEs (Immediately Invoked Function Expressions). I also learned about closures, and why factory functions could be a better alternative to classes in JavaScript.

I encountered a problem where I didn't know how to find the exact row of the cell that was clicked. I fixed this by passing the `rowIndex` of the `board.forEach(row)` into the `board.forEach(column, columnIndex)` inside it, which is used to assign a data-row to the created element.

Also, there was initially no tie. But I was able to implement that by getting the result of the `isWinnerDeclared` function and another check for a full board to declare a draw.

Good code now will help your future code later.
