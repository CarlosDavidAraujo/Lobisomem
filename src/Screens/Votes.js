import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";

export default function Votes() {
  const { currentGame, playerList, setScreen, setPreviousScreen } =
    useContext(GameContext);
  const [currentPlayer, setCurrentPlayer] = useState(
    currentGame.getCurrentPlayer()
  );

  function handleVote(player) {
    if (player) {
      player.addVote();
    }

    currentGame.passToNextPlayer();
    setCurrentPlayer(currentGame.getCurrentPlayer());

    if (currentGame.noNextPlayer()) {
      currentGame.removeMostVotedPlayer();
      currentGame.clearPlayersVotes();
      setPreviousScreen("votes");
      setScreen("villageNews");
    }
  }

  return (
    <>
      <div>
        <h1>{currentPlayer.getName()}, escolha seu voto</h1>
        {playerList.map((player, i) => (
          <>
            <button onClick={() => handleVote(player)}>
              {player.getName()}
            </button>
          </>
        ))}
        <button onClick={() => handleVote(null)}>Abster-se</button>
      </div>
    </>
  );
}
