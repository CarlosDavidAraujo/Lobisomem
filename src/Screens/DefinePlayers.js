import { useContext, useState } from "react";
import styled from "styled-components";
import PlayerCard from "../Components/PlayerCard";
import { GameContext } from "../Context/GameContext";
import { Button, AddPlayerButton } from "../Components/Button";
import bgImg from '../Images/playerSelection.png';
import PlusIcon from "../Components/PlusIcon";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  & img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

const Grid = styled.div`
  height: 80%;
  margin-top: 40px;
  padding: 5%;
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-auto-rows: 120px;
  grid-gap: 10px;
  overflow-y: scroll;
`;


export default function DefinePlayers() {
  const { currentGame, setScreen } = useContext(GameContext);
  const [players, setPlayers] = useState([
    "jogador 1",
    "jogador 2",
    "jogador 3",
    "jogador 4",
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePlayerChange = (e, index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = e.target.value;
    setPlayers(updatedPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, `jogador ${players.length + 1}`]);
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    setPlayers(updatedPlayers.filter((_, i) => i !== index));
  };

  function handleDefinePlayers() {
    if (players.length >= 4) {
      currentGame.setPlayers(players);
      setScreen("defineRoles");
    } else {
      setErrorMessage("É necessário ter pelo menos 4 jogadores.");
    }
  }

  return (
    <Container>
      Adicione jogadores abaixo
      <img src={bgImg} alt="pessoas reunidas numa floresta sombria" />
      <Grid>
        {players.map((player, i) =>
          <PlayerCard player={player}
            onChange={(e) => handlePlayerChange(e, i)}
            onClick={() => handleRemovePlayer(i)}
          />
        )}
        <AddPlayerButton onClick={handleAddPlayer}>
          <PlusIcon />
          Adicionar jogador
        </AddPlayerButton>
      </Grid>
      <Button onClick={() => handleDefinePlayers()}>Confirmar</Button>
      {errorMessage && <p>{errorMessage}</p>}
    </Container >
  );
}
