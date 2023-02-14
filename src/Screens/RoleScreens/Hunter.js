import { useState } from "react";

export default function Hunter({ currentGame, playerList, currentPlayer }) {
  const [skillWasUsed, setSkillWasUsed] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);
  const [targetPlayer, setTargetPlayer] = useState();

  function handleAtirar() {
    currentPlayer.getRole().atirar(targetPlayer, currentGame);
    setSkillWasUsed(true);
  }

  function isCurrentPlayer(player) {
    return player.getName() === currentPlayer.getName();
  }

  return (
    <div>
      {!skillWasUsed && (
        <div>
          Clique em atirar, em seguida escolha o jogador que deseja eliminar,
          mas cuidado para não escolher um incocente. Você pode terminar a vez
          se não tiver certeza do seu alvo.
          <button onClick={() => setSkillWasChosen(true)}>Atirar</button>
          {playerList.map(
            (player, i) =>
              !isCurrentPlayer(player) && (
                <button
                  key={i}
                  onClick={() => setTargetPlayer(player)}
                  disabled={isCurrentPlayer(player) || !skillWasChosen}
                  style={
                    targetPlayer === player ? { backgroundColor: "yellow" } : {}
                  }
                >
                  {player.getName()}
                </button>
              )
          )}
          <button onClick={() => handleAtirar()}>Confirmar</button>
        </div>
      )}
    </div>
  );
}
