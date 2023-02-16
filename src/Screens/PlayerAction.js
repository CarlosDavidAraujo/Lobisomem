import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import styled from "styled-components";
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import WereWolf from "./RoleScreens/WereWolf";
import { Button } from "../Components/Button";


const Container = styled.div`
  height: 100vh;
  background-color: #f5deb3;
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
`;

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
    <Container>
      {roleScreens[currentPlayer.getRoleName()]}
      <Button onClick={() => passTurn()}>Terminar a vez</Button>
    </Container>
  );
}
