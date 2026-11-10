import GameTitle from "./components/GameTitle";
import GameSubtitle from "./components/GameSubtitle";
import GameBoard from "./components/GameBoard";
import "./App.css";
import Player from "./components/PlayerSetup";
export default function App() {
  return (
    <>
      <div>
      <GameTitle />
      <GameSubtitle playerOne="Aravind" playerTwo="Tiger" />
      <Player playerNumber={1} />
      <Player playerNumber={2} />
      <div>
        <GameBoard />
      </div>
    </div>
  </>
  );
  
}
