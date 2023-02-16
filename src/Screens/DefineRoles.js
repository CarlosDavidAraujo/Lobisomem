import { useContext, useState } from "react";
import styled from "styled-components";
import ClassCard from "../Components/ClassCard";
import { GameContext } from "../Context/GameContext";
import bgImg from "../Images/playerSelection.png";
import villager from "../Images/villager.png";
import seer from "../Images/seer.png";
import hunter from "../Images/hunter.png";
import werewolf from "../Images/werewolf.png";
import { Button } from "../Components/Button";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  & h3 {
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const allRoles = ["Aldeão", "Vidente", "Lobisomem", "Caçador"];
const roleIcons = {
  Aldeão: villager,
  Vidente: seer,
  Lobisomem: werewolf,
  Caçador: hunter,
};

export default function DefineRoles() {
  const { currentGame, setScreen } = useContext(GameContext);
  const [errorMessage, setErrorMessage] = useState();
  const [selectedRoles, setSelectedRoles] = useState({
    Aldeão: 2,
    Vidente: 1,
    Lobisomem: 1,
  });

  function handleAddRoleCount(roleName) {
    setSelectedRoles({
      ...selectedRoles,
      [roleName]: selectedRoles[roleName] + 1,
    });
  }

  function handleRemoveRoleCount(roleName) {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = { ...prevSelectedRoles };
      if (newSelectedRoles[roleName] > 0) {
        newSelectedRoles[roleName]--;
      }
      if (newSelectedRoles[roleName] === 0) {
        delete newSelectedRoles[roleName];
      }
      return newSelectedRoles;
    });
  }

  function handleAddRole(roleName) {
    if (!selectedRoles[roleName]) {
      setSelectedRoles({ ...selectedRoles, [roleName]: 1 });
    }
  }

  function startGame() {
    const error = currentGame.playersMatchRoles(selectedRoles);
    if (error) {
      return setErrorMessage(
        "A quantidade de jogadores e papéis devems ser iguais"
      );
    }
    currentGame.assignRoleToPlayer(selectedRoles);
    setScreen("passToPlayer");
  }

  function returnToPreviousScreen() {
    currentGame.clearPlayers();
    setScreen("definePlayers");
  }

  return (
    <Container>
      {errorMessage && errorMessage} <br />
      <h3>Funções selecionadas</h3>
      <Grid>
        {Object.keys(selectedRoles).map((roleName, i) => (
          <ClassCard
            key={i}
            roleName={roleName}
            count={selectedRoles[roleName]}
            onPlus={() => handleAddRoleCount(roleName)}
            onMinus={() => handleRemoveRoleCount(roleName)}
            img={roleIcons[roleName]}
            selected={true}
          />
        ))}
      </Grid>
      <h3>Todas as funções</h3>
      <Grid>
        {allRoles.map((roleName, i) => (
          <ClassCard
            onClick={() => handleAddRole(roleName)}
            roleName={roleName}
            key={i}
            img={roleIcons[roleName]}
          />
        ))}
      </Grid>
      <Footer>
        <Button onClick={() => returnToPreviousScreen()}>Voltar</Button>
        <Button onClick={() => startGame()}>Confirmar</Button>
      </Footer>
    </Container>
  );
}
