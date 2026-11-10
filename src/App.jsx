import GameTitle from "./components/GameTitle";
import GameSubtitle from "./components/GameSubtitle";
import GameBoard from "./components/GameBoard";
import "./App.css";
export default function App() {
  return (
    <>
      <div>
      <GameTitle />
      <GameSubtitle playerOne="Aravind" playerTwo="Tiger" />
      <div>
        <GameBoard />
      </div>
    </div>
  </>
  );
  
}
