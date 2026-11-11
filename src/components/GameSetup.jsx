
import { useState } from "react";
import defaultHuman from "../assets/default-man.jpg";
import defaultTiger from "../assets/default-tiger.jpg";
import PlayerSetup from "./PlayerSetup";
import GameBoard from "./GameBoard";

export default function GameSetup() {
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");

  const [playerOneImage, setPlayerOneImage] = useState(defaultHuman);
  const [playerTwoImage, setPlayerTwoImage] = useState(defaultTiger);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function handlePlayAgain() {
    setGameOver(false);
  }

  function handleChangePlayers() {
    setGameStarted(false);
    setGameOver(false);
  }

  return (
    <>
      {!gameStarted ? (
        <div className="setup-screen">
          <h1 className="setup-heading">
            CHOOSE YOUR FIGHTER
          </h1>

          <p className="setup-subtitle">
            CUSTOMIZE YOUR CHARACTER BEFORE THE BATTLE
          </p>

          <div className="setup-players">
            <PlayerSetup
              playerNumber={1}
              playerName={playerOneName}
              setPlayerName={setPlayerOneName}
              image={playerOneImage}
              setImage={setPlayerOneImage}
            />

            <div className="setup-versus">VS</div>

            <PlayerSetup
              playerNumber={2}
              playerName={playerTwoName}
              setPlayerName={setPlayerTwoName}
              image={playerTwoImage}
              setImage={setPlayerTwoImage}
            />
          </div>

          <button
            className="start-game-button"
            onClick={() => setGameStarted(true)}
          >
            START GAME
          </button>
        </div>
      ) : (
        <GameBoard
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          playerOneImage={playerOneImage}
          playerTwoImage={playerTwoImage}
          gameOver={gameOver}
          setGameOver={setGameOver}
          onPlayAgain={handlePlayAgain}
          onChangePlayers={handleChangePlayers}
        />
      )}
    </>
  );
}
