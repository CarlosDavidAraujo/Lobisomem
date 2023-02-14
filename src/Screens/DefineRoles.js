import { useContext, useState } from "react";
import styled from "styled-components";
import ClassCard from "../Components/ClassCard";
import { GameContext } from "../Context/GameContext";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 10px;
`;

const allRoles = ["Aldeão", "Vidente", "Lobisomem", "Caçador"];

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

  return (
    <>
      {errorMessage && errorMessage} <br />
      Funções selecionadas
      <Grid>
        {Object.keys(selectedRoles).map((roleName, i) => (
          <ClassCard
            key={i}
            roleName={roleName}
            count={selectedRoles[roleName]}
            onPlus={() => handleAddRoleCount(roleName)}
            onMinus={() => handleRemoveRoleCount(roleName)}
          />
        ))}
      </Grid>
      Todas as funções
      <Grid>
        {allRoles.map((role, i) => (
          <ClassCard
            onClick={() => handleAddRole(role)}
            roleName={role}
            key={i}
          />
        ))}
      </Grid>
      <button onClick={() => startGame()}>Confirmar</button>
      <button onClick={() => setScreen("definePlayers")}>Voltar</button>
    </>
  );
}
