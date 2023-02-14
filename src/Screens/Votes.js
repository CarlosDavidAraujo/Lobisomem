import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";

export default function Votes() {
  const { game, setScreen, setLastScreen } = useContext(GameContext);
  const [currentPlayer, setCurrentPlayer] = useState(game.getCurrentPlayer());

  function handleVotes(player) {
    if (player) {
      player.addVote();
    }

    game.passToNextPlayer();
    setCurrentPlayer(game.getCurrentPlayer());
    console.log(currentPlayer);

    if (game.noNextPlayer()) {
      game.removeMostVotedPlayer();
      game.clearPlayersVotes();
      setLastScreen("votes");
      setScreen("villageNews");
    }
  }

  return (
    <>
      <div>
        <h1>{currentPlayer.getName()} escolha seu voto</h1>
        {game.getPlayers().map((player, i) => (
          <>
            <button onClick={() => handleVotes(player)}>
              {player.getName()}
            </button>
          </>
        ))}
        <button onClick={() => handleVotes(null)}>Abster-se</button>
      </div>
    </>
  );
}
