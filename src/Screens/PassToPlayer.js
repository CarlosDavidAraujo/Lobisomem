import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";

export default function PassToPlayer() {
  const { currentGame, setScreen } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const currentPlayerName = currentGame.getCurrentPlayer().getName();

  return (
    <>
      {ready ? (
        <>
          <h2>{currentPlayerName}</h2>
          <button onClick={() => setScreen("playerAction")}>
            Mostrar função
          </button>
        </>
      ) : (
        <>
          <h2>Passe para {currentPlayerName}</h2>
          <button onClick={() => setReady(true)}>
            Clique quando estiver pronto
          </button>
        </>
      )}
    </>
  );
}
