import { useState } from "react";

const players = ["Aravind", "Tiger", "Spectator"];
function PlayerList() {
  const playerList = players.map((player) => <li key={player}>{player}</li>);
  return <ul>{playerList}</ul>;
}
export default function App() {
  return <PlayerList />;
}
