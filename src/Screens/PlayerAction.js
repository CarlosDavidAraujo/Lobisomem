import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import WereWolf from "./RoleScreens/WereWolf";

export default function PlayerAction() {
  const { currentGame, playerList, setScreen, setPreviousScreen } =
    useContext(GameContext);

  const currentPlayer = currentGame.getCurrentPlayer();

  const roleScreens = {
    Aldeão: (
      <Villager
        currentPlayer={currentPlayer}
        playerList={playerList}
        currentGame={currentGame}
      />
    ),
    Vidente: <Seer currentPlayer={currentPlayer} playerList={playerList} />,
    Lobisomem: (
      <WereWolf
        currentPlayer={currentPlayer}
        playerList={playerList}
        currentGame={currentGame}
      />
    ),
    Caçador: (
      <Hunter
        currentPlayer={currentPlayer}
        playerList={playerList}
        currentGame={currentGame}
      />
    ),
  };

  function passTurn() {
    currentGame.passToNextPlayer();

    if (currentGame.noNextPlayer()) {
      currentGame.removePlayers();
      currentGame.clearPlayersProtection();
      setPreviousScreen("playerAction");
      setScreen("villageNews");
    } else {
      setScreen("passToPlayer");
    }
  }

  return (
    <>
      <h1>{currentPlayer.getRoleName()}</h1>
      <h2>Escolha uma habilidade</h2>
      {roleScreens[currentPlayer.getRoleName()]}
      <button onClick={() => passTurn()}>Terminar a vez</button>
    </>
  );
}
