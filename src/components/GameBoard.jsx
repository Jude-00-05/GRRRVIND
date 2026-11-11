import { useState, useEffect } from "react";

function createGameBoard() {
  return [
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
}

export default function GameBoard({
  playerOneName,
  playerTwoName,
  playerOneImage,
  playerTwoImage,
  gameOver,
  setGameOver,
  onPlayAgain,
  onChangePlayers,
}) {
  const [board, setBoard] = useState(createGameBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [playerOneImageURL, setPlayerOneImageURL] = useState(null);
  const [playerTwoImageURL, setPlayerTwoImageURL] = useState(null);

  useEffect(() => {
    if (typeof playerOneImage === "string") {
      setPlayerOneImageURL(playerOneImage);
      return;
    }

    if (!playerOneImage) {
      setPlayerOneImageURL(null);
      return;
    }

    const url = URL.createObjectURL(playerOneImage);
    setPlayerOneImageURL(url);

    return () => URL.revokeObjectURL(url);
  }, [playerOneImage]);

  useEffect(() => {
    if (typeof playerTwoImage === "string") {
      setPlayerTwoImageURL(playerTwoImage);
      return;
    }

    if (!playerTwoImage) {
      setPlayerTwoImageURL(null);
      return;
    }

    const url = URL.createObjectURL(playerTwoImage);
    setPlayerTwoImageURL(url);

    return () => URL.revokeObjectURL(url);
  }, [playerTwoImage]);

  // Winning combinations
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const winningCombo = winningCombinations.find((combo) => {
    const cells = combo.map((id) => board.find((cell) => cell.id === id));

    return cells.every(
      (cell) => cell.value === cells[0].value && cell.value !== "-",
    );
  });

  const winner = winningCombo
    ? board.find((cell) => cell.id === winningCombo[0]).value
    : null;

  const winnerName =
    winner === "X" ? playerOneName : winner === "O" ? playerTwoName : null;

  const winnerImage =
    winner === "X"
      ? playerOneImageURL
      : winner === "O"
        ? playerTwoImageURL
        : null;

  const isDraw = !winner && board.every((cell) => cell.value !== "-");

  const winningCellIds = winningCombo || [];

  // Tell the parent when the game ends
  useEffect(() => {
    if (winner || isDraw) {
      setGameOver(true);
    }
  }, [winner, isDraw, setGameOver]);

  function handlePlayAgain() {
    setBoard(createGameBoard());
    setCurrentPlayer(1);
    onPlayAgain();
  }

  // GAME OVER SCREEN
  if (gameOver) {
    return (
      <div className="game-over">
        <h1>GAME OVER</h1>

        {winner ? (
          <>
            <h2>{winnerName} WINS!</h2>

            {winnerImage && (
              <img
                src={winnerImage}
                alt={winnerName}
                className="winner-image"
              />
            )}

            <p>Congratulations, {winnerName}!</p>
          </>
        ) : (
          <h2>It's a draw!</h2>
        )}

        <button onClick={handlePlayAgain}>Play Again</button>

        <button onClick={onChangePlayers}>Change Players</button>
      </div>
    );
  }

  return (
    <div className="game-screen">
      {/* Player 1 */}
      <div
        className={`player-card ${currentPlayer === 1 ? "active-player" : ""}`}
      >
        <img
          src={playerOneImageURL}
          alt={playerOneName}
          className="game-player-image"
        />
        <h2>{playerOneName}</h2>
        <p>{currentPlayer === 1 ? "YOUR TURN" : "WAITING"}</p>
      </div>

      {/* Game board */}
      <div className="game-main">
        <div className="game-status">
          <h2>{currentPlayer === 1 ? playerOneName : playerTwoName}'s turn</h2>
        </div>

        <div className="game-board">
          {board.map((cell) => (
            <button
              key={cell.id}
              className={`cell ${
                winningCellIds.includes(cell.id) ? "winning-cell" : ""
              }`}
              onClick={() => {
                if (cell.value === "-" && !winner && !isDraw) {
                  setBoard((newBoard) =>
                    newBoard.map((c) =>
                      c.id === cell.id
                        ? {
                            ...c,
                            value: currentPlayer === 1 ? "X" : "O",
                          }
                        : c,
                    ),
                  );

                  setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
                }
              }}
            >
              {cell.value === "X" && playerOneImageURL && (
                <img
                  src={playerOneImageURL}
                  alt={playerOneName}
                  className="player-image"
                />
              )}

              {cell.value === "O" && playerTwoImageURL && (
                <img
                  src={playerTwoImageURL}
                  alt={playerTwoName}
                  className="player-image"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Player 2 */}
      <div
        className={`player-card ${currentPlayer === 2 ? "active-player" : ""}`}
      >
        <img
          src={playerTwoImageURL}
          alt={playerTwoName}
          className="game-player-image"
        />
        <h2>{playerTwoName}</h2>
        <p>{currentPlayer === 2 ? "YOUR TURN" : "WAITING"}</p>
      </div>
    </div>
  );
}
