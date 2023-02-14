import { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";

export default function VillageNews() {
  const { currentGame, setCurrentGame, setScreen, previousScreen } =
    useContext(GameContext);

  const winner = currentGame.getWinnerTeam();

  function handleEndGame() {
    setCurrentGame(new Game());
    setScreen("gameMenu");
  }

  function handleScreenChange() {
    currentGame.clearTurnNews();
    setScreen(previousScreen === "votes" ? "passToPlayer" : "clock");
  }

  return (
    <>
      {winner ? (
        <button onClick={() => handleEndGame()}>Novo jogo</button>
      ) : previousScreen === "playerAction" ? (
        <button onClick={() => handleScreenChange()}>Reunir a vila</button>
      ) : previousScreen === "votes" ? (
        <button onClick={() => handleScreenChange()}>Adormecer</button>
      ) : null}

      <div>
        {currentGame.getNews().map((message, i) => (
          <h3>{message}</h3>
        ))}
      </div>
    </>
  );
}
