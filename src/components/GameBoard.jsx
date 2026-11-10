import { useState } from "react";
const gameBoard = [
  { id: 1, value: "-" },
  { id: 2, value: "-" },
  { id: 3, value: "-" },
  { id: 4, value: "-" },
  { id: 5, value: "-" },
  { id: 6, value: "-" },
  { id: 7, value: "-" },
  { id: 8, value: "-" },
  { id: 9, value: "-" },
];

// Vertical wins
const verticalWins = [];
for (let col = 1; col < 4; col++) {
  const curr = [];
  for (let colElement = col; colElement <= 9; colElement += 3) {
    curr.push(colElement);
  }
  verticalWins.push(curr);
}

// Horizontal wins
const horizontalWins = [];
for (let row = 1; row <= 7; row += 3) {
  const curr = [];
  for (let rowElement = row; rowElement < row + 3; rowElement++) {
    curr.push(rowElement);
  }
  horizontalWins.push(curr);
}

//diagonal wins
const diagonalWins = [
  [1, 5, 9],
  [3, 5, 7],
];
const winningCombinations = [
  ...horizontalWins,
  ...verticalWins,
  ...diagonalWins,
];

function handleRestart() {
  setBoard(gameBoard);
  setCurrentPlayer("Aravind");
}

export default function GameBoard() {
  const [board, setBoard] = useState(gameBoard);
  const [currentPlayer, setCurrentPlayer] = useState("Aravind");
  function handleRestart() {
    setBoard(gameBoard);
    setCurrentPlayer("Aravind");
  }

  const winningCombo = winningCombinations.find((combo) => {
    const cells = combo.map((id) => {
      return board.find((cell) => cell.id === id);
    });

    return cells.every(
      (cell) => cell.value === cells[0].value && cell.value !== "-",
    );
  });
  const winner = winningCombo
    ? board.find((cell) => cell.id === winningCombo[0]).value
    : null;
  const winnerName =
    winner === "A" ? "Aravind" : winner === "T" ? "Tiger" : null;
  const isDraw = !winner && board.every((cell) => cell.value !== "-");
  return (
    <>
      <div className="game-status">
        {winner ? (
          <h2>Winner: {winnerName}</h2>
        ) : isDraw ? (
          <h2>It's a draw!</h2>
        ) : (
          <h2>Current Player: {currentPlayer}</h2>
        )}
      </div>

      <div className="game-board">
        {board.map((cell) => (
          <button
            onClick={() => {
              if (cell.value === "-" && !winner && !isDraw) {
                setBoard((newBoard) =>
                  newBoard.map((c) =>
                    c.id === cell.id
                      ? currentPlayer === "Aravind"
                        ? { ...c, value: "A" }
                        : { ...c, value: "T" }
                      : c,
                  ),
                );
                setCurrentPlayer((prevPlayer) =>
                  prevPlayer === "Aravind" ? "Tiger" : "Aravind",
                );
              }
            }}
            key={cell.id}
            className="cell"
          >
            {cell.value}
          </button>
        ))}
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </>
  );
}
